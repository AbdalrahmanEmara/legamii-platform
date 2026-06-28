"use server";

import "server-only";
import {
  getProfile,
  updateProfile,
  getStatistics,
  getBadges,
  getClasses,
  getContests,
  getActivity,
  getSubjectTags,
} from "../services/student_profile.service";

export async function getProfileAction() {
  try {
    return await getProfile();
  } catch (err) {
    console.error("Error getting profile:", err);
    return null;
  }
}

export async function updateProfileAction(data) {
  try {
    return await updateProfile(data);
  } catch (err) {
    console.error("Error updating profile:", err);
    return null;
  }
}

export async function getStatisticsAction() {
  try {
    return await getStatistics();
  } catch (err) {
    console.error("Error getting statistics:", err);
    return null;
  }
}

export async function getBadgesAction() {
  try {
    return await getBadges();
  } catch (err) {
    console.error("Error getting badges:", err);
    return null;
  }
}

export async function getClassesAction() {
  try {
    return await getClasses();
  } catch (err) {
    console.error("Error getting classes:", err);
    return null;
  }
}

export async function getContestsAction() {
  try {
    return await getContests();
  } catch (err) {
    console.error("Error getting contests:", err);
    return null;
  }
}

export async function getActivityAction() {
  try {
    return await getActivity();
  } catch (err) {
    console.error("Error getting activity:", err);
    return null;
  }
}

export async function getSubjectTagsAction() {
  try {
    return await getSubjectTags();
  } catch (err) {
    console.error("Error getting subject tags:", err);
    return null;
  }
}
