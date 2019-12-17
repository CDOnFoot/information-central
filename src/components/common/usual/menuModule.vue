<template>
    <div class="menu-module"
         @click="throwTheRouter"
         :style="{ width: moduleWidth, height: moduleHeight }">
      <div class="menu-module-content">
        <tr class="empty-header" :height="emptyHeight">
          <th :width="emptyWidth"></th>
          <th></th>
          <th></th>
        </tr>
        <!--<tr class="empty-header">
          <th></th>
          <th></th>
          <th></th>
        </tr>-->
        <tr class="menu-module-name">
          <td class="empty-element"></td>
          <td class="table-image" @mouseover="handleMouseOver($event)" @mouseout="handleMouseOut($event)">
            <img :src="require('../../../assets/img/menu-icon/' + moduleIcon + '.png')"
                 alt="" :width="moduleIconWidth" :height="moduleIconHeight">
          </td>
          <td :width="moduleNameWidth">
            <!--<a-icon :type="moduleIcon" />-->{{ moduleName }}
          </td>
        </tr>
      </div>
    </div>
</template>

<script>
    export default {
        // name: "menuModule",

      data () {
          return {
            // moduleName: '',
            // moduleIcon: ''
          }
      },

      created () {
          // console.log(' ----- state has already go.')
          const validName = this.moduleName;
          // let iconContainer = this.moduleIcon;
          /*switch (this.moduleName) {
            case '首页':
              this.moduleIcon = "../../../assets/img/back/首页.png";
              break;
            case '用户管理':
              this.moduleIcon = "../../../assets/img/back/用户管理.png";
              break;
            case '实时监控':
              this.moduleIcon = "../../../assets/img/back/实时监控.png";
              break;
            case '当前报警':
              this.moduleIcon = "../../../assets/img/back/当前报警.png";
              break;
            case '历史报警':
              this.moduleIcon = "../../../assets/img/back/历史报警.png";
              break;
            case '自定义报警':
              this.moduleIcon = "../../../assets/img/back/自定义报警.png";
              break
            case '门禁卡管理':
              this.moduleIcon = "../../../assets/img/back/门禁卡管理.png";
              break
            case '门禁用户管理':
              this.moduleIcon = "../../../assets/img/back/门禁用户管理.png";
              break
            case '刷卡记录日志管理':
              this.moduleIcon = "../../../assets/img/back/刷卡记录日志管理.png";
              break
            case '设置':
              this.moduleIcon = "../../../assets/img/back/设置.png";
              break
            case '实时视频':
              this.moduleIcon = "../../../assets/img/back/实时视频.png";
              break
            case '抓拍浏览':
              this.moduleIcon = "../../../assets/img/back/抓拍浏览.png";
              break
            case '视频回放':
              this.moduleIcon = "../../../assets/img/back/视频回放.png";
              break
            default:
          }*/
      },

      mounted () {},

      // 父组件传递的参数
      props: [ "moduleWidth", "moduleHeight", "moduleName",
        "moduleIcon", "moduleNameWidth", "moduleIconWidth",
        "emptyWidth", "emptyHeight", "moduleIconHeight" ],

      methods: {
        throwTheRouter () {
          // console.log('there is a clicked');
          this.$emit('checkTheRouter', this.moduleName);
        },

        /**
         * @function 鼠标移入移出都将节点传到父组件
         * @param $event
         */
        handleMouseOver ($event) {
          this.$emit('handleMouseOver', $event);
        },

        handleMouseOut ($event) {
          this.$emit('handleMouseOut', $event);
        }
      }
    }
</script>

<style scoped>
.menu-module {
  background: url("../../../assets/img/back/module-bg.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

  .menu-module-name {
    text-align: center;
  }

  /*.table-image img {
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
  }*/
</style>
