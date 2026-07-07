import TeacherQuestionBankPage from "@/components/teacher/question-bank/TeacherQuestionBankPage";
import { getQuestionsAction, getMyQuestionsAction } from "@/lib/actions/qbank.action";
import { getAllSubjectsAction } from "@/lib/actions/subject.action";
import { getAllGradesAction } from "@/lib/actions/grade.action";

export default async function QuestionBankPage({ searchParams }) {
  const params = await searchParams;

  const apiParams = new URLSearchParams(params);
  apiParams.delete("scope");

  const query = apiParams.toString();
  const scope = params?.scope || "Custom Made";

  const [publicRes, customRes, subjectsRes, gradesRes] = await Promise.all([
    getQuestionsAction(query),
    getMyQuestionsAction(query),
    getAllSubjectsAction(),
    getAllGradesAction(),
  ]);

  // const publicTotal = publicRes?.total || 0;
  // const customTotal = customRes?.total || 0;
  // const activeQuestions = scope === "Custom Made" ? (customRes?.data || []) : (publicRes?.data || []);
  // const activeTotal = scope === "Custom Made" ? customTotal : publicTotal;

  const publicTotal = publicRes?.data?.total || 0;
  const customTotal = customRes?.data?.total || 0;

  const activeQuestions =
    scope === "Custom Made"
      ? (customRes?.data?.questions || [])
      : (publicRes?.data?.questions || []);

  const activeTotal =
    scope === "Custom Made"
      ? customTotal
      : publicTotal;

  // console.log("Search Params:", params);
  // console.log("API Query:", query);
  // console.log("Public Response:", publicRes);
  // console.log("My Response:", customRes);
  // console.log("Subjects:", subjectsRes);
  // console.log("Grades:", gradesRes);

  console.log(publicRes.data.questions[0]);
  return (
    <TeacherQuestionBankPage
      initialQuestions={activeQuestions}
      total={activeTotal}
      currentPage={scope === "Custom Made"
        ? customRes?.pageNumber
        : publicRes?.pageNumber}
      pageLimit={scope === "Custom Made"
        ? customRes?.limit
        : publicRes?.limit}
      customTotal={customTotal}
      publicTotal={publicTotal}
      subjects={subjectsRes || []}
      grades={gradesRes || []}
      searchParams={params}
    />
  );
}
