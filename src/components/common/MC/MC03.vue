
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="timeStamp">{{timeStamp}}</div>

      <!-- <div id="flow"></div> -->
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC03",
  data() {
    return {
      mcList: "",
      timeInterval: "",
      timeStamp: this.$common.timestampToTime(new Date())
    };
  },
  props: ["mcStatus", "mcTitle", "mcId"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      this.mcTitle = val;
    },
    mcId: function(val) {
      this.mcId = val;
    }
  },
  mounted() {
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(function() {
      self.timeStamp = self.$common.timestampToTime(new Date());
    }, 1000);
    var self = this;
    this.mcList = this.$common.mcList;
    console.log(this.mcStatus);
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;

    this.drawLine();
  },
  created() {},
  methods: {
    drawLine() {
      let self = this;
      // 基于准备好的dom，初始化echarts实例
      let flow = this.$echarts.init(document.getElementById(self.mcId));
      // 绘制图表
      flow.setOption({
        color: ["#c23531", "#61a0a8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          textStyle: {
            color: "white"
          },
          data: ["走势", "预测"]
        },
        toolbox: {
          // feature: {
          //     saveAsImage: {}
          // }
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: "white"
              }
            },
            type: "category",
            boundaryGap: false,
            data: [
              "05:00",
              "06:00",
              "07:00",
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00"
            ]
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: "white"
              }
            },
            type: "value"
          }
        ],
        series: [
          {
            name: "走势",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [
              920,
              332,
              301,
              334,
              390,
              330,
              null,
              null,
              null,
              null,
              null,
              null
            ]
          },
          {
            name: "预测",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              334,
              390,
              330,
              320,
              332
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
canvas {
  width: 100% !important;
  height: 100% !important;
  left: -6px !important;
}
/* #flow{
  width: 470px;
  height: 240px;
} */
.main-id {
  width: 470px;
  height: 270px;
}
  .timeStamp{
    position: absolute;
    left: 6%;
    font-size: 16px;
    top: 10%;
    color: #ffffff;
    text-align: right;
  }
</style>
