import PracticePage from "./PracticePage";
import { getQuestions } from "@/lib/services/quiz.service";

async function Page({ params }) {
  const { quiz_id } = await params;
  let questions = null;

  try {
    questions = await getQuestions(quiz_id);
  } catch (error) {
    console.log(error);
  }

  if (!questions)
    return (
      <div>
        <span>Sorry, something went wrong.</span>
      </div>
    );

  return <PracticePage questions={questions?.data} quiz_id={quiz_id} />;
}

export default Page;
