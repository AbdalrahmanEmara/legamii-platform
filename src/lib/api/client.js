// assembles full URL + makes the request
import "server-only"
console.log(process.env);
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("BASE URL:", BASE_URL);
// console.log("ENDPOINT:", endpoint);

async function request(method, endpoint, { body, params } = {}) {
  // const url = new URL(`${BASE_URL}/${endpoint}`);
  const url = new URL(endpoint, BASE_URL);
   console.log("ENDPOINT:", endpoint);
    console.log("URL:", url);
  if (params) { 
    Object.entries(params).forEach(([Key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(Key, String(value));
      }
    })
  }

  const token = process.env.NEXT_PUBLIC_DEV_TOKEN;

console.log("TOKEN:", token);

const res = await fetch(url.toString(), {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: body ? JSON.stringify(body) : undefined,
});

  if (!res.ok) {
    const error = await res.json().catch(() => {});
    throw new Error(error?.message ?? `HTTP ${res.status}: ${endpoint}`)
  }

  return res.json();
}

export const api = {
  get: (endpoint, options) => request('GET', endpoint, options),
  post: (endpoint, body, options) => request('POST', endpoint, {...options, body}),
  put: (endpoint, body, options) => request('PUT', endpoint, {...options, body}),
  patch: (endpoint, body, options) => request('PATCH', endpoint, {...options, body}),
  delete: (endpoint, options) => request('DELETE', endpoint, options)
}