<template>
  <section class="page order-record-page" :class='{"page-has-header": showHeader}'>
    <v-header title='下注记录' v-if='showHeader'></v-header>

    <!-- <div class="page-hd">今日盈利：0金豆</div> -->

    <div class="page-bd flex">
      <div class="bd-item flex-v" v-for='(item, index) in productList' :key='item.id'>
        <p class="flex-item bd-item-t">{{item.name}}</p>
        <p :class="['flex-item bd-item-b', item.price >= oldProductList[index].price ? 'red' : 'green']">
          {{format(item.price)}}
          <i class="iconfont icon-jjj" v-if='item.price >= oldProductList[index].price'></i>
          <i class="iconfont icon-down" v-else></i>
        </p>
      </div>
    </div>

    <div class="page-ft">
      <div class="ft-title flex">
        <p class="flex-item">下注金额</p>
        <p class="flex-item">产品</p>
        <p class="flex-item">方向</p>
        <p class="flex-item">数量</p>
        <p class="flex-item">操作</p>
      </div>

      <template v-if='orderList.length > 0'>
        <div class="ft-content">
          <router-link class="ft-content-item flex" :to="'/order-record-detail?oid=' + item.oid" v-for='item in orderList' :key='item.oid'>
            <p class="flex-item text-dynamic">{{format(item.buyprice)}}</p>
            <p class="flex-item text-dynamic">{{item.productName}}</p>
            <p :class="['flex-item text-dynamic', item.ostyle === 1 ? 'green' : 'red']">{{item.ostyle === 1 ? '小' : '大'}}</p>
            <p class="flex-item text-dynamic">{{item.onumber}}</p>
            <p class="flex-item text-dynamic"><mt-button class="btn-look" type='small'>查看</mt-button></p>
          </router-link>
        </div>
      </template>

      <template v-else-if='inited && orderList.length <= 0'>
        <div class="empty-container flex-v">
          <i class="iconfont icon-zanwushuju"></i>
          <!-- <img src="../../assets/img/person/result-empty.png"> -->
          <p>暂无数据</p>
        </div>
      </template>


    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'OrderRecord',
  components: {VHeader},
  data() {
    return {
      oldProductList: [], // 上一秒头部信息列表数据 用于对比这一秒和上一秒的现价
      productList: [], // 头部信息列表
      orderList: [], // 正在进行中的订单列表
      timer: '', //计时器
      inited: false, //是否请求完
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});

    this.getProductList();
    this.getOrderList();

    this.timer = setInterval(() => {
      this.getProductList();
    }, 2000);

  },

  methods: {
    // 获取商品分类列表
    getProductList() {
      this.$api.getProductList({needInfo: true})
      .then(res => {
        this.$indicator.close();
        if (!this.inited) { this.inited = true; }
        if (res.code === '00') {
          this.oldProductList = Object.assign({}, this.productList);
          this.productList = res.data;
          if(parseInt(this.oldProductList.length)!=this.productListlength){
            this.oldProductList =this.productList;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取进行中的订单列表
    getOrderList() {
      this.$api.getOrderList()
      .then(res => {
        this.$indicator.close();
        if (res.code === '00') {
          this.orderList = this.orderList.concat(res.data);
        } else {
          this.$toast(res.msg);
        }
      })
    },
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

.order-record-page {
  .page-hd {
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    background-color: #D82C2C;
    color: @white;
    font-size: .14rem;
  }

  .page-bd {
    height: .6rem;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    background-color: @black-light;
    font-size: .13rem;
    &::-webkit-scrollbar {
        display: none;
    }
    .bd-item {
      width: 30%;
      flex: 0 0 auto;
    }
    .bd-item-t {
      color: @white;
      line-height: .3rem;
      margin-bottom: .05rem;
    }
  }

  .page-ft {
    color: #000;
    .ft-title{
      padding: 0 3%;
      height: .4rem;
      line-height: .4rem;
      background-color: #fff;
      border-bottom: 1px solid @border-c;
    }
    .ft-content-item {
      height: .4rem;
      width: 94%;
      margin: 5px auto;
      border-radius: 8px;
      line-height: .4rem;
      border-bottom: 1px solid @border-c;
      background-color: #fff;
    }
    .ft-title {
      font-size: .13rem;
    }
    .btn-look {
      background-color: #E37C2B;
      border: none;
      width: 100%;
      height: 0.4rem;
      outline: none;
      color: #fff;
      border-radius: 0 8px 8px 0;
    }
  }
}
</style>
