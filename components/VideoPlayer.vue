<template>
  <video
    ref="videoPlayer"
    class="videoPlayer"
    controls
  />
</template>

<script>
import Hls, { Events } from 'hls.js'

export default {
  name: 'VideoPlayer',
  props: {
    selectedLesson: {
      required: false,
      type: Object,
      default () {
        return {
          title: 'Hello User'
        }
      }
    },
    lessonProgress: {
      required: false,
      type: Number,
      default () {
        return 0
      }
    }
  },
  watch: {
    selectedLesson () {
      this.playLesson()
    },
    lessonProgress () {
      this.playLesson()
    }
  },
  methods: {
    playLesson () {
      const video = this.$refs.videoPlayer

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(this.selectedLesson.link)
        hls.attachMedia(video)
        hls.on(Events.MANIFEST_PARSED, () => {
          video.currentTime = this.selectedLesson.duration * this.lessonProgress / 100
          video.play()
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.selectedLesson.link
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      }
      video.addEventListener('timeupdate', () => {
        const progress = Math.floor((video.currentTime / video.duration) * 100)
        if (!Number.isNaN(progress)) {
          localStorage.setItem(this.selectedLesson.id, progress)
        }
      })
    }
  }
}
</script>

<style scoped>
.videoPlayer {
  width: 100%;
  height: 35vh;
}
@media screen and (max-width: 428px) {
  .videoPlayer {
    width: 100%;
    height: 100%;
  }
}
</style>
