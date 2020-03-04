<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">云计算&云桌面</div>
      <div class="module-icon">
        <span style="font-size: 14px">{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="module-area">
            <div class="module-area-item"
                 style="line-height: 30px; margin-bottom: 15px; width: 90%; border-bottom: 1px solid #ffffff">
              <b>云计算设备数量</b>
            </div>
            <div class="module-area-item">
              <!--<a-icon type="copy"/>-->
              <div class="indexZreo indexThree"><img src="../../../assets/img/index/MC01/03.png" alt=""></div>
              <span class="module-area-title">
                 计算板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexFour"><img src="../../../assets/img/index/MC01/04.png" alt=""></div>
              <span class="module-area-title">
                 存储板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexTwo"><img src="../../../assets/img/index/MC01/02.png" alt=""></div>
              <span class="module-area-title">
                 虚拟机（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
          </div>
          <div class="module-area">
            <div class="module-area-item"
                 style="line-height: 30px; margin-bottom: 15px; width: 90%; border-bottom: 1px solid #ffffff">
              <b>云桌面设备数量</b>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexThree"><img src="../../../assets/img/index/MC01/03.png" alt=""></div>
              <span class="module-area-title">
                 计算板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexFour"><img src="../../../assets/img/index/MC01/04.png" alt=""></div>
              <span class="module-area-title">
                 存储板卡（个）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexOne"><img src="../../../assets/img/index/MC01/01.png" alt=""></div>
              <span class="module-area-title">
                 超融合GPU节点（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexFive"><img src="../../../assets/img/index/MC01/05.png" alt=""></div>
              <span class="module-area-title">
                 办公云桌面（台）
              </span>
              <span class="module-area-data">15</span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexSix"><img src="../../../assets/img/index/MC01/06.png" alt=""></div>
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
    margin-left: 4%;
  }

  .module-area-item {
    margin: 8px 0;
  }

  .module-area-item img {
    width: 18px;
    margin-left: 5px;
    margin-top: 5px;
  }

  .module-area-title {
    display: inline-block;
    width: 140px;
    margin-left: 5px;
    font-size: 12px;
  }
.indexSix{
  background-color: #6b89ff;
}
.indexFive{
  background-color: blueviolet;
}
.indexOne{
  background-color: #34abff;
}
.indexFour{
  background-color: #ff9745;
}
.indexThree{
  background-color: blueviolet;
}
.indexTwo{
  background-color: #34abff;
}
.indexZreo{
    height: 28px;
    width: 28px;
    float: left;
    border-radius: 14px;
}
</style>
