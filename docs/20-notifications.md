# 20. Notifications

## Overview

The notification system provides real-time and polled notifications to users. It supports three types of events:
1. **Personal notifications** — per-user messages (quiz results, contest reminders, etc.)
2. **Broadcasts** — admin messages sent to all users
3. **Contest clarifications** — teacher messages during a live contest

## Architecture

```
┌────────────────────────────────────────────────────┐
│  Layout (server)                                   │
│  └── NotificationListener (client)                 │
│        │ useNotificationSocket                     │
│        │ subscribes to: "notification", "broadcast"│
│        └── socket.io /notifications                │
│                                                    │
│  /student/notifications (page)                     │
│       │ Server: fetches initial data               │
│       │ Client: renders list, mark as read         │
└────────────────────────────────────────────────────┘
```

## NotificationListener

**File:** `src/components/notifications/NotificationListener.js`

An invisible client component embedded in the student layout:

```jsx
"use client";
import { useEffect } from "react";
import { getSessionAction } from "@/lib/actions/auth.action";
import { useNotificationSocket } from "@/app/(app)/hooks/useNotificationSocket";

export default function NotificationListener() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSessionAction().then(setSession);
  }, []);

  // Connect socket when token is available
  useNotificationSocket({
    token: session?.token,
    onNotification: (notification) => {
      console.log("New notification:", notification);
    },
    onBroadcast: (broadcast) => {
      console.log("New broadcast:", broadcast);
    },
  });

  return null; // Invisible
}
```

**Responsibilities:**
1. Checks for a valid session token
2. Connects to the `/notifications` socket namespace when authenticated
3. Subscribes to `notification` and `broadcast` events
4. Renders nothing (it's a side-effect component)

## Notification Page (`/student/notifications`)

**File:** `src/app/(app)/student/notifications/page.js`

A server → client page that:
1. Fetches initial notifications and unread count server-side
2. Passes data to a client component that handles interactivity

### Features
- **Notification list** with pagination (`page`, `limit`)
- **Unread count badge** on notification bell in header
- **Mark as read** — individual notification
- **Mark all as read** — bulk action
- **Broadcasts section** — admin messages
- **Empty state** — "No notifications yet"

### Actions

| Action | HTTP | Endpoint |
|---|---|---|
| `getNotificationsAction(page, limit)` | GET | `notifications.list(page, limit)` |
| `getUnreadCountAction()` | GET | `notifications.unreadCount` |
| `markNotificationAsReadAction(notificationId)` | PATCH | `notifications.read(notificationId)` |
| `markAllNotificationsAsReadAction()` | PATCH | `notifications.readAll` |
| `getBroadcastsAction()` | GET | `notifications.broadcasts` |
| `markBroadcastAsReadAction(broadcastId)` | PATCH | `notifications.readBroadcast(broadcastId)` |

### Admin/Teacher Actions

| Action | Role | HTTP | Purpose |
|---|---|---|---|
| `createBroadcastAction(body)` | Admin | POST | Send broadcast to all users |
| `sendContestClarificationAction(body)` | Teacher | POST | Send clarification during contest |
| `getContestClarificationAction(contestId)` | Any | GET | Get clarifications for a contest |

## Socket Events

### Client Emits

```js
// Join a contest room to receive contest clarifications
socket.emit("joinContestRoom", { contestId: "..." });

// Leave a contest room
socket.emit("leaveContestRoom", { contestId: "..." });
```

### Server Events

| Event | Payload | Trigger |
|---|---|---|
| `notification` | `{ id, user_id, title, message, type, metadata, is_read, created_at }` | Personal notification for user |
| `broadcast` | `{ id, title, message, type, metadata, created_at }` | Admin broadcast to all users |
| `contestClarification` | `{ id, contestId, message, teacherName, createdAt }` | Teacher clarification in contest room |

### Event Payload Types

```ts
interface ResponseNotificationDto {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}

interface ResponseBroadcastDto {
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
  is_read?: boolean;
}

interface ResponseContestClarificationDto {
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```

## Socket Connection

```ts
// src/lib/sockets/notification.socket.ts
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/lib/constants";

let socket: Socket | null = null;

export function connectNotificationSocket(token: string): Socket {
  if (!socket) {
    socket = io(`${SOCKET_URL}/notifications`, {
      auth: { token },
    });
  }
  if (socket.disconnected) {
    socket.auth = { token };
    socket.connect();
  }
  return socket;
}
```

The socket uses a **singleton pattern** — one socket instance per namespace for the entire app lifecycle. See Chapter 23 for full details.

## Data Models

```ts
interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;          // "contest_reminder", "quiz_result", etc.
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}

interface Broadcast {
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
  is_read?: boolean;
}
```
