'use strict'

    import Vue from "vue";
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import Antd from 'ant-design-vue'
    import router from '../src/router'
  
    // import {SHA1} from "./SHA";
    import qs from 'qs'
    import common from '../utils/common.js'
    import api from './api'
    import { message } from 'ant-design-vue'
    Vue.use(message);
    Vue.use(Antd);

    //配置信息
    var useStaging = false;
    var host = useStaging ? 'http://10.66.1.102:28070':'http://10.66.1.160:28070';
    // var host = useStaging ? 'http://10.66.1.102:28070':'http://10.28.3.81:28070';

    // websocket配置信息/url+user/id+token
    var websocketHost = useStaging ? 'ws://10.66.1.160:28070/subway/info/ws/':'ws://10.66.1.160:28070/subway/info/ws/';
    var websocketService = useStaging ? 'ws://10.66.1.160:28070/subway/info/ws/':'ws://10.66.1.160:28070/equipment/info/ws/';
    // var websocketHost = useStaging ? 'ws://10.28.3.81:28070/subway/info/ws/':'ws://10.28.3.81:28070/subway/info/ws/';
    // var websocketService = useStaging ? 'ws://10.28.3.81:28070/subway/info/ws/':'ws://10.28.3.81:28070/equipment/info/ws/';

    // var host = useStaging ? 'http://10.66.1.102:28070':'http://10.66.1.192:28070';
    // var host = useStaging ? 'http://10.66.1.102:28070':'http://10.66.1.102:28070';
    // var host = useStaging ? 'http://10.66.1.102:28070':'http://10.66.11.144:28070';

    var self = this;
    // **路由请求拦截**
    // http request 拦截器
    axios.interceptors.request.use(config => {
      let token = Cookies.get('dvptToken');
      // 拦截器在请求头中加token/userId
      if(config.url!='/login'){
        if (token === 'null' || token === '' || token==="undefined") {
          self.$info({
            title: '提示',
            content: '当前登录状态已过期！',
            onOk() {
              self.$router.push('/login');
            },
          });
        } else{
          config.headers={
            userId: Cookies.get("dvptId"),
            custom_token: Cookies.get("dvptToken"),
            'content-Type': "application/x-www-form-urlencoded;charset=utf-8;",
            "Access-Control-Allow-Origin":"*",
          };
        }
      }
      return config;
    }, error => {
      return Promise.reject(error)
    });
    // **路由响应拦截**
    axios.interceptors.response.use(response => {
      if(response.data.code==='40001'||response.data.code==='40002' ||response.data.code==='60002' || response.data.code==='60001' ||response.data.code==='60005'){
         router.push({
          path: '/login' // 到登录页重新获取token
        });
      }
      return response;
    }, err => {
    
      // 请求的错误判断,根据不同的错误码不同消息提醒
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '错误请求';
            break;
          case 401:
            err.message = '未授权，请重新登录';
            break;
          case 403:
            this.$router.push("/login");
            err.message = '拒绝访问，请重新登录';
            break;
          case 404:
            err.message = '请求错误,未找到该资源';
            break;
          case 405:
            err.message = '请求方法未允许';
            break;
          case 408:
            err.message = '请求超时';
            break;
          case 500:
            err.message = '服务器端出错';
            break;
          case 501:
            err.message = '网络未实现';
            break;
          case 502:
            err.message = '网络错误';
            break;
          case 503:
            err.message = '服务不可用';
            break;
          case 504:
            err.message = '网络超时';
            break;
          case 505:
            err.message = 'http版本不支持该请求';
            break;
          default:
            err.message = `连接错误${err.response.status}`;
        }
      } else {
        err.message = "连接到服务器失败";
      }
      // message.error(err.message,3);
      // 错误提示,记得引入message
      return Promise.resolve(err.response);
    });

    function checkStatus (response) {
      // loading
      // 如果http状态码正常，则直接返回数据
      if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
      }
      // 异常状态下，把错误信息返回去
      return {
        status: -404,
        msg: '网络异常'
      }
    }
    function checkCode (res) {
      // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
      if (res.status === -404) {
        console.log(res.msg);
        // message.error("连接服务器失败，请重新登录");
        // router.push({
        //   path: '/login' // 到登录页重新获取token
        // });
      }
      // if (!res.data && (res.data.msg != "success" || res.data.msg != "SUCCESS")) {
      //    console.log(res.data.msg)
      // }
      return res
    }
    function formateParm(parm) {
        // var sign = "";
        // //系统参数
        // parm['pin'] = pin();
        // var timeStamp = new Date().getTime();
        // parm['timeStamp'] = timeStamp;
        // //按照key值升序排列
        // var params = Object.keys(parm).sort();
        // //签名规则追加
        // for (var ki in params) {
        //     sign += params[ki] + parm[params[ki]];
        // }
        // sign = sign + imToken();
        // parm["sign"] = SHA1(sign);
        return parm
    }

    let urlEncode = (url, data) => {
      　if (typeof (url) === undefined || url === null || url === ''){
            return '';
        }else if (typeof (data) === undefined || data === null || typeof (data) !== 'object'){
            return url;
        }else {
           url += (url.indexOf('?') !== -1) ? '' : '?';
           for (let k in data) {
               url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(data[k])
           }
           return url;
       }
    };

    export default {
      // websocket配置信息
      websocketHost,
      websocketService,
      //  post
      post (url, params) {
        return axios({
          method: 'post',
          baseURL: host, url,
          data: qs.stringify(params),
          timeout: 20000,
        }).then(
          (response) => {
            return checkStatus(response)
          }).then(
          (res) => {
            return checkCode(res)
          })
      },
      //  get请求
      get (url, params) {
        var param;
        //判断校验情况
        if (url === "/login") {
          param = params;
        }else {
          param = formateParm(params);
        }
        var urlencode = urlEncode(host + url,param);
        return axios({
          method: 'get',
          url:urlencode,
          timeout: 20000,
          }).then(
          (response) => {
            return checkStatus(response)
          }
          ).then(
          (res) => {
            return checkCode(res)
          }
        )
      },
      
    }
