interface ProgressBarProps {
  progress: number; // 0-100
  width?: number | string;
  height?: number | string;
}

const ProgressBar = ({ progress, width, height = 6 }: ProgressBarProps) => {
  // const trackWidth = typeof width === "number" ? `${width}px` : width;
  // const trackHeight = typeof height === "number" ? `${height}px` : height;
  // const squareSize = typeof height === "number" ? height + 2 : 8;

  return (
    <div className="relative">
      <span className="bg-primary-500 absolute -top-1.5 -left-1.5 z-10 h-3 w-3 border-2 border-neutral-950"></span>
      <div className="border-primary-800 h-3 w-43 border bg-neutral-950">
        <span
          className={`bg-primary-500 absolute top-0 left-0 block h-full`}
          style={{ width: `${progress}%` }}
        ></span>
      </div>
    </div>
  );
};

export default ProgressBar;

// return (
//   <div
//     style={{
//       display: "inline-flex",
//       alignItems: "center",
//       gap: 4,
//     }}
//   >
//     {/* Square on the left */}
//     <div
//       style={{
//         width: squareSize,
//         height: squareSize,
//         backgroundColor: "hsl(var(--primary))",
//         flexShrink: 0,
//       }}
//     />

//     {/* Track */}
//     <div
//       style={{
//         width: trackWidth,
//         height: trackHeight,
//         backgroundColor: "#3a3a3a",
//         overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           width: `${clampedProgress}%`,
//           height: "100%",
//           backgroundColor: "hsl(var(--primary))",
//           transition: "width 0.3s ease",
//         }}
//       />
//     </div>
//   </div>
// );
