<template>
    <div v-if="questions">questions
      <div v-bind="index">
        <span v-html="questions.results[index].question"></span>
      </div>
      <div v-if="questions.results[index].type ==='multiple'">
      <button id="0" class="multiAnsw" @click="nextQuestion($event)" v-html="questionAnswers[0]"/>
      <button id="1" class="multiAnsw" @click="nextQuestion($event)" v-html="questionAnswers[1]"/>
      <button id="2" class="multiAnsw" @click="nextQuestion($event)" v-html="questionAnswers[2]"/>
      <button id="3" class="multiAnsw" @click="nextQuestion($event)" v-html="questionAnswers[3]"/>
      </div>
      <div v-else>
        <button id="true" @click="nextQuestion($event)" v-html="questionAnswers[0]"/>
        <button id="false" @click="nextQuestion($event)" v-html="questionAnswers[1]"/>
      </div>
    </div>



</template>
<script>

export default {
  name: 'Question',
  props:{
    quizInfoProp: [Object, Array]
  },
  data(){
    return{
      quizInfo:null,
      index:0,
      questions:null,
      userAnswers:[],
      url:'https://opentdb.com/api.php',
      questionAnswers:[]
      //correctAnswerIndex: ""
      
    }
  },
  created() {
    if(this.quizInfo != null){
    this.quizInfo = this.quizInfoProp;
   this.url += '?amount='+this.quizInfo.amount;
   if(this.quizInfo.difficulty !== '-1'){
     this.url += '&difficulty='+this.quizInfo.difficulty;
   }
   if(this.quizInfo.category !== -1){
     this.url += '&category='+this.quizInfo.category;
   }
   //this.url += "&encode=url3986";

    fetch(this.url)
        .then(response => response.json())
        .then(data => this.questions = data)
        .then(data => {
            if(data.response_code ===1){
              alert("Wrong request");
                this.$router.go(-1)
            }else this.asignAnswers();

        })
        .catch((error) => {
          console.log(error)
        });
    }

  },
  /**
   * Watch method that listens to 'index' variable and check if it is equal to the amount of questions.
   * If boolean is true we are redirected to the 'Result' view and params are sent as well.
   */
  watch:{
    quizInfo(){
      localStorage.quizInfo = JSON.stringify(this.quizInfo);
    },
    index(){
      localStorage.index = String(this.index);
      if(this.index >= this.quizInfo.amount){
        alert("Quiz is finished")
        this.$router.push({name: 'Result', params:{userAnswers: this.userAnswers, quizInfo: this.quizInfo, questions: this.questions}})
        localStorage.clear();
      }
    },
    questions(){
      localStorage.questions = JSON.stringify(this.questions);
    },
    userAnswers:{
      handler(newAnswers){
        localStorage.userAnswers = JSON.stringify(newAnswers);
      }, deep: true
    },
    url(){
      localStorage.url = this.url;
    },
    questionAnswers(){
      localStorage.questionAnswers = JSON.stringify(this.questionAnswers);
    }
  },
  mounted(){
    if(localStorage.quizInfo){
      this.quizInfo = JSON.parse(localStorage.quizInfo);
    }
    if(localStorage.index){
      this.index = parseInt(localStorage.index);
    }
    if(localStorage.questions){
      this.questions = JSON.parse(localStorage.questions);
    }
    if(localStorage.userAnswers){
      this.userAnswers = JSON.parse(localStorage.userAnswers);
    }
    if(localStorage.url){
      this.url = localStorage.url;
    }
    if(localStorage.questionAnswers){
      this.questionAnswers = JSON.parse(localStorage.questionAnswers);
    }

  },
  methods:{
    /**
     * Takes string and decodes it into html code e.g &#039 => '
     */
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    /**
     * Handles the logic when an answer is submitted and redirects the user to the next question
     */
    nextQuestion: function(e){
      //logic to handle right or wrong answer
      console.log(e.target)
      this.registerUserAnswers(e.target.innerHTML)
      this.questions.results[this.index].correct_answer = this.decodeHtml(this.questions.results[this.index].correct_answer);
      this.index ++
      this.asignAnswers();
      console.log(e.target.id)
    },
    /**
     * Adds the users answer to the answer array
     */
    registerUserAnswers: function(value){
        this.userAnswers.push(value)
    },
    /**
     * Adds the different answer to the questionAnswers array and shuffles the array 
     */
    asignAnswers(){
        let answers = [...this.questions.results[this.index].incorrect_answers, this.questions.results[this.index].correct_answer];
        this.questionAnswers = answers;
        this.randomize();


    },
    /**
     * logic for shuffling the array using Fisher–Yates shuffle algorithm 
     */
    randomize() {
      for (let i = this.questionAnswers.length - 1; i > -1; i--) {
        let randomIndex = Math.floor(Math.random() * i+1);
        let temp = this.questionAnswers[i];
        this.$set(this.questionAnswers, i, this.questionAnswers[randomIndex]);
        this.$set(this.questionAnswers, randomIndex, temp);
      }
    }
  }


}
</script>

<style scoped>
.multiAnsw{
  height: 50px;
  width: 200px;
}

</style>