/*
  Resposibilities : 
 Connect to the socket
 Listen for events
 Update the component when an event arrives
 Clean up when the component unmounts*/

// import { useEffect } from "react";
// import {
//     connectLeaderboardSocket,
//     getLeaderboardSocket,
// } from "@/lib/sockets/leaderboard.socket";
// import { LeaderboardStudent } from "@/app/(app)/features/leaderboard/types";

// interface UseLeaderboardSocketProps {
//   token?: string;
//   onLeaderboardUpdate: (leaderboard: LeaderboardStudent[]) => void;
// }

// export function useLeaderboardSocket({
//   token,
//   onLeaderboardUpdate,
// }: UseLeaderboardSocketProps) {
//   useEffect(() => {
//     if (!token) return;

//     const socket = connectLeaderboardSocket(token);

//     socket.on("leaderboard:global", onLeaderboardUpdate);

//     return () => {
//       socket.off("leaderboard:global", onLeaderboardUpdate);
//     };
//   }, [token, onLeaderboardUpdate]);
// }

import { useEffect } from "react";

import {
  connectLeaderboardSocket,
  subscribeToLeaderboard,
  unsubscribeFromLeaderboard,
} from "@/lib/sockets/leaderboard.socket";

import { LeaderboardStudent } from "@/app/(app)/features/leaderboard/types";

interface UseLeaderboardSocketProps {
  token?: string;

  // Function that will be called whenever the backend
  // broadcasts a new leaderboard.
  onLeaderboardUpdate: (students: LeaderboardStudent[]) => void;
}

export function useLeaderboardSocket({
  token,
  onLeaderboardUpdate,
}: UseLeaderboardSocketProps) {
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