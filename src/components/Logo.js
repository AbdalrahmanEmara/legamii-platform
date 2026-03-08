import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src="/Logo.png" height="60" width="60" alt="Legamii_logo" />

      <span className="flex items-baseline text-white">
        <span className={`font-cabin-sketch text-xl tracking-[2.5px]`}>LE</span>
        <span className={`font-primary text-base`}>GAMII</span>
      </span>
    </Link>
  );
}

export default Logo;
