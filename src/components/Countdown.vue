<template>
  <div class="countdown">
    <div class="game-time">
      <div class="hold">
        <div class="pie pie1" id="pie1"></div>
      </div>
      <div class="hold">
        <div class="pie pie2" id="pie2"></div>
      </div>
      <div class="bg"> </div>
      <div class="time" id="time"></div>
    </div>
    <!-- <div class="result-container" v-else>
      正在结算交易中...
    </div> -->
  </div>
</template>


<script>
import VCountdown from '@/assets/js/countdown';

export default {
  name: 'Countdown',
  props: ['qptime', 'orderId', 'isClose'],
  data() {
    return {
      showResult: false,
    }
  },

  watch: {
    'orderId'(newVal, oldVal) {
      var self = this;
      VCountdown.init({
        time: self.qptime,
        cb: function() {
          // self.showResult = true;
          self.$emit('end');
        }
      });
    },

    'isClose'(newVal, oldVal) {
      if (newVal) {
        VCountdown.stop();
      }
    }
  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.countdown {
  color: @black;
  .game-time {
    width: 1rem;
    height: 1rem;
    text-align: center;
    margin: .1rem auto;
  }

  /* time scroll*/
  .pie {
    width: 1rem;
    height: 1rem;
    background-color: blue;
    border-radius: 50%;
    position: absolute;
  }
  .pie1 {
    clip: rect(0px, 1rem, 1rem, .5rem);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    background-color: #fff;
  }
  .pie2 {
    clip: rect(0px, .5rem, 1rem, 0px);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    background-color: #fff;
  }
  .hold {
    width: 1rem;
    height: 1rem;
    position: absolute;
    z-index: 1;
  }
  .bg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    background-color: #d13c36;
  }
  .time {
    width: .8rem;
    height: .8rem;
    margin: .1rem 0 0 .1rem;
    background-color: #e45534;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    text-align: center;
    line-height: .8rem;
    font-size: .3rem;
  }
}

</style>
