import { Position, TRACK_PATHS } from '../constants';
import { GameItem } from '../hooks/useGame';
import { GraduationCap, Frown, Pause } from 'lucide-react';

import scientistTL from '../assets/scientist-tl.svg';
import scientistTR from '../assets/scientist-tr.svg';
import scientistBL from '../assets/scientist-bl.svg';
import scientistBR from '../assets/scientist-br.svg';
import labBg from '../assets/Background.svg';
import lifeSvg from '../assets/life.svg';
import grantSvg from '../assets/grant.svg';
import manuscriptSvg from '../assets/manuscript.svg';
import teachingSvg from '../assets/teaching.svg';
import jobSvg from '../assets/job.svg';

interface ScreenProps {
  score: number;
  strikes: number;
  level: number;
  items: GameItem[];
  playerPosition: Position;
  gameOver: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  startGame: () => void;
  togglePause: () => void;
}

export function LcdScreen({ score, strikes, level, items, playerPosition, gameOver, isPlaying, isPaused, startGame, togglePause }: ScreenProps) {

  const renderScientist = () => {
    const isActive = isPlaying && !gameOver && !isPaused;
    
    // FIXED: Default (w-[70px]), Mobile Landscape (w-[40px]), PC/Laptop (lg:w-[100px])
    return (
      <div className="absolute inset-0 pointer-events-none w-full h-full z-10">
        <img 
          src={scientistTL} alt="Scientist Top Left"
          className={`absolute w-[70px] max-lg:landscape:w-[40px] lg:w-[100px] transition-opacity duration-75 ${playerPosition === 'TL' && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '35%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
        <img 
          src={scientistBL} alt="Scientist Bottom Left"
          className={`absolute w-[70px] max-lg:landscape:w-[40px] lg:w-[100px] transition-opacity duration-75 ${(playerPosition === 'BL' || playerPosition === 'CENTER') && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '35%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
        <img 
          src={scientistTR} alt="Scientist Top Right"
          className={`absolute w-[70px] max-lg:landscape:w-[40px] lg:w-[100px] transition-opacity duration-75 ${playerPosition === 'TR' && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '65%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
        <img 
          src={scientistBR} alt="Scientist Bottom Right"
          className={`absolute w-[70px] max-lg:landscape:w-[40px] lg:w-[100px] transition-opacity duration-75 ${playerPosition === 'BR' && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '65%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
      </div>
    );
  };

  const renderItem = (type: string, className: string) => {
    let imgSrc = grantSvg; 
    if (type === 'grant') imgSrc = grantSvg;
    if (type === 'manuscript') imgSrc = manuscriptSvg;
    if (type === 'teaching') imgSrc = teachingSvg;
    if (type === 'job_offer') imgSrc = jobSvg;

    return (
      <img src={imgSrc} alt={type} className={className} style={{ filter: 'brightness(0) saturate(100%) opacity(0.85)' }} />
    );
  };

  const renderTracks = () => {
    const trackItemTypes: Record<string, string> = { TL: 'grant', BL: 'manuscript', TR: 'job_offer', BR: 'teaching' };

    return (['TL', 'TR', 'BL', 'BR'] as Position[]).map((pos) => {
      const path = TRACK_PATHS[pos];
      const itemType = trackItemTypes[pos];

      return path.map((point, stepIndex) => {
        const activeItem = items.find(i => i.position === pos && i.step === stepIndex);
        if (stepIndex === 5 && !activeItem) return null;

        return (
          <div key={`${pos}-${stepIndex}`} className="absolute transition-all duration-75 z-10" style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}>
            {/* FIXED: Default (w-7 h-7), Mobile Landscape (w-4 h-4), PC/Laptop (lg:w-8 lg:h-8) */}
            {renderItem(itemType, `w-7 h-7 max-lg:landscape:w-4 max-lg:landscape:h-4 lg:w-8 lg:h-8 text-[#2d3436] transition-opacity duration-75 ${activeItem && !isPaused ? 'opacity-100' : 'opacity-[0.08]'}`)}
          </div>
        );
      });
    });
  };

  return (
    <div 
      className="relative w-full h-full bg-[#94a187] overflow-hidden font-vt323 cursor-pointer"
      onClick={() => { if (isPlaying && !gameOver) togglePause(); }}
    >
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat opacity-[0.25]" style={{ backgroundImage: `url(${labBg})` }}></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:4px_4px] z-0"></div>
      
      {/* FIXED: Default (16px), Mobile Landscape (10px), PC (3xl) */}
      <div className="absolute top-[2%] right-[3%] text-right z-20">
        <div className="text-[16px] max-lg:landscape:text-[10px] lg:text-3xl leading-none text-[#2d3436] font-vt323 font-bold tracking-widest">
          {score.toString().padStart(6, '0')}
        </div>
      </div>

      {/* FIXED: Default (w-4 h-4), Mobile Landscape (w-2.5 h-2.5), PC (w-6 h-6) */}
      <div className="absolute top-[2%] left-[3%] flex space-x-[2px] lg:space-x-1 z-20">
        {[0, 1, 2].map((i) => (
          <div key={`life-${i}`} className={`transition-opacity duration-300 ${i >= strikes ? 'opacity-100' : 'opacity-[0.08]'}`}>
            <img src={lifeSvg} alt="Life" className="w-4 h-4 max-lg:landscape:w-2.5 max-lg:landscape:h-2.5 lg:w-6 lg:h-6" style={{ filter: 'brightness(0) saturate(100%) opacity(0.85)' }} />
          </div>
        ))}
      </div>

      {renderTracks()}
      {renderScientist()}

      {/* Level text */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-center text-[#2d3436] font-sans text-[8px] max-lg:landscape:text-[6px] lg:text-xs font-bold uppercase tracking-widest px-4 z-20">
         <div className="flex items-center gap-[2px] lg:gap-2">
            <div className="w-[3px] h-[3px] lg:w-2 lg:h-2 rounded-full bg-[#2d3436]"></div> 
            LEVEL {level}
         </div>
      </div>

      {isPaused && isPlaying && !gameOver && (
        <div className="absolute inset-0 bg-[#94a187]/60 flex flex-col items-center justify-center text-center z-50 backdrop-blur-[2px]">
          <Pause className="w-8 h-8 max-lg:landscape:w-6 max-lg:landscape:h-6 lg:w-16 lg:h-16 text-[#2d3436] mb-1 lg:mb-4" />
          <h2 className="text-xl max-lg:landscape:text-base lg:text-4xl font-bold text-[#2d3436] tracking-wide animate-pulse">PAUSED</h2>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-[#94a187]/80 flex flex-col items-center justify-center text-center z-50 backdrop-blur-sm cursor-pointer" onClick={(e) => { e.stopPropagation(); startGame(); }}>
          <Frown className="w-8 h-8 max-lg:landscape:w-6 max-lg:landscape:h-6 lg:w-16 lg:h-16 text-[#2d3436] mb-1 lg:mb-4" />
          <h2 className="text-sm max-lg:landscape:text-xs lg:text-4xl font-bold text-[#2d3436] mb-1 lg:mb-2 uppercase tracking-wide">You perished!</h2>
          <p className="text-xs max-lg:landscape:text-[10px] lg:text-2xl text-[#2d3436] mb-2 lg:mb-4">You missed 3 duties.</p>
          <div className="text-[10px] max-lg:landscape:text-[8px] lg:text-xl text-[#2d3436] animate-pulse">Press START to try again.</div>
        </div>
      )}

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 bg-[#94a187]/90 flex flex-col items-center justify-center text-center z-50 backdrop-blur-sm cursor-pointer" onClick={(e) => { e.stopPropagation(); startGame(); }}>
          <GraduationCap className="w-8 h-8 max-lg:landscape:w-6 max-lg:landscape:h-6 lg:w-16 lg:h-16 text-[#2d3436] mb-1 lg:mb-4" />
          <h1 className="text-sm max-lg:landscape:text-xs lg:text-4xl font-bold text-[#2d3436] mb-1 lg:mb-2 uppercase tracking-widest text-center leading-none">
            Researcher's<br className="lg:hidden" /> Zugzwang
          </h1>
          <div className="text-[10px] max-lg:landscape:text-[8px] lg:text-2xl text-[#2d3436] animate-pulse rounded border lg:border-2 border-[#2d3436] px-2 py-1 lg:px-4 lg:py-2 bg-[#2d3436]/10 inline-block font-bold uppercase mt-2 lg:mt-8">
            Press START
          </div>
        </div>
      )}
    </div>
  );
}
