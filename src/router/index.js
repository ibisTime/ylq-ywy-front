import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 首页
const Home = () => import('pages/home/home');

// 用户
const User = () => import('pages/user/user');
// 帮助中心
const Help = () => import('pages/help/help');
// 橙券充值
const Recharge = () => import('pages/recharge/recharge');
// 橙券转赠
const Transfer = () => import('pages/transfer/transfer');
// 操作指南
const Question = () => import('pages/question/question');
// 转增处理（充值订单）
const Orders = () => import('pages/orders/orders');
// 审核
const Check = () => import('pages/check/check');
// 账单
const Bills = () => import('pages/bills/bills');
// 设置
const Setting = () => import('pages/setting/setting');
// 修改昵称
const ChangeNickname = () => import('pages/change-nickname/change-nickname');
// 修改手机号校验
const ChangeValid = () => import('pages/change-valid/change-valid');
// 修改手机号
const ChangeMobile = () => import('pages/change-mobile/change-mobile');
// 修改密码
const ChangePwd = () => import('pages/change-pwd/change-pwd');
// 实名认证
const Certification = () => import('pages/certification/certification');
// 关于我们
const AboutUs = () => import('pages/about-us/about-us');

// 我的客户
const Customers = () => import('pages/customers/customers');
// 客户详情
const Report = () => import('pages/report/report');
// 转发报告
const Transmit = () => import('pages/transmit/transmit');
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
// 修改模板名称
const changeTempletName = () => import('pages/change-templetname/change-templetname');
// 修改是否默认
const changeDefault = () => import('pages/change-default/change-default');
// 发送客户
const sendToClient = () => import('pages/send-to-client/send-to-client');
// 接口详情
const interfaceDetails = () => import('pages/interface-details/interface-details');
// 联系商务
const contactBusiness = () => import('pages/contact-business/contact-business');
// app二维码
const Qrcode = () => import('pages/qrcode/qrcode');
// app下载页
const Download = () => import('pages/download/download');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home,
      children: [{
        path: 'qrcode',
        component: Qrcode
      }, {
        path: 'contact-business',
        component: contactBusiness
      }, {
        path: 'orders',
        component: Orders,
        children: [{
          path: 'check',
          component: Check
        }]
      }]
    }, {
      path: '/my-templet',
      component: myTemplet,
      children: [
        {
          path: 'templet-details',
          name: 'templet-details',
          component: templetDetails,
          children: [{
            path: 'interface-details',
            name: 'interface-details',
            component: interfaceDetails
          }, {
            path: 'change-templetname',
            name: 'change-templetname',
            component: changeTempletName
          }, {
            path: 'change-default',
            name: 'change-default',
            component: changeDefault
          }, {
            path: 'send-to-client',
            name: 'send-to-client',
            component: sendToClient
          }]
        }
      ]
    }, {
      path: '/user',
      component: User,
      children: [
        {
          path: 'bills',
          component: Bills
        }, {
          path: 'help',
          component: Help
        }, {
          path: 'question',
          component: Question
        }, {
          path: 'setting',
          component: Setting,
          children: [
            {
              path: 'change-nickname',
              component: ChangeNickname
            },
            {
              path: 'change-valid',
              component: ChangeValid
            },
            {
              path: 'change-mobile',
              component: ChangeMobile
            },
            {
              path: 'change-pwd',
              component: ChangePwd
            },
            {
              path: 'certification',
              component: Certification
            },
            {
              path: 'about-us',
              component: AboutUs
            }
          ]
        },
        {
          path: 'service',
          component: Service
        }, {
          path: 'recharge',
          component: Recharge
        }, {
          path: 'transfer',
          component: Transfer
        }
      ]
    }, {
      path: '/customers',
      component: Customers,
      children: [
        {
          path: ':code',
          component: Report,
          children: [{
            path: 'transmit',
            component: Transmit
          }]
        }
      ]
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
    }, {
      path: '/download',
      component: Download
    }
  ]
});
