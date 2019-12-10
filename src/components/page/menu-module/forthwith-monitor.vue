<template>
  <div class="forthwith-monitor">
    <div class="control-module">
      <div class="select-menu">
        <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button> -->
        <a-menu :defaultSelectedKeys="[2]" mode="inline" theme="dark" :inlineCollapsed="collapsed">
          <template v-for="item in menuList">
            <a-menu-item :key="item.EntityId" @click="changeMenu(item)">
              <!--<a-icon type="inbox"/>-->
              <span>{{item.DisplayName}}</span>
            </a-menu-item>
          </template>
        </a-menu>
      </div>
      <div class="show-area">
        <div class="select-taps">
          <a-tabs @change="changeTab" type="card">
            <a-tab-pane tab="基本信息" key="1"></a-tab-pane>
            <a-tab-pane tab="关键指标" key="2"></a-tab-pane>
            <a-tab-pane tab="概况" key="3"></a-tab-pane>
          </a-tabs>
        </div>
        <div class="router-link">
          <router-view/>
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
        collapsed: false,
        menuList: [],
        menuIndex: 0,
        tabIndex: 0,

      };
    },

    beforeCreate() {
    },

    created() {
      this.initMenu();

    },

    beforeMount() {
    },

    mounted() {
    },

    watch: {
      menuIndex: function (val, oldVal) {
        console.log('menuIndex - new:%s,old:%s', val, oldVal)
      },
      tabIndex: function (val, oldVal) {
        console.log('tabIndex - new:%s,old:%s', val, oldVal)
      },
    },

    methods: {
      initMenu() {
        let self = this;
        self.$http.get(self.$api.monitorEquipments).then(res => {
          if (res.data.value) {
            self.menuList = res.data.value;
            console.log(self.menuList);
            self.menuIndex = self.menuList[0].EntityId;
            self.changeTab(1);
          }
        });
      },

      changeMenu(key) {
        let self = this;
        self.menuIndex = key.EntityId;
      },

      changeTab(key) {
        let self = this;
        self.tabIndex = key;

        if (key == 1) {
          self.$router.replace("/home/forthwithMonitor/info");
        } else if (key == 2) {
          self.$router.replace("/home/forthwithMonitor/kpi");
        } else {
          self.$router.replace("/home/forthwithMonitor/view");
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
    padding: 0;
    padding-top: 10px;
  }

  .control-module {
    display: flex;
  }

  .select-menu {
    flex: 0 10%;
    margin-top: 80px;
    /*background: url("../assets/image/home/u8754.png") no-repeat;*/
  }

  .show-area {
    flex: 0 84%;
    height: 840px;
    margin-left: 60px;
  }

  .router-link {
    height: 720px;
    /* opacity:.1 */
    /* box-shadow: 0 0 40px rgba(0, 204, 255, 1) inset; */
  }

  /deep/ .ant-tabs-bar {
    /* border-bot tom: 1px solid red; */
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    padding: 0 26px;
    background-color: #001529;
    color: #ffffff;
    border-color: #0259ad;
  }

  /deep/ .ant-layout {
    border-bottom-color: #0259ad !important;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    background-image: linear-gradient(to right, blue, black);
  }

  .ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
    width: 140px;
  }

  /deep/ .ant-menu-item {

    height: 50px;
    line-height: 50px;
    background-image: linear-gradient(to right, blue, black);
  }

  /deep/ .ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 2px;
    border-radius: 5px;
  }

  /deep/ .ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
    margin-bottom: 2px;
    border-radius: 5px;
  }

  /deep/ .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {

    width: 160px;
    height: 60px;
    line-height: 60px;
  }

  /deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    color: rgba(255, 255, 255, 0.65);
    background: transparent;
  }
</style>
