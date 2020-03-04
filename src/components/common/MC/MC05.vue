
<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">设备信息</div>
      <div class="module-icon">
        <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">-->
        <!--<img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-id-1">
          <!--模块五-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MC11",
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
      getDeviceInfo () {},
      initChart () {
        let chartInit = this.$echarts.init(document.getElementById('chart-id-1'));

        /*const option = {
          // 提示框
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },

          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          xAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },

          yAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            data: ['电力设备', '消防设备', '暖通设备', '其他设备', '通信正常', '通信异常', '报警设备']
          },

          series: [
            {
              // name: '直接访问',
              type: 'bar',
              stack: '总量',
              color: '#34abff',
              label: {
                show: false,
                position: 'insideRight'
              },
              data: [3, 2, 4, 3, 12, 0, 0]
            }
          ]
        };*/
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          /*legend: {
            orient: 'vertical',
            left: 10,
            data: ['异常', '正常',  'PDU800', 'UPS5000', '温湿度传感器', '门禁执行器', '水浸传感器', '交流执行器', '行级风冷空调']
          },*/
          series: [
            {
              name: '通信状态',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                position: 'inner'
              },
              labelLine: {
                show: false
              },
              data: [
                // {value: 6, name: '异常', selected: true},
                {value: 30, name: '正常'}
              ]
            },
            {
              name: '通信状态',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 6,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 13,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              data: [
                {value: 2, name: 'PDU800'},
                // {value: 4, name: 'UPS5000'},
                {value: 3, name: '温湿度传感器'},
                {value: 3, name: '多功能传感器'},
                {value: 2, name: '门禁执行器'},
                {value: 2, name: '行级风冷空调'},
                {value: 2, name: '交流执行器'},
                {value: 2, name: '天窗执行器'},
                {value: 1, name: '水浸传感器'}
              ]
            }
          ]
        };

        chartInit.setOption(option);
        /*setInterval(() => {
          chartInit.clear();
          chartInit.setOption(option);
        }, 10000)*/
      }
    }
  };
</script>

<style scoped>
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
    height: 100%;
  }
</style>
