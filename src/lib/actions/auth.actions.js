"use server";
import { cookies } from "next/headers";
import {
  forgetPassword,
  login,
  resetPassword,
  signup,
  verifyEmail,
} from "../services/auth.service";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
  signupSchema,
  loginSchema,
  verifyEmailSchema,
} from "../validators";

export async function signupAction(payload) {
  try {
    const validateSignup = signupSchema.safeParse(payload);
    if (!validateSignup.success) {
      return { success: false, message: validateSignup.error.errors[0].message };
    }

    const res = await signup(validateSignup.data);

    return { success: true, message: res?.message };
  } catch (err) {
    return { success: false, message: err?.message || "Failed Signup" };
  }
}

export async function verifyEmailAction(payload) {
  try {
    const validated = verifyEmailSchema.safeParse(payload);
    if (!validated.success) {
      return { success: false, message: validated.error.errors[0].message };
    }

    const res = await verifyEmail(validated.data);

    return { success: true, message: res?.message };
  } catch (err) {
    return { success: false, message: err?.message || "Failed Verify Email" };
  }
}

export async function loginAction(payload) {
  try {
    const validated = loginSchema.safeParse(payload);
    if (!validated.success) {
      return { success: false, message: validated.error.errors[0].message };
    }

    const res = await login(validated.data);

    const cookieStore = await cookies();
    cookieStore.set("token", res?.token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: res?.message };
  } catch (err) {
    return { success: false, message: err?.message || "Failed Login" };
  }
}

export async function resetPasswordAction(payload) {
  try {
    const validated = resetPasswordSchema.safeParse(payload);
    if (!validated.success) {
      return { success: false, message: validated.error.errors[0].message };
    }

    const res = await resetPassword(validated.data);

    return { success: true, message: res?.message };
  } catch (err) {
    return { success: false, message: err?.message || "Failed Reset Password" };
  }
}

export async function forgetPasswordAction(payload) {
  try {
    const validated = forgetPasswordSchema.safeParse(payload);
    if (!validated.success) {
      return { success: false, message: validated.error.errors[0].message };
    }

    const res = await forgetPassword(validated.data);

    return { success: true, message: res?.message };
  } catch (err) {
    return { success: false, message: err?.message || "Failed Forget Password" };
  }
}
