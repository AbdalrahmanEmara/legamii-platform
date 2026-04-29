import PracticePage from "./PracticePage";
import { getQuestions } from "@/lib/services/quiz.service";

async function Page({ params }) {
  const { quiz_id } = await params;

  try {
    const questions = await getQuestions(quiz_id);
    return (
      <PracticePage questions={questions.data} quiz_id={quiz_id} />
    )
  }
  catch (error) {
    console.log(error);
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    )
  }
}

export default Page;