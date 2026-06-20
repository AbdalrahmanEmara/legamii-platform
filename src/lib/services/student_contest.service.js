import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

// GET all contests
// export async function getContests(classId, status) {
//   return api.get(ENDPOINTS.student_contest.list(classId, status));
// }
export async function getContests(status) {
  return api.get(ENDPOINTS.student_contest.list(status));
}

// GET contest lobby/details
export async function getContestLobby(classId, contestId) {
  return api.get(ENDPOINTS.student_contest.lobby(classId, contestId));
}

// REGISTER student in contest
export async function registerContest(classId, contestId) {
  return api.patch(ENDPOINTS.student_contest.register(classId, contestId));
}

// START contest
export async function startContest(classId, contestId) {
  return api.patch(ENDPOINTS.student_contest.start(classId, contestId));
}

// GET all contest questions
export async function getContestQuestions(studentContestId) {
  return api.get(ENDPOINTS.student_contest.questions(studentContestId));
}

// GET single question
export async function getContestQuestion(studentContestId, questionId) {
  return api.get(ENDPOINTS.student_contest.question(studentContestId, questionId));
}

// SUBMIT answer
export async function submitContestAnswer(studentContestId, questionId, body) {
  return api.post(ENDPOINTS.student_contest.submit(studentContestId, questionId), body);
}

// TOGGLE question flag
export async function toggleQuestionFlag(studentContestId, questionId) {
  return api.patch(ENDPOINTS.student_contest.flag(studentContestId, questionId));
}

// FINISH contest
export async function finishContest(studentContestId) {
  return api.get(ENDPOINTS.student_contest.finish(studentContestId));
}

// GET contest summary
export async function getContestSummary(studentContestId) {
  return api.get(ENDPOINTS.student_contest.summary(studentContestId));
}

// GET detailed summary
export async function getContestDetailedSummary(studentContestId) {
  return api.get(ENDPOINTS.student_contest.detailedSummary(studentContestId));
}

// GET student rank
export async function getContestRank(studentContestId) {
  return api.get(ENDPOINTS.student_contest.rank(studentContestId));
}
