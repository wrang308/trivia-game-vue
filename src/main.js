import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './views/home';


Vue.use(VueRouter);
const routes = [
  {path: '/home', component: Home}
];
Vue.config.productionTip = false

const router = new VueRouter({
  routes : routes
})

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')


