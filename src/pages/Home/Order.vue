<template>
  <section class="order-page page-has-tabbar" :class='{"page-has-header": showHeader}'>
    <v-header :title='title' v-if='showHeader' :hideBack='true'>
      <mt-button icon="back" @click.native='goto({name: "Home"})' slot='left'></mt-button>
    </v-header>
    <!-- 开奖按钮 -->
      <click-btn></click-btn>


    <div class="page-t">
      <div class="page-hd flex">
        <div class="flex-item flex hd-l">
          <!-- left -->
          <div :class="['flex-item flex-v', productInfo.diff >= 0 ? 'red' : 'green']"><p class="hd-title">{{format(productInfo.price)}}</p></div>
        </div>
        <!-- right -->
        <div class="flex-v hd-r">
          <p class="hd-r-t text-center">开盘</p>
          <p class="hd-r-b red">{{format(productInfo.open)}}</p>
        </div>
      </div>

      <div class="page-bd">
        <!-- tab -->
        <div class='bd-tab' @click="openNnn()">实时走势（点击查看）</div>

        <!-- tab-container -->
        <mt-tab-container class='bd-tab-container' v-model="bdActiveTab">
            <div class="iframe">
                <div ></div>
                <p class="border"></p>
               <div class="mushroom" @click="openPlay()">
                  <img src="../../assets/img/home/red-mushroom.png" alt=""  :class="isShow?'':'hid'">
                  <img src="../../assets/img/home/green-mushroom.png" alt=""  :class="isShow?'hid':''">
                  <p v-show="playShow">玩法介绍</p>
                </div>
                <div class="lines" :style="'height:'+height">
                  <img src="../../assets/img/home/red-mario.png" alt="" class="mario" :class="isShow?'':'hid'">
                  <img src="../../assets/img/home/green-mario.png" alt="" class="mario" :class="isShow?'hid':''">
                </div>
                <p class="firstPrice">{{firstPrice}}</p>
                <p class="real-time"><span></span><span  :class="['flex-item flex-v', isShow==true ? 'red' : 'green']">{{format(productInfo.price)}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实时</span></p>
                <div class="forecast">
                  <p><span :class="isShow?'':'hid'">胜</span><span :class="isShow?'hid':''">胜</span><span>当前预测</span></p>
                  <p><span>红</span><span>VS</span><span>黑</span></p>
                </div>
            </div>
        </mt-tab-container>
      </div>
    </div>

    <!--<div class="page-ft">-->
      <!--<div class="ft-t">最新下注</div>-->
      <!--<div class="ft-m flex">-->
        <!--<p class="flex-item">下注时间</p>-->
        <!--<p class="flex-item">手机号码</p>-->
        <!--<p class="flex-item">方向</p>-->
        <!--<p class="flex-item">数量</p>-->
      <!--</div>-->
      <!--<div class="ft-b">-->
        <!--<div class="ft-b-item flex" v-for='item in newList' :key='item.id'>-->
          <!--<p class="flex-item text-dynamic">{{formatPHPTime(item.time, {hideDate: true})}}</p>-->
          <!--<p class="flex-item">{{item.phone}}</p>-->
          <!--<p :class="['flex-item', item.type === 'up' ? 'red' : 'green']">{{item.type === 'up' ? '猜红' : '猜黑'}}</p>-->
          <!--<p class="flex-item text-dynamic">{{item.num}}注</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="page-ft-fixed flex">
      <router-link class="flex-item btn-order-reocrd" to='/home'>
        <div class="item-icon"><i class="iconfont icon-fanhui"></i></div>
        <div class="item-label">首 页</div>
      </router-link>
      <div class="flex-item inTrade" :class="inTradShow?'':'inTradeHid'" @click="toastPopupVisible = true">
        <p>不在下注时间内</p>
        <p>(点击查看)</p>
      </div>
      <div class="flex-item btn-up" @click='chooseDirection("猜大")' :class="inTradShow?'inTradeHid':''">
        <div class="item-icon"><i class="iconfont icon-shangshengqushi"></i></div>
        <div class="item-label">压 红</div>
      </div>
      <div class="flex-item btn-down" @click='chooseDirection("猜小")' :class="inTradShow?'inTradeHid':''">
        <div class="item-icon"><i class="iconfont icon-downswing"></i></div>
        <div class="item-label">压 黑</div>
      </div>
    </div>
    <!-- 土司弹框 -->
    <toast-popup :visible='toastPopupVisible' :title = "'提示'" :html='tipText' @cancel='cancelToast' @confirm='cancelToast'></toast-popup>
    <!-- K线弹框 -->
    <k-popup :visible='KPopupVisible'  :title = "'实时走势'" @cancel='cancelK' :KData='KData' :cateCode='this.$route.query.code' @confirm='cancelK'></k-popup>
    <!-- 下单弹框 -->
    <order-popup :visible='orderPopupVisible' :direction='direction' @cancel='cancel' @confirm='confirm'></order-popup>
    <!-- 结果弹框(倒计时+结果) -->
    <result-popup :orderId='orderId' :token="token" :visible='resultPopupVisible' @close='close'></result-popup>
    <!--玩法介绍-->
    <play-rule  :visible='PlayRuleVisible' :title = "'玩法介绍'" @cancel='PlayCancel' @confirm='PlayConfirm' :imgSrc="imgSrc"></play-rule>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import OrderPopup from '@/components/OrderPopup';
import ResultPopup from '@/components/ResultPopup';
import KPopup from '@/components/KPopup';
import ToastPopup from '@/components/ToastPopup';
import ClickBtn from '@/components/ClickBtn';
import PlayRule from '@/components/PlayRule';

import {mapState} from 'vuex';
import CONFIG from '@@/config';

export default {
  name: 'StrategyDetail',
  components: {VHeader, OrderPopup, ResultPopup,ToastPopup,ClickBtn,KPopup,PlayRule},
  data() {
    return {
      bdActiveTab: 'bd-tab-1',
      orderPopupVisible: false,
      resultPopupVisible: false,
      toastPopupVisible:false,
      KPopupVisible:false,
      PlayRuleVisible:false,
      timer: '', // 计时器
      productInfo: {},
      direction: '', //猜红小的方向
      orderId: '', //下单后的orderId
//      qptime: '', //下单后该订单的平仓时间
      firstPrice:0,
      imgSrc:'',
      isShow:false,
      playShow:false,
      height:'32%',
      lastPrice:0,
      inTradShow:true,
      tipText:'',
      token:"",
      KData:[],
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
    title() { return this.productInfo.name || '下注'; },
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.getProductInfo(true)
    .then(res => {
      this.timer = setInterval(() => {
        this.getProductInfo();
      }, 2000);
    })
  },

  methods: {
    // 获取商品信息
    getProductInfo(firstPrice) {
     if(!firstPrice){
       firstPrice=false;
     }
      return this.$api.getProductList({code: this.$route.query.code, needInfo: true})
      .then(res => {
        this.$indicator.close();
        if (res.code === '00') {
          this.productInfo = res.data[0];
          if (res.data[0].inTrade==false){
            this.inTradShow=true;
            this.tipText=res.data[0].tradeMsg;
          }else{
            this.inTradShow=false;
          }
          if(firstPrice==true){
            this.firstPrice=this.productInfo.price;
            this.lastPrice=this.productInfo.price;
            this.imgSrc=this.productInfo.descImg;
            if(this.productInfo.descImg!=null){
              this.playShow=true;
            }else {
              this.playShow=false;

            }
          }
          this.height=(parseFloat(this.height)+((this.productInfo.price-this.lastPrice)/this.productInfo.wave)*10);
          this.height=Math.max(12,this.height);
          this.height=Math.min(61,this.height);
          this.height+='%';
          this.lastPrice=this.productInfo.price;
          if(this.productInfo.price<this.firstPrice ||this.productInfo.price==this.firstPrice){
            this.isShow=false
          } else {
            this.isShow=true;

          }
          document.title = this.productInfo.name || '下注';
        } else {
          this.$toast(res.msg);
        }
      })
    },
    chooseDirection(direction) {
      this.direction = direction;
      this.orderPopupVisible = true;
    },
    // 关闭下注弹框
    cancelToast() {
      this.toastPopupVisible = false;
    },
    cancelK(){
      this.KPopupVisible = false;
    },
    openNnn(){
      this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      this.$api.getKLine({cateCode:this.$route.query.code}).then(res => {
          if (res.code === '00') {
              this.KData = res.data;
              this.KPopupVisible = true;
          } else {

          }
      });
    },
    // 关闭下注弹框
    cancel() {
      this.orderPopupVisible = false;
    },

    // 下注
    confirm(form) {
      if (this.validate(form)) {
        this.$api.addOrder(form)
        .then(res => {
          if (res.code === '00') {
            this.$toast('下注成功');
            this.orderId = res.data.id;
            this.getUserInfo(); //下注成功后更新用户信息(金豆)
            this.token=new Date().getTime();
            this.orderPopupVisible = false;
            this.resultPopupVisible = true;
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },
    // 关闭结果弹框
    close() {
      this.resultPopupVisible = false;
    },
  //  玩法介绍
    openPlay(){
      if(this.playShow) {
        this.PlayRuleVisible = true;
      }
    },
  //  关闭玩法介绍
    PlayCancel(){
      this.PlayRuleVisible=false;
    },
    PlayConfirm(){
      this.PlayRuleVisible=false;
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    this.$indicator.close();
    next();
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';
.hid{
   visibility: hidden;
}
.inTradeHid{
  display: none;
}
.order-page {
  height: 100%;
  background: url("../../assets/img/home/back.png")0 0 no-repeat;
  background-size: 100% 100%;
  .page-t {
    height: 450px;
    background: url('../../assets/img/home/order-bg.png') 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .page-bd{
    margin-bottom: 0rem;
    position: relative;
  }
  .page-hd {
    padding: .2rem;
    background-color: transparent;
    .hd-title {
      font-size: .2rem;
    }
    .hd-title {
      text-align: left;
      padding-left: .1rem;
    }
    .hd-r {
      width: 1rem;
      text-align: right;
      .text-center{
        text-align: right !important;
        color: #666666;
      }
    }
    .hd-r-b {
      font-size: .14rem;
      margin-top: .1rem;
    }
  }

  .page-bd {
    .bd-tab {
      color: @gray-white;
      background-color: @orange;
      height: .3rem;
      border-radius: .06rem;
      top: -0.15rem;
      overflow: hidden;
      position: absolute;
      left: 2.5%;
      width: 95%;
      margin: 0 auto;
      text-align: center;
      font-size: .14rem;
      font-weight: bold;
      line-height: .3rem;
      z-index: 2000;
    }
    .iframe {
      width: 100vw;
      height: 3.5rem;
      overflow: hidden;
      position: relative;
      .mushroom{
        position: absolute;
        width: 15%;
        height: 15%;
        right: 10%;
        top: 13%;
        img{
          position: absolute;
          top: -9px;
          width: 100%;
        }
        p{
          text-align: center;
          line-height: 42px;
          padding: 42px 1px;
          width: 100%;
          color: #d10f22;

        }
      }
      .mario{
        position: absolute;
        left: -9%;
        width: 120%;
        top: -80px;
        z-index: 10;
      }
      .lines{
        width: 64px;
        bottom: 0.23rem;
        height: 32%;
        background-color: #3399cc;
        position: absolute;
        left: 13%;
        -moz-transition:ease 1s;
        -o-transition:ease 1s;
        -webkit-transition:ease 1s;
        transition:ease 1s;
      }
      .border{
        width: 86%;
        left: 7%;
        top: 60.5%;
        height: 1px;
        background: #5f4490;
        position: absolute;
        border: none !important;
      }
      .firstPrice{
        position: absolute;
        left: 50%;
        top: 64%;
        color: #ff0000;
        font-size: 14px;
      }
      .real-time{
        position: absolute;
        left: 35%;
        top: 33%;
        color: #cc3333;
        span:first-child{
          display: inline-block;
          width: 8px;
          height: 8px;
          border: 2px solid #ffcc66;
          background-color: #fff;
          border-radius: 50%;
          margin-right: 5px;
        }
        span:last-child{
          padding-left: 0.2rem;
          margin-top: -0.14rem;
        }
      }
      .forecast{
        position: absolute;
        right: 8%;
        bottom: 10%;
        width: 50%;
        p:first-child{
          padding-bottom: 6%;
          height: 40px;
          span:nth-child(1){
            margin-right: 25px;
          }
          span:nth-child(1), span:nth-child(2){
            background-color: #990099;
            width: 25px;
            height: 25px;
            display:block;
            border-radius: 50%;
            float: left;
            font-size: 14px;
            color: #000;
            font-weight: bold;
            text-align: center;
            line-height: 25px;
          }
          span:nth-child(2){
            margin-left: 1px;
          }
          span:nth-child(3){
            display: block;
            float: right;
            padding: 0 3px;
            width: 35%;
            height: 20px;
            line-height: 20px;
            text-align: center;
            margin-top: 4px;
            border-radius: 5px;
            margin-right: 10px;
            background-color:#990099;
            color: #000;
            font-size: 13px;
            font-weight: bold;
          }
        }
        p:nth-child(2){
          padding-left: 2px;
          span{
            padding: 0 6px;
          }
          span:nth-child(1){
            color: #ff0000;
            font-size: 14px;
            padding-left: 3px;
          }
          span:nth-child(2){
            color: #9966ff;
          }
          span:nth-child(3){
            color: #33cc66;
          }
        }
      }
    }
  }

  .page-ft {
    .ft-t {
      height: .35rem;
      line-height: .35rem;
      font-size: .14rem;
      padding-left: .15rem;
      background-color: #330000;
      color: #fff;
    }
    .ft-m, .ft-b-item {
      height: .35rem;
      line-height: .35rem;
      color: #666666;
      background-color: #330000;
    }
    .ft-m, .ft-b {
      margin: .05rem .1rem;
    }
    .ft-m {
      color: #999999;
    }

  }

  .page-ft-fixed {

    height: .58rem;

    color: @white;
    .inTrade{
      flex: 3;
      background-color: #5d5656;
      color: #e2dcdc;
      font-size: 12px;
      p:first-child{
        font-size: 15px;
        padding-top: 5px;
      }
    }
    .btn-order-reocrd {
      flex: 1;
      background-color: @orange;
    }
    .btn-up {
      flex: 2;
      background-color: @red;
    }
    .btn-down {
      flex: 2;
      background-color: @green;
      .item-icon{
        margin-top:.06rem;
        .icon-downswing{
          font-size: .22rem;
        }
      }
    }
    .item-icon {
      width: .2rem;
      height: .2rem;
      margin: .08rem auto;
    }
    .iconfont {
      font-size: .18rem;

    }

  }


}
</style>
