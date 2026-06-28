import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getStreak() {
  const res = await api.get(ENDPOINTS.streak.get);
  return res.data;
}
