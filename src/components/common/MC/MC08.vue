
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <div class="borde">{{mcTitle}}</div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="">
            <div class="PUD-module-0"></div>
            <div class="PUD-module-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC08",
  data() {
    return {
      totalCapacity: '', // 总功率
      electricEnergy: '' // 电能
    };
  },
  props: ["mcStatus", "mcTitle", "mcId"],
  watch: {
    mcStatus: function(val) {
      this.mcStatus = val;
    },
    mcTitle: function(val) {
      console.log(this.mcTitle);
      this.mcTitle = val;
    },
    mcId: function(val) {
      this.mcId = val;
    }
  },
  mounted() {
  },
  created() {},
  methods: {
  }
};
</script>

<style scoped>
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
.none-data{
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
}

  .PUD-module-0 {
    background: url("../../../assets/img/enterPel.png") no-repeat;
    background-size: 100% 100%;
  }

  .PUD-module-1 {
    background: url("../../../assets/img/outPel.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
