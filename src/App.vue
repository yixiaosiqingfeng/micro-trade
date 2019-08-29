<template>
  <div id="app">
    <router-view></router-view>
    <tabbar v-show='showTab'></tabbar>
    <!-- 更新弹框 -->
    <updata-popup :visible='toastPopupVisible' :title = "'更新提示'" :html='tip' @cancel='cancelToast' @confirm='upToast'></updata-popup>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar';
import UpdataPopup from '@/components/UpdataPopup';
import axios from '@/assets/js/http';
import {mapState} from 'vuex';

export default {
  name: 'app',
  components: {Tabbar,UpdataPopup},
  data() {
    return {
      tip:'',
      toastPopupVisible:false,
      upUrl:'',
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
    showTab() {
      return this.$route.meta.showTab ? true : false;
    },
  },

  methods: {
    // 初始化title（进入或刷新）
    initTitle() {
      setTimeout(() => {
        document.title = this.$store.state.systemName + this.$route.meta.title;
      }, 100);
    },

    // 路由跳转时检测是否需要登录
    watchRouter() {
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.title) {
          document.title = this.$store.state.systemName + to.meta.title;
        }

        if (to.matched.some(record => record.meta.requireAuth)) {
          if (!this.$store.state.isLogin) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next();
          }
        } else {
          next();
        }
        // 每次路由跳转都会滚动到顶部
        window.scrollTo(0, 0);
      })
    },

    // 关闭弹框
    cancelToast() {
      this.toastPopupVisible = false;
    },

    // 跳转更新
    upToast() {
      window.location.href = this.upUrl
    },


    // // app升级提示弹框
    // showUpdateBox(data) {
    //   this.$messagebox({
    //     title: '升级提示',
    //     // 为了保证您的使用体验，请尽快升级版本
    //     message: data.appTip || '为了保证您的使用体验，请尽快升级版本',
    //     confirmButtonText: '升级',
    //     // confirmButtonClass: 'messagebox-btn-confirm',
    //     showCancelButton: true,
    //     // cancelButtonClass: 'messagebox-btn-cancel',
    //   }, action => {
    //     if (action === 'confirm') {
    //       cordova.InAppBrowser.open('http://v2.app.qidashigz.com/static/download/index.html?update=y', '_system', 'location=no,toolbar=no,toolbarposition=no,closebuttoncaption=关闭');
    //     }
    //   })
    // },

    // 检测APP升级信息
    checkAppUpdateInfo() {
      this.$api.getAppUpdateInfo()
      .then(res => {
        if (res.code === '00') {
          if (this.$store.state.appVersion !== res.appVersion) {
            this.tip = res.data.tip;
            this.upUrl = res.data.url;
            this.toastPopupVisible = true;
          }
        }
      }).catch(err => {
        console.log('getAppUpdateInfo: ', err);
      })
    },
  },



  created() {
//  this.checkAppUpdateInfo();

    if (!this.isApp()) {
      $("#loading").fadeOut(1500);
      window.sessionStorage.setItem('inApp', true);
    } else {
    	this.checkAppUpdateInfo();
    }

    this.getConfig()
    .then(res => {
      this.initTitle();
    })
    this.watchRouter();

    // window.localStorage.removebItem('token');
    if (window.localStorage.getItem('token')) {
      this.getUserInfo();
    } else {
//    	console.log('in');
//      // 如果没有登录 则直接跳去登录
//      this.goto({name: 'Login'});
    }
  },
}
</script>

<style lang='less'>
@import './assets/css/app.less';
</style>
