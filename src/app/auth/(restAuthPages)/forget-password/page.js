"use client";
import FormInput from "@/components/auth/FormInput";
import Btn1 from "@/components/ui/Btn1";
import { forgetPasswordAction } from "@/lib/actions/auth.action";
import { forgetPasswordSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgetPass() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await forgetPasswordAction(data);

      if (res?.success) {
        toast.success(res.message);
        router.push(`/auth/create-new-password?email=${encodeURIComponent(data.email)}`);
      } else {
        toast.error(res?.message || "Failed Forget Password");
      }
    } catch (error) {
      toast.error(error?.message || "Failed Forget Password");
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="gap-md flex flex-col">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          labelClassName={"mb-sm"}
          {...register("email")}
          error={errors["email"]?.message}
        />
        <Btn1 title="continue" type="submit" isLoading={isSubmitting} />
      </form>
    </div>
  );
}
