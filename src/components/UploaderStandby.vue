<template>
  <div class="uploader-standby">
    <vue-clip :options="options" :on-complete="complete" :on-sending="sending" :on-added-file="addedFile" ref='vueClip'>
      <template slot='clip-uploader-action'>
        <div>
          <div class="dz-message">
            <img src="../assets/img/person/album-1.png" class="img-camera">
            <p class="item-desc">备用</p>
          </div>
        </div>
      </template>
    </vue-clip>
  </div>
</template>


<script>
export default {
  name: 'Uploader',
  props: ['showText', 'options', 'extraData'],
  data() {
    return {
      // showImg: '',
    }
  },

  methods: {
    // 添加文件
    addedFile(file) {
      // // console.log('file: ', file);
      // var url = URL.createObjectURL(file._file);
      // // console.log('url: ', url);
      // this.compressImage(url);
    },
    
    // 发送前可以加些额外数据
    sending (file, xhr, formData) {
      // console.log('sending: ', file, xhr, formData);
      this.$indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle'
      });
      if (this.extraData && Object.keys(this.extraData).length > 0) {
        var keys = Object.keys(this.extraData);
        var values = Object.values(this.extraData);
        formData.append(keys[0], values[0]);
      }
    },

    // 文件上传完成
    complete(file, status, xhr) {
      // console.log('complete: ', file, status, xhr);
      this.$indicator.close();
      if (status == 'success') {
        var res = JSON.parse(xhr.response);
        if (res.code === '00') {
          // this.showImg = res.data[0];
          this.$emit('uploadComplete', res.data[0]);
        } else {
          this.$toast(res.msg);
        }
      } else if (status == 'error') {
        this.$toast('上传失败');
      }
    },
  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.uploader-standby {
  padding: .2rem .1rem;
  align-items: center;
  .img-camera {
    width: .6rem;
    height: .6rem;
    margin-bottom: .1rem;
  }
  .item-desc {
    font-size: .14rem;
  }
}
</style>