

<template>
  <!--  列车实时运行图  模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div :id="mcId" class="main-id">
        <div class="subway"></div>
          <div class="subway-item" :key="index" v-for="(item,index) in wayList" :title="item.title" 
          :style="{position:'absolute',top:item.dot[0],left:item.dot[1]}">
          </div>
          <div class="runway">
            <div :key="index" v-for="(item,index) in runList" 
            :style="{position:'absolute',top:item.dot[0],left:item.dot[1]}">
              <a-popover placement="topLeft" arrowPointAtCenter class="popover-item">
              <template slot="content">
                <p>{{'2019-10-29 19:00:00'}}</p>
                <p>当前车次：{{item.runId}}({{'xxx类型'}})</p>
                <p>前方到站：{{'xxxx站'}}</p>
              </template>
              <span slot="title">{{item.title}}</span>
              <a-button class="runway-item"></a-button>
            </a-popover>
          </div>
          </div>
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
      mcList: "",
      n: 0,
      wayList:this.$common.wayList,
      runList:this.$common.runList,
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
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;
    // this.drawLine();
  },
  created() {},
  methods: {}
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
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  right: 6%;
  padding-left: 3%;
}
.main-id{
  width: 100%;
  height: 100%;
}
.subway {
  height: 99.2%;
  width: 98%;
  background: url("../../../assets/img/subway-bg.png");
  margin-top: 0.8%;
  margin-left: -.3%;
}
.subway-item:hover{
  transform: scale(1.3);
  z-index: 99;
}
.subway-item{
  width: 0.8%;
  height: 0.8%;
  background: #ffffff;
  border-radius: 100%;
}
.runway-item{
  padding: 0;
  height: 20px;
  border-radius: 100%;
  width: 20px;
  margin-left: -31%;
  background: #ff00009c;
  margin-top: -31%;
}
a-popover{
  background: #3467c5;
}

</style>
