'use server';

import { getAllGrades } from "../services/grade.service";

export async function getAllGradesAction() {
  try {
    const res = await getAllGrades();
    return res.data;
  } catch (err) {
    console.error("Error getting all grades:", err);
    return null;
  }
}