<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">资源占用情况</div>
      <div class="module-icon">
        <!--<img src="../../../assets/img/main/module-information.png" alt="" width="23" height="23">
        <img src="../../../assets/img/main/module-save.png" alt="" width="23" height="23">-->
        <span>{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="module-area">
          <div class="module-area-title">
            <b>
              云计算
            </b>
          </div>
          <div class="module-area-data">
            <div class="none-data" id="chart-0">
              <a-progress type="circle" :percent="CloudComputing.CPU.percent" :format="percent => `${percent}% CPU`"
                          strokeWidth="10" :strokeColor="CloudComputing.CPU.strokeColor" width="86px"/>
              <div>
                {{CloudComputing.CPU.current}}/{{CloudComputing.CPU.total}} <span>核</span>
              </div>
            </div>
            <div class="none-data" id="chart-1">
              <a-progress type="circle" :percent="CloudComputing.MB.percent" :format="percent => `${percent}% 内存`"
                          strokeWidth="10" :strokeColor="CloudComputing.MB.strokeColor" width="86px"/>
              <div>
                {{CloudComputing.MB.current}}/{{CloudComputing.MB.total}} <span>MB</span>
              </div>
            </div>
            <div class="none-data" id="chart-2">
              <a-progress type="circle" :percent="CloudComputing.GB.percent" :format="percent => `${percent}% 存储`"
                          strokeWidth="10" :strokeColor="CloudComputing.GB.strokeColor" width="86px"/>
              <div>
                {{CloudComputing.GB.current}}/{{CloudComputing.GB.total}} <span>GB</span>
              </div>
            </div>
          </div>
        </div>
        <div class="module-area">
          <div class="module-area-title">
            <b>
              云桌面
            </b>
          </div>
          <div class="module-area-data">
            <div class="none-data" id="chart-3">
              <a-progress type="circle" :percent="CloudDesktop.CPU.percent" :format="percent => `${percent}% CPU`"
                          strokeWidth="10" :strokeColor="CloudDesktop.CPU.strokeColor" width="86px"/>
              <div>
                {{CloudDesktop.CPU.current}}/{{CloudDesktop.CPU.total}} <span>核</span>
              </div>
            </div>
            <div class="none-data" id="chart-4">
              <a-progress type="circle" :percent="CloudDesktop.MB.percent" :format="percent => `${percent}% 内存`"
                          strokeWidth="10" :strokeColor="CloudDesktop.MB.strokeColor" width="86px"/>
              <div>
                {{CloudDesktop.MB.current}}/{{CloudDesktop.MB.total}} <span>GB</span>
              </div>
            </div>
            <div class="none-data" id="chart-5">
              <a-progress type="circle" :percent="CloudDesktop.GB.percent" :format="percent => `${percent}% 存储`"
                          strokeWidth="10" :strokeColor="CloudDesktop.GB.strokeColor" width="86px"/>
              <div>
                {{CloudDesktop.GB.current}}/{{CloudDesktop.GB.total}} <span>TB</span>
              </div>
            </div>
          </div>
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
        CloudComputing: {
          CPU: {
            current: '',
            total: '',
            percent: '',
            strokeColor: '',
          },
          MB: {
            current: '',
            total: '',
            percent: '',
            strokeColor: '',
          },
          GB: {
            current: '',
            total: '',
            percent: '',
            strokeColor: '',
          },
        },

        CloudDesktop: {
          CPU: {
            current: '',
            total: '',
            percent: '',
            strokeColor: '',
          },
          MB: {
            current: '',
            total: '',
            percent: '',
            strokeColor: '',
          },
          GB: {
            current: '',
            total: '',
            percent: '',
            strokeColor: '',
          },
        },

      };
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
      },
    },
    created() {
      this.CloudComputing.CPU.current = 78;
      this.CloudComputing.CPU.total = 240;
      this.CloudComputing.CPU.percent = parseInt((this.CloudComputing.CPU.current / this.CloudComputing.CPU.total) * 100);
      if (this.CloudComputing.CPU.percent > 80) {
        this.CloudComputing.CPU.strokeColor = '#feb64d'
      } else {
        this.CloudComputing.CPU.strokeColor = '#0ff'
      }

      this.CloudComputing.MB.current = 167424;
      this.CloudComputing.MB.total = 981150;
      this.CloudComputing.MB.percent = parseInt((this.CloudComputing.MB.current / this.CloudComputing.MB.total) * 100);
      if (this.CloudComputing.MB.percent > 80) {
        this.CloudComputing.MB.strokeColor = '#feb64d'
      } else {
        this.CloudComputing.MB.strokeColor = '#0ff'
      }

      this.CloudComputing.GB.current = 4684;
      this.CloudComputing.GB.total = 15267;
      this.CloudComputing.GB.percent = parseInt((this.CloudComputing.GB.current / this.CloudComputing.GB.total) * 100);
      if (this.CloudComputing.GB.percent > 80) {
        this.CloudComputing.GB.strokeColor = '#feb64d'
      } else {
        this.CloudComputing.GB.strokeColor = '#0ff'
      }

      this.CloudDesktop.CPU.current = 1800;
      this.CloudDesktop.CPU.total = 2016;
      this.CloudDesktop.CPU.percent = parseInt((this.CloudDesktop.CPU.current / this.CloudDesktop.CPU.total) * 100);
      if (this.CloudDesktop.CPU.percent > 80) {
        this.CloudDesktop.CPU.strokeColor = '#FB7293'
      } else {
        this.CloudDesktop.CPU.strokeColor = '#0ff'
      }

      this.CloudDesktop.MB.current = 488;
      this.CloudDesktop.MB.total = 3195;
      this.CloudDesktop.MB.percent = parseInt((this.CloudDesktop.MB.current / this.CloudDesktop.MB.total) * 100);
      if (this.CloudDesktop.MB.percent > 80) {
        this.CloudDesktop.MB.strokeColor = '#feb64d'
      } else {
        this.CloudDesktop.MB.strokeColor = '#0ff'
      }

      this.CloudDesktop.GB.current = 4684;
      this.CloudDesktop.GB.total = 15267;
      this.CloudDesktop.GB.percent = parseInt((this.CloudDesktop.GB.current / this.CloudDesktop.GB.total) * 100);
      if (this.CloudDesktop.GB.percent > 80) {
        this.CloudDesktop.GB.strokeColor = '#feb64d'
      } else {
        this.CloudDesktop.GB.strokeColor = '#0ff'
      }

    },
    mounted() {
      this.initChart();
    },
    methods: {
      getResourceUsage () {
        const that = this;
        let param = {
          openstack_name: '车公庄数据中心',
          region_name: 'RegionOne'
        };
        this.$http.get(that.$api.checkResourceUsage, param).then(res => {
          if (res.status === 200) {
            if (res) {
              // 直接填充数据
            } else {
              // 若返回报文没有数据的情况
            }
          }
        })
      },
      initChart() {
        let chartInit = this.$echarts.init(document.getElementById("chart-0"));

        let option;

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
  .main {
    color: #ffffff;
    padding: 1%;
    position: relative;
    width: 102.3%;
    height: 100.7%;
  }

  .main-id {
    position: relative;
    width: 92%;
    height: 84%;
    margin-top: 6%;
    margin-left: 2%;
  }

  .module-area {
    width: 100%;
    height: 52%;
    /*background-color: #3467c5;*/
  }

  .module-area-title {
    float: left;
    width: 15%;
    height: 100%;
    line-height: 6;
    text-align: center;
    font-size: 14px;
    word-wrap: break-word;
    writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  }

  .module-area-data {
    float: left;
    width: 85%;
    height: 100%;
  }

  .none-data {
    float: left;
    width: 32%;
    height: 100%;
    margin-top: 4%;
    text-align: center;
    font-size: 12px;
  }

  /deep/ .ant-progress-circle-trail {
    stroke: #175372 !important;
    opacity: .3;
  }

  /deep/ .ant-progress-text {
    color: #e4e8ec;
    font-size: 14px;
    font-weight: bold;
  }

</style>
