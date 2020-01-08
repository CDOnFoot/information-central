<template>
  <div>
    <div class="video-area-0">
      <div class="video-content-0">
        <!--<video id="myPlayer"
               width="500px"
               height="350px"
               src="ezopen://open.ys7.com/D14931813/1.live"
               autoplay controls playsInline webkit-playsinLine></video>-->
        <iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/2.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"
                width="600" height="400" id="ysOpenDevice" allowfullscreen></iframe>
      </div>
      <div class="video-content-1">
        <iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/3.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"
                width="600" height="400" id="ysOpenDevice-1" allowfullscreen>
        </iframe>
      </div>
    </div>

    <div class="video-area-1">
      <div class="video-content-2">
        <iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/4.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"
                width="600" height="400" id="ysOpenDevice-2" allowfullscreen></iframe>
      </div>
      <div class="video-content-3">
        <iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/5.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"
                width="600" height="400" id="ysOpenDevice-3" allowfullscreen></iframe>
      </div>
      <div class="video-content"></div>
    </div>
    <div class="control">
      <a-button @click="startVideo">start</a-button>
      <a-button @click="endVideo">pause</a-button>
      <a-select defaultValue="0" style="width: 150px" @change="chooseVideos">
        <a-icon slot="suffixIcon" type="down-circle" theme="twoTone" twoToneColor="#27b5d4"/>
        <a-select-option value="0">1 × 1</a-select-option>
        <a-select-option value="1">2 × 2</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
  // 不用再额外引入
  // import {EZUIKit} from '../../../../static/ezuikit'
  export default {
    data () {
      return {
        player: '',
        // 视频长宽 - 根据显示台数改变
        videoWidth: 600,
        videoHeight: 400
      }
    },

    // 在组件挂载前就必须拿到 token
    beforeMount () {
      this.getAccessTokenIn();
    },

    mounted () {
      // 优先获取 accessToken 用于调用其他萤石官方 API
      // this.player = new EZUIKit.EZUIPlayer('myPlayer');
      let player = document.getElementById("ysOpenDevice").contentWindow;
      let player_1 = document.getElementById("ysOpenDevice-1").contentWindow;
      let player_2 = document.getElementById("ysOpenDevice-2").contentWindow;
      let player_3 = document.getElementById("ysOpenDevice-3").contentWindow;
    },

    methods: {
      getAccessTokenIn () {
        const that = this;
        // 跨域
        let param = new FormData();
        param.append('appKey', '31b9d2360c7845ecaff4870f68e10b20');
        param.append('appSecret', '2b54e82f434c0667299b130f4d85e3f9');
        /*this.$http.post(that.$api.getAccessToken, param).then(res => {
          console.log(res)
        })*/
        this.$axios.post("/api/lapp/token/get", param)
          .then(res => {
            console.log(res);
          })
      },
      startVideo () {
        // this.player.play();
      },

      endVideo () {
        // this.player.stop();
      },

      /**
       * @function 选择不同的摄像头个数
       */
      chooseVideos (value) {
        const that = this;
        switch (value) {
          case "0":
            // 选择了 1 * 1 视频
            break;
          case "1":
            // 选择了 2 * 2 视频
            break;
          default:
            return;
        }
      }
    }
  }
</script>

<style scoped>
.video-area-0, .video-area-1 {
  display: flex;
  flex-direction: row;
}
</style>
