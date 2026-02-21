import AuthHeader from "@/components/auth/AuthHeader";
import SignupContent from "@/components/auth/SignupContent";
import Background from "@/components/ui/Background";
import ReusableWindow from "@/components/ui/ReusableWindow";

export default function page() {
  return (
    <Background>
      <div className="px-xl3 py-xl">
        <ReusableWindow title="Sing_Up.sys">
          <AuthHeader prompt={"Already have an account?"} to={"/login"} linkTitle={"Login"} />

          <SignupContent />
        </ReusableWindow>
      </div>
    </Background>
  );
}
