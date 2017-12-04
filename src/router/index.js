import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('pages/home/home');
// 用户
const User = () => import('pages/user/user');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/user',
      component: User
    }
  ]
});
