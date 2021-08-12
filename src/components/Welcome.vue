<template>
    <div>
        Hello component!
        <div>amount of questions</div>
        <select id="amount" @change="onChange($event)">
            <option v-for="amount in amounts" :key="amount">{{amount}}</option>
        </select>

        <div>difficulty</div>
        <select id="difficulties" @change="onChange($event)">
            <option value="-1">All difficulties</option>
            <option v-for="difficulty in difficulties" :key="difficulty">{{difficulty}}</option>
        </select>
        
        <div>categories</div>
        <select id="categories" @change="onChange($event)">
            <option value="-1">All categories</option>
            <option v-for="category in categories.trivia_categories" :key="category.id" :value="category.id" >{{category.name}}</option>
        </select>
        
        <router-link :to="{ name:'Quiz', params: { data: this.selectedData}} "><button>Quiz</button></router-link>

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
        selectedData: {amount: 5, difficulty: "-1", category: -1}
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
        /**
         * Handles the change on the different selects and updates the selected data every time a select is changed
         */
        onChange: function(e){
            switch(e.target.id) {
            case "amount":
                this.selectedData.amount = e.target.value;
                break;
            case "difficulties":
                this.selectedData.difficulty = e.target.value;
                break;
            case "categories":
                this.selectedData.category = e.target.value;
                break;
            default:
                console.log("error, no match");
            }

        }
    }

}


</script>

<style scoped>

</style>
