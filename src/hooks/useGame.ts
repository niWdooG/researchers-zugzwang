import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, ItemType, BASE_SPEEDS, TRACK_PATHS } from '../constants';

// --- IMPORT SOUND EFFECTS & MUSIC ---
// @ts-ignore
import tickSfx from '../assets/tick.wav';
// @ts-ignore
import missSfx from '../assets/miss.wav';
// @ts-ignore
import catchSfx from '../assets/catch.wav';
// @ts-ignore
import tenureSfx from '../assets/tenure.wav';
// @ts-ignore
import gameOverSfx from '../assets/gameover.wav';
// @ts-ignore
import bgmMusic from '../assets/bgm.mp3'; // Change to .wav if needed

export interface GameItem {
  id: number;
  position: Exclude<Position, 'CENTER'>;
  type: ItemType;
  step: number; 
  nextMoveTime: number;
  status: 'active' | 'caught' | 'missed';
}

// Global Sound Player
const playSound = (src: string, isSoundOn: boolean) => {
  if (!isSoundOn) return;
  const audio = new Audio(src);
  audio.volume = 0.6;
  audio.play().catch(() => {});
};

export const useGame = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>('BL');
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState<GameItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // NEW AUDIO STATES
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  const stateRef = useRef({
    items: [] as GameItem[],
    score: 0,
    strikes: 0,
    caughtCount: 0,
    spawnCount: 0,
    lastNormalPos: 'BR' as Exclude<Position, 'CENTER'>,
    level: 1,
    isPlaying: false,
    isPaused: false,
    pauseStartTime: 0,
    gameOver: false,
    playerPosition: 'BL' as Position,
    nextSpawnTime: 0,
    isSoundOn: true, // Tracked in ref for the fast tick loop
  });

  const requestRef = useRef<number>();
  const itemIdCounter = useRef(0);

  // Initialize Background Music
  useEffect(() => {
    bgmRef.current = new Audio(bgmMusic);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.3; // BGM is slightly quieter than SFX
  }, []);

  // Handle Play/Pause of BGM dynamically
  useEffect(() => {
    if (!bgmRef.current) return;
    if (isMusicOn && isPlaying && !isPaused && !gameOver) {
      bgmRef.current.play().catch(() => {});
    } else {
      bgmRef.current.pause();
    }
  }, [isMusicOn, isPlaying, isPaused, gameOver]);

  // Toggles
  const toggleSound = useCallback(() => {
    setIsSoundOn(prev => {
      stateRef.current.isSoundOn = !prev;
      return !prev;
    });
  }, []);

  const toggleMusic = useCallback(() => {
    setIsMusicOn(prev => !prev);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setStrikes(0);
    setLevel(1);
    setItems([]);
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
    setPlayerPosition('BL'); 
    
    stateRef.current = {
      ...stateRef.current,
      items: [],
      score: 0,
      strikes: 0,
      caughtCount: 0,
      spawnCount: 0,
      lastNormalPos: 'BR',
      level: 1,
      isPlaying: true,
      isPaused: false,
      pauseStartTime: 0,
      gameOver: false,
      playerPosition: 'BL',
      nextSpawnTime: Date.now() + 500,
    };
  }, []);

  const togglePause = useCallback(() => {
    const state = stateRef.current;
    if (!state.isPlaying || state.gameOver) return;

    if (state.isPaused) {
      const pauseDuration = Date.now() - state.pauseStartTime;
      state.nextSpawnTime += pauseDuration;
      state.items.forEach(item => { item.nextMoveTime += pauseDuration; });
      state.isPaused = false;
      setIsPaused(false);
    } else {
      state.pauseStartTime = Date.now();
      state.isPaused = true;
      setIsPaused(true);
    }
  }, []);

  const movePlayer = useCallback((pos: Position) => {
    if (!stateRef.current.isPlaying || stateRef.current.isPaused || stateRef.current.gameOver) return;
    setPlayerPosition(pos);
    stateRef.current.playerPosition = pos;
  }, []);

  const tick = useCallback(() => {
    if (!stateRef.current.isPlaying || stateRef.current.gameOver) {
      if (!stateRef.current.gameOver && !stateRef.current.isPlaying) {
         if (stateRef.current.playerPosition !== 'BL') {
           setPlayerPosition('BL');
           stateRef.current.playerPosition = 'BL';
         }
      }
      requestRef.current = requestAnimationFrame(tick);
      return;
    }

    if (stateRef.current.isPaused) {
      requestRef.current = requestAnimationFrame(tick);
      return;
    }

    const now = Date.now();
    const state = stateRef.current;
    let needsUpdate = false;
    let currentScore = state.score;
    let currentStrikes = state.strikes;
    let currentCaught = state.caughtCount;

    const remainingItems: GameItem[] = [];
    for (const item of state.items) {
      if (now >= item.nextMoveTime) {
        needsUpdate = true;
        
        const catchStep = TRACK_PATHS[item.position].length - 2;
        const missStep = TRACK_PATHS[item.position].length - 1;

        if (item.status === 'caught' || (item.status === 'missed' && item.step >= missStep)) {
           continue; 
        }

        const speedIncrements = Math.floor(currentScore / 10);
        const speedModifier = Math.max(0.25, 1.0 - (speedIncrements * 0.1));
        const delay = BASE_SPEEDS[item.type] * speedModifier;

        if (item.step === catchStep && item.status === 'active') {
          if (state.playerPosition === item.position) {
            // --- CATCH LOGIC ---
            const isTenure = item.type === 'job_offer';
            
            // Separate sounds for normal catch vs tenure catch
            if (isTenure) {
              playSound(tenureSfx, state.isSoundOn);
              currentScore += 5;
            } else {
              playSound(catchSfx, state.isSoundOn);
              currentScore += 1;
            }
            
            currentCaught++;
            remainingItems.push({ ...item, status: 'caught', nextMoveTime: now + 150 });
          } else {
            // --- MISS LOGIC ---
            playSound(missSfx, state.isSoundOn);
            currentStrikes++;
            remainingItems.push({ ...item, step: missStep, status: 'missed', nextMoveTime: now + 500 });
          }
        } else {
          // --- FALLING LOGIC ---
          playSound(tickSfx, state.isSoundOn);
          remainingItems.push({ ...item, step: item.step + 1, nextMoveTime: now + delay });
        }
      } else {
        remainingItems.push(item);
      }
    }

    // Check game over
    if (currentStrikes >= 3) {
      if (!state.gameOver) playSound(gameOverSfx, state.isSoundOn);
      state.gameOver = true;
      state.isPlaying = false;
      setGameOver(true);
      setIsPlaying(false);
      needsUpdate = true;
      setPlayerPosition('BL'); 
      state.playerPosition = 'BL';
    }

    if (now >= state.nextSpawnTime && !state.gameOver) {
      const activeItems = remainingItems.filter(i => i.status === 'active');
      const isSafeToSpawn = activeItems.every(item => item.step >= 2);

      if (isSafeToSpawn) {
        needsUpdate = true;
        state.spawnCount++;
        const currentRound = state.spawnCount;
        let newPos: Exclude<Position, 'CENTER'>;

        if (currentRound % 25 === 0) newPos = 'TR'; 
        else if (currentRound % 10 === 0) newPos = 'TL'; 
        else if (currentRound < 25) {
          newPos = state.lastNormalPos === 'BL' ? 'BR' : 'BL';
          state.lastNormalPos = newPos;
        } else {
          const normalPositions: Exclude<Position, 'CENTER'>[] = ['BL', 'BR'];
          newPos = normalPositions[Math.floor(Math.random() * normalPositions.length)];
        }

        const positionToType: Record<Exclude<Position, 'CENTER'>, ItemType> = {
          TL: 'grant',      
          BL: 'manuscript', 
          TR: 'job_offer',  
          BR: 'teaching',   
        };
        const newType = positionToType[newPos];
        
        const speedIncrements = Math.floor(currentScore / 10);
        const speedModifier = Math.max(0.25, 1.0 - (speedIncrements * 0.1));
        
        remainingItems.push({
          id: itemIdCounter.current++,
          position: newPos,
          type: newType,
          step: 0,
          status: 'active',
          nextMoveTime: now + BASE_SPEEDS[newType] * speedModifier,
        });

        state.nextSpawnTime = now + 100;
      } else {
        state.nextSpawnTime = now + 100;
      }
    }

    if (needsUpdate) {
      state.items = remainingItems;
      state.score = currentScore;
      state.strikes = currentStrikes;
      state.caughtCount = currentCaught;
      
      const calcLevel = Math.floor(currentCaught / 50) + 1;
      if (calcLevel !== state.level) {
         state.level = calcLevel;
         setLevel(calcLevel);
      }
      
      setItems([...remainingItems]);
      if (currentScore !== score) setScore(currentScore);
      if (currentStrikes !== strikes) setStrikes(currentStrikes);
    }

    requestRef.current = requestAnimationFrame(tick);
  }, [score, strikes]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [tick]);

  useEffect(() => {
    const activeKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' ', 'p'].includes(key)) {
        e.preventDefault();
      }
      
      if (key === 'p') {
         togglePause();
         return;
      }

      activeKeys.add(key);

      const up = activeKeys.has('w') || activeKeys.has('arrowup');
      const down = activeKeys.has('s') || activeKeys.has('arrowdown');
      const left = activeKeys.has('a') || activeKeys.has('arrowleft');
      const right = activeKeys.has('d') || activeKeys.has('arrowright');

      let newPos: Position | null = null;

      if (up && right) newPos = 'TR';
      else if (down && right) newPos = 'BR';
      else if (up && left) newPos = 'TL';
      else if (down && left) newPos = 'BL';
      else if (left) newPos = stateRef.current.playerPosition === 'BL' ? 'BL' : 'TL';
      else if (right) newPos = stateRef.current.playerPosition === 'BR' ? 'BR' : 'TR';
      else if (up) newPos = stateRef.current.playerPosition.includes('L') ? 'TL' : 'TR';
      else if (down) newPos = stateRef.current.playerPosition.includes('L') ? 'BL' : 'BR';

      if (newPos) {
        setPlayerPosition(newPos);
        stateRef.current.playerPosition = newPos;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      activeKeys.delete(key);
      
      if (key === ' ') {
          setPlayerPosition('BL');
          stateRef.current.playerPosition = 'BL';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, [togglePause]);

  return { playerPosition, movePlayer, score, strikes, level, items, isPlaying, isPaused, gameOver, startGame, togglePause, isSoundOn, toggleSound, isMusicOn, toggleMusic };
};