# 23. WebSocket Architecture

## Overview

Legamii uses **Socket.IO** for real-time communication. Three separate socket namespaces handle different concerns: contests, leaderboard, and notifications. Each namespace uses a **singleton connection pattern** managed by TypeScript modules in `src/lib/sockets/`.

## Namespaces

| Namespace | Module | Purpose |
|---|---|---|
| `/contest` | `contest.socket.ts` | Real-time contest events (leaderboard, clarifications, start/end) |
| `/leaderboard` | `leaderboard.socket.ts` | Global leaderboard live updates |
| `/notifications` | `notification.socket.ts` | Personal notifications and broadcasts |

## Singleton Connection Pattern

All three socket modules follow the same pattern:

```ts
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/lib/constants";

let socket: Socket | null = null;

export function connectNamespaceSocket(token: string): Socket {
  // Create new connection if none exists
  if (!socket) {
    socket = io(`${SOCKET_URL}/namespace`, {
      auth: { token },
    });
  }

  // Reconnect if disconnected
  if (socket.disconnected) {
    socket.auth = { token };
    socket.connect();
  }

  return socket;
}

export function disconnectNamespaceSocket(): void {
  socket?.disconnect();
  socket = null;
}
```

### Why Singleton?

1. **Multiple components may need the same namespace** — e.g., the home page leaderboard widget and the full leaderboard page both use `/leaderboard`
2. **Avoid duplicate connections** — only one socket per namespace for the entire app lifecycle
3. **Centralized lifecycle** — connect/disconnect is managed explicitly, not per-component

## Connection Lifecycle

```
Component mounts
  │
  ├── Check for token (auth required)
  │     │
  │     ▼
  │  Token exists? ──No──→ Don't connect
  │     │
  │     ▼ Yes
  │  socket exists? ──Yes──→ socket.disconnected? ──Yes──→ socket.connect()
  │     │                          │                         │
  │     │ No                       │ No                      │
  │     ▼                          ▼                         ▼
  │  io(url, { auth })       (already connected)       (reconnected)
  │     │
  │     ▼
  │  "connect" event fires
  │     │
  │     ▼
  │  Register event listeners (subscribe* functions)
  │
  │  ─── (app runs) ───
  │
  │  Component unmounts
  │     │
  │     ▼
  │  Unregister specific callbacks
  │  (socket may stay connected for other components)
  │
  │  ─── (app fully unloads) ───
  │
  ▼
disconnectSocket()  ← Called explicitly or on logout
```

## Auth

All sockets require authentication via JWT token passed in the `auth` option:

```ts
socket = io(`${SOCKET_URL}/namespace`, {
  auth: { token: jwtToken },
});
```

The token is read from the `token` cookie via `getSessionAction()` in the component hook. If the token is missing or expired, the socket doesn't connect.

## Server-Side Rooms

Each namespace has server-side room logic:

| Namespace | Room | Purpose |
|---|---|---|
| `/contest` | Auto-join: user-specific room | Receive personal contest events |
| `/contest` | Manual join: contest room via `joinContestRoom` | Receive contest-scoped events (clarifications) |
| `/notifications` | Auto-join: `user:{userId}` | Receive personal notifications |
| `/notifications` | Manual join: contest room via `joinContestRoom` | Receive contest clarifications |
| `/leaderboard` | Global room | Receive global leaderboard updates |

## Socket Modules

### contest.socket.ts

```ts
export function connectContestSocket(token: string, contestId: string, studentContestId: string, onError?: (err: any) => void): Socket
export function disconnectContestSocket(): void
```

On connect, automatically emits `contest:join` with `{ contestId, studentContestId }`.

### leaderboard.socket.ts

```ts
export function connectLeaderboardSocket(token: string): Socket
export function disconnectLeaderboardSocket(): void
export function subscribeToLeaderboard(callback: (data: any) => void): void
export function unsubscribeFromLeaderboard(callback: (data: any) => void): void
```

### notification.socket.ts

```ts
export function connectNotificationSocket(token: string): Socket
export function disconnectNotificationSocket(): void
export function subscribeToNotification(callback: (data: any) => void): void
export function unsubscribeFromNotification(callback: (data: any) => void): void
export function subscribeToBroadcast(callback: (data: any) => void): void
export function unsubscribeFromBroadcast(callback: (data: any) => void): void
```

## React Hooks

Each socket module has a corresponding React hook in `src/app/(app)/hooks/`:

| Hook | Socket Namespace | Used By |
|---|---|---|
| `useContestSocket` | `/contest` | Contest play page |
| `useLeaderboardSocket` | `/leaderboard` | Home page GlobalLeaderboard |
| `useNotificationSocket` | `/notifications` | NotificationListener (layout) |

See Chapter 25 for detailed hook documentation.

## Configuration

```js
// src/lib/constants.js
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
```

The socket URL defaults to the same host as the API but can be configured separately via `NEXT_PUBLIC_SOCKET_URL` in `.env`.

## Error Handling

Socket errors are handled at two levels:

1. **Connection errors** — `connect_error` event is logged, and the socket falls back to HTTP long-polling (Socket.IO default behavior)
2. **Application errors** — custom error events emitted by the server are handled by the hooks' error callbacks
