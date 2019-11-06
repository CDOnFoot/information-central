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
      fullfillment:"0%"  //兑现率
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
    // clearInterval(this.timeInterval);
    // this.timeInterval = setInterval(function() {
    //   self.timeStamp = self.$common.timestampToTime(new Date());
    // }, 1000);

    var self = this;
    this.mcList = this.$common.mcList;
    self.getData();
    //每15分钟刷新一次数据
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(function() {
      self.getData();
    }, 1000 * 60 * 15);
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

.dot-main {
    width: 100%;
    height: 100%;
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
