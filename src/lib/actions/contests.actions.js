"use server";

import {
  getContestLobby,
  getContests,
  registerContest,
  startContest,
  getContestQuestions,
  getContestQuestion,
  submitContestAnswer,
  toggleQuestionFlag,
  finishContest,
  getContestSummary,
  getContestDetailedSummary,
  getContestRank,
} from "../services/student_contest.service";

// ================= GET CONTESTS =================
export async function getContestsAction(status) {
  try {
    const res = await getContests(status);
    console.log("Contests:", res);
    return res;
  } catch (err) {
    console.error("Error getting contests:", err);
    return null;
  }
}

// ================= GET LOBBY =================
export async function getContestLobbyAction(classId, contestId) {
  try {
    const res = await getContestLobby(classId, contestId);
    console.log("Contest Lobby:", res);
    return res;
  } catch (err) {
    console.error("Error getting contest lobby:", err);
    return null;
  }
}

// ================= REGISTER =================
export async function registerContestAction(classId, contestId) {
  try {
    const res = await registerContest(classId, contestId);
    console.log("Register Contest:", res);
    return res;
  } catch (err) {
    console.error("Error registering for contest:", err);
    return null;
  }
}

// ================= START =================
// Returns { status, message, studentContestId } — save studentContestId!
export async function startContestAction(classId, contestId) {
  try {
    const res = await startContest(classId, contestId);
    console.log("Start Contest:", res);
    return res;
  } catch (err) {
    console.error("Error starting contest:", err);
    return null;
  }
}

// ================= GET QUESTIONS LIST =================
export async function getContestQuestionsAction(studentContestId) {
  try {
    const res = await getContestQuestions(studentContestId);
    console.log("Contest Questions:", res);
    return res;
  } catch (err) {
    console.error("Error getting contest questions:", err);
    return null;
  }
}

// ================= GET SINGLE QUESTION =================
export async function getContestQuestionAction(studentContestId, questionId) {
  try {
    const res = await getContestQuestion(studentContestId, questionId);
    console.log("Contest Question:", res);
    return res;
  } catch (err) {
    console.error("Error getting contest question:", err);
    return null;
  }
}

// ================= SUBMIT ANSWER =================
// body: { answer: "a" | "b" | "c" | "d" }
export async function submitContestAnswerAction(studentContestId, questionId, body) {
  try {
    const res = await submitContestAnswer(studentContestId, questionId, body);
    console.log("Submit Answer:", res);
    return res;
  } catch (err) {
    console.error("Error submitting answer:", err);
    return null;
  }
}

// ================= TOGGLE FLAG =================
export async function toggleQuestionFlagAction(studentContestId, questionId) {
  try {
    const res = await toggleQuestionFlag(studentContestId, questionId);
    console.log("Toggle Flag:", res);
    return res;
  } catch (err) {
    console.error("Error toggling question flag:", err);
    return null;
  }
}

// ================= FINISH =================
export async function finishContestAction(studentContestId) {
  try {
    const res = await finishContest(studentContestId);
    console.log("Finish Contest:", res);
    return res;
  } catch (err) {
    console.error("Error finishing contest:", err);
    return null;
  }
}

// ================= SUMMARY =================
export async function getContestSummaryAction(studentContestId) {
  try {
    const res = await getContestSummary(studentContestId);
    console.log("Contest Summary:", res);
    return res;
  } catch (err) {
    console.error("Error getting contest summary:", err);
    return null;
  }
}

// ================= DETAILED SUMMARY =================
export async function getContestDetailedSummaryAction(studentContestId) {
  try {
    const res = await getContestDetailedSummary(studentContestId);
    console.log("Detailed Summary:", res);
    return res;
  } catch (err) {
    console.error("Error getting detailed summary:", err);
    return null;
  }
}

// ================= RANK =================
export async function getContestRankAction(studentContestId) {
  try {
    const res = await getContestRank(studentContestId);
    console.log("Contest Rank:", res);
    return res;
  } catch (err) {
    console.error("Error getting contest rank:", err);
    return null;
  }
}