"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Flame } from "lucide-react";
import Logo from "@/components/auth/Logo";
import { cn } from "@/lib/utils";

const teacherLinks = [
  { href: "/teacher/dashboard", label: "Dashboard" },
  { href: "/teacher/classes", label: "Classes" },
  { href: "/teacher/contests", label: "Contests" },
  { href: "/teacher/analytics", label: "Analytics" },
  { href: "/teacher/question-bank", label: "Q.Bank" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function TeacherHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="h-xl4 gap-sm px-base md:px-md 2xl:px-xl3 mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="gap-sm md:gap-lg flex min-w-0 flex-1 items-center">
          <Link href="/teacher/dashboard" className="shrink-0">
            <Logo
              className="gap-xs2 items-center"
              logoSize={34}
              LEstyles="text-neutral-50 text-sm tracking-[2px]"
              GAstyles="text-neutral-50 text-[11px] tracking-[0.8px]"
            />
          </Link>

          <nav className="min-w-0 flex-1 overflow-x-auto">
            <ul className="gap-sm pr-sm md:gap-base flex min-w-max items-center">
              {teacherLinks.map((link) => {
                const active = isActive(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "font-primary text-caption-2 uppercase transition-colors",
                        active ? "text-neutral-50" : "text-neutral-400 hover:text-neutral-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="gap-sm md:gap-base flex shrink-0 items-center">
          <div className="gap-xxs hidden items-center md:flex">
            <Flame className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="font-primary text-caption-2 text-neutral-50 uppercase">14 Days</span>
          </div>

          <div
            aria-label="Notifications coming soon"
            title="Notifications coming soon"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-50 opacity-80"
          >
            <Bell className="h-4 w-4" />
          </div>

          <div className="gap-xxs hidden min-w-[74px] flex-col md:flex">
            <div className="gap-xs2 flex items-center justify-between">
              <span className="font-primary text-caption-2 text-neutral-50 uppercase">Lvl 8</span>
              <span className="font-secondary text-[9px] font-semibold text-neutral-300">
                240 XP
              </span>
            </div>
            <div className="border-primary-300/70 h-2 overflow-hidden rounded-full border bg-neutral-900">
              <div className="bg-primary-500 h-full w-[64%]" />
            </div>
          </div>

          <div
            aria-label="Teacher profile placeholder"
            title="Teacher profile placeholder"
            className="font-primary text-caption-2 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-50 uppercase shadow-[2px_2px_0_0_rgba(216,101,224,0.35)]"
          >
            SA
          </div>
        </div>
      </div>
    </header>
  );
}
