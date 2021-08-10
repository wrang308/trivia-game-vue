import Vue from 'vue';
import Home from '../views/Home';
import Quiz from '../views/Quiz';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home',component: Home},
    {path:'/Quiz', name:'Quiz',component: Quiz}
];

const router = new VueRouter({
    routes
})

export default router