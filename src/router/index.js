import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/pages/Home/Home";
const Order = () => import('@/pages/Home/Order');
const OrderRecord = () => import('@/pages/Home/OrderRecord');
const OrderRecordDetail = () => import('@/pages/Home/OrderRecordDetail');

import Record from "@/pages/Record/Record";
const RecordDetail = () => import('@/pages/Record/RecordDetail');

import Person from '@/pages/Person/Person';
const Login = () => import('@/pages/Person/Login');
const Register = () => import('@/pages/Person/Register');
const ConfirmPay = () => import('@/pages/Person/ConfirmPay');
const ForgetPassword = () => import('@/pages/Person/ForgetPassword');
const Topup = () => import('@/pages/Person/Topup');
const BindBankcard = () => import('@/pages/Person/BindBankcard');
const Withdrawals = () => import('@/pages/Person/Withdrawals');
const Personal = () => import('@/pages/Person/Personal');
const AccountRecord = () => import('@/pages/Person/AccountRecord');
const AccountRecordDetail = () => import('@/pages/Person/AccountRecordDetail');
const PayResult = () => import('@/pages/Person/PayResult');
const PayList = () => import('@/pages/Person/PayList');
const CashOut = () => import('@/pages/Person/CashOut');
const CustomerList = () => import('@/pages/Person/CustomerList');
const PlayIntruction = () => import('@/pages/Person/PlayIntruction');




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: ' ',
        showTab: true,
      }
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
      meta: {
        title: ' - 战绩',
        showTab: true,
        requireAuth: true,
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        title: ' - 我的',
        showTab: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: ' - 登录',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: ' - 注册',
      }
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: ' - 忘记密码',
      }
    },
    {
      path: '/record-detail',
      name: 'RecordDetail',
      component: RecordDetail,
      meta: {
        title: ' - 订单详情',
        requireAuth: true,
      }
    },
    {
      path: '/topup',
      name: 'Topup',
      component: Topup,
      meta: {
        title: ' - 充值',
        requireAuth: true,
      }
    },
    {
      path: '/confirm-pay',
      name: 'ConfirmPay',
      component: ConfirmPay,
      meta: {
        title: ' - 充值',
        requireAuth: true,
      }
    },
    {
      path: '/bind-bankcard',
      name: 'BindBankcard',
      component: BindBankcard,
      meta: {
        title: ' - 绑定银行卡',
        requireAuth: true,
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: ' - 修改资料',

        requireAuth: true,
      }
    },
    {
      path: '/withdrawals',
      name: 'Withdrawals',
      component: Withdrawals,
      meta: {
        title: ' - 提现',
        requireAuth: true,
      },
      beforeEnter: (to, from, next) => {
        if (!this.a.app.$store || !this.a.app.$store.state.userInfo.bank
        || this.a.app.$store.state.userInfo.bank.length <= 0
        || Object.keys(this.a.app.$store.state.userInfo.bank).length <= 0) {
          next({name: 'BindBankcard'});
        } else {
          next();
        }
      }
    },
    {
      path: '/account-record',
      name: 'AccountRecord',
      component: AccountRecord,
      meta: {
        title: ' - 资金明细',
        requireAuth: true,
      }
    },
    {
      path: '/account-record-detail',
      name: 'AccountRecordDetail',
      component: AccountRecordDetail,
      meta: {
        title: ' - 资金详情',
        requireAuth: true,
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        title: ' ',
        requireAuth: true,
      }
    },
    {
      path: '/order-record',
      name: 'OrderRecord',
      component: OrderRecord,
      meta: {
        title: ' - 下注记录',
        requireAuth: true,
      }
    },
    {
      path: '/order-record-detail',
      name: 'OrderRecordDetail',
      component: OrderRecordDetail,
      meta: {
        title: ' ',
        requireAuth: true,
      }
    },
    {
      path: '/pay-result',
      name: 'PayResult',
      component: PayResult,
      meta: {
        title: ' - 交易详情',
      }
    },
    {
      path: '/pay-list',
      name: 'PayList',
      component: PayList,
      meta: {
        title: ' - 支付记录',
        requireAuth: true,
      }
    },
    {
      path: '/cashout-list',
      name: 'CashOut',
      component: CashOut,
      meta: {
        title: ' - 提现记录',
        requireAuth: true,
      }
    },
    {
      path: '/customer-list',
      name: 'CustomerList',
      component: CustomerList,
      meta: {
        title: ' - 我的客户',
        requireAuth: true,
      }
    },
    {
      path:'/play-intruction',
      name:'PlayIntruction',
      component:PlayIntruction,
      meta:{
        title:' - 游戏说明',
        requireAuth: true,
      }
    },




    // 必须放最后
    {
      path: '*',
      redirect: '/'
    },
  ],
})

