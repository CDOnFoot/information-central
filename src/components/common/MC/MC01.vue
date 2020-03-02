<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <div class="main111">
      </div>
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">云计算&云桌面</div>
      <div class="module-icon">
        <span>{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="module-area">
            <div class="module-area-item" style="margin-bottom: 15px">
              <b>云计算设备数量</b>
            </div>
            <div class="module-area-item">
              <!--<a-icon type="copy"/>-->
              <img src="../../../assets/img/index/MC01/03.png" alt="">
              <span class="module-area-title">
                 计算板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/04.png" alt="">
              <span class="module-area-title">
                 存储板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/02.png" alt="">
              <span class="module-area-title">
                 虚拟机（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
          </div>
          <div class="module-area">
            <div class="module-area-item" style="margin-bottom: 15px">
              <b>云桌面设备数量</b>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/03.png" alt="">
              <span class="module-area-title">
                 计算板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/04.png" alt="">
              <span class="module-area-title">
                 存储板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/01.png" alt="">
              <span class="module-area-title">
                 超融合GPU节点（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/05.png" alt="">
              <span class="module-area-title">
                 办公云桌面（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <img src="../../../assets/img/index/MC01/06.png" alt="">
              <span class="module-area-title">
                 图形工作站桌面（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MC01",
    data() {
      return {};
    },
    props: ["mcStatus", "mcTitle", "mcId"],
    watch: {
      mcStatus: function (val) {
        this.mcStatus = val;
      },
      mcTitle: function (val) {
        console.log(this.mcTitle);
        this.mcTitle = val;
      },
      mcId: function (val) {
        this.mcId = val;
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {}
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

  .main-id {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .none-data {
    font-size: 14px;
    padding-top: 40px;
    width: 98%;
    height: 90%;
  }

  .module-area {
    float: left;
    width: 45%;
    height: 100%;
    margin-left: 3%;
  }

  .module-area-item {
    margin: 8px 0;
  }

  .module-area-item img {
    width: 18px;
  }

  .module-area-title {
    display: inline-block;
    width: 140px;
    margin-left: 10px;
    font-size: 12px;
  }

  .module-area-data {
  }

</style>
