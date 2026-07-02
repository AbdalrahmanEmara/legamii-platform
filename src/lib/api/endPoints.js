// paths only
import { API_VERSION } from "../constants";

const v = `api/${API_VERSION}`;

export const ENDPOINTS = {
  auth: {
    signup: `${v}/auth/signup`,
    verifyEmail: `${v}/auth/verify-email`,
    login: `${v}/auth/login`,
    resetPassword: `${v}/auth/reset-password`,
    forgetPassword: `${v}/auth/forgot-password`,
  },
  school: {
    list: `${v}/school`,
    byId: (school_id) => `${v}/school/${school_id}`,
    update: (school_id) => `${v}/school/${school_id}`,
    delete: (school_id) => `${v}/school/${school_id}`,
  },
  teacher: {
    profile: () => `${v}/teacher/me`,
    updateProfile: () => `${v}/teacher/me`,
    classes: () => `${v}/teacher/me/classes`,
    statistics: () => `${v}/teacher/me/statistics`,
    list: `${v}/teacher`,
    byId: (id) => `${v}/teacher/${id}`,
    update: (id) => `${v}/teacher/${id}`,
    delete: (id) => `${v}/teacher/${id}`,
  },
  student: {
    updateAcademic: `${v}/student/academic`,
  },
  studentProfile: {
    profile: () => `${v}/student/me`,
    updateProfile: () => `${v}/student/me`,
    statistics: () => `${v}/student/me/statistics`,
    badges: () => `${v}/student/me/badges`,
    classes: () => `${v}/student/me/classes`,
    contests: () => `${v}/student/me/contests`,
    activity: () => `${v}/student/me/activity`,
    subjectTags: () => `${v}/student/me/subject-tags`,
  },
  // cloudinary: {},

  notifications: {
    list: (page = 1, limit = 20) => `${v}/notifications?page=${page}&limit=${limit}`,
    unreadCount: `${v}/notifications/unread-count`,
    read: (notificationId) => `${v}/notifications/${notificationId}/read`,
    readAll: `${v}/notifications/read-all`,
    broadcasts: `${v}/notifications/broadcasts`,
    readBroadcast: (broadcastId) => `${v}/notifications/broadcasts/${broadcastId}/read`,
    broadcast: `${v}/notifications/broadcast`, // Admin
    sendContestClarification: `${v}/notifications/contest-clarification`, // Teacher
    contestClarification: (contestId) => `${v}/notifications/contest-clarification/${contestId}`,
  },

  student_contest: {
    list: (classId, status) =>
      `${v}/student-contest?classId=${classId || ""}&status=${status || ""}`,
    lobby: (classId, contestId) => `${v}/student-contest/class/${classId}/contest/${contestId}`,
    register: (classId, contestId) =>
      `${v}/student-contest/class/${classId}/contest/${contestId}/register`,
    start: (classId, contestId) =>
      `${v}/student-contest/class/${classId}/contest/${contestId}/start`,
    questions: (studentContestId) => `${v}/student-contest/${studentContestId}/questions`,
    question: (studentContestId, questionId) =>
      `${v}/student-contest/${studentContestId}/question/${questionId}`,
    submit: (studentContestId, questionId) =>
      `${v}/student-contest/${studentContestId}/question/${questionId}`,
    flag: (studentContestId, questionId) =>
      `${v}/student-contest/${studentContestId}/question/${questionId}`,
    finish: (studentContestId) => `${v}/student-contest/${studentContestId}/finish`,
    summary: (studentContestId) => `${v}/student-contest/${studentContestId}/summary`,
    detailedSummary: (studentContestId) =>
      `${v}/student-contest/${studentContestId}/detailed-summary`,
    rank: (studentContestId) => `${v}/student-contest/${studentContestId}/rank`,
  },
  subject: {
    list: `${v}/subjects`,
    listStudent: `${v}/subjects/student`,
  },
  grade: {
    list: `${v}/grades`,
    subjects: (id) => `${v}/grades/${id}/subjects`,
  },
  questions: {
    create: `${v}/questions`,
    aiGenerate: `${v}/questions/ai-generate`,
    list: (query = "") => `${v}/questions${query ? `?${query}` : ""}`,
    myList: (query = "") => `${v}/questions/me${query ? `?${query}` : ""}`,
    byIdStudent: (id) => `${v}/questions/${id}/student`,
    byIdAdmin: (id) => `${v}/questions/${id}/admin`,
    update: (id) => `${v}/questions/${id}`,
    delete: (id) => `${v}/questions/${id}`,
    addToContest: (contestId) => `${v}/questions/contest/${contestId}`,
    createAndAttachToContest: (contestId) => `${v}/questions/contest/${contestId}/add-and-attach`,
    stats: (questionId, contestId) => `${v}/questions/${questionId}/contest/${contestId}/stats`,
    listByContest: (contestId) => `${v}/questions/contest/${contestId}`,
    getByContestOrder: (contestId, order) => `${v}/questions/contest/${contestId}/${order}`,
    list: `${v}/grades`,
    create: `${v}/grades`,
    gradeSubject: ({ gradeId }) => `${v}/grades/${gradeId}/subjects`
  },
  quiz: {
    list: `${v}/quiz`, // GET
    start: `${v}/quiz`, // POST
    finish: (quiz_id) => `${v}/quiz/${quiz_id}`,
    questions: (quiz_id) => `${v}/quiz/${quiz_id}/question`,
    question: (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    solve: (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    byId: (quiz_id) => `${v}/quiz/${quiz_id}`,
  },
  leaderboard: {
    global: `${v}/leaderboard/global`,
  },

  streak: {
    get: `${v}/streak/me`,
  },
  missions: {
    daily: `${v}/missions/daily`,
    claim: (id) => `${v}/missions/${id}/claim`,
  },
};
