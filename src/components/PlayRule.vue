<template>
  <div class="play-rule">
    <mt-popup v-model="visible" class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">{{title}}</div>
      <div class="play-img">
        <img :src="getImgURL(imgSrc)" alt="" @click="bigImg(getImgURL(imgSrc))">
      </div>
      <div class="btn-area flex">
        <mt-button class="flex-item btn-cancel" type='danger' size='large' plain @click.native='PlayCancel'>关闭</mt-button>
        <mt-button class="flex-item btn-confirm" type='danger' size='large' @click.native='PlayConfirm'>确定</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'ToastPopup',
    props: ['visible', 'html','title','imgSrc'],
    data() {
      return {
      }
    },
    created(){},
    methods: {
      bigImg(imgURL){
        this.$messagebox({
          title:'',
          message: '<img src="' + imgURL + '" alt="持仓凭证" style="width: 165%; height:100% !important;"/>',
        })
      },
      PlayCancel() {
        this.$emit('cancel');
      },
      PlayConfirm() {
        this.$emit('confirm');
      },
    }
  }

</script>


<style lang='less'>
  @import '../assets/css/_variable.less';
  .mint-msgbox{
    width: 100% !important;
    height: 100%;
    background-color: #210f23;
    .mint-msgbox-content{
      height: 93% !important;
      .mint-msgbox-message{
        height: 60%;
        width: 100%;
        transform: rotate(90deg);
      }
    }
    .mint-msgbox-content{
      border: none;
    }
    .mint-msgbox-btn{
      color: #fff;
      background-color: #210f23;
    }
  }
  .mint-msgbox-content{
    padding: 0px !important;
  }
  .play-rule {
    position: relative;

    .popup-container {
      z-index: 10;
      width: 90%;
      border-radius:10px;
      background-color: @popup-bgc;
      border: #cc3333 .03rem solid;

      .play-img{
        width: 100%;
        max-height: 60vh;
        overflow: auto;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          transform: scale(1);
          transition: all ease 0.5s;
        }
      }
    }
    .picker-toolbar {
      line-height: .8rem;
      font-size: .16rem;
      text-align: center;
      background: url('../assets/img/home/popug-top2.png') center top no-repeat;
      background-size: 55% ;
      margin-top: -.3rem;
      padding:.35rem 0 .15rem 0;
    }

    .popup-bd {
      padding: .15rem;
      background: @popup-body-bgc;
      font-size: .12rem;
      text-align: center;

    }

    .btn-area {
      padding: .04rem 0;
      .mint-button {
        border-radius: 0;
        font-size: .15rem;
        background-color:@popup-bgc;
      }
      .btn-cancel {
        border: none;
        color: @gray;
      }
      .btn-confirm {
        color: @orange;
        border-left: .01rem solid  @popup-border;
      }
      .btn-danger {
        margin: 0;
        height: .41rem;
        line-height: .41rem;
      }

    }
  }

</style>
