<template>
    <div>questions
      <div v-bind="index">
        {{decodeHtml(questions.results[index].question)}}
      </div>
      <div v-if="questions.results[index].type ==='multiple'">
      <button class="multiAnsw" @click="nextQuestion">{{decodeHtml(multiAnswer.a)}}</button>
      <button class="multiAnsw" @click="nextQuestion">{{decodeHtml(multiAnswer.b)}}</button>
      <button class="multiAnsw" @click="nextQuestion">{{decodeHtml(multiAnswer.c)}}</button>
      <button class="multiAnsw" @click="nextQuestion">{{decodeHtml(multiAnswer.d)}}</button>
      </div>
      <div v-else>
        <button @click="nextQuestion">TRUE</button>
        <button @click="nextQuestion">FALSE</button>
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
      multiAnswer:{
        a:"",
        b:"",
        c:"",
        d:""
      }


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
  methods:{
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    nextQuestion: function(){
      //logic to handle right or wrong answer
      this.index ++
      this.asignMultipleAnswers();
    },
    asignMultipleAnswers(){
      if(this.questions.results[this.index].type === 'multiple'){
        //logic to randomize answers
        this.multiAnswer.a = this.questions.results[this.index].correct_answer;
        this.multiAnswer.b = this.questions.results[this.index].incorrect_answers[0];
        this.multiAnswer.c = this.questions.results[this.index].incorrect_answers[1];
        this.multiAnswer.d = this.questions.results[this.index].incorrect_answers[2];
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