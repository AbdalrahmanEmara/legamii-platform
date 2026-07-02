"use client";

import ReusableWindow from "./ReusableWindow";

interface SystemConfirmProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function SystemConfirm({
  title = "CONFIRM_ACTION.SYS",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
  loading = false,
}: SystemConfirmProps) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/45 p-6">
      <ReusableWindow
        title={title}
        className="w-[520px] max-w-full overflow-hidden"
      >
        <div className="bg-el-bg p-8">

          <div className="mb-8 flex justify-center">
            <div
              className={`
                flex h-24 w-24 items-center justify-center
                border-4 border-text
                shadow-[4px_4px_0_0_#000]
                ${danger ? "bg-red-100" : "bg-yellow-100"}
              `}
            >
              <span
                className={`
                  text-5xl font-black
                  ${danger ? "text-red-600" : "text-yellow-700"}
                `}
              >
                !
              </span>
            </div>
          </div>

          <h2 className="mb-4 text-center font-primary text-lg uppercase tracking-widest">
            {danger ? "Delete Question?" : "Confirm Action"}
          </h2>

          <div className="border border-text bg-white p-4 text-center shadow-[2px_2px_0_0_#000]">
            <p className="font-secondary text-sm">
              {message}
            </p>
          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              onClick={onCancel}
              disabled={loading}
              className="
                border border-neutral-400
                bg-white
                px-6
                py-2
                font-primary
                uppercase
                shadow-[2px_2px_0_0_#000]
                hover:-translate-y-0.5
                transition
              "
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className={`
                border border-text
                px-6
                py-2
                font-primary
                uppercase
                shadow-[2px_2px_0_0_#000]
                hover:-translate-y-0.5
                transition
                ${
                  danger
                    ? "bg-red-500 text-white"
                    : "bg-primary-500"
                }
              `}
            >
              {loading ? "Working..." : confirmText}
            </button>

          </div>

        </div>
      </ReusableWindow>
    </div>
  );
}