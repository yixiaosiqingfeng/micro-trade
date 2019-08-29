<template>
  <section class="page pay-list-page" :class='{"page-has-header": showHeader}'>
    <v-header title='提现记录' v-if='showHeader'></v-header>
    <template v-if='cashoutlist.length > 0'>
      <ul class="cashout"  v-infinite-scroll="UserwithDrawList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
       <li v-for='(cashlist,val) in cashoutlist' class="cashoutdetail">
        <div>
          <span class="money">{{cashlist.money}}</span>
          <span v-html="cashlist.mark"></span>
          <span :class="['status', cashlist.status === '审核中'?  'info' :  (cashlist.status === '已打款' ? 'green' : 'red') ]">
            {{cashlist.status}}
          </span>
          <span class="time">{{cashlist.time}}</span>
        </div>
      </li>
    </ul>
     <div class="loading-container">
          <mt-spinner :type="2" v-if='loading && !completed'></mt-spinner>
          <p class="finished-text" v-else-if='completed'>全部加载完成</p>
        </div>
      </div>
    </template>

    <template v-else-if='inited && cashoutlist.length <= 0'>
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
  name: 'CashOut',
  components: {VHeader},
  data() {
    return {
       loading: false,
       completed: false,
       inited: false,
       cashoutlist:[],
       page: 1,
       pageNum: 10,
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.UserwithDrawList();
  },

  methods: {
    //获取提现详情

 UserwithDrawList() {
      if (this.loading || this.completed) { return; }
      this.loading = true;

      this.$api.UserwithDrawList({page: this.page, pageNum: this.pageNum})
      .then(res => {
        if (!this.inited) {
          this.inited = true;
          this.$indicator.close();
        }

        if (res.code === '00') {
           this.cashoutlist = this.cashoutlist.concat(res.data);
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
    }},
  beforeRouteLeave (to, from, next) {
    this.$indicator.close();
    next();
  },

}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.cashoutdetail{
  background: white;
    padding: .1rem;
     margin: 0 1px;
    border-bottom: 1px solid #cccccc;
    color:#485682;
    border-radius: 5px;
    div{
      display: flex;
      justify-content: space-between;
      line-height: .2rem;
        .time{margin-top: .2rem}
    }
    .money{
      position: absolute;
      right: .2rem;}
      .status{position: absolute;
        left:.7rem}

  }
</style>
