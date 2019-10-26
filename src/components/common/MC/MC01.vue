
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
          <a-radio  :value="3">过去30天</a-radio>
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
      timeStamp: "2019/10/4-2019/10/11",
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
    this.drawLine();
  },
  created() {},
  methods: {
    drawLine() {
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
            dataView: {show: true, readOnly: true,lang:['数据视图', '关闭','']}
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
      console.info(self.mc);
      // 绘制图表
      self.mc.setOption(option,true)
      //默认数据
    },
    //动态获取数据
    dataFrom(){

    },
    //下拉框change事件
    handleChange(e){
      console.log(e.target.value)
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
  height: 270px;
  padding-top: 24px;
}
/* .time {
  font-size: 16px;
  color: #3467c5;
  margin-top: -18%;
  margin-right: 4%;
  height: 9%;
} */
/* .time {
  font-size: 16px;
  color:#fff;
  margin-top: -12.5%;
  left:-10%;
} */
.time {
  font-size: 16px;
  color: #fff;
  margin-top: -13%;
  /* margin-right: 4%; */
  left:-45%;
  height: 9%;
}
.timeChange{
  color:#fff;
  position: absolute;
  right:15%;
  top:4%;
  z-index: 100;
}
.ant-radio-wrapper{
  color:#1890ff;
}
</style>
