<template>

<div>
  <QuizResults :userAnswersProp="userAnswers" :questionsProp="questions" :quizInfoProp="quizInfo"></QuizResults>
</div>
</template>

<script>
import QuizResults from "../components/ResultComponent";
export default {
  name: "Result",
  components:{
    QuizResults
  },
  data(){
    return{
    userAnswers: this.$route.params.userAnswers,
    questions: this.$route.params.questions,
    quizInfo: this.$route.params.quizInfo
     }
  },



}
</script>

<style scoped>

</style>