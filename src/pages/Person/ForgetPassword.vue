<template>
  <section class="login-page page" :class='{"page-has-header": showHeader}'>
    <v-header title='忘记密码' v-if='showHeader'></v-header>

    <div class="page-bd">
      <form @submit.prevent='forgetPassword' novalidate>
        <mt-field class='input-container' v-model="form.phone" type='tel' placeholder='请输入手机号码'></mt-field>
        <mt-field class='input-container captcha-container' v-model="form.smsCode" type='text' placeholder='请输入验证码'>
          <button v-if='leftTime <= 0' class="mint-button btn-captcha mint-button--normal" type='button' @click='getSms'>获取短信验证码</button>
          <button v-else class="mint-button btn-show-captcha mint-button--normal" type='button' disabled>{{leftTime}}s后重新获取</button>
        </mt-field>
        <mt-field class='input-container' v-model="form.password" :type='pwdType' placeholder='请输入密码(6~12位字母和数字组合)'>
          <img class="img-block" v-show='pwdType == "password"' src="../../assets/img/person/eye-close.png" @click='toggleEye'>
          <img class="img-block" v-show='pwdType == "text"' src="../../assets/img/person/eye-open.png" @click='toggleEye'>
        </mt-field>
        <input type="submit" class="mint-button btn-primary mint-button--danger mint-button--large" value='提 交'>
      </form>
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'ForgetPassword',
  components: { VHeader },
  data() {
    return {
      form: {
        phone: '',
        smsCode: '',
        password: '',
      },
      leftTime: 0, //短信验证码倒计时
      timer: '', //计时器
      pwdType: 'password', //密码type
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  methods: {
    // 切换eye
    toggleEye() {
      this.pwdType = this.pwdType == 'password' ? 'text' : 'password';
    },

    // 获取短信验证码
    getSms() {
      if (this.validatePhone(this.form.phone)) {
        this.$api.getSms({
          phone: this.form.phone,
          type: 'forget_password',
        }).then(res => {
          if (res.code === '00') {
            this.leftTime = 60;
            this.timer = setInterval(() => {
              if (this.leftTime <= 0) {
                clearInterval(this.timer);
                return;
              } else {
                this.leftTime--;
              }
            }, 1000);
          } else {
            this.$toast({message: (res.data.msg || res.msg), duration: 3000});
          }
        })
      }
    },

    // 提交表单
    forgetPassword() {
      if (this.validate(this.form)) {
        this.$api.forgetPassword(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast('修改密码成功');
            setTimeout(() => {
              this.goto({name: 'Login'});
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    }
  }
}
</script>


<style lang='less'>
@import '../../assets/css/login.less';

</style>
