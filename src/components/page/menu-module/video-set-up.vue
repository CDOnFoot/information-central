<template>
  <div class="video-set-up">
    <div class="login-module" v-show="isShowModal">
      <a-form
        id="login"
        :form="form"
        class="login-form"
        @submit="login"
      >

        <a-form-item label="用户名" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>

        <a-form-item label="密码" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>

        <a-form-item label="IP地址" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
          'ipAddress',
          { rules: [{ required: true, message: '请输入IP地址' }] },
        ]"
            placeholder="IP Address"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>

        <a-form-item label="端口号" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
          'port',
          { rules: [{ required: true, message: '请输入端口号' }] },
        ]"
            placeholder="Port"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>

        <a-form-item label="设备端口" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
          'equipmentPort',
          { rules: [{ required: true, message: '请输入设备端口' }] },
        ]"
            placeholder="Equipment Port"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>

        <a-form-item label="RTSP端口" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-input
            v-decorator="[
          'RTSPPort',
          { rules: [{ required: true, message: '请输入设备RTSP端口' }] },
        ]"
            placeholder="RTSP Port"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 8, offset: 8 }">
          <a-button type="primary" html-type="submit">
            登录
          </a-button>
          <a-button type="primary" :style="{ marginLeft: '8px' }">
            退出
          </a-button>
          <a-button type="primary" :style="{ marginLeft: '8px' }">
            获取基本信息
          </a-button>
        </a-form-item>

      </a-form>
    </div>
    <!--<div class="control-module">-->
    <!--<a-tabs defaultActiveKey="1" @change="callback" type="card" animated="true">-->
    <!--<a-tab-pane tab="登录" key="1">-->
    <!--&lt;!&ndash;<a-card size="small" title="登录">&ndash;&gt;-->
    <!--&lt;!&ndash;<a href="#" slot="extra">more</a>&ndash;&gt;-->
    <!--&lt;!&ndash;</a-card>&ndash;&gt;-->
    <!--</a-tab-pane>-->
    <!--<a-tab-pane tab="数字通道" key="2" forceRender>-->
    <!--2-->
    <!--</a-tab-pane>-->
    <!--<a-tab-pane tab="本地配置" key="3" forceRender>-->
    <!--2-->
    <!--</a-tab-pane>-->
    <!--<a-tab-pane tab="系统维护" key="4" forceRender>-->
    <!--2-->
    <!--</a-tab-pane>-->
    <!--<a-tab-pane tab="设备IP解析" key="5" forceRender>-->
    <!--2-->
    <!--</a-tab-pane>-->
    <!--</a-tabs>-->
    <!--</div>-->
    <div class="control-module" v-show="!isShowModal">
      <a-row :gutter="16" :style="{ height: '100%'}">
        <a-col class="gutter-row" :span="12" :style="{ height: '100%'}">
          <div class="gutter-box" :style="{ height: '100%'}">
            <a-card size="small" title="本地配置" :style="{ height: '100%', marginBottom:'10px'}">
              <a href="#" slot="extra">more</a>
              <div>

              </div>
            </a-card>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12" :style="{ height: '100%'}">
          <div class="gutter-box" :style="{ height: '100%'}">

            <a-card size="small" title="数字通道" :style="{ height: '36%', marginBottom:'2%'}">
              <a href="#" slot="extra">more</a>
              <div>

              </div>
            </a-card>

            <a-card size="small" title="系统维护" :style="{ height: '30%', marginBottom:'2%'}">
              <a href="#" slot="extra">more</a>
              <div>

              </div>
            </a-card>

            <a-card size="small" title="设备IP解析" :style="{ height: '30%'}">
              <a href="#" slot="extra">more</a>
              <div>

              </div>
            </a-card>

          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "video-set-up",
    data() {
      return {
        isShowModal: false,

      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'login'});
    },
    methods: {
      callback(key) {
        console.log(key);
      },
      login(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);


          }
        });
      },
    },
  };

</script>

<style scoped>
  .video-set-up {
    width: 100%;
    height: 90%;
    position: relative;
  }

  .login-module {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 10%;
    left: 25%;
  }

  .control-module {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 20px;
  }

</style>
