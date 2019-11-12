<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="timeStamp">展示时间：{{timeStamp}}</div>
      <div class="dot-main">
        <div class="dot-numIn">
          <div class="peopleNum">{{ontimerate}}</div>
          <div class="peopleTitle">进站人数</div>
        </div>
        <div class="dot-numOut">
          <div class="peopleNum">{{fullfillment}}</div>
          <div class="peopleTitle">出站人数</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC07",
  data() {
    return {
      timeInterval: "",
      // timeStamp: this.$common.timestampToTime(new Date()),
      mcList: "",
      mcId: "",
      ontimerate:0,  //正点率
      fullfillment:0,  //兑现率
      dataRef:"",   //定点刷新
      timeStamp:'2019年11月25日 05:00-20:15'
    };
  },
  props: ["mcStatus", "mcTitle"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      this.mcTitle = val;
    }
  },
  mounted() {
    window.clearInterval(this.dataRef)
    var self = this;
    self.mcList = this.$common.mcList;
    self.getData();
    var timeStamp=1573056120000;  //11月6日凌晨d点02分的毫秒数
    var dayMins = 900000;   //15分钟
    var setIntervalMins = 1000*30  //30秒
    self.dataRef = setInterval(()=>{
      // console.log(new Date())
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        // console.log("15分钟定点刷新")
        self.getData();
      }
    },setIntervalMins)
  },
  created() {},
  methods: {
    //获取数据
    getData(){
      let self = this;
        let param={
          };
      self.$http.get(self.$api.passengerflowaccumulated, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              self.timeStamp = res.data.data.daytime
              self.ontimerate = res.data.data.flows_in_total
              self.fullfillment = res.data.data.flows_out_total
            }else{
              self.$message.error(res.data.msg);
            }
          }
        });
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

.dot-main {
    min-width: 470px;
    min-height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.dot-numIn{
  position: relative;
  width:50%;
  height:200px;
  margin-top:20px;
  background: url("../../../assets/img/enterPel.png") no-repeat;
  font-size: 26px;
  background-size:contain;
  background-position: center;
}
.dot-numOut{
  position: relative;
  width:50%;
  height:200px;
  margin-top:20px;
  background: url("../../../assets/img/outPel.png") no-repeat;
  font-size: 26px;
  background-size:contain;
  background-position: center;
}
.timeStamp {
  position: absolute;
  left: 10%;
  font-size: 16px;
  top: 14%;
  color: #ffffff;
  text-align: right;
}
.peopleNum{
  /* width:100%; */
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.peopleTitle{
  position: absolute;
  width:100%;
  text-align: center;
  bottom:-10%;
}
</style>
