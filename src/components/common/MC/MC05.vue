
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

        const option = {
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
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [3, 2, 4, 3, 12, 0, 0]
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
    width: 98%;
    height: 90%;
  }
</style>
