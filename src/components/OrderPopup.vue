<template>
  <div class="order-popup">
    <mt-popup v-model="visible"  class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">订单确认</div>

      <div class="popup-bd">
        <div class="bd-row bd-row-0">
          <p class="row-hd">选择商品</p>
          <div class="row-bd">
            <div class='time-container' v-for='(goods, index) in goodsList' :key='goods.id'>
              <mt-button :class="['btn-time', {'selected': form.mypid == goods.id}]" type="default" @click.native='chooseGoods(index)'>{{goods.title}}</mt-button>
            </div>
          </div>
        </div>
        <div class="bd-row bd-row-1">
          <p class="row-hd">结算时间</p>
          <div class="row-bd">
            <div class="time-container" v-for='time in config.stoptime' :key='time[0]'>
              <div :class="['btn-time flex-v', {'selected': form.qptime == time[0]}]" @click='form.qptime = time[0]'>
                <p class="btn-time-t flex-item">{{time[0]}}秒</p>
                <p class="btn-time-b flex-item red">
                  <!--<i class="iconfont icon-zhuanqushouyi"></i>-->
                  收益{{time[1]}}%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bd-row bd-row-2">
          <p class="row-hd">下注注数：{{goodsList[selectedGoodsIndex] && goodsList[selectedGoodsIndex].price}}金豆/注，最大下注注数：{{goodsList[selectedGoodsIndex] && goodsList[selectedGoodsIndex].maxNumber}}注</p>
          <div class="row-bd">
            <div class="row-bd-t">
              <div class='price-container' v-for='lot in lots' :key='lot'>
                <mt-button :class="['btn-price', {'selected': form.mysum == lot}]" type="default" @click.native='form.mysum = lot'>{{lot}}</mt-button>
              </div>
            </div>
            <div class="row-bd-b">
              <!--<mt-button class="btn-count" type='default' size='small' @click.native='form.mysum = form.mysum > 1 ? (form.mysum - 1) : "0"'>-->
                <!--<i class="iconfont icon-minus"></i>-->
              <!--</mt-button>-->
              <input placeholder="手动输入" type="number" name="" v-model='form.mysum'>
              <!--<mt-button class="btn-count" type='default' size='small' @click.native='form.mysum = form.mysum < 40000 ? (form.mysum + 1) : "40000"'>-->
                <!--<i class="iconfont icon-add"></i>-->
              <!--</mt-button>-->
            </div>
          </div>
        </div>
      </div>

      <div class="btn-area flex">
        <mt-button class="flex-item btn-cancel" type='danger' size='large' plain @click.native='cancel'>取消</mt-button>
        <router-link class="mint-button flex-item btn-danger mint-button--danger mint-button--large" to='/topup' v-if='goodsList[selectedGoodsIndex] && (goodsList[selectedGoodsIndex].price * form.mysum > userInfo.balance)'>余额不足，前往充值</router-link>
        <mt-button class="flex-item btn-confirm" type='danger' size='large' @click.native='confirm' v-else>确定</mt-button>
      </div>
    </mt-popup>
  </div>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'OrderPopup',
  props: ['visible', 'direction'],
  data() {
    return {
      lots: ['5', '10', '20', '50', '100'],
      goodsList: [], // 该产品产品分类下的商品列表
      selectedGoodsIndex: 0, //选中商品的索引
      form: {
        mysum: '5', // 下单数量
        myfx: '', // 下单方向 '猜红' or '猜黑'
        mypid: '', // 商品id
        qptime: '', // 选择的时间
      }
    }
  },

  computed: {
    ...mapState({
      config: state => state.config,
      userInfo: state => state.userInfo,
    })
  },

  created() {
    this.getGoodsList();
  },

  mounted() {
    this.form.qptime = this.config.stoptime && this.config.stoptime[0][0];
  },

  methods: {
    // 获取该产品分类下的所有详细商品列表
    getGoodsList() {
      this.$api.getGoodsList({categoryId: this.$route.query.id})
      .then(res => {
        if (res.code === '00') {
          this.goodsList = res.data;
          this.form.mypid = this.goodsList[0].id;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 选择商品
    chooseGoods(index) {
      this.form.mypid = this.goodsList[index].id;
      this.selectedGoodsIndex = index;
    },

    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.form.myfx = this.direction;
      this.$emit('confirm', this.form);
    },
  }
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.order-popup {
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
    padding: 0 .15rem .15rem .15rem;
    background: @popup-body-bgc;
    font-size: .12rem;
  .bd-row-0{
    display: none;
  }
    .bd-row-1 {
      .row-bd {
        overflow-x: scroll;
        overflow-y: hidden;
        display: flex;
        &::-webkit-scrollbar {
            display: none;
        }
          .btn-time-t{
            font-size: .14rem;
            padding: .05rem 0;
          }
         .btn-time-b{
           color: @red-f00;
           border-radius: 50% 50% 5px 5px;
           padding: .05rem 0;
         }
      }
    }
    .bd-row-2 {
    .row-bd-t{
      button{
        font-weight: bold;
      }
    }
      .row-bd-b {
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        font-size: .12rem;
        .btn-count {
          display: block;
          width: .25rem;
          height: .25rem;
          padding: 0;
          background: #fafafa;
          border: 1px solid #f0f0f0;
          i {
            font-size: .18rem;
          }
        }
        input {
          flex: 1;
          width: 90%;
          padding:0  5% ;
          height: .36rem;
          border-radius: 5px;
          line-height: .36rem;
          text-align: left;
          margin: 0 .08rem;
          border: 1px solid #f0f0f0;
        }
      }
    }
    .row-hd {
      height: .3rem;
      color:@gray-5;
      line-height: .3rem;
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
}

</style>
