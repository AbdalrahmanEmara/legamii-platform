"use server";

import { getGlobalLeaderboard } from "../services/leaderboard.service";

export async function getGlobalLeaderboardAction(page = 1, limit = 50) {
  try {
    const response = await getGlobalLeaderboard(page, limit);

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Failed to load leaderboard",
    };
  }
}