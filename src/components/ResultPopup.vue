<template>
  <div class="result-popup">
    <mt-popup v-model="visible" class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">订单状态</div>

      <div class="popup-bd">

        <!-- 倒计时特效 -->
        <div class="bd-b">
          <lasted-countdown :qptime='qptime' :orderId='countdownId' :token='token' :is-close='isClose' @checkOrderInfo = 'checkOrderInfo' @end='end' v-show='showCountdown' :show-countdown='showCountdown'></lasted-countdown>


          <div class="result-container" v-if='!showCountdown'>
            <span class="commission">{{orderInfo.ploss}}</span>
            <img v-show="prediction.value === 1" src="../assets/img/home/win.png">
            <img v-show="prediction.value != 1" src="../assets/img/home/lose.png">
          </div>
        </div>

        <div class="bd-t">
          <div class="bd-t-title flex">
            <p class="flex-item">开仓价格</p>
            <p class="flex-item">当前价格</p>
            <p class="flex-item">方向</p>
            <p class="flex-item">预测结果</p>
          </div>
          <div class="bd-t-content">
            <div class="bd-t-content-item flex">
              <p class="flex-item white">{{orderInfo.buyprice}}</p>
              <p :class="['flex-item', orderInfo.price >= orderInfo.buyprice ? 'red' : 'green']">{{orderInfo.price}}</p>
              <p :class="['flex-item', orderInfo.ostyle === 1 ? 'green' : 'red']">{{orderInfo.ostyle === 1 ? '猜黑' : '猜红'}}</p>
              <p :class="['flex-item', prediction.value === 1 ? 'red' : 'green']">{{prediction.label}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-area flex">
        <mt-button class="flex-item btn-cancel" type='danger' size='large' plain @click.native='close'>关闭</mt-button>
        <mt-button class="flex-item btn-confirm" type='danger' size='large' @click.native='close'>继续下单</mt-button>
      </div>
    </mt-popup>
  </div>
</template>


<script>
import LastedCountdown from '@/components/LastedCountdown';
import {mapState} from 'vuex';

export default {
  name: 'OrderPopup',
  props: ['visible', 'orderId','token'],
  components: {LastedCountdown},
  data() {
    return {
      oid: '',
      qptime:'',
      countdownId:"",
      orderInfo: {},
      timer: 0, //计时器
      timerRes: '', //计时器
      showCountdown: true,
      isClose: false, //是否点击了关闭或者继续下单按钮
    }
  },

  computed: {
    prediction() {
        if(this.orderInfo.ostaus == 1){
          if ( this.orderInfo.ploss > 0 ) {
            return {label: '赢', value: 1};
          } else {
            return {label: '输', value: 0};
          }
        }else{
          if (((this.orderInfo.price > this.orderInfo.buyprice) && this.orderInfo.ostyle === 0)
            || ((this.orderInfo.price < this.orderInfo.buyprice) && this.orderInfo.ostyle === 1)) {
            return {label: '赢', value: 1};
          } else {
            return {label: '输', value: 0};
          }
        }
    }
  },

  watch: {
//    'orderId'(newVal, oldVal) {
//      if(newVal){
//        this.watchChange(newVal,false);
//      }
//    },
    'token'(newVal, oldVal) {
        if(newVal){
          this.watchChange(newVal,true);
        }
    },
  },

  methods: {
    watchChange(newVal,isToken){
      this.oid = this.orderId;
      this.reset();
      this.getOrderInfo()
        .then(res => {
          this.countdownId = this.oid;
          this.qptime =  this.orderInfo.openTime;
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            this.getOrderInfo();
          }, 2000);
        })
    },


    // 重置
    reset() {
      clearInterval(this.timer);
      this.showCountdown = true;
      this.orderInfo = {};
      this.isClose = false;
    },

    // 倒计时完毕
    end() {
      clearInterval(this.timer); //停止获取订单信息
      clearTimeout(this.timerRes); //停止获取订单信息
    },


    // 检测订单状态
    checkOrderInfo(){
      clearTimeout(this.timerRes); //停止获取订单信息
      this.getOrderInfo().then(res=>{
        if( this.orderInfo.ostaus == 1 ){
          clearTimeout(this.timerRes); //停止获取订单信息
          this.showCountdown = false;
          // 出结果后更新用户信息(金豆)
          this.getUserInfo();
        }else{
          // 递归
          this.timerRes = setTimeout(() => {this.checkOrderInfo()},2000);
        }
      });
    },


    // 获取订单信息
    getOrderInfo() {
      return this.$api.getOrderInfo({oid: this.oid})
      .then(res => {
        if (res.code === '00') {
          this.orderInfo = res.data.order;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    close() {
      this.isClose = true;
      this.end();
      this.$emit('close');
    },
  },

  beforeRouteLeave(to, from, next) {
    this.end();
    next();
  }
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.result-popup {
  .popup-container {
    z-index: 10;
    width: 90%;
    border-radius:10px;
    background-color: @popup-bgc;
    border: @popup-border .03rem solid;
  }
  .picker-toolbar {
    line-height: .8rem;
    font-size: .16rem;
    text-align: center;
    background: url('../assets/img/home/popup-top.png') center top no-repeat;
    background-size: 55% ;
    margin-top: -.3rem;
    padding:.35rem 0 .15rem 0;
  }

  .popup-bd {
    margin-top: .2rem;
    padding: 0 0 .15rem 0;
    background: @popup-body-bgc;
    font-size: .12rem;
    .bd-t {
      background-color: @order-bgc;
      border-radius: .1rem;
      margin: 0 .15rem;
    }
    .bd-t-title,
    .bd-t-content-item {
      height: .3rem;
      line-height: .3rem;
    }
.bd-t-title{
  .flex-item{
  color: #848484;
  }
}
    .bd-b {

    }
  }


    .btn-area {
      padding: .04rem 0;
    .mint-button {
      border-radius: 0;
      font-size: .15rem;
      background-color:@popup-bgc;
    }
    .btn-cancel {
      border: none;
      color: @gray;
    }
    .btn-confirm {
      color: @orange;
      border-left: .01rem solid  @popup-border;
    }
    .btn-danger {
      margin: 0;
      height: .41rem;
      line-height: .41rem;
    }

    }

  .result-container {
    /*padding: .1rem 0;*/
    text-align: center;
    font-size: .3rem;
    position: relative;
    img{
      width: 100%;
    }
    .commission{
      position: absolute;
      font-size: .12rem;
      color: #f4ea2a;
      left: 75%;
      top: 42%;
    }
  }

}

</style>
