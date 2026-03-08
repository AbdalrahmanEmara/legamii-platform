// ─── STATUS BADGE COMPONENT ───────────────────────────────────────────────────
const BADGE_STYLES = {
  "NEEDS WORK": "outline-yellow-600 text-yellow-600 shadow-[2px_3px_2px_0px_rgba(153,138,0,1.00)]",
  STRONG: "outline-green-600 text-green-600 shadow-[2px_3px_2px_0px_rgba(0,153,61,1.00)]",
  GOOD: "outline-blue-500 text-blue-500 shadow-[2px_3px_2px_0px_rgba(0,90,200,1.00)]",
  IMPROVING: "outline-orange-500 text-orange-500 shadow-[2px_3px_2px_0px_rgba(200,80,0,1.00)]",
  EASY: "outline-green-600 text-green-600 shadow-[2px_3px_2px_0px_rgba(0,153,61,1.00)]",
  INTERMEDIATE: "outline-yellow-600 text-yellow-600 shadow-[2px_3px_2px_0px_rgba(153,138,0,1.00)]",
  HARD: "outline-red-600 text-red-600 shadow-[2px_3px_2px_0px_rgba(200,0,0,1.00)]",
  WEAK: "outline-red-600 text-red-600 shadow-[2px_3px_2px_0px_rgba(200,0,0,1.00)]",
};

export function StatusBadge({ status }) {
  const styles = BADGE_STYLES[status] ?? BADGE_STYLES["GOOD"];
  return (
    <div className="inline-flex items-start justify-end">
      <div
        className={`flex -rotate-3 items-center justify-center rounded-sm px-6 py-2 outline-[1.60px] outline-offset-[-1.60px] ${styles}`}
      >
        <span className="font-primary text-sm leading-5 font-normal">{status}</span>
      </div>
    </div>
  );
}
