import TeacherFlowPlaceholder from "@/components/teacher/shared/TeacherFlowPlaceholder";

export default function TeacherDashboardPage() {
  return (
    <TeacherFlowPlaceholder
      windowTitle="TEACHER.DASH"
      title="Teacher Dashboard"
      description="The teacher shell is now separated from the student app structure, with its own header, footer, and teacher-first route map. This dashboard page is ready to receive widgets next."
      highlights={[
        "Dedicated teacher navigation across dashboard, classes, contests, analytics, and question bank.",
        "Shared window chrome to keep new teacher screens visually aligned with the Figma direction.",
        "Question-bank flow already connected with add, edit, and use routes.",
      ]}
      actions={[
        { href: "/teacher/question-bank", label: "Open question bank" },
        { href: "/teacher/classes", label: "Review classes", variant: "secondary" },
      ]}
    />
  );
}
