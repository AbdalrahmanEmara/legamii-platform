import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export async function getProfile() {
  const res = await api.get(ENDPOINTS.studentProfile.profile());
  return res.data;
}

export async function updateProfile(data) {
  const res = await api.patch(ENDPOINTS.studentProfile.updateProfile(), data);
  return res.data;
}

export async function getStatistics() {
  const res = await api.get(ENDPOINTS.studentProfile.statistics());
  return res.data;
}

export async function getBadges() {
  const res = await api.get(ENDPOINTS.studentProfile.badges());
  return res.data;
}

export async function getClasses() {
  const res = await api.get(ENDPOINTS.studentProfile.classes());
  return res.data;
}

export async function getContests() {
  const res = await api.get(ENDPOINTS.studentProfile.contests());
  return res.data;
}

export async function getActivity() {
  const res = await api.get(ENDPOINTS.studentProfile.activity());
  return res.data;
}

export async function getSubjectTags() {
  const res = await api.get(ENDPOINTS.studentProfile.subjectTags());
  return res.data;
}
