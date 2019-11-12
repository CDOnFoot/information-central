
<template>
  <!--    模块内容一-->
  <div>
      MC14
  </div>
</template>
<script>
export default {
  name: "MC14",
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

</style>
