<template>
  <div class="container-grid">
    <img src="/logo-color.png" class="fixed top-4 left-1/2 translate-x-[-50%]" alt="">

    <main>
      <div class="header">
        <h1 class="font-black text-primary text-7xl">Choose Your Quiz Adventure</h1>
        <span class="font-normal text-primary">Explore, Learn, and Have Fun with Our Diverse Quiz Selection!</span>
        <ToggleTheme></ToggleTheme>
      </div>
      <div class="carousel">
        <div class="carousel--track" ref="carousel">
          <div class="carousel--item" v-for="q in quizes" :key="q.id">
            <h1>
              {{ q.title }}
            </h1>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'QuizGod',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Welcome to the ultimate quiz game!'
    }
  ]
})
const quizStore = useQuizStore();
const { height, width } = useWindowSize();
const { quizes } = storeToRefs(quizStore);
const { getQuizes, getAnswers } = quizStore;
getQuizes()
getAnswers()


// const { data, error, pending } = await useLazyFetch('/api/quizes')

// if (data.value) {
//   quiz.value = data.value[0]
// }


</script>
<style scoped>
.header {
  @apply flex flex-col items-center justify-center text-center mb-16;

}

.container-grid {
  @apply grid place-items-center w-full h-screen grid-cols-1;

}

.carousel--track {
  @apply flex flex-row items-center justify-center w-full overflow-hidden;
  animation: infinite-move infinite;
  animation-duration: 20s;
  animation-timing-function: linear;

  @keyframes infinite-move {
    0% {
      transform: translateX(0%);
    }

    50% {
      transform: translateX(-50%);
    }

    100% {
      transform: translateX(-100%);
      /* Move the first item to the end of the carousel */
      flex-direction: row-reverse;
    }
  }
}

.carousel--item {
  @apply flex flex-col items-center justify-center bg-primary rounded-xl shadow-xl w-96 h-96 m-4 text-bgPrimary;

}
</style>