<template>
  <section class="page page-has-tabbar home-page" id="home">
    <div class="page-hd">
      <click-btn v-show="isShow"></click-btn>
      <!-- <div class="top-block">
        <span class="balance"><i class="iconfont icon-icon-test1"></i> <em>{{format(userInfo.balance) || '0.00'}}</em></span>
        <router-link class="cj-btn" to="/topup">充值</router-link>
      </div> -->
      <mt-swipe class="banner-list" :auto="8000">
          <mt-swipe-item v-for='imgs in bannerlist' :key='imgs.id'><a :href="imgs.link"><img :src="getImgURL(imgs.img)" class="img"></a></mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="page-notice" v-show="noticeShow">
      <div class="notice-title">
        <i class="iconfont icon-gonggao"></i><span>公告：</span>
      </div>
      <div class="notice-box">
        <ul id="con1" ref="con1" :class="{anim:animate==true}">
          <li v-for='item in items' v-on:click="showNoticePopup(item.id)"  >{{item.title}}</li>
        </ul>
      </div>
    </div>

    <div class="page-bd">
      <div class="bd-content">
        <p class="bd-title">竞猜大厅</p>
        <ul>
          <li v-for='(item, index) in list' :key='item.id'>
            <router-link class="bd-item flex" :to="'/order?code=' + item.code + '&id=' + item.id">
            <table>
              <tr>
                <td class="left-box"><div class="flex-item bd-item-0 ">{{item.name}}</div></td>
                <td class="cen"><div class="flex-item red">最低价：{{format(item.low,2)}}</div></td>
                <td class="jump" rowspan="2">立即竞猜</td>
              </tr>
              <tr>
                <td class="left-box"><div :class="['flex-item bd-item-1', (oldList.length > 0 && (item.price < oldList[index])) ? 'down' : 'up']">{{format(item.price,2)}}</div></td>
                <td class="cen"><div class="flex-item green highprice">最高价：{{format(item.high,2)}}</div></td>
              </tr>
            </table>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 公告弹框 -->
    <notice-popup :visible='noticePopupVisible' :msgId='msgId' :allMsg='allMsg' @cancel='hideNoticePopup'></notice-popup>
  </section>
</template>


<script>
import {mapState} from 'vuex';
import ClickBtn from '@/components/ClickBtn';
import NoticePopup from '@/components/NoticePopup';

export default {
  name: 'Home',
  components: {ClickBtn,NoticePopup},
  data() {
    return {
      msgId:0,
      noticePopupVisible:false,
      list: [],
      oldList: [], //存储上一秒的数据 用于对比这一秒和上一秒现价
      timer: '', //计时器
      timer2: '', //公告的计时器
      bannerlist:[],//首页轮播图
      isShow:true,
      noticeShow:false,
      animate: false,
      items:[],
      allMsg:[], // 所有公告
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    })
  },

  created() {
    if (window.localStorage.getItem('token')) {
      this.getUserInfo();
      this.isShow=true;
    }else {
      // 如果没有登录 则直接跳去登录
      this.isShow=false;
    }
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.BannerSwipe();

    this.getProductList()
    .then(res => {
      this.timer = setInterval(() => {
        this.getProductList();
      }, 2000);
    });

    this.timer2 = setInterval(this.scroll,3000);
    this.GetNoticeList();
  },

  methods: {
    showNoticePopup(msgId){
      this.msgId = msgId;
      this.noticePopupVisible = true;
    },
    hideNoticePopup(){
      this.noticePopupVisible=false;
    },
    // 获取商品分类列表
    getProductList() {
      return this.$api.getProductList({needInfo: true})
      .then(res => {
        this.$indicator.close();
        if (res.code === '00') {
          // this.oldList = Object.assign({}, this.list);
          this.assignList(this.list);
          this.list = res.data;
        } else {
          this.$toast(res.msg);
        }
      }).catch(err => {
        this.$indicator.close();
        this.$toast('请求超时');
      })
    },

    // 将当前的list的price copy一份到oldList
    assignList(list) {
      this.oldList = list.map(item => item.price);
    },

  //首页轮播
  BannerSwipe(){
   return this.$api.BannerSwipe()
    .then(res => {
      if(res.code =='00'){
       this.bannerlist = res.data;

      }else{
        this.$toast(res.msg)
      }
    }).catch(err=>{
      this.$toast(err);
    })
  },
 //   获取公告列表
    GetNoticeList(){
      this.$api.getMessageList()
        .then(res=>{
          if (res.code==='00'){
            this.items=res.data;
            var needShowNotice = false;
            for (var i = 0; i < this.items.length; i++) {
              this.noticeShow=true;
              this.allMsg.push(this.items[i]);
              if (this.allMsg[i].isRead == '0') {
                needShowNotice = true;
              }
            }
            if(needShowNotice){
              this.noticePopupVisible = true;
            }
          } else {
            this.$toast(res.msg)
          }
        })
    },
 //公告
    scroll(){
       this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
       setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
         this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
         this.items.shift();               //删除数组的第一个元素
         this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
       },1000)
    }


 },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    this.$indicator.close();
    next();
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';
.home-page{
  background: url("../../assets/img/home/home_bg.png") no-repeat !important;
  background-size: 100% 100% !important;
}

.home-page {
  .page-notice{
    align-items: center;
    display: flex;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    color: #444242;
    margin:0px auto;
    margin-bottom: 18px;
    width: 90%;
    height: 35px;
    line-height: 35px;
    .notice-title{
      width: 22%;
      padding-left: 5%;
      float: left;
      i{
        font-size: 0.17rem;
      }
      span{
        padding-left: 3px;
        font-size: 0.12rem;
      }
    }
    .notice-box{
      cursor:pointer;
      width: 70%;
      height: 30px;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: right;
      display: block;
      position: relative;
      overflow: hidden;
      .anim{
        transition: all 0.8s;
        margin-top: -30px;
      }
      #con1 li{
        list-style: none;
        line-height: 30px;
        height: 30px;
      }

    }
  }
  .page-hd{
    position: relative;
    padding:.15rem 0;
    width: 90%;
    margin:0 auto;
    .top-block{
      position: absolute;
      top: 10%;
      left: 5%;
      color: #fff;
      z-index: 100;
      .balance{
        background-color: rgba(0,0,0,.3);
        padding: 5px 15px 5px 5px;
        border-radius: 5px;
        box-shadow:0 -1px 0 #FAFF87, 0 5px 25px rgba(0,0,0,.7);
        margin-right: 3%;
        i{
          color: #FAFF87;
        }
        em{
          font-style: normal;
        }
      }
      .cj-btn{
        background-color: #FF7012;
        box-shadow:0 -1px 0 #FAFF87, 0 5px 25px rgba(0,0,0,.7);
        padding: 5px 8px;
        border-radius: 5px
      }
    }

  .banner-list{
    height: 130px;
     border-radius: 10px;


      .img{
        width: 100%;
        // height: 100%;

    }

  }
  }
  .page-bd {
    z-index: 3;
    width: 90%;
    margin: 7px auto;
    background-color:rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow:0 -5px 0 #FF3A3A, 0 5px 25px rgba(0,0,0,.7);
    .bd-title {
      height: .4rem;
      line-height: .4rem;
      color: #8B4610;
      padding-left: 5%;
      font-size: 16px;
    }
    ul{
      // height: 3.5rem;
      overflow: scroll;
      li{
        .bd-item {
          height: 70px;
          color: #000;
          background-color: #fff;
          width: 90%;
          border-radius: 10px;
          font-size: 12px;
          margin: 8px auto;
          table{
            width: 100%;
            height: 100%;
            padding: 0;
            border-spacing:0;
            td{
              width: 33.3%;
              padding: 0 2%;
              font-size: 12px;
            }
            .left-box{
              width: 30%;
            }
            .jump{
              background-color: #E37C2B;
              width: 25%;
              text-align: center;
              color: #fff;
              font-size: 13px;
              border-radius: 0 10px 10px 0;
            }
            .bd-item-0 {
              font-size: 13px;
              line-height: 25px;

            }
            .cen{
              transform: scale(0.9);
              padding: 0;
              .flex-item{
                text-align: left;
              }
            }
            .bd-item-1 {
              font-size: 13px;
              height: 30px;
              line-height: 30px;
              border-radius: .05rem;
              width: 70%;
              margin: -12px  auto 0 auto;

              &.up {
                background-color: @red;
                color: #fff;

              }
              &.down {
                background-color: @green;
                color:#fff;
              }
            }
          }
        }
      }
    }
  }
  .block-list{
    width: 90%;
    margin: 10px auto;
    display: flex;
    .home-block{
      margin: 0 1%;
      flex: 1;
      img{
        width: 100%;
      }
    }
  }
  .highprice{margin-top:-16px;}
}
</style>
