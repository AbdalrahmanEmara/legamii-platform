"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../Logo";
import ProgressBar from "../ui/ProgressBar";
import { CloseIcon } from "../icons/CloseIcon";
import FireIcon from "../icons/FireIcon";
import BellIcon from "../icons/BellIcon";
import SettingsIcon from "../icons/SettingsIcon";

const links = [
  { href: "/home", label: "Home" },
  { href: "/contests", label: "Contests" },
  { href: "/practice", label: "Practice" },
  { href: "/aiChat", label: "AI Chat" },
];

export default function MobileMenu({ profile, onClose }) {
  const pathname = usePathname();

  const current_streak = profile?.current_streak ?? 14;
  const level = profile?.level ?? 8;
  const xp = profile?.xp ?? 240;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-neutral-950 px-8 py-4">
      {/* Top bar */}
      <div className="flex h-10 items-center justify-between">
        <Logo />
        <button onClick={onClose} className="relative size-4 cursor-pointer">
          <CloseIcon size={16} color="#FAFAFA" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto pt-10 pb-14">
        {/* Top section */}
        <div className="flex flex-col gap-14">
          {/* Level + XP + Streak */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-10 w-full items-end justify-start gap-6">
              <div className="flex w-60 flex-col gap-1">
                <div className="flex h-5 items-end justify-between self-stretch">
                  <span className="font-primary text-xs font-bold leading-4 text-neutral-50">
                    Lvl {level}
                  </span>
                  <span className="font-secondary text-[10px] font-bold leading-3 text-neutral-50">
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
                <span className="font-primary text-[10px] font-bold leading-4 text-neutral-50">
                  {current_streak}
                </span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-8">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`font-primary text-xs leading-4 ${
                    active ? "font-bold" : "font-normal"
                  } text-neutral-50`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-6">
          {/* Profile */}
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-4"
          >
            <Image
              src={profile?.avatar || "/images/avatar.png"}
              alt="Avatar"
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
            <span className="font-primary text-xs font-normal leading-4 text-neutral-50">
              Profile
            </span>
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            onClick={onClose}
            className="flex items-center gap-4"
          >
            <BellIcon size={32} color="#FAFAFA" />
            <span className="font-primary text-xs font-normal leading-4 text-neutral-50">
              Notifications
            </span>
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-4"
          >
            <SettingsIcon size={32} color="#FAFAFA" />
            <span className="font-primary text-xs font-normal leading-4 text-neutral-50">
              Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
