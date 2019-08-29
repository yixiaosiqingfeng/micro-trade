<template>
   <div class="notice-popup">
    <mt-popup class='popupbox ' v-model="visible" :closeOnClickModal='false'>
      <div class="picker-toolbar">{{title}}</div>
      <div class="popup-bd" v-html="content"></div>
      <div class="btn-area flex">
        <mt-button class=" btn-cancel" type='danger' size='large'  @click="hide">{{msgId?"关闭":"忽略全部"}}</mt-button>
        <mt-button class=" btn-next" type='danger' size='large' v-on:click="next" v-show="!msgId">{{index < allMsg.length - 1?"下一页":"关闭"}}</mt-button>
      </div>
    </mt-popup>
  </div>
</template>


<script>
export default {
  name: 'NoticePopup',
  props: ['visible','msgId','allMsg'],
  data() {
    return {
      title:"",
      content:"",
      index: 0,

    }
  },
  watch: {
    'msgId'(newVal, oldVal) {
        if(newVal){
          this.title="";
          this.content="";
            this.getMessageDetail(newVal);
        }
    },
    'allMsg'(newVal,oldVal){
      if(newVal){
         this.index = 0;
         this.title = newVal[this.index].title;
         this.content = newVal[this.index].content;
      }
    }
  },

  methods: {
    //   获取公告列表
    getMessageDetail(msgId){
      this.$api.getMessageDetail({id:msgId})
        .then(res=>{
          if (res.code==='00'){
            this.title=res.data.msg_title;
            this.content=res.data.msg_content;
          } else {
            this.$toast(res.msg)
          }
        })
    },

   //获取已读公告
    getReadNews (pageIds) {
       this.$api.getReadNews({id:pageIds});
    },

    next () {
     if (this.index + 1 < this.allMsg.length) {
       this.index += 1;
       this.title = this.allMsg[this.index].title;
       this.content = this.allMsg[this.index].content;
       this.getReadNews([this.allMsg[this.index].id]);
     }else{
         this.close();
     }
    },

    // 隐藏全部操作
    hide (){
      var ids = [];
     for (var i = 0; i < this.allMsg.length; i++) {
        ids.push(this.allMsg[i].id);
      }
      this.getReadNews(ids);
      this.close();
    },

    // 这个用来关闭这个弹框的方法
    close(){
      this.$emit('cancel');
    }

  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.notice-popup {
  .mint-popup {display: block;}

  .popupbox {
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
    height: 100px;
    overflow: scroll;
    padding-top: 10px;

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
    .btn-next {
      color: @orange;
      border-left: .01rem solid  @popup-border;
    }


  }
}

</style>
