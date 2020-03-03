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
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">资源占用情况</div>
      <div class="module-icon">
        <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
        <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="module-area">
          <div class="module-area-title">
            云计算
          </div>
          <div class="module-area-data">
            <div class="none-data" id="chart-0"></div>
            <div class="none-data" id="chart-1"></div>
            <div class="none-data" id="chart-2"></div>
          </div>
        </div>
        <div class="module-area">
          <div class="module-area-title">
            云桌面
          </div>
          <div class="module-area-data">
            <div class="none-data" id="chart-3"></div>
            <div class="none-data" id="chart-4"></div>
            <div class="none-data" id="chart-5"></div>
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
    width: 100%;
    height: 20%;
    font-size: 14px;
  }

  .module-area-data {
    width: 100%;
    height: 80%;
    /*background-color: #3467c5;*/

  }

  .none-data {
    float: left;
    width: 32%;
    height: 100%;
    margin-left: 1%;
  }

</style>
