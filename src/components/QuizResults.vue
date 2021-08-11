<template>
  <div>
Quiz results component
    <table>
      <thead>
      <th>Question</th>
      <th>Your Answer</th>
      <th>Correct Answer</th>
      </thead>
      <tr v-for="(item, index) in quizQuestions.results" :key="item">
        <td v-html="item.question"></td>
        <td v-bind:style="[userAnswers[index] === item.correct_answer ? {'color':'green'} : {'color':'red'}]">{{userAnswers[index]}}</td>
        <td>{{item.correct_answer}}</td>
      </tr>
    </table>
    <div>Result : {{result}} points !</div>
    <button @click="this.$router.go(-2)" v-html="'Got to Start'"/>
  </div>

</template>

<script>
export default {
  name: "QuizResults",
  props:{
    userAnswers: [Object, Array],
    quizQuestions: [Object, Array],
    quiz: [Object, Array],
  },
  data(){
    return{
      result:0
    }
  },
  created(){
    for(let i = 0; i < this.quizQuestions.results.length; i++){
      if(this.userAnswers[i] === this.quizQuestions.results[i].correct_answer){
        this.result += 10
      }

    }
  }
}
</script>

<style scoped>

</style>