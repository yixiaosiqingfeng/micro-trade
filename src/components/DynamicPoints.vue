<template>
  <div class="dynamic-points">
    <span v-for='point in points' :key='point' class="point"></span>
  </div>
</template>


<script>
export default {
  name: 'DynamicPoints',
  data() {
    return {
      points: [0, 1, 2, 3, 4],
    }
  },
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.dynamic-points {
  .point {
    display: inline-block;
    width: .05rem;
    height: .05rem;
    border-radius: 50%;
    margin: 0 .05rem;
    background-color: @green-deep;
    animation: dynamic linear 1s infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.15s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.45s;
    }
    &:nth-child(5) {
      animation-delay: 0.6s;
    }
  }
}

@keyframes dynamic {
  0%, 60%, 100% {
    transform: scale(1);
  }
  30% {
    transform: scale(2.5);
  }
}
</style>