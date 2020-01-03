<template>
  <div>
    <div class="video-content">
      <video id="myPlayer"
             width="500px"
             height="350px"
             src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8"
             autoplay controls playsInline></video>
    </div>
    <div class="control">
      <a-button @click="startVideo">start</a-button>
      <a-button @click="endVideo">pause</a-button>
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
      this.player = new EZUIKit.EZUIPlayer('myPlayer');
    },

    methods: {
      startVideo () {
        this.player.play();
      },

      endVideo () {
        this.player.stop();
      }
    }
  }
</script>

<style scoped>

</style>
