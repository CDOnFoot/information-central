<template>
  <div class="content">
    <!--<img class="mk-bg" src="../../../../assets/img/form-bg.png" alt="">-->
    <div class="mk">
      <div class="mk-container">
        <div class="mk-pic">
          <img :src="imgUrl" alt="">
        </div>
      </div>
    </div>
    <div class="mk">
      <div class="mk-container">
        <div class="pointStatusTime">

        </div>
        <div class="mk-list">
          <a-table
            rowKey="0"
            :columns="columns"
            :dataSource="data"
            :showHeader="false"
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
      width: '50%'
    },
    {
      title: 'Desc',
      dataIndex: 'Desc',
      align: 'center',
      width: '50%'
    },
  ];

  export default {
    name: "info",
    data() {
      return {
        data: [],
        equipment: this.Equipment,
        pointInfo: this.PointInfo,
        pointVal: this.PointVal,
        imgUrl: require('../../../../assets/img/monitor/dev5.png'),
        columns,
        loading: false,
      };
    },
    props: ['Equipment', 'PointInfo', 'PointVal'],
    watch: {
      Equipment: function (val) {
        this.equipment = val;
        console.log(this.equipment)
      },
      PointInfo: function (val) {
        this.pointInfo = val;
        console.log(this.pointInfo)
      },
      PointVal: function (val) {
        this.pointVal = val;
        console.log(this.pointVal);
        this.init()
      }
    },
    mounted() {
      console.log(1)
    },
    methods: {
      init() {
        let arr = [];
        for (let i = 0; i < this.pointInfo.length; i++) {
          let displayName = this.pointInfo[i].DisplayName;
          if (displayName.indexOf('只读') == -1 && displayName.indexOf('读构建') == -1) {
            let desc;
            let t = this.pointVal[i].t;
            if (t == "String") {
              desc = this.pointVal[i].s;
            } else if (t == "Long") {
              desc = this.pointVal[i].l;
            }
            arr.push({
              DisplayName: displayName,
              Desc: desc,
            });
          }
        }
        this.data = arr;
      },
    },
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
    height: 100%;
    float: left;
    position: relative;
  }

  .mk-bg {
    width: 100%;
    height: 100%;
  }

  .mk-container {
    width: 84%;
    height: 84%;
    position: absolute;
    top: 8%;
    left: 8%;
    /*overflow: auto;*/
  }

  .pointStatusTime {
    /*font-weight: 700;*/
    /*z-index: 999;*/
    color: #ffffff;
    position: absolute;
    top: -10px;
    right: 45px;
    font-size: 12px;
  }

  .mk-pic {
    width: 100%;
    height: 100%;
    text-align: center;
    /*background: url("../../../../assets/img/monitor/dev2.png") no-repeat center;*/
    /*background-size: contain;*/
  }

  .mk-pic img {
    height: 100%;
  }

  .mk-list {
    width: 100%;
    height: 100%;
    /*background: url("../../../../assets/img/table-bg.png");*/
    /*background-repeat: repeat;*/
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
