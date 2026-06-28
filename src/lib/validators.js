import * as z from "zod";

const resetPasswordSchemaFields = () => {
  return z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .refine((value) => /\d/.test(value), { message: "Password must contain at least one number" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "Password must contain at least one special character",
    });
};

export const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: resetPasswordSchemaFields(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  otp: z.string().length(6, { message: "Invalid OTP" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    otp: z.string().length(6, { message: "Invalid OTP" }),
    password: resetPasswordSchemaFields(),
    verifyPassword: resetPasswordSchemaFields(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  });

export const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export const claimMissionSchema = z.object({
  id: z.string().min(1, { message: "Mission ID is required" }),
});
