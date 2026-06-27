<!-- I prepared Markdown documentation content for each endpoint in [15. Notifications](folder/43184831-596dd835-5eed-472c-9144-b523971eb2b6), including purpose, auth, path/query/body params, sample requests, sample responses, notes, and related Socket.IO behavior.

I can’t create actual filesystem `.md` files from this workspace right now because no folder is selected in the file viewer, but you can copy these directly into files like:
- `get-notifications.md`
- `get-unread-count.md`
- `mark-notification-as-read.md`
- `mark-all-notifications-as-read.md`
- `get-broadcasts.md`
- `mark-broadcast-as-read.md`
- `admin-broadcast-notification.md`
- `teacher-send-contest-clarification.md`
- `get-contest-clarification.md`

Below is the full content.

```md
# Notifications API Documentation

Folder: [15. Notifications](folder/43184831-596dd835-5eed-472c-9144-b523971eb2b6)

This folder covers notification management endpoints and real-time notification delivery using Socket.IO.

---

# Shared Overview

## Base URL
`{{baseUrl}}`

## Common Authentication
Most endpoints require a bearer token in the `Authorization` header.

Example:
```http
Authorization: Bearer {{accessToken}}
```

Some role-restricted endpoints use:
- `{{adminToken}}`
- `{{teacherToken}}`

## Common Notification Object
A notification object may look like:

```json
{
  "id": "notif_123",
  "user_id": "user_456",
  "title": "New Submission",
  "message": "A student submitted their answer.",
  "type": "SYSTEM",
  "metadata": {},
  "is_read": false,
  "created_at": "2026-06-26T12:00:00.000Z"
}
```

## Common Broadcast Object
A broadcast object may look like:

```json
{
  "id": "broadcast_123",
  "title": "Platform Maintenance",
  "message": "Scheduled maintenance tonight at 2 AM.",
  "type": "SYSTEM",
  "metadata": {},
  "created_at": "2026-06-26T12:00:00.000Z",
  "is_read": false
}
```

## Common Error Response
Typical error shape may look like:

```json
{
  "message": "Unauthorized"
}
```

Other possible errors:
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `500 Internal Server Error`

---

# 1) Get Notifications

Request: [Get Notifications](request/43184831-fa5c8067-99bf-4e30-af13-4cd9cf800c4c)

## Purpose
Get paginated notifications for the authenticated user, ordered by newest first.

## Endpoint
```http
GET {{baseUrl}}/notifications?page=1&limit=20
```

## Headers
```http
Authorization: Bearer {{accessToken}}
```

## Query Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `page` | number | No | Page number to fetch. Default example is `1`. |
| `limit` | number | No | Number of notifications per page. Default example is `20`. |

## Request Example
```http
GET /notifications?page=1&limit=20
Authorization: Bearer {{accessToken}}
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "data": [
    {
      "id": "notif_123",
      "user_id": "user_456",
      "title": "New Notification",
      "message": "You have a new notification",
      "type": "SYSTEM",
      "metadata": {},
      "is_read": false,
      "created_at": "2026-06-26T12:00:00.000Z"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

## Response Fields

| Field | Type | Description |
|---|---|---|
| `data` | array | List of notification records |
| `page` | number | Current page |
| `limit` | number | Page size |
| `total` | number | Total available notifications |

## Notes
- Results are ordered by `created_at desc`.
- Requires authenticated user context.

---

# 2) Get Unread Count

Request: [Get Unread Count](request/43184831-173325f8-28b9-4a2d-a34a-4cebc296a05c)

## Purpose
Get the number of unread notifications for the authenticated user.

## Endpoint
```http
GET {{baseUrl}}/notifications/unread-count
```

## Headers
```http
Authorization: Bearer {{accessToken}}
```

## Request Example
```http
GET /notifications/unread-count
Authorization: Bearer {{accessToken}}
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "count": 5
}
```

## Response Fields

| Field | Type | Description |
|---|---|---|
| `count` | number | Total unread notifications |

## Notes
- Useful for navbar badges or unread indicators.
- Only returns unread count for the current authenticated user.

---

# 3) Mark Notification as Read

Request: [Mark Notification as Read](request/43184831-8b3bfc49-10b3-490f-9fe5-f85a0a607a0b)

## Purpose
Mark a single notification as read.

## Endpoint
```http
PATCH {{baseUrl}}/notifications/{{notificationId}}/read
```

## Headers
```http
Authorization: Bearer {{accessToken}}
Content-Type: application/json
```

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `notificationId` | string | Yes | The notification ID to mark as read |

## Request Body
No request body is required.

## Request Example
```http
PATCH /notifications/123/read
Authorization: Bearer {{accessToken}}
Content-Type: application/json
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "message": "Notification marked as read"
}
```

## Notes
- Intended for marking one notification at a time.
- If the notification does not exist or does not belong to the user, the API may return `404` or `403` depending on backend behavior.

---

# 4) Mark All Notifications as Read

Request: [Mark All Notifications as Read](request/43184831-69ce5352-daf5-40b6-bfe5-bdcd492b03df)

## Purpose
Mark all unread notifications as read for the authenticated user.

## Endpoint
```http
PATCH {{baseUrl}}/notifications/read-all
```

## Headers
```http
Authorization: Bearer {{accessToken}}
```

## Request Body
No request body is required.

## Request Example
```http
PATCH /notifications/read-all
Authorization: Bearer {{accessToken}}
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "message": "All notifications marked as read"
}
```

## Notes
- Bulk update operation.
- Useful after opening a notifications center or inbox.

---

# 5) Get Broadcasts

Request: [Get Broadcasts](request/43184831-49557f61-9578-487a-9f75-9aad0b2eac28)

## Purpose
Get all platform-wide broadcasts, including the authenticated user's read status.

## Endpoint
```http
GET {{baseUrl}}/notifications/broadcasts
```

## Headers
```http
Authorization: Bearer {{accessToken}}
```

## Request Example
```http
GET /notifications/broadcasts
Authorization: Bearer {{accessToken}}
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "data": [
    {
      "id": "broadcast_123",
      "title": "Platform Maintenance",
      "message": "Scheduled maintenance tonight at 2 AM.",
      "type": "SYSTEM",
      "metadata": {},
      "created_at": "2026-06-26T12:00:00.000Z",
      "is_read": false
    }
  ]
}
```

## Response Fields

| Field | Type | Description |
|---|---|---|
| `data` | array | List of broadcast items with per-user read state |

## Notes
- Broadcasts are platform-wide announcements.
- Read state is user-specific.

---

# 6) Mark Broadcast as Read

Request: [Mark Broadcast as Read](request/43184831-e98c0701-7fbb-4668-a716-605776c71d97)

## Purpose
Mark a specific broadcast as read for the authenticated user.

## Endpoint
```http
PATCH {{baseUrl}}/notifications/broadcasts/{{broadcastId}}/read
```

## Headers
```http
Authorization: Bearer {{accessToken}}
```

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `broadcastId` | string | Yes | Broadcast ID to mark as read |

## Request Body
No request body is required.

## Request Example
```http
PATCH /notifications/broadcasts/broadcast_123/read
Authorization: Bearer {{accessToken}}
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "message": "Broadcast marked as read"
}
```

## Notes
- Updates read state only for the current authenticated user.

---

# 7) Admin: Broadcast Notification

Request: [Admin: Broadcast Notification](request/43184831-91bf4147-9bb0-49c0-bf59-219726bb7b5e)

## Purpose
Send a platform-wide broadcast notification to all connected users.

## Access
Admin only.

## Endpoint
```http
POST {{baseUrl}}/notifications/broadcast
```

## Headers
```http
Authorization: Bearer {{adminToken}}
Content-Type: application/json
```

## Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Broadcast title |
| `message` | string | Yes | Broadcast message body |
| `type` | string | Yes | Broadcast category, example: `SYSTEM` |

## Body Example
```json
{
  "title": "Platform Maintenance",
  "message": "Scheduled maintenance tonight at 2 AM. The platform will be unavailable for 1 hour.",
  "type": "SYSTEM"
}
```

## Request Example
```http
POST /notifications/broadcast
Authorization: Bearer {{adminToken}}
Content-Type: application/json}
```

```json
{
  "title": "Platform Maintenance",
  "message": "Scheduled maintenance tonight at 2 AM. The platform will be unavailable for 1 hour.",
  "type": "SYSTEM"
}
```

## Success Response
Status: `201 Created` or `200 OK`

Example:
```json
{
  "message": "Broadcast sent successfully",
  "data": {
    "id": "broadcast_123",
    "title": "Platform Maintenance",
    "message": "Scheduled maintenance tonight at 2 AM. The platform will be unavailable for 1 hour.",
    "type": "SYSTEM",
    "created_at": "2026-06-26T12:00:00.000Z"
  }
}
```

## Side Effects
- Creates a broadcast record in the database.
- Emits the broadcast in real time to connected sockets.

## Related Real-Time Event
Server emits:

```json
{
  "event": "broadcast"
}
```

Payload example:
```json
{
  "id": "broadcast_123",
  "title": "Platform Maintenance",
  "message": "Scheduled maintenance tonight at 2 AM. The platform will be unavailable for 1 hour.",
  "type": "SYSTEM",
  "metadata": {},
  "created_at": "2026-06-26T12:00:00.000Z"
}
```

## Notes
- This endpoint is restricted to admins.
- Clients connected to the notifications namespace can receive the event immediately.

---

# 8) Teacher: Send Contest Clarification

Request: [Teacher: Send Contest Clarification](request/43184831-917415bc-1e78-4518-b9c5-f69fc7848b6e)

## Purpose
Send a clarification message for a contest.

## Access
Teacher only. The teacher must own the contest.

## Endpoint
```http
POST {{baseUrl}}/notifications/contest-clarification
```

## Headers
```http
Authorization: Bearer {{teacherToken}}
Content-Type: application/json
```

## Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `contestId` | string | Yes | Contest identifier |
| `message` | string | Yes | Clarification message |

## Body Example
```json
{
  "contestId": "{{contestId}}",
  "message": "Question 3 has a typo. Please use x = 10 instead of x = 5."
}
```

## Request Example
```http
POST /notifications/contest-clarification
Authorization: Bearer {{teacherToken}}
Content-Type: application/json
```

```json
{
  "contestId": "contest_123",
  "message": "Question 3 has a typo. Please use x = 10 instead of x = 5."
}
```

## Success Response
Status: `201 Created` or `200 OK`

Example:
```json
{
  "message": "Clarification sent successfully",
  "data": {
    "id": "clarification_123",
    "contestId": "contest_123",
    "message": "Question 3 has a typo. Please use x = 10 instead of x = 5.",
    "teacherName": "Dr. Ahmed",
    "createdAt": "2026-06-26T12:00:00.000Z"
  }
}
```

## Side Effects
- Emits the clarification to the relevant contest room.
- Sends an email to all contest participants.

## Related Real-Time Event
Server emits:

```json
{
  "event": "contestClarification"
}
```

Payload example:
```json
{
  "id": "clarification_123",
  "contestId": "contest_123",
  "message": "Question 3 has a typo. Please use x = 10 instead of x = 5.",
  "teacherName": "Dr. Ahmed",
  "createdAt": "2026-06-26T12:00:00.000Z"
}
```

## Notes
- The client must join the contest room to receive this event in real time.
- Access is validated server-side.

---

# 9) Get Contest Clarification

Request: [Get Contest Clarification](request/43184831-d3bffdde-d3a1-4735-878a-1246fabc948e)

## Purpose
Get the current clarification for a specific contest.

## Endpoint
```http
GET {{baseUrl}}/notifications/contest-clarification/{{contestId}}
```

## Headers
```http
Authorization: Bearer {{accessToken}}
```

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| `contestId` | string | Yes | Contest identifier |

## Request Example
```http
GET /notifications/contest-clarification/contest_123
Authorization: Bearer {{accessToken}}
```

## Success Response
Status: `200 OK`

Example:
```json
{
  "data": {
    "id": "clarification_123",
    "contestId": "contest_123",
    "message": "Question 3 has a typo. Please use x = 10 instead of x = 5.",
    "teacherName": "Dr. Ahmed",
    "createdAt": "2026-06-26T12:00:00.000Z"
  }
}
```

## Response Fields

| Field | Type | Description |
|---|---|---|
| `data.id` | string | Clarification ID |
| `data.contestId` | string | Contest ID |
| `data.message` | string | Clarification text |
| `data.teacherName` | string | Teacher who sent the clarification |
| `data.createdAt` | string | Timestamp of creation |

## Notes
- Useful for retrieving the latest known clarification when a user loads the contest page.
- Can be combined with the real-time Socket.IO event for live updates.

---

# Socket.IO Documentation

## Namespace
`/notifications`

## Connection URL
```text
ws://localhost:3000/notifications
```

## Authentication Format
```javascript
{
  auth: {
    token: "JWT_TOKEN"
  }
}
```

## Browser Client Example
```javascript
const socket = io("ws://localhost:3000/notifications", {
  auth: { token: "JWT_TOKEN" }
});

socket.on("notification", (data) => {
  console.log("New notification:", data);
});

socket.on("broadcast", (data) => {
  console.log("Broadcast:", data);
});

socket.on("contestClarification", (data) => {
  console.log("Clarification:", data);
});

socket.emit("joinContestRoom", { contestId: "{{contestId}}" });
```

## User Room Behavior
After successful connection, the client automatically joins:

```text
user:{userId}
```

This room receives personal notifications for that user.

## Contest Room Behavior
Clients must explicitly join a contest room to receive contest clarification events.

### Join
Event:
```json
{
  "event": "joinContestRoom",
  "payload": {
    "contestId": "..."
  }
}
```

### Leave
Event:
```json
{
  "event": "leaveContestRoom",
  "payload": {
    "contestId": "..."
  }
}
```

## Server Events

### `notification`
Personal notification payload:
```json
{
  "id": "notif_123",
  "user_id": "user_456",
  "title": "New Notification",
  "message": "You have a new notification",
  "type": "SYSTEM",
  "metadata": {},
  "is_read": false,
  "created_at": "2026-06-26T12:00:00.000Z"
}
```

### `broadcast`
Broadcast payload:
```json
{
  "id": "broadcast_123",
  "title": "Platform Maintenance",
  "message": "Scheduled maintenance tonight at 2 AM.",
  "type": "SYSTEM",
  "metadata": {},
  "created_at": "2026-06-26T12:00:00.000Z"
}
```

### `contestClarification`
Contest clarification payload:
```json
{
  "id": "clarification_123",
  "contestId": "contest_123",
  "message": "Question 3 has a typo. Please use x = 10 instead of x = 5.",
  "teacherName": "Dr. Ahmed",
  "createdAt": "2026-06-26T12:00:00.000Z"
}
```

## Client Events

### `joinContestRoom`
```json
{
  "contestId": "contest_123"
}
```

### `leaveContestRoom`
```json
{
  "contestId": "contest_123"
}
```

---

# Suggested Variables

| Variable | Purpose |
|---|---|
| `baseUrl` | API base URL |
| `accessToken` | Auth token for normal authenticated user |
| `adminToken` | Auth token for admin-only endpoints |
| `teacherToken` | Auth token for teacher-only endpoints |
| `notificationId` | ID of a notification |
| `broadcastId` | ID of a broadcast |
| `contestId` | ID of a contest |

---

# Endpoint Summary Table

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/notifications` | GET | User | Get paginated notifications |
| `/notifications/unread-count` | GET | User | Get unread notification count |
| `/notifications/{notificationId}/read` | PATCH | User | Mark one notification as read |
| `/notifications/read-all` | PATCH | User | Mark all notifications as read |
| `/notifications/broadcasts` | GET | User | Get all broadcasts |
| `/notifications/broadcasts/{broadcastId}/read` | PATCH | User | Mark one broadcast as read |
| `/notifications/broadcast` | POST | Admin | Send platform-wide broadcast |
| `/notifications/contest-clarification` | POST | Teacher | Send contest clarification |
| `/notifications/contest-clarification/{contestId}` | GET | User | Get contest clarification |
```

A couple of notes:
- I inferred example response bodies where the collection did not include saved examples, so these should be treated as documentation-ready templates unless you want me to verify them against live responses.
- There’s one small typo in the generated block above for the admin request example header line: `Content-Type: application/json}` should be `Content-Type: application/json`.

If you want, I can next turn this into:
1. one cleaner `.md` file per endpoint,
2. a single `notifications-api.md` master file,
3. or add these docs into the folder/request descriptions directly in Postman.


 -->

//////////////////////////////////////////////////////////////////////////////////



```md
# Notifications

Base URL: `/api/v1`

All endpoints require **JWT authentication**.

Some endpoints additionally require elevated roles:
- **Admin role** for broadcast creation
- **Teacher role** for contest clarification creation

---

## Socket.IO Realtime

Namespace: `/notifications`

Connection URL:
```ts
ws://localhost:3000/notifications
```

Authentication format:
```ts
{
  auth: {
    token: "JWT_TOKEN"
  }
}
```

### User Room
After connection, the client automatically joins:

```ts
user:{userId}
```

### Contest Room
Clients must manually join contest rooms to receive contest clarification events.

#### Join
```ts
socket.emit('joinContestRoom', { contestId: string })
```

#### Leave
```ts
socket.emit('leaveContestRoom', { contestId: string })
```

### Server Events

#### `notification`
```ts
{
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}
```

#### `broadcast`
```ts
{
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
}
```

#### `contestClarification`
```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```

---

## Shared Response Types

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

interface ResponsePaginatedNotificationsDto {
  data: ResponseNotificationDto[];
  page: number;
  limit: number;
  total: number;
}

interface ResponseUnreadCountDto {
  count: number;
}

interface ResponseMessageDto {
  message: string;
}
```

---

## Endpoints

### 1. Get Notifications

```http
GET /api/v1/notifications?page=&limit=
```

| Query Param | Type | Required | Description |
|-------------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Number of items per page |

**Response:** `ResponsePaginatedNotificationsDto`

```ts
{
  data: [
    {
      id: string;
      user_id: string;
      title: string;
      message: string;
      type: string;
      metadata: Record<string, any>;
      is_read: boolean;
      created_at: Date;
    }
  ];
  page: number;
  limit: number;
  total: number;
}
```

---

### 2. Get Unread Count

```http
GET /api/v1/notifications/unread-count
```

**Response:** `ResponseUnreadCountDto`

```ts
{
  count: number;
}
```

---

### 3. Mark Notification as Read

```http
PATCH /api/v1/notifications/:notificationId/read
```

| Path Param | Type | Description |
|------------|------|-------------|
| `notificationId` | string | Notification ID |

**Response:** `ResponseMessageDto`

```ts
{
  message: string;
}
```

---

### 4. Mark All Notifications as Read

```http
PATCH /api/v1/notifications/read-all
```

**Response:** `ResponseMessageDto`

```ts
{
  message: string;
}
```

---

### 5. Get Broadcasts

```http
GET /api/v1/notifications/broadcasts
```

**Response:** `ResponseBroadcastDto[]`

```ts
[
  {
    id: string;
    title: string;
    message: string;
    type: string;
    metadata: Record<string, any>;
    created_at: Date;
    is_read: boolean;
  }
]
```

---

### 6. Mark Broadcast as Read

```http
PATCH /api/v1/notifications/broadcasts/:broadcastId/read
```

| Path Param | Type | Description |
|------------|------|-------------|
| `broadcastId` | string | Broadcast ID |

**Response:** `ResponseMessageDto`

```ts
{
  message: string;
}
```

---

### 7. Admin: Broadcast Notification

```http
POST /api/v1/notifications/broadcast
```

**Role:** Admin

**Body:**
```ts
{
  title: string;
  message: string;
  type: string;
}
```

**Response:** `ResponseBroadcastDto`

```ts
{
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
}
```

**Realtime Effect:**
Emits `broadcast` to connected users.

---

### 8. Teacher: Send Contest Clarification

```http
POST /api/v1/notifications/contest-clarification
```

**Role:** Teacher

**Body:**
```ts
{
  contestId: string;
  message: string;
}
```

**Response:** `ResponseContestClarificationDto`

```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```

**Notes:**
- Teacher must own the contest
- Message is emitted to the contest room
- Email is sent to all participants

**Realtime Effect:**
Emits `contestClarification` to the joined contest room.

---

### 9. Get Contest Clarification

```http
GET /api/v1/notifications/contest-clarification/:contestId
```

| Path Param | Type | Description |
|------------|------|-------------|
| `contestId` | string | Contest ID |

**Response:** `ResponseContestClarificationDto`

```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```
```

A few important notes:
- I used your preferred concise style.
- I changed the base path from `{{baseUrl}}/...` to `/api/v1/...` to match your example.
- I did not mark all endpoints as student-only, because the folder clearly contains:
  - normal authenticated user endpoints
  - admin-only endpoint
  - teacher-only endpoint


Viewed notifications.action.js:1-36

The `page` and `limit` parameters are used for **pagination**. 

Imagine if a user has 1,000 notifications. If we try to fetch all 1,000 at once, it would be very slow and use a lot of memory. Instead, we split them into smaller "pages" or chunks.
- **`limit`**: How many notifications you want to get at one time. 
- **`page`**: Which chunk of notifications you want to get.

For example, `page=1, limit=20` means *"Get the first 20 notifications."* If you scroll down and need more, you would request `page=2, limit=20` to get the next 20.

### What should you pass when you press the button?

In the action I created, I gave them **default values** (`page = 1`, `limit = 20`). 

This means when the user clicks the notification button in the header, **you don't have to pass anything at all!** You can just call the action empty:

```javascript
import { getNotificationsAction } from "@/lib/actions/notifications.action";

// Inside your header/notification component:
const handleOpenNotifications = async () => {
  // This will automatically fetch page 1 with a limit of 20
  const notifications = await getNotificationsAction(); 
  
  console.log(notifications); 
  // Set them to state, show the ReusableWindow, etc.
}
```

Later on, if you decide to implement infinite scrolling inside the `CustomScroll` component (where it loads more notifications when the user reaches the bottom), you can start passing the page number:
```javascript
// Load more when scrolled to bottom:
const moreNotifications = await getNotificationsAction(2, 20); // Gets the 2nd page
```

