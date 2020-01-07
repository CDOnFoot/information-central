<template>
  <div>
    <div class="video-area-0">
      <div class="video-content">
        <!--<video id="myPlayer"
               width="500px"
               height="350px"
               src="ezopen://open.ys7.com/D14931813/1.live"
               autoplay controls playsInline webkit-playsinLine></video>-->
        <iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/2.hd.live&autoplay=1&accessToken=at.72oty9n81fltu3e792o8r7xz4h1dwnn5-1vwq1wqtol-0ffw440-tfrgzl1jz"
                width="500" height="400" id="ysOpenDevice" allowfullscreen></iframe>
      </div>
      <div class="video-content">
        <iframe src="" width="" height="" id="" allowfullscreen>
        </iframe>
      </div>
    </div>

    <div class="video-area-1">
      <div class="video-content">
        <iframe src="" width="" height="" id="" allowfullscreen></iframe>
      </div>
      <div class="video-content">
        <iframe src="" width="" height="" id="" allowfullscreen></iframe>
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
        player: ''
      }
    },

    mounted () {
      // 优先获取 accessToken 用于调用其他萤石官方 API
      // this.player = new EZUIKit.EZUIPlayer('myPlayer');
      let player = document.getElementById("ysOpenDevice").contentWindow;
    },

    methods: {
      getAccessToken () {
        const that = this;
        // 跨域
        /*let param = new FormData();
        param.append('appKey', '31b9d2360c7845ecaff4870f68e10b20');
        param.append('appKey', '2b54e82f434c0667299b130f4d85e3f9');
        this.$http.post(that.$api.getAccessToken, param).then(res => {
          console.log(res)
        })*/
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

</style>
