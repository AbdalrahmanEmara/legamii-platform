function Button({ children, className }) {
  return (
    <button
      className={`flex items-center justify-center rounded border border-[#020203] bg-[#D865E0] px-md py-sm shadow-[2px_3px_4px_0_#000] ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
