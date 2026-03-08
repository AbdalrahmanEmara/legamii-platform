// interface ProgressBarProps {
//   progress: number; // 0-100
// }

// const ProgressBar = ({ progress }: ProgressBarProps) => {
//   return (
//     <div className="relative w-full">
//       <span className="bg-primary-500 absolute -top-1.5 -left-1.5 z-10 h-3 w-3 border-2 border-neutral-950"></span>

//       <div className="relative border-primary-800 h-3 w-full border bg-neutral-100">
//         <span
//           className="bg-primary-500 absolute top-0 left-0 block h-full"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;


interface ProgressBarProps {
  progress: number;
  color?: string;
  bgColor?: string;
  height?: string;       // h-2 | h-3 | h-4
  squareSize?: string;   // w-2 h-2 | w-3 h-3
  squareColor?: string;
}

const ProgressBar = ({
  progress,
  color = "bg-primary-500",
  bgColor = "bg-neutral-200",
  height = "h-2",
  squareSize = "w-2 h-2",
  squareColor = "bg-primary-500",
}: ProgressBarProps) => {
  return (
    <div className="relative w-full">
      {/* Square above bar */}
      <span
        className={`${squareColor} absolute -top-1 -left-1 ${squareSize} z-10 border border-white`}
      />

      {/* Bar */}
      <div className={`relative w-full ${height} border-primary-500 border`}>
        <span
          className={`absolute top-0 left-0 h-full ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;