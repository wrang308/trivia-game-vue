<template>
  <div class="rainBow">
    <Question style="width: 80%; margin: 50px 10%; height: calc(100vh - 100px)" :quizInfoProp="recievedData"></Question>

  </div>
</template>

<script>
import Question from '../components/QuizComponent.vue'

/**
 * Quiz View containing Quiz Component
 */
export default {
  name: "Quiz",
  components: {
    Question

  },
  /**
   * Assigning values from router  that will be send as props into child component
   * @returns {{recievedData: string}}
   */
  data() {
    return {
      recievedData: this.$route.params.data
    }
  }
}
</script>

<style scoped>

.rainBow {
  background: linear-gradient(-45deg, #E69C2E, #E73C7E, #23A6D5, #42E433);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  overflow-x: hidden;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>