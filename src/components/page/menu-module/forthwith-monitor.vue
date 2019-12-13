<template>
  <div class="forthwith-monitor">
    <div class="control-module">
      <div class="select-menu">
        <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button> -->

        <!--<a-menu :defaultSelectedKeys="[2]" mode="inline" theme="dark" :inlineCollapsed="collapsed">-->
        <!--<template v-for="item in menu">-->
        <!--<a-menu-item :key="item.Code" @click="changeMenu(item)">-->
        <!--&lt;!&ndash;<a-icon type="inbox"/>&ndash;&gt;-->
        <!--<span>{{item.DisplayName}}</span>-->
        <!--</a-menu-item>-->
        <!--</template>-->
        <!--</a-menu>-->


        <a-menu
          :defaultSelectedKeys="[menu[0].Children[0].EntityId]"
          :defaultOpenKeys="[menu[0].Code]"
          mode="inline"
          theme="dark"
          :inlineCollapsed="collapsed"
        >
          <template v-for="item in menu">
            <a-sub-menu key="{item.Code}">
              <span slot="title"><a-icon type="mail"/><span>{{item.DisplayName}}</span></span>
              <a-menu-item v-for="item2 in item.Children" key="{item2.EntityId}">{{item2.DisplayName}}</a-menu-item>

            </a-sub-menu>
          </template>

        </a-menu>

      </div>
      <div class="show-area">
        <div class="select-taps">
          <a-tabs @change="changeTab" type="card">
            <a-tab-pane tab="基本信息" key="1"></a-tab-pane>
            <a-tab-pane tab="关键指标" key="2"></a-tab-pane>
            <a-tab-pane tab="概况" key="3"></a-tab-pane>
            <a-button slot="tabBarExtraContent">
              <a-badge dot :count="10">
                <a-icon type="notification"/>
              </a-badge>
            </a-button>
          </a-tabs>
        </div>
        <div class="router-link">
          <div class="router-link-bg"></div>
          <router-view :devType="devType"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forthwith-monitor",
    data() {
      return {
        data: '',
        menu: '',
        devType: '',
        collapsed: false,
      }
    },
    watch: {
      devType: function (val) {
        // console.log(val);
      },
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
      this.initMenu();
    },
    methods: {
      unique(objArr) {
        // let res = [];
        // let obj = {};
        // for (let i = 0; i < objArr.length; i++) {
        //   if (!obj[objArr[i].Code]) {
        //     res.push(objArr[i]);
        //     obj[objArr[i].Code] = true;
        //   }
        // }
        // return res;
        let res = [];
        let obj = {};
        for (let i = 0; i < objArr.length; i++) {
          if (!obj[objArr[i].Code]) {
            let newObj = {
              Code: objArr[i].Code,
              DisplayName: objArr[i].Code,
              Children: [],
            };
            newObj.Children.push(objArr[i]);
            res.push(newObj);
            obj[objArr[i].Code] = true;
          } else {
            res.forEach(function (item) {
              if (item.Code == objArr[i].Code) {
                item.Children.push(objArr[i]);
              }
            });
          }
        }
        return res;

      },
      initMenu() {
        this.$http.get(this.$api.monitorEquipments).then(res => {
          if (res.data.value) {
            this.data = res.data.value;
            this.menu = this.unique(res.data.value);
            console.log(this.menu);

            this.devType = this.menu[0];
            this.changeTab(1);


          }
        });
      },
      changeMenu(key) {
        this.devType = key;
      },
      changeTab(key) {
        if (key == 1) {
          this.$router.replace("/home/forthwithMonitor/info");
        } else if (key == 2) {
          this.$router.replace("/home/forthwithMonitor/kpi");
        } else {
          this.$router.replace("/home/forthwithMonitor/view");
        }
      },
      toggleCollapsed() {
        let self = this;
        self.collapsed = !self.collapsed;
      },
    }
  };

</script>

<style scoped>
  .forthwith-monitor {
    width: 100%;
    height: 100%;
    padding: 0;
    padding-top: 10px;
  }

  .control-module {
    /*display: flex;*/
    width: 100%;
    height: 100%;
  }

  .select-menu {
    float: left;
    width: 10%;
    height: 100%;
    margin-top: 60px;
    /*background: url("../assets/image/home/u8754.png") no-repeat;*/
  }

  .show-area {
    float: left;
    width: 90%;
    height: 100%;
    /*height: 840px;*/
    /*margin-left: 10px;*/
  }

  .router-link {
    width: 100%;
    height: 80%;
    position: relative;
    /* opacity:.1 */
    /* box-shadow: 0 0 40px rgba(0, 204, 255, 1) inset; */
  }

  .router-link-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #001529;
    opacity: .4;
    /* box-shadow: 0 0 40px rgba(0, 204, 255, 1) inset; */
  }

  /deep/ .ant-tabs-bar {
    border-bottom: 1px solid #0259ad;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    width: 120px;
    padding: 0 26px;
    text-align: center;
    background-color: #001529;
    color: #ffffff;
    border-color: #0259ad;
  }

  /deep/ .ant-layout {
    border-bottom-color: #0259ad !important;
  }

  /deep/ .ant-btn {
    color: #ffffff;
    height: 30px;
    background-color: transparent;
    border-radius: 200px;
  }

  /deep/ .ant-btn:hover, .ant-btn:focus {
    color: #40a9ff;
    border-color: #40a9ff;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    background-image: linear-gradient(to right, blue, black);
  }

  /*/deep/ .ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {*/
  /*width: 110px;*/
  /*outline: 0;*/
  /*padding: 2px 12px;*/
  /*display: block;*/
  /*color: #ffffff;*/
  /*font-weight: bold;*/
  /*text-shadow: 1px 1px #2250ca;*/
  /*border: 1px solid #1c252b;*/
  /*border-radius: 3px;*/
  /*-moz-border-radius: 3px;*/
  /*-webkit-border-radius: 3px;*/
  /*background: #232B30; !* old browsers *!*/
  /*background: -moz-linear-gradient(top, #3D4850 3%, #313d45 4%, #232B30 100%); !* firefox *!*/
  /*background: -webkit-gradient(linear, left top, left bottom, color-stop(3%, #3D4850), color-stop(4%, #313d45), color-stop(100%, #232B30)); !* webkit *!*/
  /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#3D4850', endColorstr='#232B30', GradientType=0); !* ie *!*/
  /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); !* CSS3 *!*/
  /*-moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); !* Firefox *!*/
  /*-webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); !* Safari, Chrome *!*/
  /*}*/

  /*/deep/ .ant-menu-item {*/
  /*height: 40px;*/
  /*line-height: 40px;*/
  /*transition: .1s linear;*/
  /*}*/

  /*/deep/ .ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child) {*/
  /*margin-bottom: -3px;*/
  /*border-radius: 5px;*/
  /*}*/

  /*/deep/ .ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {*/
  /*margin-bottom: -3px;*/
  /*border-radius: 5px;*/
  /*}*/

  /*/deep/ .ant-menu.ant-menu-dark .ant-menu-item-selected,*/
  /*.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {*/
  /*width: 125px;*/
  /*height: 50px;*/
  /*line-height: 50px;*/
  /*}*/

  /*/deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub {*/
  /*color: rgba(255, 255, 255, 0.65);*/
  /*background: transparent;*/
  /*}*/

</style>
