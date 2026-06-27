import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

// 1. Get Notifications
export async function getNotifications(page = 1, limit = 20) {
  return api.get(ENDPOINTS.notifications.list(page, limit));
}

// 2. Get Unread Count
export async function getUnreadCount() {
  return api.get(ENDPOINTS.notifications.unreadCount);
}

// 3. Mark Notification as Read
export async function markNotificationAsRead(notificationId) {
  return api.patch(ENDPOINTS.notifications.read(notificationId));
}

// 4. Mark All Notifications as Read
export async function markAllNotificationsAsRead() {
  return api.patch(ENDPOINTS.notifications.readAll);
}

// 5. Get Broadcasts
export async function getBroadcasts() {
  return api.get(ENDPOINTS.notifications.broadcasts);
}

// 6. Mark Broadcast as Read
export async function markBroadcastAsRead(broadcastId) {
  return api.patch(ENDPOINTS.notifications.readBroadcast(broadcastId));
}

// 7. Admin: Broadcast Notification
export async function createBroadcast(body) {
  return api.post(ENDPOINTS.notifications.broadcast, body);
}

// 8. Teacher: Send Contest Clarification
export async function sendContestClarification(body) {
  return api.post(ENDPOINTS.notifications.sendContestClarification, body);
}

// 9. Get Contest Clarification
export async function getContestClarification(contestId) {
  return api.get(ENDPOINTS.notifications.contestClarification(contestId));
}
