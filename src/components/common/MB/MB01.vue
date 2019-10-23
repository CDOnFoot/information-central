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
            <div class="select-main">
              <div class="select-main-title">指标类型：</div>
              <a-select defaultValue="all" style="width: 120px" @change="handleChange">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="main">主要</a-select-option>
                <a-select-option value="sub">次要</a-select-option>
              </a-select>
              <!-- <a-button type="primary" shape="circle" icon="search" class="select-btn-search"></a-button> -->
            </div>
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
             <component :is="currentMC.mc[0].key" :mcTitle="currentMC.mc[0].title"  :mcStatus="0" :mcId="currentMC.mc[0].key" class="mc-content"></component>
          </div>
        </div>
      </div>
      <div class="left">
         <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                    <a-button size="small" class="item-btn" @click="mcChangeItem(1,index)" v-show="(index===0 && !currentMC.mc[1].key) || (index===1 && currentMC.mc[1].key) || (index===2 && currentMC.mc[1].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
      
            <div class="sub-content">
             <component :is="currentMC.mc[1].key" :mcTitle="currentMC.mc[1].title" :mcStatus="1"  :mcId="currentMC.mc[1].key" class="mc-content"></component>
          </div>
        </div>
      </div>
      <div class="left">
         <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                   <a-button size="small" class="item-btn" @click="mcChangeItem(2,index)" v-show="(index===0 && !currentMC.mc[2].key) || (index===1 && currentMC.mc[2].key) || (index===2 && currentMC.mc[2].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[2].key" :mcTitle="currentMC.mc[2].title" :mcStatus="2"  :mcId="currentMC.mc[2].key" class="mc-content"></component>
          </div>
        </div>
      </div>
    </div>
    <div class="keyTemp">
      <div class="keyMain">
        <img src="../../../assets/img/main-border.png" alt="" class="main-bg">
        <div class="hide-sub-key" v-show="setFlag">
            <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                 <a-button size="small" class="item-btn" @click="mcChangeItem(3,index)" v-show="(index===0 && !currentMC.mc[3].key) || (index===1 && currentMC.mc[3].key) || (index===2 && currentMC.mc[3].key)">
                  {{item.title}}</a-button>
              </div>
            </div>
          </div>
        <div class="sub-content">
             <component :is="currentMC.mc[3].key"  :mcTitle="currentMC.mc[3].title"  :mcStatus="3"  :mcId="currentMC.mc[3].key" class="mc-content"></component>
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
                  <a-button size="small" class="item-btn" @click="mcChangeItem(4,index)" v-show="(index===0 && !currentMC.mc[4].key) || (index===1 && currentMC.mc[4].key) || (index===2 && currentMC.mc[4].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[4].key" :mcTitle="currentMC.mc[4].title"  :mcStatus="4"  :mcId="currentMC.mc[4].key" class="mc-content"></component>
          </div>
        </div>
      </div>
       <div class="right">
         <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                    <a-button size="small" class="item-btn" @click="mcChangeItem(5,index)" v-show="(index===0 && !currentMC.mc[5].key) || (index===1 && currentMC.mc[5].key) || (index===2 && currentMC.mc[5].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[5].key" :mcTitle="currentMC.mc[5].title"  :mcStatus="5"  :mcId="currentMC.mc[5].key" class="mc-content"></component>
          </div>
        </div>
      </div>
       <div class="right">
         <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                   <a-button size="small" class="item-btn" @click="mcChangeItem(6,index)" v-show="(index===0 && !currentMC.mc[6].key) || (index===1 && currentMC.mc[6].key) || (index===2 && currentMC.mc[6].key)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="currentMC.mc[6].key"  :mcTitle="currentMC.mc[6].title" :mcStatus="6"  :mcId="currentMC.mc[6].key" class="mc-content"></component>
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
        name: "MB01",
        data(){
          return{
            currentMC:{
              mbId:'MB01',
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
              }]
            },
            menuList:'',
            btnList:'',
            setItemFlag:false,
            title:'选择模块内容',
            visible: false,
            confirmLoading: false,
            mcList:'',
            mcIndex:0,
            mcTempIndex:'',
            visibleIndex:0,
          }
        },
      props: ['setFlag','resetFlag'],
      watch: {
        setFlag: function (val) {
          // console.log(val);
          this.setFlag = val;
        },
        resetFlag: function (val) {
          // console.log(val)

          // 检测当选择模版后会清空当前所有的模块内容
          // 此时重新调用获取当前模块内容信息
          this.resetFlag = val;
          this.initCurrentMC();
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
          handleChange(value) {
            let self = this;
            self.mcList =[];
            self.mcTempIndex = '';
            switch (value){
              case 'all':
                self.mcList = self.$common.mcList;
                break;

              case 'main':
              self.$common.mcList.map((item,index)=>{
                if(item.type ==='main'){
                  self.mcList.push(item);
                }
              })
              break;

              case 'sub':
              self.$common.mcList.map((item,index)=>{
                if(item.type ==='sub'){
                  self.mcList.push(item);
                }
              })
                break;
            }
          },
          mcSelect:function(param){
            // this.mcIndex = param;
            this.mcTempIndex = param;
          },
          // 确定选择模块内容操作信息
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
                // console.log("执行")
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
                // console.log("执行")
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
            // console.log("保存模块内容信息：",this.mcList[this.mcTempIndex].title,this.mcList[this.mcTempIndex].id,this.mcTempIndex);
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
            // console.log(this.menuList[0].mb.mk[index].title,this.menuList[0].mb.mk[index].id,index);
            // console.log(this.btnList[type].title,type);
          
            let self = this;
            if(type!=2){
              this.visible = true;
              this.visibleIndex = index;
              // console.log(this.visibleIndex,"添加或者替换模块内容");
            }else{
              // console.log("移除模块内容");
              this.visibleIndex = index;
              // console.log(this.visibleIndex,"删除模块内容");
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
                // console.log('删除成功');
                //  self.mcIndex = 0;
                  self.currentMC.mc[self.visibleIndex].key = '';
                  self.currentMC.mc[self.visibleIndex].type = '';
                  self.currentMC.mc[self.visibleIndex].title = '';
              },
              onCancel() {
                // console.log('取消删除');
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
            // console.log("MB01: "+self.resetFlag);
            this.menuList = this.$common.menuList;
            this.menuList.some((item,index)=>{
              if(item.mb){
                if(item.mb.id === self.currentMC.mbId){
                  item.mb.mk.some((items,indexs)=>{
                    if(self.resetFlag){
                        self.currentMC.mc[indexs].key = '';
                        self.currentMC.mc[indexs].type = '';
                        self.currentMC.mc[indexs].title = '';
                    }else{
                      if(items.mc){
                        self.currentMC.mc[indexs].key = self.$common.menuList[index].mb.mk[indexs].mc.id;
                        self.currentMC.mc[indexs].type = self.$common.menuList[index].mb.mk[indexs].mc.type;
                        self.currentMC.mc[indexs].title = self.$common.menuList[index].mb.mk[indexs].mc.title;
                        return false;
                      }
                    }
                  });
                  callback(this.currentMC);
                }
              }
            });
          },
          currentMcInfo:function(data){
            // console.log(data);
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
  .mc-content{
    width: 100%;
    height: 100%;
  }
</style>
