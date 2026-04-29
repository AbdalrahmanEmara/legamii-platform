import React from 'react';
import ReusableWindow from "./ReusableWindow";

export default function SystemError({ message, onRetry }) {
  const handleAction = onRetry || (() => window.location.reload());
  const actionText = onRetry ? "Retry Request" : "Reload System";

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-6">
      <ReusableWindow title="CRITICAL_FAILURE.SYS" className="w-[480px] max-w-full m-auto shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col gap-8 p-12 bg-[#fafafa] rounded-b-lg">
          <div className="flex items-center justify-center">
            {/* Neobrutalist Error Icon */}
            <div className="relative flex h-28 w-28 items-center justify-center border-4 border-text bg-red-50 shadow-[6px_6px_0_0_#000]">
              <div className="absolute flex h-16 w-16 items-center justify-center border-4 border-text bg-red-500 shadow-[2px_2px_0_0_#000] rotate-12">
                <span className="text-white text-5xl font-black -rotate-12 pb-1">!</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 font-primary text-text text-center">
            <h2 className="text-xl font-bold uppercase tracking-widest text-red-600 border-b-2 border-red-200 pb-2">
              System Error
            </h2>
            
            <p className="text-sm font-medium bg-white p-4 border-2 border-text shadow-[4px_4px_0_0_#000] break-words">
              {message || "An unexpected error occurred while processing your request."}
            </p>
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={handleAction}
                className="bg-primary-500 text-white font-bold uppercase tracking-widest px-8 py-3 border-4 border-text shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[0_0_0_0_#000] transition-all"
              >
                {actionText}
              </button>
            </div>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}
