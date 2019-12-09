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
              <a-icon type="inbox"/>
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
        console.log('new:%s,old:%s', val, oldVal)
      },
      tabIndex: function (val, oldVal) {
        console.log('new:%s,old:%s', val, oldVal)
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
    padding: 10px 0 0 30px;
  }

  .control-module {
    display: flex;
  }

  .select-menu {
    flex: 0 8%;
    margin-top: 100px;
    /*background: url("../assets/image/home/u8754.png") no-repeat;*/
  }

  .show-area {
    flex: 0 84%;
    height: 840px;
    margin-left: 60px;

  }

  .router-link {
    height: 660px;
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
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    background-image: linear-gradient(to right, blue, black);
  }

  /*/deep/ .ant-menu.ant-menu-dark .ant-menu-item-selected,*/
  /*.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {*/
  /*background-image: linear-gradient(to right, blue, black);*/
  /*}*/

</style>
