
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
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">平均湿度</div>
     <!-- <div class="module-icon">
       <img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">
     </div> -->
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-id-3">
          <!--模块七-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import echarts from "echarts";

export default {
  name: "MC07",
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
    this.initChart()
  },

  created() {},

  methods: {
    initChart () {
      let chartInit = this.$echarts.init(document.getElementById('chart-id-3'));
      const that = this;
      const pointsList = JSON.parse(that.$store.getters.getPointsList);

      // 横轴模板数据 - 日期
      /*const dateTemplate = new Date();
      const date_0 = dateTemplate.getDate() + "日";
      const date_1 = dateTemplate.getDate() - 1 + "日";
      const date_2 = dateTemplate.getDate() - 2 + "日";
      const date_3 = dateTemplate.getDate() - 3 + "日";
      const date_4 = dateTemplate.getDate() - 4 + "日";
      const date_5 = dateTemplate.getDate() - 5 + "日";
      const date_6 = dateTemplate.getDate() - 6 + "日";*/
      const date_0 = "多功能传感器-1-", value_0 = pointsList[7].pointValue;
      const date_1 = "多功能传感器-2-", value_1 = pointsList[28].pointValue;
      const date_2 = "多功能传感器-3-", value_2 = pointsList[49].pointValue;
      const date_3 = "温湿度传感器-1-", value_3 = pointsList[385].pointValue;
      const date_4 = "温湿度传感器-2-", value_4 = pointsList[408].pointValue;
      const date_5 = "温湿度传感器-3-", value_5 = pointsList[431].pointValue;
      // const date_6 = "风冷空调", value_6 = pointsList[633].pointValue;

      let option = {
        // 提示框
        tooltip: {
          trigger: 'item',
          // backgroundColor: '',
          // borderColor: '',
          axisPointer: {
            type: 'line'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff',
            // rotate: -40
            formatter: function (value, index) {
              let ret = "";
              const maxLength = 3, valueLength = value.length;
              const rowTimes = Math.ceil(valueLength/maxLength);
              if (rowTimes > 1) {
                for (let i=0;i<rowTimes;i++) {
                  let temp = "";
                  const start = i * maxLength;
                  const end = start + maxLength;

                  temp = value.substring(start, end) + "\n";
                  ret += temp;
                }
                return ret;
              } else {
                return value;
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          // 数据结构需要修改
          data: [date_0, date_1, date_2, date_3, date_4, date_5]
        },

        yAxis: {
          name: '%RH',
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
        },

        color: ['#B88BE0'],

        series: [
          {
            data: [value_0, value_1, value_2, value_3, value_4, value_5],
            type: 'line',
            smooth: true,
            // symbol: 'none',
            // 折线样式
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
  background: #60dbff;
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
.main-id{
  width: 100%;
  height: 100%;
  position: relative;
}
.none-data{
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
  width: 100%;
  height: 97%;
}
</style>
