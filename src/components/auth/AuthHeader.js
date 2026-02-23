import Link from "next/link";
import Logo from "./Logo";

export default function AuthHeader({ prompt, linkTitle, to }) {
  return (
    <header className="p-base bg-el-bg flex items-center justify-between">
      <Logo LEstyles={"text-2xl tracking-[3.12px]"} GAstyles={"text-lg leading-6"} />
      <div className="flex gap-2.5">
        <p className="text-text font-secondary text-lg">{prompt}</p>
        <Link
          href={to}
          className="text-primary-600 font-primary text-xs leading-6 font-bold uppercase"
        >
          {linkTitle}
        </Link>
      </div>
    </header>
  );
}
