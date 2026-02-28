import Logo from "@/components/auth/Logo";
import BackgroundV2 from "@/components/ui/BackgroundV2";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Link from "next/link";

export default function RestAuthLayout({ children }) {
  return (
    <BackgroundV2 className={"flex flex-col"}>
      <header className="py-base px-xl flex items-center justify-between">
        <Link href="/" className="text-text font-primary flex gap-1 text-base leading-5">
          <span className="font-bold">&lt;</span>
          <span className="font-normal">Back</span>
        </Link>
        <Logo LEstyles={"text-2xl"} GAstyles={"text-lg"} />
      </header>

      <div className="md:px-xl3 px-base py-xl flex grow flex-col items-center justify-between">
        <ReusableWindow title="password_assistant.sys" className={"max-w-158.25"}>
          {children}
        </ReusableWindow>
        <p className="text-text font-secondary max-w-150 text-center text-sm leading-5 font-medium">
          By clicking &quot;Continue with email or phone number,&quot; you will reset your account
          password. Having trouble? <span className="font-bold">Contact us</span>—we&apos;d be happy
          to help.
        </p>
      </div>
    </BackgroundV2>
  );
}
