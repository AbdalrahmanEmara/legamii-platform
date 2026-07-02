"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDENT_LINKS, TEACHER_LINKS } from "@/lib/navigationLinks";

export default function Navigation({ variant = "student", links }) {
  const pathname = usePathname();
  const navLinks = links ?? (variant === "teacher" ? TEACHER_LINKS : STUDENT_LINKS);

  return (
    <nav className="px-base hidden md:block">
      <ul className="flex items-center gap-8">
        {navLinks.map(({ href, label }) => {
          const active = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`font-primary text-xs leading-4 text-neutral-50 transition 2xl:text-sm 2xl:leading-5 2xl:font-bold ${
                  active
                    ? "font-bold text-neutral-50"
                    : "font-normal text-neutral-400 hover:text-neutral-50"
                }`}
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
