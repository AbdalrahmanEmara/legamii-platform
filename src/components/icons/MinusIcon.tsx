// src/components/icons/SquareIcon.tsx

interface MinusIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function MinusIcon({ className, color = "currentColor" }: MinusIconProps) {
  return (
    <svg
      width="14"
      height="1"
      viewBox="0 0 15 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0.5 0.5H14.5" stroke={color} strokeLinecap="round" />
    </svg>
  );
}
