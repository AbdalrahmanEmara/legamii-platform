# Appendix C: Action Matrix

All actions are in `src/lib/actions/` and use `"use server"` + `import "server-only"`.

---

## auth.action.js

| Function | Validates | Service Call | Returns |
|---|---|---|---|
| `signupAction(payload, role)` | Zod (student or teacher schema) | `signup()` | `{ success, message }` or error |
| `verifyEmailAction(payload)` | `verifyEmailSchema` | `verifyEmail()` | `{ success, message }` |
| `loginAction(payload)` | `loginSchema` | `login()` | `{ success, message, role }` + sets cookies |
| `resetPasswordAction(payload)` | `resetPasswordSchema` | `resetPassword()` | API response or error |
| `forgetPasswordAction(payload)` | `forgetPasswordSchema` | `forgetPassword()` | API response or error |
| `logoutAction()` | — | — | Deletes cookies |
| `getSessionAction()` | — | — | `{ success, token, role }` from cookies |

---

## quiz.action.js

| Function | Service Call | Behavior |
|---|---|---|
| `startQuizAction({ subject_id, difficulty, subjectTagsMasteryLevel })` | `startQuiz()` | Redirects to `/practice/{quizId}` |
| `getQuizListAction()` | `getQuizList()` | Returns data or null |
| `getQuestionsAction(quiz_id)` | `getQuestions()` | Returns data or null |
| `getQuestionAction(quiz_id, question_id)` | `getQuestion()` | Returns data or null |
| `solveQuestionAction(quiz_id, question_id, answer)` | `solveQuestion()` | Returns result or null |
| `finishQuizAction(quiz_id)` | `finishQuiz()` | Returns result or null |
| `getQuizByIdAction(quiz_id)` | `getQuizById()` | Returns data or null |

---

## student_contest.action.js

| Function | Service Call |
|---|---|
| `getContestsAction(classId, status)` | `getContests()` |
| `getContestLobbyAction(classId, contestId)` | `getContestLobby()` |
| `registerContestAction(classId, contestId)` | `registerContest()` |
| `startContestAction(classId, contestId)` | `startContest()` |
| `getContestQuestionsAction(studentContestId)` | `getContestQuestions()` |
| `getContestQuestionAction(studentContestId, questionId)` | `getContestQuestion()` |
| `submitContestAnswerAction(studentContestId, questionId, body)` | `submitContestAnswer()` |
| `toggleQuestionFlagAction(studentContestId, questionId)` | `toggleQuestionFlag()` |
| `finishContestAction(studentContestId)` | `finishContest()` |
| `getContestSummaryAction(studentContestId)` | `getContestSummary()` |
| `getContestDetailedSummaryAction(studentContestId)` | `getContestDetailedSummary()` |
| `getContestRankAction(studentContestId)` | `getContestRank()` |

All return data or null (standard pattern).

---

## student_profile.action.js

| Function | Service Call |
|---|---|
| `getProfileAction()` | `getProfile()` |
| `updateProfileAction(data)` | `updateProfile()` |
| `getStatisticsAction()` | `getStatistics()` |
| `getBadgesAction()` | `getBadges()` |
| `getClassesAction()` | `getClasses()` |
| `getContestsAction()` | `getContests()` |
| `getActivityAction()` | `getActivity()` |
| `getSubjectTagsAction()` | `getSubjectTags()` |

All return data or null.

---

## teacher_profile.action.js

| Function | Service Call |
|---|---|
| `getProfileAction()` | `getProfile()` |
| `updateProfileAction(data)` | `updateProfile()` |
| `getClassesAction()` | `getClasses()` |
| `getStatisticsAction()` | `getStatistics()` |
| `listTeachersAction(params)` | `listTeachers()` |
| `getTeacherByIdAction(id)` | `getTeacherById()` |
| `updateTeacherAction(id, data)` | `updateTeacher()` |
| `deleteTeacherAction(id)` | `deleteTeacher()` |

All return data or null.

---

## qbank.action.js

| Function | Service Call |
|---|---|
| `createQuestionAction(data)` | `createQuestion()` |
| `aiGenerateQuestionAction(data)` | `aiGenerateQuestion()` |
| `getQuestionsAction(query)` | `getQuestions()` |
| `getMyQuestionsAction(query)` | `getMyQuestions()` |
| `getQuestionForStudentAction(id)` | `getQuestionForStudent()` |
| `getQuestionForAdminAction(id)` | `getQuestionForAdmin()` |
| `updateQuestionAction(id, data)` | `updateQuestion()` |
| `deleteQuestionAction(id)` | `deleteQuestion()` |
| `addQuestionToContestAction(contestId, data)` | `addQuestionToContest()` |
| `createAndAttachQuestionToContestAction(contestId, data)` | `createAndAttachQuestionToContest()` |
| `getQuestionContestStatsAction(questionId, contestId)` | `getQuestionContestStats()` |
| `getContestQuestionsAction(contestId)` | `getContestQuestions()` |
| `getContestQuestionByOrderAction(contestId, order)` | `getContestQuestionByOrder()` |

All return data or null.

---

## notifications.action.js

| Function | Service Call |
|---|---|
| `getNotificationsAction(page, limit)` | `getNotifications()` |
| `getUnreadCountAction()` | `getUnreadCount()` |
| `markNotificationAsReadAction(notificationId)` | `markNotificationAsRead()` |
| `markAllNotificationsAsReadAction()` | `markAllNotificationsAsRead()` |
| `getBroadcastsAction()` | `getBroadcasts()` |
| `markBroadcastAsReadAction(broadcastId)` | `markBroadcastAsRead()` |
| `createBroadcastAction(body)` | `createBroadcast()` |
| `sendContestClarificationAction(body)` | `sendContestClarification()` |
| `getContestClarificationAction(contestId)` | `getContestClarification()` |

All return data or null.

---

## leaderboard.action.js

| Function | Service Call |
|---|---|
| `getGlobalLeaderboardAction(page, limit)` | `getGlobalLeaderboard()` |

Returns `{ success, data }` or `{ success: false }`.

---

## streak.action.js

| Function | Service Call |
|---|---|
| `getStreakAction()` | `getStreak()` |

Returns data or null.

---

## missions.action.js

| Function | Validates | Service Call |
|---|---|---|
| `getDailyMissionsAction()` | — | `getDailyMissions()` |
| `claimMissionAction(payload)` | `claimMissionSchema` | `claimMission()` |

Returns `{ success, data }` or `{ success, message, rewardPoints }`.

---

## subject.action.js

| Function | Service Call |
|---|---|
| `getAllSubjectsAction()` | `getAllSubjects()` |
| `getStudentSubjectsAction()` | `getStudentSubjects()` |

Both return data or null.

---

## grade.action.js

| Function | Service Call |
|---|---|
| `getAllGradesAction()` | `getAllGrades()` |
| `getGradeSubjectsAction(id)` | `getGradeSubjects()` |

Both return data or null.
