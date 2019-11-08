<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <!-- <div class="timeStamp">{{timeStamp}}</div> -->

      <div class="dot-main">
        <div class="dot-num">
          <div>{{ontimerate}}</div>
          <div>正点率</div>
        </div>
        <div class="dot-num">
          <div>{{fullfillment}}</div>
          <div>兑现率</div>
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
      ontimerate:"0%",  //正点率
      fullfillment:"0%",  //兑现率
      dataRef:"",   //定点刷新
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
    //小数转百分数
    changeData(point){
      var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
    },
    //获取数据
    getData(){
      let self = this;
        let param={
          };
      self.$http.get(self.$api.getOntimeAndFullfillment, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              self.ontimerate = self.changeData(res.data.data.ontimerate)
              self.fullfillment = self.changeData(res.data.data.fullfillment)
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
.dot-num{
  height: 80%;
  width: 40%;
  background: url("../../../assets/img/dot-bg.png") no-repeat;
  font-size: 26px;
  padding: 12% 10%;
  text-align: center;
}

.timeStamp {
  position: absolute;
  left: 6%;
  font-size: 16px;
  top: 10%;
  color: #ffffff;
  text-align: right;
}
</style>
