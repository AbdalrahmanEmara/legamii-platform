interface SettingsIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function SettingsIcon({ className, size = 32, color = "#FAFAFA" }: SettingsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={true}
    >
      <rect x="12" y="2" width="8" height="4" fill={color} />
      <rect x="14" y="6" width="4" height="2" fill={color} />
      <rect x="12" y="8" width="8" height="16" fill={color} />
      <rect x="10" y="10" width="2" height="12" fill={color} />
      <rect x="20" y="10" width="2" height="12" fill={color} />
      <rect x="8" y="12" width="2" height="8" fill={color} />
      <rect x="22" y="12" width="2" height="8" fill={color} />
      <rect x="6" y="14" width="2" height="4" fill={color} />
      <rect x="24" y="14" width="2" height="4" fill={color} />
      <rect x="14" y="24" width="4" height="2" fill={color} />
      <rect x="12" y="26" width="8" height="4" fill={color} />
    </svg>
  );
}
