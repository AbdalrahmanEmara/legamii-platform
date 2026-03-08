// src/components/icons/FireIcon.tsx

interface FireIconProps {
  className?: string;
  size?: number;
  title?: string;
}

export default function FireIcon({ className, size = 24, title }: FireIconProps) {
  // original icon ratio: 24 (w) : 24 (h) — square
  const width = size;
  const height = size;

  const a11yProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps}
    >
      {title ? <title>{title}</title> : null}

      {/* Red trophy body */}
      <path
        d="M15.105 12.0375H14.2501V13.5H13.5001V14.25H12.7501L12.825 15.375H12.0001V16.5H10.5375V15.75H9.75006V15.375H9.00006V14.6625H8.24999V18.3225H9.38999V19.4625H10.5375V20.61H11.6775V21.75H12.825V20.61H13.965V19.4625H15.105V18.3225H16.2525V16.035H15.105V12.0375Z"
        fill="#FF0000"
      />

      {/* Yellow pixel border pieces */}
      <path d="M21.1387 7.995H22.2862V17.1375H21.1387V7.995Z" fill="#FFEE00" />
      <path d="M19.9987 17.1375H21.1387V19.425H19.9987V17.1375Z" fill="#FFEE00" />
      <path d="M19.9987 6.855H21.1387V7.995H19.9987V6.855Z" fill="#FFEE00" />
      <path d="M18.8512 19.425H19.9987V20.5725H18.8512V19.425Z" fill="#FFEE00" />
      <path d="M18.8512 5.715H19.9987V6.855H18.8512V5.715Z" fill="#FFEE00" />
      <path d="M17.7112 20.5725H18.8512V21.7125H17.7112V20.5725Z" fill="#FFEE00" />
      <path d="M17.7112 4.5675H18.8512V5.715H17.7112V4.5675Z" fill="#FFEE00" />
      <path d="M16.5712 21.7125H17.7112V22.8525H16.5712V21.7125Z" fill="#FFEE00" />
      <path d="M16.5712 3.4275H17.7112V4.5675H16.5712V3.4275Z" fill="#FFEE00" />
      <path d="M15.4237 2.28H16.5712V3.4275H15.4237V2.28Z" fill="#FFEE00" />
      <path d="M7.42875 22.8525H16.5712V24H7.42875V22.8525Z" fill="#FFEE00" />
      <path d="M13.1437 1.14H15.4237V2.28H13.1437V1.14Z" fill="#FFEE00" />
      <path d="M10.8562 6.855H11.9962V11.4225H10.8562V6.855Z" fill="#FFEE00" />
      <path d="M9.70875 3.4275H10.8562V6.855H9.70875V3.4275Z" fill="#FFEE00" />
      <path d="M8.56875 2.28H9.70875V3.4275H8.56875V2.28Z" fill="#FFEE00" />
      <path d="M13.1437 1.14V0H6.28125V1.14H7.42875V2.28H8.56875V1.14H13.1437Z" fill="#FFEE00" />
      <path d="M7.42875 11.4225H10.8562V12.57H7.42875V11.4225Z" fill="#FFEE00" />
      <path d="M6.28125 21.7125H7.42875V22.8525H6.28125V21.7125Z" fill="#FFEE00" />
      <path d="M6.28125 10.2825H7.42875V11.4225H6.28125V10.2825Z" fill="#FFEE00" />
      <path d="M4.00125 20.5725H6.28125V21.7125H4.00125V20.5725Z" fill="#FFEE00" />
      <path d="M6.28125 7.995H5.14124V9.1425H4.00125V10.2825H6.28125V7.995Z" fill="#FFEE00" />
      <path d="M2.85375 19.425H4.00125V20.5725H2.85375V19.425Z" fill="#FFEE00" />
      <path d="M2.85375 10.2825H4.00125V13.71H2.85375V10.2825Z" fill="#FFEE00" />
      <path d="M1.71375 13.71H2.85375V19.425H1.71375V13.71Z" fill="#FFEE00" />

      {/* Orange main trophy shape (filled, evenodd) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1387 17.1375V7.995H19.9987V6.855H18.8512V5.715H17.7112V4.5675H16.5712V3.4275H15.4237V2.28H13.1437V1.14H8.56875V2.28H9.70875V3.4275H10.8562V6.855H11.9962V11.4225H10.8562V12.57H7.42875V11.4225H6.28125V10.2825H4.00125V13.71H2.85375V19.425H4.00125V20.5725H6.28125V21.7125H7.42875V22.8525H16.5712V21.7125H17.7112V20.5725H18.8512V19.425H19.9987V17.1375H21.1387ZM10.5375 16.5H12.0001V15.375H12.825L12.7501 14.25H13.5001V13.5H14.2501V12.0375H15.105V16.035H16.2525V18.3225H15.105V19.4625H13.965V20.61H12.825V21.75H11.6775V20.61H10.5375V19.4625H9.38999V18.3225H8.24999V14.6625H9.00006V15.375H9.75006V15.75H10.5375V16.5Z"
        fill="#FF7700"
      />
    </svg>
  );
}
