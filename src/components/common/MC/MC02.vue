
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <!--<div class="borde">电量</div>-->
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-0">
          <!--暂无信息-->模块二
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC02",
  data() {
    return {

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
    this.initChart();
  },

  created() {},

  methods: {
    initChart () {
      let chartInit = this.$echarts.init(document.getElementById('chart-0'));

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
            type: 'pie',
            name: '当前电量',
            radius: ['65%', '80%'],
            startAngle: 270,
            hoverAnimation: false,

            label: {
              show: true,
              formatter: '{b}',
              color: '#ffffff'
            },

            itemStyle: {
              color: '#2852bc',
              borderColor: '#132245',
              borderWidth: 10,
              opacity: 0.7
            },

            center: ['50%', '50%'],

            data: [
              {
                name: '0%',
                value: 16
              },
              {
                name: '20%',
                value: 16
              },
              {
                name: '40%',
                value: 16
              },
              {
                name: '60%',
                value: 16
              },
              {
                name: '80%',
                value: 16
              },
              {
                name: '100%',
                value: 16
              }
            ]
          },

          // 内圈 - 基于仪表盘
          {
            type: 'gauge',
            radius: '50%',
            startAngle: 260,
            endAngle: -80,

            data: [
              {
                name: 'test',
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

      chartInit.setOption(option)
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
}
.none-data{
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
  width: 100%;
  height: 100%;
}
</style>
