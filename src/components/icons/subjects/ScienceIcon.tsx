interface ScienceIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
}

export default function ScienceIcon({
  className,
  size = 32,
  color = "#0059FF",
  title,
}: ScienceIconProps) {
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
      <path d="M27.4248 18.28H28.9548V25.9H27.4248V18.28Z" fill={color} />
      <path d="M25.905 25.8999H27.425V28.9499H25.905V25.8999Z" fill={color} />
      <path d="M25.905 15.23H27.425V18.28H25.905V15.23Z" fill={color} />
      <path d="M24.385 28.95H25.905V30.4699H24.385V28.95Z" fill={color} />
      <path d="M24.385 13.71H25.905V15.23H24.385V13.71Z" fill={color} />
      <path d="M22.855 18.28H24.385V19.81H22.855V18.28Z" fill={color} />
      <path d="M22.855 12.1899H24.385V13.7099H22.855V12.1899Z" fill={color} />
      <path d="M7.61499 30.47H24.385V32H7.61499V30.47Z" fill={color} />
      <path d="M19.8049 10.6599H22.8549V12.1899H19.8049V10.6599Z" fill={color} />
      <path d="M18.2849 15.23H19.8049V16.76H18.2849V15.23Z" fill={color} />
      <path d="M15.2349 19.8101H16.7649V21.3301H15.2349V19.8101Z" fill={color} />
      <path d="M12.1948 15.23H13.7148V16.76H12.1948V15.23Z" fill={color} />
      <path d="M13.715 1.52H18.285V10.66H19.805V1.52H21.335V0H10.665V1.52H12.195V10.66H13.715V1.52Z" fill={color} />
      <path d="M9.14502 10.6599H12.195V12.1899H9.14502V10.6599Z" fill={color} />
      <path d="M9.14502 18.28H10.665V19.81H9.14502V18.28Z" fill={color} />
      <path d="M7.61497 27.4201H9.14497V28.9501H22.855V27.4201H24.385V25.9001H25.905V22.8501H24.385V21.3301H21.335V22.8501H19.805V24.3801H15.235V22.8501H12.195V21.3301H7.61497V22.8501H6.09497V25.9001H7.61497V27.4201Z" fill={color} />
      <path d="M7.61499 12.1899H9.14499V13.7099H7.61499V12.1899Z" fill={color} />
      <path d="M6.09497 28.95H7.61497V30.4699H6.09497V28.95Z" fill={color} />
      <path d="M6.09497 13.71H7.61497V15.23H6.09497V13.71Z" fill={color} />
      <path d="M4.57495 25.8999H6.09495V28.9499H4.57495V25.8999Z" fill={color} />
      <path d="M4.57495 15.23H6.09495V18.28H4.57495V15.23Z" fill={color} />
      <path d="M3.04492 18.28H4.57492V25.9H3.04492V18.28Z" fill={color} />
    </svg>
  );
}
