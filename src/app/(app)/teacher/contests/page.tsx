import TeacherFlowPlaceholder from "@/components/teacher/shared/TeacherFlowPlaceholder";

export default function TeacherContestsPage() {
  return (
    <TeacherFlowPlaceholder
      windowTitle="CONTESTS.SYS"
      title="Teacher Contests"
      description="Contest management will live here once the question-bank flow is in place. The page is already wired into the teacher route structure and keeps the same visual shell."
      highlights={[
        "Consistent teacher window layout for future contest workflows.",
        "Top navigation already highlights the active teacher route.",
        "Easy to connect question-bank selections into a contest builder next.",
      ]}
      actions={[
        { href: "/teacher/question-bank", label: "Use bank questions" },
        { href: "/teacher/dashboard", label: "Back to dashboard", variant: "secondary" },
      ]}
    />
  );
}
