import TeacherQuestionBankPage from "@/components/teacher/question-bank/TeacherQuestionBankPage";
import { getQuestionsAction, getMyQuestionsAction } from "@/lib/actions/qbank.actions";
import { getAllSubjectsAction } from "@/lib/actions/subject.actions";
import { getAllGradesAction } from "@/lib/actions/grade.actions";

export default async function QuestionBankPage({ searchParams }) {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();
  const scope = params?.scope || "Custom Made";

  const [publicRes, customRes, subjectsRes, gradesRes] = await Promise.all([
    getQuestionsAction(query),
    getMyQuestionsAction(query),
    getAllSubjectsAction(),
    getAllGradesAction(),
  ]);

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
      searchParams={params}
    />
  );
}
