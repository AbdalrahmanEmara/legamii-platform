"use server";
import "server-only";

import { getDailyMissions, claimMission } from "../services/missions.service";
import { claimMissionSchema } from "../validators";

export async function getDailyMissionsAction() {
  try {
    const data = await getDailyMissions();
    return { success: true, data: data?.data };
  } catch (err) {
    return { success: false, message: err?.message || "Failed to fetch daily missions" };
  }
}

export async function claimMissionAction(payload) {
  try {
    const validated = claimMissionSchema.safeParse(payload);
    if (!validated.success) {
      return { success: false, message: validated.error.errors[0].message };
    }

    const res = await claimMission(validated.data.id);

    return { success: true, message: res?.message, rewardPoints: res?.rewardPoints };
  } catch (err) {
    return { success: false, message: err?.message || "Failed to claim mission" };
  }
}
