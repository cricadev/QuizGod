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
        <div v-for="car in 2" :key="car" class="carousel--track" :class="'carousel--track--' + car" ref="carousel">
          <NuxtLink class="carousel--item" v-for="q in quizes" :key="q.id" :to="'/quiz/' + transformLowerDash(q.title)">
            <h1>
              {{ q.title }}
            </h1>
          </NuxtLink>
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
const transformLowerDash = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase()
}
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



main {
  @apply flex flex-col w-full h-screen justify-center items-center;

}

.carousel {
  @apply flex flex-row items-center justify-center w-full overflow-hidden mx-auto relative gap-2 h-96;
}

.carousel--track {
  @apply flex flex-row items-center justify-center w-screen overflow-hidden absolute top-0 left-0 h-full;

}

.carousel--track--1 {
  animation: infinite-move-1 10s linear infinite;

  @keyframes infinite-move-1 {
    0% {
      transform: translateX(0%);
    }

    50% {
      transform: translateX(-50%);
    }

    100% {
      transform: translateX(-100%);

    }
  }
}

.carousel--track--2 {
  animation: infinite-move-2 10s linear infinite;

  /* Set the delay to match the duration of the first track's animation */

  @keyframes infinite-move-2 {
    0% {
      transform: translateX(100%);
    }

    50% {
      transform: translateX(50%);
    }

    100% {
      transform: translateX(0%);
    }
  }
}

.carousel--item {
  @apply text-center flex flex-col items-center justify-center bg-primary rounded-xl shadow-xl h-full m-4 text-bgPrimary max-w-md w-full;

}
</style>