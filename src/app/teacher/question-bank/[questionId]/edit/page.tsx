import { notFound } from "next/navigation";
import TeacherQuestionBankWorkspace from "@/components/teacher/question-bank/TeacherQuestionBankWorkspace";
import TeacherQuestionEditorModal from "@/components/teacher/question-bank/TeacherQuestionEditorModal";
import { getQuestionById } from "@/components/teacher/question-bank/questionBankData";

export default async function EditTeacherQuestionPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  const question = getQuestionById(questionId);

  if (!question) {
    notFound();
  }

  return (
    <TeacherQuestionBankWorkspace
      selectedQuestionId={question.id}
      initialScope={question.scope}
      overlay={<TeacherQuestionEditorModal mode="edit" question={question} />}
    />
  );
}
