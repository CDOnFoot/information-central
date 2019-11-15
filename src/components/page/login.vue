<template>
  <div>
    <div class="main-content">
      <img src="../../assets/img/logo.png" alt="" class="img-logo" ondragstart="return false" />
      <div class="form">
        <div class="form-detail">
          <div class="title">
              大数据分析决策平台
          </div>
          <div class="form-content">
            
            <a-form :form="form" @submit="handleSubmit" id="components-form-demo-normal-login">
              <div class="components-input-demo-presuffix">
                <a-form-item>
                  <a-input v-decorator="[ 'userName', { rules: [{ required: true, message: '请输入用户名' }] },]"
                      placeholder="用户名" class="input-login">
                    <a-icon slot="prefix" type="user" />
                  </a-input>
                </a-form-item>
              </div>
              <div class="components-input-demo-presuffix">
                <a-form-item>
                  <a-input v-decorator="[ 'password', { rules: [{ required: true, message: '请输入密码' }] },
                    ]" type="password" placeholder="密码" class="input-login">
                      <a-icon slot="prefix" type="lock" />
                  </a-input>
                  </a-form-item>
              </div>
              <!-- <br><small>还未拥有账号? </small><a href="register.html" class="signup">注册</a> -->
               <a-form-item>
                <div class="login-register" @click="open">忘记密码</div>
                 <a-button type="primary" html-type="submit" class="btn-login" :loading="loadFlag">
                  登录
                </a-button>
                <!-- <a-button type="primary" size="large" class="btn-login" :loading="loadFlag" @click="checkUser" @keyup.enter="checkUser">登录</a-button> -->
               </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      <!-- <img src="../../assets/img/sun.png" alt="" class="sun-btn-img"> -->
      <!--动效区域-->
      <div :class="'trangle'+index " class="trangle" v-for="(item,index) of trangleList" :key="index"></div>
      <div class="copyrights">
        <p class="corporate-footer">© 2019 UCD. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex';
import Cookies from 'js-cookie'
import preventBack from 'vue-prevent-browser-back';
import sha256 from "js-sha256";
  export default {
    name: "login",
    data(){
      return{
        trangleList:[0,1,2,3,4,5,6],
        userName: '',
        userPassword: '',
        loadFlag:false,
        userInfo:'',
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    // 防止登录页回退到上一页登录页面
    mixins: [preventBack],//注入
    mounted(){
      this.$router.push("/login");
    },

    methods:{
 
      // ...mapMutations(['changeLogin']),//存储login状态到vuex

     handleSubmit(e) {
        let self = this;
        this.loadFlag = true;
        let param = null;
        e.preventDefault();

        this.form.validateFields((err, values) => {
          if (!err) {
            self.userName = values.userName;
            self.userPassword = values.password;
            param={
              loginname:self.userName,
              password:sha256(self.userPassword)
            };
            this.$http.post(self.$api.loginIn, param).then(res =>{
            //调取数据成功
              if(res.data){
                if (res.data.code === "0") {
                  self.userInfo = res.data.data;
                  self.$common.setCookie('dvptToken',self.userInfo.custom_token,24 * 60 * 30);
                  self.$common.setCookie('dvptId',self.userInfo.userId,24 * 60 * 30);
                  self.$common.setCookie('dvptName',self.userName,24 * 60 * 30);
                  self.$common.setCookie('menuIndex','0',24 * 60 * 30);

                  self.loadFlag = false;
                  self.$router.push('/home/index');
                  // self.changeLogin({ token: self.userInfo.custom_token });
                  // setTimeout(()=>{
                  // },200);
                }else{
                  self.$message.error(res.data.msg);
                  self.loadFlag = false;
                }
              }else{
                  self.loadFlag = false;
              }
            });
        }else{
          this.loadFlag = false;
        }
      });
       
      },
      accountCheck:function(){
        this.$message.warning("功能暂未开启");
      },
      open:function(){
          this.$info({
            title: '提示',
            content: '果茹：156-1497-6002，请联系管理员',
        });
      }
    }
  }
</script>

<style scoped>

  .main-content{
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    background: url(../../assets/img/login-bg.png) center center no-repeat #000d19;
    background-size: 100%;
  }

  .bg{
    position: relative;
    width: 100%;
    height: auto;
    z-index: 1;
  }
  .img-logo{
    position: absolute;
    left: 13%;
    top: 11.2%;
    z-index: 9;
    width: 8%;
    height: auto;
  }
  .form{
    z-index: 9;
    width: 0px;
    padding-top: 10%;
    height: 100%;
    margin: 0 auto;
  }
  .img-form{
    width: 100%;
    height: auto;
  }
  .title{
    font-size: 20px;
    text-align: center;
    margin: 0 auto 4px auto;
    /* color: #304b65; */
    color: #ffffff;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .detail-title{
    font-size:22px;
    color:rgba(14,139,255,1);
    line-height:42px;
    text-align: center;
    margin-bottom: 5px;
  }
  .detail-title span{
    font-size:14px;
    font-weight:300;
    color:#ffffff;
    line-height:25px;
  }
  .form-detail{
    position: relative;
    z-index: 199;
    padding: 10px;
    width: 320px;
    margin-left: 250px;
    border-radius: 4px;
    border: 1px solid #0f3b5b;
    background: #0f3b5b;
    overflow: hidden;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    box-shadow: 0 0px 10px 2px rgba(255, 255, 255, 0.39);
  }
  .form-content{
    position: relative;
    text-align: center;
    width: 100%;
    padding: 0 10px;
    z-index: 199;
  }

  .copyrights{
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 19;
    color: #ffffff;
  }
  .login-register{
    position: relative;
    /* margin-top: 20px; */
    cursor: pointer;
    font-size: 14px;
    float: right;
    color: #ffffff;

  }
  .components-input-demo-presuffix .anticon-close-circle {
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s;
    font-size: 12px;
  }
  .components-input-demo-presuffix .anticon-close-circle:hover {
    color: #999;
  }
  .components-input-demo-presuffix .anticon-close-circle:active {
    color: #666;
  }
  .btn-login{
    margin-top: 3%;
    width: 100%;
    height: 40px;
  }
  .sun-btn-img{
     position: absolute;
    top: 37%;
    left: 59.3%;
    z-index: 19;
  }
  .ant-input-affix-wrapper{
      font-size: 16px;
      color: #000;
  }
  .trangle{
    background: rgba(180, 182, 183, 0.15);
    position: absolute;
    top: -1080px;
    z-index: 19;
  }
  .trangle0{
    width: 70px;
    height: 70px;
    left: 52%;
    animation: rolling 5s linear infinite;
    border-radius: 28px;

  }
  .trangle1{
    width: 60px;
    height: 60px;
    left: 15%;
    animation: rolling 6s linear infinite;
    border-radius: 10px;

  }
  .trangle2{
    width: 86px;
    height: 86px;
    left: 89%;
    animation: rolling 8s linear infinite;
    border-radius: 20px;

  }
  .trangle3{
    width: 20px;
    height: 20px;
    left: 48.5%;
    animation: rolling 6s linear infinite;
    border-radius: 4px;

  }
  .trangle4{
    width: 50px;
    height: 50px;
    left: 78%;
    animation: rolling 4s linear infinite;
    border-radius: 10px;

  }
  .trangle5{
    width: 30px;
    height: 30px;
    left: 40%;
    animation: rolling 7s linear infinite;
    border-radius: 10px;

  }
  .trangle6{
    width: 80px;
    height: 80px;
    left: 6%;
    animation: rolling 5s linear infinite;
    border-radius: 10px;

  }
  @keyframes rolling {
    0%{
      transform:rotate(0deg);
      top: 1080px;
    }
    25%{
      transform:rotate(180deg);
      top: 800px;
    }
    50%{
      transform:rotate(270deg);
      top: 530px;
    }
    75%{
      transform:rotate(360deg);
      top: 200px;
    }
    100%{
      transform:rotate(480deg);
      top: -200px;

    }
  }
  .ant-input-affix-wrapper .ant-input:not(:first-child) {
      padding-left: 40px !important;
  }
</style>

      // emitEmpty (e) {
      //   var id= e.currentTarget.dataset.id;
      //   if(id==="name"){
      //     this.$refs.userNameInput.focus();
      //     this.userName = ''
      //   }else if(id==="pwd"){
      //     this.$refs.userPasswordInput.focus();
      //     this.userPassword = ''
      //   }
      // },