<template>
  <div class="lasted-countdown">
    <span class="lasted-title">&nbsp;</span>
    <div class="lasted-body">
      <ul :style="'left:-'+countDownNumber+'rem;'">
        <li v-for="countDownItem in countDownList" :class="countDownItem"><span></span></li>
      </ul>
    </div>
    <span class='lasted-time'>{{leftTimeText}}</span>
  </div>
</template>

<script>
export default {
  name: 'LastedCountdown',
  props: [ 'qptime', 'isClose','orderId','token'],
  data() {
    return {
      countDownIndex:0,
      leftTime: '', //剩余时间
      leftTimeText: '', //剩余时间字符串
      timer: '', //倒计时计时器
      countDownList:[
        "img_g_1",
        "img_r_1",
        "img_g_2",
        "img_r_2",
        "img_g_3",
        "img_r_3",
        "img_g_4",
        "img_r_4",
        "img_g_1",
        "img_r_1",
        "img_g_2",
        "img_r_2",
        "img_g_3",
        "img_r_3",
        "img_g_4",
        "img_r_4",
        "img_g_1",
        "img_r_1",
        "img_g_2",
        "img_r_2",
        "img_g_3",
        "img_r_3",
        "img_g_4",
        "img_r_4",
      ],
    }
  },
  watch: {
      'token'(newVal, oldVal) {
        if(newVal){
          this.watchChange(newVal,true);
        }

      },
    'orderId'(newVal, oldVal) {
      if(newVal){
        this.watchChange(newVal,false);
      }
    },
    'qptime'(newVal, oldVal) {
      if(newVal){
        this.watchChange(newVal,false);
      }
    },

    // 监视用户是否手动点击了关闭或者继续下单 如果是 则清除计时器
    'isClose'(newVal, oldVal) {
      if (newVal) {
        clearInterval(this.timer);
        console.log('NewCountdown.vue isClose timer paintTimer: ', this.timer, this.paintTimer);
      }
    },
  },
  methods: {
    watchChange(newVal,isToken){
      this.leftTimeText = "...";
      clearInterval(this.timer);
      this.leftTime = Number(this.qptime);

      this.leftTimeText = this.leftTime <= 0 ? "开奖中":this.leftTime.toString() + "s";
      // 剩余时间
      this.timer = setInterval(() => {
        if (this.leftTime <= 0) {
          this.leftTimeText = "开奖中";
          clearInterval(this.timer);
          this.$emit('end');
          this.$emit('checkOrderInfo');
          return;
        }
        this.leftTime--;
        this.leftTimeText = this.leftTime + "s";
      }, 1000);
    },
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    next();
  }
}
</script>

<style lang='less'>
@import '../assets/css/_variable.less';

.lasted-countdown {
  padding: 0 0 .25rem 0;
  background: url('../assets/img/home/lasted_countdown.png') center/cover;
  position: relative;
  span{
    display: block;
    text-align: center;
  }
  .lasted-title{
    color: #9a9a9a;
    font-size: .15rem;
    font-weight: bold;
  }
  .lasted-body{
    height: .5rem;
    width: 90%;
    margin: .2rem auto;
    overflow: hidden;
    ul{
      width: 10000%;
      height: .5rem;
      li{
        display: block;
        position: relative;
        float: left;
        animation: img_move 1.5s infinite;
        -webkit-animation: img_move 1.5s infinite;
        -ms-animation: img_move 1.5s infinite;
        -moz-animation: img_move 1.5s infinite;
        -o-animation: img_move 1.5s infinite;

        animation-timing-function: linear;
        -webkit-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
        -o-animation-timing-function: linear;
        span{
          display: block;
          background: #f00;
          width: .5rem;
          margin: 0 .05rem;
          background:  url('../assets/img/home/count_down.png') center/cover no-repeat;
          height: .5rem;
        }
      }
      .img_r_1{
        span {
          background-position-x: -.4rem;
        }
      }
      .img_r_2{
        span {
          background-position-x: -1.65rem;
        }
      }
      .img_r_3{
        span {
          background-position-y:.02rem;
          background-position-x:-2.8rem;
        }
      }
      .img_r_4{
        span {
          background-position-y:.05rem;
          background-position-x: -3.9rem;
        }
      }
      .img_g_1{
        span {
          background-position-x: .08rem;
        }
      }
      .img_g_2{
        span {
          background-position-x:-1rem;
        }
      }
      .img_g_3{
        span {
          background-position-x: -2.2rem;
        }
      }
      .img_g_4{
        span {
          background-position-y:.05rem;
          background-position-x:-3.4rem;
        }
      }

    }
  }
  .lasted-time{
    font-size: .16rem;
  }
  .tips {
    position: absolute;
    color: @white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: .14rem;
  }
  @keyframes img_move {
    0% {
      left: .0rem;
    }
    100% {
      left: -4.85rem;
    }
  }
}
</style>
