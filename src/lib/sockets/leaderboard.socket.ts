// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export const connectLeaderboardSocket = (token: string): Socket => {
//     if (!socket) {
//         socket = io(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard`, {
//             auth: { token },
//             transports: ["websocket"],
//         });
//     } else if (!socket.connected) {
//         socket.auth = { token };
//         socket.connect();
//     }

//     return socket;
// };

// export const disconnectLeaderboardSocket = () => {
//     socket?.disconnect();
// };

// export const getLeaderboardSocket = () => socket;

import { io, Socket } from "socket.io-client";
import { LeaderboardStudent } from "@/app/(app)/features/leaderboard/types";

let socket: Socket | null = null;

const EVENT_NAME = "leaderboard:global";

export function connectLeaderboardSocket(token: string) {
  // Reuse the existing socket if it already exists.
  if (!socket) {
    socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/leaderboard`, {
      auth: { token },

      // Force WebSocket transport.
      transports: ["websocket"],
    });
  }

  // Reconnect if it was previously disconnected.
  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }

  return socket;
}

// export function subscribeToLeaderboard(
//   callback: (students: LeaderboardStudent[]) => void
// ) {
//   if (!socket) {
//     console.warn("Leaderboard socket is not connected.");
//     return;
//   }

//   socket.on(EVENT_NAME, callback);
// }
export function subscribeToLeaderboard(
  callback: (students: LeaderboardStudent[]) => void
) {
  if (!socket) {
    console.warn("Leaderboard socket is not connected.");
    return;
  }

  const currentSocket = socket;

  currentSocket.on("connect", () => {
    console.log("Socket connected:", currentSocket.id);
  });

  currentSocket.on(EVENT_NAME, (students: LeaderboardStudent[]) => {
    console.log("REALTIME UPDATE:", students);
    callback(students);
  });
}

export function unsubscribeFromLeaderboard(
  callback: (students: LeaderboardStudent[]) => void
) {
  socket?.off(EVENT_NAME, callback);
}

export function disconnectLeaderboardSocket() {
  socket?.disconnect();
  socket = null;
}