import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getDailyMissions() {
  return api.get(ENDPOINTS.missions.daily);
}

export async function claimMission(id) {
  return api.post(ENDPOINTS.missions.claim(id));
}
