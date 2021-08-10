<template>
    <div>
        Hello component!
        <div>amount of questions</div>
        <select id="amount">
            <option v-for="amount in amounts" :key="amount">{{amount}}</option>
        </select>

        <div>diffulcty</div>
        <select id="difficulties">
            <option>All difficulties</option>
            <option v-for="diffulcty in difficulties" :key="diffulcty">{{diffulcty}}</option>
        </select>
        
        <div>diffulcty</div>
        <select id="trivia_categories" @change="onChange($event)">
            <option value="-1">All categories</option>
            <option v-for="category in categories.trivia_categories" :key="category.id" :value="category.id" >{{category.name}}</option>
        </select>
        
        <button><router-link :to="{ path: '/Quiz', params: selectedData}">Quiz</router-link></button>

    </div>
</template>

<script>


export default {
 name:'Welcome',
data(){
    return{
        amounts:[5,10,15,20,25,30,35,40,45,50],
        difficulties:["easy", "medium", "hard"],
        categories:[],
        selectedData: {amount: 5, diffulcty: "", category: 10}
    };
},

    created(){
        fetch("https://opentdb.com/api_category.php")
    .then(response => response.json())
    .then(data => this.categories = data)
    .catch((error) => {
        console.log(error)
    });
    }, methods:{
        onChange: function(e){
            console.log(e.target.value)
            this.selectedData.category = e.target.value;
            

        }
    }

}


</script>

<style scoped>

</style>
