


<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>

      <div id="Energy"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "MC01",
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
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;
    this.drawLine();
  },
  created() {},
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let Energy = this.$echarts.init(document.getElementById("Energy"));
      // 绘制图表
      Energy.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show:false
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },

          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          type: "category",
          data: [
            "金川路站",
            "大河梗站",
            "海屯路站",
            "小屯站",
            "金鼎山北路站",
            "苏家塘站",
            "小菜园站",
            "火车北站",
            "白龙路站",
            "大树营站",
          ]
        },
        series: [
          {
            name: "总能耗",
            type: "bar",
            data: [
              19325,
              23438,
              31000,
              45194,
              54141,
              68207,
              72141,
              82354,
              92341,
              101231,
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.main {
  color: #ffffff;
  padding: 1%;
  position: relative;
  width: 100%;
  height: 100%;
}
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  left: 6%;
  padding-left: 3%;
}
canvas{
  width: 100% !important;
  height: 100% !important;
  left: -6px !important;
}
#Energy{
  width: 470px;
  height: 240px;
}
</style>
