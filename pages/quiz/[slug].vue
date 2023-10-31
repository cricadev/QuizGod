<template>
  <div>
    {{ $route.params.slug }}
    <input v-model="message">
    <button @click="sendMessage" v-text="'Send'" />
    <Transition>
      <div v-if="data">{{ data }}
        <Question :questions="data.quiz.questions"></Question>
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
            <div class="loader-line-wrap">
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
const { chatCompletion } = useChatgpt()
const loading = ref(true)
const route = useRoute();
const data = { "quiz": { "id": 1, "topic": "Physics", "questions": [{ "questionId": 1, "question": "What is the SI unit of force?", "answers": ["A) Newton", "B) Joule", "C) Watt", "D) Pascal"], "correctAnswer": "A) Newton" }, { "questionId": 2, "question": "What is the formula to calculate velocity?", "answers": ["A) v = d / t", "B) v = m * a", "C) v = f * t", "D) v = p / t"], "correctAnswer": "A) v = d / t" }, { "questionId": 3, "question": "Which of the following is an example of projectile motion?", "answers": ["A) A car moving on a straight road", "B) A ball thrown into the air", "C) A person walking in a park", "D) A boat sailing in a river"], "correctAnswer": "B) A ball thrown into the air" }, { "questionId": 4, "question": "What is the law of conservation of energy?", "answers": ["A) Energy cannot be created or destroyed, only transferred or transformed", "B) Energy always increases in a closed system", "C) Energy can be created or destroyed", "D) Energy is only conserved in mechanical systems"], "correctAnswer": "A) Energy cannot be created or destroyed, only transferred or transformed" }, { "questionId": 5, "question": "What is the speed of light in a vacuum?", "answers": ["A) 299,792,458 m/s", "B) 3.00 x 10^8 m/s", "C) 186,282 miles per second", "D) All of the above"], "correctAnswer": "D) All of the above" }] } }
//const data = ref('')
const message = ref(`You need to create a quiz that contains 5 questions with its 4 possible answers and only one correct answer based on the user message which will be a topic in order to create the quiz.
You have to return a JSON, the quiz has properties like ID, question, questionID, answers, questionID, and a correct answer.
user message: ${route.params.slug}`)
async function sendMessage() {
  const response = await chatCompletion(message.value)
  data.value = response
  loading.value = false
}
//sendMessage()

</script>
<style scoped>
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