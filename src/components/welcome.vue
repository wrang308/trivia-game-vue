<template>
    <div>
        Hello component!

        <select>
        <option v-for="amount in amounts" :key="amount">{{amount}}</option>
    
        </select>
        
        <select>
        <option v-for="diffulcty in difficulties" :key="diffulcty">{{diffulcty}}</option>
    
        </select>
        
    </div>
</template>

<script>



export default {
 name:'welcome',
data(){
    return{
        amounts:[5,10,15,20,25,30,35,40,45,50],
        difficulties:["easy", "medium", "hard"]
    };
}
}
</script>
