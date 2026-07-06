import AppShell from "@/components/layout/AppShell";
import NotificationListener from "@/components/notifications/NotificationListener";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell headerVariant="student">
      <NotificationListener />
      {children}
    </AppShell>
  );
}
