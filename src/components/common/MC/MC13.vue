
<template>
  <!--    模块内容一-->
  <div>
      MC13
  </div>
</template>
<script>
export default {
  name: "MC13",
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
