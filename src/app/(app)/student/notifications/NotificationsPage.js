"use client";
import ReusableWindow from "@/components/ui/ReusableWindow";
import CustomScroll from "@/components/ui/CustomScroll";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { markNotificationAsReadAction } from "@/lib/actions/notifications.action";
import { markAllNotificationsAsReadAction } from "@/lib/actions/notifications.action";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import Btn1 from "@/components/ui/Btn1";
export default function NotificationsPage({ initialNotifications, initialUnreadCount }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

  const handleRead = async (id) => {
    await markNotificationAsReadAction(id);

    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));

    setUnreadCount((c) => Math.max(c - 1, 0));
  };

  //Mark all read if used
  const handleReadAll = async () => {
    await markAllNotificationsAsReadAction();

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        is_read: true,
      }))
    );

    setUnreadCount(0);
  };
  console.log("unreadCount:", unreadCount);
  return (
    <div className="mx-auto flex flex-col rounded-lg">
      <ReusableWindow
        title="NOTIFICATIONS.SYS"
        className="mx-auto flex max-h-[calc(90vh-100px)] w-full flex-col md:w-[704px] xl:w-[1150px]"
      >
        <CustomScroll>
          <div className="flex flex-col">
            {/* Header section inside the scrollable area */}
            <div className="items-align p-base mb-sm flex justify-between self-stretch">
              <h2 className="heading-h5-primary text-text text-base leading-6 font-bold uppercase md:text-xl 2xl:text-2xl">
                Notifications
              </h2>
              <StatusBadge status={unreadCount}>
                <span className="font-primary hidden text-sm leading-5 font-normal md:inline">
                  Unread
                </span>
              </StatusBadge>
            </div>

            {/* Notifications list */}
            <div className="px-sm">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleRead(notification.id)}
                  disabled={notification.is_read}
                />
              ))}
            </div>
          </div>
          {unreadCount > 0 && (
            <div className="px-sm flex justify-center pt-2 pb-4 mb-2">
              <Btn1 onClick={handleReadAll} title={"Mark all read"} />
            </div>
          )}
        </CustomScroll>
      </ReusableWindow>
    </div>
  );
}
