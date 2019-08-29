<template>
  <section class="page record-detail-page" :class='{"page-has-header": showHeader}'>
    <v-header title='订单详情' v-if='showHeader'></v-header>

    <div class="page-hd Samepart">
      <div class="page-hdleft">
        <p class="hd-m flex-item text-left text-dynamic"><span class="hd-r">{{recordInfo.ptitle}}</span></p>
      </div>
      <div style="border-left: 1px solid #e3e3e3"></div>
      <div class="page-hdright">
        <p  class="hdright-in"><span>订单号：</span><span>{{recordInfo.orderno}}</span></p>
        <p ><span >下注时间：</span><span>{{formatPHPTime(recordInfo.buytime)}}</span></p>
        <!-- <p class="hd-t flex-item  text-dynamic"><span class="hd-l">订单号：</span><span class="hd-r">{{recordInfo.orderno}}</span></p>
        <p class="hd-b flex-item  text-dynamic"><span class="hd-l">下注时间：</span><span class="hd-r">{{formatPHPTime(recordInfo.buytime)}}</span></p> -->
      </div>
    </div>

    <div class="page-bd flex Samepart">
      <div class="flex-item flex-v text-left text-dynamic">
        <p class="bd-item bd-t text-dynamic">
          <span class="bd-l">竞猜方向：</span>
          <span :class="['bd-r font-18', recordInfo.ostyle === 1 ? 'green' : 'red']">{{recordInfo.ostyle === 1 ? '黑' : '红'}}</span>
        </p>
        <p class="bd-item bd-m text-dynamic"><span class="bd-l">下注数量：</span><span class="bd-r">{{recordInfo.onumber}}</span></p>
        <p class="bd-item bd-m text-dynamic"><span class="bd-l">佣金：</span><span class="bd-r red font-18">{{format(recordInfo.fee,2)}}</span></p>
       <!--  <p class="bd-item bd-b text-dynamic"><span class="bd-l">止盈：</span><span class="bd-r">{{recordInfo.endprofit}}%</span></p> -->
      </div>
      <div class="flex-item flex-v text-left text-dynamic">
        <p class="bd-item bd-m text-dynamic"><span class="bd-l">买入价格：</span><span class="bd-r green">{{format(recordInfo.buyprice)}}</span></p>
        <p class="bd-item bd-m text-dynamic"><span class="bd-l">结算价格：</span><span class="bd-r orange">{{format(recordInfo.sellprice)}}</span></p>
        <p class="bd-item bd-t text-dynamic"><span class="bd-l">下注消耗：</span><span class="bd-r">{{format(recordInfo.jc,2)}}</span></p>

        <!-- <p class="bd-item bd-b text-dynamic"><span class="bd-l">止损：</span><span class="bd-r">{{recordInfo.endloss}}%</span></p> -->
      </div>
    </div>

    <div class="page-ft  Samepart">
        <div class="ftdetial-top">
           <div class=" flex-item flex-v">
          <p class="ft-t">时间</p>
          <div class="ft-b">{{recordInfo.qptime}}秒</div>
        </div>
        <div class="ft-c flex-item flex-v">
          <p class="ft-t">收益率</p>
          <div class="ft-b">{{recordInfo.endprofit}}%</div>
        </div>
        </div>
     </div>
     <div style="width: 93%;border-top: 1px solid #e3e3e3; margin:0 auto"></div>
      <div class="page-ft  Samepart">
        <div class="ftdetial-down">
          <div class="ftdetial-downIn">
            <div class="ft-c flex-item flex-v">
              <p class="ft-t">盈利资金</p>
              <div class="ft-b " id="dleft">{{format(recordInfo.ploss,2)}}</div>
            </div>
            <div class="ft-r flex-item flex-v">
              <p class="ft-t">本单盈余</p>
              <div class="ft-b " id="dright">{{format(recordInfo.ploss,2)}}({{recordInfo.bfb}}%)</div>
            </div>
          </div>
           <div class="countTime">
              <p >结算时间
              <span >{{formatPHPTime(recordInfo.selltime)}}</span></p>
        </div>
      </div>
   </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'RecordDetail',
  components: {VHeader},
  data() {
    return {
      recordInfo: {},
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.getRecordInfo();
  },

  methods: {
    getRecordInfo() {
      this.$api.getRecordInfo({oid: this.$route.query.id})
      .then(res => {
        this.$indicator.close();
        if (res.code === '00') {
          this.recordInfo = res.data;
        } else {
          this.$toast(res.msg);
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

.record-detail-page {

  .Samepart{
        background: #f3f3f3;
        border-radius: 5px; margin: 0 .1rem;
        color:#4f4f4f;
     }
  .page-hd {
        padding: .2rem ;
        font-size: .12rem;
        display: flex;
        justify-content: space-between;
        margin-top: .1rem;
    .hd-m {
      margin: .15rem 0;
      font-size: 16px;
      color:#525252;
    }
    .hdright-in{
      margin: 0 0 .2rem 0;
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
.ftdetial-top,.ftdetial-downIn{
        display: flex;
        justify-content: space-between;
      }
  .page-ft {
    padding: .2rem 0;
    font-size: .14rem;
    text-align: center;
    .ft-t {
      font-size: .14rem;
      margin-bottom: .2rem;
      color:black;
    }
    .ft-b {
      width: .9rem;
      height: .9rem;
      line-height: .9rem;
      margin: 0 auto;
      border-radius: 50%;
      background-color:#e09b2a;
     color: white;

    }
    .ft-l .ft-b {
      box-sizing: border-box;
      line-height: normal;
      padding-top: .25rem;
    }
    .ft-c .ft-b {
      background-color:#46bda2;
    }
    #dleft{

      background-color:#ac1e94;
    }
    #dright{
     background-color:#b2b2b2;
    }
    .countTime{margin-top: .4rem ;color:#464646;}
  }
}
</style>
