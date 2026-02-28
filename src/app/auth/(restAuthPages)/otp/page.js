import OtpInput from "@/components/auth/OtpInput";

export default function OtpPage() {
  return (
    <div className="p-xl gap-base flex flex-col">
      <div className="gap-xs2 flex flex-col text-center">
        <p className="text-text font-primary text-2xl leading-8 font-bold uppercase">
          enter otp code
        </p>
        <p className="text-sec-text font-secondary text-xl leading-7 font-normal">
          Enter the code we sent to your email address
        </p>
      </div>

      <OtpInput length={6} />
    </div>
  );
}
