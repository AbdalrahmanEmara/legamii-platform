interface MathsIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
}

export default function MathsIcon({
  className,
  size = 32,
  color = "#CC0044",
  title,
}: MathsIconProps) {
  const width = size;
  const height = (size * 20) / 32;

  const a11yProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}
      <path d="M0 17.4722V0H10.2937V2.41089H12.7587V5.44481H9.7519V3.06101H2.97975V7.23266H7.8557V10.2395H2.97975V17.4722H0Z" fill={color} />
      <path d="M17.4463 19.1923V16.8356H16.2544V14.533H15.0625V11.5262H16.2544V9.19658H17.4463V6.89405H19.18V9.88734H17.9746V12.217H16.7827V13.8423H17.9746V16.1854H19.18V19.1923H17.4463Z" fill={color} />
      <path d="M20.2803 17.2961V15.4541H21.4722V13.1244H22.6641V12.6639H21.4722V10.3614H20.2803V8.50582H22.0004V9.67063H23.1923V11.9867H23.8695V9.67063H25.0614V8.50582H26.7951V10.3614H25.5896V12.6639H24.3977V13.1244H25.5896V15.4541H26.7951V17.2961H25.0614V16.1448H23.8695V13.8152H23.1923V16.1448H22.0004V17.2961H20.2803Z" fill={color} />
      <path d="M27.8825 19.1923V16.1854H29.0744V13.8423H30.2799V12.217H29.0744V9.88734H27.8825V6.89405H29.6027V9.19658H30.7946V11.5262H32V14.533H30.8081V16.8356H29.6027V19.1923H27.8825Z" fill={color} />
    </svg>
  );
}
