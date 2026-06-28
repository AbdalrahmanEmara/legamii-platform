interface ProgressBarProps {
  className: string;
  progress: number;
  color?: string;
  bgColor?: string;
  borderSquareColor?: string;
  height?: string; // h-2 | h-3 | h-4
  width?: string;
  squareSize?: string; // w-2 h-2 | w-3 h-3
  squareColor?: string;
}

const ProgressBar = ({
  className = "",
  progress,
  color = "bg-primary-500",
  borderSquareColor = "white",
  height = "2",
  squareSize = "2",
  squareColor = "bg-primary-500",
}: ProgressBarProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Square above bar */}
      <span
        className={`${squareColor} absolute -top-1 -left-1 w-${squareSize} h-${squareSize} z-10 border border-${borderSquareColor}`}
      />

      {/* Bar */}
      <div className={`relative h-${height} border-primary-500 border`}>
        <span
          className={`absolute top-0 left-0 h-full ${color}`}
          style={{ width: `${progress > 100 ? 100 : progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
