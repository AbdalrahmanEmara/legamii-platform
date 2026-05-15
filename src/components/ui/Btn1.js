import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// Helper to handle class merging cleanly
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Btn1({
  title,
  disabled = false,
  isLoading = false,
  onClick,
  className,
  ...props
}) {
  // Determine if the button should be non-interactive
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        // Base stylestrue
        "bg-primary-500 border-text text-text px-md py-sm font-primary rounded border text-base font-bold uppercase transition-all",
        "shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] focus-within:shadow-[0_4px_8px_rgba(0,0,0,0.2)]",
        "cursor-pointer active:translate-y-0.25",
        // State-based styles
        isDisabled && "cursor-not-allowed opacity-50",
        isLoading && "cursor-wait",
        className // Allows user to override anything above
      )}
    >
      <span className="flex items-center justify-center gap-2">
        {title}
        {isLoading && (
          <svg
            className="h-5 w-5 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </span>
    </button>
  );
}
