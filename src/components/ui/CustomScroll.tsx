"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
interface CustomScrollProps {
  children: React.ReactNode;
  thumbHeight?: number;
  className?: string;
}

export default function CustomScroll({
  children,
  thumbHeight = 279,
  className,
}: CustomScrollProps) {
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
    <div className={cn("relative flex min-h-0 flex-1", className)}>
      {/* Scrollable Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="hide-scrollbar min-h-0 flex-1 overflow-y-scroll"
      >
        {children}
      </div>

      {/* Custom Scrollbar */}
      <div className="bg-el-bg flex w-8 justify-center rounded-br-2xl border-l border-[#262626]">
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
