# Practice Quiz Flow Architecture

This document breaks down the entire lifecycle of a practice session on the platform. It is designed to help the team understand how the frontend components, Next.js Server Actions, and backend services work together to create a seamless, secure quiz experience.

## 1. Starting a Quiz (`/practice/page.js` & `StartQuizButton`)

The flow begins when a user selects a subject to practice.

- **Data Fetching:** The `/practice/page.js` is a Server Component that calls `getQuizList()` to fetch the user's subjects, streaks, and mastery levels.
- **Triggering the Start:** Each subject has a `<StartQuizButton />` which receives the `subject_id`, `difficulty`, and tags.
- **Server Action (`startQuizAction`):** When clicked, the button triggers `startQuizAction()`.
  - The action calls the NestJS backend via `startQuiz()` in `quiz.service.js`.
  - The backend creates a new quiz session and returns a `quizId`.
  - **Redirect:** The Server Action securely redirects the user to `/practice/[quiz_id]`.

## 2. Taking the Quiz (`PracticePage.js`)

Once redirected, the user enters the active quiz interface.

### Initializing & Fetching Questions
- `PracticePage.js` receives `questions` (a list of question stubs/IDs) and the `quiz_id` as props.
- It uses a `useEffect` hooked to `currentIndex` to fetch the actual question payload dynamically:
  ```javascript
  const question = await getQuestionAction(quiz_id, questions[currentIndex].questionId);
  ```
- This allows the quiz to lazy-load questions securely without exposing all answers to the client upfront.

### Solving Questions
- **Optimistic UI:** When a user selects an option (`A`, `B`, `C`, `D`), it highlights immediately via state (`setSelected`).
- **Submission:** When the user clicks "Next", `solveQuestionAction(quiz_id, questionId, { answer: selected })` is called.
  - This pushes the user's answer to the backend in real-time.
  - The local `currentIndex` is incremented to load the next question.

### Timer & Auto-Finish
- A `setInterval` timer ticks down from `QUIZ_DURATION`. 
- If the timer hits `0`, or the user clicks "FINISH" on the last question, the quiz concludes.

## 3. Finishing the Quiz

When the quiz ends, the transition to the summary view occurs.

- **Marking as Complete:** The app calls `finishQuizAction(quiz_id)`.
  - This sends a `PATCH` request to the backend indicating the session is over.
  - The backend then calculates the final grading (Score, Accuracy, XP).
- **State Switch:** `setFinished(true)` is called, which unmounts the active quiz interface and mounts the `<SummaryPage />`.

## 4. Reviewing Results (`SummaryPage.js`)

The `SummaryPage` acts as the post-game lobby where the user reviews their performance.

- **Fetching the Final Grade:** 
  - `SummaryPage` immediately calls `getQuizByIdAction(quiz_id)`.
  - It receives a fully graded payload from the backend containing: `accuracy`, `finalScore`, `xpGained`, and an array of `questions` (each containing the correct `answer` and the `studentAnswer`).
- **Rendering Stats:** It maps `quizData.accuracy`, `quizData.xpGained`, and `quizData.finalScore` into the stat cards.
- **Review Cards:** It iterates over the fetched questions array and mounts a `<QuestionReviewCard />` for each.
  - It passes `q.studentAnswer` down as the `userAnswer` prop.
  - `QuestionReviewCard` highlights the correct answer in green, and if the user was wrong, highlights their choice in red.

---

## Technical Summary for Teammates

When building new features involving the quiz flow, stick to this pattern:
1. **API Client (`client.js`):** Raw fetch wrappers interacting with the backend (`api.get`, `api.post`).
2. **Service Layer (`quiz.service.js`):** Functions defining the endpoint routes and expected payloads. *Must be marked `"server-only"`.*
3. **Server Actions (`quiz.actions.js`):** The bridge between React components and the Service Layer. *Must be marked `"use server"`.* These handle `try/catch` logic, data mapping, and routing/redirects.
4. **Client Components:** Handle purely presentational state (`currentIndex`, `selected`, timers) and call Server Actions for all mutations and data fetching. Do not compute complex logic (like grading) on the client—rely on the backend payload.
