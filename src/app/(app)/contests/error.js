"use client";

import SystemError from "@/components/ui/SystemError";

export default function Error({ error, reset }) {
  return <SystemError message={error?.message || "Something went wrong"} onRetry={reset} />;
}
