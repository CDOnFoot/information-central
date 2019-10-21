
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div id="splashes" :style="{width: '470px', height: '240px',margin:'0px 10px'}"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC05",
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
      let splashes = this.$echarts.init(document.getElementById("splashes"));
      // 绘制图表

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
