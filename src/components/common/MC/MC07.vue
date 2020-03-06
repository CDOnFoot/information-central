
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">设备湿度</div>
      <div class="module-icon">
       <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
       <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <!--<span>{{this.$common.timestampToTime(pointValueContainer[7].pointTime)}}</span>-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
     </div>
      <div :id="mcId" class="main-id">
        <div class="choose-menu">
          <!-- 激活的菜单为 active 类 -->
          <!-- 使用 prevent 修饰符来防止连接在点击时发生跳转 -->
          <nav :class="active" @click.prevent>
            <a href="#" class="home" @click="makeActive('home')">一层</a>
            <a href="#" class="projects" @click="makeActive('projects')">二层</a>
          </nav>
        </div>

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
      pointValueContainer: ''
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
    // 初始化一个空的图表
    this.initChartForTemp('home')
  },

  created() {
    const that = this;
    // this.pointValueContainer = JSON.parse(that.$store.getters.getPointsList)
  },

  methods: {
    makeActive (item) {
      // this.active = item;
      this.initChartForTemp(item);
    },

    initChartForTemp (key) {
      // 创建 echarts 图表实例
      let chartInit = this.$echarts.init(document.getElementById('chart-id-3'));
      chartInit.clear();
      // 模拟数据
      let data0, data1, data2, data3, data4, data5;
      let legend, series, tooltip;
      if (key === 'home') {
        data0 = [47, 38, 29, 49, 40];
        data1 = [38, 56, 38, 58, 39];
        data2 = [39, 58, 49, 39, 57];

        data3 = [60, 89, 76, 56, 77];
        data4 = [87, 67, 56, 78, 67];
        data5 = [67, 76, 87, 57, 76];
        legend = {
          top: -5,
          // data: ['多功能1-温度', '多功能2-温度', '多功能3-温度', '多功能1-湿度', '多功能2-湿度', '多功能3-湿度'],
          data: [{
            name: '多功能传感器1'
          },{
            name: '多功能传感器2'
          },{
            name: '多功能传感器3'
          }],
          selectedMode: false,
          textStyle: {
            color: '#fff'
          }
        };

        series = [
          // 左边的数据
          {
            name: '多功能传感器1',
            type: 'line',
            symbol: 'emptyCircle',
            smooth: true,
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            /*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#ff9745'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*/
            data: data0
          },
          {
            name: '多功能传感器2',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            /*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#d68262'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*/
            data: data1
          },
          {
            name: '多功能传感器3',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            /*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#d68262'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*/
            data: data2
          },
          // 以右边轴为基准的数据
          {
            name: '多动能传感器1-湿度',
            type: 'line',
            symbol: 'emptyCircle',
            smooth: true,
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            /*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a859ff'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*/
            data: data3
          },
          {
            name: '多动能传感器2-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            /*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a859ff'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*/
            data: data4
          },
          {
            name: '多动能传感器3-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            /*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a859ff'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*/
            data: data5
          }
        ];

        tooltip = {
          trigger: 'axis',
          formatter: '{a0}-温度: {c0}℃<hr />{a1}-温度: {c1}℃<hr />{a2}-温度: {c2}℃<hr />{a3}: {c3}%RH<hr />{a4}: {c4}%RH<hr />{a5}: {c5}%RH<hr />'
        };
      } else {
        data0 = [30, 39, 40, 40, 38];
        data1 = [20, 50, 48, 47, 39];
        data2 = [39, 58, 49, 39, 57];

        data3 = [87, 76, 75, 64, 77];
        data4 = [65, 85, 87, 65, 79];
        data5 = [87, 75, 65, 58, 87];
        legend = {
          top: -5,
          data: ['风冷行级空调', '配电柜输出', '配电柜输入'],
          selectedMode: false,
          textStyle: {
            color: '#fff'
          }
        };

        series = [
          {
            name: '风冷行级空调',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            data: data0
          },{
            name: '配电柜输出',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            data: data1
          },{
            name: '配电柜输入',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            data: data2
          },{
            name: '风冷行级空调-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            data: data3
          },{
            name: '配电柜输出-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            data: data4
          },{
            name: '配电柜输入-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            data: data5
          }
        ];

        tooltip = {
          trigger: 'axis',
          formatter: '{a0}-温度: {c0}℃<hr />{a1}-温度: {c1}℃<hr />{a2}-温度: {c2}℃<hr />{a3}: {c3}%RH<hr />{a4}: {c4}%RH<hr />{a5}: {c5}%RH<hr />'
        };
      }

      const that = this;
      // const pointsList = JSON.parse(that.$store.getters.getPointsList);

      // 横轴模板数据 - 日期
      /*const dateTemplate = new Date();
      const date_0 = dateTemplate.getDate() + "日";
      const date_1 = dateTemplate.getDate() - 1 + "日";
      const date_2 = dateTemplate.getDate() - 2 + "日";
      const date_3 = dateTemplate.getDate() - 3 + "日";
      const date_4 = dateTemplate.getDate() - 4 + "日";
      const date_5 = dateTemplate.getDate() - 5 + "日";
      const date_6 = dateTemplate.getDate() - 6 + "日";*/

      /*const date_0 = "多功能传感器-1-", value_0 = pointsList[7].pointValue;
      const date_1 = "多功能传感器-2-", value_1 = pointsList[28].pointValue;
      const date_2 = "多功能传感器-3-", value_2 = pointsList[49].pointValue;
      const date_3 = "温湿度传感器-1-", value_3 = pointsList[385].pointValue;
      const date_4 = "温湿度传感器-2-", value_4 = pointsList[408].pointValue;
      const date_5 = "温湿度传感器-3-", value_5 = pointsList[431].pointValue;*/
      // const date_6 = "风冷空调", value_6 = pointsList[633].pointValue;

      const colorTemplate = ['#60acfc', '#32d3eb', '#9287e7', '#60acfc', '#32d3eb', '#9287e7'];

      const option = {
        tooltip,

        color: colorTemplate,

        /*legend: {
          // y: '20px',
          top: -5,
          data: ['多功能1-温度', '多功能2-温度', '多功能3-温度', '多功能1-湿度', '多功能2-湿度', '多功能3-湿度'],
          selectedMode: false,
          textStyle: {
            color: '#fff'
          }
        },*/
        legend,
        xAxis: [
          {
            type: 'category',
            name: '时间',
            boundaryGap: false,
            data: [0, 1, 2, 3, 4],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],

        yAxis: [
          {
            type: 'value',
            name: "温度（℃）",
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            nameTextStyle: {
              padding: [0, 10, 0, 0]
            }
          },
          {
            type: 'value',
            name: '湿度（%RH）',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            // 坐标轴 grid 中的刻度线
            splitLine: {
              show: false
            },
            nameTextStyle: {
              padding: [20, 0, 0, 30]
            }
          }
        ],

        // 曲线
        /*series: [
          // 左边的数据
          {
            name: '多功能1-温度',
            type: 'line',
            symbol: 'emptyCircle',
            smooth: true,
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            /!*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#ff9745'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*!/
            data: data0
          },
          {
            name: '多功能2-温度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            /!*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#d68262'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*!/
            data: data1
          },
          {
            name: '多功能3-温度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '0',
            /!*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#d68262'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*!/
            data: data2
          },
          // 以右边轴为基准的数据
          {
            name: '多功能1-湿度',
            type: 'line',
            symbol: 'emptyCircle',
            smooth: true,
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            /!*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a859ff'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*!/
            data: data3
          },
          {
            name: '多功能2-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            /!*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a859ff'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*!/
            data: data4
          },
          {
            name: '多功能3-湿度',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            showAllSymbol: true, //动画效果
            yAxisIndex: '1',
            /!*areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#a859ff'
              },{
                offset: 0.4,
                color: '#fdb751b0'
              },{
                offset: 1,
                color: '#838383'
              }])
            },*!/
            data: data5
          }
        ]*/
        series
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
  width: 95%;
  height: 97%;
}

a, a:visited {
  outline:none;
  color:#389dc1;
}

a:hover{
  text-decoration:none;
}

section, footer, header, aside, nav{
  display: block;
}

nav{
  display:inline-block;
  /*margin:60px auto 45px;*/
  margin: 0 0 0 130px;
  background-color: rgba(67, 192, 255, 0.29);
  box-shadow:0 1px 1px #ccc;
  border-radius:2px;
}

nav a{
  display:inline-block;
  padding: 12px 20px;
  color:#fff !important;
  font-weight:bold;
  font-size:10px;
  text-decoration:none !important;
  line-height:0.1;
  text-transform: uppercase;
  background-color:transparent;

  -webkit-transition:background-color 0.25s;
  -moz-transition:background-color 0.25s;
  transition:background-color 0.25s;
}

nav a:first-child{
  border-radius:2px 0 0 2px;
}

nav a:last-child{
  border-radius:0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact{
  background-color:#e35885;
}

p{
  font-size:22px;
  font-weight:bold;
  color:#7d9098;
}

p b{
  color:#ffffff;
  display:inline-block;
  padding:5px 10px;
  background-color:#c4d7e0;
  border-radius:2px;
  text-transform:uppercase;
  font-size:18px;
}
</style>
