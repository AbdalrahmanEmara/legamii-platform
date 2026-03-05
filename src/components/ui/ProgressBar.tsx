interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
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
