<template>
  <div class="toast-popup">
    <mt-popup v-model="visible"  class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">{{title}}</div>
      <div class="popup-bd" v-html="html">
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

export default {
  name: 'ToastPopup',
  props: ['visible', 'html','title'],
  data() {
    return {
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm');
    },
  }
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.toast-popup {
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
