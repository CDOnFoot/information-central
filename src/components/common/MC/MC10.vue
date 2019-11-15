
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <!-- <div class="timeStamp">展示时间：{{timeStamp}}</div> -->
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
      timeStamp:""
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
  destroyed: function() {
    //页面销毁时关闭
    window.clearInterval(this.dataRef);
    if(this.mc){
      this.mc.clear();
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
        self.initChart("update");
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
      this.$http.get(self.$api.passengerEntryExitTopTen, param).then(res => {
        //调取数据成功
        if (res.data) {
          if (res.data.code === "0") {
            let arr = []; 
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
        // 基于准备好的dom，初始化echarts实例
         if(obj){
          self.mc = self.$echarts.init(obj);
         }
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["各站进站人数", "各站出站人数"],
            textStyle: {
                //图例文字的样式
                color: "white"
              },
            right:"5%",
            top:'5%'
          },
          grid: {
            left: "3%",
            right: "12%",
            bottom: "9%",
            containLabel: true
          },
          xAxis: {
            name: "(人次)",
            type: "value",
            axisLine: {
                lineStyle: {
                  color: "white"
                }
              },
          },
          yAxis: {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日","周日","周日","周日"],
            axisLine: {
                lineStyle: {
                  color: "white"
                }
              },
          },
          series: [
            {
              name: "各站进站人数",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "insideRight"
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320,320,320,320],
              itemStyle: {
                normal: {
                      barBorderRadius:[0, 10, 10, 0],
                     color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0,color: '#207d98'}, {offset: 1,color: '#40e6ec'}]),
                   }
              },
            },
            {
              name: "各站出站人数",
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "insideRight"
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210,210,210,210],
              itemStyle: {
                normal: {
                      barBorderRadius:[10, 10, 10, 10],
                     color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0,color: '#ff9b0a'}, {offset: 1,color: '#fffb83'}]),
                     lable:{textStyle:{color: '#fff'}},
                   }
              },
            }
          ]
        }; 
       

        if(obj){
          option.yAxis.data = paramData.station.reverse();
          option.series[0].data = paramData.entryNumPeople.reverse();
          option.series[1].data = paramData.exitNumPeople.reverse();
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

      if(obj){
        option.yAxis.data = paramData.station.reverse();
        option.series[0].data = paramData.entryNumPeople.reverse();
        option.series[1].data = paramData.exitNumPeople.reverse();
        self.mc.setOption(option);
        
      }
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
  width: 470px;
  height: 300px;
  margin: 1% 0 0 2%;
}
.timeStamp{
  position: absolute;
  right: 8%;
  font-size: 14px;
  top: 12%;
  color: #ffffff;
  text-align: right;
}
</style>
