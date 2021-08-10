<template>
    <div>
        Hello component!
        <div>amount of questions</div>
        <select>
            <option v-for="amount in amounts" :key="amount">{{amount}}</option>
        </select>

        <div>diffulcty</div>
        <select>
            <option>All difficulties</option>
            <option v-for="diffulcty in difficulties" :key="diffulcty">{{diffulcty}}</option>
        </select>
        
        <div>diffulcty</div>
        <select>
            <option>All categories</option>
            <option v-for="category in categories.trivia_categories" :key="category.id">{{category.name}}</option>
        </select>
        
        <button><router-link :to="{ path: '/Quiz' }">Quiz</router-link></button>

    </div>
</template>

<script>


export default {
 name:'Welcome',
data(){
    return{
        amounts:[5,10,15,20,25,30,35,40,45,50],
        difficulties:["easy", "medium", "hard"],
        categories:[]
    };
},

    created(){
        fetch("https://opentdb.com/api_category.php")
    .then(response => response.json())
    .then(data => this.categories = data)
    .catch((error) => {
        console.log(error)
    });
    }

}


</script>

<style scoped>

</style>
