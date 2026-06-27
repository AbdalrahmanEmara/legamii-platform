import NotificationsPage from "./NotificationsPage";
import {
  getNotificationsAction,
  getUnreadCountAction,
} from "@/lib/actions/notifications.action";

export default async function Page() {
  const [notificationsRes, unreadRes] = await Promise.all([
    getNotificationsAction(),
    getUnreadCountAction(),
  ]);

  console.log(notificationsRes);
  console.log("unreadRes =", unreadRes);
  console.log("unreadRes.data =", unreadRes.data);

  return (
    <NotificationsPage
      initialNotifications={notificationsRes?.data?.data ?? []}
      initialUnreadCount={unreadRes?.count ?? 0}
      page={notificationsRes?.data?.page ?? 1}
      total={notificationsRes?.data?.total ?? 0}
      limit={notificationsRes?.data?.limit ?? 20}
    />
  );

}