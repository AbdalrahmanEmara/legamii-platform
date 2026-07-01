
"use client";
import ReusableWindow from "@/components/ui/ReusableWindow";
import CustomScroll from "@/components/ui/CustomScroll";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { markNotificationAsReadAction } from "@/lib/actions/notifications.action";
import { markAllNotificationsAsReadAction } from "@/lib/actions/notifications.action";

// Mock data based on Figma design
// const MOCK_NOTIFICATIONS = [
//   {
//     id: 1,
//     title: "Science Fair Prep Summary Is Ready",
//     message: "You can now know your final rank and question answers.",
//     time: "NOW",
//     isUnread: true,
//     type: "megaphone",
//   },
//   {
//     id: 2,
//     title: "Contest Reminder",
//     message: "Math Championship starts in 2 days! Don't forget to register.",
//     time: "2 HOURS AGO",
//     isUnread: false,
//     type: "alarm",
//   },
//   {
//     id: 3,
//     title: "New Badge Unlocked!",
//     message: 'You earned the "Week Warrior" badge for maintaining a 7-day streak!',
//     time: "2 HOURS AGO",
//     isUnread: false,
//     type: "medal",
//   },
//   {
//     id: 4,
//     title: "Streak Milestone!",
//     message: "Amazing! You've maintained your streak for 14 consecutive days!",
//     time: "7 HOURS AGO",
//     isUnread: false,
//     type: "fire",
//   },
//   {
//     id: 5,
//     title: "Contest Reminder",
//     message: "Math Championship starts in 2 days! Don't forget to register.",
//     time: "5 HOURS AGO",
//     isUnread: false,
//     type: "megaphone",
//   }
// ];

import { useState } from "react";
export default function NotificationsPage({ initialNotifications, initialUnreadCount, page, totalPages }) {
    const [notifications, setNotifications] =
        useState(initialNotifications);

    const [unreadCount, setUnreadCount] =
        useState(initialUnreadCount);

    const handleRead = async (id) => {
        await markNotificationAsReadAction(id);

        setNotifications(prev =>
            prev.map(n =>
                n.id === id
                    ? { ...n, is_read: true }
                    : n
            )
        );

        setUnreadCount(c => Math.max(c - 1, 0));
    };

    //Mark all read if used 
    const handleReadAll = async () => {
        await markAllNotificationsAsReadAction();

        setNotifications(prev =>
            prev.map(n => ({
                ...n,
                is_read: true,
            }))
        );

        setUnreadCount(0);
    };
    console.log("unreadCount:", unreadCount);
    return (
        <div className="mx-auto flex h-[calc(100vh-100px)] flex-col px-base py-md md:px-md xl:px-xl3">
            <ReusableWindow title="NOTIFICATIONS.SYS" className="flex mx-auto w-[1134px] min-h-0 flex-1 flex-col">
                <CustomScroll>
                    <div className="flex flex-col">
                        {/* Header section inside the scrollable area */}
                        <div className="flex items-align justify-between self-stretch px-base py-sm mb-sm">
                            <h2 className="heading-h5-primary text-base text-text uppercase">Notifications</h2>
                            <div className="flex items-center justify-center border border-secondary-500 bg-secondary-50 px-3 py-1">
                                <span className="font-primary text-xs text-secondary-500 uppercase tracking-wide">
                                    {unreadCount} Unread
                                </span>
                            </div>
                        </div>

                        {/* Notifications list */}
                        <div className="px-sm">
                            {notifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification}
                                    onClick={() => handleRead(notification.id)} />
                            ))}
                        </div>
                    </div>
                      {/* Button for mark all in future */}
                    {/* <Button
                        text="Mark all read"
                        onClick={handleReadAll}
                    /> */}
                </CustomScroll>
            </ReusableWindow>
        </div>
    );
}
