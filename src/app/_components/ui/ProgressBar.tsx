// function ProgressBar({ xp = 120, level = 1 }) {
//   const progress = (xp / (level * 300)) * 100;

//   return (
//     <div className="w-32 h-2 bg-gray-700 rounded overflow-hidden">
//       <div
//         className="h-full bg-pink-500 transition-all"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// }

// export default ProgressBar;

// import { cn } from "@/lib/utils";

// Second code

// interface ProgressBarProps {
//   progress: number; // 0-100
//   width?: number | string;
//   height?: number | string;
//   className?: string;
//   trackClassName?: string;
//   indicatorClassName?: string;
// }

// const ProgressBar = ({
//   progress,
//   width,
//   height = 8,
//   className,
//   trackClassName,
//   indicatorClassName,
// }: ProgressBarProps) => {
//   const clampedProgress = Math.min(100, Math.max(0, progress));

//   return (
//     <div
//       className={`bg-primary/20 overflow-hidden rounded-full ${trackClassName ?? ""} ${className ?? ""}`}
//       style={{
//         width: typeof width === "number" ? `${width}px` : width,
//         height: typeof height === "number" ? `${height}px` : height,
//       }}
//     >
//       <div
//         className={`bg-primary h-full rounded-full transition-all ${indicatorClassName ?? ""}`}
//         style={{ width: `${clampedProgress}%` }}
//       />
//     </div>
//   );
// };

// export default ProgressBar;

interface ProgressBarProps {
  progress: number; // 0-100
  width?: number | string;
  height?: number | string;
}

const ProgressBar = ({ progress, width, height = 16 }: ProgressBarProps) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const trackWidth = typeof width === "number" ? `${width}px` : width;
  const trackHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Two fixed squares at the start */}
      <div
        style={{
          position: "absolute",
          top: -6,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "hsl(var(--primary))",
          borderRadius: 2,
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "hsl(var(--primary))",
          borderRadius: 2,
          zIndex: 10,
        }}
      />
      {/* Track */}
      <div
        style={{
          width: trackWidth,
          height: trackHeight,
          backgroundColor: "#5A5A5A",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${clampedProgress}%`,
            height: "100%",
            backgroundColor: "hsl(var(--primary))",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
