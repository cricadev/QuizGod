export interface Quiz {
  id: string;
  topic: string;
}

export interface Question {
  questionId: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}