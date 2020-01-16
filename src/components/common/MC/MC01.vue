
<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <div class="main111">
      </div>
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">PDU</div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="module-area">
            <div class="PUD-module-0">
              <div class="module-value-popover-0">
                <a-popover title="详情">
                  <template slot="content">
                    <p>是否坏点：{{ totalCapacity.isBadPoint ? "是" : "否" }}</p>
                  </template>
                  <!--<a-button type="primary"></a-button>-->
                  <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                  <span>总输入功率<hr/>{{ totalCapacity.pointValue }}kW</span>
                  <!--<span>总输入功率<hr/>test</span>-->
                </a-popover>
              </div>
            </div>

            <div class="PUD-module-1">
              <div class="module-value-popover-1">
                <a-popover title="详情">
                  <template slot="content">
                    <p>是否坏点：{{ electricEnergy.isBadPoint ? "是" : "否" }}</p>
                  </template>
                  <!--<a-button type="primary"></a-button>-->
                  <!--<img src="../../../assets/img/main/设备点.png" alt="" width="20" height="24">-->
                  <span>总输入电能<hr/>{{ electricEnergy.pointValue }}kWh</span>
                  <!--<span>总输入电能<hr/>test</span>-->
                </a-popover>
              </div>
            </div>
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
    created() {
      // 必须在组件挂载前拿到数据
      const pointsList = this.$store.getters.getPointsList;
      this.totalCapacity = JSON.parse(pointsList)[1036]; // 总输入功率
      this.electricEnergy = JSON.parse(pointsList)[1035]; // 总输入电能
    },
    methods: {
    }
  };
</script>

<style scoped>
.main111 {
    margin-left: 56%;
    height: 15px;
    width: 110px;
    background: url('../../../assets/img/loading.png');
  }
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

  .module-area {
    display: flex;
    flex-direction: row;
    padding-top: 15px;
  }

  .module-value-popover-0 {
    position: absolute;
    top: 42%;
    left: 14.5%;
  }

  .module-value-popover-1 {
    position: absolute;
    top: 42%;
    left: 64%;
  }

  .PUD-module-0 {
    width: 47%;
    height: 230px;
    background: url("../../../assets/img/enterPel.png") no-repeat;
    background-size: 100% 100%;
  }

  .PUD-module-1 {
    width: 47%;
    height: 230px;
    background: url("../../../assets/img/outPel.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
