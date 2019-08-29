/**
 * 同步更改state的方法文件
 * 在组件内通过this.$store.commit(fnname, payload)调用
 */

export default {
  // 计数加一
  // increment(state, payload) {
  //     state.count += payload.amount;
  // },

  // 设置用户信息
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },

  // 设置登录状态
  setLoginStatus(state, payload) {
    state.isLogin = payload;
  },

  // 修改用户信息
  editUserInfo(state, payload) {
    for(var key in payload) {
      state['userInfo'][key] = payload[key];
    }
  },

  // 设置微信分享参数
  setWeChatShareInfo(state, payload) {
    state.weChatShareInfo = payload;
  },

  // 设置配置信息
  setConfig(state, payload) {
    state.config = payload;
  },

  // 设置配置信息版本
  setCvs(state, payload) {
    state.cvs = payload;
  },

  // 设置网站名字
  setSystemName(state, payload) {
    state.systemName = payload;
  },

  // 设置战绩记录日期
  setLookDay(state, payload) {
    state.lookDay = payload;
  },

}
