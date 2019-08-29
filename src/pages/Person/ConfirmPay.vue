<!-- 确认支付 -->
<template>
  <section class="confirm-pay-page page" :class='{"page-has-header": showHeader}'>
    <v-header title='确认支付' v-if='showHeader'></v-header>
    
    <iframe :src="src" @load="onChangeSrc()" class="iframe" frameborder="0" ref='iframe'></iframe>
    
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'ConfirmPay',
  components: { VHeader },
  data() {
    return {
      // src: '',
    }
  },
  computed: {
    showHeader() { return !(this.isWeChat()); },
    src() { return this.$route.query.src; }
  },
  created(){
    setInterval(() => {
      this.onChangeSrc();
    }, 1000);
  },
  methods: {
    onChangeSrc() {
      var src = this.$refs.iframe.contentWindow.location.href;
      if (src && src.indexOf('pay-result') != -1) {
        this.goto({name: 'Person'});
      }
    }
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.confirm-pay-page {
  overflow-x: hidden;
  background-color: #ffffff!important;
  .iframe {
    width: 100vw;
    height: 100vh;
    background-color: #ffffff!important;
  }

}
</style>