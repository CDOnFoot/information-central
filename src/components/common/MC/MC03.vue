
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
      return {
        statusContainer_2: ''
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
      initChart() {
        let chartInit = this.$echarts.init(document.getElementById("chart-id"));
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
        const date_0 = "多功能传感器1", value_0 = pointsList[208].pointValue;
        const date_1 = "多功能传感器2", value_1 = pointsList[229].pointValue;
        const date_2 = "多功能传感器3", value_2 = pointsList[250].pointValue;
        const date_3 = "温湿度传感器1", value_3 = pointsList[587].pointValue;
        const date_4 = "温湿度传感器2", value_4 = pointsList[610].pointValue;
        const date_5 = "温湿度传感器3", value_5 = pointsList[633].pointValue;
        const date_6 = "PUD8000", value_6 = pointsList[633].pointValue;

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
            data: [date_0, date_1, date_2, date_3, date_4, date_5]
          },

          yAxis: {
            name: '℃',
            type: "value",
            /*min: -20,
            max: 50,*/
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
              data: [value_0, value_1, value_2, value_3, value_4, value_5],
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
                width: 3,
              },
              // 区域填充样式
              areaStyle: {
                // opacity: 0.2,
                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                      offset: 0, color: '#fdb751' // 0% 处的颜色
                    }, {
                      offset: 0.4, color: '#fdb751b0'
                    }, {
                      offset: 1, color: '#141e3f' // 100% 处的颜色
                    }]
                  ),
                },
              }
            }
          ]
        };

        chartInit.setOption(option);
        setInterval(() => {
          chartInit.clear();
          chartInit.setOption(option);
        }, 4000)
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
    height: 100%;
  }
</style>
