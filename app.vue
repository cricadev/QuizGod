<template>
  <div>
    <h1>QuizGod</h1>
    <ToggleTheme></ToggleTheme>
    <img src="/logo-color.png" class="fixed top-4 left-1/2 translate-x-[-50%]" alt="">
  </div>
</template>
<script setup>
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

</script>