"use client";
import Navigation from "./Navigation";
import ProgressBar from "../ui/ProgressBar.tsx";
import { useEffect, useState, useRef } from "react";
import { LogoIcon } from "../icons/LogoIcon";
import FireIcon from "../icons/FireIcon";
import BellIcon from "../icons/BellIcon";
import Image from "next/image";
import Logo from "../Logo";

function Header() {
  const streak = 10;
  const level = 20;
  const xp = 6;
  const xpProgress = 60; // 0-100

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) return;
    setActive(true);
    setTimeout(() => setActive(false), 500);
    console.log("Do nothing");
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
    <header
      className={`h-xl4 px-xl3 fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b bg-neutral-950 py-4 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"} `}
    >
      {/* Left */}
      <div className="gap-xl5 flex items-center">
        <Logo size={49} />
        <Navigation />
      </div>

      {/* Right */}
      <div className="gap-base flex h-10 items-center">
        {/* Fire icon + Streak */}
        <div className="gap-xxs flex items-center">
          <FireIcon />
          <span className="font-primary text-xs font-bold text-neutral-50">{streak} Days</span>
        </div>

        {/* Notifications */}
        <style>{`
        @keyframes ring {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(18deg); }
          30%  { transform: rotate(-16deg); }
          45%  { transform: rotate(12deg); }
          60%  { transform: rotate(-8deg); }
          75%  { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }
        .trophy-ring {
          animation: ring 0.5s ease forwards;
        }
        .trophy-color {
          transition: color 0.2s ease;
        }
      `}</style>

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

        {/* Level + Progress */}
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-end justify-between">
            <span className="font-primary text-xs leading-4 font-bold text-neutral-50">
              Lvl {level}
            </span>
            <span className="text-caption-1 font-secondary leading-3 font-bold text-neutral-50">
              {xp} XP
            </span>
          </div>
          <ProgressBar
            progress={xpProgress}
            width={40}
            height={3}
            borderSquareColor="black"
            squareSize="3 px"
          />
        </div>

        {/* Avatar */}
        <button
          onClick={() => console.log("Open profile")}
          className="overflow-hidden rounded-full"
        >
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={40}
            height={40}
            className="min-w-[40px]"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
