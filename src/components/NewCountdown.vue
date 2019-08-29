<template>
  <div class="new-countdown">
    <canvas id='canvas' class="canvas" ref='canvas'></canvas>
    <span class='background'></span>
    <span class='foreground'>{{leftTime}}</span>
    <!-- <h3 class="tips" v-show='showTips'>正在结算交易中...</h3> -->
  </div>
</template>


<script>
export default {
  name: 'NewCountdown',
  props: ['orderId', 'qptime', 'isClose'],
  data() {
    return {
      ctx: '',
      hsl: 0,
      angle: 0.01,
      w: 150,
      h: 150,
      leftTime: '', //剩余时间
      timer: '', //倒计时计时器
      paintTimer: '', // 绘制动画计时器
      // showTips: false, //显示正在计算结果文字
    }
  },

  watch: {
    // 如果有新下单 则倒计时更新为新下单的
    'orderId'(newVal, oldVal) {
      this.leftTime = Number(this.qptime);

      // 剩余时间
      this.timer = setInterval(() => {
        if (this.leftTime <= 0) {
          clearInterval(this.timer);
          // this.showTips = true;
          this.$emit('end');
          return;
        }
        this.leftTime--;
      }, 1000);

      // 绘制动画
      this.paintTimer = setInterval(() => {
        if (this.leftTime <= 0) {
          clearInterval(this.paintTimer);
          return;
        }
        this.paint();
      }, 5);
    },

    // 监视用户是否手动点击了关闭或者继续下单 如果是 则清除计时器
    'isClose'(newVal, oldVal) {
      if (newVal) {
        // this.showTips = false;
        clearInterval(this.timer);
        clearInterval(this.paintTimer);
        console.log('NewCountdown.vue isClose timer paintTimer: ', this.timer, this.paintTimer);
      }
    },
  },

  mounted() {
    var canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    canvas.width = this.w;
    canvas.height = this.h;
  },

  methods: {
    // 绘制动画
    paint() {
      this.angle += 0.03;
      this.hsl = this.hsl <= 360 ? this.hsl + 0.25 : 0;
      var s = -Math.sin(this.angle);
      var c = Math.cos(this.angle);

      this.ctx.save();
      this.ctx.globalAlpha = 0.5;
      this.ctx.beginPath();
      this.ctx.fillStyle = 'hsla(' + this.hsl + ', 100%, 50%, 1)';
      this.ctx.arc(this.w/2 - (s * 60), this.h/2 - (c * 60), 15, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.restore();
    }
  },

  beforeRouteLeave(to, from, next) {
    // this.showTips = false;
    clearInterval(this.timer);
    clearInterval(this.paintTimer);
    next();
  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.new-countdown {
  position: relative;
  height: 2rem;
  .canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }

  .background, .foreground {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  .background {
    display: inline-block;
    width: 160px;
    height: 160px;
    background: rgba(0, 0, 0, 0.35);
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.5), 1px 1px 4px rgba(255, 255, 255, 0.2);
  }

  .foreground {
    display: inline-block;
    width: 80px;
    height: 80px;
    background: #333336;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 80px;
    font-size: .2rem;
    color: @white;
  }

  .tips {
    position: absolute;
    color: @white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: .14rem;
  }
}
</style>
