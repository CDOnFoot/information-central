<template>
<!--    模版一-->
  <div class="mb-main">
    <div class="mb-left">

      <!-- module choose modal -->
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
              <a-select defaultValue="" style="width: 120px" v-model="selectVal" @change="handleChange">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">主要</a-select-option>
                <a-select-option value="2">次要</a-select-option>
              </a-select>
              <!-- <a-button type="primary" shape="circle" icon="search" class="select-btn-search"></a-button> -->
            </div>
            <div class="main-item-mk">
              <div class="item-mk" v-for="(item,index) in mcList" :key="index" @click="mcSelect(index)">
                <div class="item-mk-content" :class="index===mcTempIndex?'active':''">
                  <div class="mk-item-title">{{item.contentName}}</div>
                  <img :src="require('../../../assets/img/'+item.contentNum+'.png') "  alt="" class="item-mk-img"> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-modal>

      <!-- left modules - 0 -->
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

          <!-- chosen module -->
          <div class="sub-content">
             <component :is="visualList.mb.mk[0].mc.contentNum" :mcTitle="visualList.mb.mk[0].mc.contentName"  :mcStatus="0" :mcId="visualList.mb.mk[0].mc.contentNum" class="mc-content"></component>
          </div>
        </div>
      </div>

      <!-- left module - 1 -->
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

      <!-- left module - 2 -->
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

    <!-- middle module -->
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

    <!-- right module -->
    <div class="mb-right">

      <!-- right module - 0 -->
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

      <!-- right module - 1 -->
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

      <!-- right module - 2 -->
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
    import MC08 from '../../../components/common/MC/MC08';
    import MC09 from '../../../components/common/MC/MC09';
    import MC10 from '../../../components/common/MC/MC10';
    import MC11 from '../../../components/common/MC/MC11';
    import MC12 from '../../../components/common/MC/MC12';
    import MC13 from '../../../components/common/MC/MC13';
    import MC14 from '../../../components/common/MC/MC14';
    import MC15 from '../../../components/common/MC/MC15';
    import MC16 from '../../../components/common/MC/MC16';

    export default {
        name: "MB01",
        data(){
          return{
            selectVal:'',
            btnList:'',
            title:'选择模块内容',
            visible: false,
            confirmLoading: false,
            mcList:[], // 当前可配置的所有模块的 list
            mcIndex:'',
            mcTempIndex:'',
            visibleIndex:'',
            visualList:{
              mb:{
                templateName:"模版一",
                templateNum:"MB01",
                mk:[
                  {
                    moduleNum:"MK01",
                    moduleName:"模块一",
                    mc:"",

                  },
                   {
                    moduleNum:"MK02",
                    moduleName:"模块二",
                    mc:"",

                  },
                  {
                    moduleNum:"MK03",
                    moduleName:"模块三",
                    mc:"",

                  },
                   {
                    moduleNum:"MK04",
                    moduleName:"模块四",
                    mc:"",

                  },
                   {
                    moduleNum:"MK05",
                    moduleName:"模块五",
                    mc:"",

                  },
                   {
                    moduleNum:"MK06",
                    moduleName:"模块六",
                    mc:"",

                  },
                   {
                    moduleNum:"MK07",
                    moduleName:"模块七",
                    mc:"",

                  },
                ]
              }
            },
          }
        },
      props: ['menuTempId','visualTempList','setFlag'],
      watch: {
         menuTempId: function (val) {
          this.menuList = val;
          this.menuTempId = val;
          // this.getUserVisualization();
        },
         visualTempList:function(val){
          this.visualList = JSON.parse(JSON.stringify(val));
        },
         setFlag:function(val){
          this.setFlag = val;
        }
      },
      // activated(){
      //   console.log(this.menuTempId);
      // },
      mounted(){
        // 接收监听值
          this.visualList = JSON.parse(JSON.stringify(this.visualTempList));
          // console.log(this.visualList);
          // 初始化模版内容
          this.getContentInfo();
          this.btnList = this.$common.btnList;
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
              userNum: self.$common.getCookie('dvptId'),
              menuNum: self.menuTempId
              };
            this.$http.postList(self.$api.getUserVisualization, param).then(res =>{
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
            let dataMap = data.menuList;
            this.visualListData = dataMap;
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
            if(!(this.mcTempIndex==='') && this.mcTempIndex!=undefined && this.mcTempIndex!=null){
              if(self.mcList[self.mcTempIndex].contentIndex === 1){
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
            }else{
              self.$info({
                title: '提示',
                content: '请先对模块内容进行选择',
                onOk() {},
              });
              self.confirmLoading = false;
            }
         
          },
          // 保存至选择项内操作信息
        saveHandleOk:function(){
          let self = this;
          var flag = false;
          this.visualList.mb.mk.some((items,indexs)=>{

            // 判断是否发生了布局信息的变化
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
          this.mcIndex = this.mcTempIndex;
          this.visualList.mb.mk[self.visibleIndex].mc = {
            contentIndex : self.mcList[this.mcTempIndex].contentIndex,
            contentName : self.mcList[this.mcTempIndex].contentName,
            contentNum : self.mcList[this.mcTempIndex].contentNum,
          };
          // 传值给父组件 如菜单index.vue
          self.$emit('saveSetMessage', self.visualList);


        },
        handleCancel(e) {
          this.visible = false;
          this.mcIndex = '';
          this.mcTempIndex ='';
        },
        mcChangeItem:function(index,type){
          let self = this;
          if(type!=2){
            this.visible = true;
            this.visibleIndex = index;
            this.selectVal ='';
            this.getContentInfo();

          }else{
            this.visibleIndex = index;
            this.showDeleteConfirm(index);
          }
        },
        showDeleteConfirm:function(paramIndex){
          let self = this;
          this.$confirm({
            title: '提醒',
            content: '确定移除该模块内容?',
            okText: '移除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                self.visualList.mb.mk[paramIndex].mc = '';
                self.$emit('saveSetMessage', self.visualList);
            },
            onCancel() {
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
          this.$http.postList(self.$api.getContentInfo, param).then(res =>{
            console.log('module MB01 init success,start the first http request.');
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
        contentInfo:function(data){
          let self = this;
          self.mcList= [];
           data.records.map((item,index)=>{
              if(item.contentIndex!=3){
                self.mcList.push(item);
              }
          });
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
          MC10,
          MC11,
          MC12,
          MC13,
          MC14,
          MC15,
          MC16,

      },
    }
</script>
<style scoped>
  .mc-content{
    width: 100%;
    height: 100%;
  }
</style>
