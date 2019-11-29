// 20191014

import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/page/login';
import Cookies from 'js-cookie'

import home from '../components/common/home';
import energy from '../components/page/energy';
import passenger from '../components/page/passenger';
import index from '../components/page/index';
import rail from '../components/page/rail';
import safe from '../components/page/safe';
import flow from '../components/page/flow';
import service from '../components/page/service';

import common from '../../utils/common.js'
// 模版
import MB01 from '../components/common/MB/MB01';
import MB02 from '../components/common/MB/MB02';
import MB03 from '../components/common/MB/MB03';

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
import MC10 from '../components/common/MC/MC10';
import MC11 from '../components/common/MC/MC11';
import MC12 from '../components/common/MC/MC12';
import MC13 from '../components/common/MC/MC13';
import MC14 from '../components/common/MC/MC14';
import MC15 from '../components/common/MC/MC15';
import MC16 from '../components/common/MC/MC16';


Vue.use(Router);

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

// export default new Router({

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        title: '登录',
        keepAlive: false,
        needLogin: false
      }
    },
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录',
        keepAlive: false,
        needLogin: false
      }
    },
    {
      path: '/home',
      component: home,
      meta: {
        title: '首页',
        keepAlive: false
      },
      children: [

        // create new router besides "home"
        {
          path: 'mainMenu',
          component: resolve => require(['@/components/page/mainMenu'], resolve),
          meta: {
            title: '菜单',
            needLogin: true
          }
        },
        {
          path: 'threeModule',
          component: resolve => require(['@/components/common/usual/threeModule'], resolve),
          meta: {
            title: '测试模块',
            needLogin: true
          }
        },
        {
          path: 'userManage',
          component: resolve => require(['@/components/page/menu-module/user-manage'], resolve),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: 'forthwithMonitor',
          component: resolve => require(['@/components/page/menu-module/forthwith-monitor'], resolve),
          meta: {
            title: '实时监控'
          },
          children: [
            {
              path: 'topology',
              component: resolve => require(['@/components/page/menu-module/monitor-module/topology'], resolve)
            },
            {
              path: 'generalView',
              component: resolve => require(['@/components/page/menu-module/monitor-module/general-view'], resolve)
            },
            {
              path: 'config',
              component: resolve => require(['@/components/page/menu-module/monitor-module/config'], resolve)
            },
          ]
        },
        {
          path: 'currentAlarm',
          component: resolve => require(['@/components/page/menu-module/current-alarm'], resolve),
          meta: {
            title: '当前报警'
          }
        },
        {
          path: 'alarmHistory',
          component: resolve => require(['@/components/page/menu-module/alarm-history'], resolve),
          meta: {
            title: '历史报警'
          }
        },
        {
          path: 'defineAlarm',
          component: resolve => require(['@/components/page/menu-module/defineAlarm'], resolve),
          meta: {
            title: '自定义报警'
          }
        },
        {
          path: 'cardManage',
          component: resolve => require(['@/components/page/menu-module/card-manage'], resolve),
          meta: {
            title: '门禁卡管理'
          }
        },
        {
          path: 'cardUserManage',
          component: resolve => require(['@/components/page/menu-module/card-user-manage'], resolve),
          meta: {
            title: '门禁用户管理'
          }
        },
        {
          path: 'cardLogManage',
          component: resolve => require(['@/components/page/menu-module/card-log-manage'], resolve),
          meta: {
            title: '刷卡记录日志管理'
          }
        },
        {
          path: 'index',
          component: index,
          meta: {
            title: '首页',
            keepAlive: false,
            needLogin: true
          }
        },
        {
          path: 'energy',
          component: energy,
          meta: {
            title: '能耗分析',
            keepAlive: false,
            needLogin: true
          }
        },
        {
          path: 'passenger',
          component: passenger,
          meta: {
            title: '客流分析',
            keepAlive: false,
            needLogin: true
          },
        },
        {
          path: 'flow',
          component: flow,
          meta: {
            title: '智能客流',
            keepAlive: false,
            needLogin: true
          },
        },
        {
          path: 'safe',
          component: safe,
          meta: {
            title: '安全防范',
            keepAlive: false,
            needLogin: true
          },
        },
        {
          path: 'rail',
          component: rail,
          meta: {
            title: '线路概况',
            keepAlive: false,
            needLogin: true

          },
        },
        {
          path: 'service',
          component: service,
          meta: {
            title: '设备信息',
            keepAlive: false,
            needLogin: true
          },
        },
      ]
    },

  ]
});
export default router;

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  if (to.path === '/login') {
    next();
  } else {
    let token = Cookies.get('dvptToken');
    if (token === 'null' || token === '' || token === undefined || token === null) {
      next('/login');
    } else {
      next();
    }
  }
});
