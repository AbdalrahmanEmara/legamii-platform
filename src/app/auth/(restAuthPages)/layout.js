import Logo from "@/components/auth/Logo";
import BackgroundV2 from "@/components/ui/BackgroundV2";
import Link from "next/link";

export default function RestAuthLayout({ children }) {
  return (
    <BackgroundV2>
      <header className="py-base px-xl flex justify-between items-center">
        <Link href="/" className="text-text flex gap-1 text-base font-primary leading-5">
          <span className="font-bold">&lt;</span>
          <span className="font-normal">Back</span>
        </Link>
        <Logo LEstyles={'text-2xl'} GAstyles={'text-lg'} />
      </header>

      <div className="md:px-xl3 px-base py-xl">{children}</div>
    </BackgroundV2>
  )
}