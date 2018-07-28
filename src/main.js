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
import d3 from 'd3'
import VueI18n from 'vue-i18n'
import { Message, Loading } from 'element-ui';

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
  template: '<App/>',
  data() {
    return{
    }
  },
  methods: {
  }
});

let loading = null;
let needLoadingRequestCount = 0

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

/*http request 拦截器*/
axios.interceptors.request.use(
  config => {
    if(sessionStorage.getItem('_token')){
      config.headers.Authorization = `token${sessionStorage.getItem('_token')}`;
    }
    showFullScreenLoading()
    return config;
  },
  err => {
    return Promise.reject(err)
  }
);
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
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

