<template>
<div>
<div>Hello Quiz</div>
<Question></Question>

</div>
</template>

<script>
import Question from '../components/Question.vue'

export default {
  name: "Quiz",
  components:{
        Question
        
    }, data(){
    return{
      recievedData: this.$route.params.data
    }
  },
  // created(){
  //   this.recievedData = this.$route.params.data;
  // }
}
</script>

<style scoped>

</style>