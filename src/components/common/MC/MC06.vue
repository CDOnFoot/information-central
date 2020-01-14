
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
     <div class="main111">
        <!-- <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div> -->
      </div>
      <div class="borde">{{mcTitle}}</div>
     <!-- <div class="module-icon">
       <img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">
     </div> -->
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-id-2">
          <!--模块六-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import echarts from "echarts";

export default {
  name: "MC06",
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
      let chartInit = this.$echarts.init(document.getElementById('chart-id-2'));

      let option = {
        // color: ['#3398DB'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : ['执行器', '执行器', '传感器', '监测器', '转换器', '采集器'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          }
        ],
        series : [
          {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330],
            itemStyle: {
                normal: {
                      barBorderRadius:[10, 10, 0, 0],
                     color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{offset: 0,color: '#ff9b0a'}, {offset: 1,color: '#fffb83d9'}]),

                    //  color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [{offset: 0,color: '#ff9b0a'}, {offset: 1,color: '#fffb83a0'}]),
                     lable:{textStyle:{color: '#fff'}},
                   }
              },
          }
        ]
      };

      chartInit.setOption(option);
      setInterval(() => {
        chartInit.clear();
        chartInit.setOption(option);
      }, 10000)
    }
  }
};
</script>

<style scoped>
.main111 {
    margin-left: 56%;
    height: 15px;
    width: 110px;
    background: url('../../../assets/img/loading.png');
  }

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
  padding-top: 6px;
  width: 98%;
  height: 98%;
}
</style>
