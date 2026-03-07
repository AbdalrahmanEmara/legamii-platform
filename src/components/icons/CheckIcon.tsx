// src/components/icons/CheckIcon.tsx

interface CheckIconProps {
  className?: string;
  size?: number;
  title?: string;
  color?: string;
}

export default function CheckIcon({
  className,
  size = 26,
  title,
  color = "#E5E5E5",
}: CheckIconProps) {
  // original ratio: 26 (w) : 20 (h)
  const width = size;
  const height = (size * 20) / 26;

  const a11yProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}

      {/* Main checkmark */}
      <path
        d="M8.97479 12.621L12.4885 15.5726L16.862 10.553L19.0543 7.95237L23.1871 3.29705"
        stroke="currentColor"
        strokeWidth="6"
      />

      {/* Shadow stroke */}
      <path
        d="M1.9781 13.5616L5.26571 9.71135"
        stroke="#A3A3A3"
        strokeWidth="5"
      />

      {/* Left checkmark segment */}
      <path
        d="M1.90119 12.9893L5.1888 9.13909"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}