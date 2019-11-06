
<template>
  <!--    能耗排行/模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="timeStamp">{{timeStamp}}</div>
      <div class="change-time">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">昨日</a-menu-item>
            <a-menu-item key="2">近7天</a-menu-item>
            <a-menu-item key="3">近30天</a-menu-item>
          </a-menu>
          <a-button class="change-btn"> 筛选日期 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </div>
        <!-- <a-radio-group @change="handleChange" v-model="valueTime" class="timeChange">
          <a-radio :value="1">过去一天</a-radio>
          <a-radio :value="2">过去7天</a-radio>
          <a-radio :value="3">过去30天</a-radio>
        </a-radio-group> -->
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "MC01",
  data() {
    return {
      timeInterval: "",
      timeStamp: "",
      mcList: "",
      valueTime:1,
      mc:""
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

    // 定时器刷新
    clearInterval(this.timeInterval);
    // this.timeInterval = setInterval(function() {
    //   self.initChart(self.valueTime,'update');
    // }, 1000 * 30);

    var self = this;
    this.mcList = this.$common.mcList;

    // 初始化能耗排行数据信息
    this.initChart(this.valueTime,'init');
    var timeStamp=1572980400000;  //11月6日凌晨3点的毫秒数
    var dayMins = 86400000;   //每天的毫秒数
    var setIntervalMins = 1000*60  //定时器刷新的时间间隔
    setInterval(()=>{
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        console.log("凌晨三点定时刷新数据")
        self.initChart(self.valueTime,'update');
      }
    },setIntervalMins)
  },
  created() {

  },
  methods: {
     handleMenuClick(e) {
        console.log('click', e.key);
        this.initChart(e.key);
      },
    //下拉框change事件
    // handleChange(e){
    //   // 动态获取能耗排行数据信息
    //   let self = this;
    //   this.initChart(e.target.value);
    //   // this.refreshData();
    // },
    // 查看可视化界面内容数据信息
    initChart:function(dateType,type){
      let self = this;
      this.chartInfo(function(data){
        self.chartInfoList(data,type);
      },dateType,type)
    },
    chartInfo:function(callback,dateType,type){
      let self = this;
      let param={
        queryType: dateType
        };
      this.$http.post(self.$api.getEnergytopten, param).then(res =>{
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
      let option= null;
      // 基于准备好的dom，初始化echarts实例
      if(type==='init'){
      this.mc = this.$echarts.init(document.getElementById(self.mcId));
      //初始化option
        option={
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            show: false
          },
          toolbox: {
            show: true,
            top:'15%',
            feature: {
              dataView: {
                show: true, 
                readOnly: true,
                lang:['数据视图', '关闭','']
                }
            },
            iconStyle: {
              normal: {
                color: "white", //设置颜色
                top: "50%",
              }
            }
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
              "大树营站"
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
                101231
              ]
            }
          ]
        };
      // 动态放置数据
        option.series[0].data = paramData.energy;
        option.yAxis.data = paramData.station;
        self.mc.setOption(option,true)

      }else{
        //更新刷新记录信息
        self.refreshData(paramData);
      }
    },
      // 数据刷新
    refreshData:function(paramData){
      let self = this;
      let option = (self.mc).getOption();
      option.series[0].data = paramData.energy;
      option.yAxis.data = paramData.station;
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
  height: 258px;
  margin: 0 auto;
}
.ant-radio-wrapper{
  color:#ffffff;
}
.timeStamp{
    position: absolute;
    right: 44%;
    font-size: 14px;
    top: 7%;
    color: #ffffff;
    text-align: right;
}
.change-time{
    color: #fff;
    position: absolute;
    right: 26%;
    top: 7%;
    font-size: 14px;
    z-index: 19;
    background: transparent;
}
.change-btn{
    width: 80px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    background: transparent;
    color: #fff;
    border: #fff;
    padding: 0;
}
</style>



           
          