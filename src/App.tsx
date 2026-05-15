import React, { useState } from 'react';
import { LcdScreen } from './components/LcdScreen';
import { useGame } from './hooks/useGame';
import { Position } from './constants';

export default function App() {
  const { 
    playerPosition, movePlayer, score, strikes, level, items, 
    isPlaying, isPaused, gameOver, startGame, togglePause,
    isSoundOn, toggleSound, isMusicOn, toggleMusic 
  } = useGame();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleButton = (pos: Position) => {
    movePlayer(pos);
  };

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center p-2 lg:p-8 font-sans select-none overflow-hidden">
      
      {/* 
         FIXED FOR LANDSCAPE MOBILE: maxWidth and maxHeight strictly bind the console 
         so it fits inside the screen bounds 100% of the time, zero scrolling!
      */}
      <div 
        className="bg-[#D5D4C8] rounded-2xl lg:rounded-[2rem] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),5px_10px_35px_rgba(0,0,0,0.8)] relative p-2 lg:p-8 border-[3px] lg:border-4 border-[#8c1c1c] flex flex-col justify-center"
        style={{ 
          width: '100%', 
          maxWidth: 'min(1024px, calc((100dvh - 16px) * 1.8))', 
          maxHeight: 'calc(100dvh - 16px)',
          aspectRatio: '1.8 / 1' 
        }}
      >
        
        {/* --- TOP HEADER (Title) --- */}
        <div className="absolute top-[3%] lg:top-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 lg:gap-4 w-full px-2">
           <div className="hidden lg:block w-8 lg:w-24 h-1 lg:h-[2px] bg-[#f0f0f0] opacity-80"></div>
           {/* FIXED: Title font sizes perfectly match Scientistronica on mobile! */}
           <h1 className="text-[#f0f0f0] text-[10px] max-lg:landscape:text-[8px] lg:text-3xl font-black uppercase tracking-widest leading-none drop-shadow-md text-center whitespace-nowrap">
             Researcher's Zugzwang
           </h1>
           <div className="hidden lg:block w-8 lg:w-24 h-1 lg:h-[2px] bg-[#f0f0f0] opacity-80"></div>
        </div>

        {/* --- OPTION CONTROLS (New / Pause / Music / Sound / Screen) --- */}
        {/* FIXED: On ALL smartphones, this is a horizontal row at the very top (never overlapping the screen). On PC, it remains a vertical column on the right! */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-row gap-2 w-full justify-center px-1 z-50 lg:top-22 lg:right-13 lg:left-auto lg:translate-x-0 lg:flex-col lg:justify-end lg:w-auto">
            
            <div className="flex items-center justify-end cursor-pointer group" onClick={startGame}>
                <div className="text-[7px] max-lg:landscape:text-[6px] lg:text-[10px] font-bold text-[#000000] uppercase text-right lg:text-left leading-tight lg:w-14 mr-1 lg:mr-2">New</div>
                <div className="w-3 max-lg:landscape:w-2 h-1.5 max-lg:landscape:h-1 lg:w-6 lg:h-3 bg-[#1a1a1a] rounded-full shadow-inner border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={togglePause}>
                <div className="text-[7px] max-lg:landscape:text-[6px] lg:text-[10px] font-bold text-[#000000] uppercase text-right lg:text-left leading-tight lg:w-14 mr-1 lg:mr-2">Pause</div>
                <div className="w-3 max-lg:landscape:w-2 h-1.5 max-lg:landscape:h-1 lg:w-6 lg:h-3 bg-[#1a1a1a] rounded-full shadow-inner border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={toggleMusic}>
                <div className="text-[7px] max-lg:landscape:text-[6px] lg:text-[10px] font-bold text-[#000000] uppercase text-right lg:text-left leading-tight lg:w-14 mr-1 lg:mr-2">
                  <span className="lg:hidden">Music {isMusicOn ? 'ON' : 'OFF'}</span>
                  <span className="hidden lg:block">Music <br/><span className="text-[#e33124]">{isMusicOn ? 'ON' : 'OFF'}</span></span>
                </div>
                <div className="w-3 max-lg:landscape:w-2 h-1.5 max-lg:landscape:h-1 lg:w-6 lg:h-3 bg-[#1a1a1a] rounded-full shadow-inner border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={toggleSound}>
                <div className="text-[7px] max-lg:landscape:text-[6px] lg:text-[10px] font-bold text-[#000000] uppercase text-right lg:text-left leading-tight lg:w-14 mr-1 lg:mr-2">
                  <span className="lg:hidden">Sound {isSoundOn ? 'ON' : 'OFF'}</span>
                  <span className="hidden lg:block">Sound <br/><span className="text-[#e33124]">{isSoundOn ? 'ON' : 'OFF'}</span></span>
                </div>
                <div className="w-3 max-lg:landscape:w-2 h-1.5 max-lg:landscape:h-1 lg:w-6 lg:h-3 bg-[#1a1a1a] rounded-full shadow-inner border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={toggleFullScreen}>
                <div className="text-[7px] max-lg:landscape:text-[6px] lg:text-[10px] font-bold text-[#000000] uppercase text-right lg:text-left leading-tight lg:w-14 mr-1 lg:mr-2">
                  <span className="lg:hidden">Screen {isFullscreen ? 'MIN' : 'MAX'}</span>
                  <span className="hidden lg:block">Screen <br/><span className="text-[#e33124]">{isFullscreen ? 'MIN' : 'MAX'}</span></span>
                </div>
                <div className="w-3 max-lg:landscape:w-2 h-1.5 max-lg:landscape:h-1 lg:w-6 lg:h-3 bg-[#1a1a1a] rounded-full shadow-inner border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>
        </div>

        {/* --- BRAND LOGO (Left side) --- */}
        <div className="absolute top-[8%] lg:top-10 left-[2%] lg:left-10 border-2 lg:border-4 border-[#000000] rounded-full w-6 max-lg:landscape:w-5 lg:w-16 h-6 max-lg:landscape:h-5 lg:h-16 flex items-center justify-center bg-[#D5D4C8] shadow-inner">
          <span className="font-serif font-black text-[10px] max-lg:landscape:text-[8px] lg:text-2xl tracking-tighter text-[#000000] ml-0.5 lg:ml-1 drop-shadow-md">B</span>
          <div className="absolute left-0.5 lg:left-2 top-1/2 -translate-y-1/2 w-1 lg:w-2 h-1 lg:h-2 rounded-full bg-[#000000]"></div>
        </div>

        {/* --- MAIN GAMEPLAY ROW --- */}
        <div className="flex-1 flex items-center justify-between mt-[10%] lg:mt-12 px-1 lg:px-0">
          
          {/* Left Controls */}
          {/* FIXED: Gap reduced to `max-lg:landscape:gap-2` to bring D-pad buttons together on landscape! */}
          <div className="flex flex-col justify-center gap-6 max-lg:landscape:gap-2 lg:gap-16 h-full py-2 lg:py-8 px-1 lg:px-4 w-14 max-lg:landscape:w-10 lg:w-32 shrink-0 relative translate-y-2 lg:translate-y-12">
            <div className="relative self-end">
              <div className="absolute -top-1 lg:-top-5 -left-1 lg:-left-5 w-2 lg:w-0 h-2 lg:h-0 border-l-[3px] lg:border-l-[10px] border-l-transparent border-r-[3px] lg:border-r-[10px] border-r-transparent border-b-[6px] lg:border-b-[16px] border-b-[#000000] -rotate-45"></div>
              <button 
                onPointerDown={() => handleButton('TL')}
                className="w-12 h-12 max-lg:landscape:w-8 max-lg:landscape:h-8 lg:w-20 lg:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-[1.5px] lg:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
              ></button>
            </div>
            
            <div className="relative self-end">
              <div className="absolute -bottom-1 lg:-bottom-5 -left-1 lg:-left-5 w-2 lg:w-0 h-2 lg:h-0 border-l-[3px] lg:border-l-[10px] border-l-transparent border-r-[3px] lg:border-r-[10px] border-r-transparent border-t-[6px] lg:border-t-[16px] border-t-[#000000] rotate-45"></div>
              <button 
                onPointerDown={() => handleButton('BL')}
                className="w-12 h-12 max-lg:landscape:w-8 max-lg:landscape:h-8 lg:w-20 lg:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-[1.5px] lg:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
              ></button>
            </div>
          </div>

          {/* Screen Area Container */}
          <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-center relative">
            <div className="relative w-full aspect-[4/3] border-[4px] lg:border-[12px] border-[#111111] rounded-md lg:rounded-xl overflow-hidden flex items-center justify-center flex-none p-[2px] lg:p-1 bg-[#b0b58e] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-50"></div>
               <LcdScreen 
                 score={score} 
                 strikes={strikes} 
                 level={level}
                 items={items} 
                 playerPosition={playerPosition} 
                 isPlaying={isPlaying} 
                 isPaused={isPaused}
                 gameOver={gameOver} 
                 startGame={startGame}
                 togglePause={togglePause}
               />
            </div>
            
            <div className="mt-1 lg:mt-4 flex justify-center items-end">
               <div className="flex items-center gap-1 lg:gap-4">
                  <div className="w-4 lg:w-16 h-[1px] lg:h-[2px] bg-[#f0f0f0] opacity-80"></div>
                  {/* FIXED: Bottom title exactly matches top title sizes */}
                  <h2 className="text-[#f0f0f0] text-[10px] max-lg:landscape:text-[8px] lg:text-xl font-black uppercase tracking-wider leading-none mt-1 drop-shadow-md">Scientistronica</h2>
                  <div className="w-4 lg:w-16 h-[1px] lg:h-[2px] bg-[#f0f0f0] opacity-80"></div>
               </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col justify-center gap-6 max-lg:landscape:gap-2 lg:gap-16 h-full py-2 lg:py-8 px-1 lg:px-4 w-14 max-lg:landscape:w-10 lg:w-32 shrink-0 relative translate-y-2 lg:translate-y-12">
             <div className="relative self-start">
              <div className="absolute -top-1 lg:-top-5 -right-1 lg:-right-5 w-2 lg:w-0 h-2 lg:h-0 border-l-[3px] lg:border-l-[10px] border-l-transparent border-r-[3px] lg:border-r-[10px] border-r-transparent border-b-[6px] lg:border-b-[16px] border-b-[#000000] rotate-45"></div>
              <button 
                  onPointerDown={() => handleButton('TR')}
                  className="w-12 h-12 max-lg:landscape:w-8 max-lg:landscape:h-8 lg:w-20 lg:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-[1.5px] lg:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
               ></button>
             </div>
             <div className="relative self-start">
               <div className="absolute -bottom-1 lg:-bottom-5 -right-1 lg:-right-5 w-2 lg:w-0 h-2 lg:h-0 border-l-[3px] lg:border-l-[10px] border-l-transparent border-r-[3px] lg:border-r-[10px] border-r-transparent border-t-[6px] lg:border-t-[16px] border-t-[#000000] -rotate-45"></div>
               <button 
                  onPointerDown={() => handleButton('BR')}
                  className="w-12 h-12 max-lg:landscape:w-8 max-lg:landscape:h-8 lg:w-20 lg:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-[1.5px] lg:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
                ></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
