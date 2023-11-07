export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}
export interface Quiz {
  id: string;
  name: string;
  correctAnswers: number;
  questions: Question[];
  time: number;
  timestamp: number;
}
export interface LeaderboardEntry {
  name: string;
  date: number;
  time: number;
}