# Appendix B: Service Matrix

All services are in `src/lib/services/` and use `import "server-only"`. They call `api` methods with `ENDPOINTS`.

---

## auth.service.js

| Function | Method | Endpoint | Returns |
|---|---|---|---|
| `signup(body)` | POST | `auth.signup` | API response |
| `verifyEmail(body)` | POST | `auth.verifyEmail` | API response |
| `login(body)` | POST | `auth.login` | `{ token, role, ... }` |
| `resetPassword(body)` | POST | `auth.resetPassword` | API response |
| `forgetPassword(body)` | POST | `auth.forgetPassword` | API response |

---

## quiz.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getQuizList()` | GET | `quiz.list` |
| `startQuiz(body)` | POST | `quiz.start` |
| `finishQuiz(quiz_id, body)` | PATCH | `quiz.finish(quiz_id)` |
| `getQuestions(quiz_id)` | GET | `quiz.questions(quiz_id)` |
| `getQuestion(quiz_id, question_id)` | GET | `quiz.question(quiz_id, question_id)` |
| `solveQuestion(quiz_id, question_id, body)` | POST | `quiz.solve(quiz_id, question_id)` |
| `getQuizById(quiz_id)` | GET | `quiz.byId(quiz_id)` |

---

## student_contest.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getContests(classId, status)` | GET | `student_contest.list(classId, status)` |
| `getContestLobby(classId, contestId)` | GET | `student_contest.lobby(classId, contestId)` |
| `registerContest(classId, contestId)` | PATCH | `student_contest.register(classId, contestId)` |
| `startContest(classId, contestId)` | PATCH | `student_contest.start(classId, contestId)` |
| `getContestQuestions(studentContestId)` | GET | `student_contest.questions(studentContestId)` |
| `getContestQuestion(studentContestId, questionId)` | GET | `student_contest.question(studentContestId, questionId)` |
| `submitContestAnswer(studentContestId, questionId, body)` | POST | `student_contest.submit(studentContestId, questionId)` |
| `toggleQuestionFlag(studentContestId, questionId)` | PATCH | `student_contest.flag(studentContestId, questionId)` |
| `finishContest(studentContestId)` | GET | `student_contest.finish(studentContestId)` |
| `getContestSummary(studentContestId)` | GET | `student_contest.summary(studentContestId)` |
| `getContestDetailedSummary(studentContestId)` | GET | `student_contest.detailedSummary(studentContestId)` |
| `getContestRank(studentContestId)` | GET | `student_contest.rank(studentContestId)` |

---

## student_profile.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getProfile()` | GET | `studentProfile.profile()` |
| `updateProfile(data)` | PATCH | `studentProfile.updateProfile()` |
| `getStatistics()` | GET | `studentProfile.statistics()` |
| `getBadges()` | GET | `studentProfile.badges()` |
| `getClasses()` | GET | `studentProfile.classes()` |
| `getContests()` | GET | `studentProfile.contests()` |
| `getActivity()` | GET | `studentProfile.activity()` |
| `getSubjectTags()` | GET | `studentProfile.subjectTags()` |

---

## teacher_profile.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getProfile()` | GET | `teacher.profile()` |
| `updateProfile(data)` | PATCH | `teacher.updateProfile()` |
| `getClasses()` | GET | `teacher.classes()` |
| `getStatistics()` | GET | `teacher.statistics()` |
| `listTeachers(params)` | GET | `teacher.list` |
| `getTeacherById(id)` | GET | `teacher.byId(id)` |
| `updateTeacher(id, data)` | PATCH | `teacher.update(id)` |
| `deleteTeacher(id)` | DELETE | `teacher.delete(id)` |

---

## qbank.service.js

| Function | Method | Endpoint |
|---|---|---|
| `createQuestion(data)` | POST | `questions.create` |
| `aiGenerateQuestion(data)` | POST | `questions.aiGenerate` |
| `getQuestions(query)` | GET | `questions.list(query)` |
| `getMyQuestions(query)` | GET | `questions.myList(query)` |
| `getQuestionForStudent(id)` | GET | `questions.byIdStudent(id)` |
| `getQuestionForAdmin(id)` | GET | `questions.byIdAdmin(id)` |
| `updateQuestion(id, data)` | PATCH | `questions.update(id)` |
| `deleteQuestion(id)` | DELETE | `questions.delete(id)` |
| `addQuestionToContest(contestId, data)` | POST | `questions.addToContest(contestId)` |
| `createAndAttachQuestionToContest(contestId, data)` | POST | `questions.createAndAttachToContest(contestId)` |
| `getQuestionContestStats(questionId, contestId)` | GET | `questions.stats(questionId, contestId)` |
| `getContestQuestions(contestId)` | GET | `questions.listByContest(contestId)` |
| `getContestQuestionByOrder(contestId, order)` | GET | `questions.getByContestOrder(contestId, order)` |

---

## notifications.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getNotifications(page, limit)` | GET | `notifications.list(page, limit)` |
| `getUnreadCount()` | GET | `notifications.unreadCount` |
| `markNotificationAsRead(notificationId)` | PATCH | `notifications.read(notificationId)` |
| `markAllNotificationsAsRead()` | PATCH | `notifications.readAll` |
| `getBroadcasts()` | GET | `notifications.broadcasts` |
| `markBroadcastAsRead(broadcastId)` | PATCH | `notifications.readBroadcast(broadcastId)` |
| `createBroadcast(body)` | POST | `notifications.broadcast` |
| `sendContestClarification(body)` | POST | `notifications.sendContestClarification` |
| `getContestClarification(contestId)` | GET | `notifications.contestClarification(contestId)` |

---

## leaderboard.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getGlobalLeaderboard(page, limit)` | GET | `leaderboard.global` (with params) |

---

## streak.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getStreak()` | GET | `streak.get` |

---

## missions.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getDailyMissions()` | GET | `missions.daily` |
| `claimMission(id)` | POST | `missions.claim(id)` |

---

## subject.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getAllSubjects()` | GET | `subject.list` |
| `getStudentSubjects()` | GET | `subject.listStudent` |

---

## grade.service.js

| Function | Method | Endpoint |
|---|---|---|
| `getAllGrades()` | GET | `grade.list` |
| `getGradeSubjects(id)` | GET | `grade.subjects(id)` |

---

## school.service.js

| Function | Method | Endpoint |
|---|---|---|
| `listSchools()` | GET | `school.list` |
| `getSchoolById(id)` | GET | `school.byId(id)` |
| `updateSchool(id, data)` | PATCH | `school.update(id)` |
| `deleteSchool(id)` | DELETE | `school.delete(id)` |

---

## students.service.js

| Function | Method | Endpoint |
|---|---|---|
| `updateAcademicInfo(data)` | PATCH | `student.updateAcademic` |

---

## index.js (Re-exports)

Re-exports all functions from: `auth.service`, `quiz.service`, `student_contest.service`, `student_profile.service`, `teacher_profile.service`, `qbank.service`, `notifications.service`, `leaderboard.service`, `streak.service`, `missions.service`, `subject.service`, `grade.service`, `school.service`, `students.service`
