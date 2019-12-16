<template>
  <div class="content">
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">能量流图</div>
        <div class="pointStatusTime">
          {{pointStatus_ti}}
        </div>
        <div class="mk-energy">
          <img :src="imgUrl" alt="">
        </div>
      </div>
    </div>
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">供电状态</div>
        <div class="pointStatusTime">
          {{pointStatus_ti}}
        </div>
        <div class="mk-electricity">
          <!--<img src="../../../../assets/img/计划开行.png" alt="">-->
          <div class="mk-electricity-status">{{status}}</div>
        </div>
      </div>
    </div>
    <div class="mk" style="width: 100%;">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="" style="width: 95%; left: 2.5%">
      <div class="mk-container" style="width: 90%; left: 5%;">
        <div class="borde">电池后备时间</div>
        <div class="pointStatusTime">
          {{pointStatus_ti}}
        </div>
        <div class="mk-battery">
          <a-table
            :showHeader="true"
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :loading="loading"
          >
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const testdata = [
    {
      CheckPoint: false,
      Code: "JKD",
      ControlBoxSerial: "",
      CustomProperties: null,
      Description: "现场门禁智能控制单元-门JK-01-02",
      DisplayName: "JK-01-02",
      EntityId: 4,
      JsonCustomColumn: null,
      Location: "数据中心B1层门2",
      Manufacturer: null,
      Model: "门",
      Name: "JK-01-02",
      TPType: "Modbus",
      TechnicalAddress: "10.28.3.199:4001",
      TechnicalParameter: null,
    },
    {
      CheckPoint: false,
      Code: "JKD",
      ControlBoxSerial: "",
      CustomProperties: null,
      Description: "现场门禁智能控制单元-门JK-01-02",
      DisplayName: "JK-01-02",
      EntityId: 4,
      JsonCustomColumn: null,
      Location: "数据中心B1层门2",
      Manufacturer: null,
      Model: "门",
      Name: "JK-01-02",
      TPType: "Modbus",
      TechnicalAddress: "10.28.3.199:4001",
      TechnicalParameter: null,
    },
    {
      CheckPoint: false,
      Code: "JKD",
      ControlBoxSerial: "",
      CustomProperties: null,
      Description: "现场门禁智能控制单元-门JK-01-02",
      DisplayName: "JK-01-02",
      EntityId: 4,
      JsonCustomColumn: null,
      Location: "数据中心B1层门2",
      Manufacturer: null,
      Model: "门",
      Name: "JK-01-02",
      TPType: "Modbus",
      TechnicalAddress: "10.28.3.199:4001",
      TechnicalParameter: null,
    },
    {
      CheckPoint: false,
      Code: "JKD",
      ControlBoxSerial: "",
      CustomProperties: null,
      Description: "现场门禁智能控制单元-门JK-01-02",
      DisplayName: "JK-01-02",
      EntityId: 4,
      JsonCustomColumn: null,
      Location: "数据中心B1层门2",
      Manufacturer: null,
      Model: "门",
      Name: "JK-01-02",
      TPType: "Modbus",
      TechnicalAddress: "10.28.3.199:4001",
      TechnicalParameter: null,
    },
    // {
    //   CheckPoint: false,
    //   Code: "JKD",
    //   ControlBoxSerial: "",
    //   CustomProperties: null,
    //   Description: "现场门禁智能控制单元-门JK-01-02",
    //   DisplayName: "JK-01-02",
    //   EntityId: 4,
    //   JsonCustomColumn: null,
    //   Location: "数据中心B1层门2",
    //   Manufacturer: null,
    //   Model: "门",
    //   Name: "JK-01-02",
    //   TPType: "Modbus",
    //   TechnicalAddress: "10.28.3.199:4001",
    //   TechnicalParameter: null,
    // },
    // {
    //   CheckPoint: false,
    //   Code: "JKD",
    //   ControlBoxSerial: "",
    //   CustomProperties: null,
    //   Description: "现场门禁智能控制单元-门JK-01-02",
    //   DisplayName: "JK-01-02",
    //   EntityId: 4,
    //   JsonCustomColumn: null,
    //   Location: "数据中心B1层门2",
    //   Manufacturer: null,
    //   Model: "门",
    //   Name: "JK-01-02",
    //   TPType: "Modbus",
    //   TechnicalAddress: "10.28.3.199:4001",
    //   TechnicalParameter: null,
    // },
    // {
    //   CheckPoint: false,
    //   Code: "JKD",
    //   ControlBoxSerial: "",
    //   CustomProperties: null,
    //   Description: "现场门禁智能控制单元-门JK-01-02",
    //   DisplayName: "JK-01-02",
    //   EntityId: 4,
    //   JsonCustomColumn: null,
    //   Location: "数据中心B1层门2",
    //   Manufacturer: null,
    //   Model: "门",
    //   Name: "JK-01-02",
    //   TPType: "Modbus",
    //   TechnicalAddress: "10.28.3.199:4001",
    //   TechnicalParameter: null,
    // },
    // {
    //   CheckPoint: false,
    //   Code: "JKD",
    //   ControlBoxSerial: "",
    //   CustomProperties: null,
    //   Description: "现场门禁智能控制单元-门JK-01-02",
    //   DisplayName: "JK-01-02",
    //   EntityId: 4,
    //   JsonCustomColumn: null,
    //   Location: "数据中心B1层门2",
    //   Manufacturer: null,
    //   Model: "门",
    //   Name: "JK-01-02",
    //   TPType: "Modbus",
    //   TechnicalAddress: "10.28.3.199:4001",
    //   TechnicalParameter: null,
    // },

  ];

  const columns = [
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
    name: "kpi",
    data() {
      return {
        curequipment: this.curEquipment,
        pointStatus_ti: this.pointStatus_Ti,
        imgUrl: require('../../../../assets/img/monitor/dev2.png'),
        status: '正常',
        data: testdata,
        columns,
        loading: false,
      };
    },
    props: ['curEquipment', 'pointStatus_Ti'],
    watch: {
      curEquipment: function (val) {
        this.curequipment = val;
        console.log(this.curequipment);
      },
      pointStatus_Ti: function (val) {
        this.pointStatus_ti = val;
        console.log(this.pointStatus_ti);
      }
    },
    mounted() {
      console.log(this.curequipment);
      console.log(this.pointStatus_ti);
    },
    methods: {},
  };

</script>

<style scoped>
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .mk {
    width: 50%;
    height: 50%;
    float: left;
    position: relative;
  }

  .mk-bg {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  .mk-container {
    width: 84%;
    height: 84%;
    position: absolute;
    top: 8%;
    left: 8%;
  }

  .pointStatusTime {
    /*font-weight: 700;*/
    color: #ffffff;
    position: absolute;
    top: 20px;
    right: 15px;
    font-size: 12px;
  }

  .mk-energy img {
    height: 90%;
    position: absolute;
    top: 5%;
    left: 35%;
  }

  .mk-electricity {
    width: 100%;
    height: 100%;
    background: url("../../../../assets/img/计划开行.png") no-repeat center;
  }

  .mk-electricity-status {
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    position: absolute;
    top: 42%;
  }

  .mk-battery {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 18%;
    overflow: auto;
  }

  /deep/ .ant-table-thead > tr {
    background: #0b4A86;
  }

  /deep/ .ant-table-thead > tr > th {
    padding: 4px;
    background: transparent;
    border-bottom: none;

  }

  /deep/ .ant-table-row {
    /*background: url("../../../../assets/img/table-bg.png");*/
    /*background-repeat: repeat-x;*/
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

  /* 滚动条 */
  ::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
    width: 4px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #fff; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }

  ::-webkit-scrollbar {
    width: 10px; /*滚动条的宽度*/
    height: 8px; /*滚动条的高度*/
  }

  ::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
    height: 50px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
  }

  ::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
    height: 50px;
    background-color: #9f9f9f;
    -webkit-border-radius: 4px;
  }

</style>
