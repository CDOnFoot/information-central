
<template>
    <div class="mb-main">
        <component :is="visualList.mb.mk[0].mc.contentNum" :mcTitle="visualList.mb.mk[0].mc.contentName"  :mcStatus="0" :mcId="visualList.mb.mk[0].mc.contentNum" class="mc-content"></component>
    </div>
</template>
<script>
import MC13 from '../../../components/common/MC/MC13';
import MC14 from '../../../components/common/MC/MC14';

export default {
    name:'MB03',
     data(){
        return{
            btnList:'',
            menuList:'',
            visualList:{
                mb:{
                    templateName:"模版三",
                    templateNum:"MB03",
                    mk:[{
                        moduleNum:"MK01",
                        moduleName:"模块一",
                        mc:"",

                    }]
                }
            },
       

        }
      
    },
    props: ['menuTempId','visualTempList','setFlag'],
    watch: {
        menuTempId: function (val) {
        this.menuList = val;
        this.menuTempId = val;
    },
        visualTempList:function(val){
            this.visualList = JSON.parse(JSON.stringify(val));
            // console.log(val);
        },
        setFlag:function(val){
            this.setFlag = val;
        }
    },
    components:{
        MC13,
        MC14,
    },
    mounted(){
        // 接收监听值
          this.visualList = JSON.parse(JSON.stringify(this.visualTempList));
        //   console.log(this.visualList);
          this.btnList = this.$common.btnList;
    },

}
</script>

<style scoped>
  .mc-content{
    width: 100%;
    height: 100%;
  }
</style>