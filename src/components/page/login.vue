<template>
  <div>
    <div class="main-content">
      <img src="../../assets/img/logo.png" alt class="img-logo" ondragstart="return false" />
      <div id="indexLizi" />

      <div class="form">
        <div class="form-detail">
          <div class="title">数据中心动环监控平台</div>
          <div class="form-content">
            <a-form :form="form" @submit="handleSubmit" id="components-form-demo-normal-login">
              <div class="components-input-demo-presuffix">
                <a-form-item>
                  <a-input
                    v-decorator="[ 'userName', { rules: [{ required: true, message: '请输入用户名' }] },]"
                    placeholder="用户名"
                    class="input-login"
                  >
                    <a-icon slot="prefix" type="user" />
                  </a-input>
                </a-form-item>
              </div>
              <div class="components-input-demo-presuffix">
                <a-form-item>
                  <a-input
                    v-decorator="[ 'password', { rules: [{ required: true, message: '请输入密码' }] },
                    ]"
                    type="password"
                    placeholder="密码"
                    class="input-login"
                  >
                    <a-icon slot="prefix" type="lock" />
                  </a-input>
                </a-form-item>
              </div>
              <!-- <br><small>还未拥有账号? </small><a href="register.html" class="signup">注册</a> -->
              <a-form-item>
                <div class="login-register" @click="open">忘记密码</div>
                <a-button type="primary" html-type="submit" class="btn-login" :loading="loadFlag">登录</a-button>
                <!-- <a-button type="primary" size="large" class="btn-login" :loading="loadFlag" @click="checkUser" @keyup.enter="checkUser">登录</a-button> -->
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      <!-- <img src="../../assets/img/sun.png" alt="" class="sun-btn-img"> -->
      <!--动效区域-->
      <!-- <div :class="'trangle'+index " class="trangle" v-for="(item,index) of trangleList" :key="index"></div> -->
      <div class="copyrights">
        <p class="corporate-footer">© 2019 UCD. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex';
import Cookies from "js-cookie";
import preventBack from "vue-prevent-browser-back";
import sha256 from "js-sha256";
import * as THREE from "three";
export default {
  name: "login",
  props: {
    amountX: {
      type: Number,
      default: 50
    },
    amountY: {
      type: Number,
      default: 50
    },
    color: {
      type: Number,
      default: 0x2d5097
    },
    top: {
      type: Number,
      default: 350
    }
  },
  data() {
    return {
      count: 0,
      // 用来跟踪鼠标水平位置
      mouseX: 0,
      windowHalfX: null,
      // 相机
      camera: null,
      // 场景
      scene: null,
      // 批量管理粒子
      particles: null,
      // 渲染器
      renderer: null,

      trangleList: [0, 1, 2, 3, 4, 5, 6],
      userName: "",
      userPassword: "",
      loadFlag: false,
      userInfo: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  // 防止登录页回退到上一页登录页面
  mixins: [preventBack], //注入
  mounted() {
    this.$router.push("/login");
    this.init();
    this.animate();
  },

  methods: {
    init: function() {
      const SEPARATION = 100;
      const SCREEN_WIDTH = window.innerWidth;
      const SCREEN_HEIGHT = window.innerHeight;
      const container = document.createElement("div");
      this.windowHalfX = window.innerWidth / 2;
      container.style.position = "relative";
      container.style.top = `${this.top}px`;
      container.style.height = `${SCREEN_HEIGHT - this.top}px`;
      document.getElementById("indexLizi").appendChild(container);

      this.camera = new THREE.PerspectiveCamera(
        75,
        SCREEN_WIDTH / SCREEN_HEIGHT,
        1,
        10000
      );
      this.camera.position.z = 1000;

      this.scene = new THREE.Scene();

      const numParticles = this.amountX * this.amountY;
      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);
      // 初始化粒子位置和大小
      let i = 0;
      let j = 0;
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i] = ix * SEPARATION - (this.amountX * SEPARATION) / 2;
          positions[i + 1] = 0;
          positions[i + 2] = iy * SEPARATION - (this.amountY * SEPARATION) / 2;
          scales[j] = 1;
          i += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));
      // 初始化粒子材质
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(this.color) }
        },
        vertexShader: `
          attribute float scale;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
            gl_PointSize = scale * ( 300.0 / - mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
            gl_FragColor = vec4( color, 1.0 );
          }
        `
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearAlpha(0);
      container.appendChild(this.renderer.domElement);

      window.addEventListener("resize", this.onWindowResize, {
        passive: false
      });
      document.addEventListener("mousemove", this.onDocumentMouseMove, {
        passive: false
      });
      document.addEventListener("touchstart", this.onDocumentTouchStart, {
        passive: false
      });
      document.addEventListener("touchmove", this.onDocumentTouchMove, {
        passive: false
      });
    },
    render: function() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y = 400;
      this.camera.lookAt(this.scene.position);
      const positions = this.particles.geometry.attributes.position.array;
      const scales = this.particles.geometry.attributes.scale.array;
      // 计算粒子位置及大小
      let i = 0;
      let j = 0;
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i + 1] =
            Math.sin((ix + this.count) * 0.3) * 100 +
            Math.sin((iy + this.count) * 0.5) * 100;
          scales[j] =
            (Math.sin((ix + this.count) * 0.3) + 1) * 8 +
            (Math.sin((iy + this.count) * 0.5) + 1) * 8;
          i += 3;
          j++;
        }
      }
      // 重新渲染粒子
      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.geometry.attributes.scale.needsUpdate = true;
      this.renderer.render(this.scene, this.camera);
      this.count += 0.1;
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    onDocumentMouseMove: function(event) {
      this.mouseX = event.clientX - this.windowHalfX;
    },
    onDocumentTouchStart: function(event) {
      if (event.touches.length === 1) {
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
      }
    },
    onDocumentTouchMove: function(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
      }
    },
    onWindowResize: function() {
      this.windowHalfX = window.innerWidth / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
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
          param = {
            loginname: self.userName,
            /**
             * @description 客户端使用 sha256 加密算法加密，然后传递给服务
             * @type {string}
             */
            password: sha256(self.userPassword)
          };
          // self.$common.setCookie('dvptToken','1',24 * 60 * 30);
          // self.$common.setCookie('dvptId','1',24 * 60 * 30);
          // self.$common.setCookie('dvptName','test',24 * 60 * 30);
          // self.$common.setCookie('menuIndex','0',24 * 60 * 30);

          // self.loadFlag = false;
          // self.$router.push('/home/index');
          this.$http.post(self.$api.loginIn, param).then(res => {
            //调取数据成功
            if (res.data) {
              if (res.status === 200) {
                // self.userInfo = res.data;
                // production environment 需要从报文 headers 拿 token
                self.userInfo = res.headers;
                self.$common.setCookie(
                  "dvptToken",
                  self.userInfo.token,
                  24 * 60 * 30
                );
                // ID 使用截取 token 下划线前的数字 - 实际为当前用户的主键 EntityId
                self.$common.setCookie("dvptId", self.userInfo.token.split("_")[0], 24 * 60 * 30);
                // 通过 cookie 保存用户名（登录名），在右上角显示
                self.$common.setCookie('dvptName', self.userName, 24 * 60 * 30);
                self.$common.setCookie("menuIndex", "0", 24 * 60 * 30);
                self.loadFlag = false;

                // self.$router.push('/home/index');
                // self.$router.push('/home/mainMenu');
                // 由路由直接渲染默认路由，调用 home 组件中的生命周期钩子
                self.$router.push("/home");
                // self.changeLogin({ token: self.userInfo.custom_token });
                // setTimeout(()=>{
                // },200);
              } else {
                self.$message.error(res.data.Message);
                self.loadFlag = false;
              }
            } else {
              self.loadFlag = false;
            }
          });
        } else {
          this.loadFlag = false;
        }
      });
    },
    accountCheck: function() {
      this.$message.warning("功能暂未开启");
    },
    open: function() {
      this.$info({
        title: "提示",
        content: "果茹：156-1497-6002，请联系管理员"
      });
    }
  }
};
</script>

<style scoped>
.ant-input-affix-wrapper {
  border-radius: 5px !important;
}

.ant-btn-primary {
  background-color: #005db3 !important;
}
.main-content {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  background: url(../../assets/img/login-bg.png) center center no-repeat #000d19;
  background-size: 100%;
}
.img-logo {
  position: absolute;
  left: 13%;
  top: 11.2%;
  z-index: 9;
  width: 8%;
  height: auto;
}
.form {
  z-index: 9;
  width: 0px;
  padding-top: 10%;
  height: 100%;
  margin: 0 auto;
}
.img-form {
  width: 100%;
  height: auto;
}
.title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.detail-title {
  font-size: 22px;
  color: rgba(14, 139, 255, 1);
  line-height: 42px;
  text-align: center;
  /* margin-bottom: 5px; */
}
.detail-title span {
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
  line-height: 25px;
}
.form-detail {
  position: relative;
  z-index: 199;
  /* padding: 10px; */
  width: 398px;
  margin-left: -168px;
  /* border-radius: 4px; */
  /* border: 1px solid #0f3b5b; */
  /* background: #0f3b5b; */
  overflow: hidden;
  /* color: #303133; */
  /* -webkit-transition: 0.3s; */
  transition: 0.3s;
  /* box-shadow: 0 0px 10px 2px rgba(255, 255, 255, 0.39); */
}

.form-content {
  position: relative;
  text-align: center;
  width: 100%;
  padding: 0 10px;
  z-index: 199;
}

.copyrights {
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 19;
  color: #ffffff;
}
.login-register {
  position: relative;
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
  float: right;
  background: #f09 !important;
}
.components-input-demo-presuffix .anticon-close-circle:hover {
  color: #999;
}
.components-input-demo-presuffix .anticon-close-circle:active {
  color: #666;
}
.btn-login {
  width: 100%;
  height: 40px;
}
.ant-input-affix-wrapper {
  font-size: 16px;
  color: #000;
}

@keyframes rolling {
  0% {
    transform: rotate(0deg);
    top: 1080px;
  }
  25% {
    transform: rotate(180deg);
    top: 800px;
  }
  50% {
    transform: rotate(270deg);
    top: 530px;
  }
  75% {
    transform: rotate(360deg);
    top: 200px;
  }
  100% {
    transform: rotate(480deg);
    top: -200px;
  }
}
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 40px !important;
  background: #f09 !important;
}
#indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
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
