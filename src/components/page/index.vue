<!--首页信息-->
<template>
    <keep-alive>
        <component :is="currentMB" :setFlag="setFlag" :menuIndex = "menuIndex" :resetFlag = "resetFlag" class="mb-content"></component>
    </keep-alive>
</template>

<script>
    import MB01 from '../../components/common/MB/MB01';
    import MB02 from '../../components/common/MB/MB02';
    export default {
        name: "index",
        data(){
            return{
              currentMB:'',
            }
        },
      props: ['menuIndex','setFlag','mbIndex','resetFlag'],
      created(){
        },
         components:{
            MB01,
            MB02
        },
      watch: {
        setFlag: function (val) {
          this.setFlag = val;
          console.log(val);
        },
        resetFlag: function (val) {
          this.resetFlag = val;
          console.log(val);
        },
        menuIndex: function (val) {
          console.log(val);
          this.currentMB = this.$common.menuList[val].mb.id;
          
        },
         mbIndex: function (val) {
           console.log(val);
          this.currentMB = this.$common.mbList[val].id;
        }
      },
      mounted() {
        // this.setFlag = this.$route.query.flag;
        this.currentMB = this.$common.menuList[this.menuIndex].mb.id;

        // 查看可视化界面内容数据信息
        this.getUserVisualization();
      },
      methods:{
        // 查看可视化界面内容数据信息
        getUserVisualization:function(){
          let self = this;
          this.userVisualizationList(function(data){
            self.visualizationInfo(data);
          })
        },
        userVisualizationList:function(callback){
          let self = this;
          let param={
            userNum: self.$common.getCookie('userNum'),
            menuNum:'CD01'
            };
          this.$http.post(self.$api.getUserVisualization, param).then(res =>{
            //调取数据成功
            if(res.data){
              if (res.data.code === "0") {
                callback(res.data.data)
              }
            }
          });
        },
        visualizationInfo:function(data){
          this.mbList = data
        },
      }
    }
</script>

<style scoped>
    .mb-content{
        position: relative;
        width: 100%;
        height: 90%;
    }
</style>
