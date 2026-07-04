import AuthHeader from "@/components/auth/AuthHeader";
import SignupContent from "@/components/auth/SignupContent";
import { LogoIcon } from "@/components/icons/LogoIcon";
import LogoWord from "@/components/ui/LogoWord";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { getAllGrades } from "@/lib/services/grade.service";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const role = params?.role || "student";
  let grades = [];

  if (role === "student") {
    try {
      const res = await getAllGrades();
      grades = res?.data;
    } catch (err) {
      console.error("Error fetching grades. ", err);
    }
  }

  return (
    <>
      <ReusableWindow title="Sing_Up.sys" className="w-200 max-w-full">
        <AuthHeader prompt={"Already have an account?"} to={"/auth/signin"} linkTitle={"Login"} />

        <SignupContent key={role} grades={grades} currentRole={role} />
      </ReusableWindow>
      <div className="hidden flex-1 flex-col items-center justify-center lg:flex">
        <LogoIcon size={240} />
        <LogoWord
          LEstyles={"text-neutral-950 text-8xl font-normal font-cabin-sketch tracking-[11.64px]"}
          GAstyles={"text-neutral-950 text-7xl font-normal font-primary leading-6"}
        />
      </div>
    </>
  );
}