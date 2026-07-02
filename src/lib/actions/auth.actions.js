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
  loginSchema,
  verifyEmailSchema,
  studentSignupSchema,
  teacherSignupSchema,
  studentSignupSchema,
  teacherSignupSchema,
} from "../validators";

export async function signupAction(payload, role) {
export async function signupAction(payload, role) {
  try {
    const validateSignup = role === "student" ? studentSignupSchema.safeParse(payload) : teacherSignupSchema.safeParse(payload);
    const validateSignup = role === "student" ? studentSignupSchema.safeParse(payload) : teacherSignupSchema.safeParse(payload);
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

    // decode the JWT payload - no library needed
    const [, payloadBase64] = res.token.split(".");
    const { role } = JSON.parse(atob(payloadBase64));

    const cookieStore = await cookies();
    cookieStore.set("token", res?.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return { success: true, message: res?.message, role };
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

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("role");
    return { success: true };
  } catch (err) {
    return { success: false, message: err?.message || "Failed Logout" };
  }
}

export async function getSessionAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const role = cookieStore.get("role")?.value;

    if (!token || !role) {
      return { success: false, message: "No session found" };
    }

    return { success: true, token, role };
  } catch (err) {
    return { success: false, message: err?.message || "Failed to get session" };
  }
}