export default function Btn1({ title, disabled = false, onClick, className, ...prop }) {
  return (
    <button
      className={`border-text px-md py-sm font-primary flex cursor-pointer items-center justify-center rounded border text-center text-base font-bold uppercase shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] focus-within:shadow-[0_4px_8px_rgba(0,0,0,0.2)] ${className} ${disabled ? "bg-primary-200 cursor-not-allowed" : "bg-primary-500"}`}
      onClick={onClick}
      disabled={disabled}
      {...prop}
    >
      {title}
    </button>
  );
}
