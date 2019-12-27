import Vue from 'vue';
import Vuex from 'vuex';
import common from '../../utils/common.js';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    Authorization: common.getCookie('Authorization') ? common.getCookie('Authorization') : '',
    screenWidth: '',
    screenHeight: '',
    // 处理后的设备点值 list
    usedPoints: [],
    // 每个组件的页签
    pageTarget: ''
  },

  getters: {
    getScreenWidth () {
      return state.screenWidth;
    },

    getScreenHeight () {
      return state.screenHeight;
    },

    getPointsList (state) {
      state.usedPoints = sessionStorage.getItem("statusList");
      return state.usedPoints;
    },

    getPageTarget (state) {
      state.pageTarget = sessionStorage.getItem("pageTarget");
      return state.pageTarget;
    }
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
        console.log(state,user);
        state.Authorization = user.Authorization;
        common.setCookie('token','530c1597-c5ec-43b0-9f32-e6b61986a9b9',24 * 60);

        // localStorage.setItem('Authorization', user.Authorization);
    },

    // 结合 sessionStorage 改变并存储 list
    storePoints (state, points) {
      sessionStorage.setItem("statusList", JSON.stringify(points));
      state.usedPoints = points;
    },

    changePageTarget (state, value) {
      sessionStorage.setItem("pageTarget", value);
      state.pageTarget = value;
    }
  }
});
 
export default store;
