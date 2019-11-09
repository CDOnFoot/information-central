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
                <!-- <p>{{'2019-10-29 19:00:00'}}</p> -->
                <p>当前车次：{{item.runId}}</p>
                <p>车次类型：{{'xxx类型'}}</p>
                <p>前方到站：{{'xxxx站'}}</p>
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
  name: "MC04",
  data() {
    return {
      mcList: "",
      n: 0,
      wayList: this.$common.wayList,
      runList: this.$common.runList,
      noticeList: [],
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
    //页面刚进入时开启长连接
    this.initWebSocket();
    // let self = this;
    // clearInterval(this.timeInterval);
    // this.timeInterval = setInterval(function() {
    //   self.pushDataInfo();
    // }, 1000 * 30);
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    // 消息推送
    pushDataInfo:function(){
      this.noticeList = {
        'id':'CZ01',
        'type':'固定',
        'subWayNum':'079',
        'upDownStatus':'下行',
        'subwayStatus':'',
        'stationId':'16',
        'stationName':'四方坪',
      };
      console.log(this.noticeList);
      this.noticeCarFunc();
    },


    // 初始化列车运行图信息
    noticeCarFunc:function(){
      let self = this;
      this.wayList.some((item,index)=>{
        if(item.dotId === self.noticeList.id){
          
          return false;
        }
      });
    },
// 初始化websocket连接数据
    initWebSocket:function(){
      console.log(this.userId);
      const wsuri = "ws://10.66.1.160:28070/subway/info/ws/{"+this.userId+"}/{"+this.customToken+"}";//ws地址
      this.websocket = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) { 
      //错误
      console.log("WebSocket连接发生错误:");
      console.log(e);

    },
    websocketonmessage(e){ //数据接收
      console.log("WebSocket连接数据接收中:");
      console.log(e);
  
      // console.log(event.data)
      const redata = JSON.parse(e.data);
      console.log(redata);
      // let code = JSON.stringify(redata.code);
    },
    websocketsend(agentData){
      //数据发送
      console.log("WebSocket数据发送消息中:");
      this.websocket.send(agentData);
    },
    websocketclose(e){  
      //关闭
      console.log("connection closed："+this.userId);
      this.websocket.close();

    },
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
  background: url("../../../assets/img/subway-bg.png") no-repeat;
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
