<template>
  <div class="content">
    <!--<img class="mk-bg" src="../../../../assets/img/form-bg.png" alt="">-->
    <div class="mk">
      <div class="mk-container">
        <div class="mk-pic">
        </div>
      </div>
    </div>
    <div class="mk">
      <div class="mk-container">
        <div class="mk-list">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {};
    },
    props: ['searchVal'],
    watch: {
      searchVal: function (val) {
        console.log(val);
      }
    },
    mounted() {

    },
    methods: {},
  };

</script>

<style scoped>
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .mk {
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
  }

  .mk-bg {
    width: 100%;
    height: 100%;
  }

  .mk-container {
    width: 84%;
    height: 84%;
    position: absolute;
    top: 8%;
    left: 8%;
  }

  .mk-pic {
    width: 100%;
    height: 100%;
    background: url("../../../../assets/img/monitor/dev2.png") no-repeat center;
    background-size: contain;
  }

  .mk-list {
    width: 100%;
    height: 100%;
    background: url("../../../../assets/img/table-bg.png") center;
    background-repeat: repeat;
  }

</style>
