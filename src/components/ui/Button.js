function Button({ children, className, onClick }) {
  return (
    <button
      className={`flex items-center justify-center rounded border border-[#020203] bg-[#D865E0] px-8 py-4 shadow-[2px_3px_4px_0_#000] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
