
<template>
  <!--   昨日客流OD显示 模块内容一-->
  <div>
    <div class="main">
      <div class="borde">{{mcTitle}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MC15",
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
    font-weight: 700;
    color: #ffffff;
    border-left: #3467c5 solid 4px;
    position: absolute;
    top: 4%;
    left: 6%;
    font-size: 16px;
    padding-left: 3%;
    width: 60%;
}
</style>
