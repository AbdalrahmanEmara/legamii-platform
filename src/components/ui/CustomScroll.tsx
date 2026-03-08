"use client";
import { useRef, useState } from "react";

interface CustomScrollProps {
  children: React.ReactNode;
  thumbHeight?: number; // default 279
}

export default function CustomScroll({ children, thumbHeight = 279 }: CustomScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight);

    const maxThumbMove = el.clientHeight - thumbHeight;

    setThumbTop(scrollRatio * maxThumbMove);
  };

  return (
    <div className="relative flex min-h-0 flex-1">
      {/* Scrollable Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="hide-scrollbar min-h-0 flex-1 overflow-y-scroll"
      >
        {children}
      </div>

      {/* Custom Scrollbar */}
      <div className="bg-el-bg flex w-8 justify-center border-l border-[#262626]">
        <div className="relative h-full w-4">
          <div
            className="absolute w-full rounded-[4px] bg-[#D4D4D4]"
            style={{
              height: `${thumbHeight}px`,
              transform: `translateY(${thumbTop}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
