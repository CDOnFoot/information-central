
<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <div class="main111">
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="borde">{{mcTitle}}</div>
      <!-- <div class="module-icon">
       <img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">
      </div>-->
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-id">
          <!--&lt;!&ndash;暂无信息&ndash;&gt;模块三-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC03",
  data() {
    return {};
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
    initChart() {
      let chartInit = this.$echarts.init(document.getElementById("chart-id"));

      // 配置项
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          // 数据结构需要修改
          data: ["1", "2", "3", "4", "5", "6", "7"]
        },

        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff"
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },

        color: ['#fdb751'],

        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 500],
            type: "line",
            smooth: true,
            // symbol: "none",
            // itemStyle: {
            //   color: "#6A5ACD",
            //   normal: {
            //     lineStyle: {
            //       // 系列级个性化折线样式
            //       width: 3,
            //       type: "solid",
            //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         {
            //           offset: 0,
            //           color: "#ffb648"
            //         },
            //         {
            //           offset: 1,
            //           color: "#ff7ae1"
            //         }
            //       ]) //线条渐变色
            //     }
            //   },
            // }, 
            // 区域填充样式
            // areaStyle: {
              // opacity: 0.2
              // normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "rgba(80,141,255,0.39)"
                //   },
                //   {
                //     offset: 0.34,
                //     color: "rgba(56,155,255,0.25)"
                //   },
                //   {
                //     offset: 1,
                //     color: "rgba(38,197,254,0.00)"
                //   }
                // ])
              // }
            // }
            lineStyle: {
              width: 3
            },
            // 区域填充样式
            areaStyle: {
              opacity: 0.2
            }
          }
        ]
      };

      chartInit.setOption(option);
    }
  }
};
</script>

<style scoped>
.main111 {
  /* width: 90px;
			height: 90px;
			padding-top: 100px; */
}
.main111 a {
  display: block;
  text-align: center;
  font-size: 20px;
  margin-top: 200px;
}
.loading {
  /* width: 150px; */
  height: 15px;
  /* margin: 0 auto; */
  /* margin-top:100px; */
  margin-left: 150px;
  text-align: center;
  margin-top: -5px;
}
.loading span {
  display: inline-block;
  width: 8px;
  height: 66%;
  margin-right: 5px;
  background: #3374d0;
  -webkit-animation: load-data-v-536c2323 1.04s ease infinite;
  transform: skewX(50deg);
}
.loading span:last-child {
  margin-right: 0px;
}
@-webkit-keyframes load {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.loading span:nth-child(1) {
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.39s;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.52s;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.65s;
}
.main {
  color: #ffffff;
  padding: 1%;
  position: relative;
  width: 102.3%;
  height: 100.7%;
}
.main-id {
  width: 100%;
  height: 100%;
  position: relative;
}
.none-data {
  font-size: 14px;
  text-align: center;
  padding-top: 6px;
  width: 98%;
  height: 110%;
}
</style>
