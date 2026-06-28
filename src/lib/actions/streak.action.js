"use server";

import "server-only";
import { getStreak } from "../services/streak.service";

export async function getStreakAction() {
  try {
    return await getStreak();
  } catch (err) {
    console.error("Error getting streak:", err);
    return null;
  }
}
