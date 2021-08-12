<template>
  <div style="height: 100vh" v-if="questions">
    <div style="min-height: 30vh">
      <span id="question" v-html="questions.results[this.index].question"></span>
    </div>
    <div>
      <button v-for="item in questionAnswers" :key="item" class="button is-large is-fullwidth"
              @click="handleQuestion($event)" v-html="item"/>
    </div>

  </div>
</template>
<script>

export default {
  name: 'Question',
  props: {
    quizInfoProp: [Object, Array]
  },
  data() {
    return {
      quizInfo: {},
      index: 0,
      questions: null,
      userAnswers: [],
      url: 'https://opentdb.com/api.php',
      questionAnswers: []

    }
  },
  created() {
    /**
     * Parsing parameters for fetch request, and executing fetch of quiz questions and answers
     */
    if (this.quizInfoProp != null) {
      this.quizInfo = this.quizInfoProp;
      this.url += '?amount=' + this.quizInfo.amount;
      if (this.quizInfo.difficulty !== '-1') {
        this.url += '&difficulty=' + this.quizInfo.difficulty;
      }
      if (this.quizInfo.category !== -1) {
        this.url += '&category=' + this.quizInfo.category;
      }

      fetch(this.url)
          .then(response => response.json())
          .then(data => this.questions = data)
          .then(data => {
            if (data.response_code === 1) {
              alert("Something went wrong with your request, please try again with different parameters");
              this.$router.go(-1);
            } else this.asignAnswers();

          })
          .catch((error) => {
            console.log(error)
          });
    } else if (!localStorage.index) {
      this.$router.push({name: 'Home'})
    }

  },
  /**
   * Watch method that listens to 'index' variable and check if it is equal to the amount of questions.
   * If boolean is true we are redirected to the 'Result' view and params are sent as well.
   * Method listen to all the other values as well in our 'data' and save them at Local Storage to prevent loosing data when refreshing browser.
   */
  watch: {
    quizInfo() {
      localStorage.quizInfo = JSON.stringify(this.quizInfo);
    },
    index() {
      localStorage.index = String(this.index);
      if (this.index >= this.quizInfo.amount) {
        alert("Quiz is finished")
        this.$router.push({
          name: 'Result',
          params: {userAnswers: this.userAnswers, quizInfo: this.quizInfo, questions: this.questions}
        })
        localStorage.clear();
      }
    },
    questions() {
      localStorage.questions = JSON.stringify(this.questions);
    },
    userAnswers: {
      handler(newAnswers) {
        localStorage.userAnswers = JSON.stringify(newAnswers);
      }, deep: true
    },
    url() {
      localStorage.url = this.url;
    },
    questionAnswers() {
      localStorage.questionAnswers = JSON.stringify(this.questionAnswers);
    }
  },

  /**
   * Recovering data from Local Storage when browser have been refreshed
   */
  mounted() {
    if(this.quizInfoProp === undefined){
    if (localStorage.quizInfo) {
      this.quizInfo = JSON.parse(localStorage.quizInfo);
    }
    if (localStorage.index) {
      this.index = parseInt(localStorage.index);
    }
    if (localStorage.questions) {
      this.questions = JSON.parse(localStorage.questions);
    }
    if (localStorage.userAnswers) {
      this.userAnswers = JSON.parse(localStorage.userAnswers);
    }
    if (localStorage.url) {
      this.url = localStorage.url;
    }
    if (localStorage.questionAnswers) {
      this.questionAnswers = JSON.parse(localStorage.questionAnswers);
    }
    }
  },
  methods: {
    /**
     * Handles the logic when an answer is submitted and redirects the user to the next question
     */
    handleQuestion: function (e) {
      this.registerUserAnswers(e.target.innerHTML);
      this.index++;
      if (this.index < this.quizInfo.amount) {
        this.asignAnswers();
      }
    },
    /**
     * Adds the users answer to the answer array
     */
    registerUserAnswers: function (value) {
      this.userAnswers.push(value)
    },
    /**
     * Adds the different answer to the questionAnswers array and shuffles the array
     */
    asignAnswers() {
      let answers = [...this.questions.results[this.index].incorrect_answers, this.questions.results[this.index].correct_answer];
      this.questionAnswers = answers;
      this.questionAnswers = this.randomize(this.questionAnswers);

    },
    /**
     * logic for shuffling the array using Fisher–Yates shuffle algorithm
     */
    randomize(array) {
      let shuffledArray = [...array];
      let currentIndex = shuffledArray.length, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
          shuffledArray[randomIndex], shuffledArray[currentIndex]];
      }
      return shuffledArray;
    }
  }
}
</script>
<style scoped>
#question {
  font-size: 40px;
  font-weight: bold;
  color: white;
}
</style>