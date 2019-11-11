<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <!-- <div id="splashes"></div> -->
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC05",
  data() {
    return {
      mcList: "",
      structure:""
    };
  },
  props: ["mcStatus", "mcTitle",'mcId'],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      this.mcTitle = val;
    },
    mcId:function(val){
      this.mcId = val;
    }
  },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;

   self.initChart('init');
  //  clearInterval(this.timeTimeOut);
  //   self.timeTimeOut = setTimeout(function() {
  //     self.initChart('update');
  //   }, 20);

  var timeStamp=1572980400000;  //11月6日凌晨3点的毫秒数
    var dayMins = 86400000;   //每天的毫秒数
    var setIntervalMins = 1000*60  //定时器刷新的时间间隔
    setInterval(()=>{
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        console.log("凌晨三点定时刷新数据")
        self.initChart('update');
      }
    },setIntervalMins)

  },
  created() {},
  methods: {
    // 查看可视化界面内容数据信息
    initChart:function(type){
      let self = this;
      this.chartInfo(function(data){
        self.chartInfoList(data,type);
      },type)
    },
    chartInfo:function(callback,type){
      let self = this;
      let param={
        };
      this.$http.get(self.$api.getStationCluster, param).then(res =>{
        //调取数据成功
        if(res.data){
          if (res.data.code === "0") {
            callback(res.data.data,type)
          }else{
            this.$message.error(res.data.msg);
          }
        }
      });
      },
    chartInfoList:function(data,type){
        this.drawLine(data,type);
      },
    drawLine(paramData,type){
      let self = this;
      self.structure = self.$echarts.init(document.getElementById(self.mcId));
      var option = null;
      self.structure.showLoading();

      var data = {
        counties:paramData.stationNameList,
        timeline:paramData.timeList,
        series:paramData.resultList
      };
      self.structure.hideLoading();

      var itemStyle = {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      };

      var sizeFunction = function(x) {
        var y = Math.sqrt(x / 5e8) + 0.1;
        return y * 80;
      };
      // Schema:
      var schema = [
        { name: "Income", index: 0, text: "月累计客流量", unit: "人次" },
        { name: "LifeExpectancy", index: 1, text: "车站面积", unit: "m²" },
        { name: "Population", index: 2, text: "月累计耗电量", unit: "kwh" },
        { name: "Country", index: 3, text: "车站名称", unit: "" }
      ];

      option = {
        baseOption: {
          timeline: {
            axisType: "category",
            orient: "vertical",
            autoPlay: true,
            inverse: true,
            playInterval: 2000,
            left: null,
            right: 0,
            top: 20,
            bottom: 10,
            width: 55,
            height: null,
            label: {
              normal: {
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                textStyle: {
                  color: "#fff"
                }
              }
            },
            symbol: "none",
            lineStyle: {
              color: "#555"
            },
            checkpointStyle: {
              color: "#bbb",
              borderColor: "#777",
              borderWidth: 2
            },
            controlStyle: {
              showNextBtn: false,
              showPrevBtn: false,
              normal: {
                color: "#666",
                borderColor: "#666"
              },
              emphasis: {
                color: "#fff",
                borderColor: "#fff"
              }
            },
            data: []
          },
          title: [
                {
                text: data.timeline[0],
                textAlign: 'center',
                right: '10%',
                top: '6%',
                textStyle: {
                    fontSize: 16,
                    color: '#dd6b66'
                }
            }],
          tooltip: {
            padding: 5,
            backgroundColor: "#222",
            borderColor: "#777",
            borderWidth: 1,
            formatter: function(obj) {
              var value = obj.value;
              return (
                schema[3].text +
                "：" +
                value[3] +
                "<br>" +
                schema[1].text +
                "：" +
                value[1] +
                schema[1].unit +
                "<br>" +
                schema[0].text +
                "：" +
                value[0] +
                schema[0].unit +
                "<br>" +
                schema[2].text +
                "：" +
                value[2] +' '+schema[2].unit +
                "<br>"
              );
            }
          },
          grid: {
            top: 80,
            bottom: 30,
            containLabel: true,
            left: 10,
            right: "110"
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: "white"
              }
            },
            type: "log",
            name: "客流量",
            max: 100000000,
            min: 1000000,
            nameGap: 25,
            nameLocation: "middle",
            nameTextStyle: {
              fontSize: 12
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              formatter: "{value} 人次"
            }
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: "white"
              }
            },
            type: "value",
            name: "能耗",
            // max: 10000000,
            nameTextStyle: {
              color: "#fff",
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value} kwh"
            }
          },
          visualMap: [
            {
              show: false,
              dimension: 3,
              categories: data.counties,
              calculable: true,
              precision: 0.1,
              textGap: 30,
              textStyle: {
                color: "#fff"
              },
              inRange: {
                color: (function() {
                  var colors = [
                    "#dd6b66",
                    "#759aa0",
                    "#e69d87",
                    "#8dc1a9",
                    "#ea7e53",

                    "#eedd78",
                    "#73a373",
                    "#7289ab",
                    "#91ca8c",
                    "#f49f42",

                    "#9b8bba",
                    "#e098c7",
                    "#8fd3e8",
                    "#71669e",
                    "#cc70af",

                    "#7cb4cc",
                    "#ff715e",
                    "#ffaf51",
                    "#ffee51",
                    "#8c6ac4",

                    "#715c87",
                    "#fc97af",
                    "#87f7cf",
                    "#f7f494",
                    "#72ccff",

                    "#f7c5a0",
                    "#d4a4eb",
                    "#d2f5a6",
                    "#76f2f2"

                  ];
                  return colors.concat(colors);
                })()
              }
            }
          ],
          series: [
            {
              type: "scatter",
              itemStyle: itemStyle,
              data: data.series[0],
              symbolSize: function(val) {
                return sizeFunction(val[1] * 1000);
              }
            }
          ],
          animationDurationUpdate: 1000,
          animationEasingUpdate: "quinticInOut"
        },
        options: []
      };

      for (var n = 0; n < data.timeline.length; n++) {
        option.baseOption.timeline.data.push(data.timeline[n]);
        option.options.push({
          title: {
            show: true,
            text: data.timeline[n] + ""
          },
          series: {
            name: data.timeline[n],
            type: "scatter",
            itemStyle: itemStyle,
            data: data.series[n],
            symbolSize: function(val) {
              return sizeFunction(val[1] * 1000);
            }
          }
        });
      }

      self.structure.setOption(option,true);

      if (option && typeof option === "object") {
        self.structure.setOption(option, true);
      }
      
    },
    // refreshData(paramData){
    //   let self = this;
    //   let option = (self.structure).getOption();
    //   console.log(option)
    //   // option.dataset[0].source = paramData;
    //   // option.baseOption.visualMap[0].categories = paramData.stationNameList;
    //   // option.series[0].data = paramData.resultList[0];
    //   self.structure.setOption(option);  
    // }
  }
};
</script>

<style scoped>
.main {
  color: #ffffff;
  padding: 1%;
  position: relative;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  left: -6px !important;
  margin-top: 5% !important;
  margin-left: -5% !important;

}
.main-id {
  width: 470px;
  height: 278px;
}
</style>
