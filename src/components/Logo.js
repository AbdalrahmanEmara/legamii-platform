import Link from "next/link";
import { LogoIcon } from "./icons/LogoIcon";

function Logo({textClass}) {
  return (
    <Link href="/" className="z-10 flex items-center gap-2">
      <div className="flex items-center justify-center gap-2.5">
        {/* <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="40" rx="1" fill="#D865E0" />
          <rect x="2" y="8" width="44" height="24" fill="#D865E0" />
          <rect x="10" y="13" width="28" height="14" fill="#D865E0" />
        </svg> */}
        <LogoIcon />
      </div>
      <span className={`flex items-baseline text-white ${textClass}`}>
        <span className="font-cabin-sketch text-xl tracking-[2.52px]">LE</span>
        <span className="font-primary text-base leading-6">GAMII</span>
      </span>
    </Link>
  );
}

export default Logo;
