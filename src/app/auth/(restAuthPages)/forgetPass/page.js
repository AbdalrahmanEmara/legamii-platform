import FormInput from "@/components/auth/FormInput";
import Btn1 from "@/components/ui/Btn1";

export default function ForgetPass() {
  return (
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
  )
}