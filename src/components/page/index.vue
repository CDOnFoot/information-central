<!--首页信息-->
<template>
    <keep-alive>
        <component :is="currentMB" :setFlag="setFlag" :resetFlag = "resetFlag" 
        :menuTempId= "menuTempId" @saveSetMessage="saveSetMsg" :formTempFlag="formTempFlag" :updateTempFlag="updateTempFlag" :visualTempList="visualTempList"
        class="mb-content"></component>
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
              visualList:'',
              visualTempList:'',//临时传参给模版界面 'MB0X'
              menuTempId:'',
              formTempFlag:'',
              updateTempFlag:'',
              visualHomeTempList:'',
            }
        },
      props: ['setFlag','mbId','resetFlag','menuId','formListFlag','updateFlag','visualHomeList'],
//  'menuIndex',
      components:{
        MB01,
        MB02
      },
      watch: {
        setFlag: function (val) {
          this.setFlag = val;
        },
        resetFlag: function (val) {
          this.resetFlag = val;
        },
        mbId: function (val) {
          console.log(val);
          this.currentMB = val;
        },
        menuId:function(val){
          this.menuId = val;
          this.menuTempId = val;
          console.log(this.menuId);
          // this.getUserVisualization();
        },
        //从父元素home.vue获取重置取消flag
        formListFlag:function(val){
          this.formListFlag = val;
          this.formTempFlag = val;
        },
        updateFlag:function(val){
          this.updateFlag = val;
          this.updateTempFlag = val;
        },
        visualHomeList:function(val){
          this.visualHomeTempList = val;
          this.visualTempList = JSON.parse(JSON.stringify(val));
          this.currentMB = this.visualTempList.mb.templateNum;
          console.log(this.visualHomeTempList);
          console.log(this.visualTempList);

        }
      },
      created(){
      },
      mounted() {
          // this.getUserVisualization();
      },
      methods:{
        // 获取从子组件MB传值 模版可视化内容信息
        saveSetMsg:function(msgList,msgFormList){
          console.log(msgList);
          let self = this;
          // 再次上传至上一层home组件内/嵌套路由传值
          this.$emit('uploadSetMsg',msgList,msgFormList);

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
          this.visualTempList = data.menuList;
          this.currentMB = data.menuList.mb.templateNum;
          // console.log(this.visualTempList);
          // console.log(this.currentMB);
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



