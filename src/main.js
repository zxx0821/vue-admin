// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import axios from 'axios'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '../src/style/index.less'
import Mock from './mock'
import store from './vuex/index'
import echarts from 'echarts'
import * as d3 from 'd3'
import VueI18n from 'vue-i18n'
Vue.use(Router);
Vue.use(VueI18n);
Mock.bootstrap();
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
axios.defaults.timeout = 5000;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

/*http request 拦截器*/
axios.interceptors.request.use(
  config => {
    if(sessionStorage.getItem('_token')){
      config.headers.Authorization = `token${sessionStorage.getItem('_token')}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err)
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response) {
      switch(error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error);
  }
);

