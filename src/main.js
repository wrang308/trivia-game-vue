import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './views/home';
import Quiz from './views/quiz';


Vue.use(VueRouter);
const routes = [
  {path: '/', component: Home},
  {path:'/quiz', component: Quiz}
];
Vue.config.productionTip = false

const router = new VueRouter({
  routes : routes
})

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')


