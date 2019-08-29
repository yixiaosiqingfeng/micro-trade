<template>
  <section class="personal-page page" :class='{"page-has-header": showHeader}'>
    <v-header title='修改资料' v-if='showHeader'></v-header>

    <div class="personal-box">
      <mt-cell class='cell-face line-box' title="头像" to="/personal" @click.native='uploaderPopupVisible = !uploaderPopupVisible' is-link>
        <img :src="getImgURL(userInfo.headImg)" v-if='userInfo.headImg'>
        <!-- <img v-else src="../../assets/img/person/user-default.png" alt=""> -->
      </mt-cell>
      <select-uploader-popup :visible='uploaderPopupVisible' :options='options' @closePopup='closePopup' @uploadComplete='complete'></select-uploader-popup>


      <mt-cell class="line-box" title="昵称" to="/personal" is-link :value="userInfo.username" @click.native='changeName'></mt-cell>
    </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import {mapState} from 'vuex';
import CONFIG from '@@/config';
// import VueCoreImageUpload from 'vue-core-image-upload';
import SelectUploaderPopup from '@/components/SelectUploaderPopup';

export default {
  name: 'Personal',
  components: { VHeader, SelectUploaderPopup },
  data() {
    return {
      options: {
        url: CONFIG.baseURL + '/upload',
        paramName: 'file',
        headers: {
          'token': 'bearer ' + window.localStorage.getItem('token'),
        },
      },
      uploaderPopupVisible: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      baseURL: state => state.baseURL,
    }),
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  methods: {
    // 关闭选择上传组件popup
    closePopup() {
      this.uploaderPopupVisible = false;
    },
    // 修改昵称
    changeName() {

      var self = this;
      self.$messagebox({
        title: '昵 称',
        message: '修改昵称<span class="gray-light" style="font-size: .12rem;">（昵称长度必须是1~8位）</span>',
        confirmButtonClass: 'messagebox-btn-confirm',
        showCancelButton: true,
        cancelButtonClass: 'messagebox-btn-cancel',
        showInput: true,
        inputValue: self.userInfo.username,
        inputPlaceholder: '请输入昵称',
      }, function(value, action) {
        if (action === 'confirm') {
          if (!value || value.length < 1 || value.length > 8) {
            self.$toast('昵称长度必须是1~8位');
            return;
          }
          self.updateInfo({username:value});
        }
      })
    },
    complete(url){
      this.updateInfo({img:url});
    },
    updateInfo(data){
      this.$api.editUserInfo(data).then(res => {
      if (res.code === '00') {
        this.getUserInfo();
        this.$toast('修改成功');
      } else {
        this.$toast(res.msg);
      }
    })
    }
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.personal-page {
  .personal-box{
    background-color: #fff;
    width: 90%;
    margin: 8% auto;
    padding: 2%;
    border-radius: 5px;
    .line-box{
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
      border-radius: 5px;
      margin: 5px 0;
    }
    .mint-cell {
      border: none;
      .mint-cell-wrapper{
        background-origin: content-box;
      }
    }
    .cell-face {
      img {
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
      }
    }
    .cell-last {
      margin: .15rem 0;
      border: none;
    }
    .btn-area {
      padding: 0 .2rem;
    }

    .g-core-image-corp-container .btn {
      margin: 0 0 0 .15rem;
    }
  }
}
.mint-msgbox{
  border-radius: 8px!important;
    .mint-msgbox-header{
      background-color: #b90c0c!important;
    }
    .mint-msgbox-confirm{
      background-color: #b90c0c!important;
    }
  }
</style>
