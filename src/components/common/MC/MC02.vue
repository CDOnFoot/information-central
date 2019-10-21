
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div id="structure" :style="{width: '470px', height: '240px',margin:'0px 10px'}"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC02",
  data() {
    return {
        mcList:'',
        mcId:'',
      };
    },
    props:['mcStatus','mcTitle'],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        this.mcTitle = val;
      }
    },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;
    console.log(this.mcStatus);
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;

    this.drawLine();
  },
  created() {},
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let structure = this.$echarts.init(document.getElementById("structure"));
      // 绘制图表
      setTimeout(function() {
        structure.setOption({
          legend: {
            textStyle: {
              //图例文字的样式
              color: "white"
            }
          },
          tooltip: {
            trigger: "axis",
            showContent: false
          },
          dataset: {
            source: [
              [
                "date",
                "2019/9/23",
                "2019/9/24",
                "2019/9/25",
                "2019/9/26",
                "2019/9/27",
                "2019/9/28"
              ],
              ["牵引", 41.1, 30.4, 65.1, 53.3, 83.8, 55.1],
              ["机电", 86.5, 92.1, 85.7, 83.1, 73.4, 98.7],
              ["照明", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ["其他", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "white"
              }
            }
          },
          yAxis: {
            gridIndex: 0,
            axisLine: {
              lineStyle: {
                color: "white"
              }
            }
          },
          grid: { top: "55%" },
          series: [
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: "{b}: {@2012} ({d}%)"
              },
              encode: {
                itemName: "date",
                value: "2012",
                tooltip: "2012"
              }
            }
          ]
        });

        structure.on("updateAxisPointer", function(event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            structure.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]}kWh"
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        // myChart.setOption(option);
      });
    }
  }
};
</script>

<style scoped>
.main {
  /* background: rgba(78, 58, 58, 0.411); */
  color: #ffffff;
  padding: 10px;
}
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  padding-left: 10px;
  margin: 0px 0px 0px 30px;
}
</style>
