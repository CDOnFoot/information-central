<template>
  <div class="content">
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">能量流图</div>
        <div class="mk-energy">
          <img src="../../../../assets/img/monitor/dev2.png" alt="">
        </div>
      </div>
    </div>
    <div class="mk">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="">
      <div class="mk-container">
        <div class="borde">供电状态</div>
        <div class="mk-electricity">
          <!--<img src="../../../../assets/img/计划开行.png" alt="">-->
          <div class="mk-electricity-status">正常</div>
        </div>
      </div>
    </div>
    <div class="mk" style="width: 100%;">
      <img class="mk-bg" src="../../../../assets/img/main-border-b.png" alt="" style="width: 95%; left: 2.5%">
      <div class="mk-container" style="width: 90%; left: 5%;">
        <div class="borde">电池后备时间</div>
        <div class="mk-battery">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kpi",
    data() {
      return {};
    },
    mounted() {
      this.initPage();
    },
    methods: {

      initPage() {

      },

      initChart1() {

      },
      initChart2() {

      },

    },
  };

</script>

<style scoped>
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .mk {
    width: 50%;
    height: 50%;
    float: left;
    position: relative;
  }

  .mk-bg {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 5%;
    left: 5%;
  }

  .mk-container {
    width: 84%;
    height: 84%;
    position: absolute;
    top: 8%;
    left: 8%;
  }

  .mk-energy img {
    height: 90%;
    position: absolute;
    top: 5%;
    left: 35%;
  }


  .mk-electricity{
    width: 100%;
    height:100%;
    background: url("../../../../assets/img/计划开行.png") no-repeat center;

    /*background: url("../../../../assets/img/sub-border-l.png") no-repeat center;*/


  }

  .mk-electricity-status {
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    position: absolute;
    top: 40%;
  }


  .mk-battery {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 14%;
    background: url("../../../../assets/img/table-bg.png") center;
    background-repeat: repeat-x;

  }


</style>
