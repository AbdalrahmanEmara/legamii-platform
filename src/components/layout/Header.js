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
import MobileMenu from "./MobileMenu";
import Btn1 from "../ui/Btn1";
import { logoutAction } from "@/lib/actions/auth.actions";
import { Router } from "next/router";
import LogoutButton from "../auth/LogoutButton";

function Header() {
  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const p = await getProfileAction();
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
  }, []);

  const current_streak = profile?.current_streak ?? 0;
  const level = profile?.level ?? 0;
  const points = profile?.points ?? 0;

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) return;
    setActive(true);
    setTimeout(() => setActive(false), 500);
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
        className={`fixed top-0 left-0 z-50 flex h-xl4 w-full items-center justify-between border-b bg-neutral-950 px-md 2xl:px-xl3 py-2xl transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Left */}
        <div className="flex items-center">
          <Logo textClass={'md:hidden 2xl:flex'} />
          <div className="hidden md:block">
            <Navigation />
          </div>
        </div>

        <LogoutButton />

        {/* Mobile right — bell, hamburger */}
        <div className="flex items-center gap-6 md:hidden">
          <button
            onClick={handleClick}
            className={`trophy-color ${active ? "trophy-ring" : ""}`}
            style={{
              color: active ? "#a855f7" : "#FAFAFA",
              background: "none",
              border: "none",
              cursor: "pointer",
              transformOrigin: "top center",
              display: "inline-block",
            }}
          >
            <BellIcon size={24} color="currentColor" />
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="flex size-6 items-center justify-center cursor-pointer"
          >
            <HamburgerIcon size={24} />
          </button>
        </div>

        {/* Tablet+ right — fire, bell, level/xp, avatar */}
        <div className="hidden md:flex flex-1 h-10 items-center justify-end gap-base">
          {/* Fire + Streak */}
          <div className="flex items-center gap-xxs">
            <FireIcon />
            <span className="font-primary text-xs font-bold text-neutral-50">
              {current_streak} Days
            </span>
          </div>

          {/* Bell with ring animation */}
          <button
            onClick={handleClick}
            className={`trophy-color ${active ? "trophy-ring" : ""}`}
            style={{
              color: active ? "#a855f7" : "#FAFAFA",
              background: "none",
              border: "none",
              cursor: "pointer",
              transformOrigin: "top center",
              display: "inline-block",
            }}
          >
            <BellIcon size={32} color="currentColor" />
          </button>

          {/* Level + Progress — desktop only */}
          <div className="hidden lg:flex h-full flex-col justify-between">
            <div className="flex items-end justify-between">
              <span className="font-primary text-xs font-bold leading-4 text-neutral-50">
                Lvl {level}
              </span>
              <span className="text-caption-1 font-secondary font-bold leading-3 text-neutral-50">
                {points} XP
              </span>
            </div>
            <ProgressBar
              progress={points / 1000 * 100}
              height={3}
              borderSquareColor="black"
              squareSize="3"
              className="w-43.5"
            />
          </div>

          {/* Avatar — tablet+ */}
          <button
            onClick={() => { }}
            className="overflow-hidden rounded-full"
          >
            <Image
              src={profile?.avatar || "/images/avatar.png"}
              alt="Avatar"
              width={40}
              height={40}
              className="min-w-[40px]"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <MobileMenu profile={profile} onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
}

export default Header;
