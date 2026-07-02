import AppShell from "@/components/layout/AppShell";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell headerVariant="teacher">{children}</AppShell>;
}
