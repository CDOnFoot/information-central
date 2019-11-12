
<template>
  <!--    模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div :id="mcId" class="main-id"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "MC08",
  data() {
    return {
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
  },
  created() {},
  methods: {

  }
};
</script>

<style scoped>
.main {
  color: #ffffff;
  padding: 10px;
}
</style>
