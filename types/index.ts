export interface Quiz {
  id: string;
  title: string;
}

export interface Answer {
  quizId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}