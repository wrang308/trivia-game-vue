<template>
    <div>questions
      <div v-bind="index">
        {{decodeHtml(questions.results[index].question)}}
      </div>
      <div v-if="questions.results[index].type ==='multiple'">
      <button id="0" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(multiAnswer[0])}}</button>
      <button id="1" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(multiAnswer[1])}}</button>
      <button id="2" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(multiAnswer[2])}}</button>
      <button id="3" class="multiAnsw" @click="nextQuestion($event)">{{decodeHtml(multiAnswer[3])}}</button>
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
      multiAnswer:[]
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
  watch:{
    index(){
      if(this.index === this.quizInfo.amount){
        alert("Quiz is finished")
      }
    }
  },
  methods:{
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    nextQuestion: function(e){
      //logic to handle right or wrong answer
      this.registerUserAnswers(e.target.innerHTML)
      this.index ++
      this.asignMultipleAnswers();
      console.log(e.target.id)
    },
    registerUserAnswers: function(value){
        this.userAnswers.push(value)
    },
    asignMultipleAnswers(){
      if(this.questions.results[this.index].type === 'multiple'){
        //logic to randomize answers
        let answers = [...this.questions.results[this.index].incorrect_answers, this.questions.results[this.index].correct_answer];
       
        this.multiAnswer = answers;
        this.randomize();
     //   this.findCorrectAnswerIndex();

      }
    },
    // Using Fisher–Yates shuffle algorithm
    randomize() {
      for (let i = this.multiAnswer.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        let temp = this.multiAnswer[i];
        this.$set(this.multiAnswer, i, this.multiAnswer[randomIndex]);
        this.$set(this.multiAnswer, randomIndex, temp);
      }
    }//,
    // findCorrectAnswerIndex(){
    //   for(let i = 0 ; i < this.multiAnswer.length; i++){
    //     if(this.questions.results[this.index].correct_answer === this.multiAnswer[i]){
    //       this.correctAnswerIndex = i;
    //       console.log(i)
    //       break;
    //     }
    //   }
    // }
  }


}
</script>

<style scoped>
.multiAnsw{
  height: 50px;
  width: 200px;
}

</style>