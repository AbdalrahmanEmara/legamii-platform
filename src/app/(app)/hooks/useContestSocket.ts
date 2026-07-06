import { useEffect, useRef } from "react";
import {
  connectContestSocket,
  disconnectContestSocket,
} from "@/lib/sockets/contest.socket";

// --- Types ---

interface ContestJoinedPayload {
  contestId: string;
  status: string;
  remainingSeconds?: number;
}

interface ContestStartedPayload {
  startedAt: string;
  endsAt: string;
}

interface ContestClarificationPayload {
  id: string;
  message: string;
  createdAt: string;
}

interface ContestLeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatar: string | null;
  score: number;
  speedBonus: number;
}

interface ContestLeaderboardPayload {
  updatedAt: string;
  leaderboard: ContestLeaderboardEntry[];
}

interface ContestFinishedPayload {
  reason: string;
}

interface ContestSocketCallbacks {
  onJoined?: (data: ContestJoinedPayload) => void;
  onStarted?: (data: ContestStartedPayload) => void;
  onClarification?: (data: ContestClarificationPayload) => void;
  onLeaderboard?: (data: ContestLeaderboardPayload) => void;
  onFinished?: (data: ContestFinishedPayload) => void;
  onError?: (message: string) => void;
}

interface UseContestSocketProps extends ContestSocketCallbacks {
  token: string;
  contestId: string;
  studentContestId: string;
}

// --- Hook ---

export function useContestSocket({
  token,
  contestId,
  studentContestId,
  onJoined,
  onStarted,
  onClarification,
  onLeaderboard,
  onFinished,
  onError,
}: UseContestSocketProps) {
  const callbacksRef = useRef<ContestSocketCallbacks>({});

  useEffect(() => {
    callbacksRef.current = {
      onJoined,
      onStarted,
      onClarification,
      onLeaderboard,
      onFinished,
      onError,
    };
  });

  useEffect(() => {
    if (!token || !contestId || !studentContestId) return;

    const socket = connectContestSocket(
      token,
      contestId,
      studentContestId,
      (message) => callbacksRef.current.onError?.(message)
    );

    const handleJoined = (data: ContestJoinedPayload) =>
      callbacksRef.current.onJoined?.(data);
    const handleStarted = (data: ContestStartedPayload) =>
      callbacksRef.current.onStarted?.(data);
    const handleClarification = (data: ContestClarificationPayload) =>
      callbacksRef.current.onClarification?.(data);
    const handleLeaderboard = (data: ContestLeaderboardPayload) =>
      callbacksRef.current.onLeaderboard?.(data);
    const handleFinished = (data: ContestFinishedPayload) =>
      callbacksRef.current.onFinished?.(data);

    socket.on("contest:joined", handleJoined);
    socket.on("contest:started", handleStarted);
    socket.on("contest:clarification", handleClarification);
    socket.on("contest:leaderboard", handleLeaderboard);
    socket.on("contest:finished", handleFinished);

    return () => {
      socket.off("contest:joined", handleJoined);
      socket.off("contest:started", handleStarted);
      socket.off("contest:clarification", handleClarification);
      socket.off("contest:leaderboard", handleLeaderboard);
      socket.off("contest:finished", handleFinished);
      disconnectContestSocket();
    };
  }, [token, contestId, studentContestId]);
}