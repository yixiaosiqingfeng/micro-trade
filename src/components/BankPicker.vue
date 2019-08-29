<!-- 银行支行名称选择器 -->
<template>
  <div class="bank-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>

      <mt-picker :slots="slots" @change='change'></mt-picker>
    </mt-popup>
  </div>
</template>


<script>
export default {
  name: 'VPicker',
  props: ['visible'],
  data() {
    return {
      selectedBankName: '',
      slots: [{
        flex: 1,
        values: ['中国银行', '中国人民银行', '中国工商银行', '中国建设银行', '中国农业银行', '中国邮政储蓄银行', '中国民生银行', '中国光大银行', '招商银行', '中信银行', '交通银行', '兴业银行', '浦发银行', '华夏银行', '深圳发展银行', '广发银行', '广东华兴银行', '国家开发银行', '中国进出口银行', '中国农业发展银行'],
      }],
    }
  },
  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },
    change(picker, values) {
      // 初始化时未滚动直接点击确定
      if (typeof values[0] == 'undefined') {
        this.selectedBankName = '中国工商银行';
        this.$nextTick(function() {
          // picker.setSlotValues(0, area.provinces);
          picker.setSlotValue(0, this.selectedBankName);
        })
        return;
      }

      if (values[0] != this.selectedBankName) {
        this.selectedBankName = values[0];
      }
    },
    confirm() {
      this.$emit('confirm', {selectedBankName: this.selectedBankName});
    }
  },
}
</script>


<style lang='less'>
.bank-picker {
  .popup-container {
    width: 101%;
  }
  .picker-item {
    font-size: .16rem;
    text-align: center;
  }
}

</style>
