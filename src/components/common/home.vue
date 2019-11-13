<template>
  <a-layout id="components-layout" class="layout">
    <div>
      <a-modal
        :title="title"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        width="50%">
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
      <div class="header-canvas">
        <div class="title">大数据分析决策平台</div>
        <div class="time-interval">{{timeStamp}}</div>
        <!-- <div class="weather">
          <iframe width="66%" scrolling="no" height="24" frameborder="0" allowtransparency="false" src="//i.tianqi.com/index.php?c=code&id=1&color=%23FFFFFF&icon=1&py=beijing&wind=0&num=1&site=12" style="float:right;"></iframe>
        </div> -->
        <div class="user-register">
          <div class="register-name"><a-icon type="user" />{{userName}}</div>
          <div class="register-group" @click="loginOut">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianyuan"></use>
            </svg>
          </div>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 1%;height:100%;min-height: calc(100vh - 8.3%);">
      <div class="load-content" v-show="loadFlag">
        <a-spin class="load-img" size="large" />
      </div>
      <router-view :menuIndex="menuIndex" :setFlag="setFlag" :menuId="menuId" :mbId="mbId" @uploadSetMsg="uploadSaveSetMsg" :visualHomeList="visualHomeList"></router-view>
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
        <div v-for="(item,index) in menuList" class="menu-item" :class="menuIndex==index?'font-active':''" :key="index"
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
        <a-button size="large" class="btn-item" @click="layoutSetting" v-show="menuIndex<=1">布局配置</a-button>
        <a-button size="large" class="btn-item" v-show="setFlag" @click="saveSetMsg">保存</a-button>
        <a-button size="large" class="btn-item" v-show="setFlag" @click="cancelSetMsg">取消</a-button>
      </div>
      <div class="layout-selectBtn">
        <a-button size="large" class="btn-item" @click="layoutSelect" v-show="setFlag">选择模版</a-button>
        <a-button size="large" class="btn-item" @click="layoutAuto" v-show="setFlag">恢复默认</a-button>

      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>

  export default {
    name: "home",
   
    data(){
      return{
        menuList:[],
        menuIndex:0,
        menuId:'',
        timeStamp: this.$common.timestampToTime(new Date()),
        timeInterval:'',
        setFlag:false,
        title:'选择模版内容',
        visible: false,
        confirmLoading: false,
        mbList:'',
        // mbIndex:0,
        mbTempIndex:'',
        mbId:'',
        // setTempFlag:false,
        loadFlag:false,
        visualParamList:'',//参数可视化布局信息
        formListFlag:false,//取消布局重置信息
        userName:this.$common.getCookie('dvptName'),
        visualList:'',//接口查询布局信息
        visualHomeList:'',//传值布局信息
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
    activated(){

    },
    mounted() {
      let self = this;
      // 查看菜单栏数据信息
      this.getMenuInfo();
      // 查看模版内容数据信息
      this.getTemplateInfo();

      document.ondragstart = function() {
        return false;
      };
      clearInterval(this.timeInterval)
        this.timeInterval = setInterval(function(){
          self.timeStamp = self.$common.timestampToTime(new Date());
        },1000);
     },

    methods:{
      // 查看可视化界面内容数据信息
      getUserVisualization:function(){
        this.loadFlag= true;
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
            }else{
                self.loadFlag= false;
               self.$message.error(res.data.msg);
            }
          }
        });
      },
      visualizationInfo:function(data){
        this.loadFlag= false;
        this.visualList = JSON.parse(JSON.stringify(data.menuList));
        this.visualHomeList = JSON.parse(JSON.stringify(data.menuList));
        this.visualParamList = JSON.parse(JSON.stringify(data.menuList));
        this.mbId = this.visualList.mb.templateNum;
      },

      // 用户登出注销后 清除session信息 ，并返回登录页
      loginOut:function(){
        let self = this;
        this.$confirm({
          title: '提醒',
          content: '是否退出登录?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            self.$http.get(self.$api.loginOut).then(res =>{
              self.$common.delCookie('token');
              self.$message.info("注销成功.");
              self.$router.push('/login'); 
            });
          },
          onCancel() {
          },
        });
      },
      // 由子界面子路由传值结果
      uploadSaveSetMsg:function(msgList){
        console.log('由子界面子路由传值结果 msg：',msgList);
        this.visualParamList = msgList;
      },
      // 查看菜单栏数据信息
      getMenuInfo:function(){
        let self = this;
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
              }
            }
        })
      },
      // 处理菜单栏信息接口
      menuInfo:function(data){
        let self = this;
        // this.menuList.push(data.records[0]);
        let menuIndex = Number(self.$common.getCookie("menuIndex"));
        this.menuList = data.records;
        if(menuIndex && menuIndex!='' && menuIndex!=null){
          this.menuId = data.records[menuIndex].menuNum;
          this.menuIndex = menuIndex;
        }else{
          this.menuId = data.records[0].menuNum;
          this.menuIndex = 0;

        }
        this.menuList.map((item,index)=>{
          self.$common.menuList.map((items,indexs)=>{
            if(items.id === item.menuNum){
              item.key=items.key;
            }
          })
        })

         //查看界面可视化布局信息 
        this.getUserVisualization();

        setTimeout(()=>{
          self.loadFlag = false;
        },300);

        // 用户登录过期验证
        // if(!this.$common.getCookie('userNum')){
        //   this.$router.push('/login');
        //   this.$error({
        //     title: '提醒',
        //     content:'用户信息已过期请重新登录.',
        //     onOk() {
        //     },
        //   });
        // }
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
      // 选中模版内容判断信息
      handleOk(e) {
        let self = this;
        let param = null;
        if(this.visualParamList!=undefined && this.visualParamList!=null && this.visualParamList!=''){
          param = this.visualParamList;
        }else{
          param = this.visualList;
          this.visualParamList = JSON.parse(JSON.stringify(this.visualList));
        }
        this.confirmLoading = true;
        if(param.mb.templateNum === this.mbList.records[self.mbTempIndex].templateNum){
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
        // this.mbIndex = this.mbTempIndex;
        let self = this;
        this.mbId = this.mbList.records[this.mbTempIndex].templateNum;
        this.$common.visualList.some((item,index)=>{
          if(item.mb.templateNum === self.mbId){
            self.visualParamList = item;
            return false;
          }
        })
        this.visualHomeList = JSON.parse(JSON.stringify(this.visualParamList));
      },
      handleCancel(e) {
        this.visible = false;
        this.mbTempIndex = '';
      },
      saveSetMsg:function(){
        let self = this;
        console.log(JSON.stringify(this.visualParamList) == JSON.stringify(this.visualList));
        if(JSON.stringify(this.visualParamList) == JSON.stringify(this.visualList)){
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
            },
          });
        }
      },
      cancelSetMsg:function(){
        let self = this;
        this.setFlag = false;
        this.formListFlag = true;

        // 取消传参数
        this.visualHomeList = JSON.parse(JSON.stringify(this.visualList));
        this.visualParamList = JSON.parse(JSON.stringify(this.visualList));
        //参数可视化布局信息
      },
      layoutSetting:function(){
        let self = this;
        this.setFlag = !this.setFlag;
        if(!this.setFlag){
          this.visualHomeList = JSON.parse(JSON.stringify(this.visualList));

        }else{
          if(this.visualParamList){
            this.visualHomeList = JSON.parse(JSON.stringify(this.visualParamList));
          }
        }
        this.visualParamList = JSON.parse(JSON.stringify(this.visualList));
      },

      // 恢复默认布局信息
      layoutAuto:function(){
        let self = this;
        this.$confirm({
            title: '提醒',
            content: '确定恢复当前界面的默认布局信息，并自动保存?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log("恢复默认");
              self.layoutRestoreDefaults();
            },
            onCancel() {
              console.log('确定取消保存');
            },
          });
      },

      // 恢复默认布局信息
      layoutRestoreDefaults:function(){
        let self = this;
        let param={
          userNum: self.$common.getCookie('dvptId'),
          menuNum: self.menuId,
        };
        this.$http.post(self.$api.layoutRestoreDefaults, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              self.$message.success("更新布局设置信息成功.");
              setTimeout(()=>{
                self.loadFlag = false;
                self.formListFlag = false;
                self.setFlag = false;
                self.updateFlag = true;
              },300);
              this.getUserVisualization();

            }else{
               this.$message.success(res.data.msg);
               self.loadFlag = false;
            }
          }else{
              self.loadFlag = false;
          }
        });
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
          userNum: self.$common.getCookie('dvptId'),
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
        this.visualHomeList = JSON.parse(JSON.stringify(self.visualParamList));

        setTimeout(()=>{
          self.loadFlag = false;
          self.formListFlag = false;
          self.setFlag = false;
          self.updateFlag = true;
        },300);
        this.getUserVisualization();

      },

      selectMenu:function(param){
        let self = this;
        if(this.menuIndex!=param){
          this.menuIndex = param;
          self.$common.setCookie('menuIndex',this.menuIndex,24 * 60 * 30);
          this.menuId = this.menuList[param].menuNum;

          // if(param!=2){
          //   this.$message.warning('功能暂未开启');
          // }else{

            new Promise((resolve,reject)=>{
              let paramList={
                userNum: self.$common.getCookie('dvptId'),
                menuNum: self.menuId
                };
              this.$http.post(self.$api.getUserVisualization, paramList).then(res =>{
                //调取数据成功
                if(res.data){
                  if (res.data.code === "0") {
                    this.visualList = JSON.parse(JSON.stringify(res.data.data.menuList));
                    this.visualHomeList = JSON.parse(JSON.stringify(res.data.data.menuList));
                    this.visualParamList = JSON.parse(JSON.stringify(res.data.data.menuList));
                    this.mbId = this.visualList.mb.templateNum;
                    resolve();
                  }
                }
              });
            }).then(()=>{
              this.setFlag = false;
              // console.log('/home/'+self.menuList[param].key);
              this.$router.push('/home/'+self.menuList[param].key);
            })

          // this.$router.push({path: '/home/'+this.menuList[param].key, query: {flag: false}});
          // }
        }
      },
      getCurrentRoute:function(routerVal){
        for(var i=0;i<this.menuList.length;i++){
          if('/home/'+this.menuList[i].key === routerVal){
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
</style>
