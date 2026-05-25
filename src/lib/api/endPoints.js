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
  teacher: {},
  student: {},
  cloudinary: {},
  student_contest: {
    list: (classId, status) => `${v}/student-contest?classId=${classId}&status=${status}`,
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
  subject: {},
  grade: {},
  quiz: {
    list: `${v}/quiz`, // GET
    start: `${v}/quiz`, // POST
    finish: (quiz_id) => `${v}/quiz/${quiz_id}`,
    questions: (quiz_id) => `${v}/quiz/${quiz_id}/question`,
    question: (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    solve: (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    byId: (quiz_id) => `${v}/quiz/${quiz_id}`,
  },
};
