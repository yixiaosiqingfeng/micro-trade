<template>
  <div class="uploader-recommend">
    <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.paramName' compress='50' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="imageuploading" @imageuploaded="imageuploaded" @errorhandle="errorhandle" inputAccept='image/*'>
      <img src="../assets/img/person/album.png" class="img-camera">
      <p class="item-desc">推荐</p>
    </vue-core-image-upload>
  </div>
</template>


<script>
import VueCoreImageUpload from 'vue-core-image-upload/src';

export default {
  name: 'Uploader',
  props: ['showText', 'options', 'extraData'],
  components: { VueCoreImageUpload },
  data() {
    return {
      // showImg: '',
    }
  },

  methods: {
    // 开始上传
    imageuploading(res) {
      this.$indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle'
      });
    },
    // 上传完成
    imageuploaded(res) {
      // console.log('imageuploaded src: ', res);
      this.$indicator.close();
      if (res.code === '00') {
        // this.showImg = res.data[0];
        this.$emit('uploadComplete', res.data[0]);
        
      } else {
        this.$toast(res.msg);
      }
    },
    // 上传失败
    errorhandle(err) {
      // console.log('errorhandle: ', err);
      this.$indicator.close();
      this.$toast('上传失败: ' + err);
    },
  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.uploader-recommend {
  padding: .2rem .1rem;
  align-items: center;
  .img-camera {
    width: .6rem;
    height: .6rem;
    margin-bottom: .1rem;
  }
  .item-desc {
    font-size: .14rem;
    color: #000;
  }
  .g-core-image-upload-btn {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .g-core-image-upload-form {
    width: 100% !important;
    height: 100% !important;
  }

}
</style>