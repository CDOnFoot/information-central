import Vue from 'vue';
import Vuex from 'vuex';
import common from '../../utils/common.js';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    Authorization: common.getCookie('Authorization') ? common.getCookie('Authorization') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
        console.log(state,user);
        state.Authorization = user.Authorization;
        common.setCookie('token','530c1597-c5ec-43b0-9f32-e6b61986a9b9',24 * 60);

        // localStorage.setItem('Authorization', user.Authorization);
    }
  }
});
 
export default store;
