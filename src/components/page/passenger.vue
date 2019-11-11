<!--客流分析信息-->
<template>
    <keep-alive>
        <component :is="currentMB" :setFlag="setFlag" :menuTempId= "menuTempId" @saveSetMessage="saveSetMsg" :visualTempList="visualTempList" class="mb-content"></component>
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
           console.log(val);
          this.setFlag = val;
        },
        mbId: function (val) {
          console.log(val);
          this.currentMB = val;
        },
        menuId:function(val){
          console.log(val);
          this.menuId = val;
          this.menuTempId = val;
        },
        visualHomeList:function(val){
          console.log(val);
          this.visualHomeTempList = val;
          this.visualTempList = JSON.parse(JSON.stringify(val));
          this.currentMB = this.visualTempList.mb.templateNum;
        }
      },
      created(){
        this.visualHomeTempList = this.visualHomeList;
        this.visualTempList = JSON.parse(JSON.stringify(this.visualHomeList));

        if(this.visualTempList){
          this.currentMB = this.visualTempList.mb.templateNum;
        }
        this.menuTempId = this.menuId;
      },
      mounted() {
        this.currentMB = this.mbId;
        console.log(this.currentMB);
      },
      methods:{
        // 获取从子组件MB传值 模版可视化内容信息
        saveSetMsg:function(msgList){
          let self = this;
          // 再次上传至上一层home组件内/嵌套路由传值
          this.$emit('uploadSetMsg',msgList);
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



