import { useEffect } from "react";

import {
  connectNotificationSocket,
  disconnectNotificationSocket,
  subscribeToNotification,
  unsubscribeFromNotification,
  subscribeToBroadcast,
  unsubscribeFromBroadcast,
} from "@/lib/sockets/notification.socket";

interface NotificationPayload {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  metadata: unknown;
  is_read: boolean;
  created_at: string;
}

interface BroadcastPayload {
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: unknown;
  created_at: string;
}

interface UseNotificationSocketProps {
  token?: string;
  onNotification?: (data: NotificationPayload) => void;
  onBroadcast?: (data: BroadcastPayload) => void;
}

export function useNotificationSocket({
  token,
  onNotification,
  onBroadcast,
}: UseNotificationSocketProps) {
  useEffect(() => {
    if (!token) return;

    connectNotificationSocket(token);

    if (onNotification) subscribeToNotification(onNotification);
    if (onBroadcast) subscribeToBroadcast(onBroadcast);

    return () => {
      if (onNotification) unsubscribeFromNotification(onNotification);
      if (onBroadcast) unsubscribeFromBroadcast(onBroadcast);
      disconnectNotificationSocket();
    };
  }, [token, onNotification, onBroadcast]);
}
