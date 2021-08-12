<template>
  <div id="home">
    <div id="header">
      <p>Welcome to Open Trivia</p>
    <span id="desc">Please select an amount of questions, difficulty level and category</span>
    </div>
  <welcome id="welcome"></welcome>
  </div>
</template>

<script>

import Welcome from '../components/Welcome.vue'

export default{
    name: 'Home',
    components:{
        Welcome
        
    }
}



</script>
<style scoped>
#home{
  padding-top: 5%;

}
#header{
  font-size: 50px;
  margin: 10px;
}
#desc{
  font-size: 20px;
}


</style>
