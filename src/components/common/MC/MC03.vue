
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">平均温度</div>
      <div :id="mcId" class="main-id">
        <div class="none-data" id="chart-id">
          <!--&lt;!&ndash;暂无信息&ndash;&gt;模块三-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC03",
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
      let chartInit = this.$echarts.init(document.getElementById('chart-id'));

      // 配置项
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'
          },
          // 数据结构需要修改
          data: ['1', '2', '3', '4', '5', '6', '7']
        },

        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          }
        },

        color: ['#B88BE0'],

        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 500],
            type: 'line',
            smooth: true,
            symbol: 'none',
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

      chartInit.setOption(option)
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
  width: 98%;
  height: 110%;
}
</style>
