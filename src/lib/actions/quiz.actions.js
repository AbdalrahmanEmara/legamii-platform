"use server";
import { redirect } from "next/navigation";
import { getQuestion, getQuestions, getQuizById, solveQuestion, startQuiz, finishQuiz, getQuizList } from "../services/quiz.service";

export async function startQuizAction({ subject_id, difficulty, subjectTagsMasteryLevel }) {
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

export async function getQuizListAction() {
  try {
    const res = await getQuizList();
    return res;
  } catch (err) {
    console.error("Error getting quiz list:", err);
    return null;
  }
}

export async function getQuestionsAction(quiz_id) {
  try {
    const res = await getQuestions(quiz_id);
    return res;
  } catch (err) {
    console.error("Error getting questions:", err);
    return null;
  }
}

export async function getQuestionAction(quiz_id, question_id) {
  try {
    const res = await getQuestion(quiz_id, question_id);
    return res;
  } catch (err) {
    console.error("Error getting questions:", err);
    return null;
  }
}

export async function solveQuestionAction(quiz_id, question_id, answer) {
  try {
    const res = await solveQuestion(quiz_id, question_id, answer);
    console.log(res);
    return res;
  } catch (err) {
    console.error("Error solving question:", err);
    return null;
  }
}

export async function finishQuizAction(quiz_id) {
  try {
    const res = await finishQuiz(quiz_id);
    console.log(res);
    return res;
  } catch (err) {
    console.error("Error finishing quiz:", err);
    return null;
  }
}

export async function getQuizByIdAction(quiz_id) {
  try {
    const res = await getQuizById(quiz_id);
    return res;
  } catch (err) {
    console.error("Error getting quiz by id:", err);
    return null;
  }
}