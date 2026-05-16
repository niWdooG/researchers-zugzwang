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
    <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center p-2 sm:p-8 font-sans select-none overflow-hidden">
      
      <div 
        className="w-full max-w-5xl md:aspect-[1.8/1] bg-[#D5D4C8] rounded-3xl sm:rounded-[2rem] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),5px_10px_35px_rgba(0,0,0,0.8)] relative p-3 sm:p-8 border-4 border-[#8c1c1c] flex flex-col justify-center"
        style={{ maxWidth: 'min(1024px, calc((100dvh - 32px) * 1.8))', maxHeight: '100dvh' }}
      >
        
        {/* --- TOP HEADER (Title) --- */}
        {/* Hidden entirely in landscape mode. In portrait, shifted up to top-9 to stay under the top-3 Option Buttons */}
        <div className="absolute top-9 sm:top-2 max-lg:landscape:!hidden left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 sm:gap-4 w-full px-2">
           <div className="hidden sm:block max-lg:landscape:!hidden w-8 sm:w-24 h-1 sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
           <h1 className="text-[#f0f0f0] text-[10px] sm:text-3xl max-lg:landscape:!text-[3px] font-black uppercase tracking-widest leading-none drop-shadow-md text-center whitespace-nowrap">
             Researcher's Zugzwang
           </h1>
           <div className="hidden sm:block max-lg:landscape:!hidden w-8 sm:w-24 h-1 sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
        </div>

        {/* --- OPTION CONTROLS (New / Pause / Music / Sound / Screen) --- */}
        {/* Adjusted to top-3 in Portrait to perfectly balance the 29px distance at the bottom border */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-row gap-1 z-50 sm:top-20 md:top-14 sm:right-8 md:right-15 sm:left-auto sm:translate-x-0 sm:flex-col sm:gap-2 max-lg:landscape:!top-3 max-lg:landscape:!left-1/2 max-lg:landscape:!-translate-x-1/2 max-lg:landscape:!flex-row max-lg:landscape:!right-auto max-lg:landscape:!w-full max-lg:landscape:!justify-center max-lg:landscape:!gap-2">
            
            <div className="flex items-center justify-end cursor-pointer group" onClick={startGame}>
                <div className="w-8 sm:w-14 max-lg:landscape:!w-10 text-[8px] sm:text-[10px] max-lg:landscape:!text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left max-lg:landscape:!text-center leading-tight">New</div>
                <div className="w-3 h-1.5 sm:w-6 sm:h-3 max-lg:landscape:!w-3 max-lg:landscape:!h-1.5 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={togglePause}>
                <div className="w-8 sm:w-14 max-lg:landscape:!w-10 text-[8px] sm:text-[10px] max-lg:landscape:!text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left max-lg:landscape:!text-center leading-tight">Pause</div>
                <div className="w-3 h-1.5 sm:w-6 sm:h-3 max-lg:landscape:!w-3 max-lg:landscape:!h-1.5 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={toggleMusic}>
                <div className="w-8 sm:w-14 max-lg:landscape:!w-10 text-[8px] sm:text-[10px] max-lg:landscape:!text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left max-lg:landscape:!text-center leading-tight">
                  <span className="sm:hidden max-lg:landscape:!block">Music</span>
                  <span className="hidden sm:block max-lg:landscape:!hidden">Music <br/><span className="text-[#e33124]">{isMusicOn ? 'ON' : 'OFF'}</span></span>
                </div>
                <div className="w-3 h-1.5 sm:w-6 sm:h-3 max-lg:landscape:!w-3 max-lg:landscape:!h-1.5 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>

            <div className="flex items-center justify-end cursor-pointer group" onClick={toggleSound}>
                <div className="w-8 sm:w-14 max-lg:landscape:!w-10 text-[8px] sm:text-[10px] max-lg:landscape:!text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left max-lg:landscape:!text-center leading-tight">
                  <span className="sm:hidden max-lg:landscape:!block">Sound</span>
                  <span className="hidden sm:block max-lg:landscape:!hidden">Sound <br/><span className="text-[#e33124]">{isSoundOn ? 'ON' : 'OFF'}</span></span>
                </div>
                <div className="w-3 h-1.5 sm:w-6 sm:h-3 max-lg:landscape:!w-3 max-lg:landscape:!h-1.5 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>
            
            <div className="flex items-center justify-end cursor-pointer group" onClick={toggleFullScreen}>
                <div className="w-8 sm:w-14 max-lg:landscape:!w-10 text-[8px] sm:text-[10px] max-lg:landscape:!text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left max-lg:landscape:!text-center leading-tight">
                  <span className="sm:hidden max-lg:landscape:!block">Screen</span>
                  <span className="hidden sm:block max-lg:landscape:!hidden">Screen <br/><span className="text-[#e33124]">{isFullscreen ? 'MIN' : 'MAX'}</span></span>
                </div>
                <div className="w-3 h-1.5 sm:w-6 sm:h-3 max-lg:landscape:!w-3 max-lg:landscape:!h-1.5 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0"></div>
            </div>
        </div>

        {/* --- BRAND LOGO --- */}
        {/* Hidden in landscape. Snapped to top-3 to perfectly level with the Option Buttons in portrait */}
        <div className="absolute top-3 sm:top-10 max-lg:landscape:!hidden left-3 sm:left-10 border-2 sm:border-4 border-[#000000] rounded-full w-8 sm:w-16 h-8 sm:h-16 flex items-center justify-center bg-[#D5D4C8] shadow-inner">
          <span className="font-serif font-black text-xs sm:text-2xl tracking-tighter text-[#000000] ml-0.5 sm:ml-1 drop-shadow-md">B</span>
          <div className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-[#000000]"></div>
        </div>

        {/* --- MAIN GAMEPLAY ROW --- */}
        <div className="flex-1 flex items-center justify-between mt-12 sm:mt-12 max-lg:landscape:!mt-8 h-full">
          
          {/* Left Controls */}
          <div className="flex flex-col justify-center gap-3 sm:gap-16 max-lg:landscape:!gap-8 h-full py-4 sm:py-8 px-2 sm:px-4 w-16 sm:w-32 max-lg:landscape:!w-14 shrink-0 relative translate-y-4 sm:translate-y-12 max-lg:landscape:!translate-y-2">
            <div className="relative self-end">
              <div className="absolute -top-1 sm:-top-5 max-lg:landscape:!-top-4 -left-1 sm:-left-5 max-lg:landscape:!-left-4 w-0 h-0 border-l-[4px] sm:border-l-[10px] max-lg:landscape:!border-l-[10px] border-l-transparent border-r-[4px] sm:border-r-[10px] max-lg:landscape:!border-r-[10px] border-r-transparent border-b-[8px] sm:border-b-[16px] max-lg:landscape:!border-b-[16px] border-b-[#000000] -rotate-45"></div>
              <button 
                onPointerDown={() => handleButton('TL')}
                className="w-10 h-10 sm:w-20 sm:h-20 max-lg:landscape:!w-12 max-lg:landscape:!h-12 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 max-lg:landscape:!border-[2px] border-[#111] cursor-pointer active:translate-y-1 transition-transform"
              ></button>
            </div>
            
            <div className="relative self-end">
              <div className="absolute -bottom-1 sm:-bottom-5 max-lg:landscape:!-bottom-4 -left-1 sm:-left-5 max-lg:landscape:!-left-4 w-0 h-0 border-l-[4px] sm:border-l-[10px] max-lg:landscape:!border-l-[10px] border-l-transparent border-r-[4px] sm:border-r-[10px] max-lg:landscape:!border-r-[10px] border-r-transparent border-t-[8px] sm:border-t-[16px] max-lg:landscape:!border-t-[16px] border-t-[#000000] rotate-45"></div>
              <button 
                onPointerDown={() => handleButton('BL')}
                className="w-10 h-10 sm:w-20 sm:h-20 max-lg:landscape:!w-12 max-lg:landscape:!h-12 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 max-lg:landscape:!border-[2px] border-[#111] cursor-pointer active:translate-y-1 transition-transform"
              ></button>
            </div>
          </div>

          {/* Screen Area Container */}
          <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-center relative">
            <div className="relative w-full aspect-[4/3] border-[4px] sm:border-[12px] max-lg:landscape:!border-[4px] border-[#111111] rounded-lg sm:rounded-xl max-lg:landscape:!rounded-md overflow-hidden flex items-center justify-center flex-none p-0.5 sm:p-1 max-lg:landscape:!p-0.5 bg-[#b0b58e] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
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
            
            {/* Hidden entirely in landscape mode to clean up the screen */}
            <div className="mt-3 sm:mt-2 max-lg:landscape:!hidden flex justify-center items-end">
               <div className="flex items-center gap-1 sm:gap-4">
                  <div className="w-4 sm:w-16 h-[1px] sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
                  <h2 className="text-[#f0f0f0] text-[10px] sm:text-xl font-black uppercase tracking-wider leading-none mt-0 drop-shadow-md">Scientistronica</h2>
                  <div className="w-4 sm:w-16 h-[1px] sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
               </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col justify-center gap-3 sm:gap-16 max-lg:landscape:!gap-8 h-full py-4 sm:py-8 px-2 sm:px-4 w-16 sm:w-32 max-lg:landscape:!w-14 shrink-0 relative translate-y-4 sm:translate-y-12 max-lg:landscape:!translate-y-2">
             <div className="relative self-start">
              <div className="absolute -top-1 sm:-top-5 max-lg:landscape:!-top-4 -right-1 sm:-right-5 max-lg:landscape:!-right-4 w-0 h-0 border-l-[4px] sm:border-l-[10px] max-lg:landscape:!border-l-[10px] border-l-transparent border-r-[4px] sm:border-r-[10px] max-lg:landscape:!border-r-[10px] border-r-transparent border-b-[8px] sm:border-b-[16px] max-lg:landscape:!border-b-[16px] border-b-[#000000] rotate-45"></div>
              <button 
                  onPointerDown={() => handleButton('TR')}
                  className="w-10 h-10 sm:w-20 sm:h-20 max-lg:landscape:!w-12 max-lg:landscape:!h-12 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 max-lg:landscape:!border-[2px] border-[#111] cursor-pointer active:translate-y-1 transition-transform"
               ></button>
             </div>
             <div className="relative self-start">
               <div className="absolute -bottom-1 sm:-bottom-5 max-lg:landscape:!-bottom-4 -right-1 sm:-right-5 max-lg:landscape:!-right-4 w-0 h-0 border-l-[4px] sm:border-l-[10px] max-lg:landscape:!border-l-[10px] border-l-transparent border-r-[4px] sm:border-r-[10px] max-lg:landscape:!border-r-[10px] border-r-transparent border-t-[8px] sm:border-t-[16px] max-lg:landscape:!border-t-[16px] border-t-[#000000] -rotate-45"></div>
               <button 
                  onPointerDown={() => handleButton('BR')}
                  className="w-10 h-10 sm:w-20 sm:h-20 max-lg:landscape:!w-12 max-lg:landscape:!h-12 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 max-lg:landscape:!border-[2px] border-[#111] cursor-pointer active:translate-y-1 transition-transform"
                ></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
