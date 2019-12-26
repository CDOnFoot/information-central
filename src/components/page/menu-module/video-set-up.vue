<template>
  <div class="video-set-up">
    <a-modal
      title="登录"
      :visible="visible"
      :maskClosable="maskClosable"
      style="top: 160px;"
    >
      <template slot="footer">
        <a-button type="primary" :loading="loading" @click="clickLogin">
          确认
        </a-button>
        <a-button type="primary" @click="clickLogout">
          取消
        </a-button>
        <a-button type="primary" @click="clickGetDeviceInfo">
          获取基本信息
        </a-button>
      </template>
      <div>
        <a-form
          id="login"
          :form="login"
          class="login"
          @submit="clickLogin"
        >
          <a-form-item label="用户名" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
              placeholder="username"
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
              placeholder="password"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item label="IP地址" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
          'loginip',
          { rules: [{ required: true, message: '请输入IP地址' }] },
        ]"
              placeholder="loginip"
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
              placeholder="port"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item label="设备端口" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
          'deviceport',
          { rules: [{ required: true, message: '请输入设备端口' }] },
        ]"
              placeholder="deviceport"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item label="RTSP端口" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="[
          'rtspport',
          { rules: [{ required: true, message: '请输入设备RTSP端口' }] },
        ]"
              placeholder="rtspport"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <div class="set-up-module">
      <a-row :gutter="16" style="height: 100%;">
        <a-col class="gutter-row" :span="10" style="height: 100%;">
          <div class="gutter-box" style="height: 100%;">
            <a-card size="small" title="本地配置" style="height: 100%;">
              <a href="#" slot="extra" @click="showModal">Login</a>
              <a-form
                id="localconfig"
                :form="localconfig"
                class="localconfig"
                @submit="clickSetLocalCfg"
                layout="inline"
              >
                <table style="width: 100%;">
                  <tr>
                    <td>
                      <a-form-item label="播放性能">
                        <a-select v-decorator="['netsPreach',{initialValue:'最短延时'}]" style="width: 100px">
                          <a-select-option value="最短延时">最短延时</a-select-option>
                          <a-select-option value="实时性好">实时性好</a-select-option>
                          <a-select-option value="均衡">均衡</a-select-option>
                          <a-select-option value="流畅性好">流畅性好</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="图像尺寸">
                        <a-select v-decorator="['wndSize',{initialValue:'充满'}]" style="width: 100px">
                          <a-select-option value="充满">充满</a-select-option>
                          <a-select-option value="4:3">4:3</a-select-option>
                          <a-select-option value="16:9">16:9</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="规则信息">
                        <a-select v-decorator="['rulesInfo',{initialValue:'禁用'}]" style="width: 100px">
                          <a-select-option value="禁用">禁用</a-select-option>
                          <a-select-option value="启用">启用</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-form-item label="文件格式">
                        <a-select v-decorator="['captureFileFormat',{initialValue:'JPEG'}]" style="width: 100px">
                          <a-select-option value="JPEG">JPEG</a-select-option>
                          <a-select-option value="BMP">BMP</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="打包大小">
                        <a-select v-decorator="['packSize',{initialValue:'256M'}]" style="width: 100px">
                          <a-select-option value="256M">256M</a-select-option>
                          <a-select-option value="512M">512M</a-select-option>
                          <a-select-option value="1G">1G</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="协议类型">
                        <a-select v-decorator="['protocolType',{initialValue:'TCP'}]" style="width: 100px">
                          <a-select-option value="TCP">TCP</a-select-option>
                          <a-select-option value="UDP">UDP</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-form-item label="录像文件保存路径">
                        <a-input v-decorator="['recordPath']" @click="clickOpenFileDlg('recordPath', 0)" disabled>
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-form-item label="回放下载保存路径">
                        <a-input v-decorator="['downloadPath']" @click="clickOpenFileDlg('downloadPath', 0)" disabled>
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-form-item label="预览抓图保存路径">
                        <a-input v-decorator="['previewPicPath']" @click="clickOpenFileDlg('previewPicPath', 0)"
                                 disabled>
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-form-item label="回放抓图保存路径">
                        <a-input v-decorator="['playbackPicPath']" @click="clickOpenFileDlg('playbackPicPath', 0)"
                                 disabled>
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-form-item label="回放剪辑保存路径">
                        <a-input v-decorator="['playbackFilePath']" @click="clickOpenFileDlg('playbackFilePath', 0)"
                                 disabled>
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-form-item label="设备抓图保存路径">
                        <a-input v-decorator="['devicePicPath']" @click="clickOpenFileDlg('devicePicPath', 0)" disabled>
                          <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                        </a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <a-button type="primary" @click="clickGetLocalCfg">
                        获取
                      </a-button>
                      <a-button type="primary" @click="clickSetLocalCfg">
                        设置
                      </a-button>
                    </td>
                  </tr>
                </table>
              </a-form>
            </a-card>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="14" style="height: 100%;">
          <div class="gutter-box" style="height: 100%;">
            <a-card size="small" title="数字通道" style="height: 38%; margin-bottom: 1%">
              <a href="#" slot="extra">more</a>
              <div>
                <div>
                  <a-button type="primary" @click="clickGetDigitalChannelInfo">
                    获取数字通道列表
                  </a-button>
                </div>
                <div>

                </div>
              </div>
            </a-card>
            <a-card size="small" title="系统维护" style="height: 30%; margin-bottom: 1%">
              <a href="#" slot="extra">more</a>
              <table style="width: 100%;border-collapse:separate; border-spacing:0px 10px;">
                <tr>
                  <td>
                    <a-button type="primary" @click="clickExportDeviceConfig">
                      导出配置文件
                    </a-button>
                    <a-button type="primary" @click="clickCheckPluginVersion">
                      检查插件版本
                    </a-button>
                    <a-button type="primary" @click="clickRemoteConfig">
                      远程配置库
                    </a-button>
                    <a-button type="primary" @click="clickRestoreDefault">
                      恢复默认参数
                    </a-button>
                  </td>
                </tr>
                <tr style="margin-top: 10px">
                  <td>
                    <a-input v-decorator="['playbackFilePath']" @click="clickOpenFileDlg('configFile', 1)"
                             disabled>
                      <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                    </a-input>
                  </td>
                  <td>
                    <a-button type="primary" @click="clickImportDeviceConfig">
                      导入配置文件
                    </a-button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a-input v-decorator="['playbackFilePath']" @click="clickOpenFileDlg('upgradeFile', 1)"
                             disabled>
                      <a-icon slot="addonAfter" type="folder-open" style="cursor: pointer"/>
                    </a-input>
                  </td>
                  <td>
                    <a-button type="primary" @click="clickStartUpgrade">
                      升级
                    </a-button>
                  </td>
                </tr>
              </table>
            </a-card>
            <a-card size="small" title="设备IP解析" style="height: 30%;">
              <a href="#" slot="extra">more</a>
              <a-form
                id="ipparse"
                :form="ipparse"
                class="ipparse"
                @submit=""
                layout="inline"
              >
                <table style="width: 100%;">
                  <tr>
                    <td>
                      <a-form-item label="模式">
                        <a-select v-decorator="['devicemode',{initialValue:'IPServer'}]" style="width: 120px">
                          <a-select-option value="IPServer">IPServer</a-select-option>
                          <a-select-option value="HiDDNS">HiDDNS</a-select-option>
                        </a-select>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="服务器地址">
                        <a-input v-decorator="['serveraddress']"></a-input>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="端口号">
                        <a-input v-decorator="['serverport']"></a-input>
                      </a-form-item>
                    </td>
                    <td>
                      <a-form-item label="设备标识">
                        <a-input v-decorator="['deviceid']"></a-input>
                      </a-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <a-button type="primary" @click="clickGetDeviceIP">
                        获取设备IP
                      </a-button>
                    </td>
                  </tr>
                </table>
              </a-form>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

  const g_iWndIndex = 0;

  export default {
    name: "video-set-up",
    data() {
      return {
        visible: false,
        maskClosable: false,
        loading: false,
      };
    },
    methods: {
      init() {

      },
      // login
      showModal() {
        this.visible = true;
      },
      clickLogin(e) {
        e.preventDefault();
        this.loading = true;
        this.login.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let szIP = values.loginip;
            let szPort = values.port;
            let szUsername = values.username;
            let szPassword = values.password;

            if ("" == szIP || "" == szPort) {
              return;
            }

            let szDeviceIdentify = szIP + "_" + szPort;

            let iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
              success: function (xmlDoc) {
                this.$message.info(szDeviceIdentify + " 登录成功！");

                $("#ip").prepend("<option value='" + szDeviceIdentify + "'>" + szDeviceIdentify + "</option>");

                setTimeout(function () {
                  $("#ip").val(szDeviceIdentify);
                  getChannelInfo();
                  getDevicePort();
                }, 10);

                this.visible = false;
                this.loading = false;

              },
              error: function (status, xmlDoc) {
                this.$message.info(szDeviceIdentify + " 登录失败！", status, xmlDoc);
                this.loading = false;

              }
            });

            if (-1 == iRet) {
              this.$message.info(szDeviceIdentify + " 已登录过！");
              this.loading = false;

            }
          } else {
            this.loading = false;
          }
        });
      },
      clickLogout(e) {
        this.$message.info('Clicked cancel button');
        this.visible = false;
      },
      clickGetDeviceInfo() {
        this.$message.info('This is a normal message');
      },

      // localconfig
      clickOpenFileDlg(id, iType) {
        let szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
        if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
          $("#" + id).val(szDirPath);
        }
      },
      clickGetLocalCfg() {
        let xmlDoc = WebVideoCtrl.I_GetLocalCfg();
        if (xmlDoc != null) {
          $("#netsPreach").val($(xmlDoc).find("BuffNumberType").eq(0).text());
          $("#wndSize").val($(xmlDoc).find("PlayWndType").eq(0).text());
          $("#rulesInfo").val($(xmlDoc).find("IVSMode").eq(0).text());
          $("#captureFileFormat").val($(xmlDoc).find("CaptureFileFormat").eq(0).text());
          $("#packSize").val($(xmlDoc).find("PackgeSize").eq(0).text());
          $("#recordPath").val($(xmlDoc).find("RecordPath").eq(0).text());
          $("#downloadPath").val($(xmlDoc).find("DownloadPath").eq(0).text());
          $("#previewPicPath").val($(xmlDoc).find("CapturePath").eq(0).text());
          $("#playbackPicPath").val($(xmlDoc).find("PlaybackPicPath").eq(0).text());
          $("#devicePicPath").val($(xmlDoc).find("DeviceCapturePath").eq(0).text());
          $("#playbackFilePath").val($(xmlDoc).find("PlaybackFilePath").eq(0).text());
          $("#protocolType").val($(xmlDoc).find("ProtocolType").eq(0).text());

          showOPInfo("本地配置获取成功！");
        } else {
          showOPInfo("本地配置获取失败！");
        }
      },
      clickSetLocalCfg(e) {
        e.preventDefault();
        this.loading = true;
        setTimeout(() => {
          this.localconfig.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
          this.loading = false;
          this.$message.info('Success');

        }, 2000);
      },

      // ipchannel
      clickGetDigitalChannelInfo() {
      },

      // maintain
      clickExportDeviceConfig() {
      },
      clickCheckPluginVersion() {
      },
      clickRemoteConfig() {
      },
      clickRestoreDefault() {
      },
      clickImportDeviceConfig() {
      },
      clickStartUpgrade() {
      },

      // ipparse
      clickGetDeviceIP() {
      },

    },
    beforeCreate() {
      this.login = this.$form.createForm(this, {name: 'login'});
      this.localconfig = this.$form.createForm(this, {name: 'localconfig'});
      this.ipparse = this.$form.createForm(this, {name: 'ipparse'});


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

  /deep/ .ant-card {
    background: transparent;
  }

  /deep/ .ant-card-head {
    color: #ffffff;
  }

  /deep/ .ant-form-inline .ant-form-item {
    margin-right: 0;
  }
</style>
