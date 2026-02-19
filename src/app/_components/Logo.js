import Link from "next/link";
import Image from "next/image";

import { Josefin_Sans } from "next/font/google";
import { Cabin_Sketch } from "next/font/google";
import localFont from "next/font/local";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

const cabin = Cabin_Sketch({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const dogica = localFont({
  src: "../fonts/Dogica_Pixel.ttf",
  display: "swap",
});

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src="/Logo.png" height="60" width="60" alt="Legamii_logo" />

      <span className="flex items-baseline text-white">
        <span className={`${cabin.className} text-xl tracking-[2.5px]`}>LE</span>
        <span className={`${dogica.className} text-base`}>GAMII</span>
      </span>
    </Link>
  );
}

export default Logo;
