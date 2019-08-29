<template>

    <div class="server-code">
      <mt-popup v-model="visible" class='popup-container' :closeOnClickModal='false'>
        <span class="closebtn iconfont icon-guanbi1" @click="closeMySelf"></span>
        <p class="title">
          <span>扫描微信二维码</span>
        </p>
       <img :src = codeImg class="codeImg">
      </mt-popup>
    </div>

</template>


<script>


export default {
  name: 'Servercode',
  props: ['visible'],
  data() {
    return {

    codeImg:'',

    }
  },

  created() {
  this.Servercode();
  },


  methods: {
    //获取微信二维码
    Servercode(){
      return this.$api.Servercode()
      .then(res =>{
        console.log(res);
        if(res.code ='00'){
          this.codeImg = res.data.custom_qrcode;

        }else{this.$toast(res.msg)}

      }).catch(err=>{
        this.$toast(err)
      })
    },
    //关闭按钮
 closeMySelf() {
  console.log('测试关闭')
      this.$emit('cancel');
    },


  }
}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';
.server-code{

  .v-modal{opacity: 0.5;}
  .mint-popup {
    background: none;
    top:40%;
    padding-top:.2rem;
  }
  .popup-container{
    z-index: 10;
    width: 90%;
    border-radius:10px;
    border: #d8d8d8 1px solid;
    padding-bottom: .8rem;
    text-align: center;
  }
  .closebtn{
    font-size: 16px;
    position: absolute;
    right: .2rem;

  }
  .title{

    font-size: .2rem;
  }
  .codeImg{width: 80%;margin-top: .3rem;}
}
  </style>
