<template>
    <div>
      <div class="load-icon" v-show="loadSymbol">
        <a-spin class="load-img" size="large" />
      </div>
      <div class="video-information">
        <tr>
          <th height="45" width="132"><div class="status-title"><div>硬盘状态</div></div></th>
          <th height="45" width="132">
            <div class="status-menu"><div>正常</div></div>
          </th>
          <th height="45" width="132"><div class="status-title"><div>硬盘数量</div></div></th>
          <th height="45" width="132">
            <div class="status-menu"><div>一个硬盘</div></div>
          </th>
        </tr>
        <tr>
          <td height="45" width="132"><div class="status-title"><div>隐私状态</div></div></td>
          <td height="45" width="132">
            <div class="status-menu"><div>隐私关闭</div></div>
          </td>
          <td height="45" width="132"></td>
          <td height="45" width="132">
            <!--<div class="status-menu"></div>-->
          </td>
        </tr>
      </div>

      <div class="channel-area">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#"> Hover me <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <!--<div class="video-information" id="video-information-1" style="width: 90%;height: 105px"></div>-->
    </div>
</template>

<script>
    export default {
        name: "video-information",
      // 父组件传值
      props: ["accessToken"],
      data () {
          return {
            loadSymbol: false,
            deviceSerial: 'D14931813'
          }
      },

      // 是否需要一个监听属性
      watch: {
        accessToken: function (val) {
          console.log("transfer the token:", val);
          this.accessToken = val;
        }
      },

      created () {
          // this.loadSymbol = true;
          // this.getDeviceStatus();
      },

      mounted () {
        // this.loadSymbol = true;
      },

      methods: {

      }
    }
</script>

<style scoped>

  .video-information {
    color: #fff;
    margin-top: 8px;
  }

  .status-title {
    font-size: 25px;
    /*padding-top: 10px;*/
    margin-left: 20px;
    display: flex;
  }

  .status-title div {}

.status-menu {
  text-align: center;
  font-size: 18px;
  width: 100%;
  height: 45px;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 204, 255, 1) inset;
}

  .channel-area {
    margin: 20px 0 0 20px;
  }
</style>
