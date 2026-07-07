import Btn1 from "../ui/Btn1";
import { startQuizAction } from "@/lib/actions/quiz.action";

export default function StartQuizButton({ subject_id, difficulty, subjectTagsMasteryLevel }) {
  // Bind the arguments to the Server Action 
  const startQuizWithArgs = startQuizAction.bind(null, { subject_id, difficulty, subjectTagsMasteryLevel });

  return (
    <form action={startQuizWithArgs}>
      <Btn1 title={"Start Quiz"} className={"w-fit"} type="submit" />
    </form>
  )
}