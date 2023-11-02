import { defineStore, acceptHMRUpdate } from "pinia";
import type { Quiz } from "~/types/index"
export const useQuizStore = defineStore('quizStore', () => {
  const { chatCompletion } = useChatgpt()
  const quizzes = ref([] as Quiz[]);
  const storedQuizzes = ref([] as Quiz[])

  onMounted(() => {
    storedQuizzes.value = JSON.parse(localStorage.getItem('quizzes') || '[]');

    if (storedQuizzes.value.length > 0) {
      quizzes.value = storedQuizzes.value
    }
  })



  const fetchQuizBySlug = async (slug: string, message: string) => {

    let quiz = quizzes.value.find(q => q.id === slug);

    // If the quiz already exists, return it
    if (quiz) {
      return quiz;
    }

    try {
      const rawResponse = await chatCompletion(message.value);
      const parsedResponse = JSON.parse(rawResponse);

      if (parsedResponse && parsedResponse.questions) {
        const newQuiz = {
          id: slug,
          correctAnswers: 0,
          questions: parsedResponse.questions,
          timestamp: new Date().getTime(), // Store the timestamp of when the quiz was created
        };

        // Push the new quiz to the array
        storedQuizzes.value.push(newQuiz);

        // Update the quizzes ref
        quizzes.value = storedQuizzes.value;

        // Store the updated quizzes array back to localStorage
        localStorage.setItem('quizzes', JSON.stringify(storedQuizzes.value));

        // Return the new quiz
        return newQuiz;
      } else {
        console.error('Unexpected response structure');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const incrementCorrectAnswers = (slug: string, value: number) => {
    const quizIndex = quizzes.value.findIndex(q => q.id === slug);

    if (quizIndex !== -1) {
      if (value >= quizzes.value[quizIndex].correctAnswers) {
        quizzes.value[quizIndex].correctAnswers = value;

      }

      // Update the stored quizzes in localStorage
      localStorage.setItem('quizzes', JSON.stringify(quizzes.value));
    }
  }

  return {
    quizzes,
    fetchQuizBySlug,
    incrementCorrectAnswers
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot))
}