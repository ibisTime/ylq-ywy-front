import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('pages/home/home');

// 用户
const User = () => import('pages/user/user');
// 设置
const Setting = () => import('pages/setting/setting');
// 修改手机号
const ChangeMobile = () => import('pages/change-mobile/change-mobile');
// 修改密码
const ChangePwd = () => import('pages/change-pwd/change-pwd');

// 我的客户
const Customers = () => import('pages/customers/customers');
// 联系客服
const Service = () => import('pages/service/service');
// 登录
const Login = () => import('pages/login/login');
// 注册
const Register = () => import('pages/register/register');
// 找回密码
const FindPwd = () => import('pages/find-pwd/find-pwd');
// 资信报告
const myTemplet = () => import('pages/my-templet/my-templet');
// 模板详情
const templetDetails = () => import('pages/templet-details/templet-details');
// 接口详情
const interfaceDetails = () => import('pages/interface-details/interface-details');
// 联系商务
const contactBusiness = () => import('pages/contact-business/contact-business');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/my-templet',
      component: myTemplet
    }, {
      path: '/templet-details',
      component: templetDetails
    }, {
      path: '/interface-details',
      component: interfaceDetails
    }, {
      path: '/contact-business',
      component: contactBusiness
    }, {
      path: '/user',
      component: User,
      children: [
        {
          path: 'setting',
          component: Setting,
          children: [
            {
              path: 'change-mobile',
              component: ChangeMobile
            },
            {
              path: 'change-pwd',
              component: ChangePwd
            }
          ]
        }
      ]
    }, {
      path: '/customers',
      component: Customers
    }, {
      path: '/service',
      component: Service
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/register',
      component: Register
    }, {
      path: '/find-pwd',
      component: FindPwd
    }
  ]
});
