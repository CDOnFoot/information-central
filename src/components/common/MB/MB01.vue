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
              <a-select defaultValue="" style="width: 120px" @change="handleChange">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">主要</a-select-option>
                <a-select-option value="2">次要</a-select-option>
              </a-select>
              <!-- <a-button type="primary" shape="circle" icon="search" class="select-btn-search"></a-button> -->
            </div>
            <div class="main-item-mk">
              <div class="item-mk" v-for="(item,index) in mcList" :key="index" @click="mcSelect(index)">
                <div class="item-mk-content" :class="index===mcTempIndex?'active':''">
                  <div class="mk-item-title">{{item.contentNum}}</div>
                  <img :src="require('../../../assets/img/'+item.contentNum+'.png') "  alt="" class="item-mk-img"> 
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
                <a-button size="small" class="item-btn" @click="mcChangeItem(0,index)" v-show="(index===0 && !visualList.mb.mk[0].mc.contentNum) || (index===1 && visualList.mb.mk[0].mc.contentNum) || (index===2 && visualList.mb.mk[0].mc.contentNum)">
                {{item.title}}</a-button>
              </div>
            </div>
          </div>

          <div class="sub-content">
             <component :is="visualList.mb.mk[0].mc.contentNum" :mcTitle="visualList.mb.mk[0].mc.contentName"  :mcStatus="0" :mcId="visualList.mb.mk[0].mc.contentNum" class="mc-content"></component>
          </div>
        </div>
      </div>
      <div class="left">
         <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                    <a-button size="small" class="item-btn" @click="mcChangeItem(1,index)" v-show="(index===0 && !visualList.mb.mk[1].mc.contentNum) || (index===1 && visualList.mb.mk[1].mc.contentNum) || (index===2 && visualList.mb.mk[1].mc.contentNum)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
      
            <div class="sub-content">
             <component :is="visualList.mb.mk[1].mc.contentNum" :mcTitle="visualList.mb.mk[1].mc.contentName" :mcStatus="1"  :mcId="visualList.mb.mk[1].mc.contentNum" class="mc-content"></component>
          </div>
        </div>
      </div>
      <div class="left">
         <div class="left-sub">
          <img src="../../../assets/img/sub-border-l.png" alt="" class="sub-bg">
          <div class="hide-sub-left" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                   <a-button size="small" class="item-btn" @click="mcChangeItem(2,index)" v-show="(index===0 && !visualList.mb.mk[2].mc.contentNum) || (index===1 && visualList.mb.mk[2].mc.contentNum) || (index===2 && visualList.mb.mk[2].mc.contentNum)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="visualList.mb.mk[2].mc.contentNum" :mcTitle="visualList.mb.mk[2].mc.contentName" :mcStatus="2"  :mcId="visualList.mb.mk[2].mc.contentNum" class="mc-content"></component>
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
                 <a-button size="small" class="item-btn" @click="mcChangeItem(3,index)" v-show="(index===0 && !visualList.mb.mk[3].mc.contentNum) || (index===1 && visualList.mb.mk[3].mc.contentNum) || (index===2 && visualList.mb.mk[3].mc.contentNum)">
                  {{item.title}}</a-button>
              </div>
            </div>
          </div>
        <div class="sub-content">
             <component :is="visualList.mb.mk[3].mc.contentNum"  :mcTitle="visualList.mb.mk[3].mc.contentName"  :mcStatus="3"  :mcId="visualList.mb.mk[3].mc.contentNum" class="mc-content"></component>
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
                  <a-button size="small" class="item-btn" @click="mcChangeItem(4,index)" v-show="(index===0 && !visualList.mb.mk[4].mc.contentNum) || (index===1 && visualList.mb.mk[4].mc.contentNum) || (index===2 && visualList.mb.mk[4].mc.contentNum)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="visualList.mb.mk[4].mc.contentNum" :mcTitle="visualList.mb.mk[4].mc.contentName"  :mcStatus="4"  :mcId="visualList.mb.mk[4].mc.contentNum" class="mc-content"></component>
          </div>
        </div>
      </div>
       <div class="right">
         <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
              <div class="sub-btn">
                <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                    <a-button size="small" class="item-btn" @click="mcChangeItem(5,index)" v-show="(index===0 && !visualList.mb.mk[5].mc.contentNum) || (index===1 && visualList.mb.mk[5].mc.contentNum) || (index===2 && visualList.mb.mk[5].mc.contentNum)">
                  {{item.title}}</a-button>
                </div>
              </div>
            </div>
          <div class="sub-content">
             <component :is="visualList.mb.mk[5].mc.contentNum" :mcTitle="visualList.mb.mk[5].mc.contentName"  :mcStatus="5"  :mcId="visualList.mb.mk[5].mc.contentNum" class="mc-content"></component>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-sub">
          <img src="../../../assets/img/sub-border-r.png" alt="" class="sub-bg">
          <div class="hide-sub-right" v-show="setFlag">
            <div class="sub-btn">
              <div class="sub-btn-item" v-for="(item,index) in btnList" :key="index" :class="(index===0 || index===2)?'marginLeft':''">
                  <a-button size="small" class="item-btn" @click="mcChangeItem(6,index)" v-show="(index===0 && !visualList.mb.mk[6].mc.contentNum) || (index===1 && visualList.mb.mk[6].mc.contentNum) || (index===2 && visualList.mb.mk[6].mc.contentNum)">
                {{item.title}}</a-button>
              </div>
            </div>
          </div>
          <div class="sub-content">
             <component :is="visualList.mb.mk[6].mc.contentNum"  :mcTitle="visualList.mb.mk[6].mc.contentName" :mcStatus="6"  :mcId="visualList.mb.mk[6].mc.contentNum" class="mc-content"></component>
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
    // import MC08 from '../../../components/common/MC/MC08';
    // import MC09 from '../../../components/common/MC/MC09';
    export default {
        name: "MB01",
        data(){
          return{
            btnList:'',
            setItemFlag:false,
            title:'选择模块内容',
            visible: false,
            confirmLoading: false,
            mcList:'',
            mcIndex:'',
            mcTempIndex:'',
            visibleIndex:'',
            visualList:{
              mb:{
                mk:[
                  {
                    mc:{},
                  },
                  {
                    mc:{},
                  },
                  {
                    mc:{},
                  },
                  {
                    mc:{},
                  },
                  {
                    mc:{},
                  },
                  {
                    mc:{},
                  },
                  {
                    mc:{},
                  },
                ]
              }
            },
            visualParamList:'',
            visualFormList:'',
          }
        },
      props: ['setFlag','resetFlag','menuTempId'],
      watch: {
        setFlag: function (val) {
          this.setFlag = val;
        },
        resetFlag: function (val) {
          // 检测当选择模版后会清空当前所有的模块内容
          // 此时重新调用获取当前模块内容信息
          this.resetFlag = val;
          this.getContentInfo();
        },
         menuTempId: function (val) {
          this.menuList = val;
          this.menuTempId = val;
          this.getUserVisualization();
          console.log(1);
        }
      },
      mounted(){
          console.log(2);
          this.getUserVisualization();
          // 初始化模版内容
          this.getContentInfo();
          this.btnList = this.$common.btnList;
          // this.mcList = this.$common.mcList;
        },

        created(){
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
            menuNum: self.menuTempId
            };
          this.$http.post(self.$api.getUserVisualization, param).then(res =>{
            //调取数据成功
            if(res.data){
              if (res.data.code === "0") {
                callback(res.data.data)
              }else{
               this.$message.error(res.data.msg);
              }
            }
          });
        },
        visualizationInfo:function(data){
          this.visualList = data.menuList;
          this.visualParamList = data.menuList;
          this.visualFormList = data.menuList;
          console.log(this.visualList);
        },

        handleChange(value) {
          this.mcList =[];
          this.mcTempIndex = '';
          this.getContentInfo(value);
        },
        mcSelect:function(param){
          this.mcTempIndex = param;
        },
        // 确定选择模块内容操作信息
        handleOk(e) {
          let self = this;
          this.confirmLoading = true;
          let flag = false;
          if(this.$common.mcList[self.mcTempIndex].type ==='main'){
            if(this.visibleIndex !=3){
                self.$info({
                    title: '提示',
                    content: '所选模块内容为主要指标，不可保存至次要指标区域内，请重新选择',
                    onOk() {},
                  });
                  self.confirmLoading = false;
            }else{
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
              this.saveHandleOk();
            }
          }
        },
        // 保存至选择项内操作信息
        saveHandleOk:function(){
          let self = this;
          var flag = false;
          this.visualList.mb.mk.some((items,indexs)=>{
            if(items.mc.contentNum === self.mcList[self.mcTempIndex].contentNum){
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
          let self = this;
          // console.log("保存模块内容信息：",this.mcList[this.mcTempIndex].title,this.mcList[this.mcTempIndex].id,this.mcTempIndex);
          this.mcIndex = this.mcTempIndex;

          this.visualParamList.mb.mk[self.visibleIndex].mc= {
            contentIndex : self.mcList[this.mcTempIndex].contentIndex,
            contentName : self.mcList[this.mcTempIndex].contentName,
            contentNum : self.mcList[this.mcTempIndex].contentNum,
          };
          this.visualList.mb.mk[self.visibleIndex].mc = {
            contentIndex : self.mcList[this.mcTempIndex].contentIndex,
            contentName : self.mcList[this.mcTempIndex].contentName,
            contentNum : self.mcList[this.mcTempIndex].contentNum,
          };

          // this.currentMC.mc[this.visibleIndex].key = this.$common.mcList[this.mcTempIndex].id;
          // this.currentMC.mc[this.visibleIndex].type = this.$common.mcList[this.mcTempIndex].type;
          // this.currentMC.mc[this.visibleIndex].title = this.$common.mcList[this.mcTempIndex].title;
          this.$emit('saveSetMessage', this.visualList);
        },
        handleCancel(e) {
          this.visible = false;
          this.mcIndex = '';
          this.mcTempIndex ='';
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
            this.showDeleteConfirm(index);
          }
        },
        showDeleteConfirm:function(paramIndex){
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
                self.visualParamList.mb.mk[paramIndex].mc= '';
                self.visualList.mb.mk[paramIndex].mc = '';
                self.$emit('saveSetMessage', self.visualList);

            },
            onCancel() {
              // console.log('取消删除');
            },
          });
        },
        // 初始化模版内容
        getContentInfo:function(param){
          let self = this;
          this.contentInfoList(function(data,param){
            self.contentInfo(data);
          },param)
        },
        contentInfoList:function(callback,params){
          let self = this;
          let param={};
          if(params){
            param['contentIndex'] = params;
          }
          this.$http.post(self.$api.getContentInfo, param).then(res =>{
            //调取数据成功
            if(res.data){
              if (res.data.code === "0") {
                callback(res.data.data)
              }else{
                this.$message.error(res.data.msg);
              }
            }
          });

          // console.log("MB01: "+self.resetFlag);
          // this.menuList = this.$common.menuList;
          // this.menuList.some((item,index)=>{
          //   if(item.mb){
          //     if(item.mb.id === self.currentMC.mbId){
          //       item.mb.mk.some((items,indexs)=>{
          //         if(self.resetFlag){
          //             self.currentMC.mc[indexs].key = '';
          //             self.currentMC.mc[indexs].type = '';
          //             self.currentMC.mc[indexs].title = '';
          //         }else{
          //           if(items.mc){
          //             self.currentMC.mc[indexs].key = self.$common.menuList[index].mb.mk[indexs].mc.id;
          //             self.currentMC.mc[indexs].type = self.$common.menuList[index].mb.mk[indexs].mc.type;
          //             self.currentMC.mc[indexs].title = self.$common.menuList[index].mb.mk[indexs].mc.title;
          //             return false;
          //           }
          //         }
          //       });
          //       callback(this.currentMC);
          //     }
          //   }
          // });
        },
        contentInfo:function(data){
          console.log(data);
          this.mcList = data.records;
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
          // MC08,
          // MC09,
      },
    }
</script>
<style scoped>
  .mc-content{
    width: 100%;
    height: 100%;
  }
</style>
