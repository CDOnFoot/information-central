<template>
  <div class="video-set-up">
    <a-modal
      title="登录"
      :visible="visible"
      :maskClosable="maskClosable"
      style="top: 160px;"
    >
      <template slot="footer">
        <a-button type="primary" :loading="confirmLoading" @click="loginOk">
          确认
        </a-button>
        <a-button type="primary" @click="loginCancel">
          取消
        </a-button>
        <a-button type="primary" @click="getbasicInformation">
          获取基本信息
        </a-button>
      </template>
      <div>
        <a-form
          id="loginForm"
          :form="loginForm"
          class="login-form"
          @submit="loginOk"
        >
          <a-form-item label="用户名" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
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
          <a-form-item label="密码" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
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
          <a-form-item label="IP地址" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
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
          <a-form-item label="端口号" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
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
          <a-form-item label="设备端口" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
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
          <a-form-item label="RTSP端口" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
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
        </a-form>
      </div>
    </a-modal>
    <div class="set-up-module">
      <a-row :gutter="16" style="height: 4%; margin-bottom: 1%; text-align: right">
        <a-col class="gutter-row" :span="24">
          <a-button type="primary" @click="showLoginModal">登录</a-button>
        </a-col>
      </a-row>
      <a-row :gutter="16" style="height: 95%;">
        <a-col class="gutter-row" :span="10" style="height: 100%;">
          <div class="gutter-box" style="height: 100%;">
            <a-card size="small" title="本地配置" style="height: 100%;">
              <a href="#" slot="extra">more</a>
              <div style="background-color: #0259ad">
                <a-form
                  id="localConfig"
                  :form="localConfigForm"
                  class="local-config"
                  @submit="localConfigOk"
                  layout="inline"
                >
                  <a-row :gutter="24">
                    <a-col :span="12">
                      <a-form-item label="播放性能" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                        <a-select defaultValue="0" style="width: 140px">
                          <a-select-option value="0">最短延时</a-select-option>
                          <a-select-option value="1">实时性好</a-select-option>
                          <a-select-option value="2">均衡</a-select-option>
                          <a-select-option value="3">流畅性好</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="图像尺寸" :label-col="{ span: 12 }"  :wrapper-col="{ span: 12 }">
                        <a-select defaultValue="0" style="width: 140px">
                          <a-select-option value="0">充满</a-select-option>
                          <a-select-option value="1">4:3</a-select-option>
                          <a-select-option value="2">16:9</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="24">
                    <a-col :span="12">
                      <a-form-item label="规则信息" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                        <a-select defaultValue="0" style="width: 140px">
                          <a-select-option value="0">禁用</a-select-option>
                          <a-select-option value="1">启用</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="抓图格式" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                        <a-select defaultValue="0" style="width: 140px">
                          <a-select-option value="0">JPEG</a-select-option>
                          <a-select-option value="1">BMP</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="24">
                    <a-col :span="12">
                      <a-form-item label="文件大小" :label-col="{ span: 15 }" :wrapper-col="{ span: 8 }">
                        <a-select defaultValue="0" style="width: 140px">
                          <a-select-option value="0">256M</a-select-option>
                          <a-select-option value="1">512M</a-select-option>
                          <a-select-option value="2">1G</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="协议类型" :label-col="{ span: 14 }" :wrapper-col="{ span: 8 }">
                        <a-select defaultValue="0" style="width: 140px">
                          <a-select-option value="0">TCP</a-select-option>
                          <a-select-option value="1">UDP</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="24">
                    <a-col :span="24">
                      <a-form-item label="录像文件保存路径" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                        <a-input v-decorator="['recordPath']" @click="clickOpenFileDlg" disabled style="width: 140px;">
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>

                </a-form>
              </div>
            </a-card>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="14" style="height: 100%;">
          <div class="gutter-box" style="height: 100%;">

            <a-card size="small" title="数字通道" style="height: 36%; margin-bottom: 2%">
              <a href="#" slot="extra">more</a>
              <div>

              </div>
            </a-card>

            <a-card size="small" title="系统维护" style="height: 30%; margin-bottom: 2%">
              <a href="#" slot="extra">more</a>
              <div>

              </div>
            </a-card>

            <a-card size="small" title="设备IP解析" style="height: 30%;">
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
        visible: false,
        maskClosable: false,
        confirmLoading: false,
      };
    },
    methods: {
      showLoginModal() {
        this.visible = true;
      },
      loginOk(e) {
        e.preventDefault();

        this.confirmLoading = true;
        setTimeout(() => {
          this.loginForm.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);


            }
          });
          this.visible = false;
          this.confirmLoading = false;
          this.$message.info('Login Success');

        }, 2000);
      },
      loginCancel(e) {
        this.$message.info('Clicked cancel button');
        this.visible = false;
      },
      getbasicInformation() {
        this.$message.info('This is a normal message');
      },
      clickOpenFileDlg() {
      },
      localConfigOk() {
      },
    },
    beforeCreate() {
      this.loginForm = this.$form.createForm(this, {name: 'loginForm'});
      this.localConfigForm = this.$form.createForm(this, {name: 'localConfigForm'});


    },
  };

</script>

<style scoped>
  .video-set-up {
    width: 100%;
    height: 90%;
  }

  .set-up-module {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .ant-card {
    background: transparent;
  }

  /deep/ .ant-card-head {
    color: #ffffff;
  }
</style>
