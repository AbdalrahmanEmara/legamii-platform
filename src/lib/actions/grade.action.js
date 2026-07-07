'use server';
import "server-only";

import { getAllGrades, getGradeSubjects } from "../services/grade.service";

export async function getAllGradesAction() {
  try {
    const res = await getAllGrades();
    return res.data;
  } catch (err) {
    console.error("Error getting all grades:", err);
    return null;
  }
}

export async function getGradeSubjectsAction(id) {
  try {
    const res = await getGradeSubjects(id);
    return res.data;
  } catch (err) {
    console.error(`Error getting subjects for grade ${id}:`, err);
    return null;
  }
}