<template>
  <div class="container-grid">
    <img src="/logo-color.png" class="fixed top-4 left-1/2 translate-x-[-50%]" alt="" v-if="colorMode.value == 'light'">
    <img src="/logo-white.png" class="fixed top-4 left-1/2 translate-x-[-50%]" alt="" v-else>

    <main>
      <div class="header text-primary dark:text-darkPrimary">
        <h1 class="font-black text-7xl">Choose Your Quiz Adventure</h1>
        <span class="font-normal ">Explore, Learn, and Have Fun with Our Diverse Quiz
          Selection!</span>
        <ToggleTheme></ToggleTheme>
      </div>
      <div class="carousel">
        <div v-for="car in 2" :key="car" class="carousel--track" :class="'carousel--track--' + car" ref="carousel">
          <NuxtLink class="carousel--item" v-for="q in quizes" :key="q.id" :to="'/quiz/' + transformLowerDash(q.title)">
            <div class="flex flex-col justify-end w-full h-full gap-8 px-2 pb-4" v-if="findQuiz(q.slug)">
              <h1>
                {{ q.title }}
              </h1>
              <div class="flex justify-between w-full text-start">
                <span class="text-sm font-normal">
                  Last try:
                  <span class="flex items-center gap-1 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {{ formatDate(findQuiz(q.slug)?.timestamp) }}
                  </span> </span>
                <span class="flex items-center gap-1 text-sm font-normal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  {{ formatTime(findQuiz(q.slug)?.time) }} </span>
              </div>
            </div>
            <div class="" v-else>
              <h1>
                {{ q.title }}
              </h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
const colorMode = useColorMode()
const { quizzes } = storeToRefs(useQuizStore());
const findQuiz = (slug) => {
  return quizzes.value.find((quiz) => quiz.id == slug)
}
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
const formatTime = (milliseconds: number) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const millisecondsLeft = milliseconds % 1000;

  const formattedSeconds = seconds < 10 ? seconds : seconds;
  const formattedMinutes = minutes < 10 ? minutes : minutes;
  const formattedMilliseconds = millisecondsLeft;

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
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
const { height, width } = useWindowSize();

const transformLowerDash = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase()
}
const quizes = [
  {
    "id": "1",
    "title": "Chemistry Quiz",
    "slug": "chemistry-quiz"
  },
  {
    "id": "2",
    "title": "Physics Quiz",
    "slug": "physics-quiz"
  },
  {
    "id": "3",
    "title": "Biology Quiz",
    "slug": "biology-quiz"
  },
  {
    "id": "4",
    "title": "Earth Science Quiz",
    "slug": "earth-science-quiz"
  },
  {
    "id": "5",
    "title": "Space Quiz",
    "slug": "space-quiz"
  },
  {
    "id": "6",
    "title": "Math Quiz",
    "slug": "math-quiz"
  },
  {
    "id": "7",
    "title": "Computer Science Quiz",
    "slug": "computer-science-quiz"
  },
  {
    "id": "8",
    "title": "History Quiz",
    "slug": "history-quiz"
  },
  {
    "id": "9",
    "title": "Geography Quiz",
    "slug": "geography-quiz"
  },
  {
    "id": "10",
    "title": "Literature Quiz",
    "slug": "literature-quiz"
  }
]
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

/*
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
*/
.carousel--item {
  @apply text-center flex flex-col items-center justify-center bg-primary rounded-xl shadow-xl h-full m-4 text-bgPrimary max-w-md w-full dark:bg-darkPrimary dark:text-darkBgPrimary font-bold;

}
</style>