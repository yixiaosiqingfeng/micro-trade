<template>
  <section class="page account-record-page" :class='{"page-has-header": showHeader}'>
    <v-header title='我的客户' v-if='showHeader'></v-header>
    <!-- 搜索 -->
    <div class="search">
        <input v-model="findString" type="text" placeholder="请输入昵称/id/手机号码精确查找">
        <button @click="searchCus()">搜索</button>
    </div>
    <template v-if='customerList.length > 0'>
      <div class="page-list" v-infinite-scroll="getSubordinate" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="record-cell" v-for='item in customerList' :key='item.id'>
          <div class="cell-bd">
            <div class="flex cell-title">
              <span class="cusid">id:{{item.id}}</span> <span class="cusname">{{item.username}}</span>
            </div>
            <div>
                <span :class="item.isAct == 0 ? 'act-btn act0' : 'act-btn act1'" @click="Activation(item.id,item)" v-html="item.isAct == 0 ? '激活' : '已激活'"></span>
            </div>
            <div class="flex cell-sub">手机号：{{item.phone}}</div>
            <div class="flex cell-sub">充值总额：<span style="color:#f00;">{{item.rechargeTotal}}</span>元</div>
          </div>
        </div>

        <div class="loading-container">
          <mt-spinner :type="2" v-if='loading && !completed'></mt-spinner>
          <p class="finished-text" v-else-if='completed'>全部加载完成</p>
        </div>
      </div>
    </template>

    <template v-else-if='inited && customerList.length <= 0'>
      <div class="empty-container flex-v">
        <i class="iconfont icon-zanwushuju"></i>
        <!-- <img src="../../assets/img/person/result-empty.png"> -->
        <p>暂无数据</p>
      </div>
    </template>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';

export default {
  name: 'AccountRecord',
  components: {VHeader},
  data() {
    return {
        btnShow:[],
        findString:[],
      customerList: [],
      page: 1,
      pageNum: 10,
      loading: false,
      completed: false,
      inited: false,
    }
  },
  computed: {
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  created() {
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    this.getSubordinate();
  },

  methods: {
    // 获取客户列表
    getSubordinate() {
      if (this.loading || this.completed) { return; }
      this.loading = true;

      this.$api.getSubordinate({page: this.page, pageNum: this.pageNum,findString:this.findString})
      .then(res => {
        if (!this.inited) {
          this.inited = true;
          this.$indicator.close();
        }
        if (res.code === '00') {
          this.customerList = this.customerList.concat(res.data);
          if (this.page < res.lastPage) {
            this.loading = false;
            this.page++;
          } else {
            this.completed = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },
    // 搜索客户
    searchCus(){
        this.completed = false;
        this.customerList = [],
        this.$api.getSubordinate({findString:this.findString})
        .then(res => {
        if (!this.inited) {
          this.inited = true;
          this.$indicator.close();
        }
        if (res.code === '00') {
          this.customerList = this.customerList.concat(res.data);

          if (this.page < res.lastPage) {
            this.loading = false;
            this.page++;
          } else {
            this.completed = true;
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },
    // 激活用户
     Activation(id,obj) {
        this.$api.Activation({userId: id}).then(res => {
            if (res.code === '00') {
                this.$toast('激活成功');
                obj.isAct = 1;
            } else {
                this.$toast({message: (res.data.msg || res.msg), duration: 3000});
            }
        })
    },
  },

  beforeRouteLeave (to, from, next) {
    this.$indicator.close();
    next();
  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.account-record-page {
    .search{
        width: 94%;
        margin: 0 auto;
        height: 40px;
        input{
            width: 76%;
            height: 28px;
            border: none;
            background-color: rgba(255,255,255,0.4);
            border-radius: 3px;
            color: #fff;
            padding-left: 3%;
        }
        input::-webkit-input-placeholder {
            color: #ffffff;
            font-size: 12px;
        }
        button{
            width: 19%;
            height: 28px;
            border: none;
            background-color: rgba(255,255,255,0.6);
            outline: none;
            border-radius: 3px;
            color: #fff;
        }
    }
  .record-cell {
    width: 90%;
    margin: 8px auto;
    height: 0.72rem;
    border-radius: 8px;
    background-color: #fff;
    color: #000;
    .cell-hd {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .iconfont{
        color: #ffc778;
        font-size: 24px;
        text-align: center;
      }
    }
    .cell-bd{
      color: #000;
      position: relative;
      .cell-sub{
          line-height: 20px;
          color: #6d6767
      }
      .cusid{
          margin-right: 10px;
          font-size: 12px;
          color: #b2afaf
      }
      .cusname{
          font-size: 14px;

      }
      .act-btn{
        position: absolute;
        width: 70px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: #dedede;
        color: #fff;
        border-radius: 5px;
        top: 28%;
        right: 5px;
      }
      .act1{
        background-color: #dedede;
      }
      .act0{
        background-color: #f00;
      }
    }
  }
}
</style>
