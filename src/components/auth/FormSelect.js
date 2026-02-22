import ArrowIcon from "../icons/ArrowIcon";

export default function FormSelect({
  label,
  id,
  name,
  options = [],
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className="gap-xs2 flex flex-col">
      <label
        htmlFor={id}
        className="text-text font-primary text-sm leading-5 font-normal uppercase"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name ?? id}
          className={[
            "w-full appearance-none",
            "text-sec-text font-secondary rounded border border-neutral-400",
            "p-4 pr-12 text-sm leading-5 font-normal",
            className,
          ].join(" ")}
          defaultValue={placeholder ? "" : undefined}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}

          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>

        {/* Custom dropdown icon */}
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
