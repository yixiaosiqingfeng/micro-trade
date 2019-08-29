<!-- 省市选择器 -->
<template>
  <section class="Click-Btn">
     <div class="click_btn" @click="orderResultVisible = true" >
      <img src="../assets/img/home/click_btn.png">
      <span>正在开奖</span>
    </div>
    <order-result :visible='orderResultVisible' :direction='direction' @cancel="cancel"></order-result>

  </section>
</template>


<script>
import OrderResult from '@/components/OrderResult';

export default {
  name: 'ClickBtn',
  data() {
    return {
     orderResultVisible:false
    }
  },
  components: {OrderResult},
  methods: {
  cancel(){
     this.orderResultVisible=false
  }
  },
}
</script>


<style lang='less'>
 @import "../assets/css/_variable.less";
.click_btn{
  width:.8rem;
  position: fixed;
  bottom: 18%;
  right: 0;
  z-index: 1000;

  img{
    width: 100%;
  }
  span{
    position: relative;
    top:-.26rem;
    left: .15rem;
    font-size: 14px;
  }
}

</style>
