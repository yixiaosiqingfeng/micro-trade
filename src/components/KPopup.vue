<template>
  <div class="k-popup">
    <mt-popup v-model="visible" :modal=false  class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">{{title}}</div>
      <div class="popup-bd">
        <div class="scr-box">
            <mt-navbar class='bd-tab' v-model="bdActiveTab">
              <mt-tab-item  v-for="(item,tim) in KData" :id="'bd-tab-' + tim"  @click.native="changeParam(item.url)" :key="tim">{{item.title}}</mt-tab-item>
            </mt-navbar>
        </div>
        <iframe :src='src' class="iframe" frameborder="0" ref='iframe' @load='onLoadIframe' scrolling="no"></iframe>
      </div>
      <div class="btn-area flex">
        <mt-button class="flex-item btn-cancel" type='danger' size='large' plain @click.native='cancel'>关闭</mt-button>
        <mt-button class="flex-item btn-confirm" type='danger' size='large' @click.native='confirm'>确定</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import CONFIG from '@@/config';

export default {
  name: 'KPopup',
  props: ['visible','cateCode','KData','title'],
  data() {
     return {
        bdActiveTab: 'bd-tab-0',
        cateCodeList:[],
        src: '',
        timer:"",
    }
  },
  created() {
    // this.getKLine();
  },
  watch: {
    'visible'(newVal, oldVal) {
      if (newVal) {
        this.setIframeSrc(this.KData[0].url);
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm');
    },
    // 点击分时tab
    changeParam(kurl) {
      this.setIframeSrc(kurl);
    },
    // getKLine() {
    //   this.$api.getKLine({cateCode:this.cateCode}).then(res => {
    //       if (res.code === '00') {
    //           this.cateCodeList = res.data;
    //           this.setIframeSrc(res.data[0].url);
    //       } else {

    //       }
    //   })
    // },
    // 设置iframe的src
    setIframeSrc(KUrl) {
      this.src = KUrl;
    }
  }
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.k-popup {
  .popup-container {
    z-index: 10;
    width: 90%;
    border-radius:10px;
    background-color: @popup-bgc;
    border: @popup-border .03rem solid;
  }
  .picker-toolbar {
    line-height: .8rem;
    font-size: .16rem;
    text-align: center;
    background: url('../assets/img/home/popup-top.png') center top no-repeat;
    background-size: 55% ;
    margin-top: -.3rem;
    padding:.35rem 0 .15rem 0;
  }

  .popup-bd {
    padding: 0 .15rem .15rem .15rem;
    background: @popup-body-bgc;
    font-size: .12rem;
    text-align: center;
    iframe{
      overflow: hidden;
      height: 2.7rem;
      width: 3.4rem;
    }
    .scr-box{
      width: 100%;
      height: .3rem;
      overflow: scroll;
      position: relative;
      .bd-tab {
        position: absolute;
        top: 0;
        left: 0;
        color: @gray-white;
        background-color: #40230b;
        border-radius: 0.06rem;
        height: .3rem;
        // top: -0.15rem;
        .mint-tab-item {
          padding: 0;
          display: inline-block;
          width: 75px;
          margin-right: 3px;
          border: 1px solid #543d2a;
          border-radius: 0.06rem;
          &.is-selected {
            margin-bottom: 0;
            color: @black;
            background-color: @orange;
            border: none;
          }
        }
        .mint-tab-item-label {
          font-size: .14rem;
          font-weight: bold;
          line-height: .3rem;
        }
      }
    }
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
