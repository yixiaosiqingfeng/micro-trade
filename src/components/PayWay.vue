<!--<template>-->
  <!--<div class="pay-way">-->
    <!--<mt-cell class='cell-way' v-for='(way, index) in payWays' :key='way.value' :title='way.title' @click.native='choose(index)'>-->
      <!--<img :src="way.icon" slot='icon' width="26" height="26">-->
      <!--<span class="input-container">-->
        <!--<input type="radio" class="mint-checkbox-input" :checked='selectedIndex == index'>-->
        <!--<span class="mint-checkbox-core"></span>-->
      <!--</span>-->
    <!--</mt-cell>-->
  <!--</div>-->
<!--</template>-->


<!--<script>-->
<!--export default {-->
  <!--name: 'PayWay',-->
  <!--data() {-->
    <!--return {-->
      <!--payWays: [],-->
      <!--selectedIndex: 0, //选中的支付方式-->
    <!--}-->
  <!--},-->

  <!--methods: {-->
    <!--choose(index) {-->
      <!--this.payWays.forEach((item, key) => {-->
        <!--if (index == key) {-->
          <!--this.selectedIndex = index;-->
          <!--// 报告 支付方式已更改-->
          <!--this.$emit('changePayType', {payType: item.value});-->
        <!--}-->
      <!--})-->
    <!--},-->

    <!--// 获取支付方式-->
    <!--getPayWay() {-->
      <!--var type = this.isWeChat() ? 'weChat' : 'h5';-->
      <!--this.$api.getPayWay({type: type})-->
      <!--.then(res => {-->
        <!--if (res.code === '00') {-->
          <!--this.payWays = res.data;-->
          <!--this.$emit('getPayWays', this.payWays);-->
          <!--if (this.payWays.length > 0 ) {-->
            <!--this.$emit('changePayType', {payType: this.payWays[this.selectedIndex].value});-->
          <!--}-->
        <!--} else {-->
          <!--this.$toast(res.msg);-->
        <!--}-->
      <!--})-->
    <!--}-->
  <!--},-->

  <!--created() {-->
    <!--this.getPayWay();-->
  <!--}-->
<!--}-->
<!--</script>-->


<!--<style lang='less'>-->
<!--@import '../assets/css/_variable.less';-->

<!--.pay-way {-->
  <!--.cell-way {-->
    <!--border-bottom: 1px solid @popup-bgc;-->
    <!--font-size: .15rem;-->
    <!--.mint-cell-text {-->
      <!--margin-left: .05rem;-->
      <!--color: @white;-->
    <!--}-->
  <!--}-->
<!--}-->

<!--</style>-->
