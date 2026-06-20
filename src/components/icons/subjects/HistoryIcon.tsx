interface HistoryIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
}

export default function HistoryIcon({
  className,
  size = 32,
  color = "#CCB800",
  title,
}: HistoryIconProps) {
  const a11yProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}
      <path d="M3.81006 1.52H28.1901V3.05H26.6701V4.57H28.1901V7.62H29.7201V30.48H31.2401V6.1H29.7201V1.52H31.2401V0H3.81006V1.52Z" fill={color} />
      <path d="M6.86006 30.4801V7.6201H16.0001V6.1001H3.81006V7.6201H5.34006V30.4801H3.81006V32.0001H29.7201V30.4801H6.86006Z" fill={color} />
      <path d="M25.15 10.67H23.62V6.10005H22.1V4.57005H23.62V3.05005H16V4.57005H17.53V6.10005H19.05V21.33H20.57V19.81H22.1V18.29H23.62V19.81H25.15V21.33H26.67V6.10005H25.15V10.67Z" fill={color} />
      <path d="M25.1501 4.57007H23.6201V6.10007H25.1501V4.57007Z" fill={color} />
      <path d="M14.4801 3.05005H5.34009V4.57005H14.4801V3.05005Z" fill={color} />
      <path d="M3.81004 28.95H2.29004V30.4799H3.81004V28.95Z" fill={color} />
      <path d="M3.81004 1.52002H2.29004V3.05002H3.81004V1.52002Z" fill={color} />
      <path d="M2.29001 6.10005H3.81001V4.57005H2.29001V3.05005H0.76001V28.9501H2.29001V6.10005Z" fill={color} />
    </svg>
  );
}
