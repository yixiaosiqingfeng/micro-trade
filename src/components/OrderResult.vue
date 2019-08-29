<template>

  <div>
    <div class="order-result">
      <mt-popup v-model="visible" class='popup-container' :closeOnClickModal='false'>

        <span class="closebtn iconfont icon-guanbi1" @click="closeMySelf"></span>
        <h3 class="title">
          <span>正在开奖</span>
        </h3>
        <ul class="orderResult_list" id="orderlist">
          <li v-show="noData"   class='NoOrder' >暂时没有开奖信息...</li>
          <li v-show="!noData"  class="btn-order-result"  v-for='(order,val) in orderlist' @click="orderIn(order.oid)">
            <p>
              <span class="buytime">{{formatPHPTime(order.buytime)}}</span>
              <span>倒计时：{{order.openTime <=0 ? '开奖中' : order.openTime  }}</span>
            </p>
            <p>
              <span>下注：{{order.onumber}}</span>
              <span>方 向：<strong :class="[order.ostyle === 1 ? 'green' : 'red']">{{order.ostyle === 1 ? '黑' : '红'}}</strong></span>
            </p>
          </li>
        </ul>
        <div class="orderResultbtn" v-show="!noData">
          <span class="leftFront" @click="frontPage()"><</span>
          <i>{{currentPage}}</i>
          <span class="rightNext" @click="nextPage() ">></span>
        </div>
      </mt-popup>
    </div>

    <!-- 弹出订单倒计时 -->
    <result-popup :orderId='orderId' :visible='resultPopupVisible' @close='close'></result-popup>
    <result-popup :orderId='orderId' :token="token" :visible='resultPopupVisible' @close='close'></result-popup>
  </div>

</template>


<script>
import ResultPopup from '@/components/ResultPopup';

export default {
  name: 'OrderResult',
  props: ['visible','orderId'],
  components: {ResultPopup},
  data() {
    return {
     orderlist:[],//订单列表信息
     pageNum:4,
     page:1,
     currentPage:1,
     totalPage:1,
     interval:0,
     noData :true,
     orderId:'',
      token:'',
     resultPopupVisible:false,
     orderResultVisible:true,
    }
  },

  created() {
  // this.getOrderList();
  },
  watch: {
    'visible'(newVal, oldVal) {
      if(newVal){
       this.getOrderList();
      }
    },
  },

  methods: {

    //获取正在进行中的订单
   getOrderList(page){
    if(page == undefined ){
       page = 1;
    }
    return this.$api.getOrderList({
        page: page,
        pageNum: this.pageNum,
      })
    .then (res =>{
      // console.log(res);
          if(res.code =="00"){
              this.noData = res.data.length == 0 ? true :false;
              this.orderlist =res.data;
              this.currentPage=res.currentPage;
              this.totalPage= res.lastPage;
              this.intervalTime();

          }else{
            this.$toast(res.msg);
          }
    }).catch(err =>{
      this.$toast(err)
    })
   },
   //点击跳转上一页
   frontPage(){
    if(this.currentPage == 1){
      this.$toast('已经是第一页了!');
      return false;
    }
      var page = Math.max(this.currentPage-1,1);
      this.getOrderList(page);
   },

   //点击跳转下一页
   nextPage(){
      if(this.currentPage == this.totalPage){
        this.$toast('已经是最后一页了');
        return false;
      }
      var page = Math.min(this.currentPage+1,this.totalPage);
       this.getOrderList(page);
   },
   //所有订单开奖倒计时
   intervalTime(){
      clearInterval(this.interval);
      this.interval=setInterval(this.intervalList,1000);
   },
   intervalList(){
        for (var i = 0; i < this.orderlist.length; i++) {
          if(isNaN(this.orderlist[i].openTime)||this.orderlist[i].openTime==0){
             this.orderlist[i].openTime='开奖中...';
          }else{
             this.orderlist[i].openTime--;
          }
        }
   },
   //弹出当前订单倒计时详情
   orderIn(oid){
     this.token = new Date().getTime();
     this.orderId = oid;
     this.resultPopupVisible = true;
   },
    // 关闭结果弹框
    close() {
       this.resultPopupVisible = false;
      this.$emit('cancel');
    },
    closeMySelf() {
      this.$emit('cancel');
    },



}}
</script>


<style lang='less'>
@import '../assets/css/_variable.less';
.order-result{

.popup-container{
    z-index: 10;
    width: 90%;
    border-radius:10px;
    background-color: @popup-bgc;
    border: #cc3333 .03rem solid;
    padding-bottom: .8rem;
  }

     .title{
        margin-top: .6rem;
        text-align: center;
        color:#dfdfdf;
        height: 30px;
         line-height: .8rem;
        font-size: .16rem;
        text-align: center;
        background: url('../assets/img/home/popug-top2.png') center top no-repeat;
        background-size: 55% ;
        margin-top: -.3rem;
        padding:.35rem 0 .15rem 0;

        span{
            border-bottom: 1px solid #e37c2b;
            padding-bottom: .1rem;
           }
      }
      .orderResult_list{
         margin-top: .4rem;


        .btn-order-result {
          margin: .1rem 6px;
          background: #120714;
          padding:.1rem;
             p{
              display: flex;
              justify-content: space-between;
              height: .2rem;
              line-height: .2rem;
              font-size: 14px;

             .buytime{
                color:#b5b5b5;
            }

            }
          }
        }
             .orderResultbtn{
              position: absolute;
              bottom: .35rem;
              width:100%;
              text-align: center;
             }

       .orderResultbtn span{
        padding: .1rem .14rem;
        font-size: 18px;
         border: 1px solid #362038;
         color:#d8d8d8;
         border-radius: 50%;
         margin:0 .2rem;
       }
       .closebtn{
        font-size: 16px;
        position: absolute;
        right: .2rem;
        top:.2rem;

      }
      .NoOrder{
        text-align: center;
       font-size: 14px;
      }


}


  </style>
