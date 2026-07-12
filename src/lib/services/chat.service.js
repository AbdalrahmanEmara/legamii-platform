import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function askQuestion(body) {
  return api.post(ENDPOINTS.chat.ask, body);
}
