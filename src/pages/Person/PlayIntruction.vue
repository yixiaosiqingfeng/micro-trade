<template>
  <section class="page play-page" :class='{"page-has-header": showHeader}'>
    <v-header :title='playIntruc.title' v-if='showHeader'></v-header>
    <div class="play-content" v-html="playIntruc.content"></div>
  </section>
</template>

<script>
  import VHeader from '@/components/VHeader';

  export default {
    name: 'CashOut',
    components: {VHeader},
    data() {
      return {
        playIntruc:{}
      }
    },
    computed: {
      showHeader(){return true;},    // { return !(this.isWeChat()); },
    },

    created() {
      this.playIntruction();
    },

    methods: {
      playIntruction(){
        this.$api.PlayIntruction()
          .then(res=>{
            if (res.code==='00'){
              this.title=res.data.title
              this.playIntruc=res.data
            }
          })
      }
    }

  }
</script>


<style lang='less'>
  @import '../../assets/css/_variable.less';
  .play-page{
    .play-content{
      width: 90%;
      overflow-y: scroll;
      margin: 0px auto;
      padding-top: 20px;
      padding-bottom: 10px;
      line-height: 16px;
      text-align: center;
      height: 100%;
      img{
        width: 100% !important;
        margin: 5px auto;
        height: auto !important;
      }
    }
  }


</style>
