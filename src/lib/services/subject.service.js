import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getAllSubjects() {
  return await api.get(ENDPOINTS.subject.list);
}

export async function getStudentSubjects() {
  return await api.get(ENDPOINTS.subject.listStudent);
}