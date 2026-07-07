"use client";
import Navigation from "./Navigation";
import ProgressBar from "../ui/ProgressBar.tsx";
import { useEffect, useState, useRef } from "react";
import FireIcon from "../icons/FireIcon";
import BellIcon from "../icons/BellIcon";
import HamburgerIcon from "../icons/HamburgerIcon";
import Image from "next/image";
import Logo from "../Logo";
import { getProfileAction } from "@/lib/actions/student_profile.action";
import { getProfileAction as getTeacherProfileAction } from "@/lib/actions/teacher_profile.action";
import MobileMenu from "./MobileMenu";
import LogoutButton from "../auth/LogoutButton";
import BellButton from "../ui/BellButton";
import { useRouter } from "next/navigation";

function Header({ variant = "student" }) {
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const isStudent = variant === "student";
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const p = isStudent ? await getProfileAction() : await getTeacherProfileAction();
        if (mounted) {
          setProfile(p);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [isStudent]);

  const currentStreak = profile?.current_streak ?? 0;
  const level = profile?.level ?? 0;
  const points = profile?.points ?? 0;

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleNotificationClick = () => {
    router.push("/student/notifications");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`h-xl4 px-md 2xl:px-xl3 py-2xl fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b bg-neutral-950 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Left */}
        <div className="flex items-center">
          <Logo textClass={"md:hidden 2xl:flex"} />
          <div className="hidden md:block">
            <Navigation variant={variant} />
          </div>
        </div>

        {/* Mobile right — bell, hamburger */}
        <div className="flex items-center gap-6 md:hidden">
          <BellButton onClick={handleNotificationClick} />
          <button
            onClick={() => setMenuOpen(true)}
            className="flex size-6 cursor-pointer items-center justify-center"
          >
            <HamburgerIcon size={24} />
          </button>
        </div>

        {/* Tablet+ right */}
        {isStudent ? (
          <div className="gap-base hidden h-10 flex-1 items-center justify-end md:flex">
            <div className="gap-xxs flex items-center">
              <FireIcon />
              <span className="font-primary text-xs font-bold text-neutral-50">
                {currentStreak} Days
              </span>
            </div>

            <button
              onClick={handleNotificationClick}
              className="trophy-color"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                transformOrigin: "top center",
                display: "inline-block",
              }}
            >
              <BellIcon size={32} color="#FAFAFA" />
            </button>

            <div className="hidden h-full flex-col justify-between lg:flex">
              <div className="flex items-end justify-between">
                <span className="font-primary text-xs leading-4 font-bold text-neutral-50">
                  Lvl {level}
                </span>
                <span className="text-caption-1 font-secondary leading-3 font-bold text-neutral-50">
                  {points} XP
                </span>
              </div>
              <ProgressBar
                progress={(points / 1000) * 100}
                height={3}
                borderSquareColor="black"
                squareSize="3"
                className="w-43.5"
              />
            </div>

            <button onClick={() => {}} className="overflow-hidden rounded-full">
              <Image
                src={profile?.avatar || "/images/avatar.png"}
                alt="Avatar"
                width={40}
                height={40}
                className="min-w-[40px]"
              />
            </button>
          </div>
        ) : (
          <div className="gap-base hidden h-10 flex-1 items-center justify-end md:flex">
            <button
              onClick={handleNotificationClick}
              className="trophy-color"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                transformOrigin: "top center",
                display: "inline-block",
              }}
            >
              <BellIcon size={32} color="#FAFAFA" />
            </button>

            <button onClick={() => {}} className="overflow-hidden rounded-full">
              <Image
                src={profile?.avatar_url || "/images/avatar.png"}
                alt="Avatar"
                width={40}
                height={40}
                className="min-w-[40px]"
              />
            </button>
          </div>
        )}
      </header>

      {/* Floating logout trigger — bottom right */}
      <button
        onClick={() => setLogoutPopupOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-primary-500 shadow-lg transition-transform active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>

      {/* Logout confirmation popup */}
      {logoutPopupOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="mx-4 w-full max-w-sm rounded-lg border border-neutral-700 bg-neutral-950 p-6 shadow-2xl">
            <p className="font-primary text-center text-lg font-bold text-neutral-50">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setLogoutPopupOpen(false)}
                className="rounded border border-neutral-600 px-6 py-2 font-primary text-sm font-semibold text-neutral-300 transition-colors hover:bg-neutral-800"
              >
                Cancel
              </button>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {menuOpen && (
        <MobileMenu profile={profile} variant={variant} onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
}

export default Header;
