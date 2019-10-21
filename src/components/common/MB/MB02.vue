<template>
<!--    模版一-->
  <div class="mb-main">
    <div class="mb-left">
            <a-modal
            :title="title"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            width="50%"
        >
         <div class="modal-content-mk">
          <div class="content-main-mk">
            <div class="main-item-mk">
              <div class="item-mk" v-for="(item,index) in mcList" :key="index" @click="mcSelect(index)">
                <div class="item-mk-content" :class="index===mcTempIndex?'active':''">
                  <div class="mk-item-title">{{item.title}}</div>
                  <img :src="require('../../../assets/img/mcBg'+index+'.png') "  alt="" class="item-mk-img"> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-modal>
      <!-- 1 -->
      <div class="left">
        <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
            <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(0,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
            </div>
          </div>
          <div class="sub-content">
             <component :is="currentMC.mc[0].key" :mcTitle="currentMC.mc[0].title"  :mcStatus="0" class="mc-content"></component>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <div class="left">
         <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
              <div class="sub-btn">
                  <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(1,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
      
            <div class="sub-content">
             <component :is="currentMC.mc[1].key" :mcTitle="currentMC.mc[1].title" :mcStatus="1" class="mc-content"></component>
          </div>
        </div>
      </div>

      <!-- 3 -->
      <div class="left">
         <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(2,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[2].key" :mcTitle="currentMC.mc[2].title" :mcStatus="2" class="mc-content"></component>
          </div>
        </div>
      </div>
    </div>
    <div class="keyTemp">
      <div class="keyMain-top">
        <img src="../../../assets/img/main-border.png" alt="" class="main-bg">
        <div class="hide-sub-key" v-show="setFlag">
            <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(3,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
            </div>
          </div>
        <div class="sub-content">
             <component :is="currentMC.mc[3].key" :mcTitle="currentMC.mc[3].title"  :mcStatus="3" class="mc-content"></component>
          </div>
      </div>

      <div class="keyMain-bottom">
        <img src="../../../assets/img/main-border-b.png" alt="" class="main-bg">
        <div class="hide-sub-key-b" v-show="setFlag">
            <div class="sub-btn">
                 <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(4,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
            </div>
          </div>
        <div class="sub-content">
             <component :is="currentMC.mc[4].key" :mcTitle="currentMC.mc[4].title"  :mcStatus="4" class="mc-content"></component>
          </div>
      </div>

    </div>
   <div class="mb-right">
      <div class="right">
         <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(5,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[5].key"  :mcTitle="currentMC.mc[5].title"  :mcStatus="5" class="mc-content"></component>
          </div>
        </div>
      </div>
       <div class="right">
         <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(6,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[6].key"  :mcTitle="currentMC.mc[6].title" :mcStatus="6" class="mc-content"></component>
          </div>
        </div>
      </div>
       <div class="right">
         <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(7,index)" v-show="(index===0 && !currentMC.mc[0].key) || (index===1 && currentMC.mc[0].key) || (index===2 && currentMC.mc[0].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[7].key"  :mcTitle="currentMC.mc[7].title" :mcStatus="7" class="mc-content"></component>
          </div>
        </div>
      </div>
    </div>
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
    export default {
        name: "MB02",
        data(){
          return{
            currentMC:{
              mbId:'MB02',
             mc:[{
                key:'',
                type:'',
                title:'',
              },{
                key:'',
                type:'',
                title:'',

              },{
                key:'',
                type:'',
                title:'',

              },{
                key:'',
                type:'',
                title:'',

              },{
                key:'',
                type:'',
                title:'',

              },{
                key:'',
                type:'',
                title:'',

              },{
                key:'',
                type:'',
                title:'',
              },{
                key:'',
                type:'',
                title:'',
              }]
            },
            menuList:'',
            btnList:'',
            setItemFlag:true,
            title:'选择模块内容',
            visible: false,
            confirmLoading: false,
            mcList:'',
            mcIndex:0,
            mcTempIndex:'',
            visibleIndex:0,

          }
        },
      props: ['setFlag'],
      watch: {
        setFlag: function (val) {
          this.setFlag = val;
        }
      },
      mounted(){
          // 初始化模版内容
          this.initCurrentMC();
          this.btnList = this.$common.btnList;
          this.mcList = this.$common.mcList;
        },

        created(){
        },
        methods:{
          mcSelect:function(param){
            this.mcTempIndex = param;
          },
          handleOk(e) {
            this.confirmLoading = true;
            var flag = false;
            let self = this;

            if(this.$common.mcList[self.mcTempIndex].type ==='main'){

              if(this.visibleIndex !=3){
                  self.$info({
                      title: '提示',
                      content: '所选模块内容为主要指标，不可保存至次要指标区域内，请重新选择',
                      onOk() {},
                    });
                    self.confirmLoading = false;
              }else{
                console.log("执行")
                this.saveHandleOk();
              }
            }else{
              if(this.visibleIndex ===3){
                  self.$info({
                      title: '提示',
                      content: '所选模块内容为次要指标，不可保存至主要指标区域内，请重新选择',
                      onOk() {},
                    });
                    self.confirmLoading = false;
              }else{
                console.log("执行")
                this.saveHandleOk();
              }
            }
          },
         // 保存至选择项内操作信息
          saveHandleOk:function(){
            let self = this;
            var flag = false;
            this.currentMC.mc.some((items,indexs)=>{
              if(items.key ===self.$common.mcList[self.mcTempIndex].id){
                   self.$info({
                      title: '提示',
                      content: '所选模块内容在当前界面已存在，请重新选择',
                      onOk() {},
                    });
                    flag = true;
                    this.confirmLoading = false;
                    return false;
              }
            });
            if(!flag){
              setTimeout(() => {
                this.visible = false;
                this.mcTempIndex = '';
                this.confirmLoading = false;
              }, 1000);
            this.saveMCFunction();
            }
          },
          // 保存模块内容信息
          saveMCFunction:function(){
            console.log("保存模块内容信息：",this.mcList[this.mcTempIndex].title,this.mcList[this.mcTempIndex].id,this.mcTempIndex);
            this.mcIndex = this.mcTempIndex;
            this.currentMC.mc[this.visibleIndex].key = this.$common.mcList[this.mcTempIndex].id;
            this.currentMC.mc[this.visibleIndex].type = this.$common.mcList[this.mcTempIndex].type;
            this.currentMC.mc[this.visibleIndex].title = this.$common.mcList[this.mcTempIndex].title;

          },
          handleCancel(e) {
            this.visible = false;
            this.mcIndex = 0;
          },
    
          mcChangeItem:function(index,type){
            console.log(this.menuList[0].mb.mk[index].title,this.menuList[0].mb.mk[index].id,index);
            console.log(this.btnList[type].title,type);
          
            let self = this;
            if(type!=2){
              this.visible = true;
              this.visibleIndex = index;
              console.log(this.visibleIndex,"添加或者替换模块内容");
            }else{
              console.log("移除模块内容");
              this.visibleIndex = index;
              console.log(this.visibleIndex,"删除模块内容");
              this.showDeleteConfirm();
            }
            
          },
          showDeleteConfirm:function(){
            let self = this;
            this.$confirm({
              title: '提醒',
              content: '确定移除该模块内容?',
              okText: '删除',
              okType: 'danger',
              cancelText: '取消',
              onOk() {
                console.log('删除成功');
                //  self.mcIndex = 0;
                  self.currentMC.mc[self.visibleIndex].key = '';
                  self.currentMC.mc[self.visibleIndex].type = '';
                  self.currentMC.mc[self.visibleIndex].title = '';
              },
              onCancel() {
                console.log('取消删除');
              },
            });
          },
        // 初始化模版内容
          initCurrentMC:function(){
            let self = this;
            this.initMC(function(data){
              self.currentMcInfo(data);
            })
          },
          initMC:function(callback){
            let self = this;
            this.menuList = this.$common.menuList;

            this.menuList.some((item,index)=>{
              if(item.mb){
                if(item.mb.id === self.currentMC.mbId){
                  item.mb.mk.some((items,indexs)=>{
                    if(items.mc){
                      self.currentMC.mc[indexs].key = self.$common.menuList[index].mb.mk[indexs].mc.id;
                      self.currentMC.mc[indexs].type = self.$common.menuList[index].mb.mk[indexs].mc.type;
                      self.currentMC.mc[indexs].title = self.$common.menuList[index].mb.mk[indexs].mc.title;
                      
                      return false;
                    }
                  });
                  callback(this.currentMC);
                }
              }
          
            });
          },
          currentMcInfo:function(data){
            console.log(data);
          },
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

        },
    }
</script>

<style scoped>

</style>
