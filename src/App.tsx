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

  // --- FULL SCREEN LOGIC ---
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
    <div className="min-h-[100dvh] bg-[#1a1a1a] flex items-center justify-center p-1 sm:p-8 font-sans select-none overflow-hidden">
      
      <div className="w-full max-w-5xl md:aspect-[1.8/1] bg-[#D5D4C8] rounded-3xl sm:rounded-[2rem] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.3),5px_10px_35px_rgba(0,0,0,0.8)] relative p-2 sm:p-8 border-4 border-[#8c1c1c] flex flex-col justify-center">
        
        {/* --- TOP HEADER (Title) --- */}
        <div className="absolute top-2 sm:top-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 sm:gap-4 w-full px-2">
           <div className="w-4 sm:w-24 h-[1px] sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
           <h1 className="text-[#f0f0f0] text-[10px] sm:text-3xl font-black uppercase tracking-widest leading-none drop-shadow-md text-center whitespace-nowrap">
             Researcher's Zugzwang
           </h1>
           <div className="w-4 sm:w-24 h-[1px] sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
        </div>

        {/* --- OPTION CONTROLS --- */}
        <div className="absolute top-6 sm:top-24 md:top-24 lg:top-24 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-13 md:right-13 flex flex-row sm:flex-col gap-3 sm:gap-2 z-50">
            
            <div className="flex flex-col sm:flex-row items-center sm:justify-end cursor-pointer group" onClick={startGame}>
                <div className="text-[7px] sm:text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left leading-tight sm:w-14 sm:mr-2">
                  New
                </div>
                <div className="w-3.5 sm:w-6 h-1.5 sm:h-3 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0 mt-0.5 sm:mt-0"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-end cursor-pointer group" onClick={togglePause}>
                <div className="text-[7px] sm:text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left leading-tight sm:w-14 sm:mr-2">
                  Pause
                </div>
                <div className="w-3.5 sm:w-6 h-1.5 sm:h-3 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0 mt-0.5 sm:mt-0"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-end cursor-pointer group" onClick={toggleMusic}>
                <div className="text-[7px] sm:text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left leading-tight sm:w-14 sm:mr-2">
                  Music <br className="hidden sm:block"/><span className="text-[#e33124]">{isMusicOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="w-3.5 sm:w-6 h-1.5 sm:h-3 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0 mt-0.5 sm:mt-0"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-end cursor-pointer group" onClick={toggleSound}>
                <div className="text-[7px] sm:text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left leading-tight sm:w-14 sm:mr-2">
                  Sound <br className="hidden sm:block"/><span className="text-[#e33124]">{isSoundOn ? 'ON' : 'OFF'}</span>
                </div>
                <div className="w-3.5 sm:w-6 h-1.5 sm:h-3 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0 mt-0.5 sm:mt-0"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-end cursor-pointer group" onClick={toggleFullScreen}>
                <div className="text-[7px] sm:text-[10px] font-bold text-[#000000] uppercase text-center sm:text-left leading-tight sm:w-14 sm:mr-2">
                  Screen <br className="hidden sm:block"/><span className="text-[#e33124]">{isFullscreen ? 'MIN' : 'MAX'}</span>
                </div>
                <div className="w-3.5 sm:w-6 h-1.5 sm:h-3 bg-[#1a1a1a] rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.8)] border border-[#ffffff]/10 group-active:bg-[#333] shrink-0 mt-0.5 sm:mt-0"></div>
            </div>
        </div>

        {/* --- BRAND LOGO (Left side) --- */}
        <div className="absolute top-2 sm:top-10 left-2 sm:left-10 border-2 sm:border-4 border-[#000000] rounded-full w-6 sm:w-16 h-6 sm:h-16 flex items-center justify-center bg-[#D5D4C8] shadow-inner">
          <span className="font-serif font-black text-[10px] sm:text-2xl tracking-tighter text-[#000000] ml-0.5 sm:ml-1 drop-shadow-md">B</span>
          <div className="absolute left-0.5 sm:left-2 top-1/2 -translate-y-1/2 w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-[#000000]"></div>
        </div>

        {/* --- MAIN GAMEPLAY ROW --- */}
        <div className="flex-1 flex items-center justify-between mt-10 sm:mt-12 px-1 sm:px-0">
          
          {/* Left Controls */}
          <div className="flex flex-col justify-center gap-6 sm:gap-16 h-full py-4 sm:py-8 px-1 sm:px-4 w-14 sm:w-32 shrink-0 relative translate-y-4 sm:translate-y-12">
            <div className="relative self-end">
              <div className="absolute -top-1 sm:-top-5 -left-1 sm:-left-5 w-2 sm:w-0 h-2 sm:h-0 border-l-[3px] sm:border-l-[10px] border-l-transparent border-r-[3px] sm:border-r-[10px] border-r-transparent border-b-[6px] sm:border-b-[16px] border-b-[#000000] -rotate-45"></div>
              <button 
                onPointerDown={() => handleButton('TL')}
                className="w-10 h-10 sm:w-20 sm:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
              ></button>
            </div>
            
            <div className="relative self-end">
              <div className="absolute -bottom-1 sm:-bottom-5 -left-1 sm:-left-5 w-2 sm:w-0 h-2 sm:h-0 border-l-[3px] sm:border-l-[10px] border-l-transparent border-r-[3px] sm:border-r-[10px] border-r-transparent border-t-[6px] sm:border-t-[16px] border-t-[#000000] rotate-45"></div>
              <button 
                onPointerDown={() => handleButton('BL')}
                className="w-10 h-10 sm:w-20 sm:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
              ></button>
            </div>
          </div>

          {/* Screen Area Container */}
          <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-center relative">
            <div className="relative w-full aspect-[4/3] border-[4px] sm:border-[12px] border-[#111111] rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center flex-none p-0.5 sm:p-1 bg-[#b0b58e] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-50"></div>
               {/* CHANGED: togglePause is now securely passed in here */}
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
            
            <div className="mt-1 sm:mt-4 flex justify-center items-end">
               <div className="flex items-center gap-1 sm:gap-4">
                  <div className="w-4 sm:w-16 h-[1px] sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
                  <h2 className="text-[#f0f0f0] text-[6px] sm:text-xl font-black uppercase tracking-wider leading-none mt-1 drop-shadow-md">Scientistronica</h2>
                  <div className="w-4 sm:w-16 h-[1px] sm:h-[2px] bg-[#f0f0f0] opacity-80"></div>
               </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col justify-center gap-6 sm:gap-16 h-full py-4 sm:py-8 px-1 sm:px-4 w-14 sm:w-32 shrink-0 relative translate-y-4 sm:translate-y-12">
             <div className="relative self-start">
              <div className="absolute -top-1 sm:-top-5 -right-1 sm:-right-5 w-2 sm:w-0 h-2 sm:h-0 border-l-[3px] sm:border-l-[10px] border-l-transparent border-r-[3px] sm:border-r-[10px] border-r-transparent border-b-[6px] sm:border-b-[16px] border-b-[#000000] rotate-45"></div>
              <button 
                  onPointerDown={() => handleButton('TR')}
                  className="w-10 h-10 sm:w-20 sm:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
               ></button>
             </div>
             <div className="relative self-start">
               <div className="absolute -bottom-1 sm:-bottom-5 -right-1 sm:-right-5 w-2 sm:w-0 h-2 sm:h-0 border-l-[3px] sm:border-l-[10px] border-l-transparent border-r-[3px] sm:border-r-[10px] border-r-transparent border-t-[6px] sm:border-t-[16px] border-t-[#000000] -rotate-45"></div>
               <button 
                  onPointerDown={() => handleButton('BR')}
                  className="w-10 h-10 sm:w-20 sm:h-20 bg-[#e33124] rounded-full shadow-[inset_2px_4px_10px_rgba(255,255,255,0.2),_0_5px_10px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-[#111] cursor-pointer active:translate-y-1 transition-transform"
                ></button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
