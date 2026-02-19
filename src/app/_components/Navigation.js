"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";

const dogica = localFont({
  src: "../fonts/Dogica_Pixel.ttf",
  display: "swap",
});

const links = [
  { href: "/", label: "Home" },
  { href: "/contests", label: "Contests" },
  { href: "/practice", label: "Practice" },
  { href: "/aiChat", label: "AI Chat" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="px-6">
      <ul className="flex items-center gap-8">
        {links.map(({ href, label }) => {
          const active = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={` ${dogica.className} text-sm leading-none transition ${
                  active
                    ? "font-bold text-neutral-50"
                    : "font-normal text-neutral-400 hover:text-neutral-50"
                } `}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

{
  /* <div class="px-6 inline-flex justify-start items-center gap-8">
  <div
    data-property-1="Default"
    class="flex justify-center items-center gap-2.5"
  >
    <div class="justify-center text-neutral-50 text-sm font-bold font-['Dogica_Pixel'] leading-5">
      Home
    </div>
  </div>
  <div
    data-property-1="Default"
    class="flex justify-center items-center gap-2.5"
  >
    <div class="justify-center text-neutral-50 text-sm font-normal font-['Dogica_Pixel'] leading-5">
      Contests
    </div>
  </div>
  <div
    data-property-1="Default"
    class="flex justify-center items-center gap-2.5"
  >
    <div class="justify-center text-neutral-50 text-sm font-normal font-['Dogica_Pixel'] leading-5">
      Practice
    </div>
  </div>
  <div
    data-property-1="Default"
    class="flex justify-center items-center gap-2.5"
  >
    <div class="justify-center text-neutral-50 text-sm font-normal font-['Dogica_Pixel'] leading-5">
      AI Chat
    </div>
  </div>
</div>; */
}
