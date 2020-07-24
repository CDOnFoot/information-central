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
        <div class="title">数据中心动环监控平台</div>
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

        <div class="menu-item-bread">
          <div class="item-info">
            <img :src="require('../../assets/img/title-1.png')" alt="" class="menu-img1">
            <div class="item-title">{{ pageTarget }}</div>
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

         <!--<div class="menu-sub">
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
          <div class="menu-sub-item">
            <img src="../../assets/img/title-sub-bg.png" alt="" class="menu-sub-img">
          </div>
        </div>-->
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
        pageTarget: '',
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
     * @description ‘数据中心动环监控平台’ 项目暂不使用从服务获取的菜单列表，直接写一个假的数据列表以供选择
     * @param to
     * @param from
     * @param next
     */
    beforeRouteUpdate (to, from, next) {
      const that = this, toRoute = to.meta.title;
      new Promise((resolve, reject) => {
        resolve(toRoute);
      }).then(res => {
        if (res === '菜单') {
          this.$('.menu-sub').hide();
          this.$('.menu-item-bread').hide();
          next();
          return;
        }
        this.$('.menu-sub').show();
        this.$('.menu-item-bread').show();
        // 将异步获得的页签存入 store 并执行跳转
        that.$store.commit("changePageTarget", res);
        that.pageTarget = that.$store.getters.getPageTarget;
        /*setInterval(() => {
          console.log(that.$store.getters.getPageTarget);
        }, 2000);*/
        next();
      })
    },
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
      this.$('.menu-sub').hide();
      this.$('.menu-item-bread').hide();
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
      clearInterval(this.timeInterval);
        this.timeInterval = setInterval(function(){
          self.timeStamp = self.$common.timestampToTime(new Date());
        }, 1000);
     },

    methods:{
      /**
       * @function 获取设备列表
       * @description 先拿到所有设备列表，再根据设备 Name 属性获取该设备状态，最后由设备点的 EntityId 请求该点值
       */
      getEquipmentList () {
        try {
          this.equipmentListRequest((data) => {
            this.dealEquipmentList(data);
          })
        } catch (e) {
          console.log('There are some mistakes:' + e);
        }
      },

      equipmentListRequest (callback) {
        const that = this;
        this.$http.get(that.$api.monitorEquipments).then(response => {
          console.log("all equipment:");
          console.log(response);
          if (response.data) {
            // 所有设备 list
            callback(response.data.value);
          } else {
            this.$message.error(response.data.Message);
          }
        })
      },

      /**
       * @function 获取所有设备的所有点值
       */
      dealEquipmentList (data) {
        // param data 用于查询当前需要用到的设备
        const allEquipment = data;
        // console.log('All equipments:');
        // console.log(allEquipment);
        let usedEquipment = [];
        // 筛选需要用到的设备
        allEquipment.forEach((value) => {
          if (value.Name.includes('多功能传感器') ||
            value.Name.includes('ETH') ||
            value.Name.includes('门禁执行器') ||
            value.Name.includes('交流执行器') ||
            value.Name.includes('天窗执行器') ||
            value.Name.includes('eLight') ||
            value.Name.includes('水浸传感器') ||
            value.Name.includes('温湿度传感器') ||
            value.Name.includes('风冷行级精密空调') ||
            value.Name.includes('ECC800') ||
            value.Name.includes('配电柜') ||
            value.Name.includes('配电柜输入') ||
            value.Name.includes('配电柜输出')) {
            usedEquipment.push(value);
          }
        });
        console.log('after filter:', usedEquipment);
        const that = this;
        this.$http.get(that.$api.allEquipmentPoint).then(res => {
          // console.log(res);
          if (res.data.value) {
            // 全部设备的所有点
            const allEquipmentPointValue = res.data.value;
            console.log('All points:', allEquipmentPointValue);
            let paramIdList = [];
            allEquipmentPointValue.forEach((value, index) => {
              paramIdList.splice(index, 1, {});
              this.$set(paramIdList[index], "Id", value.EntityId);
            });
            // 用从服务取到的 id list 去获取所有点值
            that.$http.post(that.$api.allPointStatus, paramIdList).then(response => {
              console.log('All points values:', response.data);
              let usedPoints = [];
              if (response.data) {
                let allPointsValue = response.data;
                // 开始比较
                try {
                  usedEquipment.forEach((items) => {
                    allEquipmentPointValue.forEach((value, index) => {
                      usedPoints.splice(index, 1, {});
                      if (allPointsValue[index] !== null) {
                        // 当前点名称
                        usedPoints[index].name = value.Name.match(/[\u4e00-\u9fa5]/g).join("");
                        // 当前点描述
                        usedPoints[index].pointName = value.DisplayName;
                        // unit of value
                        usedPoints[index].unitOfValue = value.UnitOfMeasurement;
                        // 是否报警
                        usedPoints[index].isAlarm = allPointsValue[index].st.ia;
                        // is it bad point
                        usedPoints[index].isBadPoint = allPointsValue[index].st.ib;
                        usedPoints[index].pointTime = allPointsValue[index].ti;
                        const dataType = allPointsValue[index].t;
                        switch (dataType) {
                          case "Long":
                            if (value.MeaningOfValue !== '') {
                              // 将当前点值的值描述的 JSON 字符串转成对象，再根据当前索引的所有点值的实际值去找到对应含义
                              usedPoints[index].pointValue = JSON.parse(value.MeaningOfValue)[allPointsValue[index].l];
                              // 当为坏点时的取值
                              if (usedPoints[index].pointValue === '') {
                                usedPoints[index].pointValue = 'N/A'
                              }
                              // that.$set(usedPoints[index], "pointValue", JSON.parse(value.MeaningOfValue)[parseInt(allPointsValue[index].l)])
                              // console.log(allPointsValue[index]);
                            } else {
                              usedPoints[index].pointValue = allPointsValue[index].l;
                            }
                            break;
                          case "String":
                            usedPoints[index].pointValue = allPointsValue[index].s;
                            break;
                          case "DWord":
                            usedPoints[index].pointValue = allPointsValue[index].dw;
                            break;
                          default:
                            return true;
                        }
                      } else {
                        return false;
                      }
                    })
                  });
                } catch (e) {
                  console.log("some error take:", e);
                }
                // the var not use.
                // that.statusList = usedPoints;
                /**
                 * @description 使用 Vuex 存储处理完成的点值 list.
                 * @define 1、组件接收的 props 不能修改；2、Vuex 不能直接存储 list ，该解决方案先将 list 转成 JSON 字符串，使用 Vuex get 时再转成对象.
                 */
                that.$store.commit('storePoints', usedPoints);
                setTimeout(()=>{
                  that.loadFlag= false;
                },1000);
              }
            })
          }
        });

        // const meaning = data[18].MeaningOfValue;
        // console.log('transferred object:');
        // console.log(JSON.parse(meaning));
        // 处理拿到的所有设备 EntityId

      },
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
        });

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
        // 获取设备列表
        this.getEquipmentList();
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
.menu-img1{
  padding-top:10px;
  margin-left: -10px;
}

</style>
