// src/components/icons/BellIcon.tsx

interface BellIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
}

export default function BellIcon({
  className,
  size = 32,
  color = "#FAFAFA",
  title,
}: BellIconProps) {
  // original icon ratio: 32 (w) : 32 (h) — square
  const width = size;
  const height = size;

  const a11yProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}

      <path d="M27.3799 20.7598H28.8999V23.8098H27.3799V20.7598Z" fill={color} />
      <path d="M25.85 23.8101H27.38V25.3301H25.85V23.8101Z" fill={color} />
      <path d="M25.85 19.2402H27.38V20.7602H25.85V19.2402Z" fill={color} />
      <path d="M22.7999 25.3301H25.8499V26.8501H22.7999V25.3301Z" fill={color} />
      <path d="M24.33 11.6201H25.85V19.2401H24.33V11.6201Z" fill={color} />
      <path d="M22.7999 22.2798H24.3299V23.8098H22.7999V22.2798Z" fill={color} />
      <path d="M22.7999 8.56982H24.3299V11.6198H22.7999V8.56982Z" fill={color} />
      <path
        d="M9.08997 22.2798H12.14V23.8098H13.66V25.3298H18.23V23.8098H19.76V22.2798H22.8V20.7598H9.08997V22.2798Z"
        fill={color}
      />
      <path d="M21.2799 7.0498H22.7999V8.5698H21.2799V7.0498Z" fill={color} />
      <path d="M9.08997 26.8501H22.8V28.3801H9.08997V26.8501Z" fill={color} />
      <path d="M18.23 5.52002H21.28V7.05002H18.23V5.52002Z" fill={color} />
      <path d="M13.6599 4H18.2299V5.52H13.6599V4Z" fill={color} />
      <path d="M10.61 5.52002H13.66V7.05002H10.61V5.52002Z" fill={color} />
      <path d="M9.08997 7.0498H10.61V8.5698H9.08997V7.0498Z" fill={color} />
      <path d="M6.03992 25.3301H9.08992V26.8501H6.03992V25.3301Z" fill={color} />
      <path d="M7.56995 22.2798H9.08995V23.8098H7.56995V22.2798Z" fill={color} />
      <path d="M7.56995 8.56982H9.08995V11.6198H7.56995V8.56982Z" fill={color} />
      <path d="M6.03992 11.6201H7.56992V19.2401H6.03992V11.6201Z" fill={color} />
      <path d="M4.52002 23.8101H6.04002V25.3301H4.52002V23.8101Z" fill={color} />
      <path d="M4.52002 19.2402H6.04002V20.7602H4.52002V19.2402Z" fill={color} />
      <path d="M3 20.7598H4.52V23.8098H3V20.7598Z" fill={color} />
    </svg>
  );
}
