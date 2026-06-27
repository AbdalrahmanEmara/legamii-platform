'use server';

import "server-only";
import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getBroadcasts,
  markBroadcastAsRead,
  createBroadcast,
  sendContestClarification,
  getContestClarification
} from "../services/notifications.service";

export async function getNotificationsAction(page = 1, limit = 20) {
  try {
    const res = await getNotifications(page, limit);
    return res;
  } catch (err) {
    console.error("Error getting notifications:", err);
    return null;
  }
}

export async function getUnreadCountAction() {
  try {
    const res = await getUnreadCount();
    return res;
  } catch (err) {
    console.error("Error getting unread count:", err);
    return null;
  }
}

export async function markNotificationAsReadAction(notificationId) {
  try {
    const res = await markNotificationAsRead(notificationId);
    return res;
  } catch (err) {
    console.error("Error marking notification as read:", err);
    throw err;
  }
}

export async function markAllNotificationsAsReadAction() {
  try {
    const res = await markAllNotificationsAsRead();
    return res;
  } catch (err) {
    console.error("Error marking all notifications as read:", err);
    throw err;
  }
}

export async function getBroadcastsAction() {
  try {
    const res = await getBroadcasts();
    return res;
  } catch (err) {
    console.error("Error getting broadcasts:", err);
    return null;
  }
}

export async function markBroadcastAsReadAction(broadcastId) {
  try {
    const res = await markBroadcastAsRead(broadcastId);
    return res;
  } catch (err) {
    console.error("Error marking broadcast as read:", err);
    throw err;
  }
}

export async function createBroadcastAction(body) {
  try {
    const res = await createBroadcast(body);
    return res;
  } catch (err) {
    console.error("Error creating broadcast:", err);
    throw err;
  }
}

export async function sendContestClarificationAction(body) {
  try {
    const res = await sendContestClarification(body);
    return res;
  } catch (err) {
    console.error("Error sending contest clarification:", err);
    throw err;
  }
}

export async function getContestClarificationAction(contestId) {
  try {
    const res = await getContestClarification(contestId);
    return res;
  } catch (err) {
    console.error("Error getting contest clarification:", err);
    return null;
  }
}
