import { defineStore, acceptHMRUpdate } from "pinia";
import type { Quiz } from "~/types/index"
export const useQuizStore = defineStore('quizStore', () => {
  const { chatCompletion } = useChatgpt()
  const supabase = useSupabaseClient()
  const name = ref('');
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
          name: name.value,
          correctAnswers: 0,
          time: 0,
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


  async function submitQuizResults(slug, results, timeStamp) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .insert([
          { name: results.name, time_taken: results.time, submitted_at: timeStamp, quiz_slug: slug }
        ])
        .select();

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {

      console.error('Error submitting quiz results:', error);
    }

  }

  const updateQuizResults = async (slug: string, results: object) => {
    const quizIndex = quizzes.value.findIndex(q => q.id === slug);

    if (quizIndex > -1) {
      const quiz = quizzes.value[quizIndex];
      quiz.name = results.name;
      quiz.correctAnswers = results.correctAnswers;

      quiz.time = results.time;
      quiz.timestamp = new Date().getTime();

      const result = await submitQuizResults(slug, results, quiz.timestamp);
      console.log(result);

      quizzes.value[quizIndex] = quiz;

      localStorage.setItem('quizzes', JSON.stringify(quizzes.value));
    }
  }

  return {
    quizzes,
    fetchQuizBySlug,
    updateQuizResults,
    name
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot))
}