// src/components/icons/CloseIcon.tsx

interface CloseIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CloseIcon({ className, size = 16, color = "currentColor" }: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14 2L2 14" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2L14 14" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
