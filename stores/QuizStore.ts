import { defineStore, acceptHMRUpdate } from "pinia";
import type { Question } from "~/types";
export const useQuizStore = defineStore("QuizStore", {
  state: () => ({
    questions: [] as Question[],
  }),
  actions: {
    async getQuizes() {
      const response = await fetch("/quizes.json");
      const data = await response.json();
      this.quizes = data.quizes;
    },
  },
  getters: {},
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useQuizStore, import.meta.hot)
  );
}
