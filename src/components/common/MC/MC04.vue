
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="module-icon">
       <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
     </div>
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
                    <a-select-option value="5">水浸传感器</a-select-option>
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
                  <td width="10"></td>
                  <td width="62"></td>
                  <td width="45"></td>
                  <td width="80"></td>
                  <td width="125"></td>
                  <td width="58"></td>
                  <td width="33"></td>
                  <td width="12"></td>
                </tr>
                <tr class="the-second-row">
                  <td></td>
                  <td height="30"></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座1">
                        <template slot="content">
                          <!--<p>是否坏点：{{ statusContainer[69].isBadPoint ? "是" : "否" }}</p>-->
                          <p>{{ statusContainer[65].pointName }}：{{ statusContainer[65].pointValue }}</p>
                          <p>{{ statusContainer[66].pointName }}：{{ statusContainer[66].pointValue }}</p>
                          <p>{{ statusContainer[67].pointName }}：{{ statusContainer[67].pointValue }}</p>
                          <p>{{ statusContainer[68].pointName }}：{{ statusContainer[68].pointValue }}</p>
                          <p>{{ statusContainer[69].pointName }}：{{ statusContainer[69].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座2">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[86].pointName }}：{{ statusContainer[86].pointValue }}</p>
                          <p>{{ statusContainer[87].pointName }}：{{ statusContainer[87].pointValue }}</p>
                          <p>{{ statusContainer[88].pointName }}：{{ statusContainer[88].pointValue }}</p>
                          <p>{{ statusContainer[89].pointName }}：{{ statusContainer[89].pointValue }}</p>
                          <p>{{ statusContainer[90].pointName }}：{{ statusContainer[90].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座3">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[107].pointName }}：{{ statusContainer[107].pointValue }}</p>
                          <p>{{ statusContainer[108].pointName }}：{{ statusContainer[108].pointValue }}</p>
                          <p>{{ statusContainer[109].pointName }}：{{ statusContainer[109].pointValue }}</p>
                          <p>{{ statusContainer[110].pointName }}：{{ statusContainer[110].pointValue }}</p>
                          <p>{{ statusContainer[111].pointName }}：{{ statusContainer[111].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
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
                          <p>{{ statusContainer[195].pointName }}：{{ statusContainer[195].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="guard-module">
                      <a-popover title="门禁执行器2">
                        <template slot="content">
                          <p>{{ statusContainer[221].pointName }}：{{ statusContainer[221].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
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
                          <p>{{ statusContainer[299].pointName }}：{{ statusContainer[299].pointValue }}</p>
                          <p>{{ statusContainer[314].pointName }}：{{ statusContainer[314].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="multifunction-module">
                      <a-popover title="多功能传感器1">
                        <template slot="content">
                          <!--<p>是否坏点：{{ statusContainer[0].isBadPoint ? "是" : "否" }}</p>-->
                          <p>{{ statusContainer[0].pointName }}：{{ statusContainer[0].pointValue }}</p>
                          <p>湿度：{{ statusContainer[7].pointValue }}，温度：{{ statusContainer[19].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="multifunction-module">
                      <a-popover title="多功能传感器2">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[21].pointName }}：{{ statusContainer[21].pointValue }}</p>
                          <p>湿度：{{ statusContainer[28].pointValue }}，温度：{{ statusContainer[40].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="multifunction-module">
                      <a-popover title="多功能传感器3">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[42].pointName }}：{{ statusContainer[42].pointValue }}</p>
                          <p>湿度：{{ statusContainer[49].pointValue }}，温度：{{ statusContainer[61].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="trap-door-module">
                      <a-popover title="天窗执行器2">
                        <template slot="content">
                          <p>{{ statusContainer[315].pointName }}：{{ statusContainer[315].pointValue }}</p>
                          <p>{{ statusContainer[330].pointName }}：{{ statusContainer[330].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
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
                          <p>{{ statusContainer[241].pointName }}：{{ statusContainer[241].pointValue }}</p>
                          <p>{{ statusContainer[255].pointName }}：{{ statusContainer[255].pointValue }}</p>
                          <p>{{ statusContainer[256].pointName }}：{{ statusContainer[256].pointValue }}</p>
                          <p>{{ statusContainer[257].pointName }}：{{ statusContainer[257].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="exchange-module">
                      <a-popover title="交流执行器2">
                        <template slot="content">
                          <p>{{ statusContainer[270].pointName }}：{{ statusContainer[270].pointValue }}</p>
                          <p>{{ statusContainer[284].pointName }}：{{ statusContainer[284].pointValue }}</p>
                          <p>{{ statusContainer[285].pointName }}：{{ statusContainer[285].pointValue }}</p>
                          <p>{{ statusContainer[286].pointName }}：{{ statusContainer[286].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                </tr>
                <tr class="the-sixth-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座4">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[128].pointName }}：{{ statusContainer[128].pointValue }}</p>
                          <p>{{ statusContainer[129].pointName }}：{{ statusContainer[129].pointValue }}</p>
                          <p>{{ statusContainer[130].pointName }}：{{ statusContainer[130].pointValue }}</p>
                          <p>{{ statusContainer[131].pointName }}：{{ statusContainer[131].pointValue }}</p>
                          <p>{{ statusContainer[132].pointName }}：{{ statusContainer[132].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座5">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[149].pointName }}：{{ statusContainer[149].pointValue }}</p>
                          <p>{{ statusContainer[150].pointName }}：{{ statusContainer[150].pointValue }}</p>
                          <p>{{ statusContainer[151].pointName }}：{{ statusContainer[151].pointValue }}</p>
                          <p>{{ statusContainer[152].pointName }}：{{ statusContainer[152].pointValue }}</p>
                          <p>{{ statusContainer[153].pointName }}：{{ statusContainer[153].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="socketETH-module">
                      <a-popover title="ETH插座6">
                        <template slot="content">
                          <!--<p>状态：正常</p>-->
                          <p>{{ statusContainer[170].pointName }}：{{ statusContainer[170].pointValue }}</p>
                          <p>{{ statusContainer[171].pointName }}：{{ statusContainer[171].pointValue }}</p>
                          <p>{{ statusContainer[172].pointName }}：{{ statusContainer[172].pointValue }}</p>
                          <p>{{ statusContainer[173].pointName }}：{{ statusContainer[173].pointValue }}</p>
                          <p>{{ statusContainer[174].pointName }}：{{ statusContainer[174].pointValue }}</p>
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
                  </td>
                  <td>
                    <div class="water-check">
                      <a-popover title="水浸传感器">
                        <template slot="content">
                          <!--<p>{{ statusContainer[353].pointName }}：{{ statusContainer[353].pointValue }}</p>-->
                        </template>
                        <!--<a-button type="primary"></a-button>-->
                        <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                        <div class='pin'></div>
                        <div class='pulse'></div>
                      </a-popover>
                    </div>
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
      statusContainer: [],
      timeOut: ''
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
    console.log("component MC mounted.");
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
    this.$('.water-check').hide();

    let time = 0;
    this.timeOut = setInterval(() => {
      this.handleChange(time.toString());
      if (time <= 5) time++;
      if (time > 5) time = 0;
    }, 8000);

    // const statusList = this.$store.getters.getPointsList;
    // this.statusContainer = JSON.parse(statusList);
    // console.log('after JSON.parse:');
    // console.log(JSON.parse(statusList));
  },

  created() {
    const statusList = this.$store.getters.getPointsList;
    this.statusContainer = JSON.parse(statusList);
  },

  destroyed () {
    clearInterval(this.timeOut)
  },

  methods: {
    handleChange(value) {
      const socketETH = this.$('.socketETH-module');
      const guard = this.$('.guard-module');
      const trap_door = this.$('.trap-door-module');
      const multifunction = this.$('.multifunction-module');
      const exchange = this.$('.exchange-module');
      const waterCheck = this.$('.water-check');
      // console.log('selected:');
      // console.log(value);
      switch (value) {
        case "0":
          multifunction.show();
          socketETH.hide();
          guard.hide();
          trap_door.hide();
          exchange.hide();
          waterCheck.hide();
          break;
        case "1":
          multifunction.hide();
          socketETH.show();
          guard.hide();
          trap_door.hide();
          exchange.hide();
          waterCheck.hide();
          break;
        case "2":
          multifunction.hide();
          socketETH.hide();
          guard.show();
          trap_door.hide();
          exchange.hide();
          waterCheck.hide();
          break;
        case "3":
          multifunction.hide();
          socketETH.hide();
          guard.hide();
          trap_door.show();
          exchange.hide();
          waterCheck.hide();
          break;
        case "4":
          multifunction.hide();
          socketETH.hide();
          guard.hide();
          trap_door.hide();
          exchange.show();
          waterCheck.hide();
          break;
        case "5":
          multifunction.hide();
          socketETH.hide();
          guard.hide();
          trap_door.hide();
          exchange.hide();
          waterCheck.show();
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
/deep/ .borde {
  font-weight: 700;
  color: #ffffff;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 20px;
  left: 33px;
  font-size: 16px;
  padding-left: 27px;
  width: 60%;
}
.main-id{
  width: 100%;
  height: 100%;
  position: relative;
}
.none-data{
  font-size: 14px;
  text-align: center;
  padding-top: 50px;
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

  /*
  动态标记点样式
  */
.pin {
  width: 20px;
  height: 20px;
  border-radius: 50% 50% 50% 0;
  background: #27b5d4;
  /*position: absolute;*/
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  /*left: 50%;
  top: 50%;*/
  /*margin: -20px 0 0 -20px;*/
  -webkit-animation-name: bounce;
  -moz-animation-name: bounce;
  -o-animation-name: bounce;
  -ms-animation-name: bounce;
  animation-name: bounce;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  -ms-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  -o-animation-duration: 1s;
  -ms-animation-duration: 1s;
  animation-duration: 1s;
}
.pin:after {
  content: '';
  width: 10px;
  height: 10px;
  margin: 5px 0 0 -5px;
  background: #2f2f2f;
  position: absolute;
  border-radius: 50%;
}
.pulse {
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
  height: 12px;
  width: 12px;
  position: absolute;
  /*left: 50%;
  top: 50%;*/
  /*margin: 11px 0px 0px -12px;*/
  -webkit-transform: rotateX(55deg);
  -moz-transform: rotateX(55deg);
  -o-transform: rotateX(55deg);
  -ms-transform: rotateX(55deg);
  transform: rotateX(55deg);
  /*z-index: -2;*/
}
.pulse:after {
  content: "";
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: absolute;
  margin: -13px 0 0 -15px;
  -webkit-animation: pulsate 1s ease-out;
  -moz-animation: pulsate 1s ease-out;
  -o-animation: pulsate 1s ease-out;
  -ms-animation: pulsate 1s ease-out;
  animation: pulsate 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-box-shadow: 0 0 1px 2px #27b5d4;
  box-shadow: 0 0 1px 2px #27b5d4;
  -webkit-animation-delay: 1.1s;
  -moz-animation-delay: 1.1s;
  -o-animation-delay: 1.1s;
  -ms-animation-delay: 1.1s;
  animation-delay: 1.1s;
}
@-moz-keyframes pulsate {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    -moz-transform: scale(0.1, 0.1);
    -o-transform: scale(0.1, 0.1);
    -ms-transform: scale(0.1, 0.1);
    transform: scale(0.1, 0.1);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-webkit-keyframes pulsate {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    -moz-transform: scale(0.1, 0.1);
    -o-transform: scale(0.1, 0.1);
    -ms-transform: scale(0.1, 0.1);
    transform: scale(0.1, 0.1);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-o-keyframes pulsate {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    -moz-transform: scale(0.1, 0.1);
    -o-transform: scale(0.1, 0.1);
    -ms-transform: scale(0.1, 0.1);
    transform: scale(0.1, 0.1);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@keyframes pulsate {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    -moz-transform: scale(0.1, 0.1);
    -o-transform: scale(0.1, 0.1);
    -ms-transform: scale(0.1, 0.1);
    transform: scale(0.1, 0.1);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
  50% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
  }
}
@-moz-keyframes bounce {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -webkit-transform: translateY(-2000px) rotate(-45deg);
    -moz-transform: translateY(-2000px) rotate(-45deg);
    -o-transform: translateY(-2000px) rotate(-45deg);
    -ms-transform: translateY(-2000px) rotate(-45deg);
    transform: translateY(-2000px) rotate(-45deg);
  }
  60% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(30px) rotate(-45deg);
    -moz-transform: translateY(30px) rotate(-45deg);
    -o-transform: translateY(30px) rotate(-45deg);
    -ms-transform: translateY(30px) rotate(-45deg);
    transform: translateY(30px) rotate(-45deg);
  }
  80% {
    -webkit-transform: translateY(-10px) rotate(-45deg);
    -moz-transform: translateY(-10px) rotate(-45deg);
    -o-transform: translateY(-10px) rotate(-45deg);
    -ms-transform: translateY(-10px) rotate(-45deg);
    transform: translateY(-10px) rotate(-45deg);
  }
  100% {
    -webkit-transform: translateY(0) rotate(-45deg);
    -moz-transform: translateY(0) rotate(-45deg);
    -o-transform: translateY(0) rotate(-45deg);
    -ms-transform: translateY(0) rotate(-45deg);
    transform: translateY(0) rotate(-45deg);
  }
}
@-webkit-keyframes bounce {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -webkit-transform: translateY(-2000px) rotate(-45deg);
    -moz-transform: translateY(-2000px) rotate(-45deg);
    -o-transform: translateY(-2000px) rotate(-45deg);
    -ms-transform: translateY(-2000px) rotate(-45deg);
    transform: translateY(-2000px) rotate(-45deg);
  }
  60% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(30px) rotate(-45deg);
    -moz-transform: translateY(30px) rotate(-45deg);
    -o-transform: translateY(30px) rotate(-45deg);
    -ms-transform: translateY(30px) rotate(-45deg);
    transform: translateY(30px) rotate(-45deg);
  }
  80% {
    -webkit-transform: translateY(-10px) rotate(-45deg);
    -moz-transform: translateY(-10px) rotate(-45deg);
    -o-transform: translateY(-10px) rotate(-45deg);
    -ms-transform: translateY(-10px) rotate(-45deg);
    transform: translateY(-10px) rotate(-45deg);
  }
  100% {
    -webkit-transform: translateY(0) rotate(-45deg);
    -moz-transform: translateY(0) rotate(-45deg);
    -o-transform: translateY(0) rotate(-45deg);
    -ms-transform: translateY(0) rotate(-45deg);
    transform: translateY(0) rotate(-45deg);
  }
}
@-o-keyframes bounce {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -webkit-transform: translateY(-2000px) rotate(-45deg);
    -moz-transform: translateY(-2000px) rotate(-45deg);
    -o-transform: translateY(-2000px) rotate(-45deg);
    -ms-transform: translateY(-2000px) rotate(-45deg);
    transform: translateY(-2000px) rotate(-45deg);
  }
  60% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(30px) rotate(-45deg);
    -moz-transform: translateY(30px) rotate(-45deg);
    -o-transform: translateY(30px) rotate(-45deg);
    -ms-transform: translateY(30px) rotate(-45deg);
    transform: translateY(30px) rotate(-45deg);
  }
  80% {
    -webkit-transform: translateY(-10px) rotate(-45deg);
    -moz-transform: translateY(-10px) rotate(-45deg);
    -o-transform: translateY(-10px) rotate(-45deg);
    -ms-transform: translateY(-10px) rotate(-45deg);
    transform: translateY(-10px) rotate(-45deg);
  }
  100% {
    -webkit-transform: translateY(0) rotate(-45deg);
    -moz-transform: translateY(0) rotate(-45deg);
    -o-transform: translateY(0) rotate(-45deg);
    -ms-transform: translateY(0) rotate(-45deg);
    transform: translateY(0) rotate(-45deg);
  }
}
@keyframes bounce {
  0% {
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -webkit-transform: translateY(-2000px) rotate(-45deg);
    -moz-transform: translateY(-2000px) rotate(-45deg);
    -o-transform: translateY(-2000px) rotate(-45deg);
    -ms-transform: translateY(-2000px) rotate(-45deg);
    transform: translateY(-2000px) rotate(-45deg);
  }
  60% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(30px) rotate(-45deg);
    -moz-transform: translateY(30px) rotate(-45deg);
    -o-transform: translateY(30px) rotate(-45deg);
    -ms-transform: translateY(30px) rotate(-45deg);
    transform: translateY(30px) rotate(-45deg);
  }
  80% {
    -webkit-transform: translateY(-10px) rotate(-45deg);
    -moz-transform: translateY(-10px) rotate(-45deg);
    -o-transform: translateY(-10px) rotate(-45deg);
    -ms-transform: translateY(-10px) rotate(-45deg);
    transform: translateY(-10px) rotate(-45deg);
  }
  100% {
    -webkit-transform: translateY(0) rotate(-45deg);
    -moz-transform: translateY(0) rotate(-45deg);
    -o-transform: translateY(0) rotate(-45deg);
    -ms-transform: translateY(0) rotate(-45deg);
    transform: translateY(0) rotate(-45deg);
  }
}
</style>
