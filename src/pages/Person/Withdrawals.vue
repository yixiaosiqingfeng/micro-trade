<template>
  <section class="withdrawals-page page" :class='{"page-has-header": showHeader}'>
    <v-header title='提 现' v-if='showHeader'></v-header>

    <div class="v-cell  border cashtop">
      <div class="cell-hd">
        <img class="img-block" :src="getImgURL(userInfo.headImg)" v-if='userInfo.headImg'>
        <img class="img-block" src="../../assets/img/person/logo.jpg" v-else>
      </div>
      <div class="cell-bd cashdetial-In">
        <h3 class="cell-title">{{userInfo.username || ''}}</h3>
          <span class="Outcash">可提现资金: <span>{{format(userInfo.balance,2) || '0.00'}}</span>元</span>
      </div>
    </div>

    <form @submit.prevent='withdrawals ' >
      <div class="cashdown">
        <p class="tip-p">提现将收取提现金额的{{config.withdraw_fee}}%作为佣金</p>
        <p class="tip-p">预计到账时间为{{config.withdraw_day}}天后</p>
       <div class="Money"><span>提现金额：</span><input class="num" type="number" name="money" v-model="form.cashPrice" placeholder="请输入金额"></div>
       <p class="tip-p">最小提现金额 {{config.withdraw_limit}}元</p>
      <!-- <div class="form-hd">
        <mt-field class='cell-common cell-first' label="提现金额" placeholder="请输入提现金额" type='tel' v-model="form.cashPrice"></mt-field>
      </div> -->

          <div class="form-bd">
            <div class="bankcard">
              <div class="bankname">{{userInfo.bank.bankName}}</div>
              <div class="number text-dynamic">{{userInfo.bank.number}}</div>
              <div class="name">{{userInfo.bank.name}}</div>
            </div>
          </div>
      </div>
      <div class="btn-area">
        <input type="submit" value="立即提现" class="mint-button btn-primary mint-button--danger mint-button--large">
      </div>

      <div class="tips-link"@click="ServerVisible = true">提现遇到问题？请联系客服微信</div>
       <servercode :visible='ServerVisible'  @cancel="cancel"></servercode>
    </form>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import Servercode from '@/components/Servercode';
import {mapState} from 'vuex';

export default {
  name: 'Withdrawals',
  components: { VHeader,Servercode },
  data() {
    return {
      form: {
        cashPrice: '', // 提现金额
      },
      ServerVisible:false,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      config: state => state.config,
    }),
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  methods: {
    // 检测提现金额
    checkMoney() {
      if (Number(this.form.cashPrice) < this.config.withdraw_limit) {
        this.$toast('提现金额不能低于'+ this.config.withdraw_limit +'元');
        this.form.cashPrice = '';
        return false;
      } else if (Number(this.form.cashPrice) > Number(this.userInfo.balance)) {
        this.$toast('提现金额不能高于账户余额');
        this.form.cashPrice = '';
        return false;
      }
      return true;
    },

    // 表单提交
    withdrawals() {
      if (this.validate(this.form) && this.checkMoney()) {
        this.$api.withdrawals(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast('申请提现成功');
            setTimeout(() => {
              this.goto({name: 'Person'});
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },
    cancel(){
         this.ServerVisible=false;
      }
  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.withdrawals-page {
  .v-cell {
    border-bottom: 1px solid #c8c8c8;
    background: none;
    .img-block {
    border-radius: 50%;
  }

  .cell-title {
    line-height: normal;
    color:#282828;
  }
  .cell-sub-fee {
    font-size: .12rem;
  }
  .mint-cell {
    height: .45rem;
    min-height: .45rem;
    .mint-field-core {
      color: @white;
    }
    .mint-cell-text {
      color: @white;
    }
  }
  .cell-common {
    font-size: .14rem;
    input {
      font-size: .14rem;
    }
    .mint-button {
      border: none;
      background-color: #fff;
      box-shadow: none;
      font-size: .14rem;
      color: @blue;
    }
  }
  .cashdetial-In{
    line-height: .4rem;
    padding-left: .2rem;
  .Outcash{
    background: #f8e71c;
    color:black;
    padding: 2px 14px 2px 8px;
     border-radius:50px;
  }
}
  .cell-region input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cell-fees {
    height: .35rem;
    line-height: .35rem;
    min-height: .35rem;
    /* color: @gray-light; */
    font-size: .12rem;
    input {
      font-size: .12rem;
      color: @primary;
    }
  }}
   .cashtop{
      background: #f3f3f3;
      margin: .22rem/2 .22rem/2 0 ;
      padding: .2rem ;
      border-radius: 5px;
  }
  .cashdown{
      background: #f3f3f3;
      padding: .7rem/2 .2rem/2 .2rem;
      margin: 0 .22rem/2  ;
      border-radius: 5px;
      .tip-p{
        color: #ea2323;
        line-height: 20px;
        padding-left: 5px;
      }
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
  .form-hd {
    margin: .1rem 0 .2rem;
  }
  .btn-area {
    margin: .3rem .1rem;
    .btn-primary{
     background: #e01111;
    }
  }
  .tips-link {
    display: block;
    padding: .2rem 0;
    width: 100%;
    text-align: center;
    font-size: .12rem;
    color: @orange;
    text-decoration: underline;
  }

  .bankcard {
    background: url('../../assets/img/person/bankbg.jpg');
    width: 90%;
    height: 1.5rem;
    margin: .2rem auto;
    border-radius: .1rem;
    border: 1px solid @white;
    box-sizing: border-box;
    padding: .1rem .2rem;
    .bankname {
      font-size: .18rem;
      color: @white;
      padding-bottom: .1rem;
      border-bottom: 1px solid @gray-white;
    }
    .number {
      text-align: center;
      color: @black;
      font-size: .2rem;
      font-weight: bold;
      padding: .2rem 0;
    }
    .name {
      text-align: right;
      font-size: .18rem;
      color: @white;
    }
  }
}

</style>
