<template>
  <div class="main-menu">
    <div class="main-menu-background" style="">
      <div ref="menuNode" class="main-menu-content" :style="{ width: '100%', 'font-size': fontSize, margin: '10px 15px 0 60px' }">
        <tr class="table-header"
            :height="tableHeaderHeight"
            :style="{}">
          <th class="table-header-title" :width="tableHeaderWidth"></th>
          <th :width="tableHeaderWidth">报警管理</th>
          <th :width="tableHeaderWidth">门禁管理</th>
          <th :width="tableHeaderWidth">视频监控管理</th>
          <th :width="tableHeaderWidth"></th>
        </tr>
        <tr class="the-first-row">
          <td v-for="(item, index) in firstModuleList"
              :key="index" :height="menuHeight">
            <div ref="rowOne" :class="item.icon">
              <menu-module :module-name="item.name"
                           :module-icon="item.icon"
                           :module-width="moduleWidth"
                           :module-height="moduleHeight"
                           :empty-width="emptyWidth"
                           :empty-height="emptyHeight"
                           :module-icon-width="iconWidth"
                           :module-icon-height="iconHeight"
                           :module-name-width="nameWidth"
                           @handleMouseOver="handleMouseOver($event)"
                           @handleMouseOut="handleMouseOut($event)"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
          <td>
            <div>
              <menu-module :module-name="name_0"
                           :module-icon="icon_0"
                           :module-width="moduleWidth"
                           :module-height="moduleHeight"
                           :empty-width="emptyWidth"
                           :empty-height="emptyHeight"
                           :module-icon-width="iconWidth"
                           :module-icon-height="iconHeight"
                           :module-name-width="nameWidth"
                           @handleMouseOver="handleMouseOver($event)"
                           @handleMouseOut="handleMouseOut($event)"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
          <!--<td>$100</td>-->
          <!--<td>$100</td>-->
          <!--<td>$100</td>-->
        </tr>

        <tr class="the-second-row">
          <td v-for="(item, index) in secondModuleList" :key="" :height="menuHeight">
            <div>
              <menu-module :module-name="item.name"
                           :module-icon="item.icon"
                           :module-width="moduleWidth"
                           :module-height="moduleHeight"
                           :empty-width="emptyWidth"
                           :empty-height="emptyHeight"
                           :module-icon-width="iconWidth"
                           :module-icon-height="iconHeight"
                           :module-name-width="nameWidth"
                           @handleMouseOver="handleMouseOver($event)"
                           @handleMouseOut="handleMouseOut($event)"
                           @checkTheRouter="changeRouter"></menu-module>
            </div>
          </td>
          <!--<td>
            <div>
              <menu-module module-name="moduleTest"
                           module-icon="setting"
                           :module-width="moduleWidth"
                           :module-height="moduleHeight"
                           :empty-width="emptyWidth"
                           :empty-height="emptyHeight"
                           :module-icon-width="iconWidth"
                           :module-name-width="nameWidth"
                           @checkTheRouter="moduleTest"></menu-module>
            </div>
          </td>-->
        </tr>

        <tr class="the-second-row">
          <td v-for="(item, index) in thirdModuleList" :key="">
            <div>
              <menu-module :module-name="item.name"
                           :module-icon="item.icon"
                           :module-width="moduleWidth"
                           :module-height="moduleHeight"
                           :empty-width="emptyWidth"
                           :empty-height="emptyHeight"
                           :module-icon-width="iconWidth"
                           :module-icon-height="iconHeight"
                           :module-name-width="nameWidth"
                           @handleMouseOver="handleMouseOver($event)"
                           @handleMouseOut="handleMouseOut($event)"
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
        // 表格头部
        // table_header: {},
        fontSize: '',
        tableHeaderWidth: '',
        tableHeaderHeight: '',
        menuHeight: '',
        moduleWidth: '',
        moduleHeight: '',
        emptyWidth: '',
        emptyHeight: '',
        iconWidth: '',
        iconHeight: '',
        nameWidth: '',

        name_0: '视频回放',
        icon_0: 'back-video',

        firstModuleList: [
          {name: '首页', icon: 'main-page'},
          {name: '当前报警', icon: 'alarm-2'},
          {name: '门禁卡管理', icon: 'card-manage'},
          {name: '设置', icon: 'setting'}
        ],

        secondModuleList: [
          {name: '用户管理', icon: 'user-manage'},
          {name: '历史报警', icon: 'alarm-1'},
          {name: '门禁用户管理', icon: 'card-user'},
          {name: '实时视频', icon: 'current-video'}
        ],

        thirdModuleList: [
          {name: '实时监控', icon: 'control'},
          {name: '自定义报警', icon: 'alarm'},
          {name: '刷卡记录日志管理', icon: 'card-log'},
          {name: '抓拍浏览', icon: 'browse'}
        ]
      }
    },

    mounted () {
      // console.log(this.$refs.rowOne);
      const that = this;
      this.$nextTick(() => {
        // 获取节点
        let menuNode = that.$refs.menuNode;
        // const oppositeWidth = menuNode.getBoundingClientRect().width;
        const widthParam = window.screen.width;
        const heightParam = window.screen.height;
        // const oppositeHeight = menuNode.getBoundingClientRect().height;
        // 调整背景高度
        this.$('.main-menu-background').css('height', window.innerHeight * 0.83);
        // 整体字体大小
        this.fontSize = '2.0vh';
        this.tableHeaderWidth = (widthParam * 0.16).toString();
        this.tableHeaderHeight = (heightParam * 0.09).toString();

        this.moduleWidth = window.innerWidth * 0.161 + 'px';
        this.moduleHeight = window.innerHeight * 0.2 + 'px';
        // 每一行的高度
        this.menuHeight = window.innerHeight * 0.2 + 'px';

        // 模块内的布局
        this.emptyWidth = that.tableHeaderWidth * 0.1;
        this.emptyHeight = parseInt(that.tableHeaderHeight) * 0.22;
        this.iconWidth = that.tableHeaderWidth * 0.4;
        this.iconHeight = that.tableHeaderHeight * 1.4;
        this.nameWidth = that.tableHeaderWidth * 0.4;
      });

      // window.resize 监听窗口尺寸
      window.onresize = () => {
        return (() => {
          // 通过 Vue API 将状态改变推入任务队列
          that.$nextTick(() => {
            // 获取节点
            let menuNode = that.$refs.menuNode;
            // const oppositeWidth = menuNode.getBoundingClientRect().width;
            const widthParam = window.screen.width;
            const heightParam = window.screen.height;
            // const oppositeHeight = menuNode.getBoundingClientRect().height;
            // 调整背景高度
            this.$('.main-menu-background').css('height', window.innerHeight * 0.83);
            // 整体字体大小
            this.fontSize = '2.0vh';
            this.tableHeaderWidth = (widthParam * 0.16).toString();
            this.tableHeaderHeight = (heightParam * 0.09).toString();

            this.moduleWidth = window.innerWidth * 0.161 + 'px';
            this.moduleHeight = window.innerHeight * 0.2 + 'px';
            // 每一行的高度
            this.menuHeight = window.innerHeight * 0.2 + 'px';

            // 模块内的布局
            this.emptyWidth = that.tableHeaderWidth * 0.1;
            this.emptyHeight = parseInt(that.tableHeaderHeight) * 0.22;
            this.iconWidth = that.tableHeaderWidth * 0.4;
            this.iconHeight = that.tableHeaderHeight * 1.4;
            this.nameWidth = that.tableHeaderWidth * 0.4;
          })
        })()
      }
    },

    methods: {
      handleMouseOver ($event) {
        this.$($event.target).css('position', 'relative');
        this.$($event.target).animate({
          // opacity: '0.4'
          top: '-=20px'
        }, 300);
        this.$($event.target).animate({
          top: '+=20px'
        }, 300);
      },

      handleMouseOut ($event) {
        /*this.$($event.target).animate({
          opacity: '1' }, 1000)*/
        this.$($event).stop();
      },

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
    /*min-height: 80vh;*/
    margin: 0 auto;
    padding: 35px 0 0 20px;
    /*justify-content: center;*/
    /*align-items: center;*/
    /*align-content: center;*/
    /*justify-items: center;*/
    background: url("../../assets/img/back/menu-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  /*.main-menu-content {
    margin: 10px 0 0 60px;
    font-size: 30px;
  }*/

  .table-header {
    /*font-size: 22px;*/
  }

  .table-header-title {
    /*width: 40px;*/
  }

  .choose-image {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -9px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
</style>
