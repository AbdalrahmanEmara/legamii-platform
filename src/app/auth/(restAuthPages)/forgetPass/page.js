import FormInput from "@/components/auth/FormInput";
import Btn1 from "@/components/ui/Btn1";
import ReusableWindow from "@/components/ui/ReusableWindow";

export default function ForgetPass() {
  return (
    <div className="flex flex-col justify-between items-center">
      <ReusableWindow title="password_assistant.sys" className={'max-w-158.25'}>
        <div className="px-xl py-xl5 flex flex-col gap-base">
          <div className="text-center">
            <p className="text-text text-2xl font-bold font-primary leading-8 uppercase mb-xs2">Password assistant</p>
            <p className="text-sec-text text-xl font-normal font-secondary leading-7">Please enter Email Address associated with your number</p>
          </div>
          <form className="flex flex-col gap-md">
            <FormInput label="Email" type="email" placeholder="Enter your email" labelClassName={"mb-sm"} />
            <Btn1 title="continue" />
          </form>
        </div>
      </ReusableWindow>
      <p className="max-w-150 text-text text-sm font-medium font-secondary leading-5 text-center">
        By clicking &quot;Continue with email or phone number,&quot; you will reset your account password. Having trouble? <span className="font-bold">Contact us</span>—we&apos;d be happy to help.
      </p>
    </div>
  )
}