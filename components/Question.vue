<template>
  <div class="grid place-items-center h-screen" v-if="questions">

    <form v-if="!isResult" class="flex flex-col items-start justify-center gap-4 max-w-2xl"
      @submit.prevent="handleQuestionSubmit">
      <!-- ALERT -->
      <Transition>
        <div v-if="!isCorrectAnswer && isWrongAnswer"
          class="flex items-center gap-2 p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 absolute top-5 left-1/2 translate-x-[-50%]"
          role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
          </svg>
          <div>
            <span class="font-medium">Wrong answer!</span>
          </div>
        </div>
      </Transition>
      <Transition>
        <div v-if="isCorrectAnswer && !isWrongAnswer"
          class="flex items-center gap-2 p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 absolute top-5 left-1/2 translate-x-[-50%]"
          role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Correct!</span>
          </div>
        </div>
      </Transition>
      <div class="text-primary font-semibold flex justify-between w-full ">
        <span>
          {{ questionIndex + 1 }} / {{ props.questions.length }}
        </span>
        <span class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          {{ formatTime(elapsed) }}
        </span>
      </div>
      <h2 class="text-5xl font-black leading-tight text-start text-primary">
        {{ question.question }}</h2>
      <div class="flex flex-col  mx-auto mt-4 w-full gap-2">
        <label v-for="answer in question.answers" class="flex items-center w-full">
          <input type="radio" ref="radioButtons" class="w-5 h-5 text-gray-600 form-radio hidden" name="answer"
            :value="answer" required @click="answerValue = $event.target.value">
          <span class="px-2 text-primary  border-primary border-2 py-2 w-full rounded-md hover:bg-hover transition-all">{{
            answer }}</span>
        </label>
      </div>
      <button :disabled="answerValue.length < 1" type="submit" v-if="!isSubmit" class="button-primary">
        Submit </button>
      <button v-else @click="handleNextQuestionButton" type="button" class="button-primary">
        Next</button>
    </form>
    <div
      class="text-center text-white animate__animated animate__zoomIn animate__faster bg-primary h-screen w-screen  flex justify-center flex-col gap-4"
      :class="[
        {
          'bg-[#F30000]': countCorrectAnswers <= 3,
        }
      ]" v-else>
      <span class="text-base font-semibold">
        {{ countCorrectAnswers }} / {{ questions.length }} answers correct
      </span>

      <span class="font-black text-5xl animate-pulse">
        {{ formatTime(elapsedFinal) }}s, {{ responseToResult }}
      </span>

    </div>
  </div>
</template>
<script setup lang="ts">
import 'animate.css';
import { ref, reactive, watch, computed } from "vue"
import type { Question, Quiz } from "~/types/index.ts"
/* 
Display a question with four answer options.
Allow users to select one answer option.
Provide a "Submit" button to submit the user's answer.
Display a message indicating whether the user's answer is correct or incorrect.
Provide a "Next" button to load the next question.
Keep track of the user's score throughout the quiz.
Display the final score after the last question.
*/

const props = defineProps<{
  questions: Question[]
}>()
const radioButtons = ref(null)
const countCorrectAnswers = ref(0)
const isCorrectAnswer = ref(false);
const isWrongAnswer = ref(false)
const answerValue = ref('')
const isSubmit = ref(false);
const isResult = ref(false)
const questionIndex = ref(0)
const elapsedFinal = ref(null)
const startTime = ref(Date.now());

const elapsed = ref(0);

const intervalId = ref(setInterval(() => {
  elapsed.value = Date.now() - startTime.value;
}, 1000));

watch(isResult, (newValue) => {
  if (newValue) {
    clearInterval(intervalId.value); // Stop the timer when all questions are answered
    elapsedFinal.value = elapsed.value;
  }
});

const formatTime = (milliseconds: number) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);

  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedMinutes}:${formattedSeconds}`;
}


const question = computed(() => {
  return props.questions[questionIndex.value]
})

const responseToResult = computed(() => {
  if (countCorrectAnswers.value === props.questions.length) {
    return `YOOO MAN YOU'RE ACTUALLY GOOD`
  }
  else if (countCorrectAnswers.value < props.questions.length && countCorrectAnswers.value !== 0) {
    return 'NOT BAD MY G'
  }
  else if (countCorrectAnswers.value === 0) {
    return `you're terrible man! go study for a lil bit`
  }
})


const handleQuestionSubmit = (e) => {
  isSubmit.value = true;
  if (isSubmit.value) {
    if (answerValue.value === question.value.correctAnswer) {
      isCorrectAnswer.value = true;
      isWrongAnswer.value = false;
      countCorrectAnswers.value++;
    } else {
      isWrongAnswer.value = true;
      isCorrectAnswer.value = false;
    }
  }
}
const handleNextQuestionButton = (e) => {
  if (props.questions.length <= questionIndex.value + 1) {
    isResult.value = true;
  } else {
    questionIndex.value++;
  }
  isCorrectAnswer.value = false;
  isWrongAnswer.value = false;
  isSubmit.value = false;
  answerValue.value = '';
  radioButtons.value.forEach((r) => {
    r.checked = false;
    r.classList.remove('radio--active')
  })
}
watchEffect(() => {
  radioButtons.value?.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
      if (radioButton.checked) {
        radioButtons.value.forEach((r) => r.classList.remove('radio--active'))
        radioButton.classList.add('radio--active');
      } else {

        radioButton.classList.remove('radio--active')
      }
    });
  });
});

</script>
<style scoped>
.v-enter-active,
.v-leave-active {

  transition: transform 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translate(-50%, -100%);
}

.v-enter-to,
.v-leave-from {
  transform: translate(-50%, 0%);
}

.radio--active+span {
  @apply bg-primary text-white border-primary;
}
</style>