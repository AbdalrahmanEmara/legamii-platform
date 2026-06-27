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

export function getTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "NOW";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return `${minutes} MIN${minutes > 1 ? "S" : ""} AGO`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours} HOUR${hours > 1 ? "S" : ""} AGO`;

  const days = Math.floor(hours / 24);
  if (days < 7)
    return `${days} DAY${days > 1 ? "S" : ""} AGO`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5)
    return `${weeks} WEEK${weeks > 1 ? "S" : ""} AGO`;

  const months = Math.floor(days / 30);
  if (months < 12)
    return `${months} MONTH${months > 1 ? "S" : ""} AGO`;

  const years = Math.floor(days / 365);
  return `${years} YEAR${years > 1 ? "S" : ""} AGO`;
}