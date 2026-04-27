import Btn1 from "../ui/Btn1";
import { startQuiz } from "@/lib/services/quiz.service";
import { redirect } from "next/navigation";

export default function StartQuizButton({ subject_id, difficulty, subjectTagsMasteryLevel }) {
  const handleStart = async () => {
    "use server";
    
    let res;
    try {
      // 1. Call the backend API
      res = await startQuiz({ subject_id, difficulty, subjectTagsMasteryLevel });
      console.log("Quiz created/started:", res);
      
    } catch (err) {
      console.error("Error starting quiz:", err);
      return; // Do not redirect on error, or handle error state
    }

    // 2. Redirect securely after the mutation is done
    redirect(`/practice/${res.quizId}`);
  }

  return (
    <form action={handleStart}>
      <Btn1 title={"Start Quiz"} className={"w-fit"} type="submit" />
    </form>
  )
}