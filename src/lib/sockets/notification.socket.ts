import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

let socket: Socket | null = null;

export function connectNotificationSocket(token: string) {
  if (!socket) {
    socket = io(`${SOCKET_URL}/notifications`, {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Notification socket connected:", socket?.id);
    });
  } else if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }

  return socket;
}

export function subscribeToNotification(
  callback: (data: {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    metadata: unknown;
    is_read: boolean;
    created_at: string;
  }) => void
) {
  if (!socket) {
    console.warn("Notification socket is not connected.");
    return;
  }
  socket.on("notification", callback);
}

export function unsubscribeFromNotification(
  callback: (data: {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: string;
    metadata: unknown;
    is_read: boolean;
    created_at: string;
  }) => void
) {
  socket?.off("notification", callback);
}

export function subscribeToBroadcast(
  callback: (data: {
    id: string;
    title: string;
    message: string;
    type: string;
    metadata: unknown;
    created_at: string;
  }) => void
) {
  if (!socket) {
    console.warn("Notification socket is not connected.");
    return;
  }
  socket.on("broadcast", callback);
}

export function unsubscribeFromBroadcast(
  callback: (data: {
    id: string;
    title: string;
    message: string;
    type: string;
    metadata: unknown;
    created_at: string;
  }) => void
) {
  socket?.off("broadcast", callback);
}

export function disconnectNotificationSocket() {
  socket?.disconnect();
  socket = null;
}
