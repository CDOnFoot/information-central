<template>
  <!--    模块内容一-->
  <div class="main" :style="{width: '100%', height: '100%'}">
    <div class="borde">{{mcTitle}}</div>
    <div class="timeStamp">{{timeStamp}}</div>
    <div class="table-content">
      <img src="../../../assets/img/table-bg.png" alt="" class="table-bg">
      <a-table
        :columns="columns"
        :dataSource="dataList"
        size="small"
        :pagination="false"
        :showHeader="false"
        :loading="loadFlag"
        class="table-main"
      />
    </div>
  </div>
</template>
<script>

export default {
  name: "MC06",
  data() {
    return {
      timeInterval: "",
      timeStamp: "",
      // timeStamp: this.$common.timestampToTime(new Date()),
      dataList:[],
      columns:[
        {
        title: "Name",
        dataIndex: "name",
         width: '15%',
      },
      {
        title: "OD",
        dataIndex: "od",
         width: '35%',
      },
      {
        title: "Flows",
        dataIndex: "flows",
        width: '50%',
      }],
      mcList: "",
      mcId: "",
      loadFlag:true,
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
   var self = this;
    this.mcList = this.$common.mcList;
    this.initSeniority();
    var timeStamp=1573066800000;  //11月7日凌晨3点的毫秒数
    var dayMins = 86400000;   //每天的毫秒数
    var setIntervalMins = 1000*30  //定时器刷新的时间间隔
    self.dataRef = setInterval(()=>{
      let currwntTime = Date.now();
      let minsMore = (currwntTime-timeStamp)%dayMins
      if(minsMore>0 && minsMore<=setIntervalMins){  //(当前时间-固定时间)对每日毫秒数 取余
        self.initSeniority();
      }
    },setIntervalMins)
  },
  created() {},
  methods: {
    initSeniority:function(){
        let self = this;
        this.seniorityInfo(function(data){
          self.seniorityInfoList(data);
        })
      },
      seniorityInfo:function(callback){
        let self = this;
        let param={
          };
        this.$http.get(self.$api.getODTopTen, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              callback(res.data.data);
            }else{
              this.$message.error(res.data.msg);
            }
          }
        });
      },
      seniorityInfoList:function(data){
        this.timeStamp = `展示日期：${data.daytime}`;
        this.dataList = [];
        data.result.map((item,index)=>{
          if(index<=6){
            item.key=JSON.stringify(item.name);
            item.flows = item.flows+'人次';
            this.dataList.push(item);
          }
        });
        this.loadFlag = false;
      },
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

.table-content{
  position: relative;
  min-width: 470px;
  min-height: 290px;
  overflow: hidden;
}
.table-bg{
  position: absolute;
  left: 0%;
  top: 4%;
  width: 100%;

}
.timeStamp {
  position: absolute;
  right: 10%;
  font-size: 16px;
  top: 12%;
  color: #ffffff;
  text-align: right;
}
.table-main{
  position: absolute;
  width: 100%;
  top: 20%;
  left: 7%;
}

</style>
