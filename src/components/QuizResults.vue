<template>
  <div>
Quiz results component
    <table>
      <thead>
      <th></th>
      <th></th>
      <th></th>
      </thead>
    </table>
  </div>

</template>

<script>
export default {
  name: "QuizResults",
  props:{
    userAnswers: [Object, Array],
    quizQuestions: [Object, Array],
    quiz: [Object, Array],
  }
}
</script>

<style scoped>

</style>