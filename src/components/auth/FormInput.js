export default function FormInput({
  type,
  placeholder = "",
  label,
  id,
  error,
  className,
  labelClassName,
  endIcon,
  ...props
}) {
  return (
    <div className={`relative gap-xs2 flex flex-col ${className || ""}`}>
      <label
        htmlFor={id}
        className={`text-text font-primary text-sm leading-5 font-normal uppercase ${labelClassName || ""}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="text-sec-text font-secondary rounded  p-4 text-sm leading-5 font-normal outline-none border border-neutral-400 focus:border-neutral-800 transition-all duration-200"
        {...props}
      />
      {endIcon && <div className="absolute right-4 top-11 transition-all duration-200">{endIcon}</div>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
