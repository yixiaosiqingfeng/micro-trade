/**
 * 一些自己写的公共方法，作为Vue的插件形式来使用
 * 在main.js使用Vue.use(..)调用后即可使用
 */

export default {
  install(Vue, opts) {
    // 路由跳转
    Vue.prototype.goto = function(routeObj) {
      if (!routeObj || typeof routeObj !== 'object') {
        return;
      }
      this.$router.push(routeObj);
    };

    // 获取用户信息 如果已经登录
    Vue.prototype.getUserInfo = function() {
      return this.$api.getUserInfo()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setLoginStatus', true);
          this.$store.commit('setUserInfo', res.data);
        } else {
          this.$store.commit('setLoginStatus', false);
          this.$store.commit('setUserInfo', {});
        }
        return res;
      })
    },

    // 获取系统配置信息
    Vue.prototype.getConfig = function() {
      return this.$api.getConfig()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setConfig', res.data);
          this.$store.commit('setCvs', res.cvs);
          this.$store.commit('setSystemName', res.data.webname);
        }
        return res;
      })
    }


    // 表单验证
    Vue.prototype.validate = function(form) {
      // 手机号码
      if (form.hasOwnProperty('phone')) {
        if (!form.phone) {
          this.$toast('手机号码不能为空');
          return false;
        }
        if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(form.phone))) {
          this.$toast('手机号码不正确');
          return false;
        }
      }
      // 密码
      if (form.hasOwnProperty('password')) {
        if (!form.password) {
          this.$toast('密码不能为空');
          return false;
        }
        if (form.password.length < 6 || form.password.length > 12) {
          this.$toast('密码长度必须是6~12位');
          return false;
        }
        if (!(/^\w{6,12}$/.test(form.password))) {
          this.$toast('密码格式不正确');
          return false;
        }
      }
      // 确认密码
      if (form.hasOwnProperty('passwordAgain')) {
        if (!form.passwordAgain) {
          this.$toast('确认密码不能为空');
          return false;
        }
        if (form.passwordAgain != form.password) {
          this.$toast('两次输入的密码不一致');
          return false;
        }
      }

      // 身份证号
      if (form.hasOwnProperty('idCard')) {
        if (!form.idCard) {
          this.$toast('身份证号不能为空');
          return false;
        }
        if (form.idCard.length != 15 && form.idCard.length != 18) {
          this.$toast('身份证号格式错误');
          return false;
        }
      }

      // 短信验证码
      if (form.hasOwnProperty('smsCode')) {
        if (!form.smsCode) {
          this.$toast('验证码不能为空');
          return false;
        }
      }

      // 选择商品 - 下单
      if (form.hasOwnProperty('mypid')) {
        if (!form.mypid) {
          this.$toast('请选择商品');
          return false;
        }
      }

      // 选择数量 - 下单
      if (form.hasOwnProperty('mysum')) {
        if (!form.mysum) {
          this.$toast('请填写数量');
          return false;
        }
      }

      // 选择方向 - 下单
      if (form.hasOwnProperty('myfx')) {
        if (!form.myfx) {
          this.$toast('请选择大小');
          return false;
        }
      }

      // 选择时间 - 下单
      if (form.hasOwnProperty('qptime')) {
        if (!form.qptime) {
          this.$toast('请选择时间');
          return false;
        }
      }

      // 银行名称 - 绑定银行卡
      if (form.hasOwnProperty('bankName')) {
        if (!form.bankName) {
          this.$toast('请选择银行');
          return false;
        }
      }

      // 银行名称 - 绑定银行卡
      if (form.hasOwnProperty('bankName')) {
        if (!form.bankName) {
          this.$toast('请选择银行');
          return false;
        }
      }

      // 省份 - 绑定银行卡
      if (form.hasOwnProperty('province')) {
        if (!form.province) {
          this.$toast('请选择省份');
          return false;
        }
      }

      // 城市 - 绑定银行卡
      if (form.hasOwnProperty('city')) {
        if (!form.city) {
          this.$toast('请选择城市');
        return false;
        }
      }

      // 支行名称 - 绑定银行卡
      if (form.hasOwnProperty('branch')) {
        if (!form.branch) {
          this.$toast('请填写支行名称');
          return false;
        }
      }

      // 卡号 - 绑定银行卡
      if (form.hasOwnProperty('bankNumber')) {
        if (!form.bankNumber) {
          this.$toast('请填写卡号');
          return false;
        }
      }

      // 持卡人 - 绑定银行卡
      if (form.hasOwnProperty('userName')) {
        if (!form.userName) {
          this.$toast('请填写持卡人姓名');
          return false;
        }
      }

      // 提现金额 - 提现
      if (form.hasOwnProperty('cashPrice')) {
        if (!form.cashPrice) {
          this.$toast('请填写提现金额');
          return false;
        }
      }

      // 支付类型 - 充值
      if (form.hasOwnProperty('payType')) {
        if (!form.payType) {
          this.$toast('请选择支付类型');
          return false;
        }
      }
      // id
      if(form.hasOwnProperty('parentId')){
         if (!form.parentId) {
          this.$toast('推荐人ID不能为空');
          return false;
        }
      }


      return true;
    }

    // 手机号码
    Vue.prototype.validatePhone = function(phone) {
      if (!phone) {
        this.$toast('手机号码不能为空');
        return false;
      }
      if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone))) {
        this.$toast('手机号码不正确');
        return false;
      }
      return true;
    },

    // 格式化数据 保留两位
    Vue.prototype.format = function(value, keep) {
      keep = keep || 4;
      if (typeof value == 'undefined' || value == null || isNaN(value)) {
        return;
      }
      return Number(value).toFixed(keep);
    },

    // 判断是否大于9 小于9 前面加0
    Vue.prototype.formatTime = function(value) {
      return value > 9 ? value : '0' + value;
    }

    // 判断是否大于9 小于9 前面加0
    Vue.prototype.formatPHPTime = function(value, opt) {
      if (!value) { return; }
      opt = opt || {};
      var time = Number(value) * 1000;
      var date = new Date(time);
      var year = date.getFullYear();
      var month = this.formatTime(date.getMonth() + 1);
      var day = this.formatTime(date.getDate());
      var hour = this.formatTime(date.getHours());
      var minute = this.formatTime(date.getMinutes());
      var second = this.formatTime(date.getSeconds());
      if (opt.hideDate) {
        return hour + ':' + minute + ':' + second;
      } else if (opt.hideTime) {
        return year + '-' + month + '-' + day;
      } else if (opt.showDay) {
        return month + '-' + day;
      } else {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      }
    }

    // 判断路径是否是绝对路径
    Vue.prototype.getImgURL = function(url) {
      if (url && url.includes('http')) {
        return url;
      } else {
        return this.$store.state.baseImgURL + url;
      }
    }

    // 判断是否是微信浏览器
    Vue.prototype.isWeChat = function() {
      return /micromessenger/.test(navigator.userAgent.toLowerCase());
    }

    // 处理用户名 只显示第一个和最后一个字
    Vue.prototype.hideName = function(name) {
      return name.replace(/^(.).*(.)$/, "$1***$2");
    }

    // 判断是否是App
    Vue.prototype.isApp = function() {
      return !window.location.host;
    }

    // 获取iframe src下的name的值
    Vue.prototype.getQueryParam = function(name, src) {
        var reg = new RegExp(name + '=([^&]*)(&|$)', 'i');
        var r = src.match(reg);
        if (r != null) {
            return unescape(r[1]);
        }
        return null;
    }


  }
}
