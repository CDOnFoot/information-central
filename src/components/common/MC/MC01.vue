
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="time">{{timeStamp}}</div>
        <!-- <a-select defaultValue="1" @change="handleChange" class="timeChange">
          <a-select-option value="1">日</a-select-option>
          <a-select-option value="2">周</a-select-option>
          <a-select-option value="3">月</a-select-option>
        </a-select> -->
        <a-radio-group @change="handleChange" v-model="valueTime"   class="timeChange">
          <a-radio :value="1">过去一天</a-radio>
          <a-radio :value="2">过去7天</a-radio>
          <a-radio :value="3">过去30天</a-radio>
        </a-radio-group>
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "MC01",
  data() {
    return {
      timeInterval: "",
      // timeStamp: this.$common.timestampToTime(new Date()),
      timeStamp: "",
      mcList: "",
      valueTime:"1",
      mc:""
    };
  },
  props: ["mcStatus", "mcTitle", "mcId"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      this.mcTitle = val;
    },
    mcId: function(val) {
      this.mcId = val;
    }
  },
  mounted() {
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(function() {
      // self.timeStamp = self.$common.timestampToTime(new Date());
    }, 1000);
    var self = this;
    this.mcList = this.$common.mcList;
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;

    this.initChart(this.valueTime);
  },
  created() {},
  methods: {

    // 查看可视化界面内容数据信息
    initChart:function(type){
      let self = this;
      this.chartInfo(function(data){
        self.chartInfoList(data);
      },type)
    },
    chartInfo:function(callback,type){
      let self = this;
      let param={
        queryType: type
        };
      this.$http.posts(self.$api.getEnergytopten, param).then(res =>{
        //调取数据成功
        if(res.data){
          if (res.data.code === "0") {
            callback(res.data.data)
          }else{
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    chartInfoList:function(data){
      console.log(data);
      this.timeStamp = data.time;
      this.drawLine(data);
    },

    drawLine(paramData) {
      let self = this;
      // 基于准备好的dom，初始化echarts实例
      self.mc = this.$echarts.init(document.getElementById(self.mcId));
      //初始化option
      let option={
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show: false
        },
        toolbox: {
          show: true,
          left: '50%',
          top:'3%',
          feature: {
            dataView: {
              show: true, 
              readOnly: true,
              icon: '../../../assets/img/btn-data.png',
              // icon:'image://http://echarts.baidu.com/images/favicon.png',
              lang:['数据视图', '关闭','']
              }
          },
          iconStyle: {
            normal: {
              color: "white", //设置颜色
              top: "50%"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },

          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          type: "category",
          data: [
             "金川路站",
            "大河梗站",
            "海屯路站",
            "小屯站",
            "金鼎山北路站",
            "苏家塘站",
            "小菜园站",
            "火车北站",
            "白龙路站",
            "大树营站"
          ]
        },
        series: [
          {
            name: "总能耗",
            type: "bar",
            data: [
              19325,
              23438,
              31000,
              45194,
              54141,
              68207,
              72141,
              82354,
              92341,
              101231
            ]
          }
        ]
      };

      // 动态放置数据
      option.series[0].data = paramData.energy;
      option.yAxis.data = paramData.station;
      console.info(self.mc);
      // 绘制图表
      self.mc.setOption(option,true)
      //默认数据
      },
    
      //下拉框change事件
      handleChange(e){
        // console.log();
        // 动态获取能耗排行数据信息
        this.initChart(e.target.value);
      }
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
canvas {
  width: 100% !important;
  height: 100% !important;
  left: -6px !important;
}
.main-id {
  width: 470px;
  height: 258px;
  margin-top: 24px;
}
.time{
  position: absolute;
  right: 4%;
  font-size: 16px;
  top: 16%;
  color: #ffffff;
  text-align: right;
}
.timeChange{
  color: #fff;
  position: absolute;
  left: 5%;
  top: 12%;
}
.ant-radio-wrapper{
  color:#ffffff;
}
</style>



           
          