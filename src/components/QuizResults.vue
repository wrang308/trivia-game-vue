<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css" integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM=" crossorigin="anonymous" />
Quiz results component
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
      <th>Question</th>
      <th>Your Answer</th>
      <th>Correct Answer</th>
      </thead>
      <tr v-for="(item, index) in stats.questions.results" :key="item">
        <td v-html="item.question"></td>
        <td v-bind:style="[stats.userAnswers[index] === item.correct_answer ? {'color':'green'} : {'color':'red'}]">{{stats.userAnswers[index]}}</td>
        <td v-html="item.correct_answer"/>
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
      this.$router.push({name:'Home'})
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