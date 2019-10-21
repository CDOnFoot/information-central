
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div id="flow" :style="{width: '470px', height: '240px',margin:'0px 10px'}"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC03",
  data() {
    return {
        mcList:'',
        mcId:'',
      };
    },
    props:['mcStatus','mcTitle'],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        this.mcTitle = val;
      }
    },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;
    console.log(this.mcStatus);
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;

    this.drawLine();
  },
  created() {},
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let flow = this.$echarts.init(document.getElementById("flow"));
      // 绘制图表
      flow.setOption({
           title: {
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
      textStyle: {
            //图例文字的样式
            color: "white"
          },
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
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
                     axisLine: {
            lineStyle: {
              color: "white"
            }
          },
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
                     axisLine: {
            lineStyle: {
              color: "white"
            }
          },
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
      });
    }
  }
};
</script>

<style scoped>
.main {
  /* background: rgba(78, 58, 58, 0.411); */
  color: #ffffff;
  padding: 10px;
}
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  padding-left: 10px;
  margin: 0px 0px 0px 30px;
}
</style>
