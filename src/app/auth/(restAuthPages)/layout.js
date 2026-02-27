import Logo from "@/components/auth/Logo";
import BackgroundV2 from "@/components/ui/BackgroundV2";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Link from "next/link";

export default function RestAuthLayout({ children }) {
  return (
    <BackgroundV2 className={"flex flex-col"}>
      <header className="py-base px-xl flex justify-between items-center">
        <Link href="/" className="text-text flex gap-1 text-base font-primary leading-5">
          <span className="font-bold">&lt;</span>
          <span className="font-normal">Back</span>
        </Link>
        <Logo LEstyles={'text-2xl'} GAstyles={'text-lg'} />
      </header>

      <div className="flex flex-col justify-between items-center grow md:px-xl3 px-base py-xl">
        <ReusableWindow title="password_assistant.sys" className={'max-w-158.25'}>
          {children}
        </ReusableWindow>
        <p className="max-w-150 text-text text-sm font-medium font-secondary leading-5 text-center">
          By clicking &quot;Continue with email or phone number,&quot; you will reset your account password. Having trouble? <span className="font-bold">Contact us</span>—we&apos;d be happy to help.
        </p>
      </div>
    </BackgroundV2>
  )
}