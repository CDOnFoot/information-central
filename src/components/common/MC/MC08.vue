<template>
  <!--  列车实时运行图  模块内容一-->
  <div>
    <div class="main">
      <div class="borde-main">{{mcTitle}}</div>
      <div :id="mcId" class="main-id">
        <div class="subway"></div>
          <div class="subway-item" :key="index" v-for="(item,index) in hardList" :title="item.title" 
          :style="{position:'absolute',top:item.dot[0],left:item.dot[1]}">
          </div>
          <div class="runway">
            <div :key="index" v-for="(item,index) in noticeList" 
            :style="{position:'absolute',top:item.dot[0],left:item.dot[1]}">
             <div v-show="item.loaddegree!=-100" :id="'runwayItem'+index" class="runway-item" :class="item.loaddegree===0?'dot-purpuse':item.loaddegree===1?'dot-green':item.loaddegree===2?'dot-yellow':item.loaddegree===3?'dot-red':'dot-white'" ></div>
              <input type="hidden" :value="item.loaddegree">
             <!-- @click="clickDot(index)" -->
              <!-- <a-popover placement="topLeft" arrowPointAtCenter class="popover-item">
              <template slot="content">
                <p>当前车次：{{item.subwayNum}}</p>
                <p>车次类型：{{item.type}}</p>
              </template>
              <span slot="title">{{item.dotName}}</span>
              <a-button class="runway-item"></a-button>
            </a-popover>-->
            <!-- <div class="runway-content" :id="'runwayContent'+index" :class="runwayIndex===index?'runwayActive':''">
              车次号：{{item.subwayNum}}
            </div> -->
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
      hardList: this.$common.hardList,
      runList: this.$common.runList,
      noticeList: [],  //页面所有车的点图集合
      tempNoticeList:{}, // 最新消息的数据
      dataRef:'',
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
    this.noticeList = JSON.parse(JSON.stringify(self.$common.hardList));
//  加载列车负载信息
    this.initPassengerLoad();

    clearInterval(this.dataRef);
    
    self.dataRef = setInterval(() => {
      self.initPassengerLoad();
    },5 * 1000 * 60);
  },
  created() {
  },
  destroyed: function() {
    window.clearInterval(this.dataRef);
  },
 
  methods: {
    // 初始化列车负载图信息
    initPassengerLoad:function(){
      let self = this;
      this.initPassenger(function(data){
        self.passengerLoad(data);
      })
    },
    initPassenger:function(callback){
      let self = this;
      let param={
        userId:this.userId,
        custom_token:this.customToken
        };
      this.$http.get(self.$api.passengerLoadHotspots, param).then(res =>{
        //调取数据成功
        if(res){
          // console.log(res);
          if (res.data.code === "0") {
            callback(res.data.data)
          }else{
             // this.$message.error(res.data.msg);
              console.log(res.data.msg);
          }
        }
      });
    },
    passengerLoad:function(data){
      console.log(data);
      
      let self = this;
       data.map((item,index)=>{
         self.$set(self.noticeList[index],'loaddegree',item.loaddegree);
       });
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
  background: url("../../../assets/img/subway-bg.png") no-repeat;
  background-size: 100% 100%;
  transform: translate(-50%,-50%);
}
.subway-item:hover{
  transform: scale(1.3);
  z-index: 99;
}
.subway-item{
  width: 0.8%;
  height: 0.8%;
  /* background: #ffffff; */
  border-radius: 100%;
}
.runway-item{
  padding: 0;
  height: 20px;
  border-radius: 100%;
  width: 20px;
  margin-left: -31%;
  background: #ff0000b0;
  border: solid 1px #ffffff;
  margin-top: -31%;
  z-index: 299;
  cursor: pointer;
  position: relative;
}
a-popover{
  background: #3467c5;
}
.mc-content{
  width: 100%;
  height: 100%;
}
.dot-red{
  background: #ff3e4d !important;
  box-shadow: #ff3e4db0 0 0 20px 12px;
}
.dot-yellow{
  background: #fff672 !important;
  box-shadow: #fff672b0 0 0 20px 12px;
}
.dot-purpuse{
  background: #ff58a3 !important;
  box-shadow: #ff58a3b0 0 0 20px 12px;

}
.dot-blue{
  background: #75feff !important;
  box-shadow: #75feffb0 0 0 20px 12px;

}
.dot-green{
  background: #9bff79 !important;
  box-shadow: #9bff79b0 0 0 20px 12px;
}
.dot-white{
  background: #ffffff !important;
  box-shadow: #ffffffb0 0 0 20px 12px;

}
.dot-heaven{
  background: #7274ff !important;
  box-shadow: #7274ffb0 0 0 20px 12px;

}
</style>
