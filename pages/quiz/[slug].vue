<template>
  <div class="grid w-full h-screen place-items-center">

    <Transition>
      <div v-if="!loading">


        <Question :questions="data"></Question>


      </div>
      <div v-else>
        <div class="loader">
          <div class="loader-inner">
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="load er-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
const isData = ref(false)
const loading = ref(true)
const route = useRoute();
const { quizzes } = storeToRefs(useQuizStore());
const { fetchQuizBySlug } = useQuizStore();
const quiz = computed(() => quizzes[route.params.slug]);

const data = ref('')
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
onMounted(async () => {
  await fetchQuizBySlug();


  async function sendMessage() {
    const currentSlug = route.params.slug; // Assuming you are in a Vue component
    const currentTime = new Date().getTime();

    try {
      // Retrieve existing data from local storage
      const localStorageData = localStorage.getItem('questionsData');
      let dataObj = localStorageData ? JSON.parse(localStorageData) : {};

      // Check if data for the current slug already exists and if it's still valid
      if (dataObj[currentSlug]) {
        const elapsedHours = (currentTime - dataObj[currentSlug].timestamp) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (elapsedHours < 24) {
          data.value = dataObj[currentSlug].data;
        } else {
          // Remove stale data
          delete dataObj[currentSlug];
          localStorage.setItem('questionsData', JSON.stringify(dataObj));
        }
      }

      // If data was not found or was stale, fetch from API
      if (!data.value) {
        const rawResponse = await chatCompletion(message.value);
        const parsedResponse = JSON.parse(rawResponse);

        if (parsedResponse && parsedResponse.questions) {
          // Store the questions data along with a timestamp
          dataObj[currentSlug] = {
            timestamp: currentTime,
            data: parsedResponse.questions
          };

          // Save updated data object to local storage
          localStorage.setItem('questionsData', JSON.stringify(dataObj));
          data.value = parsedResponse.questions;
        } else {
          console.error('Unexpected response structure');
        }
      }

      loading.value = false;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  sendMessage();
})

</script>
<style scoped>
.v-enter-active,
.v-leave-active {

  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.loader {
  background: #000;
  background: radial-gradient(#222, #000);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

.loader-inner {
  bottom: 0;
  height: 60px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap {
  animation:
    spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 100px;
}

.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap:nth-child(1) {
  animation-delay: -50ms;
}

.loader-line-wrap:nth-child(2) {
  animation-delay: -100ms;
}

.loader-line-wrap:nth-child(3) {
  animation-delay: -150ms;
}

.loader-line-wrap:nth-child(4) {
  animation-delay: -200ms;
}

.loader-line-wrap:nth-child(5) {
  animation-delay: -250ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}

.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 14px;
}

.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 21px;
}

.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 28px;
}

.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 34px;
  width: 34px;
  top: 35px;
}

@keyframes spin {

  0%,
  15% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>