<!--首页信息-->
<template>
    <keep-alive>
        <component :is="currentMB" :setFlag="setFlag" class="mb-content"></component>
    </keep-alive>
</template>

<script>
    import MB01 from '../../components/common/MB/MB01';
    import MB02 from '../../components/common/MB/MB02';
    export default {
        name: "passenger",
        data(){
            return{
              currentMB:'',
            }
        },
      props: ['menuIndex','setFlag'],

      // menuIndex:0,

      created(){
        },
         components:{
            MB01,
            MB02
        },
      watch: {
        setFlag: function (val) {
          this.setFlag = val;
        }
      },
      mounted() {
        // console.log(this.menuIndex);
        // console.log(this.setFlag);
        // console.log(this.$route.query.flag);

          // this.setFlag = this.$route.query.flag;
        this.currentMB = this.$common.menuList[this.menuIndex].mb.id;

      },
      methods:{

      }
    }
</script>

<style scoped>

    .mb-content{
        position: relative;
        width: 100%;
        height: 90%;

        /* height: 94.9%; */
        /* min-height: calc(100vh - 90px); */
    }
</style>
