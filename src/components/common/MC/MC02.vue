
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
      <div class="borde">{{mcTitle}}</div>
     <!-- <div class="module-icon">
       <img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">
     </div> -->
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-0">
          <!--暂无信息-->
          模块二
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC02",
  data() {
    return {};
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
    this.initChart();
  },

  created() {},

  methods: {
    initChart() {
      let chartInit = this.$echarts.init(document.getElementById("chart-0"));

      let option = {
        /*title: {
          text: '当前电量',
          textStyle: {
            color: '#fff',
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fontFamily: '黑体'
          }
        },*/

        // color: ['#365fb4'],

        series: [
          // 外圈 - 饼 pie
          {
            type: "pie",
            name: "当前电量",
            radius: ["65%", "80%"],
            startAngle: 270,
            hoverAnimation: false,

            label: {
              show: true,
              formatter: "{b}",
              color: "#ffffff"
            },

            itemStyle: {
              color: "#2852bc",
              borderColor: "#132245",
              borderWidth: 10,
              opacity: 0.7
            },

            center: ["50%", "50%"],

            data: [
              {
                name: "0%",
                value: 16
              },
              {
                name: "20%",
                value: 16
              },
              {
                name: "40%",
                value: 16
              },
              {
                name: "60%",
                value: 16
              },
              {
                name: "80%",
                value: 16
              },
              {
                name: "100%",
                value: 16
              }
            ]
          },

          // 内圈 - 基于仪表盘
          {
            type: "gauge",
            radius: "50%",
            startAngle: 268,
            endAngle: -85,

            data: [
              {
                name: "test",
                value: 50
              }
            ],

            axisLine: {
              show: false
            },

            splitLine: {
              show: false
            },

            axisTick: {
              length: 12,
              lineStyle: {
                width: 3
              }
            },

            pointer: {
              width: 3
            },

            axisLabel: {
              show: false
            },

            title: {
              show: false
            }
          }
        ]
      };

      chartInit.setOption(option);
      setInterval(() => {
        const value = Math.random() * 100;
        chartInit.clear();
        chartInit.setOption(option);
      }, 10000);
    }
  }
};
</script>

<style scoped>
.main111 {
  /* width: 90px;
			height: 90px;
			padding-top: 100px; */
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
  width: 100%;
  height: 100%;
  position: relative;
}
.none-data {
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
  width: 100%;
  height: 100%;
}
</style>
