"use client";
import { Suspense } from "react";
import OtpInput from "@/components/auth/OtpInput";
import { verifyEmailAction } from "@/lib/actions/auth.action";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function OtpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const handleVerifyOtp = async (email, otp) => {
    try {
      const res = await verifyEmailAction({ email, otp });

      if (res?.success === true) {
        toast.success(res?.message);
        router.push(`/auth/signin`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to verify OTP");
    }
  };

  return (
    <div className="p-xl gap-base flex flex-col">
      <div className="gap-xs2 flex flex-col text-center">
        <p className="text-text font-primary text-2xl leading-8 font-bold uppercase">
          enter otp code
        </p>
        <p className="text-sec-text font-secondary text-xl leading-7 font-normal">
          Enter the code we sent to {email} email address
        </p>
      </div>

      <OtpInput length={6} email={email} onComplete={handleVerifyOtp} />
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpPageContent />
    </Suspense>
  );
}
