<template>
  <section class="page login-page" :class='{"page-has-header": showHeader}'>
    <v-header title='登 录' v-if='showHeader'></v-header>

    <div class="page-hd"><img class="img-logo" src="../../assets/img/person/logo.png"></div>

    <div class="page-bd">
      <form @submit.prevent='login($event)' novalidate>
        <mt-field class='input-container' v-model='form.phone' type='tel' placeholder='请输入手机号码'></mt-field>
        <mt-field class='input-container' v-model="form.password" :type='pwdType' placeholder='请输入密码'>
          <img class="img-block" v-show='pwdType == "password"' src="../../assets/img/person/eye-close.png" @click='toggleEye'>
          <img class="img-block" v-show='pwdType == "text"' src="../../assets/img/person/eye-open.png" @click='toggleEye'>
        </mt-field>
        <input type="submit" class="mint-button btn-primary mint-button--danger mint-button--large" value="登 录">
      </form>
      <router-link class="btn-to-forget text-center" to='/forget-password'>忘记密码？立刻找回</router-link>
      <mt-button class='btn-login-plain' type='danger' size='large' plain @click.native='goto({name: "Register"})'>还没有账号？立刻注册</mt-button>
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'Login',
  components: {VHeader},
  data() {
    return {
      form: {
        phone: '',
        password: '',
        // url: window.location.host,
      },
      pwdType: 'password',
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
    // 表单提交
    login(ev) {
      if (this.validate(this.form)) {
        this.$api.login(this.form)
        .then(res => {
          if (res.code === '00') {
            // 保存token
            window.localStorage.setItem('token', res.data.token);

            this.$toast('登录成功');
            this.$store.commit('setLoginStatus', true);

            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push({name: 'Home'});
            }

            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            this.$toast(res.msg);
          }
        }).catch(err => {
          this.$toast((err || '未知错误'));
        })
      }
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.$store.state.isLogin) {
        vm.$router.push({name: 'Person'});
      }
    })
  },
}
</script>


<style lang='less'>
@import '../../assets/css/login.less';
</style>
