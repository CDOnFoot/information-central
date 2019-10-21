<template>
  <!--    模块内容一-->
  <div>
    <div class="main" :style="{width: '100%', height: '100%'}">
      <div class="borde">{{mcTitle}}</div>
      <div :style="{width: '470px', height: '240px',margin:'0px 10px'}">
        <div :style="{width: '100%', height: '100%'}">
          <div class="fon">
            <div :style="{ margin:'20px 0px 0px 20px'}">19942</div>
          </div>
          <div class="fon1">
            <div :style="{ margin:'20px 0px 0px 16px'}">600045</div>
          </div>
        </div>
      </div>
    <div class="purple">进站人数</div>
    <div class="orange">出站人数</div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC09",
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
  margin: 0px 0px 0px 30px;
}
.fon1,
.fon{
  height:80%;
  width: 40%;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  font-size: 26px;
  padding: 60px 40px;
}
.fon1{
  background: url('../../../assets/img/出站.png') no-repeat;
}
.fon{
  background: url('../../../assets/img/进站人数.png') no-repeat;
}
.turn{
  transform:rotate(300deg);
}
.purple{
  margin: -38px 0px 0px 83px;
  font-size: 26px;
  color: #a859ff;
  float: left;
}
.orange{
  margin: -38px 0px 0px 104px;
  font-size: 26px;
  color: #ff9745;
  float: left;

}
</style>
