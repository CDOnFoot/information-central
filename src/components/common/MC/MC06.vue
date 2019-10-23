<template>
  <!--    模块内容一-->
    <div class="main" :style="{width: '100%', height: '100%'}">
      <div class="borde">{{mcTitle}}</div>
      <div class="bluee">
            <a-table :columns="columns" :dataSource="data" size="small" :pagination="false" :showHeader="false"/>
      </div>
    </div>
</template>
<script>
import echarts from "echarts";
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: '1',
      age: '大树营站-东华站',
      address: '87282',
    },
    {
      key: '2',
      name: '2',
      age: '可乐村站-东华站',
      address: '82999',
    },
    {
      key: '3',
      name: '3',
      age: '大树营站 - 昆明南站',
      address: '73299',
    },
        {
      key: '4',
      name: '4',
      age: '可乐村站 - 昆明南站',
      address: '73022',
    },
        {
      key: '5',
      name: '5',
      age: '大树营站 - 斗南站',
      address: '69364',
    },
        {
      key: '6',
      name: '6',
      age: '古城站 - 东华站',
      address: '67299',
    },
        {
      key: '7',
      name: '7',
      age: '大树营站 - 吴家营站',
      address: '60938',
    },
  ];


export default {
    name: "MC06",
    data() {
      return {
        data,
        columns,
        mcList:'',
        mcId:'',
      };
    },
    props:['mcStatus','mcTitle'],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        this.mcTitle = val;
      }
    },
  mounted() {
    var self = this;
    this.mcList = this.$common.mcList;
    // this.mcId = this.$common.menuList[0].mb.mk[Number(self.mcStatus)].mc.id;
    // this.mcList.some((item,index)=>{
    //   if(item.id === this.mcId){
    //     self.mcTitle = self.mcList[index].title;
    //     return false;
    //   }
    // });
  },
  created() {

  },
  methods: {

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
.bluee{
  width: 100%;
  height: 100%;
    padding-left: 10%;
    padding-top: 10%;;
  background: url("../../../assets/img/排行.png") no-repeat;
}

</style>
