<template>
  <div>
    {{ $route.params.slug }}
    <input v-model="message">
    <button @click="sendMessage" v-text="'Send'" />
    <div>{{ data }}</div>
  </div>
</template>
<script setup>
const { chatCompletion } = useChatgpt()
const route = useRoute();
const data = ref('')
const message = ref([
  {
    role: 'system',
    content: `You need to create a quiz that contains 5 questions with its 4 possible answers and only one correct answer based on the user message which will be a topic in order to create the quiz.
You have to return a JSON, the quiz has properties like ID, question, questionID, answers, questionID, and a correct answer.`,
  },
  {
    role: 'user',
    content: route.params.slug,
  }
])

async function sendMessage() {
  const response = await chatCompletion(message.value, {

  })
  data.value = response
}
</script>
<style scoped></style>