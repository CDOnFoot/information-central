<!--首页信息-->
<template>
    <!-- <keep-alive> -->
        <component :is="currentMB" :setFlag="setFlag" :menuTempId= "menuTempId" @saveSetMessage="saveSetMsg" :visualTempList="visualTempList" class="mb-content"></component>
    <!-- </keep-alive> -->
</template>
<script>
    import MB01 from '../../components/common/MB/MB01';
    import MB02 from '../../components/common/MB/MB02';
    export default {
        name: "index",
        data(){
            return{
              currentMB:'',
              visualTempList:'',//临时传参给模版界面 'MB0X',
              visualList:'',//实际查询到的数据List
              mb:'',//实际查询到的MBID
              menuTempId:'',
              visualHomeTempList:'',
            }
        },
      props: ['setFlag','mbId','menuId','visualHomeList'],
//  'menuIndex',
      components:{
        MB01,
        MB02
      },
      watch: {
         setFlag: function (val) {
          this.setFlag = val;
        },
        mbId: function (val) {
          console.log(val);
          this.currentMB = val;
        },
        menuId:function(val){
          this.menuId = val;
          this.menuTempId = val;
        },
        visualHomeList:function(val){
          this.visualHomeTempList = val;
          this.visualTempList = JSON.parse(JSON.stringify(val));
          this.currentMB = this.visualTempList.mb.templateNum;

        }
      },
      created(){
      },
      mounted() {
          // this.getUserVisualization();
      },
      methods:{
        // 获取从子组件MB传值 模版可视化内容信息
        saveSetMsg:function(msgList){
          console.log(msgList);
          let self = this;
          // 再次上传至上一层home组件内/嵌套路由传值
          this.$emit('uploadSetMsg',msgList);

        },
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
            userNum: self.$common.getCookie('dvptId'),
            menuNum: self.menuId
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
          this.visualList = data.menuList;
          this.mb = data.menuList.mb.templateNum;
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



