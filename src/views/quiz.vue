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
        
    }
}
</script>

<style scoped>

</style>