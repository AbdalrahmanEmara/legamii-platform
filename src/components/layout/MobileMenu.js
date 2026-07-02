"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import ProgressBar from "../ui/ProgressBar";
import { CloseIcon } from "../icons/CloseIcon";
import FireIcon from "../icons/FireIcon";
import BellIcon from "../icons/BellIcon";

import { STUDENT_LINKS, TEACHER_LINKS } from "@/lib/navigationLinks";

export default function MobileMenu({ profile, onClose, variant = "student", links }) {
  const pathname = usePathname();
  const isStudent = variant === "student";
  const navLinks = links ?? (isStudent ? STUDENT_LINKS : TEACHER_LINKS);

  const currentStreak = profile?.current_streak ?? 0;
  const level = profile?.level ?? 0;
  const xp = profile?.points ?? profile?.xp ?? 0;

  return (
    <div className="fixed inset-0 z-60 flex flex-col bg-neutral-950 px-8 py-4">
      <div className="flex h-10 items-center justify-between">
        <Logo />
        <button onClick={onClose} className="relative size-4 cursor-pointer">
          <CloseIcon size={16} color="#FAFAFA" />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto pt-10 pb-14">
        <div className="flex flex-col gap-14">
          {isStudent && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-10 w-full items-end justify-start gap-6">
                <div className="flex w-60 flex-col gap-1">
                  <div className="flex h-5 items-end justify-between self-stretch">
                    <span className="font-primary text-xs leading-4 font-bold text-neutral-50">
                      Lvl {level}
                    </span>
                    <span className="text-caption-1 font-secondary leading-3 font-bold text-neutral-50">
                      {xp} XP
                    </span>
                  </div>
                  <ProgressBar
                    progress={(xp / 1000) * 100}
                    height={3}
                    borderSquareColor="black"
                    squareSize="3"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <FireIcon />
                  <span className="text-caption-1 font-primary leading-4 font-bold text-neutral-50">
                    {currentStreak}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`font-primary text-xs leading-4 text-neutral-50 ${
                    active ? "font-bold" : "font-normal"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {isStudent && (
          <div className="flex flex-col gap-6">
            <Link
              href="/student/notifications"
              onClick={onClose}
              className="flex items-center gap-4"
            >
              <BellIcon size={32} color="#FAFAFA" />
              <span className="font-primary text-xs leading-4 font-normal text-neutral-50">
                Notifications
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
