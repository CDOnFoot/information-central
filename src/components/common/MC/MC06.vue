
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">

      <div class="borde">报警信息</div>
      <div class="module-icon">
       <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
     </div>
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-id-2">
          <!--模块六-->
          <!-- 新增设备点报警数据 list -->
          <a-table :columns="column"
                   class="flipInX"
                   :loading="loading"
                   :dataSource="tableList"
                   :pagination="false"
                   :showHeader="false"
                   size="small">
            <template slot="operation" slot-scope="text, record">
              <!--<a-button type="dashed" ghost @click="checkUser(record)">查看</a-button>-->
              <div><img src="../../../assets/img/menu-icon/alarm_1.png" alt="" width="20" height="20"></div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import echarts from "echarts";

export default {
  name: "MC06",
  data() {
    return {
      column: [
        {
          title: '操 作',
          // dataIndex: 'tel',
          align: 'center',
          width: '5%',
          scopedSlots: { customRender: 'operation' }
        },
        {
          title: '报警名称',
          dataIndex: 'AlarmName',
          align: 'center',
          width: '10%'
        },
        {
          title: '告警时间',
          dataIndex: 'AlarmDateTime',
          align: 'center',
          width: '20%'
        },
        {
          title: '告警等级',
          dataIndex: 'AlarmLevel',
          align: 'center',
          width: '6%'
        }
      ],
      loading: false,
      tableList: [],
      pagination: {
        current: 0,
        defaultCurrent: 1,
        // 默认页容量
        defaultPageSize: 4,
        total: 0,
        size: 'small',
        onChange: current => this.onChangePage(current)
      }
    };
  },
  props: ["mcStatus", "mcTitle", "mcId"],
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
    }
  },

  mounted() {
    // this.initChart();
    this.getCurrentAlarm();
  },

  created() {
    const that = this;
    // 拿到 vuex 中存储的点值数据
    const pointValues = JSON.parse(that.$store.getters.getPointsList);
    let pointsContainer = [];
    pointValues.forEach((value) => {
      if (value.isAlarm) {
        pointsContainer.push(value);
      }
    });
    this.tableList = pointsContainer;
  },

  methods: {
    // 请求获取报警数据
    getCurrentAlarm () {
      const that = this;
      this.pagination.current = 1;
      this.loading = true;
      this.$http.get(that.$api.getAlarmForPagination)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.value) {
              let formattedTable = [];
              const tableContainer = res.data.value;
              // 筛选等级
              tableContainer.forEach((values, index) => {
                if (values.AlarmLevel.Name === '二级') {
                  // 控制单元格长度
                  if (values.AlarmName.length >= 6) {
                    values.AlarmName = values.AlarmName.slice(0, 6) + "...";
                  }
                  values.AlarmDateTime = this.$common.timestampToTime(values.AlarmDateTime);
                  // values.AlarmDescription = values.AlarmDescription.split('-')[1];
                  values.AlarmLevel = values.AlarmLevel.Name;
                  formattedTable.push(values);
                }
              });
              let lastTable = [];
              for (let i=0;i<7;i++) {
                lastTable.push(formattedTable[i])
              }
              this.tableList = lastTable;
              this.loading = false;
            }
          }
        })
    },

    // 页码改变的回调
    onChangePage (page) {
      this.pagination.current = page;
    },
    
    initChart () {
      let chartInit = this.$echarts.init(document.getElementById('chart-id-2'));

      const option = {};

      chartInit.setOption(option);
      setInterval(() => {
        chartInit.clear();
        chartInit.setOption(option);
      }, 10000)
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
  padding: 27px 10px 0 5px;
}
.none-data{
  font-size: 14px;
  text-align: center;
  padding-top: 15px;
  width: 98%;
  height: 98%;
}

/deep/ .ant-table-pagination.ant-pagination {
  height: 40px;
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
