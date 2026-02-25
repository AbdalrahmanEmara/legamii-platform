import Btn1 from "../ui/Btn1";
import GoogleBtn from "../ui/GoogleBtn";
import FormInput from "./FormInput";
import GradeSelect from "./GradeSelect";
import SigningContentHeader from "./SigningContentHeader";
export default function SignupContent() {
  return (
    <div className="gap-md px-xl py-md bg-el-bg flex max-h-225 flex-col overflow-auto rounded-b-lg">
      <SigningContentHeader
        header="Ready to level up your learning?"
        word="Join the game of learning - Level up your skills, win contests, grow smarter everyday"
      />

      <form className="gap-base flex flex-col">
        <FormInput type="email" placeholder="Enter your email" label="email" id="email" />
        <FormInput type="password" placeholder="Your password" label="password" id="password" />
        <GradeSelect label="Grade" placeholder="Select your grade" />

        <Btn1 title="Sign Up" className="bg-primary-500 mt-xs2" />

        <div className="inline-flex items-center justify-start gap-2 self-stretch">
          <div className="h-0 flex-1 outline outline-offset-[-0.50px] outline-neutral-400"></div>
          <div className="font-futura justify-center text-xs font-normal text-neutral-400 capitalize">
            or
          </div>
          <div className="h-0 flex-1 outline outline-offset-[-0.50px] outline-neutral-400"></div>
        </div>
        <GoogleBtn />
      </form>
    </div>
  );
}
