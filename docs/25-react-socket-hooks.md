# 25. React Socket Hooks

## Overview

Three custom hooks wrap the raw Socket.IO modules in React-friendly interfaces. They manage connection lifecycle, event subscription, and cleanup within the `useEffect` pattern.

## Hook Locations

```
src/app/(app)/hooks/
├── useContestSocket.ts
├── useLeaderboardSocket.ts
└── useNotificationSocket.ts
```

## useContestSocket

Used by the contest play page. Provides real-time contest features.

### Signature

```ts
function useContestSocket(params: {
  token: string | null;
  contestId: string;
  studentContestId: string;
  onJoined?: (data: ContestJoinedPayload) => void;
  onStarted?: (data: ContestStartedPayload) => void;
  onClarification?: (data: ContestClarificationPayload) => void;
  onLeaderboard?: (data: ContestLeaderboardPayload) => void;
  onFinished?: (data: ContestFinishedPayload) => void;
  onError?: (err: any) => void;
}): void
```

### Usage

```tsx
useContestSocket({
  token,
  contestId,
  studentContestId,
  onJoined: (data) => {
    setRemainingSeconds(data.remainingSeconds);
  },
  onStarted: (data) => {
    setStartedAt(data.startedAt);
    setEndsAt(data.endsAt);
  },
  onLeaderboard: (data) => {
    setLeaderboard(data.leaderboard);
  },
  onClarification: (data) => {
    addClarification(data);
  },
  onFinished: (data) => {
    handleContestFinished(data.reason);
  },
});
```

### Internal Implementation Pattern

```ts
"use client";
import { useEffect, useRef } from "react";
import { connectContestSocket, disconnectContestSocket } from "@/lib/sockets/contest.socket";

export function useContestSocket({
  token, contestId, studentContestId,
  onJoined, onStarted, onLeaderboard, onClarification, onFinished, onError
}) {
  // Use refs to keep callbacks stable without re-subscribing
  const callbacks = useRef({ onJoined, onStarted, onLeaderboard, onClarification, onFinished, onError });
  callbacks.current = { onJoined, onStarted, onLeaderboard, onClarification, onFinished, onError };

  useEffect(() => {
    if (!token || !contestId) return;

    const socket = connectContestSocket(token, contestId, studentContestId, callbacks.current.onError);

    socket.on("contest:joined", (data) => callbacks.current.onJoined?.(data));
    socket.on("contest:started", (data) => callbacks.current.onStarted?.(data));
    socket.on("contest:clarification", (data) => callbacks.current.onClarification?.(data));
    socket.on("contest:leaderboard", (data) => callbacks.current.onLeaderboard?.(data));
    socket.on("contest:finished", (data) => callbacks.current.onFinished?.(data));

    return () => {
      socket.off("contest:joined");
      socket.off("contest:started");
      socket.off("contest:clarification");
      socket.off("contest:leaderboard");
      socket.off("contest:finished");
      disconnectContestSocket();
    };
  }, [token, contestId, studentContestId]);
}
```

### Key Pattern: `useRef` for Callbacks

The hook uses `useRef` to store callback references. This avoids re-subscribing to socket events when callback functions change on re-render, while still calling the latest callback version.

---

## useLeaderboardSocket

Used by the `GlobalLeaderboard` component on the home page.

### Signature

```ts
function useLeaderboardSocket(params: {
  token?: string | null;
  onLeaderboardUpdate?: (data: LeaderboardUpdatePayload) => void;
}): void
```

### Usage

```tsx
useLeaderboardSocket({
  token: session?.token,
  onLeaderboardUpdate: (data) => {
    // Update local leaderboard state
    setLeaderboard(data.data.leaderboard);
  },
});
```

### Internal Implementation

```ts
export function useLeaderboardSocket({ token, onLeaderboardUpdate }) {
  const callbackRef = useRef(onLeaderboardUpdate);
  callbackRef.current = onLeaderboardUpdate;

  useEffect(() => {
    if (!token) return;

    const socket = connectLeaderboardSocket(token);
    const handler = (data) => callbackRef.current?.(data);
    subscribeToLeaderboard(handler);

    return () => {
      unsubscribeFromLeaderboard(handler);
      // Note: does NOT disconnect — other components may use the same socket
    };
  }, [token]);
}
```

**Important:** This hook only **unsubscribes** the callback on cleanup — it does NOT disconnect the socket, because other components (like a full leaderboard page) may share the same `/leaderboard` namespace connection.

---

## useNotificationSocket

Used by `NotificationListener` (embedded in the student layout).

### Signature

```ts
function useNotificationSocket(params: {
  token?: string | null;
  onNotification?: (data: NotificationPayload) => void;
  onBroadcast?: (data: BroadcastPayload) => void;
}): void
```

### Usage

```tsx
useNotificationSocket({
  token: session?.token,
  onNotification: (notification) => {
    console.log("New notification:", notification.title);
    // Could trigger a toast or update badge count
  },
  onBroadcast: (broadcast) => {
    console.log("New broadcast:", broadcast.title);
  },
});
```

### Internal Implementation

```ts
export function useNotificationSocket({ token, onNotification, onBroadcast }) {
  const callbacks = useRef({ onNotification, onBroadcast });
  callbacks.current = { onNotification, onBroadcast };

  useEffect(() => {
    if (!token) return;

    const socket = connectNotificationSocket(token);

    const notifHandler = (data) => callbacks.current.onNotification?.(data);
    const broadcastHandler = (data) => callbacks.current.onBroadcast?.(data);

    subscribeToNotification(notifHandler);
    subscribeToBroadcast(broadcastHandler);

    return () => {
      unsubscribeFromNotification(notifHandler);
      unsubscribeFromBroadcast(broadcastHandler);
      disconnectNotificationSocket();
    };
  }, [token]);
}
```

---

## Connection Decision Table

| Hook | Requires Token | Disconnects on Cleanup | Socket Singleton |
|---|---|---|---|
| `useContestSocket` | Yes | Yes (disconnects) | Yes — one socket per page |
| `useLeaderboardSocket` | Yes | No (only unsubscribes) | Yes — shared across components |
| `useNotificationSocket` | Yes | Yes (disconnects) | Yes — one socket per layout |

## Best Practices

1. **Always guard with token check** — `if (!token) return;` in the effect
2. **Use `useRef` for callbacks** — prevents stale closures and unnecessary re-subscriptions
3. **Clean up event listeners** — remove specific listeners on unmount (not all listeners)
4. **Don't disconnect shared sockets** — the leaderboard socket is shared; only unsubscribe callbacks
5. **Handle errors** — pass an `onError` callback for contest socket connection issues
6. **Import from the hook file** — components import hooks, not raw socket modules
