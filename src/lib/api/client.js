// assembles full URL + makes the request
import { cookies } from "next/headers";
import "server-only";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request(method, endpoint, { body, params } = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([Key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(Key, String(value));
      }
    });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => { });
    throw new Error(Array.isArray(error?.message) ? error.message.join(", ") : (error?.message ?? `HTTP ${res.status}: ${endpoint}`));
  }

  return res.json();
}

export const api = {
  get: (endpoint, options) => request("GET", endpoint, options),
  post: (endpoint, body, options) => request("POST", endpoint, { ...options, body }),
  put: (endpoint, body, options) => request("PUT", endpoint, { ...options, body }),
  patch: (endpoint, body, options) => request("PATCH", endpoint, { ...options, body }),
  delete: (endpoint, options) => request("DELETE", endpoint, options),
};
