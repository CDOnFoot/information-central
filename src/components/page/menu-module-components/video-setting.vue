<template>
    <div>
      <div class="control-area">
        <tr>
          <td height="45" width="142"><div class="select-title">镜头遮蔽开关</div></td>
          <td height="45" width="130">
            <div class="control-area-button">
              <a-switch defaultChecked @change="onChange" />
            </div>
          </td>
          <td height="45" width="135"><div class="select-title">指示灯开关</div></td>
          <td height="45" width="120">
            <div class="control-area-button">
              <a-switch defaultChecked @change="onChange" />
            </div>
          </td>
        </tr>
        <tr>
          <td height="45" width="142"><div class="select-title">录像开关</div></td>
          <td height="45" width="130">
            <div class="control-area-button">
              <a-switch defaultChecked @change="onChange" />
            </div>
          </td>
          <td height="45" width="135"><div class="select-title">麦克风开关</div></td>
          <td height="45" width="120">
            <div class="control-area-button">
              <a-switch defaultChecked @change="onChange" />
            </div>
          </td>
        </tr>
        <tr>
          <td height="45" width="142"><div class="select-title">声源定位开关</div></td>
          <td height="45" width="130">
            <div class="control-area-button">
              <a-switch defaultChecked @change="onChange" />
            </div>
          </td>
          <td height="45" width="135"></td>
          <td height="45" width="120"></td>
        </tr>
        <tr>
          <td height="45" width="142"><div class="select-title">告警声音模式</div></td>
          <td height="45" width="130">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"><a-icon type="user" />短叫</a-menu-item>
                <a-menu-item key="2"><a-icon type="user" />长叫</a-menu-item>
                <a-menu-item key="3"><a-icon type="user" />静音</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px"> 选择 <a-icon type="down" /> </a-button>
            </a-dropdown>
          </td>
          <td height="45" width="130"><div class="select-title">当前模式</div></td>
          <td height="45" width="120">
            <div class="status-menu"><div>{{alarmMode}}</div></div>
          </td>
        </tr>
      </div>
    </div>
</template>

<script>
    export default {
        name: "video-setting",
      data () {
          return {
            alarmMode: '短叫'
          }
      },

      methods: {
        onChange (checked) {
          console.log("change the status to:", checked)
        },

        handleMenuClick (e) {
          console.log("choose:", e);
          const key = e.key;
          switch (key) {
            case "1":
              this.alarmMode = "短叫";
              this.$emit("changeAlarmMode", "1");
              break;
            case "2":
              this.alarmMode = "长叫";
              this.$emit("changeAlarmMode", "2");
              break;
            case "3":
              this.alarmMode = "静音";
              this.$emit("changeAlarmMode", "3");
              break;
            default:
              return;
          }
        }
      }
    }
</script>

<style scoped>
.control-area {
  margin: 15px 0 0 20px;
  /*font-size: 18px;*/
}
  .select-title {
    font-size: 20px;
  }

.status-menu {
  margin-right: 15px;
  text-align: center;
  font-size: 18px;
  width: 100%;
  height: 45px;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 204, 255, 1) inset;
}
</style>
