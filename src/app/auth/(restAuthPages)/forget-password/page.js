'use client';
import FormInput from "@/components/auth/FormInput";
import Btn1 from "@/components/ui/Btn1";
import { useRouter } from "next/navigation";


export default function ForgetPass() {
  const router = useRouter();
  
  function handleClick(e) {
    // Handle the click event, e.g., validate input, send request, etc.
    // For demonstration, we'll just redirect to the create new password page.
    e.preventDefault();
    router.push("/auth/otp");
  }


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
        <Btn1 title="continue" onClick={handleClick} />
      </form>
    </div>
  );
}
