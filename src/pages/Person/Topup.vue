<template>
  <section class="page topup-page" :class='{"page-has-header": showHeader}'>
    <v-header title='充值' v-if='showHeader'></v-header>
    <div class="cashtop">
        <h3 class="page-hd">充值金额(元)</h3>
        <div class="select-area">
          <div class='price-container' v-for='price in moneys' :key='price'>
            <mt-button :class="['btn-price', {'selected': form.value == price}]" type="" @click.native='form.value = price'>{{price}}</mt-button>
          </div>
        </div>
         <!--<mt-field class='Nobg' label="自定义金额" placeholder="请输入金额" type="number" v-model="form.value"></mt-field>-->
       <div class="Money" v-show="showRecharge"><span>自定义金额：</span><input class="num" type="number" name="money" v-model="form.value" placeholder="请输入金额"></div>
    </div>
    <div class="cashdown">
        <div class="border"></div>
         <!--<payWay v-on:changePayType='changePayType' v-on:getPayWays='getPayWays'  ></payWay>-->
         <div class="pay-way" v-on:changePayType='changePayType' v-on:getPayWays='getPayWays'>
            <mt-cell class='cell-way' v-for='(way, index) in payWays' :key='way.value' :title='way.title' @click.native='choose(index); showRecharge=way.isInput;moneys=way.moneys'>
              <img :src="way.icon" slot='icon' width="26" height="26">
              <span class="input-container">
            <input type="radio" class="mint-checkbox-input" :checked='selectedIndex == index'>
            <span class="mint-checkbox-core"></span>
          </span>
            </mt-cell>
          </div>
         <div class="donate" @click="showDonate = true">金额太大？ ></div>
     </div>
    <div class="btn-area">
      <mt-button class="btnPay" type='danger' size='large' @click.native='pay' :disabled='disabledPay'>立即充值</mt-button>
    </div>
    <div class="donate-mask" v-show="showDonate" @click="showDonate = false">
      <p>请添加客服微信充值</p>
      <img :src='config.custom_qrcode' alt="">
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import PayWay from '@/components/PayWay';
import {mapState} from 'vuex';

export default {
  name: 'Login',
  components: {VHeader, PayWay},
  data() {
    return {
      prices: ['100', '300', '500', '900','1000', '3000', '5000',  '10000'],
      payWays: [],
      moneys:[],
      selectedIndex: 0, //选中的支付方式
      form: {
        payType: '',
        value: '100',
        url: '', //回调地址
        isIOS:1,
      },
      showRecharge:false,
      disabledPay: false,
      showDonate:false,
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
    ...mapState({
      config: state => state.config,
    })
  },
  created() {
    this.getPayWay();
  },
  methods: {
    choose(index) {
      this.payWays.forEach((item, key) => {
        if (index == key) {
          this.selectedIndex = index;
          // 报告 支付方式已更改
          // this.$emit('changePayType', {payType: item.value});
          this.form.payType=item.value;
        }
      })
    },
    // 获取支付方式
    getPayWay() {
      var type = this.isWeChat() ? 'weChat' : 'h5';
      this.$api.getPayWay({type: type})
        .then(res => {
          if (res.code === '00') {
            this.payWays =this.payWays.concat(res.data) ;
            this.moneys=res.data[0].moneys;
            this.$emit('getPayWays', this.payWays);
            if (this.payWays.length > 0 ) {
              // this.$emit('changePayType', {payType: this.payWays[this.selectedIndex].value});
              this.form.payType=this.payWays[this.selectedIndex].value;
            }
          } else {
            this.$toast(res.msg);
          }
        })
    },
    // 改变支付方式
    // changePayType(obj) {
    //   this.form.payType = obj.payType;
    // },
    // 获取支付列表
    getPayWays(list) {
      this.payWays = list;
      if (this.payWays.length <= 0) {
        this.disabledPay = true;
      }
    },

    // 充值
    pay() {
      if(this.isApp()){
        this.form.isIOS=0;
      }else {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS){
          this.form.isIOS=1;
        }else if(isAndroid){
          this.form.isIOS=0;
        }
      }
      this.disabledPay = true;
      this.form.url = encodeURIComponent('http://' + window.location.host + '/#/pay-result');
      if (this.validate(this.form)) {
        this.$api.pay(this.form)
        .then(res => {
          this.disabledPay = false;
          if (res.code === '00') {
            window.localStorage.setItem('orderno', res.data[1]);
            if (this.isApp()) {
                 this.goto({name: 'ConfirmPay', query: {src: res.data[0]}})
                 return;
            }
            window.location.href = res.data[0];
          } else {
            this.$toast(res.msg);
          }
        })
      }
    }
  }

}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.topup-page {
  .pay-way {
    .cell-way {
      border-bottom: 1px solid @popup-bgc;
      font-size: .15rem;
      .mint-cell-text {
        margin-left: .05rem;
        color: @white;
      }
    }
  }
  .page-hd {
    font-size: .14rem;
    margin-left: .12rem;
    // padding: .rem 0;
    font-weight: normal;
    color:black;
  }
  .select-area {
    margin-bottom: .2rem;
  }
  .price-container {
    width: 25%;
  }
  .input-container {
    // color: @white;
    // background-color: @order-bgc;
    border-bottom: none;
    .mint-field-core {
      // background-color: @order-bgc;
      color: @white;
      text-align: right;
      padding: 0 .3rem;
      font-size: .14rem;
    }
  }
  .btnPay{background: #e01111;}

  .pay-way {
    margin-top: .2rem;
  }

  .btn-area {
    padding: .2rem;
  }
  .cashtop{
    height: 188px;
            background: #f3f3f3;
            padding: .7rem/2 .58rem/2;
            margin: .22rem/2 .22rem/2 0 ;
            border-radius: 5px;
      .Money{
        border:1px solid #979797;
        border-radius:5px;
        font-size: 14px;
        color:black;
        padding: 0 .28rem/2;
          .num{
            height:.8rem/2;
             background: none;
             border:none;
             outline: none;
             padding-left: .2rem;
             color:#b0b0b0;
             width: 40%;
           }
        }
      }
      .cashdown{
        background: #f3f3f3;
        padding: 0  .58rem/2  0.6rem/2;
        margin: 0 .22rem/2  ;
        border-radius: 5px;
        .pay-way{
          margin: 0;padding-top: .4rem/2;
          .cell-way{
            background: none;
            border-bottom: 1px solid #c8c8c8;
          .mint-cell-text{color:#3b3b3b;}
          }
        }
        .donate{
          color: #e49510;
          // text-decoration: underline;
          line-height: 30px;
          text-align: right;
        }
      }
      .donate-mask{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        p{
          position: fixed;
          text-align: center;
          width: 100%;
          top: 25%;
          font-size: 14px;
        }
        img{
          width: 60%;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
}
</style>
