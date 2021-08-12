<template>

  <div>
    <QuizResults :userAnswersProp="userAnswers" :questionsProp="questions" :quizInfoProp="quizInfo"></QuizResults>
  </div>
</template>

<script>
import QuizResults from "../components/ResultComponent";

/**
 * Result View containing Result Component
 */
export default {
  name: "Result",
  components: {
    QuizResults
  },
  /**
   * Assigning values from router that will be send as props into child component
   * @returns {{userAnswers: string, quizInfo: string, questions: string}}
   */
  data() {
    return {
      userAnswers: this.$route.params.userAnswers,
      questions: this.$route.params.questions,
      quizInfo: this.$route.params.quizInfo
    }
  },
}
</script>
