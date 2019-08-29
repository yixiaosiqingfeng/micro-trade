<template>
  <section class="page order-record-detail-page" :class='{"page-has-header": showHeader}'>
    <v-header :title='title' v-if='showHeader'></v-header>


    <div class="page-content">

      <div class="page-hd">
        <div class="hd-l">
          <span>{{recordInfo.ptitle}}</span>
        </div>
        <div class="hd-r">
          <p>订单号：{{recordInfo.orderno}}</p>
          <p>游戏时间：{{formatPHPTime(recordInfo.buytime)}}</p>
        </div>
      </div>

      <div class="page-bd">
        <div class="bd-l">
          <span :class="[recordInfo.ostyle === 1 ? 'green' : 'red']">{{recordInfo.ostyle === 1 ? '黑' : '红'}}</span>
        </div>
        <div class="bd-r">
          <p >买入价格：<span class="green">{{format(recordInfo.buyprice)}}</span></p>
          <p>结算价格：<span class="red">{{format(recordInfo.sellprice)}}</span></p>
          <p>下注数量：{{recordInfo.onumber}}</p>
        </div>
      </div>

      <div class="page-ft flex text-dynamic">
        <div class="ft-l flex-item flex-v text-dynamic">
          <p class="ft-t gray-light">消耗金豆</p>
          <p class="ft-b flex-item">{{recordInfo.commission}}</p>
        </div>
        <div class="ft-c flex-item flex-v text-dynamic">
          <p class="ft-t gray-light">盈利资金</p>
          <p class="ft-b flex-item gray-white">{{format(endless)}}</p>
        </div>
        <div class="ft-r flex-item flex-v text-dynamic">
          <p class="ft-t gray-light">本单盈余</p>
          <p class="ft-b flex-item gray-white">{{format(profit)}}</p>
        </div>
      </div>

    </div>

  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'OrderRecordDetail',
  components: {VHeader},
  data() {
    return {
      recordInfo: {}, //正在进行中的订单信息
      profit:0,
      endless:0,
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
    title() {return '记录详情';}
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.getOrderInfo();
    this.getOrderStatus();
  },

  methods: {
    getOrderInfo() {
      this.$api.getOrderInfo({oid: this.$route.query.oid})
      .then(res => {
        this.$indicator.close();
        if (res.code === '00') {
          this.recordInfo = res.data.order;
        } else {
          this.$toast(res.msg);
        }
      })
    },
    getOrderStatus() {
      this.$api.getOrderRecordStatus({oid: this.$route.query.oid})
      .then(res => {
        if (res.code === '00') {
          this.endless = res.data.ykzj;
          this.profit = res.data.bdyy;
        }
      })
    }

  },

  beforeRouteLeave(to, from, next) {
    this.$indicator.close();
    next();
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';
.order-record-detail-page {
  .page-content {
    padding: .15rem .1rem;
  }
  .page-hd {
    color: @black;
    background-color: @white-light;
    border-radius: .05rem;
    padding: .2rem .1rem;
    overflow: hidden;
    .hd-l{
      float: left;
      width: 30%;
      text-align: center;
      border-right: 1px solid @border-c;
      span{
        line-height: .5rem;
        font-size: .16rem;
      }
    }
    .hd-r{
      float: right;
      width: 60%;
      p{
        display: block;
        line-height: .25rem;
        font-size: .12rem;
      }
    }
  }
  .page-bd {
    color: @black;
    background-color: @white-light;
    border-radius: .05rem;
    padding: .2rem .1rem;
    overflow: hidden;
    border-top: 1px solid @border-c;
    border-bottom: 1px solid @border-c;
    .bd-l{
      float: left;
      width: 30%;
      text-align: center;
      border-right: 1px solid @border-c;
      span{
        line-height: .75rem;
        font-size: .16rem;
      }
    }
    .bd-r{
      float: right;
      width: 60%;
      p{
        display: block;
        line-height: .25rem;
        font-size: .12rem;
      }
    }
  }

  .page-ft {
    background-color: @white-light;
    border-radius: .05rem;
    padding: .3rem .1rem;
    .ft-t {
      color: @black;
    }
    .ft-b {
      width: .8rem;
      height: .8rem;
      line-height: .8rem;
      border-radius: 50%;
      margin: .2rem auto 0;
      font-size: .14rem;
      color: @white;
    }
    .ft-l .ft-b {
      background-color: #e37c2b;
    }
    .ft-c .ft-b {
      background-color: #9e33c7;
    }
    .ft-r .ft-b {
      background-color: #b2b2b2;
    }
  }

}
/*.order-record-detail-page {
  .page-hd {
    padding: .2rem 0;
    font-size: .14rem;
    .hd-l {
      display: inline-block;
      width: 1.5rem;
      text-align: right;
    }
    .hd-r {
      padding-left: .05rem;
      text-align: left;
    }
    .hd-m {
      margin: .1rem 0;
    }
  }

  .page-bd {
    border-top: 1px solid @border-c;
    border-bottom: 1px solid @border-c;
    padding: .2rem 0;
    font-size: .12rem;
    .bd-l {
      display: inline-block;
      width: .8rem;
      text-align: right;
    }
    .bd-r {
      padding-left: .05rem;
      text-align: left;
    }
    .bd-item {
      height: .3rem;
      line-height: .3rem;
    }
  }

  .page-ft {
    padding: .2rem 0;
    color: @gray-white;
    font-size: .12rem;
    .ft-t {
      font-size: .14rem;
      margin-bottom: .2rem;
    }
    .ft-b {
      width: .8rem;
      height: .8rem;
      line-height: .8rem;
      margin: 0 auto;
      border-radius: 50%;
      background-color: @brown;
    }
    .ft-l .ft-b {
      box-sizing: border-box;
      line-height: normal;
      padding-top: .25rem;
    }
    .ft-c .ft-b {
      background-color: @green-light;
    }
  }
  }*/
  </style>
