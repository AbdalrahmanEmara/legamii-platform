"use client";

import Link from "next/link";
import GoogleBtn from "../ui/GoogleBtn";
import FormInput from "./FormInput";
import OrLine from "./OrLine";
import SigningContentHeader from "./SigningContentHeader";
import Btn1 from "../ui/Btn1";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators";
import { loginAction } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function SigninContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginAction(data);
      if (res?.success) {
        toast.success("Login successful");
        if (res?.role === "STUDENT")
          router.replace("/student/home");
        else router.replace("/teacher/home")
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <FormInput
          type="email"
          placeholder="Enter your email"
          label="email"
          id="email"
          className={"mb-base"}
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          type={showPassword ? "text" : "password"}
          placeholder="Your password"
          label="password"
          id="password"
          {...register("password")}
          error={errors.password?.message}
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
        <Link
          href={"/auth/forget-password"}
          className="text-primary-600 font-primary mt-[8px] text-right text-xs leading-4 font-bold"
        >
          Forgot password?
        </Link>
        <Btn1
          title="Sign In"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className={"mt-md"}
        />
      </form>
    </div>
  );
}
