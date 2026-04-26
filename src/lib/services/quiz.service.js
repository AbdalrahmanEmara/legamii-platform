import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getQuizList() {
  return api.get(ENDPOINTS.quiz.list);
}

export async function startQuiz(body) {
  return api.post(ENDPOINTS.quiz.start, body);
}

export async function finishQuiz(quiz_id, body) {
  return api.patch(ENDPOINTS.quiz.finish(quiz_id), body);
}

export async function getQuestions(quiz_id) {
  return api.get(ENDPOINTS.quiz.questions(quiz_id));
}

export async function getQuestion(quiz_id, question_id) {
  return api.get(ENDPOINTS.quiz.question(quiz_id, question_id));
}

export async function solveQuestion(quiz_id, question_id, body) {
  return api.post(ENDPOINTS.quiz.solve(quiz_id, question_id), body);
}

export async function getQuizById(quiz_id) {
  return api.get(ENDPOINTS.quiz.byId(quiz_id));
}