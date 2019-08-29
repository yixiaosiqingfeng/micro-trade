<template>
  <section class="bind-bankcard-page page" :class='{"page-has-header": showHeader}'>
    <v-header title='绑定银行卡' v-if='showHeader'></v-header>

    <form @submit.prevent='bindBankcard'>
      <mt-field @click.native='bankPopupVisible = !bankPopupVisible' class='cell-common cell-region' label="选择银行" type='text' v-model='form.bankName' placeholder='点击选择银行' readonly><i class="mint-cell-allow-right"></i></mt-field>
      <mt-field @click.native='popupVisible = !popupVisible' class='cell-common cell-region' label="省份城市" type='text' v-model='form.address' placeholder='点击选择地址' readonly><i class="mint-cell-allow-right"></i></mt-field>
      <mt-field class='cell-common' label="支行名称" type='text' v-model='form.branch' placeholder='例：广州滨江东支行'></mt-field>
      <mt-field class='cell-common' label="卡号" type='tel' v-model='form.bankNumber' placeholder='请输入银行卡号'></mt-field>
      <mt-field class='cell-common' label="持卡人" type='text' v-model='form.userName' placeholder='请输入持卡人姓名'></mt-field>

      <div class="btn-area">
        <input type="submit" value="立即绑定" class="mint-button btn-primary mint-button--danger mint-button--large">
      </div>
    </form>

    <!-- 省市选择器 -->
    <v-picker :visible='popupVisible' v-on:confirm='selectAddress' v-on:cancel='cancel'></v-picker>
    <bank-picker :visible='bankPopupVisible' v-on:confirm='selectBankName' v-on:cancel='cancelBankPopup'></bank-picker>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import VPicker from '@/components/VPicker';
import BankPicker from '@/components/BankPicker';
import {mapState} from 'vuex';

export default {
  name: 'Withdrawals',
  components: { VHeader, VPicker, BankPicker },
  data() {
    return {
      form: {
        bankName: '', //银行名称
        address: '', //地址
        province: '', //省份
        city: '', //城市
        branch: '', //支行名称
        bankNumber: '', // 卡号
        userName: '', //持卡人
      },
      popupVisible: false,
      bankPopupVisible: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      config: state => state.config,
    }),
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },

  methods: {
    // 表单提交
    bindBankcard() {
      if (this.validate(this.form)) {
        this.$api.bindBankcard(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast('绑定银行卡成功');
            // 绑定成功后更新用户信息
            this.getUserInfo()
            .then(res => {
              this.goto({name: 'Withdrawals'});
            })
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    cancel() {
      this.popupVisible = false;
    },
    cancelBankPopup() {
      this.bankPopupVisible = false;
    },
    // 选择地址
    selectAddress(value) {
      if (value) {
        this.form.province = value.selectedProvince;
        this.form.city = value.selectedCity;
        this.form.address = value.selectedProvince + ' ' + value.selectedCity;
      }
      this.popupVisible = false;
    },
    // 选择银行名称
    selectBankName(value) {
      if (value) {
        this.form.bankName = value.selectedBankName;
      }
      this.bankPopupVisible = false;
    },
  },
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.bind-bankcard-page {
  .v-cell .img-block {
    border-radius: 50%;
  }
  .cell-title {
    line-height: normal;
  }
  .cell-sub-fee {
    font-size: .12rem;
  }
  .mint-cell {
    border-bottom: 1px solid @popup-bgc;
    height: .45rem;
    min-height: .45rem;
    /* background-color: @black-light; */
    .mint-field-core {
      /* background-color: @black-light; */
      color: @white;
    }
    .mint-cell-text {
      color: @white;
    }
  }
  .cell-common {
    font-size: .14rem;
    input {
      font-size: .14rem;
    }
    .mint-button {
      border: none;
      background-color: #fff;
      box-shadow: none;
      font-size: .14rem;
      color: @blue;
    }
  }
  .cell-region input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cell-fees {
    height: .35rem;
    line-height: .35rem;
    min-height: .35rem;
    /* color: @gray-light; */
    font-size: .12rem;
    input {
      font-size: .12rem;
      color: @primary;
    }
  }
  .form-hd {
    margin: .1rem 0 .2rem;
  }
  .btn-area {
    margin: .3rem .1rem;
  }
  .tips-link {
    display: block;
    padding-bottom: .2rem;
    width: 100%;
    text-align: center;
    font-size: .12rem;
    color: @blue;
    text-decoration: underline;
  }
}

</style>
