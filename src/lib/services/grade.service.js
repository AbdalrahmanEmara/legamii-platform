import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getAllGrades() {
  return await api.get(ENDPOINTS.grade.list);
}

export async function getGradeSubjects(id) {
  return await api.get(ENDPOINTS.grade.subjects(id));
}