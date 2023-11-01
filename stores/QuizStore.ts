import { defineStore, acceptHMRUpdate } from "pinia";
import type { Quiz } from "~/types/index"
const route = useRoute();
const { chatCompletion } = useChatgpt()
const message = ref(`Create a JSON File that represents a quiz, it must contain 5 questions with its 4 possible answers and only one correct answer.
The quiz will be generated based on: ${route.params.slug}.
You have to return a JSON, the JSON follows the following interface:
---
export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}
---
ONLY RETURN THE JSON, NO ADDED TEXT OR EXPLANATION.
`)
export const useQuizStore = defineStore("QuizStore", {
  state: () => ({
    quizzes: [] as Quiz[],
  }),
  actions: {
    async fetchQuizBySlug() {
      const currentSlug = route.params.slug;

      // Retrieve existing data from the store
      let quiz = this.quizzes[currentSlug];

      // If data was not found in the store, fetch from API
      if (!quiz) {
        try {
          const rawResponse = await chatCompletion(message.value);
          const parsedResponse = JSON.parse(rawResponse);

          if (parsedResponse && parsedResponse.questions) {
            this.quizzes[currentSlug] = {
              id: currentSlug,
              correctAnswers: 0,
              questions: parsedResponse.questions,
            };

            // Save the quiz data to localStorage
            localStorage.setItem('quizzes', JSON.stringify(this.quizzes));
          } else {
            console.error('Unexpected response structure');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    },
  },
  getters: {

  },
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useQuizStore, import.meta.hot)
  );
}
