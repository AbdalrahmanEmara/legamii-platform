import TeacherFooter from "@/components/teacher/layout/TeacherFooter";
import TeacherHeader from "@/components/teacher/layout/TeacherHeader";
import BackgroundMain from "@/components/ui/BackgroundMain";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-xl4 flex min-h-screen w-full flex-col">
      <TeacherHeader />
      <main className="flex-1">
        <BackgroundMain className="pb-xl4">{children}</BackgroundMain>
      </main>
      <TeacherFooter />
    </div>
  );
}
