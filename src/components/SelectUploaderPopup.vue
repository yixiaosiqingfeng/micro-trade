<template>
  <div class="select-uploader-popup">
    <mt-popup v-model="visible" position='bottom' class='popup-container'>
      <div class="flex" @click='closePopup'>
        <div class="flex-item flex-v popup-item">
          <!-- <img src="../assets/img/person/camera.png">
          <p class="item-desc">推荐</p> -->
          <uploader-recommend :options='options' @uploadComplete='complete'></uploader-recommend>
        </div>
        <div class="flex-item flex-v popup-item">
          <!-- <img src="../assets/img/person/camera.png">
          <p class="item-desc">备用</p> -->
          <uploader-standby :options='options'  @uploadComplete='complete'></uploader-standby>
        </div>
      </div>
    </mt-popup>
  </div>
</template>


<script>
import UploaderRecommend from '@/components/UploaderRecommend';
import UploaderStandby from '@/components/UploaderStandby';

export default {
  name: 'SelectUploaderPopup',
  props: ['visible', 'options'],
  components: { UploaderRecommend, UploaderStandby },
  data() {
    return {
      // visible: true,
    }
  },

  methods: {
    // 关闭自身
    closePopup() {
      this.$emit('closePopup');
    },

    // 上传完成
    complete(imgURL) {
      this.$emit('uploadComplete', imgURL.url);
    }
  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.select-uploader-popup {
  .popup-container {
    width: 100%;
    min-height: 1rem;
    border-radius: 5px 5px 0 0;
  }
  .popup-item {
    padding: .2rem .1rem;
    align-items: center;
    img {
      width: .6rem;
      height: .6rem;
      margin-bottom: .1rem;
    }
    .item-desc {
      font-size: .14rem;
    }
  }
}
</style>
