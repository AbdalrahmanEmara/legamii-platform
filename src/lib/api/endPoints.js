
// paths only
import { API_VERSION } from "../constants";

const v = `api/${API_VERSION}`;

export const ENDPOINTS = {
  school: {
    list: `${v}/school`,
    byId: (school_id) => `${v}/school/${school_id}`,
    update: (school_id) => `${v}/school/${school_id}`,
    delete: (school_id) => `${v}/school/${school_id}`,
  },
  teacher: {

  },
  student: {

  },
  cloudinary: {

  },
  student_contest: {

  },
  subject: {

  },
  grade: {

  },
  quiz: {
    list: `${v}/quiz`,  // GET
    start: `${v}/quiz`, // POST
    finish: (quiz_id) => `${v}/quiz/${quiz_id}`,
    questions: (quiz_id) => `${v}/quiz/${quiz_id}/question`,
    question: (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    solve: (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    byId: (quiz_id) => `${v}/quiz/${quiz_id}`,
  }
}