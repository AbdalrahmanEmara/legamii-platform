import TeacherFlowPlaceholder from "@/components/teacher/shared/TeacherFlowPlaceholder";

export default function TeacherAnalyticsPage() {
  return (
    <TeacherFlowPlaceholder
      windowTitle="ANALYTICS.SYS"
      title="Teacher Analytics"
      description="This screen is ready for future teacher insights such as question performance, class mastery, and contest outcomes. For now, it establishes the route inside the new teacher flow."
      highlights={[
        "Teacher analytics route included in the new header and footer navigation.",
        "Reusable layout makes it easy to drop in charts and summaries later.",
        "Question-bank metrics can connect here without restructuring routes again.",
      ]}
      actions={[
        { href: "/teacher/question-bank", label: "Inspect bank activity" },
        { href: "/teacher/dashboard", label: "Back to dashboard", variant: "secondary" },
      ]}
    />
  );
}
