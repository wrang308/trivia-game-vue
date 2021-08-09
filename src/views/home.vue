<template>
  <div>
    <div>hej!</div>
  <router-link :to="{ path: '/quiz' }">Quiz</router-link>
  <welcome></welcome>
  </div>
</template>

<script>

import Welcome from '../components/welcome.vue'

export default{
    name: 'home',
    components:{
        Welcome
        
    }
}



</script>
