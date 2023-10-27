import { defineStore, acceptHMRUpdate } from "pinia";
import type { Answer, Quiz } from "~/types";
export const useQuizStore = defineStore("QuizStore", {
  state: () => ({
    quizes: [] as Quiz[],
    answers: [] as Answer[],
  }),
  actions: {
    async getQuizes() {
      const response = await fetch("/quizes.json");
      const data = await response.json();
      this.quizes = data.quizes;
    },

    async getAnswers() {
      const response = await fetch("/quizes.json");
      const data = await response.json();
      this.answers = data.answers;
    },
  },
  getters: {},
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useQuizStore, import.meta.hot)
  );
}
