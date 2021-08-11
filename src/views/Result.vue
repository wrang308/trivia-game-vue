<template>
<div>
  Here are the results
</div>
</template>

<script>
export default {
  name: "Result",
  data(){
    return{
    answers: this.$route.params.userAnswers,
    quizQuestions: this.$route.params.questions,
    quiz: this.$route.params.quizInfo
     }
  }
}
</script>

<style scoped>

</style>