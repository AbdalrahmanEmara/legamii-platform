import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getRelativeTime(dateStr) {
  const diff = new Date(dateStr) - new Date();
  if (diff <= 0) return "Now";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days === 0 && hours === 0) return "Less than an hour";
  if (days === 0) return `In ${hours}h`;
  if (days === 1) return "Tomorrow";
  return `${days} days`;
}