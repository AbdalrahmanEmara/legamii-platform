import BellIcon from "../icons/BellIcon";

export default function BellButton({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`trophy-color ${active ? "trophy-ring" : ""}`}
      style={{
        color: active ? "#a855f7" : "#FAFAFA",
        background: "none",
        border: "none",
        cursor: "pointer",
        transformOrigin: "top center",
        display: "inline-block",
      }}
    >
      <BellIcon size={32} color="currentColor" />
    </button>
  );
}
