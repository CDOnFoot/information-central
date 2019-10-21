

<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div id="stations" :style="{width: '859px', height: '871px',margin:'0px 10px'}">
		  <div class="subwa" :style="{width: '100%', height: '100%'}"></div>

	  </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC04",
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
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;
//    this.drawLine();
  },
  created() {},
  methods: {
  
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
  margin: 20px 0px 0px 698px;
}
.subwa{
	background: url("../../../assets/img/列车实时运营图.png");
	margin: -38px 0px 0px -16px;
}
</style>
