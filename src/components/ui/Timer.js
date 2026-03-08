function Timer({ seconds }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const urgent = seconds <= 10;
  return (
    <div
      className={` ${
        urgent ? "bg-[#e74c3c] shadow-[0_0_12px_rgba(231,76,60,0.7)]" : "bg-green-700"
      } px-xs2 py-xxs label-3 min-w-[70px] rounded-sm text-center text-base font-medium tracking-[2px] text-white transition-all duration-300`}
    >
      {mm}:{ss}
    </div>
  );
}

export default Timer;
