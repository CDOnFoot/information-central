<template>
  <div class="forthwith-monitor">
    <!--<span style="color: #FFFFFF;">forthwith-monitor</span>-->
    <div class="control-module">
      <div class="select-menu">
        <a-row>
          <a-col :span="20" :offset="4">
            <a-tree :loadData="onLoadData" :treeData="treeData" />
          </a-col>
        </a-row>
      </div>
      <div class="show-area">
        <div class="select-module">
          <div class="view-name" @click="checkTopology">拓 补</div>
          <div class="view-name" @click="checkGeneralView">概 览</div>
          <div class="view-name" @click="checkConfig">配 置</div>
        </div>
        <div class="router-link">
          <!-- 子组件渲染出口 -->
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forthwith-monitor",
  data() {
    return {
      treeData: [
        { title: "Expand to load", key: "0" },
        { title: "Expand to load", key: "1" },
        { title: "Tree Node", key: "2", isLeaf: true }
      ]
    };
  },

  mounted() {
    this.$router.push("/home/forthwithMonitor/topology");
  },

  methods: {
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: "Child Node", key: `${treeNode.eventKey}-0` },
            { title: "Child Node", key: `${treeNode.eventKey}-1` }
          ];
          this.treeData = [...this.treeData];
          resolve();
        }, 1000);
      });
    },

    checkTopology() {
      this.$router.replace("/home/forthwithMonitor/topology");
    },

    checkGeneralView() {
      this.$router.replace("/home/forthwithMonitor/generalView");
    },

    checkConfig() {
      this.$router.replace("/home/forthwithMonitor/config");
    }

    // checkTheModule() {
    //   let node = document.getElementsByClassName("view-name");
    //   console.log("choose the node:");
    //   console.log(node);
    // },
  }
};
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
  box-shadow: 0 0 30px rgba(0, 204, 255, 1) inset; /*控制阴影向内inset*/
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
  box-shadow: 0 0 10px rgba(0, 204, 255, 1) inset; /*控制阴影向内inset*/
  cursor: pointer;
}

.router-link {
  width: 100%;
}

.ant-row {
  position: relative;
  top: 40px;
}

.ant-tree,
.ant-tree-title {
  color: #fff !important;
}
</style>
