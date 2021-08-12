<template>
  <div>
    <div id="menu">



      <div class="menuOption">
    <div>Amount of questions</div>
    <div class="select is-small">
    <select  class="dropdown is-active" id="amount" @change="onChange($event)">
      <option class="dropdown-content" v-for="amount in amounts" :key="amount">{{ amount }}</option>
    </select>
    </div>
      </div>

      <div class="menuOption">
    <div>Difficulty</div>
        <div class="select is-small">
    <select class="dropdown is-active" id="difficulties" @change="onChange($event)">
      <option class="dropdown-content" value="-1">All difficulties</option>
      <option class="dropdown-content" v-for="difficulty in difficulties" :key="difficulty">{{ difficulty }}</option>
    </select>
        </div>
      </div>

    <div class="menuOption">
    <div>Categories</div>
      <div class="select is-small">
    <select class="dropdown is-active" id="categories" @change="onChange($event)">
      <option class="dropdown-content" value="-1">All categories</option>
      <option class="dropdown-content" v-for="category in categories.trivia_categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
      </div>
    </div>

    </div>

    <router-link :to="{ name:'Quiz', params: { data: this.selectedData}}">
      <button id="play" class="button is-large">PLAY</button>
    </router-link>

  </div>
</template>

<script>


export default {
  name: 'Welcome',
  data() {
    return {
      amounts: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      difficulties: ["easy", "medium", "hard"],
      categories: [],
      selectedData: {amount: 5, difficulty: "-1", category: -1}
    };
  },

  created() {
    fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data => this.categories = data)
        .catch((error) => {
          console.log(error)
        });
  }, methods: {
    /**
     * Handles the change on the different selects and updates the selected data every time a select is changed
     */
    onChange: function (e) {
      switch (e.target.id) {
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
#menu{
  display: flex;
  justify-content: space-evenly;
  margin: 10px;

}
.menuOption{
  font-family: Tahoma;
  font-size: 30px;

  align-self: center;
}
.dropdown is-active{
  width: 100px;
  height: 100px;
}
.dropdown-content{
  font-size: 20px;
}
#play{
  border: solid black;
}


</style>
