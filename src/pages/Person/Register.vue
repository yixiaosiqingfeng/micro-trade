<template>
  <section class="page login-page" :class='{"page-has-header": showHeader}'>
    <v-header title='注 册' v-if='showHeader'></v-header>

    <div class="page-hd"><img class="img-logo" src="../../assets/img/person/logo.png"></div>
    <div class="page-bd">
      <form @submit.prevent='register($event)' novalidate>
        <!-- <mt-field class='input-container' v-model="form.id" type='tel' placeholder='请输入推荐人ID'></mt-field> -->
        <mt-field class='input-container' v-model="form.username" type='text' placeholder='请输入用户名'></mt-field>
        <mt-field class='input-container' v-model="form.phone" type='tel' placeholder='请输入手机号码'></mt-field>
        <mt-field class='input-container captcha-container' v-model="form.smsCode" type='text' placeholder='请输入验证码'>
          <button v-if='leftTime <= 0' class="mint-button btn-captcha mint-button--normal" type='button' @click='getSms'>获取短信验证码</button>
          <button v-else class="mint-button btn-show-captcha mint-button--normal" type='button' disabled>{{leftTime}}s后重新获取</button>
        </mt-field>
        <mt-field class='input-container' v-model="form.password" :type='pwdType' placeholder='请输入密码(6~12位字母和数字组合)'>
          <img class="img-block" v-show='pwdType == "password"' src="../../assets/img/person/eye-close.png" @click='toggleEye'>
          <img class="img-block" v-show='pwdType == "text"' src="../../assets/img/person/eye-open.png" @click='toggleEye'>
        </mt-field>
        <mt-field class='input-container'  v-bind:disabled="parentIdDisable" v-model="form.parentId" type='text' placeholder='请输入推荐人Id' ></mt-field>


        <!-- <div class="tips-agreement mint-cell-wrapper">
          <div class="mint-cell-title">
            <label class="mint-checklist-label">
              <span class="mint-checkbox">
                <input type="checkbox" class="mint-checkbox-input" v-model='agreement'>
                <span class="mint-checkbox-core"></span>
              </span>
              <span class="mint-checkbox-labbtn-captchael">我已阅读和同意<router-link class="blue link" to=''>《服务协议及隐私条款》</router-link></span>
            </label>
          </div>
        </div> -->

        <input type="submit" class="mint-button btn-primary mint-button--danger mint-button--large" value="立刻注册" :disabled="!agreement">
      </form>

      <router-link class="btn-to-login text-center" to='/login'>已有账号？立即登录</router-link>
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'Register',
  components: {VHeader},
  data() {
    return {
      agreement: true,
      form: {
        phone: '',
        smsCode: '',
        password: '',
        parentId:"",
        routeid:true,
        // url: window.location.host,
      },
      leftTime: 0, //短信验证码倒计时
      timer: '', //计时器
      parentIdDisable: false, //计时器
      pwdType: 'password', //密码type
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },

  },
  created(){
    //监测router是否带有ID
      var id = this.$route.query.id;
      if(id && !isNaN(id)){
        this.form.parentId = id;
        this.parentIdDisable = true;
      }
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
          type: 'register',
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

    // 表单提交
    register(ev) {
      if (this.validate(this.form)) {
        this.$api.register(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast('注册成功');
            setTimeout(() => {
              this.goto({name: 'Login'});
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        }).catch(err => {
          this.$toast(err);
        })
      }
    },


  },
}
</script>


<style lang='less'>
@import '../../assets/css/login.less';
</style>
