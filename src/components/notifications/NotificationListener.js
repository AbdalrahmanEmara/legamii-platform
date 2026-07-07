"use client";

import { useCallback, useEffect, useState } from "react";

import { useNotificationSocket } from "@/app/(app)/hooks/useNotificationSocket";
import { getSessionAction } from "@/lib/actions/auth.action";

export default function NotificationListener() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSessionAction();
      if (!res.success) {
        console.error("Failed to get session:", res.message);
        return;
      }
      setToken(res.token);
    };

    fetchSession();
  }, []);

  const handleNotification = useCallback((data) => {
    console.log("New notification:", data);
  }, []);

  const handleBroadcast = useCallback((data) => {
    console.log("Broadcast:", data);
  }, []);

  useNotificationSocket({
    token,
    onNotification: handleNotification,
    onBroadcast: handleBroadcast,
  });

  return null;
}
