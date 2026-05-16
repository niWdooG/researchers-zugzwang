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
    
    // PC untouched. Landscape precisely 1.84x bigger than portrait (!w-[74px] vs w-[40px])
    return (
      <div className="absolute inset-0 pointer-events-none w-full h-full z-10">
        <img 
          src={scientistTL} alt="Scientist Top Left"
          className={`absolute w-[40px] sm:w-[100px] max-lg:landscape:!w-[74px] transition-opacity duration-75 ${playerPosition === 'TL' && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '35%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
        <img 
          src={scientistBL} alt="Scientist Bottom Left"
          className={`absolute w-[40px] sm:w-[100px] max-lg:landscape:!w-[74px] transition-opacity duration-75 ${(playerPosition === 'BL' || playerPosition === 'CENTER') && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '35%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
        <img 
          src={scientistTR} alt="Scientist Top Right"
          className={`absolute w-[40px] sm:w-[100px] max-lg:landscape:!w-[74px] transition-opacity duration-75 ${playerPosition === 'TR' && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
          style={{ bottom: '15%', left: '65%', transform: 'translateX(-50%)', filter: 'brightness(0) saturate(100%)' }} 
        />
        <img 
          src={scientistBR} alt="Scientist Bottom Right"
          className={`absolute w-[40px] sm:w-[100px] max-lg:landscape:!w-[74px] transition-opacity duration-75 ${playerPosition === 'BR' && isActive ? 'opacity-100' : 'opacity-[0.08]'}`} 
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
            {/* PC untouched. Landscape precisely 1.84x bigger than portrait (!w-[29px] vs 16px) */}
            {renderItem(itemType, `w-3 h-3 sm:w-8 sm:h-8 max-lg:landscape:!w-[24px] max-lg:landscape:!h-[24px] text-[#2d3436] transition-opacity duration-75 ${activeItem && !isPaused ? 'opacity-100' : 'opacity-[0.08]'}`)}
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
      
      <div className="absolute top-[2%] right-[3%] text-right z-20">
        <div className="text-[15px] sm:text-3xl max-lg:landscape:!text-[22px] leading-none text-[#2d3436] font-vt323 font-bold tracking-widest">
          {score.toString().padStart(6, '0')}
        </div>
      </div>

      <div className="absolute top-[2%] left-[3%] flex space-x-[2px] lg:space-x-1 z-20">
        {[0, 1, 2].map((i) => (
          <div key={`life-${i}`} className={`transition-opacity duration-300 ${i >= strikes ? 'opacity-100' : 'opacity-[0.08]'}`}>
            <img src={lifeSvg} alt="Life" className="w-3 h-3 sm:w-6 sm:h-6 max-lg:landscape:!w-[18px] max-lg:landscape:!h-[18px]" style={{ filter: 'brightness(0) saturate(100%) opacity(0.85)' }} />
          </div>
        ))}
      </div>

      {renderTracks()}
      {renderScientist()}

      {/* Level text */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-center text-[#2d3436] font-sans text-[8px] sm:text-xs max-lg:landscape:!text-[12px] font-bold uppercase tracking-widest px-4 z-20">
         <div className="flex items-center gap-[2px] sm:gap-2">
            <div className="w-[3px] h-[3px] sm:w-2 sm:h-2 max-lg:landscape:!w-[6px] max-lg:landscape:!h-[6px] rounded-full bg-[#2d3436]"></div> 
            LEVEL {level}
         </div>
      </div>

      {isPaused && isPlaying && !gameOver && (
        <div className="absolute inset-0 bg-[#94a187]/60 flex flex-col items-center justify-center text-center z-50 backdrop-blur-[2px]">
          <Pause className="w-8 h-8 sm:w-16 sm:h-16 max-lg:landscape:!w-6 max-lg:landscape:!h-6 text-[#2d3436] mb-1 sm:mb-4 max-lg:landscape:!mb-1" />
          <h2 className="text-xl sm:text-4xl max-lg:landscape:!text-base font-bold text-[#2d3436] tracking-wide animate-pulse">PAUSED</h2>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 bg-[#94a187]/80 flex flex-col items-center justify-center text-center z-50 backdrop-blur-sm cursor-pointer" onClick={(e) => { e.stopPropagation(); startGame(); }}>
          <Frown className="w-8 h-8 sm:w-16 sm:h-16 max-lg:landscape:!w-6 max-lg:landscape:!h-6 text-[#2d3436] mb-1 sm:mb-4 max-lg:landscape:!mb-1" />
          <h2 className="text-sm sm:text-4xl max-lg:landscape:!text-[18px] font-bold text-[#2d3436] mb-1 sm:mb-2 max-lg:landscape:!mb-1 uppercase tracking-wide">You perished!</h2>
          <p className="text-xs sm:text-2xl max-lg:landscape:!text-[18px] text-[#2d3436] mb-2 sm:mb-4 max-lg:landscape:!mb-1">You missed 3 duties.</p>
          <div className="text-[10px] sm:text-xl max-lg:landscape:!text-[18px] text-[#2d3436] animate-pulse">Press START to try again.</div>
        </div>
      )}

      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 bg-[#94a187]/90 flex flex-col items-center justify-center text-center z-50 backdrop-blur-sm cursor-pointer" onClick={(e) => { e.stopPropagation(); startGame(); }}>
          <GraduationCap className="w-8 h-8 sm:w-16 sm:h-16 max-lg:landscape:!w-6 max-lg:landscape:!h-6 text-[#2d3436] mb-1 sm:mb-4 max-lg:landscape:!mb-1" />
          <h1 className="text-sm sm:text-4xl max-lg:landscape:!text-xs font-bold text-[#2d3436] mb-1 sm:mb-2 max-lg:landscape:!mb-1 uppercase tracking-widest text-center leading-none">
            Researcher's<br className="sm:hidden max-lg:landscape:!block" /> Zugzwang
          </h1>
          <div className="text-[10px] sm:text-2xl max-lg:landscape:!text-[8px] text-[#2d3436] animate-pulse rounded border sm:border-2 max-lg:landscape:!border-[1px] border-[#2d3436] px-2 py-1 sm:px-4 sm:py-2 max-lg:landscape:!px-2 max-lg:landscape:!py-1 bg-[#2d3436]/10 inline-block font-bold uppercase mt-2 sm:mt-8 max-lg:landscape:!mt-2">
            Press START
          </div>
        </div>
      )}
    </div>
  );
}
