"use client";

import ReusableWindow from "./ReusableWindow";

interface SystemValidationProps {
  title?: string;
  message: string;
  onClose: () => void;
}

export default function SystemValidation({
  title = "VALIDATION_ERROR.SYS",
  message,
  onClose,
}: SystemValidationProps) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-6">
      <ReusableWindow
        title={title}
        className="w-[500px] max-w-full overflow-hidden"
      >
        <div className="bg-el-bg p-8">

          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center border-4 border-text bg-yellow-100 shadow-[4px_4px_0_0_#000]">
              <span className="text-5xl font-black text-yellow-700">
                !
              </span>
            </div>
          </div>

          <h2 className="mb-4 text-center font-primary text-lg uppercase tracking-widest">
            Validation Error
          </h2>

          <div className="border border-text bg-white p-4 text-center shadow-[2px_2px_0_0_#000]">
            <p className="font-secondary text-sm">
              {message}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="border border-text bg-primary-500 px-8 py-2 font-primary uppercase shadow-[2px_2px_0_0_#000] hover:-translate-y-0.5 transition"
            >
              OK
            </button>
          </div>

        </div>
      </ReusableWindow>
    </div>
  );
}