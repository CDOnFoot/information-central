<template>
  <div class="content">
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">旁路</div>
        <div id="chart1" class="mk-chart">
          <div class="number">
            000V
          </div>
          <div class="title">
            相电压
          </div>
        </div>
        <div id="chart2" class="mk-chart">
          <div class="number">
            000V
          </div>
          <div class="title">
            频率
          </div>
        </div>
      </div>
    </div>
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">电池</div>
        <div id="chart3" class="mk-chart">
        </div>
      </div>
    </div>
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">输入</div>
        <div id="chart4" class="mk-chart">
        </div>
      </div>
    </div>
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">输出</div>
        <div id="chart5" class="mk-chart">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "view",
    data() {
      return {
        devtype: '',
      };
    },
    props: ['devType'],
    watch: {
      devType: function (val) {
        this.devtype = val;
        // console.log(this.devtype);
      }
    },
    mounted() {
      this.initPage();
    },
    methods: {
      initPage() {
        this.initChart1();
        this.initChart2();
        this.initChart3();
        this.initChart4();
        this.initChart5();
      },
      initChart1() {

      },
      initChart2() {

      },
      initChart3() {
        let chartInit = this.$echarts.init(document.getElementById('chart3'));

        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['执行器', '执行器', '传感器', '监测器', '转换器', '采集器'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330]
            }
          ]
        };

        chartInit.setOption(option)
      },
      initChart4() {
        let chartInit = this.$echarts.init(document.getElementById('chart4'));

        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['执行器', '执行器', '传感器', '监测器', '转换器', '采集器'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330]
            }
          ]
        };

        chartInit.setOption(option)
      },
      initChart5() {
        let chartInit = this.$echarts.init(document.getElementById('chart5'));

        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['执行器', '执行器', '传感器', '监测器', '转换器', '采集器'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330]
            }
          ]
        };

        chartInit.setOption(option)
      },
    },
  };

</script>

<style scoped>
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .mk {
    width: 50%;
    height: 50%;
    float: left;
    position: relative;
    /*background: url("../../../../assets/img/sub-border-l.png") no-repeat center;*/
  }

  .mk-bg {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  .mk-container {
    width: 84%;
    height: 84%;
    position: absolute;
    top: 8%;
    left: 8%;
  }

  .mk-chart {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  #chart1 {
    width: 50%;
    background: url("../../../../assets/img/enterPel.png") no-repeat;
    font-size: 20px;
    /* font-size: 1.5rem; */
    background-position: center;

  }

  #chart2 {
    width: 50%;
    left: 50%;
    background: url("../../../../assets/img/outPel.png") no-repeat;
    font-size: 20px;
    /* font-size: 1.5rem; */
    background-position: center;
  }

  .number {
    width: 100%;
    text-align: center;
    color: #ffffff;
    position: absolute;
    top: 45%;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 22px;
    position: absolute;
    bottom: -10px;
  }
</style>
