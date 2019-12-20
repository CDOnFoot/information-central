<template>
  <div class="forthwith-monitor">
    <div class="control-module">
      <div class="select-menu">

        <!--<a-menu-->
        <!--:defaultSelectedKeys="[menu[0].SubArr[0].EntityId]"-->
        <!--:defaultOpenKeys="[menu[0].Code]"-->
        <!--mode="inline"-->
        <!--theme="dark"-->
        <!--:inlineCollapsed="collapsed"-->
        <!--:openKeys="openKeys"-->
        <!--@openChange="onOpenChange"-->
        <!--&gt;-->
        <!--<template v-for="item in menu">-->
        <!--<a-sub-menu :key="item.Code">-->
        <!--<span slot="title">-->
        <!--<a-icon type="profile"/>-->
        <!--<span>{{item.DisplayName}}</span>-->
        <!--</span>-->
        <!--<a-menu-item v-for="item2 in item.SubArr" :key="item2.EntityId" @click="changeMenu(item2)">-->
        <!--{{item2.DisplayName}}-->
        <!--</a-menu-item>-->
        <!--</a-sub-menu>-->
        <!--</template>-->
        <!--</a-menu>-->

        <a-menu
          mode="inline"
          theme="dark"
          :defaultSelectedKeys="[menu[0].Code]"
        >
          <template v-for="item in menu">
            <a-menu-item :key="item.Code" @click="changeMenu(item)">
              <!--<a-icon type="pie-chart"/>-->
              <span>{{item.DisplayName}}</span>
            </a-menu-item>
          </template>
        </a-menu>

      </div>
      <div class="show-area">
        <div class="select-taps">

          <!--<a-tabs @change="changeTab" type="card">-->
          <!--<a-tab-pane tab="基本信息" key="1"></a-tab-pane>-->
          <!--<a-tab-pane tab="关键指标" key="2"></a-tab-pane>-->
          <!--<a-tab-pane tab="概况" key="3"></a-tab-pane>-->
          <!--<a-button slot="tabBarExtraContent">-->
          <!--<a-badge dot :count="10">-->
          <!--<a-icon type="notification"/>-->
          <!--</a-badge>-->
          <!--</a-button>-->
          <!--</a-tabs>-->

          <template>
            <a-tabs @change="changeTab" type="card">
              <template v-for="item in eqType.Equipments">
                <a-tab-pane :tab="item.Description" :key="item.Name"></a-tab-pane>
              </template>
              <a slot="tabBarExtraContent" style="margin-right: 20px">
                <a-badge dot :count="popWarning.length">
                  <a-popover title="告警提示" trigger="click" placement="leftBottom">
                    <template slot="content">
                      <p v-for="item in popWarning">
                        <span>{{item.DisplayName}}</span>
                        ：
                        <span style="">{{item.Desc}}</span>
                      </p>
                    </template>
                    <a-button type="primary">
                      <a-icon type="notification"/>
                    </a-button>
                  </a-popover>
                </a-badge>
              </a>
            </a-tabs>
          </template>

        </div>
        <div class="select-container">
          <a-carousel arrows>
            <div
              slot="prevArrow"
              slot-scope="props"
              class="custom-slick-arrow"
              style="left: 10px; zIndex: 1"
            >
              <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle"/>
            </div>
            <div>
              <!--基本信息-->
              <div class="select-container-bg"></div>
              <div class="select-container-module" id="basicInfo">
                <div class="boxes">
                  <div class="equipment">
                    <img :src="imgUrl" alt="">
                  </div>
                </div>
                <div class="boxes">
                  <div class="pointInfo">
                    <a-table
                      :columns="columns"
                      :dataSource="dataSource"
                      :showHeader="false"
                      :pagination="false"
                      :loading="loading"
                    >
                    </a-table>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!--关键指标-->
              <div class="select-container-bg"></div>
              <div class="select-container-module" id="KPI">
                <div class="boxes">
                  <img class="boxes-bg" src="../../../assets/img/main-border-b.png" alt="">
                  <div class="boxes-cont">
                    <div class="borde">能量流图</div>
                    <div class="pointStatus-ti">
                      <!--{{pointStatus_ti}}-->
                      11111111111111111111
                    </div>
                    <div class="energy">
                      <img src="../../../assets/img/monitor/dev2.png" alt="">
                    </div>
                  </div>
                </div>
                <div class="boxes">
                  <img class="boxes-bg" src="../../../assets/img/main-border-b.png" alt="">
                  <div class="boxes-cont">
                    <div class="borde">通信状态</div>
                    <div class="pointStatus-ti">
                      <!--{{pointStatus_ti}}-->
                      {{commStatus.Time}}

                    </div>
                    <div class="electricity">
                      <div class="status">
                        {{commStatus.Value}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="boxes" style="width: 100%;">
                  <img class="boxes-bg" src="../../../assets/img/main-border-b.png" alt=""
                       style="width: 95%; left: 2.5%">
                  <div class="boxes-cont">
                    <div class="borde">电池后备时间</div>
                    <div class="pointStatus-ti">
                      <!--{{pointStatus_ti}}-->
                      11111111111111111111

                    </div>
                    <div class="battery">
                      <a-table
                        :columns="columns2"
                        :dataSource="dataSource2"
                        :showHeader="true"
                        :pagination="false"
                        :loading="loading"
                      >
                      </a-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const columns = [
    {
      title: "名称",
      dataIndex: "DisplayName",
      align: "center",
      width: "50%"
    },
    {
      title: "描述",
      dataIndex: "Desc",
      align: "center",
      width: "50%"
    },
  ];

  const columns2 = [
    {
      title: 'DisplayName',
      dataIndex: 'DisplayName',
      align: 'center',
      width: '25%'
    },
    {
      title: 'TechnicalAddress',
      dataIndex: 'TechnicalAddress',
      align: 'center',
      width: '25%'
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      align: 'center',
      width: '25%'
    },
    {
      title: 'TPType',
      dataIndex: 'TPType',
      align: 'center',
      width: '50%'
    },
  ];

  export default {
    name: "forthwith-monitor",
    data() {
      return {
        data: [],
        menu: [],
        eqType: "",
        eqName: "",
        pointInfo: [],
        pointVal: [],
        columns,
        columns2,
        dataSource: [],
        dataSource2: [],
        popWarning: [],

        imgUrl: require("../../../assets/img/monitor/dev5.png"),

        commStatus: {
          Value: "",
          Time: ""
        },

        loading: false,
        collapsed: false,
        rootSubmenuKeys: [],
        openKeys: [],
      }
    },
    mounted() {
      this.init();
    },
    methods: {

      popConfirm(e) {
        console.log(e);

      },

      popCancel(e) {
        console.log(e);

      },

      init() {
        this.getEquipments().then((res) => {
          this.data = res;
          this.menu = this.unique(res);
          this.eqType = this.menu[0];
          this.changeMenu(this.eqType);
        });
      },

      unique(objArr) {
        let res = [];
        let obj = {};
        for (let i = 0; i < objArr.length; i++) {
          if (!obj[objArr[i].Code]) {
            let newObj = {
              Code: objArr[i].Code,
              DisplayName: objArr[i].Code,
              Equipments: [],
            };
            newObj.Equipments.push(objArr[i]);
            res.push(newObj);
            this.rootSubmenuKeys.push(objArr[i].Code);
            obj[objArr[i].Code] = true;
          } else {
            res.forEach(function (item) {
              if (item.Code == objArr[i].Code) {
                item.Equipments.push(objArr[i]);
              }
            });
          }
        }
        this.openKeys.push(this.rootSubmenuKeys[0]);
        return res;
      },

      changeMenu(key) {
        this.eqType = key;
        this.eqName = this.eqType.Equipments[0].Name;
        this.changeTab(this.eqName);
      },

      changeTab(key) {
        this.eqName = key;
        this.initPoint();
      },

      initPoint() {
        this.getPointInformations(this.eqName).then((res) => {
          console.log(res);

          if (res.length == 0) {
            this.$message.error("暂无数据");
          }

          let arr = [];
          this.pointInfo = res;
          this.pointInfo.forEach(function (item) {
            arr.push({
              "Id": item.EntityId
            });
          });
          this.getPointValues(arr).then((res) => {
            console.log(res);
            this.pointVal = res;

            this.initPage();

          });
        });
      },

      initPage() {
        let arr = [];
        this.popWarning = [];
        for (let i = 0; i < this.pointInfo.length; i++) {
          if (this.pointInfo[i]) {
            let displayName = this.pointInfo[i].DisplayName;
            if (displayName.indexOf("只读") == -1 && displayName.indexOf("读构建") == -1) {
              let desc = '';
              if (this.pointVal[i]) {
                // 是否坏点
                if (this.pointVal[i].st.ib) {
                  desc = "坏点";
                } else {
                  // 取点值
                  let t = this.pointVal[i].t;
                  if (t == "String") {
                    desc = this.pointVal[i].s;
                  } else if (t == "Long") {
                    desc = this.pointVal[i].l;
                  }
                  // 点值描述
                  if (this.pointInfo[i].MeaningOfValue != '') {
                    let obj = JSON.parse(this.pointInfo[i].MeaningOfValue);
                    // console.log(obj);
                    Object.keys(obj).forEach(function (key) {
                      if (key == desc) {
                        desc = obj[key]
                      }
                    });
                  }
                  // 点值单位
                  if (this.pointInfo[i].UnitOfMeasurement != '') {
                    desc += this.pointInfo[i].UnitOfMeasurement;
                  }
                  // 是否报警
                  if (this.pointVal[i].st.ia) {
                    this.popWarning.push({
                      DisplayName: displayName,
                      Desc: desc,
                    });
                  }

                  if (displayName == "通信状态") {
                    this.commStatus.Value = desc;
                    this.commStatus.Time = this.$common.timestampToTime(this.pointVal[i].ti);
                  }

                }
              }
              arr.push({
                DisplayName: displayName,
                Desc: desc,
              });
            }
          }

        }

        console.log(this.popWarning)
        this.dataSource = arr;
      },

      toggleCollapsed() {
        this.collapsed = !this.collapsed;
      },

      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },

      getEquipments() {
        return this.$http.get(this.$api.monitorEquipments).then(res => {
          if (res.data.value) {
            return res.data.value;
          }
        });
      },

      getPointInformations(param) {
        let url = "/config/pointinformations?&$filter=indexof(Name,\'" + param + "\') ge 0";
        return this.$http.get(url).then(res => {
          if (res.data.value) {
            return res.data.value;
          }
        });
      },

      getPointValues(param) {
        let url = '/point/api/getpoint/getpointvalues';
        return this.$http.post(url, param).then(res => {
          if (res.data) {
            return res.data;
          }
        });
      },

      getPointValue(param) {
        let url = '/point/api/getpoint/getpointvalue';
        return this.$http.post(url, param).then(res => {
          if (res.data) {
            return res.data;
          }
        });
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
    width: 100%;
    height: 100%;
  }

  .select-menu {
    float: left;
    width: 8%;
    height: 80%;
    padding-top: 80px;
  }

  .show-area {
    float: left;
    width: 92%;
    height: 80%;
    padding-left: 2%;
  }

  .select-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .select-container-module {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .select-container-bg {
    width: 100%;
    height: 100%;
    background-color: #001529;
    opacity: .4;
    position: absolute;
  }

  .boxes {
    float: left;
    width: 50%;
    height: 100%;
    position: relative;
  }

  .equipment {
    width: 100%;
    height: 100%;
    padding: 5% 10%;
    text-align: center;
  }

  .equipment img {
    height: 100%;
  }

  .pointInfo {
    width: 100%;
    height: 100%;
    padding: 5% 10%;
  }


  #KPI .boxes {
    height: 50%;
  }

  #KPI .boxes-bg {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  #KPI .boxes-cont {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  .borde {
    text-align: left;
    top: 25px;
    left: 40px;
  }

  .pointStatus-ti {
    color: #ffffff;
    font-size: 12px;
    position: absolute;
    top: 25px;
    right: 40px;
  }

  #KPI .energy {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  #KPI .energy img {
    height: 90%;
    position: absolute;
    top: 5%;
    left: 40%;

  }

  #KPI .electricity {
    width: 100%;
    height: 100%;
    background: url("../../../assets/img/计划开行.png") no-repeat center;
  }

  #KPI .electricity .status {
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    position: absolute;
    top: 42%;
  }

  #KPI .battery {
    width: 100%;
    height: 75%;
    position: absolute;
    top: 20%;
    left: 0;
  }


  /deep/ .ant-menu-dark.ant-menu-inline .ant-menu-item {
    cursor: pointer;
    border-radius: 5px;
  }

  /deep/ .ant-menu-dark, /deep/ .ant-menu-dark .ant-menu-sub {
    color: rgba(255, 255, 255, 0.65);
    background: transparent;
  }

  /deep/ .ant-menu-item-selected {
    text-shadow: 0px 1px 0px #c0c0c0,
    0px 2px 0px #b0b0b0,
    0px 3px 0px #a0a0a0,
    0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.6);

  }


  /*/deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub {*/
  /*color: rgba(255, 255, 255, 0.65);*/
  /*background: transparent;*/
  /*}*/

  /*/deep/ .ant-menu-dark .ant-menu-inline.ant-menu-sub {*/
  /*background: transparent;*/
  /*box-shadow: none;*/
  /*}*/


  /*/deep/ .ant-tabs-bar {*/
  /*color: #ffffff;*/
  /*!*border-bottom: 1px solid #0259ad;*!*/
  /*border-bottom: none;*/
  /*}*/

  /deep/ .ant-tabs-bar {
    border-bottom: 1px solid #0259ad;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    width: 125px;
    padding: 0;
    text-align: center;
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

  /deep/ .ant-btn {
    color: #ffffff;
    height: 28px;
    /*background-color: transparent;*/
    border-radius: 200px;
  }

  .ant-carousel {
    width: 100%;
    height: 100%;
  }

  /deep/ .ant-carousel .slick-slider {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  /deep/ .ant-carousel .slick-list {
    width: 100%;
    height: 100%;
  }

  /deep/ .ant-carousel .slick-track {
    width: 100%;
    height: 100%;
  }

  .ant-carousel >>> .slick-slide {
    width: 100%;
    height: 100%;
    text-align: center;
    /*background: #364d79;*/
    overflow: hidden;
    position: relative;
  }

  .ant-carousel >>> .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }

  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }

  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  /deep/ .ant-carousel .slick-slide img {
    display: inline-block;
  }

  .ant-carousel[data-v-ad1cccaa] .custom-slick-arrow {
    /*font-size: 30px;*/
  }


  /deep/ .ant-table-row:nth-child(even) {
    background: #0b4A86;
  }

  /deep/ .ant-table-row:nth-child(odd) {
    background: #1875A6;
  }

  /deep/ .ant-table-row > td {
    padding: 4px;
  }


</style>
