<template>
  <section class="page accouunt-record-detail-page" :class='{"page-has-header": showHeader}'>
    <v-header title='资金详情' v-if='showHeader'></v-header>

    <table class="table">
      <tbody>
        <tr><th>流水号</th><td class="text-dynamic">{{incomeInfo.jno}}</td></tr>
        <tr><th>类型</th><td>{{incomeInfo.jtype}}</td></tr>
        <tr><th>时间</th><td>{{formatPHPTime(incomeInfo.jtime)}}</td></tr>
        <tr><th>收支</th><td :class="[incomeInfo.jaccess >= 0 ? 'orange' : 'green']">{{format(incomeInfo.jaccess,2)}}</td></tr>
        <tr><th>金豆</th><td>{{format(incomeInfo.balance,2)}}</td></tr>
        <tr><th>备注</th><td>{{incomeInfo.remarks}}</td></tr>
      </tbody>
    </table>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'AccountRecordDetail',
  components: {VHeader},
  data() {
    return {
      incomeInfo: {},
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  created() {
    this.getIncomeInfo();
  },

  methods: {
    // 获取收支明细详情
    getIncomeInfo() {
      this.$api.getIncomeInfo({id: this.$route.query.id})
      .then(res => {
        if (res.code === '00') {
          this.incomeInfo = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    }

  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.accouunt-record-detail-page {
  table {
    color: @white-light;
    background-color: @order-bgc;
    font-size: .12rem;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    tr:nth-of-type(even) {
      background-color: @popup-bgc;
    }
    th, td {
      padding: .15rem;
      line-height: 1.42857143;
      /* border: 1px solid @border-c; */
    }
    th {
      width: 25%;
      overflow: hidden;
    }
    td {
      width: 75%;
      word-break: break-all;
    }
  }
}
</style>
