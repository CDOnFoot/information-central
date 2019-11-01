
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <!-- <div id="structure" ></div> -->
      <div :id="mcId" class="main-id"></div>

    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC02",
  data() {
    return {
        mcList:'',
        structure:''
      };
    },
    props:['mcStatus','mcTitle','mcId'],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        this.mcTitle = val;
      },
      mcId:function(val){
        this.mcId = val;
      }
    },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;
    // console.log(this.mcStatus);
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;

    // this.drawImg();
    this.initChart('init')
    // this.refreshData();

    
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(function() {
      self.initChart('update');
    }, 1000 * 30);
  },
    created() {
      
    },
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
        // this.$http.gets(self.$api.energystructure, param).then(res =>{
        //   //调取数据成功
        //   if(res.data){
        //     if (res.data.code === "0") {
              // callback(res.data.data,type)
        //     }else{
        //       this.$message.error(res.data.msg);
        //     }
        //   }
        // });
        let dataResult = [
           [
              "date", "2019-10-24", "2019-10-25", "2019-10-26", "2019-10-27", "2019-10-28", "2019-10-29", "2019-10-30"
            ],
              ["牵引动力", "602.63", "96.09", "722.84", "685.4", "0.89", "289.3", "500.8"],
              ["其他", "199.35", "387.31", "299.85", "767.34", "643.23", "320.9", "819.52"]
          ];

        callback(dataResult);
      },
      chartInfoList:function(data,type){
        this.timeStamp = data.time;

        this.drawLine(data,type);
      },
      
      drawLine(paramData,type){
        let self = this;
        let option= null;
        // 基于准备好的dom，初始化echarts实例
        if(type==='init'){
        // 基于准备好的dom，初始化echarts实例
          self.structure = self.$echarts.init(document.getElementById(self.mcId));
          option = ({
          // structure.setOption({
            legend: {
              textStyle: {
                //图例文字的样式
                color: "white"
              },
              top: "top" 
            },
            tooltip: {
              trigger: "axis",
              showContent: false
            },
            dataset: [{
              source: [
                [
                "date", "2019-10-24", "2019-10-25", "2019-10-26", "2019-10-27", "2019-10-28", "2019-10-29", "2019-10-30"
                ],
                ["牵引动力", "602.63", "96.09", "722.84", "685.4", "0.89", "289.3", "500.8"],
                // ["机电", 86.5, 92.1, 85.7, 83.1, 73.4, 98.7,90],
                // ["照明", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5,85],
                ["其他", "199.35", "387.31", "299.85", "767.34", "643.23", "320.9", "819.52"],
              ]
            }],
            xAxis: {
              type: "category",
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              }
            },
            yAxis: {
              gridIndex: 0,
              axisLine: {
                lineStyle: {
                  color: "white"
                }
              }
            },
            grid: { top: "55%" },
            series: [
              { type: "line", smooth: true, seriesLayoutBy: "row" },
              { type: "line", smooth: true, seriesLayoutBy: "row" },
              { type: "line", smooth: true, seriesLayoutBy: "row" },
              { type: "line", smooth: true, seriesLayoutBy: "row" },
              {
                type: "pie",
                id: "pie",
                radius: "30%",
                center: ["50%", "30%"],
                label: {
                  formatter: "{b}: {@"+paramData[0][1]+"}kWh ({d}%)"
                },
                encode: {
                  itemName: "date",
                  value: paramData[0][1],
                  tooltip: paramData[0][1]
                }
              }
            ]
          });
          //鼠标的随着日期移动 饼图变动的监听事件
          self.structure.on("updateAxisPointer", function(event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
              var dimension = xAxisInfo.value + 1;
              self.structure.setOption({
                series: {
                  id: "pie",
                  label: {
                    // formatter: "{b}: {@[" + dimension + "]}kWh"
                    formatter: "{b}: {@"+paramData[0][1]+"}kWh ({d}%)"

                  },
                  encode: {
                    value: dimension,
                    tooltip: dimension
                  }
                }
              });
            }
          });
          option.dataset[0].source = paramData;
          self.structure.setOption(option);
          console.log(self.structure.getOption())
        }else{
          //更新刷新记录信息
          self.refreshData(paramData);
        }
      },
      //更新数据方法
      refreshData(paramData){
        let self = this;
        let option = (self.mc).getOption();
        option.dataset[0].source = paramData;
        self.mc.setOption(option);     
    },
    //   drawLine() {
    //   let option = null;
    //   let self = this;
    //   // 基于准备好的dom，初始化echarts实例
    //   let structure = this.$echarts.init(document.getElementById(self.mcId));
    //   // 绘制图表
    //   setTimeout(function() {
    //     option = ({
    //     // structure.setOption({
    //       legend: {
    //         textStyle: {
    //           //图例文字的样式
    //           color: "white"
    //         },
    //         top: "top" 
    //       },
    //       tooltip: {
    //         trigger: "axis",
    //         showContent: false
    //       },
    //       dataset: {
    //         source: [
    //           [
    //             "date",
    //             "2019/9/23",
    //             "2019/9/24",
    //             "2019/9/25",
    //             "2019/9/26",
    //             "2019/9/27",
    //             "2019/9/28",
    //             "2019/9/29"

    //           ],
              
    //           ["牵引", 41.1, 30.4, 65.1, 53.3, 83.8, 55.1,55],
    //           ["机电", 86.5, 92.1, 85.7, 83.1, 73.4, 98.7,90],
    //           ["照明", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5,85],
    //           ["其他", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1,35],
    //         ]
    //       },
    //       xAxis: {
    //         type: "category",
    //         axisLine: {
    //           lineStyle: {
    //             color: "white"
    //           }
    //         }
    //       },
    //       yAxis: {
    //         gridIndex: 0,
    //         axisLine: {
    //           lineStyle: {
    //             color: "white"
    //           }
    //         }
    //       },
    //       grid: { top: "55%" },
    //       series: [
    //         { type: "line", smooth: true, seriesLayoutBy: "row" },
    //         { type: "line", smooth: true, seriesLayoutBy: "row" },
    //         { type: "line", smooth: true, seriesLayoutBy: "row" },
    //         { type: "line", smooth: true, seriesLayoutBy: "row" },
    //         {
    //           type: "pie",
    //           id: "pie",
    //           radius: "30%",
    //           center: ["50%", "30%"],
    //           label: {
    //             formatter: "{b}: {@2019/9/23}kWh ({d}%)"
    //           },
    //           encode: {
    //             itemName: "date",
    //             value: "2019/9/23",
    //             tooltip: "2019/9/23"
    //           }
    //         }
    //       ]
    //     });

    //     structure.on("updateAxisPointer", function(event) {
    //       var xAxisInfo = event.axesInfo[0];
    //       if (xAxisInfo) {
    //         var dimension = xAxisInfo.value + 1;
    //         structure.setOption({
    //           series: {
    //             id: "pie",
    //             label: {
    //               // formatter: "{b}: {@[" + dimension + "]}kWh"
    //               formatter: "{b}: {@2019/9/23}kWh ({d}%)"

    //             },
    //             encode: {
    //               value: dimension,
    //               tooltip: dimension
    //             }
    //           }
    //         });
    //       }
    //     });

    //     structure.setOption(option);
    //   });
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
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  left: 6%;
  padding-left: 3%;
}
canvas{
  width: 100% !important;
  height: 100% !important;
  left: -6px !important;
}
.main-id{
  width: 470px;
  height: 300px;
  margin: 1% 0 0 2%;
}
</style>
