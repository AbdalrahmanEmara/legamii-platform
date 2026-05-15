import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function signup(body) {
  return api.post(ENDPOINTS.auth.signup, body);
}

export async function verifyEmail(body) {
  return api.post(ENDPOINTS.auth.verifyEmail, body);
}

export async function login(body) {
  return api.post(ENDPOINTS.auth.login, body);
}

export async function resetPassword(body) {
  return api.post(ENDPOINTS.auth.resetPassword, body);
}

export async function forgetPassword(body) {
  return api.post(ENDPOINTS.auth.forgetPassword, body);
}
