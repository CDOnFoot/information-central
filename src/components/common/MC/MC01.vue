<template>
  <!--   设备分析 模块内容一-->
  <div>
    <div class="main">
      <!--<div class="borde">{{mcTitle}}</div>-->
      <div class="borde">云计算&云桌面</div>
      <div class="module-icon">
        <span>{{this.$common.timestampToTime(new Date())}}</span>
      </div>
      <div :id="mcId" class="main-id">
        <div class="none-data">
          <div class="module-area" style="margin-left: 8%">
            <div class="module-area-item"
                 style="line-height: 30px; margin-bottom: 15px; width: 90%; border-bottom: 1px solid #ffffff">
              <b>云计算设备数量</b>
            </div>
            <div class="module-area-item">
              <!--<a-icon type="copy"/>-->
              <div class="indexZreo indexOne"><img src="../../../assets/img/index/MC01/03.png" alt=""></div>
              <span class="module-area-title">
                 计算板卡（个）
              </span>
              <span class="module-area-data">
                {{CloudComputing.ComputingBoard}}
              </span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexTwo"><img src="../../../assets/img/index/MC01/04.png" alt=""></div>
              <span class="module-area-title">
                 存储板卡（个）
              </span>
              <span class="module-area-data">
                {{CloudComputing.StorageCard}}
              </span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexThree"><img src="../../../assets/img/index/MC01/02.png" alt=""></div>
              <span class="module-area-title">
                 虚拟机（台）
              </span>
              <span class="module-area-data">
                {{CloudComputing.VirtualMachine}}
              </span>
            </div>
          </div>
          <div class="module-area" style="margin-left: 4%">
            <div class="module-area-item"
                 style="line-height: 30px; margin-bottom: 15px; width: 90%; border-bottom: 1px solid #ffffff">
              <b>云桌面设备数量</b>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexOne"><img src="../../../assets/img/index/MC01/03.png" alt=""></div>
              <span class="module-area-title">
                 计算板卡（个）
              </span>
              <span class="module-area-data">
                {{CloudDesktop.ComputingBoard}}
              </span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexTwo"><img src="../../../assets/img/index/MC01/04.png" alt=""></div>
              <span class="module-area-title">
                 存储板卡（个）
              </span>
              <span class="module-area-data">
                {{CloudDesktop.StorageCard}}
              </span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexThree"><img src="../../../assets/img/index/MC01/01.png" alt=""></div>
              <span class="module-area-title">
                 超融合GPU节点（台）
              </span>
              <span class="module-area-data">
                {{CloudDesktop.HyperfusionGPUNode}}
              </span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexFour"><img src="../../../assets/img/index/MC01/05.png" alt=""></div>
              <span class="module-area-title">
                 办公云桌面（台）
              </span>
              <span class="module-area-data">
                {{CloudDesktop.CloudDesktop}}
              </span>
            </div>
            <div class="module-area-item">
              <div class="indexZreo indexFive"><img src="../../../assets/img/index/MC01/06.png" alt=""></div>
              <span class="module-area-title">
                 图形工作站桌面（台）
              </span>
              <span class="module-area-data">
                {{CloudDesktop.WorkstationDesktop}}
              </span>
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
      return {
        CloudComputing: {
          ComputingBoard: 0,
          StorageCard: 0,
          VirtualMachine: 0,
        },
        CloudDesktop: {
          ComputingBoard: 0,
          StorageCard: 0,
          HyperfusionGPUNode: 0,
          CloudDesktop: 0,
          WorkstationDesktop: 0,
        },
      }
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
      let p1 = this.checkResource('');
      let p2 = this.checkResource('');
      Promise.all([p1, p2]).then((result) => {
        // console.log(result);
        let res0 = (result[0] == undefined) ? [] : result[0];
        let res1 = (result[1] == undefined) ? [] : result[1];

        // 云计算
        this.CloudComputing.ComputingBoard = res0.compute;
        this.CloudComputing.StorageCard = res0.storage;
        this.CloudComputing.VirtualMachine = res0.vm_server;
        // 云桌面
        this.CloudDesktop.ComputingBoard = res1.compute;
        this.CloudDesktop.StorageCard = res1.storage;
        this.CloudDesktop.HyperfusionGPUNode = res1.gpu_node;
        this.CloudDesktop.CloudDesktop = res1.cloud_desktop;
        this.CloudDesktop.WorkstationDesktop = res1.graph_workstation;

      }).catch((error) => {
        console.log(error);
      });

    },
    methods: {
      checkResource(counter) {
        const that = this;
        let param = {
          counter: counter,
          openstack_name: "车公庄数据中心",
          region_name: "RegionOne"
        };
        this.$http.get(that.$api.checkResourceTotal, param).then(res => {
          if (res.status === 200) {
            if (res) {
              // 填充数据
              return res;
            } else {
              // 当数据库里没有数据时的处理
              return {
                "vm_server": 25,
                "compute": 18,
                "gpu_node": 0,
                "storage": 0,
                "graph_workstation": 0,
                "cloud_desktop": 25
              };
            }
          }
        });
      },

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

  .main-id {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .none-data {
    font-size: 14px;
    padding-top: 32px;
    width: 98%;
    height: 90%;
  }

  .module-area {
    float: left;
    width: 42%;
    height: 100%;
  }

  .module-area-item {
    margin: 15px 4px;
  }

  .module-area-item img {
    width: 16px;
    margin-left: 6px;
    margin-top: 6px;
  }

  .module-area-title {
    display: inline-block;
    width: 130px;
    margin-left: 5px;
    font-size: 12px;
  }

  .indexZreo {
    float: left;
    height: 28px;
    width: 28px;
    margin-top: -3px;
    border-radius: 14px;
  }

  .indexOne {
    background-color: #6b89ff;
  }

  .indexTwo {
    background-color: #feb64d;
  }

  .indexThree {
    background-color: #32d3eb;
  }

  .indexFour {
    background-color: #9287e7;
  }

  .indexFive {
    background-color: #60acfc;
  }

  .indexSix {
    background-color: #5bc49f;

  }
</style>
