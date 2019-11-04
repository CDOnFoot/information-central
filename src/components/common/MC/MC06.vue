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
      columns:[{
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
    // clearInterval(this.timeInterval);
    // this.timeInterval = setInterval(function() {
    //   self.timeStamp = self.$common.timestampToTime(new Date());
    // }, 1000);
    // var self = this;
    // this.mcList = this.$common.mcList;
    this.initSeniority();
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
        this.timeStamp = data.daytime;
        this.dataList = [];
        data.result.map((item,index)=>{
          if(index<=6){
            item.key=JSON.stringify(item.name);
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
.borde {
  font-weight: 700;
  color: #3467c5;
  border-left: #3467c5 solid 4px;
  position: absolute;
  top: 4%;
  left: 6%;
  padding-left: 3%;
}
.table-content{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.table-bg{
  position: absolute;
  left: 0%;
  top: 3%;
  width: 100%;

}
.timeStamp {
  position: absolute;
  right: 75%;
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
