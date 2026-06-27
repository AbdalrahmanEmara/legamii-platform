import TeacherQuestionBankWorkspace from "@/components/teacher/question-bank/TeacherQuestionBankWorkspace";
import TeacherQuestionEditorModal from "@/components/teacher/question-bank/TeacherQuestionEditorModal";

export default function AddTeacherQuestionPage() {
  return <TeacherQuestionBankWorkspace overlay={<TeacherQuestionEditorModal mode="add" />} />;
}
