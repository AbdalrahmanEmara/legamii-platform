import GoogleIcon from "../icons/GoogleIcon";
import Btn1 from "../ui/Btn1";
import FormInput from "./FormInput";
import GradeSelect from "./GradeSelect";
export default function SignupContent() {
  return (
    <div className="max-h-250 overflow-auto  gap-md px-xl py-lg bg-el-bg flex flex-col rounded-b-lg">
      <header className="flex flex-col gap-2">
        <p className="text-text font-primary text-4xl leading-[48px] font-bold uppercase">
          Ready to level up your learning?
        </p>
        <p className="text-sec-text font-secondary text-lg leading-6 font-normal">
          Join the game of learning - Level up your skills, win contests, grow smarter everyday
        </p>
      </header>

      <form className="gap-base flex flex-col">
        <FormInput type="email" placeholder="Enter your email" label="email" id="email" />
        <FormInput type="password" placeholder="Your password" label="password" id="password" />
        <GradeSelect label="Grade" placeholder="Select your grade" />

        <Btn1 title="Sign Up" className="bg-primary-500 mt-md" />

        <div className="self-stretch inline-flex justify-start items-center gap-2 my-base">
          <div className="flex-1 h-0 outline outline-offset-[-0.50px] outline-neutral-400"></div>
          <div className="justify-center text-neutral-400 text-xs font-normal font-futura capitalize">or</div>
          <div className="flex-1 h-0 outline outline-offset-[-0.50px] outline-neutral-400"></div>
        </div>

        <button className="flex text-text text-lg font-bold font-montserrat capitalize bg-sec-el px-md py-sm rounded hover:bg-neutral-200 items-center justify-center gap-4">
          <GoogleIcon size={23} />
          <span>Google</span>
        </button>

      </form>
    </div>
  );
}
