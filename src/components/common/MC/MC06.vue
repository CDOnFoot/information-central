
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
     <div class="main111">
        <!-- <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div> -->
      </div>
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
                   :loading="loading"
                   :dataSource="tableList"
                   :pagination="pagination"
                   size="small">
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
          title: '设备名称',
          // dataIndex: 'DisplayName',
          align: 'center',
          width: '10%'
        },
        {
          title: '告警时间',
          // dataIndex: 'DisplayName',
          align: 'center',
          width: '10%'
        },
        {
          title: '告警内容',
          // dataIndex: 'DisplayName',
          align: 'center',
          width: '10%'
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
        size: 'small'
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
.main111 {
    margin-left: 56%;
    height: 15px;
    width: 110px;
    background: url('../../../assets/img/loading.png');
  }

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
  padding-top: 6px;
  width: 98%;
  height: 98%;
}
</style>
