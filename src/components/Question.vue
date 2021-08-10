<template>
    <div>questions
      <div>
        What is this ?
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

    fetch(this.url)
        .then(response => response.json())
         .then(data => this.questions = data)
        .then(data => {
            if(data.response_code ===1){
                this.$router.go(-1)
            }
        })
        .catch((error) => {
          console.log(error)
        });


  }


}
</script>

<style scoped>

</style>