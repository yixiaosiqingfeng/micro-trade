/**
 * 异步更改state的方法文件
 * 在组件内通过this.$store.dispatch(fnname, payload)调用
 * 可以通过return new Promise(function(resolve, reject) {})的方法传递promise，
 * 这样就可以使用this.$store.dispatch(fnname, payload).then()来进行异步的回调操作了
 */
import api from '@/assets/js/api';

export default {
  // 计数加一
  // incrementAsync({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit('increment', payload);
  //       resolve();
  //     }, 3000);
  //   });
  // },

  // 登录
  // login({ commit }, payload) {
  //   return api.login(payload)
  //   .then(res => {
  //     if (res.code === '00') {
  //       commit('setUserInfo', res.data);
  //       commit('setLoginStatus', true);
  //     }
  //     return res;
  //   })
  // }



}
