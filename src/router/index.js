// 20191014

import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/page/login';

import home from '../components/common/home';
import energy from '../components/page/energy';
import passenger from '../components/page/passenger';
import index from '../components/page/index';
import rail from '../components/page/rail';
// 模版
import MB01 from '../components/common/MB/MB01';
import MB02 from '../components/common/MB/MB02';

// 模块内容
import MC01 from '../components/common/MC/MC01';
import MC02 from '../components/common/MC/MC02';
import MC03 from '../components/common/MC/MC03';
import MC04 from '../components/common/MC/MC04';
import MC05 from '../components/common/MC/MC05';
import MC06 from '../components/common/MC/MC06';
import MC07 from '../components/common/MC/MC07';
import MC08 from '../components/common/MC/MC08';
import MC09 from '../components/common/MC/MC09';


Vue.use(Router);

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/login',
      meta:{
        title:'登录',
        keepAlive:false
      }
    },
    {
      path:'/login',
      component: login,
      meta:{
        title:'登录',
        keepAlive:false

      }
    },
    {
      path:'/home',
      component: home,
      meta:{
        title:'首页',
        keepAlive:false

      },
      children:[{
          path:'index',
          component: index,
          meta:{
            title:'首页',
            keepAlive:false

          }
        },
        {
          path:'energy',
          component: energy,
          meta:{
            title:'能耗分析',
            keepAlive:false

          }
        },
        {
          path:'passenger',
          component: passenger,
          meta:{
            title:'客流分析',
            keepAlive:false

          },
        },
        {
          path:'rail',
          component: rail,
          meta:{
            title:'线路概况',
            keepAlive:false

          },
        },
        ]
    },

  ]
})

