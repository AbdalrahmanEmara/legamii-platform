'use server';

import * as qbankService from "../services/qbank.service";

export async function createQuestionAction(data) {
  try {
    const res = await qbankService.createQuestion(data);
    return res;
  } catch (err) {
    console.error("Error creating question:", err);
    throw err;
  }
}

export async function aiGenerateQuestionAction(data) {
  try {
    const res = await qbankService.aiGenerateQuestion(data);
    return res;
  } catch (err) {
    console.error("Error generating question with AI:", err);
    throw err;
  }
}

export async function getQuestionsAction(query) {
  try {
    const res = await qbankService.getQuestions(query);
    return res;
  } catch (err) {
    console.error("Error getting questions:", err);
    return null;
  }
}

export async function getMyQuestionsAction(query) {
  try {
    const res = await qbankService.getMyQuestions(query);
    return res;
  } catch (err) {
    console.error("Error getting my questions:", err);
    return null;
  }
}

export async function getQuestionForStudentAction(id) {
  try {
    const res = await qbankService.getQuestionForStudent(id);
    return res;
  } catch (err) {
    console.error(`Error getting question ${id} for student:`, err);
    return null;
  }
}

export async function getQuestionForAdminAction(id) {
  try {
    const res = await qbankService.getQuestionForAdmin(id);
    return res;
  } catch (err) {
    console.error(`Error getting question ${id} for admin:`, err);
    return null;
  }
}

export async function updateQuestionAction(id, data) {
  try {
    const res = await qbankService.updateQuestion(id, data);
    return res;
  } catch (err) {
    console.error(`Error updating question ${id}:`, err);
    throw err;
  }
}

export async function deleteQuestionAction(id) {
  try {
    const res = await qbankService.deleteQuestion(id);
    return res;
  } catch (err) {
    console.error(`Error deleting question ${id}:`, err);
    throw err;
  }
}

export async function addQuestionToContestAction(contestId, data) {
  try {
    const res = await qbankService.addQuestionToContest(contestId, data);
    return res;
  } catch (err) {
    console.error(`Error adding question to contest ${contestId}:`, err);
    throw err;
  }
}

export async function createAndAttachQuestionToContestAction(contestId, data) {
  try {
    const res = await qbankService.createAndAttachQuestionToContest(contestId, data);
    return res;
  } catch (err) {
    console.error(`Error creating and attaching question to contest ${contestId}:`, err);
    throw err;
  }
}

export async function getQuestionContestStatsAction(questionId, contestId) {
  try {
    const res = await qbankService.getQuestionContestStats(questionId, contestId);
    return res;
  } catch (err) {
    console.error(`Error getting stats for question ${questionId} in contest ${contestId}:`, err);
    return null;
  }
}

export async function getContestQuestionsAction(contestId) {
  try {
    const res = await qbankService.getContestQuestions(contestId);
    return res;
  } catch (err) {
    console.error(`Error getting questions for contest ${contestId}:`, err);
    return null;
  }
}

export async function getContestQuestionByOrderAction(contestId, order) {
  try {
    const res = await qbankService.getContestQuestionByOrder(contestId, order);
    return res;
  } catch (err) {
    console.error(`Error getting question ${order} for contest ${contestId}:`, err);
    return null;
  }
}
