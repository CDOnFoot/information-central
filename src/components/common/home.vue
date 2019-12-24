<template>
  <a-layout id="components-layout" class="layout">
    <div class="load-content" v-show="loadFlag">
        <a-spin class="load-img" size="large" />
    </div>

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
        <div class="title">信息中心</div>
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

      <router-view :menuIndex="menuIndex" :setFlag="setFlag" :menuId="menuId" :mbId="mbId" @uploadSetMsg="uploadSaveSetMsg" :visualHomeList="visualHomeList"></router-view>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      <div class="menu-list">
        <!-- <div class="menu-sub">
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
        </div> -->

        <!-- 菜单 -->
        <div class="menu-item" @click="returnMenu">
          <div class="item-info">
            <img :src="require('../../assets/img/titleBg.png')" alt="" class="menu-img">
            <div class="item-title">菜单</div>
          </div>
        </div>

        <!--<div v-for="(item,index) in menuList" class="menu-item" :class="menuIndex==index?'font-active':''" :key="index"
             @click="selectMenu(index)">
          <div class="item-info">
            <img :src="menuIndex === index?require('../../assets/img/titleBg-active.png'):require('../../assets/img/titleBg.png')" alt="" class="menu-img">
            <div class="item-title">
              {{ item.menuName }}
            </div>
          </div>
        </div>-->

        <!-- <div class="menu-sub">
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
        </div> -->
      </div>
      <div class="layout-btn">
        <!--<a-button size="large" class="btn-item" @click="layoutSetting" v-show="menuIndex<=0">布局配置</a-button>-->
        <!-- 暂时隐藏布局配置选项按钮 -->
        <a-button size="large" class="btn-item btnchange" @click="layoutSetting" v-show="this.$router.currentRoute.path === '/home/index'">布局配置</a-button>
        <a-button size="large" class="btn-item btnchange" v-show="setFlag" @click="saveSetMsg">保存</a-button>
        <a-button size="large" class="btn-item btnchange" v-show="setFlag" @click="cancelSetMsg">取消</a-button>
      </div>
      <!-- <div class="layout-selectBtn">
        <a-button size="large" class="btn-item" @click="layoutSelect" v-show="setFlag">选择模版</a-button>
        <a-button size="large" class="btn-item" @click="layoutAuto" v-show="setFlag">恢复默认</a-button>

      </div> -->
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
        setFlag:false, // 是否显示确认编辑信息按钮
        title:'选择模版内容',
        visible: false,
        confirmLoading: false,
        mbList:'',
        // mbIndex:0,
        mbTempIndex:'',
        mbId:'',
        // setTempFlag:false,
        loadFlag:false,
        visualParamList:'', //参数可视化布局信息
        formListFlag:false, //取消布局重置信息
        userName:this.$common.getCookie('dvptName'),
        visualList:'', //接口查询布局信息
        visualHomeList:'', //传值布局信息
      }
    },
    computed:{
    },

    created(){
      var routerVal = this.$router.currentRoute.path;
      this.getCurrentRoute(routerVal);
    },

    /**
     * @description ‘信息中心’ 项目暂不使用从服务获取的菜单列表，直接写一个假的数据列表以供选择
     * @param to
     * @param from
     * @param next
     */
    /*beforeRouteUpdate (to, from, next) {
      let self = this;
      var routerVal = to.matched[1].path;
      // 增加一个新的跳转，用于 debug
      // next();
      // console.log('current router to: ' + routerVal);
      new Promise((resolve,reject)=>{
        self.menuList.some((item,index)=>{
          if('/home/'+item.key === routerVal){
            self.menuId = item.menuNum;
            self.menuIndex = Number((item.id)-1);
            // console.log(self.menuId);
            next();
            return false;
          } else {
            next();
          }
        });
        /!*let paramList={
          userNum: self.$common.getCookie('dvptId'),
          menuNum: self.menuId
          };*!/
        let paramList = new FormData();
        paramList.append('userNum', '18324');
        paramList.append('userNum', 'CD01');
        // 获取模板 list 的请求使用 application/x-www-form-urlencoded 格式
        self.$http.postList(self.$api.getUserVisualization, paramList).then(res =>{
          // console.log('automated layout data:');
          // console.log(res);
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              self.visualList = JSON.parse(JSON.stringify(res.data.data.menuList));
              self.visualHomeList = JSON.parse(JSON.stringify(res.data.data.menuList));
              self.visualParamList = JSON.parse(JSON.stringify(res.data.data.menuList));
              self.mbId = this.visualList.mb.templateNum;
              resolve();
            }
          }
        });
      }).then(()=>{
        self.setFlag = false;
      })
    //   if(to.matched[1].path=='/home/index'){
    //       next();
    //   }else{
    //         this.$message.warning('功能暂未开启');
    //   }
    },*/
    // activated(){
    //   console.log(this.menuId);
    // },
    mounted() {
      let self = this;
      // 查看菜单栏数据信息
      this.getMenuInfo();
      /**
       * @desc not use menu information list but module list data
       */
      // this.getUserVisualization();
      // 查看模版内容数据信息
      this.getTemplateInfo();

      document.ondragstart = function() {
        return false;
      };
      // 清除缓存的时间
      clearInterval(this.timeInterval)
        this.timeInterval = setInterval(function(){
          self.timeStamp = self.$common.timestampToTime(new Date());
        }, 1000);
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
        /*let param={
          userNum: self.$common.getCookie('dvptId'),
          menuNum: self.menuId
          };*/
        /**
         * @exception 该 API 需要使用 'x-www-form-urlencoded' 的请求格式
         */
        let param = new FormData();
        // param - 0: 用户 ID
        param.append('userNum', self.$common.getCookie('dvptId'));
        // param - 1: 选取的哪个菜单的 ID
        param.append('menuNum', 'CD01');
        this.$http.postList(self.$api.getUserVisualization, param)
          .then(res =>{
          // console.log('布局模块列表：');
          // console.log(res);
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              callback(res.data.data)
              // callback(res.data.data.records);
            }else{
                self.loadFlag= false;
               self.$message.error(res.data.msg);
            }
          }
        });
      },
      visualizationInfo:function(data){
        // console.log(' -------- current getting data:')
        // console.log(data)
        setTimeout(()=>{
          this.loadFlag= false;
        },1000);
        this.visualList = JSON.parse(JSON.stringify(data.menuList));
        this.visualHomeList = JSON.parse(JSON.stringify(data.menuList));
        this.visualParamList = JSON.parse(JSON.stringify(data.menuList));
        /*this.visualList = JSON.parse(JSON.stringify(data));
        this.visualHomeList = JSON.parse(JSON.stringify(data));
        this.visualParamList = JSON.parse(JSON.stringify(data));*/
        this.mbId = this.visualList.mb.templateNum;
      },

      // 用户登出注销后 清除session信息 ，并返回登录页
      loginOut:function(){
        let self = this;
        // 引入了 Modal 模块，使用这种方式创建简洁的对话框
        let modal = this.Modal.confirm({
          title: '提醒',
          content: '是否退出登录?',
          centered: true,
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            /**
             * @description 不再发起 http 请求，只需要清除 token
             */
            self.$common.delCookie('token');
            self.$message.info("注销成功.");
            self.$router.push('/login');
            /*self.$http.get(self.$api.loginOut).then(res =>{
              self.$common.delCookie('token');
              self.$message.info("注销成功.");
              self.$router.push('/login'); 
            });*/
          },
          onCancel() {
            console.log('this is choose to cancel login out.')
          },
        });
      },
      // 由子界面子路由传值结果
      uploadSaveSetMsg:function(msgList){
        // console.log('由子界面子路由传值结果 msg：',msgList);
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
        this.$http.postList(self.$api.getMenuInfo, param).then(res =>{
            //调取数据成功
          // console.log('the data of menu:');
          // console.log(res);
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

        // setTimeout(()=>{
        //   self.loadFlag = false;
        // },300);

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

      /**
       * @function 获取主页模板 list
       */
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
        this.$http.postList(self.$api.getTemplateInfo, param).then(res =>{
          // console.log('模板内的模块内容：');
          // console.log(res);
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
        // console.log(this.mbTempIndex);
        if(this.mbTempIndex!='' && this.mbTempIndex!=undefined && this.mbTempIndex!=null){
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
        }else{
            self.$info({
              title: '提示',
              content: '请先对模版内容进行选择',
              onOk() {},
            });
            self.confirmLoading = false;
            self.mbTempIndex = '';
            return false;
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
        // console.log(JSON.stringify(this.visualParamList) == JSON.stringify(this.visualList));
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
              // console.log('保存可视化布局信息');
              self.updateUserContentInfo();
            },
            onCancel() {
              // console.log('确定取消保存');
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
        this.$http.postList(self.$api.layoutRestoreDefaults, param).then(res =>{
          //调取数据成功
          if(res.data){
            if (res.data.code === "0") {
              self.$message.success("更新布局设置信息成功.");
              setTimeout(()=>{
                // self.loadFlag = false;
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
        this.$http.postList(self.$api.updateUserContentInfo, param).then(res =>{
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
          // self.loadFlag = false;
          self.formListFlag = false;
          self.setFlag = false;
          self.updateFlag = true;
        },300);
        this.getUserVisualization();

      },

      selectMenu:function(param){
        let self = this;
        if(this.menuIndex!=param){
          self.loadFlag = true;
          this.menuIndex = param;
          self.$common.setCookie('menuIndex',this.menuIndex,24 * 60 * 30);
          this.menuId = this.menuList[param].menuNum;
            new Promise((resolve,reject)=>{
              let paramList={
                userNum: self.$common.getCookie('dvptId'),
                menuNum: self.menuId
                };
              this.$http.postList(self.$api.getUserVisualization, paramList).then(res =>{
                //调取数据成功
                if(res.data){
                  if (res.data.code === "0") {
                    this.visualList = JSON.parse(JSON.stringify(res.data.data.menuList));
                    this.visualHomeList = JSON.parse(JSON.stringify(res.data.data.menuList));
                    this.visualParamList = JSON.parse(JSON.stringify(res.data.data.menuList));
                    this.mbId = this.visualList.mb.templateNum;
                    resolve();
                  }else{
                    self.loadFlag = false;
                  }
                }else{
                    self.loadFlag = false;
                }
              });
            }).then(()=>{
              self.setFlag = false;
              setTimeout(()=>{
                self.loadFlag = false;
              }, 1000);
              self.$router.push('/home/'+self.menuList[param].key);

            })
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

      // 选择模版操作
      layoutSelect:function(){
        this.visible = true;
        this.title = "选择模版内容";
      },

      /**
       * @function return to main menu
       */
      returnMenu () {
        this.$router.push('/home');
        this.setFlag = false;
      }
    }
  }
</script>
<style scoped>
</style>
