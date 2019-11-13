<template>
  <!--  列车实时运行图  模块内容一-->
  <div>
    <div class="main">
      <div class="borde-main">{{mcTitle}}</div>
      <div :id="mcId" class="main-id">
        <div class="subway"></div>
          <div class="subway-item" :key="index" v-for="(item,index) in wayList" :title="item.title" 
          :style="{position:'absolute',top:item.dot[0],left:item.dot[1]}">
          </div>
          <div class="runway">
            <div :key="index" v-for="(item,index) in noticeList" 
            :style="{position:'absolute',top:item.dot[0],left:item.dot[1]}">
              <a-popover placement="topLeft" arrowPointAtCenter class="popover-item">
              <template slot="content">
                <!-- <p>{{'2019-10-29 19:00:00'}}</p> -->
                <p>当前车次：{{item.subwayNum}}</p>
                <p>车次类型：{{item.type}}</p>
                <!-- <p>前方到站：{{'xxxx站'}}</p> -->
              </template>
              <span slot="title">{{item.dotName}}</span>
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
import Cookies from 'js-cookie';
export default {
  name: "MC08",
  data() {
    return {
      mcList: "",
      n: 0,
      wayList: this.$common.wayList,
      runList: this.$common.runList,
      noticeList: [],  //页面所有车的点图集合
      tempNoticeList:{}, // 最新消息的数据
      timeInterval:'',
      userId:Cookies.get("dvptId"),
      customToken:Cookies.get("dvptToken"),

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
  },
  created() {
  },
  destroyed: function() {
  },
  beforeDestroy () {
  },
  methods: {

  }
};
</script>

<style scoped>
.borde-main{
  font-weight: 700;
  color: #ffffff;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  right: 6%;
  font-size: 16px;
  padding-left: 3%;
  z-index: 99;
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
.subway {
  height: 99%;
  width: 99%;
  position: absolute;
  border-radius: 10px;
  left: 48.8%;
  top: 50.4%;
  background: url("../../../assets/img/map4.png") no-repeat;
  background-size: cover;
  transform: translate(-50%,-50%);
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
  height: 10px;
  border-radius: 100%;
  width: 10px;
  margin-left: -31%;
  background: #ff00009c;
  margin-top: -31%;
}
a-popover{
  background: #3467c5;
}
 .mc-content{
    width: 100%;
    height: 100%;
  }
</style>
