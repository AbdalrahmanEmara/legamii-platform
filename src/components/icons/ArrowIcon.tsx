// src/components/icons/ArrowIcon.tsx

interface ArrowIconProps {
  className?: string;
  size?: number; // controls width (and scales height)
  color?: string;
  strokeWidth?: number;
  title?: string;
}

export default function ArrowIcon({
  className,
  size = 20,
  color = "currentColor",
  strokeWidth = 4,
  title,
}: ArrowIconProps) {
  // original icon ratio: 20 (w) : 13 (h)
  const width = size;
  const height = (size * 13) / 20;

  const a11yProps = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M0 2H2.22222V4.22222H4.44444V6.44444H6.66667V8.66667H8.88889V10.8889H11.1111V8.66667H13.3333V6.44444H15.5556V4.22222H17.7778V2H20"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
