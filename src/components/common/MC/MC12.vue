
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { setInterval } from "timers";

export default {
  name: "MC12",
  data() {
    return {
      mcList: "",
      mc: "",
      dataRef: ""
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
    var self = this;
    this.mcList = this.$common.mcList;
    this.initChart("init");
    var timeStamp = 1573066800000; //11月7日凌晨3点的毫秒数
    var dayMins = 86400000; //每天的毫秒数
    var setIntervalMins = 1000 * 30; //定时器刷新的时间间隔
    window.clearInterval(this.dataRef);
    self.dataRef = setInterval(() => {
      let currwntTime = Date.now();
      let minsMore = (currwntTime - timeStamp) % dayMins;
      if (minsMore > 0 && minsMore <= setIntervalMins) {
        //(当前时间-固定时间)对每日毫秒数 取余
        self.initChart("init");
      }
    }, setIntervalMins);
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
      this.$http.get(self.$api.energyVehicleTimes, param).then(res => {
        //调取数据成功
        if (res.data) {
          if (res.data.code === "0") {
            callback(res.data.data);
          } else {
              // this.$message.error(res.data.msg);
              console.log(res.data.msg);
          }
        }
      });
    },
    chartInfoList: function(data) {
      this.drawLine(data);
    },
    drawLine(paramData) {
      let self = this;
      let option = null;
      let obj = document.getElementById(self.mcId);
      if(obj){
        self.mc = self.$echarts.init(obj);
      }
        option = {
           legend: {
             data: ["全线单日总能耗", "全线单日发车车辆次"],
              textStyle: {
                //图例文字的样式
                color: "white"
              },
              top: "top",
              right:"10%"
            },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'axis',
                crossStyle: {
                    color: '#999',
                }
            }
        },
          xAxis: [
            {
              type: "category",
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              },
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
              ],
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "能耗(kwh)",
              // min: 0,
              // max: max,
              // interval: Math.ceil(max / 5),
              splitNumber:5,
              axisLabel: {
                formatter: "{value}"
              },
              splitLine:{
                show:false    //去掉网格线
                },
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              }
            },
            {
              type: "value",
              name: "车辆次(车次)",
              // min: 0,
              // max: 25,
              // interval: 5,
              splitNumber:5,
              axisLabel: {
                formatter: "{value}"
              },
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              },
              splitLine:{
                show:false    //去掉网格线
                },
            }
          ],
          series: [
            {
              name: "全线单日总能耗",
              type: "bar",
              data: [
                2.0,
                4.9,
                7.0,
                23.2,
                25.6,
                76.7,
                135.6,
                162.2,
                32.6,
                20.0,
                6.4,
                3.3
              ]
            },

            {
              name: "全线单日发车车辆次",
              type: "line",
              lineStyle:{
                color: "white"
              },
              yAxisIndex: 1,
              data: [
                2.0,
                2.2,
                3.3,
                4.5,
                6.3,
                10.2,
                20.3,
                23.4,
                23.0,
                16.5,
                12.0,
                6.2
              ]
            }
          ]
        };
      if(obj){
        option.xAxis[0].data = paramData.date;
        option.series[0].data = paramData.oneDayTotalEnergy;
        option.series[1].data = paramData.oneDayVehicleTimes;
        self.mc.setOption(option);
      }
       
      
    },
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
  width: 470px;
  height: 300px;
  margin: 4% 0 0 2%;
}
</style>
