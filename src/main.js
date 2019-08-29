// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Mint from 'mint-ui';
import 'normalize.css';
import 'mint-ui/lib/style.css';
import Es6Promise from 'es6-promise';
import VueCordova from 'vue-cordova';

import App from './App';
import router from './router';
import store from './store';
import api from '@/assets/js/api';
import Common from '@/assets/js/common';

Vue.config.productionTip = false
Vue.prototype.$api = api;

Es6Promise.polyfill();
Vue.use(VueCordova);
Vue.use(Mint);
Vue.use(Common);
// Vue.component('chart', ECharts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
