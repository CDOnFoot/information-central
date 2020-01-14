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
            <a-tabs @change="changeTab" defaultActiveKey="2">
              <template v-for="item in eqType.Equipments">
                <a-tab-pane :tab="item.DisplayName" :key="item.Name"></a-tab-pane>
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
                  <div class="equipment" v-bind:style="{backgroundImage:'url(' + imgUrl + ')'}">
                    <!--<img :src="imgUrl" alt="">-->
                  </div>
                </div>
                <div class="boxes">
                  <div class="pointInfo">
                    <a-table class="flipInX"
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
                      2019年12月19日 09:31:31

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
                      2019年12月19日 09:31:31

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

  const testEquipments = {
    "@odata.context": "http://10.0.14.7/config/$metadata#Equipments",
    "value": [
      {
        "EntityId": 14,
        "Name": "0x1002",
        "DisplayName": "0x1002",
        "Code": "MFS",
        "Location": "",
        "Model": "MultiFunctionalSensor",
        "Description": "多功能传感器1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No1",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 15,
        "Name": "0x1003",
        "DisplayName": "0x1003",
        "Code": "MFS",
        "Location": "",
        "Model": "MultiFunctionalSensor",
        "Description": "多功能传感器2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No1",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 16,
        "Name": "0x1004",
        "DisplayName": "0x1004",
        "Code": "MFS",
        "Location": "",
        "Model": "MultiFunctionalSensor",
        "Description": "多功能传感器3",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No1",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 17,
        "Name": "0x1005",
        "DisplayName": "0x1005",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 18,
        "Name": "0x1006",
        "DisplayName": "0x1006",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 19,
        "Name": "0x1007",
        "DisplayName": "0x1007",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座3",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 20,
        "Name": "0x1008",
        "DisplayName": "0x1008",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座4",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 21,
        "Name": "0x1009",
        "DisplayName": "0x1009",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座5",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 22,
        "Name": "0x1010",
        "DisplayName": "0x1010",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座6",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 23,
        "Name": "0x1011",
        "DisplayName": "0x1011",
        "Code": "REU",
        "Location": "",
        "Model": "RackEnvironmentUnit",
        "Description": "机柜采集器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No5",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 24,
        "Name": "0x1012",
        "DisplayName": "0x1012",
        "Code": "ACSACT",
        "Location": "",
        "Model": "AccessActuator",
        "Description": "门禁执行器1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No6",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 25,
        "Name": "0x1013",
        "DisplayName": "0x1013",
        "Code": "ACSACT",
        "Location": "",
        "Model": "AccessActuator",
        "Description": "门禁执行器2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No6",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 26,
        "Name": "0x1014",
        "DisplayName": "0x1014",
        "Code": "ACSACT",
        "Location": "",
        "Model": "AccessActuator",
        "Description": "门禁执行器3",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No6",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 27,
        "Name": "0x1015",
        "DisplayName": "0x1015",
        "Code": "ACSACT",
        "Location": "",
        "Model": "AccessActuator",
        "Description": "门禁执行器4",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No6",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 28,
        "Name": "0x1016",
        "DisplayName": "0x1016",
        "Code": "FCRK",
        "Location": "",
        "Model": "FingerprintandCardReaderwithaKeypad",
        "Description": "指纹密码刷卡门禁机",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No7",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 29,
        "Name": "0x1017",
        "DisplayName": "0x1017",
        "Code": "FCRK",
        "Location": "",
        "Model": "FingerprintandCardReaderwithaKeypad",
        "Description": "指纹密码刷卡门禁机",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No7",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 30,
        "Name": "0x1018",
        "DisplayName": "0x1018",
        "Code": "ACACT",
        "Location": "",
        "Model": "ACActuator",
        "Description": "交流执行器1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No8",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 31,
        "Name": "0x1019",
        "DisplayName": "0x1019",
        "Code": "ACACT",
        "Location": "",
        "Model": "ACActuator",
        "Description": "交流执行器2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No8",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 32,
        "Name": "0x1020",
        "DisplayName": "0x1020",
        "Code": "SKLACT",
        "Location": "",
        "Model": "SkylightActuator",
        "Description": "天窗执行器1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No9",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 33,
        "Name": "0x1021",
        "DisplayName": "0x1021",
        "Code": "SKLACT",
        "Location": "",
        "Model": "SkylightActuator",
        "Description": "天窗执行器2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No9",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 34,
        "Name": "0x1022",
        "DisplayName": "0x1022",
        "Code": "ELACT",
        "Location": "",
        "Model": "eLightActuator",
        "Description": "eLight 执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No10",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 35,
        "Name": "0x1023",
        "DisplayName": "0x1023",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 36,
        "Name": "0x1024",
        "DisplayName": "0x1024",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 37,
        "Name": "0x1025",
        "DisplayName": "0x1025",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器3",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 38,
        "Name": "0x1026",
        "DisplayName": "0x1026",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器4",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 39,
        "Name": "0x1027",
        "DisplayName": "0x1027",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器5",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 40,
        "Name": "0x1028",
        "DisplayName": "0x1028",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器6",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 41,
        "Name": "0x1029",
        "DisplayName": "0x1029",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器1",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No12",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 42,
        "Name": "0x1030",
        "DisplayName": "0x1030",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器2",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No12",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 43,
        "Name": "0x1031",
        "DisplayName": "0x1031",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器3",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No12",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 44,
        "Name": "0x1032",
        "DisplayName": "0x1032",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器4",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No12",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 45,
        "Name": "多功能传感器1",
        "DisplayName": "多功能传感器1",
        "Code": "MFS",
        "Location": "",
        "Model": "MultiFunctionalSensor",
        "Description": "多功能传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No1",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 46,
        "Name": "多功能传感器2",
        "DisplayName": "多功能传感器2",
        "Code": "MFS",
        "Location": "",
        "Model": "MultiFunctionalSensor",
        "Description": "多功能传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No1",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 47,
        "Name": "多功能传感器3",
        "DisplayName": "多功能传感器3",
        "Code": "MFS",
        "Location": "",
        "Model": "MultiFunctionalSensor",
        "Description": "多功能传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No1",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 48,
        "Name": "智能 ETH 插座1",
        "DisplayName": "智能 ETH 插座1",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 49,
        "Name": "智能 ETH 插座2",
        "DisplayName": "智能 ETH 插座2",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 50,
        "Name": "智能 ETH 插座3",
        "DisplayName": "智能 ETH 插座3",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 51,
        "Name": "智能 ETH 插座4",
        "DisplayName": "智能 ETH 插座4",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 52,
        "Name": "智能 ETH 插座5",
        "DisplayName": "智能 ETH 插座5",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 53,
        "Name": "智能 ETH 插座6",
        "DisplayName": "智能 ETH 插座6",
        "Code": "SETH",
        "Location": "",
        "Model": "SmartETHGateway",
        "Description": "智能 ETH 插座",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No2",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 54,
        "Name": "机柜采集器",
        "DisplayName": "机柜采集器",
        "Code": "REU",
        "Location": "",
        "Model": "RackEnvironmentUnit",
        "Description": "机柜采集器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No3",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 55,
        "Name": "门禁执行器1",
        "DisplayName": "门禁执行器1",
        "Code": "ACSACT",
        "Location": "",
        "Model": "AccessActuator",
        "Description": "门禁执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No4",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 56,
        "Name": "门禁执行器2",
        "DisplayName": "门禁执行器2",
        "Code": "ACSACT",
        "Location": "",
        "Model": "AccessActuator",
        "Description": "门禁执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No4",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 57,
        "Name": "指纹密码刷卡门禁机1",
        "DisplayName": "指纹密码刷卡门禁机1",
        "Code": "FCRK",
        "Location": "",
        "Model": "FingerprintandCardReaderwithaKeypad",
        "Description": "指纹密码刷卡门禁机",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No5",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 58,
        "Name": "指纹密码刷卡门禁机2",
        "DisplayName": "指纹密码刷卡门禁机2",
        "Code": "FCRK",
        "Location": "",
        "Model": "FingerprintandCardReaderwithaKeypad",
        "Description": "指纹密码刷卡门禁机",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No5",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 59,
        "Name": "交流执行器1",
        "DisplayName": "交流执行器1",
        "Code": "ACACT",
        "Location": "",
        "Model": "ACActuator",
        "Description": "交流执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No6",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 60,
        "Name": "交流执行器2",
        "DisplayName": "交流执行器2",
        "Code": "ACACT",
        "Location": "",
        "Model": "ACActuator",
        "Description": "交流执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No6",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 61,
        "Name": "天窗执行器1",
        "DisplayName": "天窗执行器1",
        "Code": "SKLACT",
        "Location": "",
        "Model": "SkylightActuator",
        "Description": "天窗执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No7",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 62,
        "Name": "天窗执行器2",
        "DisplayName": "天窗执行器2",
        "Code": "SKLACT",
        "Location": "",
        "Model": "SkylightActuator",
        "Description": "天窗执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No7",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 63,
        "Name": "eLight 执行器1",
        "DisplayName": "eLight 执行器1",
        "Code": "ELACT",
        "Location": "",
        "Model": "eLightActuator",
        "Description": "eLight 执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No8",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 64,
        "Name": "eLight 执行器2",
        "DisplayName": "eLight 执行器2",
        "Code": "ELACT",
        "Location": "",
        "Model": "eLightActuator",
        "Description": "eLight 执行器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No8",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 65,
        "Name": "水浸传感器1",
        "DisplayName": "水浸传感器1",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No9",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 66,
        "Name": "水浸传感器2",
        "DisplayName": "水浸传感器2",
        "Code": "WATSEN",
        "Location": "",
        "Model": "WaterSensor",
        "Description": "水浸传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No9",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 67,
        "Name": "温湿度传感器1",
        "DisplayName": "温湿度传感器1",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No10",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 68,
        "Name": "温湿度传感器2",
        "DisplayName": "温湿度传感器2",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No10",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 69,
        "Name": "温湿度传感器3",
        "DisplayName": "温湿度传感器3",
        "Code": "THSEN",
        "Location": "",
        "Model": "T_Hsensor",
        "Description": "温湿度传感器",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No10",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 70,
        "Name": "风冷行级精密空调1",
        "DisplayName": "风冷行级精密空调1",
        "Code": "NET",
        "Location": "",
        "Model": "NetCol5000",
        "Description": "风冷行级精密空调",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 71,
        "Name": "风冷行级精密空调2",
        "DisplayName": "风冷行级精密空调2",
        "Code": "NET",
        "Location": "",
        "Model": "NetCol5000",
        "Description": "风冷行级精密空调",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 72,
        "Name": "风冷行级精密空调3",
        "DisplayName": "风冷行级精密空调3",
        "Code": "NET",
        "Location": "",
        "Model": "NetCol5000",
        "Description": "风冷行级精密空调",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 73,
        "Name": "风冷行级精密空调4",
        "DisplayName": "风冷行级精密空调4",
        "Code": "NET",
        "Location": "",
        "Model": "NetCol5000",
        "Description": "风冷行级精密空调",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No11",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 74,
        "Name": "ECC800",
        "DisplayName": "ECC800",
        "Code": "ECC",
        "Location": "",
        "Model": "PowerModule",
        "Description": "ECC800",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No12",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 75,
        "Name": "配电柜输入1",
        "DisplayName": "配电柜输入1",
        "Code": "PDU",
        "Location": "",
        "Model": "PDU8000",
        "Description": "配电柜输入",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No13",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 76,
        "Name": "配电柜输入2",
        "DisplayName": "配电柜输入2",
        "Code": "PDU",
        "Location": "",
        "Model": "PDU8000",
        "Description": "配电柜输入",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No13",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 77,
        "Name": "配电柜输出1",
        "DisplayName": "配电柜输出1",
        "Code": "PDU",
        "Location": "",
        "Model": "PDU8000",
        "Description": "配电柜输出",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No13",
        "CustomProperties": null,
        "CheckPoint": false
      },
      {
        "EntityId": 78,
        "Name": "配电柜输出2",
        "DisplayName": "配电柜输出2",
        "Code": "PDU",
        "Location": "",
        "Model": "PDU8000",
        "Description": "配电柜输出",
        "JsonCustomColumn": null,
        "TechnicalAddress": "10.166.29.100:161",
        "TechnicalParameter": null,
        "Manufacturer": null,
        "ControlBoxSerial": "No13",
        "CustomProperties": null,
        "CheckPoint": false
      }
    ]
  }

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

        imgUrl: "",

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
          console.log(this.data);

          // 测试
          // this.data = testEquipments.value;

          this.menu = this.unique(this.data);
          console.log(this.menu);
          this.eqType = this.menu[0];
          this.changeMenu(this.eqType);
        });
      },

      unique(objArr) {
        let res = [];
        let obj = {};
        for (let i = 0; i < objArr.length; i++) {
          console.log(objArr[i].Description);
          if (objArr[i].DisplayName.indexOf("0x10") == -1) {

            if (!obj[objArr[i].Code]) {
              let imgUrl = "";
              switch (objArr[i].Description) {
                case "多功能传感器1":
                  imgUrl = require("../../../assets/img/monitor/ECC800.png");
                  break;
                case "风冷行级精密空调":
                  imgUrl = require("../../../assets/img/monitor/风冷行级精密空调.png");
                  break;
                case "配电柜输入":
                  imgUrl = require("../../../assets/img/monitor/配电柜输入.png");
                  break;
                case "配电柜输出":
                  imgUrl = require("../../../assets/img/monitor/配电柜输出.png");
                  break;
                case "水浸传感器":
                  imgUrl = require("../../../assets/img/monitor/水浸传感器和水浸绳.png");
                  break;
                case "LED灯":
                  imgUrl = require("../../../assets/img/monitor/LED灯.png");
                  break;
                case "半高型rPDU":
                  imgUrl = require("../../../assets/img/monitor/半高型rPDU.png");
                  break;
                case "灯光告警器":
                  imgUrl = require("../../../assets/img/monitor/灯光告警器.png");
                  break;
                case "机房":
                  imgUrl = require("../../../assets/img/monitor/机房.png");
                  break;
                case "门禁":
                  imgUrl = require("../../../assets/img/monitor/门禁.png");
                  break;
                case "门禁执行器":
                  imgUrl = require("../../../assets/img/monitor/门禁执行器.png");
                  break;
                case "全高型rPDU":
                  imgUrl = require("../../../assets/img/monitor/全高型rPDU.png");
                  break;
                case "摄像机":
                  imgUrl = require("../../../assets/img/monitor/摄像机.png");
                  break;
                case "天窗执行器":
                  imgUrl = require("../../../assets/img/monitor/天窗执行器.png");
                  break;
                case "网络硬盘刻录机":
                  imgUrl = require("../../../assets/img/monitor/网络硬盘刻录机.png");
                  break;
                case "一体化机房":
                  imgUrl = require("../../../assets/img/monitor/一体化机房.png");
                  break;
                case "指纹密码刷卡门禁机":
                  imgUrl = require("../../../assets/img/monitor/指纹密码刷卡门禁机.jpg");
                  break;
                default:
              }
              let newObj = {
                Code: objArr[i].Code,
                DisplayName: objArr[i].Description,
                // DisplayName: objArr[i].Description == 'ECC800' ? 'ECC800' : objArr[i].Description.replace(/\d+/g, ''),
                Equipments: [],
                ImgUrl: imgUrl,
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
        }
        this.openKeys.push(this.rootSubmenuKeys[0]);
        return res;
      },

      changeMenu(key) {
        this.eqType = key;
        this.imgUrl = this.eqType.ImgUrl;
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
              let desc = "";
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
              } else {
                if (displayName == "通信状态") {
                  this.commStatus.Value = "暂无数据";
                  this.commStatus.Time = "暂无数据";
                }
              }
              arr.push({
                DisplayName: displayName,
                Desc: desc,
              });
            }
          }

        }
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
    width: 90%;
    height: 80%;
    margin-left: 2%;
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
    width: 80%;
    height: 90%;
    margin: 5% 10%;
    text-align: center;
    /*background-image: url("../../../assets/img/monitor/配电柜输入.png");*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .pointInfo {
    width: 100%;
    height: 100%;
    padding: 5% 20% 5% 10%;
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
    background: #2250ca;
    margin-bottom: 7px;
    position: relative;
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
    /*background-color: rgba(219, 87, 51, 1);*/
    background-color: #6195f1;
    display: block;
    padding: 4px;
    border-radius: 8px;
    /* let's use box shadows to make the button look more 3-dimensional */
    box-shadow: 0px 5px 0px #82abf5, 0px 9px 25px rgba(0, 0, 0, .3);
    -webkit-transition: all .1s ease;
    -moz-transition: all .1s ease;
    transition: all .1s ease;
  }

  /deep/ .ant-menu-dark, /deep/ .ant-menu-dark .ant-menu-sub {
    background: transparent;
  }

  /deep/ .ant-menu.ant-menu-dark .ant-menu-item-selected, /deep/ .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    width: 110%;
    height: 50px;
    line-height: 50px;
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

  /* /deep/ .ant-tabs-bar {
    border-bottom: 1px solid #0259ad;
  } */

  /deep/ .ant-tabs {
    color: #ffffff;
  }

  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    padding: 0 10px;
    text-align: center;
    background-color: transparent;
    color: #ffffff;
    /* border-color: #0259ad; */
  }

  /deep/ .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
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
    border-radius: 200px;
    border-color: #0259ad;
    background-color: transparent;
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

  /deep/ .ant-table-placeholder {
    color: #ffffff;
    background: transparent;
    border-bottom: none;
  }


  @keyframes flipInX {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
      transform: perspective(400px);
    }
  }

  .flipInX {
    backface-visibility: visible !important;
    animation-name: flipInX;
  }
</style>
