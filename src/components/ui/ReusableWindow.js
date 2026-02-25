import { CloseIcon } from "../icons/CloseIcon";
import { MinusIcon } from "../icons/MinusIcon";
import { SquareIcon } from "../icons/SquareIcon";

export default function ReusableWindow({ children, title = "title", className = "" }) {
  return (
    <div
      className={`border-border outline-Border rounded-lg shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] outline -outline-offset-1 ${className}`}
    >
      <header className="bg-primary-50 p-sm font-primary border-border flex justify-between rounded-tl-lg rounded-tr-lg border-b text-sm leading-5 font-normal">
        <p className="uppercase">{title}</p>
        <div className="flex h-[16px] gap-x-2">
          <div className="flex items-end pb-0.5">
            <MinusIcon color="black" />
          </div>
          <SquareIcon />
          <CloseIcon />
        </div>
      </header>

      {children}
    </div>
  );
}
