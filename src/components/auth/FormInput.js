export default function FormInput({ type, placeholder = "", label, id, error, ...props }) {
  return (
    <div className="gap-xs2 flex flex-col">
      <label
        htmlFor={id}
        className="text-text font-primary text-sm leading-5 font-normal uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="text-sec-text font-secondary rounded border border-neutral-400 p-4 text-sm leading-5 font-normal"
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
