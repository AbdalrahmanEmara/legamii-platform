import { CloseIcon } from "../icons/CloseIcon";
import { MinusIcon } from "../icons/MinusIcon";
import { SquareIcon } from "../icons/SquareIcon";

export default function ReusableWindow({ className, children, title = "title" }) {
  return (
    <div
      className={`bg-el-bg border-text rounded-xl border shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] ${className}`}
    >
      <header className="bg-primary-50 p-sm font-primary border-text flex justify-between rounded-tl-xl rounded-tr-lg border-b text-sm leading-5 font-normal">
        <p className="text-text uppercase">{title}</p>
        <div className="text-text flex h-[16px] gap-x-2">
          <div className="flex items-end pb-0.5">
            <MinusIcon />
          </div>
          <SquareIcon />
          <CloseIcon />
        </div>
      </header>
      {children}
    </div>
  );
}
