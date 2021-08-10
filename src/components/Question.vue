<template>
    <div>questions
      <div v-bind="index">
        {{decodeHtml(questions.results[index].question)}}
      </div>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
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
      url:'https://opentdb.com/api.php'


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
            }
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
    }
  }


}
</script>

<style scoped>

</style>