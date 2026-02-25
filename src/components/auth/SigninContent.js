import Link from "next/link";
import GoogleBtn from "../ui/GoogleBtn";
import FormInput from "./FormInput";
import OrLine from "./OrLine";
import SigningContentHeader from "./SigningContentHeader";
import Btn1 from "../ui/Btn1";

export default function SigninContent() {
  return (
    <div className="px-xl py-md bg-el-bg flex max-h-225 flex-col overflow-auto rounded-b-lg">
      <div className="gap-md flex flex-col">
        <SigningContentHeader
          header="Welcome back"
          word="Log in to continue your quest for knowledge and conquer the learning game"
        />
        <GoogleBtn />
      </div>
      <OrLine />
      <form className="flex flex-col">
        <FormInput
          type="email"
          placeholder="Enter your email"
          label="email"
          id="email"
          className={"mb-base"}
        />
        <FormInput type="password" placeholder="Your password" label="password" id="password" />
        <Link
          href={"/forgot-password"}
          className="text-primary-600 font-primary mt-[8px] text-right text-xs leading-4 font-bold"
        >
          Forgot password?
        </Link>
        <Btn1 title="Sign In" className={'mt-md'}/>
      </form>
    </div>
  );
}
