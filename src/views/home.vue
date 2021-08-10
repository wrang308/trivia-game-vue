<template>
  <div>
    <div>hej!</div>
  <router-link :to="{ path: '/Quiz' }">Quiz</router-link>
  <welcome></welcome>
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
