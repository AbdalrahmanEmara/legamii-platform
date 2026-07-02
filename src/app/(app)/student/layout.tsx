import AppShell from "@/components/layout/AppShell";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell headerVariant="student">{children}</AppShell>;
}
