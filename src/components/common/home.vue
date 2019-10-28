<template>
  <a-layout id="components-layout" class="layout">
    <div>
      <a-modal
        :title="title"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        width="50%"
      >
        <div class="modal-content-mb">
          <div class="content-main-mb">
            <div class="main-item-mb">
              <div class="item-mb" v-for="(item,index) in mbList.records" :key="index" @click="mbSelect(index)">
                
                <div class="item-mb-content" :class="index===mbTempIndex?'active':''">
                  <div class="mb-item-title">{{item.templateName}}</div>
                  <img :src="require('../../assets/img/mbBg'+index+'.png') "  alt="" class="item-mb-img"> 
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
    <a-layout-header>
      <img src="../../assets/img/title-bg.png" alt="" class="header-bg">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="title">大数据分析决策平台</div>
      <div class="time">{{timeStamp}}</div>
      <div class="weather">
        <!-- <iframe width="70%" scrolling="no" height="36" frameborder="0" allowtransparency="false" src="//i.tianqi.com/index.php?c=code&id=1&color=%23FFFFFF&icon=1&py=beijing&wind=0&num=1&site=12" style="float:right;"></iframe> -->
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 1%;height:100%;min-height: calc(100vh - 8.3%);">
      <div class="load-content" v-show="loadFlag">
        <a-spin class="load-img" size="large" />
      </div>
      <router-view :menuIndex="menuIndex" :setFlag="setFlag" :mbIndex="mbIndex" :menuId="menuId" 
      :resetFlag="resetFlag" @uploadSetMsg="uploadSaveSetMsg" :formListFlag="formListFlag" :updateFlag="updateFlag"></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <div class="menu-list">
        <div class="menu-sub">
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
        </div>
        <div v-for="(item,index) in menuList.records" class="menu-item" :class="menuIndex==index?'font-active':''" :key="index"
             @click="selectMenu(index)">
          <div class="item-info">
            <img :src="menuIndex === index?require('../../assets/img/titleBg-active.png'):require('../../assets/img/titleBg.png')" alt="" class="menu-img">
            <div class="item-title">
              {{item.menuName}}
            </div>
          </div>
        </div>
        <div class="menu-sub">
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
        </div>
      </div>
      <div class="layout-btn">
        <a-button size="large" class="btn-item" @click="layoutSetting">布局配置</a-button>
        <a-button size="large" class="btn-item" v-show="setFlag" @click="saveSetMsg">保存</a-button>
        <a-button size="large" class="btn-item" v-show="setFlag" @click="cancelSetMsg">取消</a-button>
      </div>
      <div class="layout-selectBtn">
        <a-button size="large" class="btn-item" @click="layoutSelect" v-show="setFlag">选择模版</a-button>
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<script>
  export default {
    name: "home",
    data(){
      return{
        menuList:{},
        menuIndex:0,
        menuId:'',
        timeStamp: this.$common.timestampToTime(new Date()),
        timeInterval:'',
        setFlag:false,
        title:'选择模版内容',
        visible: false,
        confirmLoading: false,
        mbList:'',
        mbIndex:0,
        mbTempIndex:'',
        // setTempFlag:false,
        resetFlag:false,
        loadFlag:false,
        visualParamList:'',//参数可视化布局信息
        visualFormList:'',//标准可视化布局信息
        formListFlag:false,//取消布局重置信息
        updateFlag:'',//布局更新信息falg
      }
    },
    computed:{
    },
    created(){
      var routerVal = this.$router.currentRoute.path;
      this.getCurrentRoute(routerVal);

    },
    // beforeRouteUpdate (to, from, next) {
    //   console.log(to.matched[1].path);
    //   if(to.matched[1].path=='/home/index'){
    //       next();
    //   }else{
    //         this.$message.warning('功能暂未开启');
    //   }
    // },
    mounted() {
      let self = this;
      
      // 查看菜单栏数据信息
      this.getMenuInfo();

      // 查看模版内容数据信息
      this.getTemplateInfo();


      // this.menuList = this.$common.menuList;
      // this.mbList = this.$common.mbList;
      document.ondragstart = function() {
        return false;
      };
      clearInterval(this.timeInterval)
      this.timeInterval = setInterval(function(){
        self.timeStamp = self.$common.timestampToTime(new Date());
      },1000)
    },

    methods:{

      // 由子界面子路由传值结果
      uploadSaveSetMsg:function(msgList,msgFormList){
        console.log('由子界面子路由传值结果：',msgList,msgFormList);
        this.visualParamList = msgList;
        this.visualFormList = msgFormList;
        console.log(this.visualParamList.mb.mk[4].mc,this.visualFormList.mb.mk[4].mc);

      },
      // 查看菜单栏数据信息
      getMenuInfo:function(){
        let self = this;
        this.loadFlag = true;
        this.menuInfoList(function(data){
          self.menuInfo(data);
        })
      },
      // 查看菜单栏数据信息接口
      menuInfoList:function(callback){
        let self = this;
        let param={
        };
        this.$http.post(self.$api.getMenuInfo, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              callback(res.data.data);
            }else{
               this.$message.error(res.data.msg);
               self.loadFlag = false;
            }
          }
        });
      },
      // 处理菜单栏信息接口
      menuInfo:function(data){
        let self = this;
        this.menuList = data;
        this.menuId = data.records[0].menuNum;
        setTimeout(()=>{
          self.loadFlag = false;
        },300);
      },
      getTemplateInfo:function(){
        let self = this;
        this.templateInfoList(function(data){
          self.templateInfo(data);
        })
      },
      templateInfoList:function(callback){
        let self = this;
        let param={
          };
        this.$http.post(self.$api.getTemplateInfo, param).then(res =>{
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
      templateInfo:function(data){
        let self = this;
        this.mbList = data;
      
      },
     
      mbSelect:function(param){
        if(param<=1){
          this.mbTempIndex = param;
        
        }
      },
      handleOk(e) {
        let self = this;
        this.confirmLoading = true;
        if(self.$common.menuList[0].mb.id === this.mbList[self.mbTempIndex].id){
            self.$info({
              title: '提示',
              content: '所选模版内容即为当前界面模版，请重新选择',
              onOk() {},
            });
            self.confirmLoading = false;
            self.mbTempIndex = '';
            return false;
        }else{
          setTimeout(() => {
            self.visible = false;
            self.mcTempIndex = 0;
            self.confirmLoading = false;
          }, 1000);
          this.saveMBFunction();
        }
     

      },
      // 保存模版信息
      saveMBFunction:function(){
        this.mbIndex = this.mbTempIndex;
        this.resetFlag = true;
        // this.$set("menuIndex",this.mbIndex);
      },
      handleCancel(e) {
        this.visible = false;
        this.mbTempIndex = '';
      },
      saveSetMsg:function(){
        let self = this;
        // console.log(this.visualParamList,this.visualFormList);
        if(this.visualParamList === this.visualFormList){
          this.$info({
            title: '提醒',
            content:'当前无可视化布局设置信息更改.',
            onOk() {

            },
          });
        }else{
          this.$confirm({
            title: '提醒',
            content: '确定保存当前界面的可视化布局信息?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log('保存可视化布局信息');
              self.updateUserContentInfo();
            },
            onCancel() {
              console.log('确定取消保存');
              // self.formListFlag = true;
            },
          });
        }
      },
      cancelSetMsg:function(){
        let self = this;
        this.setFlag = false;
        this.formListFlag = true;
      },
      layoutSetting:function(){
        let self = this;
        this.setFlag = !this.setFlag;
        if(!this.setFlag){
          this.formListFlag = true;
        }else{
          this.formListFlag = false;
          this.updateFlag = false;
        }
      },
      // 调起更新保存可视化数据信息
      updateUserContentInfo:function(){
        let self = this;
        this.loadFlag = true;
        this.updateUserContentInfoList(function(data){
          self.UserContentInfo(data);
        })
      },
      // 更新可视化数据信息
      updateUserContentInfoList:function(callback){
        let self = this;
        let param={
          userNum: self.$common.getCookie('userNum'),
          menuNum: self.menuId,
          templateNum: self.visualParamList.mb.templateNum,
          moduleAndContent: JSON.stringify(self.visualParamList),
        };
        this.$http.post(self.$api.updateUserContentInfo, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              callback(res.data.data);
            }else{
               this.$message.success(res.data.msg);
               self.loadFlag = false;
            }
          }else{
              self.loadFlag = false;
          }
        });
      },
      // 处理菜单栏信息接口
      UserContentInfo:function(data){
        let self = this;
        this.$message.success("更新布局设置信息成功.");

        this.visualParamList = '';
        this.visualFormList = '';

        setTimeout(()=>{
          self.loadFlag = false;
          self.formListFlag = false;
          self.setFlag = false;
          self.updateFlag = true;
        },300);
      },

      selectMenu:function(param){
        if(this.menuIndex!=param){
          if(param!=0){
            this.$message.warning('功能暂未开启');
          }else{
          this.menuIndex = param;
          this.menuId = this.menuList.records[param].menuNum;
          this.setFlag = false;
          this.$router.push('/home/'+this.menuList[param].key);
          this.$router.push({path: '/home/'+this.menuList[param].key, query: {flag: false}});
          }
        }
      },
      getCurrentRoute:function(routerVal){
        for(var i=0;i<this.$common.menuList.length;i++){
          if('/home/'+this.$common.menuList[i].key === routerVal){
            this.menuIndex = i;
            return false;
          }
        }
      },

      //选择模版操作
      layoutSelect:function(){
        this.visible = true;
        this.title = "选择模版内容";
      },
    }
  }
</script>

<style scoped>
  .load-content{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .load-img{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 199;
  }
</style>
