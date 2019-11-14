
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="timeStamp">展示时间：{{timeStamp}}</div>
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { setInterval } from "timers";

export default {
  name: "MC02",
  data() {
    return {
      mcList: "",
      mc: "",
      dataRef: "",
      timeStamp: ""
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
    window.clearInterval(this.dataRef)
    var self = this;
    self.mcList = this.$common.mcList;
    self.initChart("init");
    var timeStamp=1573056120000;  //11月6日凌晨d点02分的毫秒数
    var dayMins = 900000;   //15分钟
    var setIntervalMins = 1000*30  //30秒
    self.dataRef = setInterval(()=>{
      // console.log(new Date())
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        // console.log("15分钟定点刷新")
        self.initChart("init");
      }
    },setIntervalMins)

  },
  created() {},
  methods: {
    // 查看可视化界面内容数据信息
    initChart: function(type) {
      let self = this;
      this.chartInfo(function(data) {
        self.chartInfoList(data, type);
      }, type);
    },
    chartInfo: function(callback, type) {
      let self = this;
      let param = {};
      this.$http.get(self.$api.getpassengerflowrealtime, param).then(res => {
        //调取数据成功
        if (res.data) {
          if (res.data.code === "0") {
            self.timeStamp = res.data.data.date;
            callback(res.data.data, type);
          } else {
             // this.$message.error(res.data.msg);
              console.log(res.data.msg);
          }
        }
      });
    },
    chartInfoList: function(data, type) {
      this.drawLine(data, type);
    },
    drawLine(paramData, type) {
      let self = this;
      let option = null;
      let obj = document.getElementById(self.mcId);
      
      if (type === "init") {
        if(obj){
          self.mc = self.$echarts.init(obj);
         }
        // 基于准备好的dom，初始化echarts实例
        // self.mc = self.$echarts.init(document.getElementById(self.mcId));
        option = {
          color: ["#fdbb5b", "#278fad"],
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["进站人数", "出站人数"],
            textStyle: {
                //图例文字的样式
                color: "white"
              },
            right:"10%",
            // top:'5%'
          },

          calculable: true,
          xAxis: [
            {
              type: "category",
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              },
              data: [
                "金鼎山北路站",
                "金桂街站",
                "金川路站",
                "菊花村站",
                "菊华站",
                "苏家塘站",
                
              ],
              axisLabel: {
                show: true,
                interval: 0,
                rotate: -35
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              },
            }
          ],
          series: [
            {
              name: "进站人数",
              type: "bar",
              data: [
                "94",
                "6",
                "54",
                "12",
                "38",
                "98",
               
              ],
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            },
            {
              name: "出站人数",
              type: "bar",
              data: [
                "30",
                "37",
                "28",
                "69",
                "92",
                "58",
                "47"
              ],
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        };
        if(obj){
            // console.log(paramData)
          option.xAxis[0].data = paramData.stationName;
          option.series[0].data = paramData.flowsin;
          option.series[1].data = paramData.flowsout;
          // console.log(option)
          self.mc.setOption(option);
          }
      } else {
        //更新刷新记录信息
        self.refreshData(paramData);
      }
    },
    //更新数据方法
    refreshData(paramData) {
      let self = this;
      let option = self.mc.getOption();
      console.log(paramData);
      console.log(option.series);
      var serLast = option.series[option.series.length - 1];
      option.series = [serLast];
      option.dataset[0].source = paramData;
      for (var i = 1; i < paramData.length; i++) {
        option.series.unshift({
          type: "line",
          smooth: true,
          seriesLayoutBy: "row"
        });
      }
      console.log(option.series);
      self.mc.setOption(option);
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

canvas {
  width: 100% !important;
  height: 100% !important;
  left: -6px !important;
}
.main-id {
  width: 1000px;
  height: 300px;
  /* margin: 1% 0 0 0; */
}
.timeStamp {
  position: absolute;
  left: 40%;
  top: 5%;
  font-size: 14px;
  
  color: #ffffff;
  text-align: right;
}
</style>
