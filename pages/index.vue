<template>
  <div class="container-grid">
    <img src="/logo-color.png" class="fixed top-4 left-1/2 translate-x-[-50%]" alt="" v-if="colorMode.value == 'light'">
    <img src="/logo-white.png" class="fixed top-4 left-1/2 translate-x-[-50%]" alt="" v-else>

    <main>
      <div class="header text-primary dark:text-darkPrimary">
        <h1 class="text-5xl font-black lg:text-7xl">Choose Your Quiz Adventure</h1>
        <span class="mt-4 text-xs font-normal lg:text-base">Explore, Learn, and Have Fun with Our Diverse Quiz
          Selection!</span>
        <ToggleTheme></ToggleTheme>
      </div>
      <div class="carousel">
        <div v-for="car in 2" :key="car" class="carousel--track" :class="'carousel--track--' + car" ref="carousel">
          <NuxtLink class="carousel--item" v-for="q in quizes" :key="q.id" :to="'/quiz/' + transformLowerDash(q.title)">
            <div class="relative w-full h-full gap-8 px-2 pb-4 overflow-hidden" v-if="findQuiz(q.slug)">
              <nuxt-img provider="cloudinary" :src="q.img" alt=""
                class="absolute top-0 left-0 z-10 object-cover object-center w-full h-full opacity-20 rounded-xl" />
              <div class="relative z-20 flex flex-col justify-end w-full h-full gap-6">
                <h1>
                  {{ q.title }}
                </h1>
                <div class="flex justify-between w-full text-xs font-semibold lg:text-base text-start text-primary-50">
                  <span class="font-medium">
                    Last try:
                    <span class="flex items-center gap-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {{ formatDate(findQuiz(q.slug)?.timestamp) }}
                    </span> </span>
                  <span class="flex items-center self-end gap-1">
                    <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatTime(findQuiz(q.slug)?.time) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="relative w-full h-full gap-8 px-2 pb-4 overflow-hidden" v-else>
              <nuxt-img provider="cloudinary" :src="q.img" alt=""
                class="absolute top-0 left-0 z-10 object-cover object-center w-full h-full rounded-xl opacity-20" />
              <div class="relative z-20 flex flex-col justify-center w-full h-full">
                <h1>
                  {{ q.title }}
                </h1>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="carousel carousel--mobile">
        <div v-for="car in 2" :key="car" class="carousel--track--mobile-1" :class="'carousel--track--mobile--1-' + car"
          ref="carousel">
          <NuxtLink class="carousel--item" v-for="q in quizes" :key="q.id" :to="'/quiz/' + transformLowerDash(q.title)">
            <div class="relative w-full h-full gap-8 px-2 pb-4 overflow-hidden" v-if="findQuiz(q.slug)">
              <nuxt-img provider="cloudinary" :src="q.img" alt=""
                class="absolute top-0 left-0 z-10 object-cover object-center w-full h-full opacity-20 rounded-xl" />
              <div class="relative z-20 flex flex-col justify-end w-full h-full gap-6">
                <h1>
                  {{ q.title }}
                </h1>
                <div class="flex justify-between w-full text-xs font-semibold lg:text-base text-start text-primary-50">
                  <span class="font-medium">
                    Last try:
                    <span class="flex items-center gap-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {{ formatDate(findQuiz(q.slug)?.timestamp) }}
                    </span> </span>
                  <span class="flex items-center self-end gap-1">
                    <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatTime(findQuiz(q.slug)?.time) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="relative w-full h-full gap-8 px-2 pb-4 overflow-hidden" v-else>
              <nuxt-img provider="cloudinary" :src="q.img" alt=""
                class="absolute top-0 left-0 z-10 object-cover object-center w-full h-full rounded-xl opacity-20" />
              <div class="relative z-20 flex flex-col justify-center w-full h-full">
                <h1>
                  {{ q.title }}
                </h1>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-for="car in 2" :key="car" class="carousel--track--mobile-2" :class="'carousel--track--mobile--2-' + car"
          ref="carousel">
          <NuxtLink class="carousel--item" v-for="q in quizes" :key="q.id" :to="'/quiz/' + transformLowerDash(q.title)">
            <div class="relative w-full h-full gap-8 px-2 pb-4 overflow-hidden" v-if="findQuiz(q.slug)">
              <nuxt-img provider="cloudinary" :src="q.img" alt=""
                class="absolute top-0 left-0 z-10 object-cover object-center w-full h-full opacity-20 rounded-xl" />
              <div class="relative z-20 flex flex-col justify-end w-full h-full gap-6">
                <h1>
                  {{ q.title }}
                </h1>
                <div class="flex justify-between w-full text-xs font-semibold lg:text-base text-start text-primary-50">
                  <span class="font-medium">
                    Last try:
                    <span class="flex items-center gap-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {{ formatDate(findQuiz(q.slug)?.timestamp) }}
                    </span> </span>
                  <span class="flex items-center self-end gap-1">
                    <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatTime(findQuiz(q.slug)?.time) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="relative w-full h-full gap-8 px-2 pb-4 overflow-hidden" v-else>
              <nuxt-img provider="cloudinary" :src="q.img" alt=""
                class="absolute top-0 left-0 z-10 object-cover object-center w-full h-full rounded-xl opacity-20" />

              <div class="relative z-20 flex flex-col justify-center w-full h-full">
                <h1>
                  {{ q.title }}
                </h1>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
    <div class="absolute flex items-center justify-center w-full text-center bottom-4">
      <span class="text-xs font-medium text-neutral-400 font-inter lg:text-base">
        Made with 💚 by
        <nuxt-link target="_BLANK" to="https://cricadev.com">
          Cricadev
        </nuxt-link>
        & Designed with 💜 by
        <nuxt-link target="_BLANK" to="https://www.linkedin.com/in/stefanny-ascencio/">
          Tef.dsgn
        </nuxt-link>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">

const { width } = useWindowSize();
const colorMode = useColorMode()
const { quizzes } = storeToRefs(useQuizStore());
const findQuiz = (slug) => {
  return quizzes.value.find((quiz) => quiz.id == slug)
}
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = ("0" + date.getFullYear()).slice(-2);

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

const transformLowerDash = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase()
}

const quizes = [
  {
    "id": "1",
    "title": "General Science Quiz",
    "slug": "general-science-quiz",
    "img": "02-general-science_cykfgi.png"
  },
  {
    "id": "2",
    "title": "Math Quiz",
    "slug": "math-quiz",
    "img": "01-math_c8nkhs.png"
  },
  {
    "id": "3",
    "title": "Computer Science Quiz",
    "slug": "computer-science-quiz",
    "img": "03-computer-science_g0l5hr.png"
  },
  {
    "id": "4",
    "title": "History Quiz",
    "slug": "history-quiz",
    "img": "04-history_bna6fb.png"
  },
  {
    "id": "5",
    "title": "Geography Quiz",
    "slug": "geography-quiz",
    "img": "05-geography_a6h9u8.png"
  },
  {
    "id": "6",
    "title": "Literature Quiz",
    "slug": "literature-quiz",
    "img": "06-literature_jixsta.png"
  },
  {
    "id": "7",
    "title": "Arts Quiz",
    "slug": "arts-quiz",
    "img": "07-art_x3whim.png"
  },
  {
    "id": "8",
    "title": "Music Quiz",
    "slug": "music-quiz",
    "img": "08-music_izddrl.png"
  },
  {
    "id": "9",
    "title": "Soccer Quiz",
    "slug": "soccer-quiz",
    "img": "11-soccer_eg0jft.png"
  },
  {
    "id": "10",
    "title": "Sports Quiz",
    "slug": "sports-quiz",
    "img": "09-sports_w5qyh1.png"
  },
  {
    "id": "11",
    "title": "Movies Quiz",
    "slug": "movies-quiz",
    "img": "10-movies_dlssqk.png"
  },
  {
    "id": "12",
    "title": "Chess Quiz",
    "slug": "chess-quiz",
    "img": "12-chess_ctswv8.png"
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
  @apply w-full overflow-hidden relative lg:h-80 hidden lg:block;
}

.carousel--mobile {
  @apply w-full overflow-hidden h-96 grid grid-rows-2 grid-cols-1 lg:hidden gap-4;

}

.carousel--track {
  @apply w-fit overflow-hidden absolute top-0 h-full flex gap-4;

}

.carousel--track--mobile-1 {
  @apply w-fit overflow-hidden flex gap-4 relative top-0 left-0;

}

.carousel--track--mobile-2 {
  @apply w-fit overflow-hidden flex gap-4 relative top-0 px-4 mx-4;

}


.carousel--track--1 {
  animation: infinite-move-1 30s linear infinite;

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
  margin-left: 16px;
  animation: infinite-move-2 30s linear infinite;


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

.carousel--track--mobile--1-1 {
  @apply row-start-1 row-end-2;
  animation: infinite-move-mobile-1-1 30s linear infinite;

  @keyframes infinite-move-mobile-1-1 {
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

.carousel--track--mobile--1-2 {
  @apply row-start-1 row-end-2;
  animation: infinite-move-mobile-1-2 30s linear infinite;

  @keyframes infinite-move-mobile-1-2 {
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

.carousel--track--mobile--2-1 {
  @apply row-start-2 row-end-3;

  animation: infinite-move-mobile-2-1 30s linear infinite;

  @keyframes infinite-move-mobile-2-1 {
    0% {
      transform: translateX(0%);
    }

    50% {
      transform: translateX(50%);
    }

    100% {
      transform: translateX(100%);
    }
  }
}

.carousel--track--mobile--2-2 {
  @apply row-start-2 row-end-3;

  animation: infinite-move-mobile-2-2 30s linear infinite;

  @keyframes infinite-move-mobile-2-2 {
    0% {
      transform: translateX(-100%);
    }

    50% {
      transform: translateX(-50%);
    }

    100% {
      transform: translateX(0%);
    }
  }
}


.carousel--item {
  @apply text-center flex flex-col items-center justify-center bg-primary rounded-xl shadow-xl text-bgPrimary w-44 lg:w-96 h-full dark:bg-[#475569] font-bold;

}

.container-grid {
  background-image: url('https://res.cloudinary.com/ddc0cce3m/image/upload/v1699379792/QuizGod/bg-quizgod_zse0pb.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>