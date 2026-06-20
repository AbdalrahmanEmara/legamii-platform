// src/components/icons/DoneIcon.tsx

interface DoneIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
}

export default function DoneIcon({
  className,
  size = 26,
  color = "#E5E5E5",
  title,
}: DoneIconProps) {
  const a11yProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <svg
      width={size}
      height={(size * 20) / 26}
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}

      <path
        d="M8.97479 12.621L12.4885 15.5726L16.862 10.553L19.0543 7.95237L23.1871 3.29705"
        stroke={color}
        strokeWidth="6"
      />
      <path
        d="M1.9781 13.5616L5.26571 9.71135"
        stroke={color}
        strokeWidth="5"
      />
      <path
        d="M1.90119 12.9893L5.1888 9.13909"
        stroke={color}
        strokeWidth="5"
      />
    </svg>
  );
}
