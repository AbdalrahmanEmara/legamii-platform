"use client";
import { useRef, useState, useEffect } from "react";

interface CustomScrollProps {
  children: React.ReactNode;
  thumbHeight?: number; // default 279
}

export default function CustomScroll({
  children,
  thumbHeight = 279,
}: CustomScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    const scrollRatio =
      el.scrollTop / (el.scrollHeight - el.clientHeight);

    const maxThumbMove =
      el.clientHeight - thumbHeight;

    setThumbTop(scrollRatio * maxThumbMove);
  };

  return (
    // <div className="relative h-full flex">
    //   {/* Scrollable Content */}
    //   <div
    //     ref={contentRef}
    //     onScroll={handleScroll}
    //     className="flex-1 overflow-y-auto pr-6"
    //   >
    //     {children}
    //   </div>

    //   {/* Custom Scrollbar */}
    //   <div className="w-8 h-full border-l border-[#262626] flex justify-center">
    //     <div className="relative w-4 h-full">
    //       <div
    //         className="absolute w-full rounded-[4px] bg-[#D4D4D4]"
    //         style={{
    //           height: `${thumbHeight}px`,
    //           transform: `translateY(${thumbTop}px)`,
    //         }}
    //       />
    //     </div>
    //   </div>
    // </div>
  <div className="relative flex flex-1 min-h-0">
    {/* Scrollable Content */}
    <div
      ref={contentRef}
      onScroll={handleScroll}
      className="flex-1 min-h-0 overflow-y-scroll hide-scrollbar"
    >
      {children}
    </div>

    {/* Custom Scrollbar */}
    <div className="w-8 border-l border-[#262626] flex justify-center bg-el-bg">
      <div className="relative w-4 h-full">
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