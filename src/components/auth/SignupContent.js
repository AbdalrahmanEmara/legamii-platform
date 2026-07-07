"use client";
import { signupAction } from "@/lib/actions/auth.action";
import Btn1 from "../ui/Btn1";
import GoogleBtn from "../ui/GoogleBtn";
import FormInput from "./FormInput";
import SigningContentHeader from "./SigningContentHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { studentSignupSchema, teacherSignupSchema } from "@/lib/validators";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import GradeSelect from "./GradeSelect";

const studentDefaultValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  grade_id: "",
};

const teacherDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

export default function SignupContent({ grades, currentRole }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(currentRole === 'student' ? studentSignupSchema : teacherSignupSchema),
    defaultValues: currentRole === "student" ? {
      ...studentDefaultValues, role: "student"
    } : { ...teacherDefaultValues, role: "teacher" },
  });

  const onSubmit = async (data) => {
    try {
      const schema = currentRole === "student" ? studentSignupSchema : teacherSignupSchema;
      const payload = schema.parse(data);

      const res = await signupAction(payload);

      if (res?.success) {
        toast.success(res?.message);
        router.push(`/auth/otp?email=${data?.email}`);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to sign up");
    }
  };

  return (
    <div className="gap-md px-xl py-md bg-el-bg hide-scroll flex max-h-225 flex-col overflow-auto rounded-b-lg">
      <SigningContentHeader
        header="Ready to level up your learning?"
        word="Join the game of learning - Level up your skills, win contests, grow smarter everyday"
      />

      <form className="gap-base flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-4">
          <FormInput
            type="text"
            placeholder="First Name"
            label="First Name"
            id="firstName"
            className="w-40 flex-1"
            {...register("firstName")}
            error={errors["firstName"]?.message}
          />
          {currentRole === "student" &&
            <FormInput
              type="text"
              placeholder="Middle Name"
              label="Middle Name"
              id="middleName"
              className="w-40 flex-1"
              {...register("middleName")}
              error={errors["middleName"]?.message}
            />
          }
          <FormInput
            type="text"
            placeholder="Last Name"
            label="Last Name"
            id="lastName"
            className="w-40 flex-1"
            {...register("lastName")}
            error={errors["lastName"]?.message}
          />
        </div>

        <FormInput
          type="email"
          placeholder="Enter your email"
          label="Email"
          id="email"
          {...register("email")}
          error={errors["email"]?.message}
        />
        <FormInput
          type={showPassword ? "text" : "password"}
          placeholder="Your password"
          label="Password"
          id="password"
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
        {currentRole === "student" &&
          <Controller
            name="grade_id"
            control={control}
            render={({ field }) => (
              <GradeSelect grades={grades} label="Grade" placeholder="Select your grade" value={field.value} onChange={field.onChange} />
            )}
          />
        }
        <Btn1 title="Sign Up" disabled={isSubmitting} className="bg-primary-500 mt-xs2" />

        <div className="inline-flex items-center justify-start gap-2 self-stretch">
          <div className="h-0 flex-1 outline outline-offset-[-0.50px] outline-neutral-400"></div>
          <div className="font-futura justify-center text-xs font-normal text-neutral-400 capitalize">
            or
          </div>
          <div className="h-0 flex-1 outline outline-offset-[-0.50px] outline-neutral-400"></div>
        </div>
        <GoogleBtn />
      </form>
    </div>
  );
}