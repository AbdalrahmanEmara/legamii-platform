import FormInput from "@/components/auth/FormInput";
import Btn1 from "@/components/ui/Btn1";

export default function ForgetPass() {
  return (
    <div className="px-xl py-xl5 gap-base flex flex-col">
      <div className="text-center">
        <p className="text-text font-primary mb-xs2 text-2xl leading-8 font-bold uppercase">
          Password assistant
        </p>
        <p className="text-sec-text font-secondary text-xl leading-7 font-normal">
          Please enter Email Address associated with your number
        </p>
      </div>
      <form className="gap-md flex flex-col">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          labelClassName={"mb-sm"}
        />
        <Btn1 title="continue" />
      </form>
    </div>
  );
}
