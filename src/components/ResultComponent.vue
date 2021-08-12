<template>
  <div v-if="stats.questions">
    <div class="title">Quiz results</div>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style="opacity: 0.75;">
      <thead>
      <th>Question</th>
      <th>Your Answer</th>
      <th>Correct Answer</th>
      </thead>
      <tr v-for="(item, index) in stats.questions.results" :key="index">
        <td v-html="item.question"></td>
        <td v-bind:style="[stats.userAnswers[index] === item.correct_answer ? {'color':'green'} : {'color':'red'}]"
            v-html="stats.userAnswers[index]"/>
        <td v-html="item.correct_answer"/>
      </tr>
    </table>
    <div class="title">Result : {{ result }} points</div>
    <button class="button" @click="goBack()" v-html="'Got to Start'"/>
    <button class="button" @click="goBackToQuiz()" v-html="'Play again'"/>

  </div>

</template>

<script>
export default {
  name: "QuizResults",
  props: {
    userAnswersProp: [Object, Array],
    questionsProp: [Object, Array],
    quizInfoProp: [Object, Array],
  },
  data() {
    return {
      stats: {
        userAnswers: [],
        questions: null,
        quizInfo: {}
      },
      result: 0
    }
  },
  /**
   * Assigning data from props
   */
  created() {
    this.stats.userAnswers = this.userAnswersProp;
    this.stats.questions = this.questionsProp;
    this.stats.quizInfo = this.quizInfoProp;
    if (this.stats.questions != null) {
      for (let i = 0; i < this.stats.questions.results.length; i++) {
        if (this.stats.userAnswers[i] === this.stats.questions.results[i].correct_answer) {
          this.result += 10
        }
      }
      localStorage.stats = JSON.stringify(this.stats);
      localStorage.result = String(this.result);

    }
  },
  /**
   * Recovering data from Local Storage when browser have been refreshed
   */
  mounted() {
    if (localStorage.stats) {
      this.stats = JSON.parse(localStorage.stats);
    }
    if (localStorage.result) {
      this.result = parseInt(localStorage.result)
    }
  },
  /**
   * Router methods that re-direct us to other views and clear our Local Storage
   */
  methods: {
    goBack: function () {
      this.$router.push({name: 'Home'})
      localStorage.clear();
    },
    goBackToQuiz: function () {
      this.$router.push({name: 'Quiz', params: {data: this.stats.quizInfo}})
      localStorage.clear();
    }
  }
}
</script>

<style scoped>
.button {
  margin: 10px;
}
.title{
  color: white; 
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
}
</style>