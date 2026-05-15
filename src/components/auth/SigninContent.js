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

export default function SigninContent() {
  const router = useRouter();
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
        router.replace("/practice");
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
          type="password"
          placeholder="Your password"
          label="password"
          id="password"
          {...register("password")}
          error={errors.password?.message}
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
