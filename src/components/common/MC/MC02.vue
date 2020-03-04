<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">利用率排行</div>
      <div class="module-icon">
        <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
        <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span style="font-size: 14px">{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-0"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MC02",
    data() {
      return {};
    },
    props: ["mcStatus", "mcTitle", "mcId"],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        console.log(this.mcTitle);
        this.mcTitle = val;
      },
      mcId: function (val) {
        this.mcId = val;
      }
    },
    created() {
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        let chartInit = this.$echarts.init(document.getElementById('chart-0'));

        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 20,
          onChange: function () {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            };
            chartInit.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            });
          }
        };

        let labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          // formatter: '{c}  {name|{a}}',
          fontSize: 12,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        };

        let option = {
          // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          // color: ['#ff9745', '#a859ff', '#34abff', '#6b89ff', '#006699'],
          color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#9287e7'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '115px',
            y: '20px',
            textStyle: {
              color: '#ffffff',
            },
            data: ['TOP1', 'TOP2', 'TOP3', 'TOP4', 'TOP5']
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          grid: {
            left: '10%',
            right: '6%',
            top: '20%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#fff',
                }
              },
              axisLabel: {    //底部文字倾斜
                interval: 0,
                rotate: 15
              },
              data: ['云计算CPU利用率', '云计算内存利用率', '云计算存储利用率', '云桌面CPU利用率', '云桌面内存利用率', '云桌面存储利用率']
            }

          ],
          yAxis: [
            {
              type: 'value',
              name: '利用率（%）',
              axisLine: {
                lineStyle: {
                  color: '#fff'
                },
              },
            }
          ],
          series: [
            {
              name: 'TOP1',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: [31, 22, 26, 23, 43, 21]
            },
            {
              name: 'TOP2',
              type: 'bar',
              label: labelOption,
              data: [24, 20, 23, 21, 38, 17]
            },
            {
              name: 'TOP3',
              type: 'bar',
              label: labelOption,
              data: [23, 17, 14, 17, 37, 8]
            },
            {
              name: 'TOP4',
              type: 'bar',
              label: labelOption,
              data: [15, 14, 11, 9, 32, 7]
            },
            {
              name: 'TOP5',
              type: 'bar',
              label: labelOption,
              data: [13, 7, 7, 32, 9, 5]
            }
          ]
        };

        chartInit.setOption(option);

        setInterval(() => {
          const value = Math.random() * 100;
          chartInit.clear();
          chartInit.setOption(option);
        }, 10000);
      }
    }
  };
</script>

<style scoped>
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
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }
</style>
