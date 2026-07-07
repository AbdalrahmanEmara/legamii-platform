'use server';

import "server-only";
import { getContestLobby, getContests, getContestDetailedSummary, getContestQuestions, getContestRank, getContestSummary, registerContest, startContest, submitContestAnswer, toggleQuestionFlag, getContestQuestion, finishContest } from "../services/student_contest.service";

// GET all contests
export async function getContestsAction(classId, status) {
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
  try {
    const res = await registerContest(classId, contestId);
    return res;
  } catch (err) {
    console.error("Error registering for contest:", err);
    throw err;
  }
}

// START contest
export async function startContestAction(classId, contestId) {
  try {
    const res = await startContest(classId, contestId);
    const studentContestId = res?.data?.studentContestId ?? res?.studentContestId;
    return { studentContestId };
  } catch (err) {
    console.error("Error starting contest:", err);
    throw err;
  }
}

// GET all contest questions
export async function getContestQuestionsAction(studentContestId) {
  try {
    const res = await getContestQuestions(studentContestId);
    return res;
  } catch (err) {
    console.error("Error getting contest questions:", err);
    throw err;
  }
}

// GET single question
export async function getContestQuestionAction(studentContestId, questionId) {
  try {
    const res = await getContestQuestion(studentContestId, questionId);
    return res;
  } catch (err) {
    console.error("Error getting contest question:", err);
    throw err;
  }
}


// SUBMIT answer
export async function submitContestAnswerAction(studentContestId, questionId, body) {
  try {
    const res = await submitContestAnswer(studentContestId, questionId, body);
    return res;
  } catch (err) {
    console.error("Error submitting contest answer:", err);
    throw err;
  }
}

// TOGGLE question flag
export async function toggleQuestionFlagAction(studentContestId, questionId) {
  try {
    const res = await toggleQuestionFlag(studentContestId, questionId);
    return res;
  } catch (err) {
    console.error("Error toggling question flag:", err);
    throw err;
  }
}

// FINISH contest
export async function finishContestAction(studentContestId) {
  try {
    const res = await finishContest(studentContestId);
    return res;
  } catch (err) {
    console.error("Error finishing contest:", err);
    throw err;
  }
}

// GET contest summary
export async function getContestSummaryAction(studentContestId) {
  try {
    const res = await getContestSummary(studentContestId);
    return res;
  } catch (err) {
    console.error("Error getting contest summary:", err);
    throw err;
  }
}

// GET detailed summary
export async function getContestDetailedSummaryAction(studentContestId) {
  try {
    const res = await getContestDetailedSummary(studentContestId);
    return res;
  } catch (err) {
    console.error("Error getting contest detailed summary:", err);
    throw err;
  }
}

// GET student rank
export async function getContestRankAction(studentContestId) {
  try {
    const res = await getContestRank(studentContestId);
    return res;
  } catch (err) {
    console.error("Error getting contest rank:", err);
    throw err;
  }
}
