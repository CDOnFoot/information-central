// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  common from  '../utils/common.js'
import $ from 'jquery'
import  Vuex from 'vuex'
import store from './store'
// import '../static/css/iconfont.css';
import 'ant-design-vue/dist/antd.less';  // or 'ant-design-vue/dist/antd.less'
// import '../static/css/animate.css';
// import '../src/assets/css/animate.css';
import './assets/css/default.css';

import Antd from 'ant-design-vue'
import api from '../utils/api'
import http from '../utils/http'
import VueWechatTitle from 'vue-wechat-title'
// 引入 x2js ，用于视频模块
import x2js from 'x2js'
// 引入原生 axios 模块
import axios from 'axios';

// element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// antd single module import
import { Button } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'

Vue.use(VueWechatTitle)
// 关闭生产环境下的错误信息提示
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(Button);
// Vue.use(ElementUI);
Vue.use(Vuex);

import echarts from '../node_modules/echarts'
Vue.prototype.$echarts = echarts;
Vue.prototype.Modal =  Modal;

// 支持IE浏览器兼容问题（Promise）
import 'es6-promise/auto'

// 添加图标按钮 引用iconfont
import '../src/assets/font/iconfont.css';
import '../src/assets/font/iconfont.js';

Vue.prototype.$common= common;
Vue.prototype.$api= api;
Vue.prototype.$http= http;
// 请求第三方 API 需使用原生 axios 访问 localhost 转代理
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api';
Vue.prototype.$baseUrl = process.env.API_PORT;
// jquery 继承原型链
Vue.prototype.$ = $;
// x2js 继承原型链
Vue.prototype.$x2js = x2js;
    //路由判断权限

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
