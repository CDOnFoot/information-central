<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">资源占用情况</div>
      <div class="module-icon">
        <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
        <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span style="font-size: 14px">{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="module-area">
          <div class="module-area-title">
            <b>
              云计算
            </b>
          </div>
          <div class="module-area-data">
            <div class="none-data" id="chart-0">
              <a-progress type="circle" strokeLinecap="square" :percent="75" :format="percent => `${percent}% CPU`"
                          status="active" strokeWidth="10" strokeColor="#0ff" width="92px"/>
            </div>
            <div class="none-data" id="chart-1">
              <a-progress type="circle" strokeLinecap="square" :percent="25" :format="percent => `${percent}% 内存`"
                          status="active" strokeWidth="10" strokeColor="#0ff" width="92px"/>
            </div>
            <div class="none-data" id="chart-2">
              <a-progress type="circle" strokeLinecap="square" :percent="66" :format="percent => `${percent}% 存储`"
                          status="active" strokeWidth="10" strokeColor="#0ff" width="92px"/>
            </div>
          </div>
        </div>
        <div class="module-area">
          <div class="module-area-title">
            <b>
              云桌面
            </b>
          </div>
          <div class="module-area-data">
            <div class="none-data" id="chart-3">
              <a-progress type="circle" strokeLinecap="square" :percent="82" :format="percent => `${percent}% CPU`"
                          status="active" strokeWidth="10" strokeColor="#0ff" width="92px"/>
            </div>
            <div class="none-data" id="chart-4">
              <a-progress type="circle" strokeLinecap="square" :percent="75" :format="percent => `${percent}% 内存`"
                          status="active" strokeWidth="10" strokeColor="#0ff" width="92px"/>
            </div>
            <div class="none-data" id="chart-5">
              <a-progress type="circle" strokeLinecap="square" :percent="48" :format="percent => `${percent}% 存储`"
                          status="active" strokeWidth="10" strokeColor="#0ff" width="92px"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from "echarts";

  export default {
    name: "MC03",
    data() {
      return {};
    },
    props: ["mcStatus", "mcTitle", "mcId"],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        console.log(this.mcTitle);
        this.mcTitle = val;
      },
      mcId: function (val) {
        this.mcId = val;
      }
    },
    created() {
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        let chartInit = this.$echarts.init(document.getElementById("chart-0"));

        let option;

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

  .main-id {
    position: relative;
    width: 92%;
    height: 84%;
    margin-top: 6%;
    margin-left: 2%;
  }


  .module-area {
    width: 100%;
    height: 50%;
    /*background-color: #3467c5;*/
  }

  .module-area-title {
    float: left;
    width: 15%;
    height: 100%;
    line-height: 4;
    text-align: center;
    font-size: 14px;
    word-wrap: break-word;
    writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  }

  .module-area-data {
    float: left;
    width: 85%;
    height: 100%;
  }

  .none-data {
    float: left;
    width: 32%;
    height: 100%;
    margin-top: 3%;
    margin-left: 1%;
  }

  /deep/ .ant-progress-circle-trail {
    stroke: #175372 !important;
    opacity: .3;
  }

  /deep/ .ant-progress-text {
    color: #e4e8ec;
    font-size: 14px;
    font-weight: bold;
  }

</style>
