"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "./FormInput";
import Btn1 from "../ui/Btn1";
import { Check, Eye, EyeClosed, X } from "lucide-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/validators";
import { resetPasswordAction } from "@/lib/actions/auth.actions";
import { useForm } from "react-hook-form";

const requirements = [
  { label: "Minimum 6 characters", test: (p) => p.length >= 6 },
  { label: "Maximum 20 characters", test: (p) => p.length <= 20 },
  { label: "At least one uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "At least one lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "At least one number", test: (p) => /\d/.test(p) },
  { label: "At least one special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export default function CreateNewPassForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams?.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: emailFromQuery,
      otp: "",
      password: "",
      verifyPassword: "",
    },
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const res = await resetPasswordAction(data);

      if (res?.success) {
        toast.success(res?.message || "Password reset successfully");
        router.push("/auth/signin");
      } else {
        toast.error(res?.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to reset password");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          placeholder="Email"
          className={"mb-base"}
          {...register("email")}
        />
        <FormInput
          label="OTP"
          type="text"
          placeholder="OTP"
          className={"mb-base"}
          {...register("otp")}
        />
        <FormInput
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          className={"mb-base"}
          {...register("password")}
          error={errors["password"]?.message}
          endIcon={
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="">
              {showPassword ? (
                <Eye className="text-primary-500 h-5 w-5" />
              ) : (
                <EyeClosed className="text-sec-text h-5 w-5" />
              )}
            </button>
          }
        />
        <FormInput
          label={"Confirm new password"}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm new password"
          {...register("verifyPassword")}
          error={errors["verifyPassword"]?.message}
          endIcon={
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="">
              {showPassword ? (
                <Eye className="text-primary-500 h-5 w-5" />
              ) : (
                <EyeClosed className="text-sec-text h-5 w-5" />
              )}
            </button>
          }
        />
        <Btn1
          title={"change password"}
          className={"mt-md w-full disabled:cursor-not-allowed"}
          isLoading={isSubmitting}
        />
      </form>
      <div>
        <p className="text-text font-secondary text-lg leading-6 font-medium">
          Password requirements:
        </p>
        <ul>
          {requirements.map(({ label, test }) => {
            const passed = password.length > 0 && test(password);
            const failed = password.length > 0 && !test(password);

            return (
              <li
                key={label}
                className={`font-secondary text-sm leading-5 font-normal ${passed ? "text-text" : failed ? "text-red-500" : "text-sec-text"}`}
              >
                <span
                  className={`mr-3 text-2xl ${passed ? "text-primary-500" : failed ? "text-red-500" : "text-sec-text"}`}
                >
                  {failed ? (
                    <X className="inline-block h-5 w-5" strokeWidth={3} />
                  ) : (
                    <Check className="inline-block h-5 w-5" strokeWidth={3} />
                  )}
                </span>{" "}
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
