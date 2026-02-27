import OtpInput from "@/components/auth/OtpInput";

export default function OtpPage() {
  return (
    <div className="p-xl flex flex-col gap-base">
      <div className="flex flex-col gap-xs2 text-center">
        <p className="text-text text-2xl font-bold font-primary leading-8 uppercase">enter otp code</p>
        <p className="text-sec-text text-xl font-normal font-secondary leading-7">Enter the code we sent to your email address</p>
      </div>

      <OtpInput length={6} />
    </div>
  )
}