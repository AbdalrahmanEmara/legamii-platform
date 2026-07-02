export type QuestionScope = "Custom Made" | "Public Questions";
export type QuestionSubject = "All" | "Math" | "Science" | "History" | "Geography" | "English";
export type QuestionDifficulty = "All" | "Easy" | "Medium" | "Hard";
export type QuestionTerm = "All" | "1" | "2";

export type QuestionItem = {
  id: string;
  scope: QuestionScope;
  subject: Exclude<QuestionSubject, "All">;
  title: string;
  answers: string[];
  correctAnswerIndex: number;
  grade: number;
  term: Exclude<QuestionTerm, "All">;
  topic: string;
  difficulty: Exclude<QuestionDifficulty, "All">;
  usedCount: number;
};

export const scopeCounts: Record<QuestionScope, number> = {
  "Custom Made": 122,
  "Public Questions": 1078,
};

export const subjects: QuestionSubject[] = [
  "All",
  "Science",
  "Math",
  "History",
  "Geography",
  "English",
];

export const difficulties: QuestionDifficulty[] = ["All", "Easy", "Medium", "Hard"];
export const grades = ["All", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
export const terms: QuestionTerm[] = ["All", "1", "2"];
export const editableSubjects = subjects.filter(
  (subject): subject is Exclude<QuestionSubject, "All"> => subject !== "All",
);
export const editableDifficulties = difficulties.filter(
  (difficulty): difficulty is Exclude<QuestionDifficulty, "All"> => difficulty !== "All",
);

export const questions: QuestionItem[] = [
  {
    id: "quadratic-roots-grade-5",
    scope: "Custom Made",
    subject: "Math",
    title: "Solve for x: 3x² - 12x + 9 = 0",
    answers: ["11", "8", "5", "10"],
    correctAnswerIndex: 2,
    grade: 5,
    term: "1",
    topic: "Quadratic Equations",
    difficulty: "Medium",
    usedCount: 15,
  },
  {
    id: "derivative-function-grade-8",
    scope: "Custom Made",
    subject: "Math",
    title: "What is the derivative of f(x) = x³ - 4x + 2?",
    answers: ["3x^2-4", "3x-4", "3x-4+2", "x-4"],
    correctAnswerIndex: 0,
    grade: 8,
    term: "1",
    topic: "Calculus",
    difficulty: "Medium",
    usedCount: 5,
  },
  {
    id: "balance-water-equation-grade-4",
    scope: "Public Questions",
    subject: "Science",
    title: "Balance this equation: H₂ + O₂ → H₂O",
    answers: ["2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O", "H₄ + O₂ → 2H₂O", "2H₂ + 2O₂ → 2H₂O"],
    correctAnswerIndex: 0,
    grade: 4,
    term: "1",
    topic: "Chemistry",
    difficulty: "Easy",
    usedCount: 48,
  },
  {
    id: "quadratic-expression-grade-8",
    scope: "Public Questions",
    subject: "Math",
    title: "Solve for x: x² - 2x + 9 = 0",
    answers: ["8", "7", "22", "4"],
    correctAnswerIndex: 1,
    grade: 8,
    term: "2",
    topic: "Quadratic Equations",
    difficulty: "Medium",
    usedCount: 33,
  },
  {
    id: "simplify-expression-grade-8",
    scope: "Custom Made",
    subject: "Math",
    title: "Simplify: (2x³y²) / (4x²y)",
    answers: ["xy/2", "x/2y", "y/2x", "2/xy"],
    correctAnswerIndex: 0,
    grade: 8,
    term: "1",
    topic: "Algebra",
    difficulty: "Medium",
    usedCount: 15,
  },
  {
    id: "climate-zones-grade-7",
    scope: "Public Questions",
    subject: "Geography",
    title: "Which climate zone is usually found around the equator?",
    answers: ["Polar", "Tropical", "Mediterranean", "Mountain"],
    correctAnswerIndex: 1,
    grade: 7,
    term: "2",
    topic: "Climate",
    difficulty: "Easy",
    usedCount: 19,
  },
  {
    id: "ancient-civilizations-grade-6",
    scope: "Custom Made",
    subject: "History",
    title: "Which river was essential to the growth of Ancient Egypt?",
    answers: ["Amazon", "Danube", "Nile", "Seine"],
    correctAnswerIndex: 2,
    grade: 6,
    term: "1",
    topic: "Ancient Civilizations",
    difficulty: "Easy",
    usedCount: 12,
  },
  {
    id: "figurative-language-grade-9",
    scope: "Public Questions",
    subject: "English",
    title: "The phrase 'time is a thief' is an example of which device?",
    answers: ["Metaphor", "Alliteration", "Hyperbole", "Oxymoron"],
    correctAnswerIndex: 0,
    grade: 9,
    term: "2",
    topic: "Literary Devices",
    difficulty: "Hard",
    usedCount: 9,
  },
];

export function getQuestionById(questionId: string) {
  return questions.find((question) => question.id === questionId);
}
