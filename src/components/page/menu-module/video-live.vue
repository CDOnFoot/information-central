<template>
 <div>
   <div id="divPlugin" class="plugin"></div>
 </div>
</template>

<script>
  // 引入 webVideoCtrl 模块，必须放在 static 文件夹下
  import {WebVideoCtrl} from '../../../../static/webVideoCtrl'
  export default {
    data () {
      return {}
    },

    mounted () {
      // 初始化 webVideoCtrl 插件
      this.videoInitPlugin();
    },

    methods: {
      videoInitPlugin () {
        // 检查插件是否安装
        let iRet = WebVideoCtrl.I_CheckPluginInstall();
        // console.log('check the plugin result:');
        // console.log(iRet);
        // console.log(WebVideoCtrl);
        if (iRet === -1) {
          alert('未安装 WebComponentsKits.exe 插件。');
          return
        }
        this.initPlugin();
      },

      initPlugin () {
        var that = this;

        WebVideoCtrl.I_InitPlugin(500, 300, {
          bWndFull: true,//是否支持单窗口双击全屏，默I_CheckPluginInstall
          iWndowType: 2,
          myCbSelWnd: function (xmlStr) { //自己新增的方法
            var jsonObj = that.$x2js.xml2js(xmlStr);
            var szInfo = "当前选择的窗口编号：" + jsonObj.RealPlayInfo.SelectWnd;
            this.mySelectWnd = jsonObj.RealPlayInfo.SelectWnd;
            console.log(szInfo);
          },
          cbInitPluginComplete: function () {
            WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
            // 检查插件是否最新
            if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
              alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
              return;
            }
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
