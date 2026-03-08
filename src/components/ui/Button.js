function Button({children , className}) {
    return (
    <button
      className={`flex justify-center items-center
                  px-8 py-4
                  rounded
                  border border-[#020203]
                  bg-[#D865E0]
                  shadow-[2px_3px_4px_0_#000]
                  ${className}`}
    >
      {children}
    </button>
  );
}

export default Button

  