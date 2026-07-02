import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export const updateAcademicInfo = async (data) => {
  try {
    const res = await api.patch(ENDPOINTS.student.updateAcademic, data);
    return res.data;
  } catch (err) {
    console.error("Error updating academic info:", err);
    return null;
  }
}