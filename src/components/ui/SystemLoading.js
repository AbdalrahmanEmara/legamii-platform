"use client"
import React, { useState, useEffect } from 'react';
import ReusableWindow from "./ReusableWindow";

export default function SystemLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + Math.floor(Math.random() * 20) + 10));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-6">
      <ReusableWindow title="AI_TUTOR_LOADING.SYS" className="w-[480px] max-w-full m-auto shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col gap-10 p-12 bg-[#fafafa] rounded-b-lg">
          <div className="flex items-center justify-center">
            {/* Neobrutalist spinning cubes */}
            <div className="relative flex h-28 w-28 items-center justify-center border-4 border-text bg-primary-50 shadow-[6px_6px_0_0_#000]">
              <div className="absolute h-14 w-14 animate-[spin_3s_linear_infinite] border-4 border-text bg-primary-500 shadow-[2px_2px_0_0_#000]"></div>
              <div className="absolute h-8 w-8 animate-[spin_2s_linear_infinite_reverse] border-2 border-text bg-white shadow-[2px_2px_0_0_#000]"></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 font-primary text-text">
            <div className="flex justify-between text-base font-bold uppercase tracking-widest">
              <span>System Boot</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            {/* Retro progress bar */}
            <div className="h-8 w-full border-4 border-text bg-white p-1 shadow-[4px_4px_0_0_#000]">
              <div 
                className="h-full bg-primary-500 transition-all duration-200 ease-out border-r-2 border-text"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600 animate-pulse font-medium tracking-wide uppercase">
              &gt; loading neural assets...
            </div>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}
