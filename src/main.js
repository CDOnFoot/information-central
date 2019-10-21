// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  common from  '../static/js/common'
import $ from 'jquery'

import 'ant-design-vue/dist/antd.css';  // or 'ant-design-vue/dist/antd.less'
import '../static/css/animate.css';
import './assets/css/default.css';

import Antd from 'ant-design-vue'
import api from '../utils/api'
import http from '../utils/http'

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.use(Antd);


import echarts from '../node_modules/echarts'
Vue.prototype.$echarts = echarts


Vue.prototype.$common= common;
Vue.prototype.$api= api;
Vue.prototype.$http= http;
    //路由判断权限

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
