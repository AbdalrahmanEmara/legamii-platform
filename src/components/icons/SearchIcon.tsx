interface SearchIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function SearchIcon({ className, size = 24, color = "#FAFAFA" }: SearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={true}
    >
      <rect x="2" y="2" width="16" height="16" rx="1" stroke={color} strokeWidth="2" />
      <rect x="17" y="15" width="2" height="7" rx="1" fill={color} />
      <rect x="15" y="20" width="2" height="2" fill={color} />
      <rect x="19" y="15" width="2" height="2" fill={color} />
    </svg>
  );
}
