<template>
    <div>questions
      <div v-bind="index">
        {{decodeHtml(questions.results[index].question)}}
      </div>
      <div v-if="questions.results[index].type ==='multiple'">
      <button id="0" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(questionAnswers[0])}}</button>
      <button id="1" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(questionAnswers[1])}}</button>
      <button id="2" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(questionAnswers[2])}}</button>
      <button id="3" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(questionAnswers[3])}}</button>
      </div>
      <div v-else>
        <button id="true" @click="nextQuestion($event)">TRUE</button>
        <button id="false" @click="nextQuestion($event)">FALSE</button>
      </div>
    </div>



</template>
<script>

export default {
  name: 'Question',
  props:{
    quizInfo: [Object, Array]
  },
  data(){
    return{
      index:0,
      questions:{},
      userAnswers:[],
      url:'https://opentdb.com/api.php',
      questionAnswers:[]
      //correctAnswerIndex: ""
      
    }
  },
  created() {
   this.url += '?amount='+this.quizInfo.amount;
   if(this.quizInfo.difficulty !== -1){
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
            }else this.asignMultipleAnswers();

        })
        .catch((error) => {
          console.log(error)
        });

  },
  /**
   * Watch method that listens to 'index' variable and check if it is equal to the amount of questions.
   * If boolean is true we are redirected to the 'Result' view and params are sent as well.
   */
  watch:{
    index(){
      if(this.index === this.quizInfo.amount){
        alert("Quiz is finished")
        this.$router.push({name: 'Result', params:{userAnswers: this.userAnswers, quizInfo: this.quizInfo, questions: this.questions}})
      }
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
      this.registerUserAnswers(e.target.innerHTML)
      this.index ++
      this.asignMultipleAnswers();
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
    asignMultipleAnswers(){
      if(this.questions.results[this.index].type === 'multiple'){
        let answers = [...this.questions.results[this.index].incorrect_answers, this.questions.results[this.index].correct_answer];
        this.questionAnswers = answers;
        this.randomize();

      }
    },
    /**
     * logic for shuffling the array using Fisher–Yates shuffle algorithm 
     */
    randomize() {
      for (let i = this.questionAnswers.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
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