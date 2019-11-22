<template>
  <div class="forthwith-monitor">
    <!--<span style="color: #FFFFFF;">forthwith-monitor</span>-->
    <div class="control-module">
      <div class="select-menu"></div>

      <div class="show-area">
        <div class="select-module">
          <div class="view-name" @click="checkTopology">拓 补</div>
          <div class="view-name" @click="checkGeneralView">概 览</div>
          <div class="view-name">配 置</div>
        </div>
        <div class="router-link">
          <!-- 子组件渲染出口 -->
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "forthwith-monitor",
      data () {
          return {}
      },

      mounted () {
          this.$router.push('/home/forthwithMonitor/generalView');
      },

      methods: {
        /*checkTheModule (){
          let node = document.getElementsByClassName('view-name');
          console.log('choose the node:');
          console.log(node);
        },*/

        checkGeneralView () {
          this.$router.replace('/home/forthwithMonitor/generalView');
        },

        checkTopology () {
          this.$router.replace('/home/forthwithMonitor/generalView');
        }
      }
    }
</script>

<style scoped>
  .forthwith-monitor {
    padding: 10px 0 0 30px;
  }
  .control-module {
    display: flex;
  }

  .select-menu {
    flex: 0 25%;
    height: 840px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0, 204, 255, 1) inset;/*控制阴影向内inset*/
    /*background: url("../assets/image/home/u8754.png") no-repeat;*/
  }

  .show-area {
    /*width: 900px;*/
    flex: 0 72%;
    height: 840px;
    display: flex;
    margin-left: 20px;
    border-radius: 10px;
    box-shadow: 0 0 40px rgba(0, 204, 255, 1) inset;
  }

  .select-module {
    display: flex;
    /*height: 400%;*/
    flex-direction: column;
  }

  .view-name {
    color: #fff;
    padding: 94px 0 0 12px;
    flex: 0 33.3%;
    flex-wrap: wrap;
    width: 50px;
    font-size: 22px;
    border-radius: 5px 0 0 5px;
    /*box-shadow:10px 10px 10px red,20px 20px 20px blue;*/
    box-shadow: 0 0 10px rgba(0, 204, 255, 1) inset;/*控制阴影向内inset*/
  }
</style>
