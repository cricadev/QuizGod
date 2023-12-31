<template>
  <div class="grid h-screen place-items-center" v-if="questions">

    <TransitionGroup name="result">
      <form v-if="!isResult" class="absolute flex flex-col items-start justify-center max-w-2xl gap-4 px-3"
        @submit.prevent="handleQuestionSubmit">
        <!-- ALERT -->
        <Transition name="slide-down">
          <div v-if="!isCorrectAnswer && isWrongAnswer"
            class="flex items-center gap-2 p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 absolute top-5 left-1/2 translate-x-[-50%]"
            role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
            <div>
              <span class="font-medium">Wrong answer!
                <span class="text-xs font-black">-30s</span>
              </span>
            </div>
          </div>
        </Transition>
        <Transition name="slide-down">
          <div v-if="isCorrectAnswer && !isWrongAnswer"
            class="flex items-center gap-2 p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 absolute top-5 left-1/2 translate-x-[-50%]"
            role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Correct!</span>
            </div>
          </div>
        </Transition>
        <div class="flex justify-between w-full font-semibold text-primary dark:text-darkPrimary">
          <span>
            {{ questionIndex + 1 }} / {{ questions.length }}
          </span>
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formatTime(elapsed) }}
          </span>
        </div>
        <h2 class="text-[2rem] font-black leading-tight lg:text-5xl text-start text-primary dark:text-darkPrimary">
          {{ question.question }}</h2>
        <div class="flex flex-col w-full gap-2 mx-auto mt-4">
          <label v-for="answer in question.answers" class="flex items-center w-full">
            <input type="radio" ref="radioButtons" class="hidden w-5 h-5 text-gray-600 form-radio" name="answer"
              :value="answer" required @click="answerValue = $event.target.value">
            <span
              class="w-full px-2 py-2 transition-all border-2 rounded-md text-primary dark:text-darkPrimary border-primary dark:border-darkPrimary hover:bg-hover">{{
                answer }}</span>
          </label>
        </div>
        <button :disabled="answerValue.length < 1" type="submit" v-if="!isSubmit" class="button-primary">
          Submit </button>
        <button v-else-if="isSubmit && questionIndex !== 4" @click="handleNextQuestionButton" type="button"
          class="button-primary">
          Next Question </button>
        <button v-else-if="questionIndex == 4" @click="handleNextQuestionButton" class="button-primary">
          Finish Test
        </button>
      </form>

      <form @submit.prevent="submitResults" class="absolute flex flex-col items-start justify-center gap-12 "
        v-if="isResult && !resultSent && findQuiz(route.params.slug)?.name.length < 1">
        <h3 class="text-3xl font-black text-primary dark:text-darkPrimary">Share your name with us to save the results
        </h3>
        <input type="text"
          class="w-full pb-3 pl-3 font-bold text-black bg-transparent border-b-2 dark:text-white border-b-primary focus:outline-none"
          placeholder="Write your name right here" v-model="name">
        <button :disabled="name.length < 3 || name.length > 15" @click="resultSent = true" class="button-primary">Send
          results</button>
      </form>
    </TransitionGroup>

    <div v-if="isResult && resultSent"
      class="flex flex-col items-center justify-center w-screen h-screen gap-12 overflow-x-hidden overflow-y-hidden text-center text-white lg:grid-cols-2 lg:gap-16 lg:grid animate__animated animate__zoomIn animate__faster lg:px-8 xl:px-32 2xl:px-64"
      :class="[{ 'bg-red': countCorrectAnswers <= 3 }, {
        'bg-primary': countCorrectAnswers > 3 && countCorrectAnswers <= 5
      }]">
      <div class="flex flex-col gap-4 lg:justify-self-end ">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2 lg:text-start">
            <span class="text-base font-semibold">
              {{ countCorrectAnswers }} / {{ questions.length }} answers correct
            </span>
            <span class="text-3xl font-black lg:text-5xl animate-pulse"
              v-html="formatTime(elapsedFinal) + 's<br>' + responseToResult.replace(/\n/g, '<br>')"></span>
          </div>
          <div class="flex items-center justify-center gap-2 lg:justify-start">
            <button class="button-secondary" style="color:white;" @click="reloadPage"> Try
              again </button>
            <nuxt-link to="/" class="flex button-tertiary"> <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Choose a New Quiz </nuxt-link>
          </div>
        </div>
      </div>
      <div class="border-4 rounded-lg leaderboard">
        <table v-if="!loadingLeaderboard" class="">
          <thead class="">
            <tr class="bg-white" :class="[{ 'text-red': countCorrectAnswers <= 3 }, {
              'text-primary': countCorrectAnswers > 3 && countCorrectAnswers <= 5
            }]">
              <th class="py-4 pr-10 bg-white lg:pl-4 lg:pr-24">Player</th>
              <th class="bg-white lg:pr-8">Date</th>
              <th class="bg-white lg:pr-16">Time</th>
            </tr>
          </thead>
          <tbody class="block h-80">
            <tr v-for="item in leaderboard" class="" :key="item.id">
              <td class="py-4 pl-2 lg:pl-6 lg:pr-24">{{ item.name }}</td>
              <td class="pl-12 lg:pr-8">{{ formatDate(item.submitted_at) }}</td>
              <td class="pl-4 pr-2 lg:pr-16 ">{{ formatTime(item.time_taken, 3) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="" v-else>
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script async setup lang="ts">
import 'animate.css';
import { ref, reactive, watch, computed } from "vue"
import type { Question } from "~/types/index.ts"
/* 
Display a question with four answer options.
Allow users to select one answer option.
Provide a "Submit" button to submit the user's answer.
Display a message indicating whether the user's answer is correct or incorrect.
Provide a "Next" button to load the next question.
Keep track of the user's score throughout the quiz.
Display the final score after the last question.
*/
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
const supabase = useSupabaseClient();
const resultSent = ref(false)
const isResult = ref(false)
const props = defineProps<{
  questions: Question[] | null
}>()
const route = useRoute();
const quizStore = useQuizStore();
const { quizzes, name, leaderboard } = storeToRefs(quizStore);
const { updateQuizResults, readLeaderboard } = quizStore;
const radioButtons = ref(null)
const countCorrectAnswers = ref(0)
const isCorrectAnswer = ref(false);
const isWrongAnswer = ref(false)
const answerValue = ref('')
const isSubmit = ref(false);
const questionIndex = ref(0)
const elapsedFinal = ref(null)
const startTime = ref(Date.now());
const loadingLeaderboard = ref(true);

const reloadPage = () => {
  window.location.reload();
}
const findQuiz = (slug) => {
  return quizzes.value.find((quiz) => quiz.id == slug)
}

watch(isResult, (newValue) => {
  if (newValue) {
    clearInterval(intervalId.value); // Stop the timer when all questions are answered
    elapsedFinal.value = elapsed.value;
  }
});

watch(resultSent, (newValue) => {
  if (newValue) {
    setTimeout(async () => {
      const data = await readLeaderboard(route.params.slug);
      if (data.data.value) loadingLeaderboard.value = false;
    }, 3000)

  }
});


const submitResults = () => {
  const results = {
    name: name.value !== '' ? name.value : findQuiz(route.params.slug)?.name,
    correctAnswers: countCorrectAnswers.value,
    time: elapsedFinal.value
  }
  quizStore.updateQuizResults(route.params.slug, results);

  setTimeout(() => {
    name.value = '';

  }, 1000)
}

const formatTime = (milliseconds: number, digits = 2) => {

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const millisecondsLeft = milliseconds % 1000;

  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedMilliseconds = millisecondsLeft < 10 ? '0' + millisecondsLeft : millisecondsLeft;

  if (digits === 2) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  else if (digits === 3) {
    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  }
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
    return `you're terrible man! \nGo study for a lil bit`
  }
})

const elapsed = ref(0);
const penalty = ref(0);

const intervalId = ref(setInterval(() => {
  elapsed.value = Date.now() - startTime.value + penalty.value;
}, 1000));

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
      penalty.value += 30000;
    }
  }
}
const handleNextQuestionButton = (e) => {
  if (props.questions.length <= questionIndex.value + 1) {
    isResult.value = true;
    if (findQuiz(route.params.slug)?.name.length > 1) {
      resultSent.value = true;
      setTimeout(() => {
        submitResults();
      }, 10);
    }
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
.result-enter-active,
.result-leave-active {
  transition: opacity 0.2s ease-out;
}

.result-enter-from,
.result-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {

  transition: transform 0.2s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translate(-50%, -100%);
}

.slide-down-enter-to,
.slide-down-leave-from {
  transform: translate(-50%, 0%);
}

.radio--active+span {
  @apply bg-primary text-white border-primary;
}

.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #fff;
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}


tbody {
  display: block;
  height: clamp(100px, 35vh, 300px);
  overflow: auto;
}

thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

thead {
  width: calc(100%)
}
</style>