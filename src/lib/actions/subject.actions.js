'use server';

import { getAllSubjects, getStudentSubjects } from "../services/subject.service";

export async function getAllSubjectsAction() {
  try {
    const res = await getAllSubjects();
    return res.data;
  } catch (err) {
    console.error("Error getting all subjects:", err);
    return null;
  }
}

export async function getStudentSubjectsAction() {
  try {
    const res = await getStudentSubjects();
    return res;
  } catch (err) {
    console.error("Error getting student subjects:", err);
    return null;
  }
}
