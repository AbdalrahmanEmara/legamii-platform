export default function FormInput({
  type,
  placeholder = "",
  label,
  id,
  error,
  className,
  labelClassName,
  InputClassName,
  endIcon,
  ...props
}) {
  return (
    <div className={`gap-xs2 relative flex flex-col ${className || ""}`}>
      {label && (
      <label
        htmlFor={id}
        className={`text-text font-primary text-sm leading-5 font-normal uppercase ${labelClassName || ""}`}
      >
        {label}
      </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`text-sec-text font-secondary rounded border border-neutral-400 font-normal transition-all duration-200 outline-none focus:border-neutral-800 ${InputClassName || "p-4 text-sm leading-5"}`}
        {...props}
      />
      {endIcon && (
        <div className="absolute top-11 right-4 transition-all duration-200">{endIcon}</div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
