const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

import { io, Socket } from "socket.io-client";
import { LeaderboardStudent } from "@/app/(app)/student/leaderboard/types";

let socket: Socket | null = null;

const EVENT_NAME = "leaderboard:global";

export function connectLeaderboardSocket(token: string) {
  // Reuse the existing socket if it already exists.
  if (!socket) {
    console.log(SOCKET_URL);
    socket = io(`${SOCKET_URL}/leaderboard`, {
      auth: { token },

      // Force WebSocket transport.
      transports: ["websocket"],
    });

    // Registered ONCE, only when the socket is first created.
    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });
  } else if (!socket.connected) {
    // Reconnect if it was previously disconnected.
    socket.auth = { token };
    socket.connect();
  }

  return socket;
}

export function subscribeToLeaderboard(callback: (students: LeaderboardStudent[]) => void) {
  if (!socket) {
    console.warn("Leaderboard socket is not connected.");
    return;
  }

  socket.on(EVENT_NAME, callback);
}

export function unsubscribeFromLeaderboard(callback: (students: LeaderboardStudent[]) => void) {
  socket?.off(EVENT_NAME, callback);
}

export function disconnectLeaderboardSocket() {
  socket?.disconnect();
  socket = null;
}
