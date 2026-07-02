import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getProfile() {
  const res = await api.get(ENDPOINTS.teacher.profile());
  return res.data;
}

export async function updateProfile(data) {
  const res = await api.patch(ENDPOINTS.teacher.updateProfile(), data);
  return res.data;
}

export async function getClasses() {
  const res = await api.get(ENDPOINTS.teacher.classes());
  return res.data;
}

export async function getStatistics() {
  const res = await api.get(ENDPOINTS.teacher.statistics());
  return res.data;
}

export async function listTeachers(params) {
  const res = await api.get(ENDPOINTS.teacher.list, { params });
  return res.data;
}

export async function getTeacherById(id) {
  const res = await api.get(ENDPOINTS.teacher.byId(id));
  return res.data;
}

export async function updateTeacher(id, data) {
  const res = await api.patch(ENDPOINTS.teacher.update(id), data);
  return res.data;
}

export async function deleteTeacher(id) {
  const res = await api.delete(ENDPOINTS.teacher.delete(id));
  return res.data;
}
