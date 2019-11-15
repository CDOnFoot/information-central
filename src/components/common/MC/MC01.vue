
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
      mc:"",
      dataRef:''
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
  beforeDestroy () {
    if(this.mc){
      this.mc.clear();
    }
  },
  mounted() {
    window.clearInterval(this.dataRef)
    var self = this;
    this.mcList = this.$common.mcList;

    // 初始化能耗排行数据信息
    this.initChart(this.valueTime,'init');

    var timeStamp=1573066800000;  //11月7日凌晨3点的毫秒数
    var dayMins = 86400000;   //每天的毫秒数
    var setIntervalMins = 1000*30  //定时器刷新的时间间隔
    self.dataRef = setInterval(()=>{
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        self.initChart(self.valueTime,'update');
      }
    },setIntervalMins)
  },
  created() {

  },
   destroyed: function() {
    //页面销毁时关闭
    window.clearInterval(this.dataRef);
    if(this.mc){
      this.mc.clear();
    }
  },
  methods: {
     handleMenuClick(e) {
        // console.log('click', e.key);
        this.initChart(e.key);
      },
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
            // this.$message.error(res.data.msg);
            console.log(res.data.msg);
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
      let obj = document.getElementById(self.mcId);
      if(type==='init'){
        if(obj){
          this.mc = this.$echarts.init(obj);
        }
      //初始化option
        option={
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
          },
          legend: {
            show: false
          },
          // toolbox: {
          //   show: true,
          //   top:'15%',
          //   feature: {
          //     dataView: {
          //       show: true, 
          //       readOnly: true,
          //       lang:['数据视图', '关闭','']
          //       }
          //   },
          //   iconStyle: {
          //     normal: {
          //       color: "white", //设置颜色
          //       top: "50%",
          //     }
          //   }
          // },
          grid: {
            left: "3%",
            right: "10%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            name:"(kwh)",
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
              ],
               itemStyle: {
                normal: {
                  barBorderRadius:[0, 10, 10, 0],
                  //每根柱子颜色设置
                //  color: function(params) {
                //      let colorList = [
                //          "#c23531",
                //          "#2f4554",
                //          "#61a0a8",
                //          "#d48265",
                //          "#91c7ae",
                //          "#749f83",
                //          "#ca8622",
                //          "#bda29a",
                //          "#6e7074",
                //          "#546570",
                //      ];
                //      return colorList[params.dataIndex];
                //  }
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0,color: '#207d98'}, {offset: 1,color: '#40e6ec'}]),
                }
            },
            }
          ]
        };
      // 动态放置数据
       
        if(obj){
          option.series[0].data = paramData.energy;
          option.yAxis.data = paramData.station;
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
      let option = null;
      let obj = document.getElementById(self.mcId);
      if(obj){
        option = (self.mc).getOption();
        option.series[0].data = paramData.energy;
        option.yAxis.data = paramData.station;
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
  /* width: 40rem;
  height: 22rem; */
  width: 470px;
  height: 258px;

  margin: 0 auto;
}
.ant-radio-wrapper{
  color:#ffffff;
}
.timeStamp{
    position: absolute;
    right: 23%;
    font-size: 14px;
    top: 7%;
    color: #ffffff;
    text-align: right;
}
.change-time{
    color: #fff;
    position: absolute;
    right: 5%;
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



           
          