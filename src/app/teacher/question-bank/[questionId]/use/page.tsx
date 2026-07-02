import TeacherFlowPlaceholder from "@/components/teacher/shared/TeacherFlowPlaceholder";

export default async function UseTeacherQuestionPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;

  return (
    <TeacherFlowPlaceholder
      windowTitle="QUESTION.USE"
      title={`Use Question • ${questionId}`}
      description="This route is the handoff point from the bank into future teacher workflows like contests, assignments, or classroom activities. The structure is ready even before the downstream feature is built."
      highlights={[
        "Directly accessible from the Use CTA on each question card.",
        "Prepared for future contest-builder or class-assignment selection steps.",
        "Keeps question-bank navigation consistent throughout the teacher flow.",
      ]}
      actions={[
        { href: "/teacher/question-bank", label: "Back to question bank" },
        { href: "/teacher/contests", label: "Open contests", variant: "secondary" },
      ]}
    />
  );
}
