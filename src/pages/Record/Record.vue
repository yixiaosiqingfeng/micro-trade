<template>
  <section class="page page-has-tabbar record-page">
    <div class="page-content">
      <div class="page-hd flex text-dynamic">
        <div class="hd-l flex-item flex-v text-dynamic">
          <p class="hd-b gray-light">总盈利</p>
          <!--  headInfo.money >= 0 ? 'red' : 'green' -->
          <p class="hd-t flex-item">{{headInfo.money >= 0 ? '+' : ''}}{{format(headInfo.money,2)}}</p>
        </div>
        <div class="hd-c flex-item flex-v text-dynamic">
          <p class="hd-b gray-light">订单数</p>
          <p class="hd-t flex-item gray-white">{{headInfo.count}}</p>
        </div>
        <div class="hd-r flex-item flex-v text-dynamic">
          <p class="hd-b gray-light">总数量</p>
          <p class="hd-t flex-item gray-white">{{headInfo.onumber}}</p>
        </div>
      </div>

      <div class="page-bd">
        <div class="bd-content flex">
          <div class="bd-l" @click='changeTime(0)'><i class="mint-cell-allow-left"></i></div>
          <div class="bd-c flex-item">{{lookDay}}</div>
          <div class="bd-r" @click='changeTime(1)'><i class="mint-cell-allow-right"></i></div>
        </div>
      </div>

      <div class="page-ft">
        <div class="ft-title flex">
          <div class="flex-item">日期</div>
          <div class="flex-item"><span class="red">红</span>/<span class="green">黑</span></div>
          <div class="flex-item">数量</div>
          <div class="flex-item">盈利</div>
          <div class="flex-item">佣金</div>
        </div>

        <template v-if='recordList.length > 0'>
          <div class="ft-content" v-infinite-scroll="getRecordList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <router-link class="record-cell flex text-dynamic" :to="'/record-detail?id=' + item.oid" v-for='item in recordList' :key='item.oid'>
              <div class="flex-item text-dynamic">{{formatPHPTime(item.buytime, {showDay: true})}}</div>
              <div class="flex-item text-dynamic"><span :class="[item.ostyle === 1 ? 'green' : 'red']">{{item.ostyle === 1 ? '黑' : '红'}}</span></div>
              <div class="flex-item text-dynamic">{{item.ptitle}}/{{item.onumber}}注</div>
              <div :class="['flex-item text-dynamic', item.ploss >= 0 ? 'red' : 'green']">{{format(item.ploss,2)}}</div>
              <div class="flex-item text-dynamic">{{format(item.fee,2)}}</div>
            </router-link>

            <div class="loading-container">
              <mt-spinner :type="2" v-if='loading && !completed'></mt-spinner>
              <p class="finished-text" v-else-if='completed'>全部加载完成</p>
            </div>
          </div>
        </template>

        <template v-else-if='inited && recordList.length <= 0'>
          <div class="empty-container flex-v" style='height: calc(100vh - 355px); box-sizing: border-box;'>
            <i class="iconfont icon-zanwushuju"></i>
            <!-- <img src="../../assets/img/person/result-empty.png"> -->
            <p>暂无数据</p>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Record',
  data() {
    return {
      headInfo: {}, // 头部信息
      recordList: [],
      page: 1,
      pageNum: 10,
      loading: false,
      completed: false,
      inited: false,
    }
  },

  computed: {
    ...mapState({
      lookDay: state => state.lookDay,
    })
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    if (!this.lookDay) {
      this.initLookDay();
    }
    this.getRecordList();
  },

  methods: {
    // 获取当前年月
    initLookDay() {
      var now = new Date();
      var year = now.getFullYear();
      var month = this.formatTime(now.getMonth() + 1);
      var lookDay = year + '-' + month;
      this.$store.commit('setLookDay', lookDay);
    },

    // 获取订单记录列表
    getRecordList() {
      if (this.loading || this.completed) { return; }
      this.loading = true;

      this.$api.getRecordList({today: this.lookDay, page: this.page, pageNum: this.pageNum})
      .then(res => {
        if (!this.inited) {
          this.inited = true;
          this.$indicator.close();
        }

        if (res.code === '00') {
          this.recordList = this.recordList.concat(res.data);
          this.headInfo = res.tradingInfo;

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
    },

    // 重置
    reset() {
      this.headInfo = {};
      this.recordList = [];
      this.page = 1;
      this.inited = false;
      this.loading = false;
      this.completed = false;
    },

    // 点击按钮修改年月
    changeTime(type) {
      var times = this.lookDay.split('-');
      var year = Number(times[0]);
      var month = Number(times[1]);
      // 如果是点击左箭头
      if (type === 0) {
        // 如果已经是1月了 则变成上一年的12月
        if (month <= 1) {
          year--;
          month = 12;
        } else {
          month--;
        }
      } else {
        // 如果是点击右箭头
        if (month >= 12) {
          year++;
          month = 1;
        } else {
          month++;
        }
      }
      var lookDay = year + '-' + this.formatTime(month);
      this.$store.commit('setLookDay', lookDay);
      this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      this.reset();
      this.getRecordList();
    }
  },

  beforeRouteLeave (to, from, next) {
    this.$store.commit('setLookDay', null);
    this.$indicator.close();
    next();
  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.record-page {
  .page-content {
    padding: .15rem .1rem;
  }
  .page-hd {
    background-color: @white-light;
    border-radius: .05rem;
    padding: .3rem .1rem;
    .hd-b {
      color: @black;
    }
    .hd-t {
      width: .8rem;
      height: .8rem;
      line-height: .8rem;
      border-radius: 50%;
      margin: .2rem auto 0;
      font-size: .14rem;
      color: @white;
    }
    .hd-l .hd-t {
      background-color: #e51717;
    }
    .hd-c .hd-t {
      background-color: #b2b2b2;
    }
    .hd-r .hd-t {
      background-color: #9e33c7;
    }
  }

  .page-bd {
    color: @black;
    background-color: @white-light;
    border-radius: .05rem;
    padding: 0 .1rem;
    .bd-content {
      position: relative;
      height: .5rem;
      box-sizing: border-box;
      border-top: 1px solid @border-c;
      border-bottom: 1px solid @border-c;
    }
    .bd-l {
      width: 25%;
      .mint-cell-allow-left::after {
        left: .4rem;
        border-color: @black;
        border-width: 0 0 1px 1px;
      }
    }
    .bd-r {
      width: 25%;
      .mint-cell-allow-right::after {
        right: .4rem;
        border-color: @black;
        border-width: 1px 1px 0 0;
      }
    }
    .bd-c {
      line-height: .5rem;
      font-size: .16rem;
      color: @black;
    }
  }

  .page-ft {
    color: @black;
    background-color: @white-light;
    border-radius: .05rem;
    padding: 0 .1rem;
    .ft-title {
      font-weight: bold;
      height: .5rem;
      line-height: .5rem;
      border-bottom: 1px solid @border-c;
    }
    .record-cell {
      padding: 0;
      height: .5rem;
      line-height: .5rem;
      border-bottom: 1px solid @border-c;
    }
  }
}
</style>
