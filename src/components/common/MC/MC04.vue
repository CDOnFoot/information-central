
<template>
  <!--   设备分析 模块内容一-->
  <div>
   <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">设备概览</div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="device-content">
            <div class="device-content-0"></div>
            <div class="device-content-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC04",
  data() {
    return {

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
    // const parentNode = this.$('.device-content-0').parent();
    const height = window.screen.height;
    // console.log(parentNode);
    this.$('.device-content-0').css({
      'height': height * 0.36 + 'px',
      'width': '98%'
    });
    this.$('.device-content-1').css({
      'height': height * 0.36 + 'px',
      'width': '98%'
    })
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

.device-content {
  margin-top: 15px;
}

  .device-content-0 {
    background: url("../../../assets/img/main/设备柜.png");
    background-size: 100% 100%;
  }

.device-content-1 {
  background: url("../../../assets/img/main/机房.png");
  background-size: 100% 100%;
}
</style>
