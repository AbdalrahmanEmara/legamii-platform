function Timer({ seconds }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const urgent = seconds <= 10;
  return (
    <div
      className={`
  ${urgent 
    ? "bg-[#e74c3c] shadow-[0_0_12px_rgba(231,76,60,0.7)]" 
    : "bg-green-700"}
  text-white
  text-base
  px-xs2
  py-xxs
  rounded-sm
  tracking-[2px]
  transition-all
  duration-300
  min-w-[70px]
  text-center
  label-3
  font-medium
`}
    >
      {mm}:{ss}
    </div>
  );
}

export default Timer;