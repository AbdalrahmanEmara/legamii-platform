import AuthHeader from "@/components/auth/AuthHeader";
import SignupContent from "@/components/auth/SignupContent";
import { LogoIcon } from "@/components/icons/LogoIcon";
import Background from "@/components/ui/Background";
import LogoWord from "@/components/ui/LogoWord";
import ReusableWindow from "@/components/ui/ReusableWindow";

export default function page() {
  return (
    <Background className={"flex items-center justify-center"}>
      <div className="md:px-xl3 px-base py-xl flex">
        <ReusableWindow title="Sing_Up.sys" className="w-200 max-w-full">
          <AuthHeader prompt={"Already have an account?"} to={"/login"} linkTitle={"Login"} />

          <SignupContent />
        </ReusableWindow>
        <div className="hidden lg:flex flex-col flex-1 h-lvh justify-center items-center">
          <LogoIcon size={240} />
          <LogoWord LEstyles={'text-neutral-950 text-8xl font-normal font-cabin-sketch tracking-[11.64px]'} GAstyles={'text-neutral-950 text-7xl font-normal font-primary leading-6'} />
        </div>
      </div>
    </Background>
  );
}
