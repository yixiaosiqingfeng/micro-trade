<template>
  <section class="page pay-list-page" :class='{"page-has-header": showHeader}'>
    <v-header title='支付记录' v-if='showHeader'></v-header>
    <template v-if='payList.length > 0'>
      <div class="page-list" v-infinite-scroll="getPayList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="record-cell" v-for='item in payList' :key='item.id'>
          <div class="cell-hd">
            <i class="iconfont icon-icon-test1"></i>
          </div>
          <div class="cell-bd">
            <div class="flex cell-title">
              <span>{{item.payType}}</span>
              <span class="flex-item text-right text-dynamic green">{{format(item.amount,2)}}</span>
            </div>
            <div class="flex cell-sub">
              {{item.orderNo}}
              <span class="flex-item text-right cell-desc">{{formatPHPTime(item.payTime,{hideTime:true})}}</span>
            </div>
          </div>
        </div>

        <div class="loading-container">
          <mt-spinner :type="2" v-if='loading && !completed'></mt-spinner>
          <p class="finished-text" v-else-if='completed'>全部加载完成</p>
        </div>
      </div>
    </template>

    <template v-else-if='inited && payList.length <= 0'>
      <div class="empty-container flex-v">
        <i class="iconfont icon-zanwushuju"></i>
        <!-- <img src="../../assets/img/person/result-empty.png"> -->
        <p>暂无数据</p>
      </div>
    </template>
  </section>
</template>

<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'PayList',
  components: {VHeader},
  data() {
    return {
      payList: [],
      page: 1,
      pageNum: 10,
      loading: false,
      completed: false,
      inited: false,
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.getPayList();
  },

  methods: {
    // 获取资金列表
    getPayList() {
      if (this.loading || this.completed) { return; }
      this.loading = true;

      this.$api.getPayList({page: this.page, pageNum: this.pageNum})
      .then(res => {
        if (!this.inited) {
          this.inited = true;
          this.$indicator.close();
        }

        if (res.code === '00') {
          this.payList = this.payList.concat(res.data);

          if (this.page < res.lastPage) {
            this.loading = false;
            this.page++;
          } else {
            this.completed = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$indicator.close();
    next();
  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.pay-list-page {
  .record-cell {
    width: 90%;
    margin: 8px auto;
    border-radius: 8px;
    background-color: #fff;
    color: #000;
    .cell-hd {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .iconfont{
        color: #ffc778;
        font-size: 24px;
        text-align: center;
      }
    }
    .cell-bd{
      color: #000;
    }
  }
}
</style>
