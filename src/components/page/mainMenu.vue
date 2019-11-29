<template>
  <div class="main-menu">
    <div class="main-menu-background">
      <div class="main-menu-content">
        <tr class="table-header">
          <th class="table-header-title" width="320" height="70"></th>
          <th width="300">报警管理</th>
          <th width="300">门禁管理</th>
          <th width="300">视频监控管理</th>
          <th width="100"></th>
        </tr>
        <tr class="the-first-row">
          <td v-for="(item, index) in firstModuleList" :key="" height="230">
            <div>
              <menu-module :module-name="item.name"
                           :module-icon="item.icon"
                           module-width="260px"
                           module-height="170px"
                           module-icon-width="200"
                           module-name-width="200"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
          <td>
            <div>
              <menu-module :module-name="name_0"
                           :module-icon="icon_0"
                           module-width="260px"
                           module-height="170px"
                           module-icon-width="200"
                           module-name-width="200"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
          <!--<td>$100</td>-->
          <!--<td>$100</td>-->
          <!--<td>$100</td>-->
        </tr>

        <tr class="the-second-row">
          <td v-for="(item, index) in secondModuleList" :key="" height="230">
            <div>
              <menu-module :module-name="item.name"
                           :module-icon="item.icon"
                           module-width="260px"
                           module-height="170px"
                           module-icon-width="200"
                           module-name-width="200"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
          <td>
            <div>
              <menu-module module-name="moduleTest"
                           module-icon="setting"
                           module-width="260px"
                           module-height="170px"
                           module-icon-width="200"
                           module-name-width="200"
                           @checkTheRouter="moduleTest"></menu-module>
            </div>
          </td>
        </tr>

        <tr class="the-second-row">
          <td v-for="(item, index) in thirdModuleList" :key="">
            <div>
              <menu-module :module-name="item.name"
                           :module-icon="item.icon"
                           module-width="260px"
                           module-height="170px"
                           module-icon-width="200"
                           module-name-width="200"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuModule from "../common/usual/menuModule";

  export default {
    name: "mainMenu",
    components: {MenuModule},
    data() {
      return {
        name_0: '视频回放',
        icon_0: 'caret-right',

        firstModuleList: [
          {name: '首页', icon: 'home'},
          {name: '当前报警', icon: 'alert'},
          {name: '门禁卡管理', icon: 'credit-card'},
          {name: '设置', icon: 'setting'}
        ],

        secondModuleList: [
          {name: '用户管理', icon: 'user'},
          {name: '历史报警', icon: 'phone'},
          {name: '门禁用户管理', icon: 'team'},
          {name: '实时视频', icon: 'thunderbolt'}
        ],

        thirdModuleList: [
          {name: '实时监控', icon: 'bar-chart'},
          {name: '自定义报警', icon: 'setting'},
          {name: '刷卡记录日志管理', icon: 'book'},
          {name: '抓拍浏览', icon: 'camera'}
        ]
      }
    },

    methods: {
      /**
       * @module 临时模块
       */
      moduleTest () {
        this.$router.push('/home/threeModule');
      },
      changeRouter(param) {
        const routerParam = param;
        switch (param) {
          case '首页':
            this.$router.push('/home/index');
            break
          case '用户管理':
            // console.log('it is click.')
            this.$router.push('/home/userManage');
            break
          case '实时监控':
            this.$router.push('/home/forthwithMonitor');
            break
          case '当前报警':
            this.$router.push('/home/currentAlarm');
            break
          case '历史报警':
            this.$router.push('/home/alarmHistory');
            break
          case '自定义报警':
            this.$router.push('/home/defineAlarm');
            break
          case '门禁卡管理':
            this.$router.push('/home/cardManage');
            break
          case '门禁用户管理':
            this.$router.push('/home/cardUserManage');
            break
          case '刷卡记录日志管理':
            this.$router.push('/home/cardLogManage');
            break
          case '设置':
            // this.$router.push('/home/index');
            break
          case '实时视频':
            // this.$router.push('/home/index');
            break
          case '抓拍浏览':
            // this.$router.push('/home/index');
            break
          case '视频回放':
            // this.$router.push('/home/index');
            break
          default:
            return true;
        }
      }
    }
  }
</script>

<style scoped>
  .main-menu {
    color: #fff;
    border-radius: 18px;
    /*font-size: 30px;*/
    display: flex;
    /*text-align: center;*/
    /*padding-top: 10px;*/
    /*margin-bottom: 16px;*/
    /*box-shadow: 0 2px 10px rgba(0,0,0,0.46), 0 0 6px rgba(0,0,0,0.54)*/
  }

  .main-menu-background {
    width: 90%;
    height: 860px;
    margin: 0 auto;
    padding: 35px 0 0 20px;
    /*justify-content: center;*/
    /*align-items: center;*/
    /*align-content: center;*/
    /*justify-items: center;*/
    background: url("../../assets/img/back/menu-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .main-menu-content {
    margin: 10px 0 0 60px;
    font-size: 30px;
  }

  .table-header {
    font-size: 22px;
  }

  .table-header-title {
    /*width: 40px;*/
  }
</style>
