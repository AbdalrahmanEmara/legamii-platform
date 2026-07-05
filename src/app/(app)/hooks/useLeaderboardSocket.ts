import { useEffect } from "react";

import {
  connectLeaderboardSocket,
  subscribeToLeaderboard,
  unsubscribeFromLeaderboard,
} from "@/lib/sockets/leaderboard.socket";

import { LeaderboardStudent } from "@/app/(app)/student/leaderboard/types";

interface UseLeaderboardSocketProps {
  token?: string;

  // Function that will be called whenever the backend
  // broadcasts a new leaderboard.
  onLeaderboardUpdate: (students: LeaderboardStudent[]) => void;
}

export function useLeaderboardSocket({ token, onLeaderboardUpdate }: UseLeaderboardSocketProps) {
  useEffect(() => {
    // Don't try to connect before the user is authenticated.
    // The backend requires a JWT during the socket handshake.
    if (!token) return;

    // Create (or reuse) the leaderboard socket connection.
    connectLeaderboardSocket(token);
    console.log("Connected");
    // Start listening for leaderboard updates.
    subscribeToLeaderboard(onLeaderboardUpdate);

    return () => {
      // Remove ONLY this listener.
      // We don't disconnect here because another component
      // may still be using the same socket.
      unsubscribeFromLeaderboard(onLeaderboardUpdate);
    };
  }, [token, onLeaderboardUpdate]);
}
