"use client";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ProgressBar from "./ui/ProgressBar.tsx";
import { Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function Header() {
  const streak = 10;
  const level = 20;
  const xp = 6;
  const xpProgress = 60;

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

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

  function onBellClick() {
    console.log("Do nothing");
  }
  return (
    <header
      className={`fixed top-0 left-0 z-50 flex h-16 w-full items-center border-b border-cyan-500 bg-black px-16 py-4 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"} `}
    >
      {/* Left */}
      <div className="m-3xl flex items-center gap-8">
        <Logo />
        <Navigation />
      </div>
      {/* Right */}
      {/* <div className="ml-auto flex items-center gap-6">
        <ProgressBar xp={1} level={20} />

        <div className="text-sm text-white">
          <p>LVL {20}</p>
          <p className="text-xs text-gray-400">{1} XP</p>
        </div>

        <img src="public/Logo.png" alt="User avatar" className="h-8 w-8 rounded-full" />
      </div> */}
      <div className="ml-auto flex h-10 items-center gap-[24px]">
        {/* Fire icon + Streak */}
        <div className="flex items-center gap-1.5">
          <img
            src="/Social-Rewards-Trends-Hot-Flame--Streamline-Pixel.svg"
            alt="Streak"
            className="h-6 w-6"
          />
          <span className="text-foreground text-sm font-bold">{streak} Days</span>
        </div>

        {/* Bell icon */}
        <button
          onClick={onBellClick}
          className="border-border bg-muted hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
        >
          <Bell size={24} />
        </button>

        {/* Level + Progress */}
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-foreground text-sm font-bold">Lvl {level}</span>
          <ProgressBar progress={xpProgress} width={120} height={6} />
        </div>

        {/* XP */}
        <span className="text-foreground text-sm font-medium">{xp} XP</span>

        {/* Avatar */}
        <button
          onClick={() => console.log("Open profile")}
          className="border-primary h-10 w-10 overflow-hidden rounded-full border-2"
        >
          <img src="/Logo.png" alt="Avatar" className="h-full w-full object-cover" />
        </button>
      </div>
    </header>
  );
}

export default Header;
