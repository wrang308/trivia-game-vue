<template>
  <div>
Quiz results component
    <table>
      <thead>
      <th>Question</th>
      <th>Your Answer</th>
      <th>Correct Answer</th>
      </thead>
      <tr v-for="(item, index) in stats.questions.results" :key="item">
        <td v-html="item.question"></td>
        <td v-bind:style="[stats.userAnswers[index] === item.correct_answer ? {'color':'green'} : {'color':'red'}]">{{stats.userAnswers[index]}}</td>
        <td>{{item.correct_answer}}</td>
      </tr>
    </table>
    <div>Result : {{result}} points !</div>
    <button @click="goBack()" v-html="'Got to Start'"/>
    <button @click="goBackToQuiz()" v-html="'Play again'"/>

  </div>

</template>

<script>
export default {
  name: "QuizResults",
  props:{
    userAnswersProp: [Object, Array],
    questionsProp: [Object, Array],
    quizInfoProp: [Object, Array],
  },
  data(){
    return{
      stats:{
        userAnswers: [],
        questions:{},
        quizInfo:{}
      },
      result: 0
    }
  },
  created(){
    this.stats.userAnswers = this.userAnswersProp;
    this.stats.questions = this.questionsProp;
    this.stats.quizInfo = this.quizInfoProp;
    for(let i = 0; i < this.stats.questions.results.length; i++){
      if(this.stats.userAnswers[i] === this.stats.questions.results[i].correct_answer){
        this.result += 10
      }
      localStorage.stats = JSON.stringify(this.stats);
      localStorage.result = String(this.result);

    }
  },
  mounted(){
    if(localStorage.stats){
      this.stats = JSON.parse(localStorage.stats);
    }
    if(localStorage.result){
      this.result = parseInt(localStorage.result)
    }
  },
  methods:{
    goBack: function(){
      this.$router.go(-2);
      localStorage.clear();
    },
    goBackToQuiz: function(){
      this.$router.push({name:'Quiz', params:{data: this.stats.quizInfo}})
      localStorage.clear();
    }
  }
}
</script>

<style scoped>

</style>