import Vue from 'vue';
import Vuex from 'vuex';

import CONFIG from '@@/config';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    baseURL: CONFIG.baseURL, //api请求地址
    baseImgURL: CONFIG.baseImgURL, //图片请求地址前缀
    appVersion: 'v1.0.6', // app版本号
    isLogin: false, //登录状态
    userInfo: {}, //用户信息
    weChatShareInfo: {}, //微信分享参数
    config: {}, //配置信息
    cvs: '', //配置版本
    systemName: '', // 网站名字
    lookDay: '', //查看记录日期
  },
  mutations,
  actions,
})
