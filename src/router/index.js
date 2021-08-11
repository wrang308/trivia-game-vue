import Vue from 'vue';
import Home from '../views/Home';
import Quiz from '../views/Quiz';
import Result from "../views/Result";
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home',component: Home},
    {path:'/Quiz', name:'Quiz',component: Quiz},
    {path:'/Result', name:'Result',component: Result}

];

const router = new VueRouter({
    routes
})

export default router