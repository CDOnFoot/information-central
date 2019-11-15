
<template>
  <!--   昨日客流OD显示 模块内容一-->
  <div>
   <div class="main">
      <!-- <div class="borde">{{mcTitle}}</div> -->
      <!-- <div :id="mcId" class="main-id"></div> -->
      <div class="main-idea">

        <!-- 顶部指标数据 -->
        <div class="idea-top">
          <div class="idea-top-left">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-l.png" alt="" class="sub-bg">
              <div class="sub-content">
                <!--  AG图表故障分析-->
                <div class="borde">AG图表故障分析</div>

              </div>
            </div>
          </div>
          <!-- 仪表板数据 -->
          <div class="idea-top-middle">
            <div class="top-middle-l">
               <div class="top-middle-key">
                <img src="../../../assets/img/idea-bg.png" alt="" class="idea-img">
              </div>
              <div class="top-middle-picture">
                
              </div>
            </div>
             <div class="top-middle-r">
               <div class="top-middle-key">
                <img src="../../../assets/img/idea-bg.png" alt="" class="idea-img">
              </div>
              <div class="top-middle-picture">
                
              </div>
            </div>
          </div>
          <div class="idea-top-right">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-r.png" alt="" class="sub-bg">
              <div class="sub-content">
                <!--  TVM图表故障分析-->
                <div class="borde">TVM图表故障分析</div>

              </div>
            </div>
          </div>
        </div>
        <!-- 底部图表数据 -->
        <div class="idea-bottom">
          <div class="idea-bottom-left">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-bl.png" alt="" class="sub-bg">
              <div class="sub-content">
                <!--  -->
              </div>
            </div>
          </div>
          <div class="idea-bottom-right">
            <div class="left-sub">
              <img src="../../../assets/img/idea-border-br.png" alt="" class="sub-bg">
              <div class="sub-content">
                <!--  -->
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
  name: "MC16",
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
  },
  created() {},
  methods: {
  }
};
</script>

<style scoped>
.main {
  color: #ffffff;
  position: relative;
  width: 100%;
  height: 100%;
}
.main-id{
  width: 100%;
  height: 100%;
  position: relative;
}
.idea-top-left{
  flex: 1;
  display: inline-flex;
  width: 100%;
  height: 100%;
}
.idea-top-middle{
  flex: 3;
  display: inline-flex;
  width: 100%;
  height: 100%;
  margin: 0.5%;
}
.idea-top-right{
  flex: 1;
  display: inline-flex;
  width: 100%;
  height: 100%;
}
.main-idea{
  width: 100%;
  height: 100%;
  position: relative;
}
.idea-top{
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}
.idea-bottom{
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  padding-top: 1%;
}
.idea-bottom-left{
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  flex: 1;
  padding-right: 0.5%;
}
.idea-bottom-right{
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  flex: 1;
  padding-left: 0.5%;
}
.top-middle-l{
  display: inline-flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-flow: column;
}
.top-middle-r{
  display: inline-flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-flow: column;
}
.top-middle-key{
  position: relative;
  width: 100%;
  height: 30%;
}
.top-middle-picture{
  position: relative;
  width: 550px;
  height: 300px;
  background: #ffffff;
  margin: 0 auto;
}
</style>
