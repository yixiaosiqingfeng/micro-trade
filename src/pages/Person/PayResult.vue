<template>
  <section class="pay-result-page page text-center" :class='{"page-has-header": showHeader}'>
    <v-header title='交易详情' v-if='showHeader' :hideBack='true'></v-header>

    <div class="page-hd" v-if='!showHeader'>支付结果</div>

    <div class="page-bd">
      <div class="flex-v success-container" v-if='success'>
        <p class="flex-item">
          <i class="iconfont icon-success"></i>
        </p>
        <span class="flex-item">支付成功</span>
        <span class="flex-item bd-tips">资金将在{{config.rechargeDays ? config.rechargeDays + '天后' : '今天内'}}汇入您的账户余额</span>
        <div class="btn-area">
          <mt-button class="btn-confirm" type='primary' size='large' @click.native='goto({name: "Person"})'>确定</mt-button>
        </div>
      </div>

      <div v-else>
        <p class="text-deal">正在处理支付中</p>
        <dynamic-points></dynamic-points>
        <div class="btn-area">
          <mt-button :class="['btn-confirm btn-jump', {dynamic: showJump}]" type='primary' size='large' @click.native='goto({name: "Person"})'>等待太久？跳过等待</mt-button>
        </div>
      </div>

      <div class="tips-link"  @click="ServerVisible = true">支付遇到问题？请联系客服微信</div>
      <servercode :visible='ServerVisible'  @cancel="cancel"></servercode>
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import DynamicPoints from '@/components/DynamicPoints';
import Servercode from '@/components/Servercode';

import {mapState} from 'vuex';

export default {
  name: 'PayResult',
  components: {VHeader, DynamicPoints,Servercode},
  data() {
    return {
      success: false,
      timer: null,
      count: 0,
      showJump: false,
      ServerVisible:false,
    }
  },
  computed: {
    ...mapState({
      config: state => state.config,
    }),
    orderNo() {
      return this.$route.query.p2_ordernumber;
    },
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },
  methods: {
    refreshOrder() {
      this.$api.getOrderStatus({orderNo: this.orderNo})
      .then(res => {
        // if (res.code === '00') {
          if (res.data[0] == 1) {
            this.success = true;
            return;
          }
          if (this.count > 4) {
            this.showJump = true;
          } else {
            this.count++;
          }
        // }
        this.timer = setTimeout(() => {
          this.refreshOrder();
        }, 1000);
      })
    },
     cancel(){
     this.ServerVisible=false;
  }

  },
  created() {
    if (this.orderNo) {
      this.refreshOrder();
    }
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer);
    next();
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';
.pay-result-page {
  position: relative;
  .page-hd {
    height: .4rem;
    line-height: .4rem;
    font-size: .16rem;
    background-color: #fff!important;
    border-bottom: 1px solid @border-c;
  }
  .page-bd {
    padding-top: .6rem;
    font-size: .2rem;
    .icon-success {
      color: @green;
    }
  }
  .success-container {
    .flex-item {
      margin-bottom: .2rem;
    }
    i {
      font-size: .8rem;
    }
    .bd-tips {
      font-size: .16rem;
    }
  }
  .btn-area {
    padding: .5rem .3rem 0;
  }
  .btn-confirm {
    background-color: @orange;
    color: #fff;
  }
  .btn-jump {
    position: relative;
    font-size: .14rem;
    opacity: 0;
    transform: scale(0);
    transition: all .7s;
    &.dynamic {
      opacity: 1;
      transform: scale(1);
    }
  }

  .text-deal {
    margin: .5rem 0;
    font-size: .16rem;
    color: @white;
  }
  .tips-link {
    display: block;
    padding: .5rem 0;
    width: 100%;
    text-align: center;
    font-size: .12rem;
    color: @orange;
    text-decoration: underline;
  }
}
</style>
