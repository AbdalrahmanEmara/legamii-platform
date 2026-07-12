"use server";
import "server-only";
import { askQuestion } from "../services/chat.service";

export async function askQuestionAction(question) {
  try {
    const res = await askQuestion({ question });
    return { success: true, answer: res.answer };
  } catch (err) {
    return { success: false, message: err?.message || "Failed to get response" };
  }
}
