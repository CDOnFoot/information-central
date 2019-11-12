
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

export default {
  name: "MC03",
  data() {
    return {
      mcList: "",
      timeInterval: "",
      timeStamp: "",
      mc:'',
      dataRef:"",   //定点刷新
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
    this.mcList = this.$common.mcList;
     // 初始化客流走势/预测数据信息
    this.initChart('init');
    var timeStamp=1573056120000;  //11月6日凌晨d点02分的毫秒数
    var dayMins = 900000;   //15分钟
    var setIntervalMins = 1000*30  //30秒
    self.dataRef = setInterval(()=>{
      // console.log(new Date())
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        // console.log("15分钟定点刷新")
        self.initChart('init');
      }
    },setIntervalMins)
  },
  created() {
    
  },
  beforeDestroy () {
    if(this.mc){
      this.mc.clear();
    }
  },
  methods: {
      // 查看可视化界面内容数据信息
    initChart:function(type){
      let self = this;
      this.chartInfo(function(data){
        self.chartInfoList(data,type);
      },type)
    },
    chartInfo:function(callback,type){
      let self = this;
      let param={
        };
      this.$http.get(self.$api.getPassenger, param).then(res =>{
        //调取数据成功
        if(res.data){
          if (res.data.code === "0") {
            callback(res.data.data,type)
          }else{
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    chartInfoList:function(data,type){
      this.timeStamp = data.time;
      this.drawLine(data,type);
    },

    drawLine(paramData,type) {
      let self = this;
      let option=null;
      let obj = document.getElementById(self.mcId);

      if(type==='init'){
        // 基于准备好的dom，初始化echarts实例
        if(obj){
          this.mc= this.$echarts.init(obj);
        }
      // 绘制图表
      option= {
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
            // stack: "总量",
            label: {
              // normal: {
              //   show: true,
              //   position: "top",
              //   // color:'#fff'
              // }
            },
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
            // stack: "总量",
            
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
      };
     

      if(obj){
         // 动态放置数据
        option.xAxis[0].data = paramData.timeList;
        option.series[0].data = paramData.realTimeList;
        option.series[1].data = paramData.forecastList;
        self.timeStamp = paramData.queryTime;
        // console.info(self.mc);
        self.mc.setOption(option,true)
      }
      }else{
        //更新刷新记录信息
        self.refreshData(paramData);
      }
    },
    // 数据刷新
    refreshData:function(paramData){
      let self = this;
      let option = (self.mc).getOption();
      option.xAxis[0].data = paramData.time;
      option.series[0].data = paramData.realTimeList;
      option.series[1].data = paramData.forecastList;
      self.timeStamp = paramData.queryTime;
      self.mc.setOption(option);    
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
  height: 270px;
}
.timeStamp{
  position: absolute;
  right: 10%;
  font-size: 16px;
  top: 10%;
  color: #ffffff;
  text-align: right;
}
</style>
