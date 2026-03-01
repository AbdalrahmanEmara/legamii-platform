"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/contests", label: "Contests" },
  { href: "/practice", label: "Practice" },
  { href: "/aiChat", label: "AI Chat" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="px-base hidden lg:block">
      <ul className="flex items-center gap-8">
        {links.map(({ href, label }) => {
          const active = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`font-primary text-sm leading-5 text-neutral-50 transition ${
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
