
<template>
    <div class="mb-main">
        <component :is="visualList.mb.mk[0].mc.contentNum" :mcTitle="visualList.mb.mk[0].mc.contentName"  :mcStatus="0" :mcId="visualList.mb.mk[0].mc.contentNum" class="mc-content"></component>
    </div>
</template>
<script>
    import MC01 from '../../../components/common/MC/MC01';
    import MC02 from '../../../components/common/MC/MC02';
    import MC03 from '../../../components/common/MC/MC03';
    import MC04 from '../../../components/common/MC/MC04';
    import MC05 from '../../../components/common/MC/MC05';
    import MC06 from '../../../components/common/MC/MC06';
    import MC07 from '../../../components/common/MC/MC07';
    import MC08 from '../../../components/common/MC/MC08';
    import MC09 from '../../../components/common/MC/MC09';
    import MC10 from '../../../components/common/MC/MC10';
    import MC11 from '../../../components/common/MC/MC11';
    import MC12 from '../../../components/common/MC/MC12';
    import MC13 from '../../../components/common/MC/MC13';
    import MC14 from '../../../components/common/MC/MC14';

export default {
    name:'MB05',
     data(){
        return{
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
    components:{
        MC01,
        MC02,
        MC03,
        MC04,
        MC05,
        MC06,
        MC07,
        MC08,
        MC09,
        MC10,
        MC11,
        MC12,
        MC13,
        MC14,
    } 
}
</script>

<style scoped>

</style>