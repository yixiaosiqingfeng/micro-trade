/*所有后端请求方法*/
import axios from '@/assets/js/http';

export default {
  // 用户注册
  register(params) {
    return axios.post('/user/register', params)
    .then(res => res.data);
  },

  // 用户登录
  login(params) {
    return axios.post('/user/login', params)
    .then(res => res.data);
  },

  // 获取用户信息 如果已登录
  getUserInfo() {
    return axios.post('/user/info')
    .then(res => res.data);
  },

  // 登出
  logout(params) {
    return axios.post('/loginOut', params)
    .then(res => res.data);
  },

  // 获取配置信息
  getConfig() {
    return axios.post('/config')
    .then(res => res.data);
  },

  // 短信验证码
  getSms (params) {
    return axios.post('/sms', params)
    .then(res => res.data);
  },

  // 短信验证码
  forgetPassword (params) {
    return axios.post('/user/editPassword', params)
    .then(res => res.data);
  },

  // 获取支付方式
  getPayWay(params) {
    return axios.post('/payList', params)
    .then(res => res.data);
  },

  // 支付
  pay(params) {
    return axios.post('/pay', params)
    .then(res => res.data);
  },

  // 获取资金明细列表
  getAccountList(params) {
    return axios.post('/user/accountList', params)
    .then(res => res.data);
  },

  // 获取支付列表
  getPayList(params) {
    return axios.post('/user/payList', params)
      .then(res => res.data);
  },

  // 获取商品分类列表
  getProductList(params) {
    return axios.post('/product/category', params)
    .then(res => res.data);
  },

  // 获取收支明细列表
  getIncomeList(params) {
    return axios.post('/order/jounralList', params)
      .then(res => res.data);
  },

  // 获取收支明细信息
  getIncomeInfo(params) {
    return axios.post('/order/jounralDetail', params)
    .then(res => res.data);
  },

  // 获取战绩记录明细信息
  getRecordList(params) {
    return axios.post('/order/tradeList', params)
    .then(res => res.data);
  },

  // 获取战绩记录明细信息
  getRecordInfo(params) {
    return axios.post('/order/tradeDetail', params)
    .then(res => res.data);
  },

  // 获取下单中的订单明细列表
  getOrderList(params) {
    return axios.post('/order/orderTrading', params)
    .then(res => res.data);
  },

  // 获取下单中的订单明细信息
  getOrderInfo(params) {
    return axios.post('/order/orderInfo', params)
    .then(res => res.data);
  },
  // 修改用户信息
  editUserInfo(params) {
    return axios.post('/user/update', params)
      .then(res => res.data);
  },

  // 获取下单页面最新下注信息列表
  getOrderNewList(params) {
    return axios.post('/order/newList', params)
    .then(res => res.data);
  },


  // 实时计算盈利
  getOrderRecordStatus(params) {
    return axios.post('/order/orderStatus', params)
    .then(res => res.data);
  },


  // 获取某产品分类下的所有详细商品列表
  getGoodsList(params) {
    return axios.post('/product/list', params)
    .then(res => res.data);
  },

  // 下单
  addOrder(params) {
    return axios.post('/order/addOrder', params)
    .then(res => res.data);
  },

  // 绑定银行卡
  bindBankcard(params) {
    return axios.post('/user/bindBank', params)
    .then(res => res.data);
  },

  // 提现
  withdrawals(params) {
    return axios.post('/user/cash', params)
    .then(res => res.data);
  },

  // 退出登录
  logout(params) {
    return axios.post('/user/loginOut', params)
    .then(res => res.data);
  },

  // 查询订单状态
  getOrderStatus (params) {
    return axios.post('/orderStatus', params)
    .then(res => res.data);
  },

  // 获取APP升级信息
  getAppUpdateInfo(params) {
    return axios.post('/appUpdateInfo', params)
    .then(res => res.data);
  },
  //首页banner轮播
  BannerSwipe(params) {
    return axios.post('/banner/list', params)
    .then(res => res.data);
  },
  //获取微信二维码
  Servercode(params){
    return axios.post('/config ',params)
    .then(res => res.data);
  },
  //获取提现详情
  UserwithDrawList(params){
    return axios.post ('/user/withDrawList',params)
    .then (res =>res.data)
  },
  //获取客户列表
  getSubordinate(params){
    return axios.post('/user/subordinate',params)
    .then (res =>res.data)
  },
  //激活客户
  Activation(params){
    return axios.post('/user/activation',params)
    .then (res =>res.data)
  },
//玩法介绍
  PlayIntruction(params){
    return axios.post('/playInfo',params)
      .then(res=>res.data)
  },
  //获取K线图列表
  getKLine(params){
    return axios.post('/kLine/list',params)
      .then(res=>res.data)
  },
  //获取公告列表
  getMessageList(params){
    return axios.post('/message/list',params)
      .then(res => res.data)
  },
  //获取公告详情
  getMessageDetail(params){
    return axios.post('/message/detail',params)
      .then(res => res.data)
  },
  //获取已读公告
  getReadNews(params){
    return axios.post('/message/read',params)
    .then(res => res.data)
  }


}
