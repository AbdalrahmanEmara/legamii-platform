# 6. API Client

## Location

`src/lib/api/client.js`

## Overview

The API client is a thin wrapper around `fetch` that handles all HTTP communication with the NestJS backend. It is marked `server-only` and can only be used from Server Components, Server Actions, and Service files.

## How It Works

```js
import { cookies } from "next/headers";
import "server-only";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request(method, endpoint, { body, params } = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  // Append query params
  if (params) {
    Object.entries(params).forEach(([Key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(Key, String(value));
      }
    });
  }

  // Read JWT from httpOnly cookie
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
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}: ${endpoint}`);
  }

  return res.json();
}
```

## Exported Methods

```js
export const api = {
  get:     (endpoint, options)        => request("GET",    endpoint, options),
  post:    (endpoint, body, options)  => request("POST",   endpoint, { ...options, body }),
  put:     (endpoint, body, options)  => request("PUT",    endpoint, { ...options, body }),
  patch:   (endpoint, body, options)  => request("PATCH",  endpoint, { ...options, body }),
  delete:  (endpoint, options)        => request("DELETE", endpoint, options),
};
```

### Method Signatures

| Method | Parameters | Description |
|---|---|---|
| `api.get(endpoint, { params })` | `params` = query params object | Fetch data |
| `api.post(endpoint, body, options?)` | `body` = request payload | Create resource |
| `api.put(endpoint, body, options?)` | `body` = request payload | Full update |
| `api.patch(endpoint, body, options?)` | `body` = request payload | Partial update |
| `api.delete(endpoint, options?)` | — | Delete resource |

## Key Behaviors

### 1. Base URL
Read from `NEXT_PUBLIC_API_BASE_URL` environment variable. The full URL is constructed as:
```
${BASE_URL}/${endpoint}
```
Where `endpoint` comes from the `ENDPOINTS` object (e.g., `api/v1/quiz`).

### 2. Query Parameters
Passed as an object under the `params` key:
```js
api.get(ENDPOINTS.leaderboard.global, { params: { page: 1, limit: 50 } })
```
Only non-null, non-undefined values are appended.

### 3. JWT Authentication
The token is read from the `token` httpOnly cookie on every request. If present, it's attached as:
```
Authorization: Bearer <token>
```
This means services/actions do NOT need to manually pass tokens — the client handles it automatically.

### 4. Error Handling
Non-OK responses throw an `Error` with the backend's `message` field (if available) or a generic `"HTTP {status}: {endpoint}"` message. All callers (services → actions → components) are responsible for catching these errors.

### 5. Return Value
All successful responses return the parsed JSON body directly. The client does not wrap responses in any data structure — that's the backend's responsibility.

## Usage Rules

1. **Never import `api` directly in components** — always go through services or actions
2. **Never import `api` in client components** — it's `server-only`, will throw an error at build time
3. **Never use `fetch` directly** — with one exception (see below)

## Exception

The only file that uses `fetch` directly instead of `api` is for file uploads (multipart/form-data), which require a different `Content-Type` header (no `Content-Type` set — let the browser set `multipart/form-data` with boundary). The service file for this is at `src/lib/services/cloudinary.service.js`.

## Testing API Calls

When the backend isn't running, `api` calls will throw fetch errors. All actions wrap their service calls in try/catch and return `null` or `{ success: false }` on failure, so the UI degrades gracefully.
