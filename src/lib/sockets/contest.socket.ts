import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

let socket: Socket | null = null;

export function connectContestSocket(
  token: string,
  contestId: string,
  studentContestId: string,
  onError?: (message: string) => void
) {
  if (!socket) {
    socket = io(`${SOCKET_URL}/contest`, {
      auth: { token },
      transports: ["websocket"],
    });
  } else if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }

  // Remove old connect listener before adding a new one
  // so contestId/studentContestId are always fresh
  socket.off("connect");

  socket.on("connect", () => {
    console.log("Contest socket connected:", socket?.id);
    socket?.emit("contest:join", { contestId, studentContestId });
  });

  socket.off("connect_error");
  socket.on("connect_error", (err) => {
    console.error("Contest socket error:", err.message);
    onError?.(err.message);
  });

  return socket;
}

export function disconnectContestSocket() {
  socket?.disconnect();
  socket = null;
}