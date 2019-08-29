<!-- 省市选择器 -->
<template>
  <section class="picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>
      <mt-picker :slots="slots" @change='change'></mt-picker>
    </mt-popup>
  </section>
</template>


<script>
import area from '@/assets/js/area';

export default {
  name: 'VPicker',
  props: ['visible'],
  data() {
    return {
      selectedProvince: '',
      selectedCity: '',
      slots: [{
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'right'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: [],
        className: 'slot3',
        textAlign: 'left'
      }],
    }
  },
  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },
    change(picker, values) {
      // 初始化
      if (typeof values[0] == 'undefined') {
        this.selectedProvince = area.provinces[2];
        this.selectedCity = area.cities[this.selectedProvince][0];
        this.$nextTick(function() {
          picker.setSlotValues(0, area.provinces);
          picker.setSlotValue(0, this.selectedProvince);
          picker.setSlotValues(1, area.cities[this.selectedProvince]);
          picker.setSlotValue(1, this.selectedCity);
        })
        return;
      }
      
      if (values[0] != this.selectedProvince) {
        this.selectedProvince = values[0];
        picker.setSlotValues(1, area.cities[this.selectedProvince]);
      } else if (values[1] != this.selectedCity) {
        this.selectedCity = values[1];
      }
    },
    confirm() {
      this.$emit('confirm', {selectedProvince: this.selectedProvince, selectedCity: this.selectedCity});
    }
  },
}
</script>


<style lang='less'>
.picker {
  .popup-container {
    width: 101%;
  }
  .picker-item {
    font-size: .16rem;
    text-align: center;
  }
}

</style>
