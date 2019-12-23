
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">设备概览</div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="device-content">
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
                    <a-popover title="ETH插座1">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="ETH插座2">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="ETH插座3">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="the-third-row">
                  <td></td>
                  <td height="30">
                    <a-popover title="门禁执行器1">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <a-popover title="门禁执行器2">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                </tr>
                <tr class="the-forth-row">
                  <td></td>
                  <td height="30">
                    <a-popover title="天窗执行器1">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="多功能传感器1">
                      <template slot="content">
                        <p>{{ statusList.pointName }}：{{ statusList.isAlarm ? "报警" : "未报警" }}</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td></td>
                  <td>
                    <a-popover title="多功能传感器2">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td></td>
                  <td>
                    <a-popover title="多功能传感器3">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="天窗执行器2">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                </tr>
                <tr class="the-fifth-row">
                  <td></td>
                  <td height="30">
                    <a-popover title="交流执行器1">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <a-popover title="交流执行器2">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                </tr>
                <tr class="the-sixth-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <a-popover title="ETH插座4">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="ETH插座5">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="ETH插座6">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
                  </td>
                  <td>
                    <a-popover title="水浸传感器">
                      <template slot="content">
                        <p>状态：正常</p>
                      </template>
                      <!--<a-button type="primary"></a-button>-->
                      <img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">
                    </a-popover>
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
      console.log(val);
      this.statusList = val;
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
    })
  },

  created() {},
  methods: {
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
</style>
