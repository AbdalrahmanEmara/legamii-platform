import TeacherFlowPlaceholder from "@/components/teacher/shared/TeacherFlowPlaceholder";

export default function TeacherClassesPage() {
  return (
    <TeacherFlowPlaceholder
      windowTitle="CLASSES.SYS"
      title="Teacher Classes"
      description="This route is reserved for the class-management flow. It already sits inside the new teacher shell, so the next step can focus entirely on class data and interactions."
      highlights={[
        "Teacher-only route mounted under /teacher/classes.",
        "Same chrome and layout system as the question-bank flow.",
        "Ready for class cards, roster actions, and quick links into assignments or contests.",
      ]}
      actions={[
        { href: "/teacher/question-bank", label: "Go to question bank" },
        { href: "/teacher/dashboard", label: "Back to dashboard", variant: "secondary" },
      ]}
    />
  );
}
