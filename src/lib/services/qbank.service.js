import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function createQuestion(data) {
  return await api.post(ENDPOINTS.questions.create, data);
}

export async function aiGenerateQuestion(data) {
  console.log("data in service : " , data)
  return await api.post(ENDPOINTS.questions.aiGenerate, data);
}

export async function getQuestions(query) {
  return await api.get(ENDPOINTS.questions.list(query));
}

export async function getMyQuestions(query) {
  return await api.get(ENDPOINTS.questions.myList(query));
}

export async function getQuestionForStudent(id) {
  return await api.get(ENDPOINTS.questions.byIdStudent(id));
}

export async function getQuestionForAdmin(id) {
  return await api.get(ENDPOINTS.questions.byIdAdmin(id));
}

export async function updateQuestion(id, data) {
  return await api.patch(ENDPOINTS.questions.update(id), data);
}

export async function deleteQuestion(id) {
  return await api.delete(ENDPOINTS.questions.delete(id));
}

export async function addQuestionToContest(contestId, data) {
  return await api.post(ENDPOINTS.questions.addToContest(contestId), data);
}

export async function createAndAttachQuestionToContest(contestId, data) {
  return await api.post(ENDPOINTS.questions.createAndAttachToContest(contestId), data);
}

export async function getQuestionContestStats(questionId, contestId) {
  return await api.post(ENDPOINTS.questions.stats(questionId, contestId));
}

export async function getContestQuestions(contestId) {
  return await api.get(ENDPOINTS.questions.listByContest(contestId));
}

export async function getContestQuestionByOrder(contestId, order) {
  return await api.get(ENDPOINTS.questions.getByContestOrder(contestId, order));
}
