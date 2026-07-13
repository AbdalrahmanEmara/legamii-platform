"use client";

import { useEffect } from "react";

export default function RegistrationPopup({ contestTitle, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="inline-flex flex-col items-start gap-2 overflow-hidden rounded-sm bg-el-bg px-6 py-4 shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] outline outline-1 outline-offset-[-1px] outline-border">
        <div className="flex w-full items-center justify-between self-stretch">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center gap-2.5 py-px">
              <div className="font-primary text-xs font-bold leading-4 text-green-700">
                REGISTRATION CONFIRMED!
              </div>
            </div>
          </div>
          <div className="h-2.5 w-3 origin-top-left rotate-[-5.83deg] outline outline-[6px] outline-offset-[-3px] outline-green-600" />
          <div className="size-1 origin-top-left rotate-[-13.86deg] outline outline-[5px] outline-offset-[-2.5px] outline-green-700" />
          <div className="size-1 origin-top-left rotate-[-13.86deg] outline outline-[5px] outline-offset-[-2.5px] outline-green-600" />
        </div>
        <div className="flex w-full items-center justify-center gap-2.5 self-stretch py-px">
          <div className="font-secondary text-sm font-medium leading-5 text-text">
            You Have Successfully Joined {contestTitle}!
          </div>
        </div>
      </div>
    </div>
  );
}
