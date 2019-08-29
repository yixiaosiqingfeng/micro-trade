<template>
  <mt-tabbar v-model="selected" class='tabbar'>
    <router-link :class="['mint-tab-item tab-item', {'tab-item-actived': selected == tab.id}]" v-for='tab in tabs' :key='tab.id' :id='tab.id' :to='tab.link' replace>
      <div class="mint-tab-item-icon">
        <i :class="['iconfont tab-icon', tab.icon]"></i>
      </div>
      <div class="mint-tab-item-label">
        {{tab.title}}
      </div>
    </router-link>
  </mt-tabbar>
</template>


<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      tabs: [
        { id: '/', title: '首页', icon: 'icon-d', link: '/' },
        { id: '/record', title: '战绩', icon: 'icon-jiangbei', link: '/record' },
        { id: '/person', title: '我的', icon: 'icon-wode', link: '/person' },
      ],
    }
  },
  computed: {
    selected: {
      get() {
        return this.$route.path;
      },
      set() {}
    }
  },
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.tabbar {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  height: 49px;
  padding-bottom: 8px;
  background-color: @tab-bgc;
  background-image: none;
  font-size: 11px;
  color: @tab-c;

  .tab-item {
    padding: 4px 0;
    outline: none;
    &.tab-item-actived {
      color: @tab-c-active;
      .mint-tab-item-label {
        color: @tab-c-active;
      }
    }
  }
  .mint-tab-item-icon {
    position: relative;
  }
  .tab-icon {
    /* width: 22px; */
    /* height: 22px; */
    font-size: 22px;
  }
  &.mint-tabbar>.mint-tab-item.is-selected {
    background-color: @tab-bgc;
    background-color: transparent;
    color: @tab-c;
  }
  .mint-tab-item-label {
    color: @tab-c;
  }
}
</style>
