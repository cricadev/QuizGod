export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}
export interface Quiz {
  id: string;
  correctAnswers: number;
  questions: Question[];
  time: number;
  timestamp: number;
}