'use server';

import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";
import { getContests } from "../services/student_contest.service";

// GET all contests
export async function getContestsAction(classId = "ac024334-d92b-4b84-904a-dad5ad389970", status) {
  try {
    const res = await getContests(classId, status);
    return res;
  } catch (err) {
    console.error("Error getting contests:", err);
    return null;
  }
}

// GET contest lobby/details
export async function getContestLobbyAction(classId, contestId) {
  try {
    const res = await getContestLobby(classId, contestId);
    return res;
  } catch (err) {
    console.error("Error getting contest lobby:", err);
    throw err;
  }
}

// REGISTER student in contest
export async function registerContestAction(classId, contestId) {
  return api.patch(ENDPOINTS.student_contest.register(classId, contestId));
}

// START contest
export async function startContestAction(classId, contestId) {
  return api.patch(ENDPOINTS.student_contest.start(classId, contestId));
}

// GET all contest questions
export async function getContestQuestionsAction(studentContestId) {
  return api.get(ENDPOINTS.student_contest.questions(studentContestId));
}

// GET single question
export async function getContestQuestionAction(studentContestId, questionId) {
  return api.get(ENDPOINTS.student_contest.question(studentContestId, questionId));
}

// SUBMIT answer
export async function submitContestAnswerAction(studentContestId, questionId, body) {
  return api.post(ENDPOINTS.student_contest.submit(studentContestId, questionId), body);
}

// TOGGLE question flag
export async function toggleQuestionFlagAction(studentContestId, questionId) {
  return api.patch(ENDPOINTS.student_contest.flag(studentContestId, questionId));
}

// FINISH contest
export async function finishContestAction(studentContestId) {
  return api.get(ENDPOINTS.student_contest.finish(studentContestId));
}

// GET contest summary
export async function getContestSummaryAction(studentContestId) {
  return api.get(ENDPOINTS.student_contest.summary(studentContestId));
}

// GET detailed summary
export async function getContestDetailedSummaryAction(studentContestId) {
  return api.get(ENDPOINTS.student_contest.detailedSummary(studentContestId));
}

// GET student rank
export async function getContestRankAction(studentContestId) {
  return api.get(ENDPOINTS.student_contest.rank(studentContestId));
}
