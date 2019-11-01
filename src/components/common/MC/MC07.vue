<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div class="timeStamp">{{timeStamp}}</div>

      <div class="better">
        <div class="fon">
          <div class="Pleft">{{ontimerate}}</div>
          <div class="Pleft">正点率</div>
        </div>
        <div class="fon1">
          <div class="Pleft">{{fullfillment}}</div>
          <div class="Pleft">兑现率</div>
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
      timeStamp: this.$common.timestampToTime(new Date()),
      mcList: "",
      mcId: "",
      ontimerate:"100%",  //正点率
      fullfillment:"100%"  //兑现率
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
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(function() {
      self.timeStamp = self.$common.timestampToTime(new Date());
    }, 1000);

    var self = this;
    this.mcList = this.$common.mcList;
    self.getData();
    //每15分钟刷新一次数据
    clearInterval(this.timeIntervalData);
    this.timeIntervalData = setInterval(self.getData(), 1000*60*15);
  },
  created() {},
  methods: {
    //小数转百分数
    changeData(point){
      var str=Number(point*100).toFixed();
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
              console.log(res.data.data)
              self.ontimerate = self.changeData(res.data.data.ontimerate)
              self.fullfillment = self.changeData(res.data.data.fullfillment)
            }else{
              this.$message.error(res.data.msg);
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
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  left: 6%;
  padding-left: 3%;
}
.better {
  width: 100%;
  height: 100%;
  padding-left: 3%;
  padding-top: 4%;
}
.fon1,
.fon {
  height: 80%;
  width: 40%;
  background: url("../../../assets/img/兑现率.png") no-repeat;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  font-size: 26px;
  padding: 60px 40px;
}
.Pleft {
  padding-left: 24px;
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
