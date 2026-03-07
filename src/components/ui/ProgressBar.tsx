interface ProgressBarProps {
  color: string;
  borderColor: string;
  width: number;
  height: number;
  header: boolean;
  progress: number; // 0-100
}

const ProgressBar = ({ progress, width, height, color, borderColor, header }: ProgressBarProps) => {
  return (
    <div className="relative">
      {header && (
        <span className="bg-${color} absolute -top-1.5 -left-1.5 z-10 h-3.5 w-3.5 border-2 border-neutral-950"></span>
      )}
      <div
        className={`border h-${height} w-${width} border-${borderColor} bg-neutral-${header ? "950" : "50"}`}
      >
        <span
          className={`bg-${color} absolute top-0 left-0 block h-full`}
          style={{ width: `${progress}%` }}
        ></span>
      </div>
    </div>
  );
};

export default ProgressBar;
