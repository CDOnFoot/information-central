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
            
            <div :id="'runwayItem'+index" class="runway-item" :class="item.type==='图定列车'?'dot-red':item.type==='临客列车'?'dot-yellow':item.type==='救援车'?'dot-heaven':item.type==='调试车'?'dot-blue':item.type==='专用车'?'dot-green':item.type==='跳停车'?'dot-purpuse':'dot-white'" @click="clickDot(index)"></div>
              <!-- <a-popover placement="topLeft" arrowPointAtCenter class="popover-item">
              <template slot="content">
                <p>当前车次：{{item.subwayNum}}</p>
                <p>车次类型：{{item.type}}</p>
              </template>
              <span slot="title">{{item.dotName}}</span>
              <a-button class="runway-item"></a-button>
            </a-popover>-->
            <div class="runway-content" :id="'runwayContent'+index" :class="runwayIndex===index?'runwayActive':''">
              车次号：{{item.subwayNum}}
            </div>
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
      noticeList: [],  //页面所有车的点图集合
      tempNoticeList:{}, // 最新消息的数据
      timeInterval:'',
      userId:Cookies.get("dvptId"),
      customToken:Cookies.get("dvptToken"),
      runwayIndex:'',
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
    //页面刚进入时开启长连接
    
    if ('WebSocket' in window) {
      this.initWebSocket();
    } else {
       this.$info({
          title: '提示',
          content: '当前界面不支持websocket的使用',
        });
    }
  },
  created() {
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {

    // 点击车点信息显示
    clickDot:function(paramIndex){
      this.runwayIndex = paramIndex;
      console.log(paramIndex);
    },
    // 初始化列车运行图信息
    noticeCarFunc:function(){
      let self = this;
      this.wayList.some((item,index)=>{
        if(item.dotId === self.tempNoticeList.id){
            if(self.tempNoticeList.subwayStatus==='离开'){
              self.tempNoticeList.dot = this.wayList[index+1].dot;
              return false;
            }else if(self.tempNoticeList.subwayStatus==='到达')
              self.tempNoticeList.dot = item.dot;
              return false;
        }
      });
    },
// 初始化websocket连接数据
    initWebSocket:function(){
      const wsuri = this.$http.websocketHost+this.userId+"/"+this.customToken;//ws地址
      console.log(wsuri);
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
      const redata = JSON.parse(e.data);
      // console.log(redata.data)
      this.showData(redata.data)
      

    },
    websocketsend(agentData){
      //数据发送
      // console.log("WebSocket数据发送消息中:");
      this.websocket.send(agentData);
    },
    websocketclose(e){  
      //关闭
      this.websocket.close();

    },
    showData(redata){
      let daotType = null;
      let hasTrain = null;
      let self = this;
        new Promise((reslove,reject)=>{
        // console.log(redata)
        daotType = redata.subwayStatus==='到达'?'common':'middle'
        // console.log(daotType)
        hasTrain = self.noticeList.some((it,unitIndex)=>{
            return redata.subwayNum===it.subwayNum;
          })

          if(self.noticeList.length>0){
          if(hasTrain){
              self.noticeList.forEach((unit,unitIndex)=>{
              if(redata.subwayNum===unit.subwayNum){
                reslove(unitIndex);
              }
            })
          }else{
            reslove(-100);
          }
          }else{
            reslove(-100);
          }
          
        }).then((unitIndex)=>{
          // console.log(unitIndex)
        //  console.log(daotType)
        this.wayList.some((item,index)=>{
          if(item.dotId === redata.stationId && item.status==redata.upDownStatus && item.dotType==daotType){
              let trainInfor={
                  subwayNum:redata.subwayNum,  //车次
                  type:redata.type.trim(),  //车次
                  dotId: redata.stationId,    //车站ID
                  title: redata.stationName,  //车站名称
                  status:redata.upDownStatus, //车辆的行驶方向，上行或者下行
                  dotType:item.dotType,       //common 或者 middle
                  // dot: this.wayList[index+1].dot    
                    dot: item.dot          //运动点的位置信息
                }
                if(unitIndex== "-100"){
                  self.noticeList.push(trainInfor)
                  console.log(self.noticeList)
                  return false;
                }else{
                  self.$set(self.noticeList,unitIndex,trainInfor)
                  console.log(self.noticeList)
                  return false;
                }
          }
          // else if(item.dotId === redata.stationId && item.status==redata.upDownStatus && item.dotType==daotType){
          //       let trainInfor={
          //         subwayNum:redata.subwayNum,  //车次
          //         dotId: redata.stationId,    //车站ID
          //         title: redata.stationName,  //车站名称
          //         status:redata.upDownStatus, //车辆的行驶方向，上行或者下行
          //         dotType:item.dotType,       //common 或者 middle
          //         dot: item.dot             //运动点的位置信息
          //       }
          //       if(unitIndex== "-100"){
          //         self.noticeList.push(trainInfor)
          //         console.log(self.noticeList)
          //         return false;
          //       }else{
          //         self.$set(self.noticeList,unitIndex,trainInfor)
          //         console.log(self.noticeList)
          //         return false;
          //       }
          // }

        });
        })
      }
    }
    };
</script>

<style scoped>
.borde-main{
  font-weight: 700;
  color: #ffffff;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 25px;
  right: 45px;
  font-size: 16px;
  padding-left: 12px;
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
  /* background-size: 100% 100%; */
  transform: translate(-50%,-50%);
}
.subway-item:hover{
  transform: scale(1.3);
  z-index: 99;
}
.subway-item{
  width: 0.8%;
  height: 0.8%;
  border-radius: 100%;
}
.runway-item{
  padding: 0;
  height: 10px;
  border-radius: 100%;
  width: 10px;
  margin-left: -31%;
  background: #ff0000b0;
  border: solid 1px #ffffffb0;
  margin-top: -31%;
  z-index: 299;
  cursor: pointer;
  position: relative;
}
a-popover{
  background: #3467c5;
}
.runway-content{
  background: #3467c5;
  color: #ffffff;
  width: 106px;
  height: 25px;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  position: absolute;
  left: -112px;
  z-index: 9;
  line-height: 17px;
  border: solid 1px #ffffff4d;
  
}
.dot-red{
  background: #ff3e4db0 !important;
  box-shadow: #ff3e4d4d 0 0 8px 6px;
}
.dot-yellow{
  background: #fff672b0 !important;
  box-shadow: #fff6724d 0 0 8px 6px;

}
.dot-purpuse{
  background: #ff58a3b0 !important;
  box-shadow: #ff58a34d 0 0 8px 6px;

}
.dot-blue{
  background: #75feffb0 !important;
  box-shadow: #75feff4d 0 0 8px 6px;

}
.dot-green{
  background: #9bff79b0 !important;
  box-shadow: #9bff794d 0 0 8px 6px;

}
.dot-white{
  background: #000000b0 !important;
  box-shadow: #0000004d 0 0 8px 6px;

}
.dot-heaven{
  background: #7274ffb0 !important;
  box-shadow: #7274ff4d 0 0 8px 6px;

}
.runwayActive{
  z-index: 99;
  box-shadow: #c5d9ff 0px 0px 4px 1px;
}
</style>
