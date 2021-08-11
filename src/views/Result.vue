<template>
<div>
  <QuizResults :user-answers="userAnswers" :quiz-questions="quizQuestions" :quiz="quiz"></QuizResults>
</div>
</template>

<script>
import QuizResults from "../components/QuizResults";
export default {
  name: "Result",
  components:{
    QuizResults
  },
  data(){
    return{
    userAnswers: this.$route.params.userAnswers,
    quizQuestions: this.$route.params.questions,
    quiz: this.$route.params.quizInfo
     }
  }


}
</script>

<style scoped>

</style>