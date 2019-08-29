<template>
  <section class="page page-has-tabbar person-page">
      <click-btn></click-btn>

    <!-- 头部 -->
    <div class="page-hd">
      <div class="page-hd-content">
        <router-link class="face" :to='isLogin ? "/personal" : "/login"'>
          <img class="img-block" v-if='isLogin && userInfo.headImg' :src="getImgURL(userInfo.headImg)" alt="">
          <img class="img-block" v-else src="../../assets/img/person/logo.jpg" alt="">
          <div class="Mymain">
             <span class="nickname ">{{isLogin ? (userInfo.username ? userInfo.username : (userInfo.phone || '--')) : '请登录'}}</span>
             <span class="personid">ID:{{userInfo.id }}</span>
             <div class="page-hd-sub text-center">
                <div class="hd-sub-content text-left">
                 <p>账户总资金 (金豆) ：{{isLogin ? (userInfo ? userInfo.balance : '0.00') : '0.00'}} </p>
                </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="Cash">
         <router-link class="small text-center" to='/topup'>
            <i class="iconfont icon-3"></i>
            <p>充 值</p>
          </router-link>
          <span></span>
          <router-link class="small text-center" to='/withdrawals'>
            <i class="iconfont icon-tixian"></i>
            <p>提 现</p>
          </router-link>
      </div>
    </div>

    <!-- cell-->
   <template v-for='(cell, index) in cells'>
      <router-link :to='cell.to' :class="['mint-cell', cell.cls]" :id='cell.id'>
        <span class="mint-cell-mask"></span>
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper text-dynamic">
          <div class="mint-cell-title">
            <span :class="'icon-container-' + index"><i :class="['iconfont', cell.icon]"></i></span>
            <span class="mint-cell-text">{{cell.title}}</span>
          </div>
        </div>
        <div class="mint-cell-right"></div>
        <i class="mint-cell-allow-right"></i>
      </router-link>
    </template>
    <div class="mint-cell servercode "  @click="ServerVisible = true">
      <i class="iconfont icon-kefu icon-container-3"></i>
      <span class="mint-cell-text">联系客服</span>
    </div>
    <servercode :visible='ServerVisible'  @cancel="cancel"></servercode>

    <!-- <div class="page-ft-fixed" v-if='isLogin'>
      <mt-button class="btn-danger" type='danger' size='large' @click.native='logout'>退出登录</mt-button>
    </div> -->
     <div class="ft-fixed" >
      <mt-button class="btn-danger" type='danger' size='large' @click.native='logout'>退出登录</mt-button>
    </div>
  </section>
</template>


<script>
import { mapState } from 'vuex';
import ClickBtn from '@/components/ClickBtn';
import Servercode from '@/components/Servercode';


export default {
  name: 'Person',
   components: {ClickBtn,Servercode},
  data() {
    return {
      cells: [
        { title: '游戏明细', value: '', to: '/record', icon: 'icon-youxi', cls: 'mint-cell-0' },
        { title: '资金明细', value: '', to: '/account-record', icon: 'icon-qiandai', cls: 'mint-cell-1' },
        { title: '支付记录', value: '', to: '/pay-list', icon: 'icon-jilu', cls: 'mint-cell-1' },
        { title: '提现记录', value: '', to: '/cashout-list', icon: 'icon-tixian1', cls: 'mint-cell-1' },
        { title: '游戏说明', value: '', to: '/play-intruction', icon: 'icon-youxi2', cls: 'mint-cell-1' },
        { title: '我的客户', value: '', to: '/customer-list', icon: 'icon-kehu1', cls: 'mint-cell-1', id:'customer' },
      ],
      ServerVisible:false,

    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo,
    })
  },

  created() {
    if (window.localStorage.getItem('token')) {
      this.getUserInfo()
      .then(res => {
        if( this.userInfo.isEmployee == 1){
          document.getElementById('customer').style.display = 'block';
        }
      })
    }else {
      // 如果没有登录 则直接跳去登录
      this.goto({name: 'Login'});
    }
  },

  methods: {
    logout() {
      this.$api.logout()
      .then(res => {
        if (res.code === '00') {
          window.localStorage.removeItem('token');
          this.$toast('退出登录成功');
          this.$store.commit('setLoginStatus', false);
          this.$store.commit('setUserInfo', {});
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.$toast(res.msg);
        }
      })
    },
    //服务二维码关闭
     cancel(){
     this.ServerVisible=false;
    },
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.person-page {
  #customer{
    display: none;
  }
.icon-jilu{
  font-size: 24px;
}
.icon-kehu1{
  font-size: 26px;
  color: #ffad08
}
  .icon-youxi2{
    font-size: 27px;
    padding-left: 2px;
    color: #e26767;
  }
.icon-container-2{
  display: inline-block;
  width: .3rem;
  height: .3rem;
  border-radius: 3px;
  text-align: center;
  line-height: .3rem;
  color: #ffad08;
}
  .page-hd {
    position: relative;
    background: #e01111;
    background-size: 100%;
    height: 2rem;
  }
  .page-hd-content {
    width: 80%;
    margin: 0 auto;
    padding: .2rem 0 .1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .Cash{
      border-top:1px solid #a51212;
      padding:.1rem;
      margin:18px .1rem 0  .1rem;
      display: flex;
    justify-content: space-around;
    span{
      border-left: 1px solid #a51212;
    }
  }
  .small {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: .1rem;
    /*background-color: rgba(255, 255, 255, .3);*/
    border-radius: 7px;
    width:100%;


  }
  .small img {
    width: .24rem;
    height: .18rem;
    vertical-align: middle;
  }
  .small p {
    padding: .03rem .1rem;
    margin-top: .07rem;
    border-radius: .3rem;
    color: #fff;
    /* background-color: rgba(255, 255, 255, .3); */
    display:inline-block;
    font-size: .14rem;
  }
  .small i {
    font-size: .24rem;
    color:#ffc01a;
    vertical-align: middle;
  }
  i.icon-tixian{
    font-size: .34rem;
  }
  .face{
    display:flex;

   img {
    width: .7rem;
    height: .7rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right:10px;
    }
  }
  .nickname {
    height: .2rem;
    line-height: .4rem;
    margin: .1rem .3rem .1rem 0 ;
    font-size: .14rem;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: .8rem;

  }
  .hd-sub-content {
    padding: .06rem .2rem;
    border-radius: .3rem;
    background-color: #f8e71c;
    color:#040323;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 90%;
    margin: 0 auto;
    .hd-p-f {
      margin-bottom: .05rem;
    }
  }
  .mint-cell {
    border-bottom: 1px solid @border-c;
    margin:.05rem;
    background:#f3f3f3;
    border-radius: 5px;
    .person-page .hd-sub-content .iconfont {
      font-size: .26rem;
      color: #fff;

    }
  }
  .mint-cell-wrapper {
    padding: 0 .05rem 0 .15rem;
  }
  .mint-cell-text {
    padding-left: .05rem;
    vertical-align:super;
    color: #636363;
  }
  .icon-container-0 {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    border-radius: 3px;
    text-align: center;
    line-height: .3rem;
    color:#1296db;

  }
  .icon-youxi{
    font-size: 32px;
  }
  .icon-container-1 {
    .icon-container-0;
    .icon-qiandai{
      color:#ffad08;
      font-size: 24px;
    }
  }
  .mint-cell-1 .mint-cell-text {
    vertical-align: text-top;
  }

  .page-hd-info {
    color: #fff;
  }

  .ft-fixed {
    padding: .4rem 0;
    .btn-danger {
      width: 90%;
      margin: 0 auto;
      background-color: @red;
    }
  }
  .icon-tixian1{
    color:#1296db;
    font-size: 28px;
  }
  .servercode{line-height: 42px;
    padding: 0 .05rem 0 .15rem;

  }
  .icon-container-3{font-size: 28px;color:#ffad08;}

}
</style>
