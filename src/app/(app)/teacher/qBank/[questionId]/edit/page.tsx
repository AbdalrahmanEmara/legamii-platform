import { notFound } from "next/navigation";
import TeacherQuestionBankPage from "@/components/teacher/question-bank/TeacherQuestionBankPage";
import TeacherQuestionEditorModal from "@/components/teacher/question-bank/TeacherQuestionEditorModal";
import {
  getQuestionsAction,
  getMyQuestionsAction,
  getQuestionForAdminAction,
} from "@/lib/actions/qbank.action";
import { getAllSubjectsAction } from "@/lib/actions/subject.action";
import { getAllGradesAction } from "@/lib/actions/grade.action";

export default async function EditTeacherQuestionPage({
  params,
  searchParams,
}: {
  params: Promise<{ questionId: string }>;
  searchParams: any;
}) {
  const resolvedParams = await params;
  const { questionId } = resolvedParams;
  const resolvedSearchParams = await searchParams;
  const apiParams = new URLSearchParams(resolvedSearchParams);
  apiParams.delete("scope");

  const query = apiParams.toString();
  const scope = resolvedSearchParams?.scope || "Custom Made";

  const [publicRes, customRes, subjectsRes, gradesRes, questionRes] = await Promise.all([
    getQuestionsAction(query),
    getMyQuestionsAction(query),
    getAllSubjectsAction(),
    getAllGradesAction(),
    getQuestionForAdminAction(questionId),
  ]);

  const question = questionRes?.data || questionRes;
  if (!question) {
    notFound();
  }

  const publicTotal = publicRes?.total || 0;
  const customTotal = customRes?.total || 0;
  const activeQuestions = scope === "Custom Made" ? (customRes?.data || []) : (publicRes?.data || []);
  const activeTotal = scope === "Custom Made" ? customTotal : publicTotal;

  return (
    <TeacherQuestionBankPage
      initialQuestions={activeQuestions}
      total={activeTotal}
      customTotal={customTotal}
      publicTotal={publicTotal}
      subjects={subjectsRes || []}
      grades={gradesRes || []}
      searchParams={resolvedSearchParams}
      overlay={
        <TeacherQuestionEditorModal
          mode="edit"
          question={question}
          subjects={subjectsRes || []}
          grades={gradesRes || []}
        />
      }
    />
  );
}
