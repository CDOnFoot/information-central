
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <!--<div class="borde">设备概览</div>-->
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="device-content">
            <div class="choose-points-show">
              <tr class="choose-points-label">
                <th width="20"></th>
                <th>设备：</th>
                <th>
                  <a-select defaultValue="0" style="width: 150px" @change="handleChange">
                    <a-icon slot="suffixIcon" type="down-circle" theme="twoTone" twoToneColor="#27b5d4"/>
                    <a-select-option value="0">多功能传感器</a-select-option>
                    <a-select-option value="1">ETH智能插座</a-select-option>
                    <a-select-option value="2">门禁执行器</a-select-option>
                    <a-select-option value="3">天窗执行器</a-select-option>
                    <a-select-option value="4">交流执行器</a-select-option>
                  </a-select>
                </th>
              </tr>
            </div>
            <div class="device-content-0"></div>
            <div class="device-content-1">
              <div class="device-point-content">
                <tr class="the-first-row">
                  <td width="60"></td>
                  <td width="12" height="105"></td>
                  <td width="62"></td>
                  <td width="45"></td>
                  <td width="195"></td>
                  <td width="52"></td>
                  <td width="55"></td>
                  <td width="12"></td>
                </tr>
                <tr class="the-second-row">
                  <td></td>
                  <td height="30"></td>
                  <td></td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座1">
                        <template slot="content">
                          <p>是否坏点：{{ statusContainer[69].isBadPoint ? "是" : "否" }}</p>
                          <p>{{ statusContainer[69].pointName }}：{{ statusContainer[69].pointValue }}</p>
                          <p>{{ statusContainer[65].pointName }}：{{ statusContainer[65].pointValue }}</p>
                          <p>{{ statusContainer[66].pointName }}：{{ statusContainer[66].pointValue }}</p>
                          <p>{{ statusContainer[67].pointName }}：{{ statusContainer[67].pointValue }}</p>
                          <p>{{ statusContainer[68].pointName }}：{{ statusContainer[68].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座2">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座3">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="the-third-row">
                  <td></td>
                  <td height="30">
                    <div class="guard-module">
                      <a-popover title="门禁执行器1">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="guard-module">
                      <a-popover title="门禁执行器2">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                </tr>
                <tr class="the-forth-row">
                  <td></td>
                  <td height="30">
                    <div class="trap-door-module">
                      <a-popover title="天窗执行器1">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="multifunction-module">
                      <a-popover title="多功能传感器1">
                        <template slot="content">
                          <p>是否坏点：{{ statusContainer[0].isBadPoint ? "是" : "否" }}</p>
                          <p>{{ statusContainer[0].pointName }}：{{ statusContainer[0].pointValue }}</p>
                          <p>湿度：{{ statusContainer[7].pointValue }}，温度：{{ statusContainer[19].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="multifunction-module">
                      <a-popover title="多功能传感器2">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="multifunction-module">
                      <a-popover title="多功能传感器3">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="trap-door-module">
                      <a-popover title="天窗执行器2">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                </tr>
                <tr class="the-fifth-row">
                  <td></td>
                  <td height="30">
                    <div class="exchange-module">
                      <a-popover title="交流执行器1">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="exchange-module">
                      <a-popover title="交流执行器2">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                </tr>
                <tr class="the-sixth-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座4">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座5">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座6">
                        <template slot="content">
                          <p>状态：正常</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <!--<a-popover title="水浸传感器">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      &lt;!&ndash;<a-button type="primary"></a-button>&ndash;&gt;
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>-->
                  </td>
                  <td></td>
                </tr>
                <tr class="the-seven-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC04",
  data() {
    return {
      statusContainer: []
    };
  },
  props: ["mcStatus", "mcTitle", "mcId", "statusList"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      console.log(this.mcTitle);
      this.mcTitle = val;
    },
    mcId: function(val) {
      this.mcId = val;
    },
    // Is it necessary to use watch attribute.
    statusList: function (val) {
      // console.log(val);
      const that = this;
      // props vars can not change data type, after containing use.
      this.statusList = val;
      // console.log(JSON.parse(that.statusList));
    }
  },

  mounted() {
    // const parentNode = this.$('.device-content-0').parent();
    const height = window.screen.height;
    // console.log(parentNode);
    this.$('.device-content-0').css({
      'height': height * 0.36 + 'px',
      'width': '98%'
    });
    this.$('.device-content-1').css({
      'height': height * 0.36 + 'px',
      'width': '98%'
    });

    // 初始挂载时隐藏所有点
    this.$('.socketETH-module').hide();
    this.$('.guard-module').hide();
    this.$('.trap-door-module').hide();
    // this.$('.multifunction-module').hide();
    this.$('.exchange-module').hide();
  },

  created() {
    const statusList = this.$store.getters.getPointsList;
    this.statusContainer = JSON.parse(statusList);
    console.log('after JSON.parse:');
    console.log(JSON.parse(statusList));
  },

  methods: {
    handleChange(value) {
      const socketETH = this.$('.socketETH-module');
      const guard = this.$('.guard-module');
      const trap_door = this.$('.trap-door-module');
      const multifunction = this.$('.multifunction-module');
      const exchange = this.$('.exchange-module');
      // console.log('selected:');
      // console.log(value);
      switch (value) {
        case "0":
          multifunction.show();
          socketETH.hide();
          guard.hide();
          trap_door.hide();
          exchange.hide();
          break;
        case "1":
          multifunction.hide();
          socketETH.show();
          guard.hide();
          trap_door.hide();
          exchange.hide();
          break;
        case "2":
          multifunction.hide();
          socketETH.hide();
          guard.show();
          trap_door.hide();
          exchange.hide();
          break;
        case "3":
          multifunction.hide();
          socketETH.hide();
          guard.hide();
          trap_door.show();
          exchange.hide();
          break;
        case "4":
          multifunction.hide();
          socketETH.hide();
          guard.hide();
          trap_door.hide();
          exchange.show();
          break;
        default:
          return true;
      }
    }
  }
};
</script>

<style scoped>
.main {
  color: #ffffff;
  padding: 1%;
  position: relative;
  width: 102.3%;
  height: 100.7%;
}
.main-id{
  width: 100%;
  height: 100%;
  position: relative;
}
.none-data{
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
}

.device-content {
  margin-top: 15px;
}

  .device-content-0 {
    background: url("../../../assets/img/main/设备柜.png");
    background-size: 100% 100%;
  }

.device-content-1 {
  background: url("../../../assets/img/main/机房.png");
  background-size: 100% 100%;
}

  .ant-btn {
    border-radius: 20px;
    padding: 0 12px;
  }

.ant-select {
  /*background: #1b4fad;*/
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  outline: 0;
}

/deep/ .ant-select-selection {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px dashed #d9d9d9;
  border-top-width: 1.02px;
  border-radius: 4px;
  outline: none;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
