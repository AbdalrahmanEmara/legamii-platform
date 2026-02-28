export default function Btn1({ title, disabled, onClick, className, ...prop }) {
  return (
    <button
      className={`bg-primary-500 border-text text-text px-md py-sm font-primary cursor-pointer rounded border text-base font-bold uppercase shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] focus-within:shadow-[0_4px_8px_rgba(0,0,0,0.2)] ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...prop}
    >
      {title}
    </button>
  );
}
