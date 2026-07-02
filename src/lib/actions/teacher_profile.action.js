"use server";

import "server-only";
import {
  getProfile,
  updateProfile,
  getClasses,
  getStatistics,
  listTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../services/teacher_profile.service";

export async function getProfileAction() {
  try {
    return await getProfile();
  } catch (err) {
    console.error("Error getting teacher profile:", err);
    return null;
  }
}

export async function updateProfileAction(data) {
  try {
    return await updateProfile(data);
  } catch (err) {
    console.error("Error updating teacher profile:", err);
    return null;
  }
}

export async function getClassesAction() {
  try {
    return await getClasses();
  } catch (err) {
    console.error("Error getting teacher classes:", err);
    return null;
  }
}

export async function getStatisticsAction() {
  try {
    return await getStatistics();
  } catch (err) {
    console.error("Error getting teacher statistics:", err);
    return null;
  }
}

export async function listTeachersAction(params) {
  try {
    return await listTeachers(params);
  } catch (err) {
    console.error("Error listing teachers:", err);
    return null;
  }
}

export async function getTeacherByIdAction(id) {
  try {
    return await getTeacherById(id);
  } catch (err) {
    console.error("Error getting teacher by id:", err);
    return null;
  }
}

export async function updateTeacherAction(id, data) {
  try {
    return await updateTeacher(id, data);
  } catch (err) {
    console.error("Error updating teacher:", err);
    return null;
  }
}

export async function deleteTeacherAction(id) {
  try {
    return await deleteTeacher(id);
  } catch (err) {
    console.error("Error deleting teacher:", err);
    return null;
  }
}
