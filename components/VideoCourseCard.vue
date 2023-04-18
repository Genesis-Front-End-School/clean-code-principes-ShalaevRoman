<template>
  <v-card class="mb-5" :to="`/courses/${course.id}`">
    <div class="video-wrapper">
      <video
        :ref="nameElement"
        :poster="previewImageLink"
        muted
        controls
        class="cursor-pointer video-player pa-5"
        @mouseenter="playVideo()"
        @mouseout="stopVideo()"
      >
      </video>
    </div>
    <v-avatar
      v-if="course.status === 'launched'"
      class="mt-2 ml-2"
      color="white"
      size="xs"
    >
      <v-icon color="success">mdi-check-bold</v-icon>
    </v-avatar>
    <v-card-title class="pt-4 d-flex flex-column">
      <div class="headline font-weight-bold mb-2">
        {{ course.title }}
      </div>
      <div class="grey--text font-weight-light mb-3 skills-wrapper">
        <ul>
          <li v-for="(skill, i) in course.meta.skills" :key="i">
            {{ skill }}
          </li>
        </ul>
      </div>
      <div class="rating-wrapper">
        <v-rating
          :value="course.rating"
          background-color="grey lighten-3"
          color="primary"
          :readonly="true"
          :size="24"
        ></v-rating>
        <div class="subtitle-2 font-weight-bold">
          {{ course.lessonsCount }} lessons
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'VideoCourseCard',
  props: ['course'],
  computed: {
    previewImageLink () {
      return this.course.previewImageLink + '/cover.webp'
    },
  },
  data () {
    return {
      nameElement: 'videoPlayer'
    }
  },
  methods: {
    playVideo() {
      const video = this.$refs[`${this.nameElement}`]
      const link = this.course.meta.courseVideoPreview.link

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(link)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = link
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      }
    },
    stopVideo() {
      const video = this.$refs[`${this.nameElement}`]
      video.pause()
      video.currentTime = 0
    }
  },
}
</script>

<style scoped lang="scss">
.v-card {
  transition: all 0.3s ease;
  box-shadow: none;
  border-radius: 8px;
  overflow: hidden;
  .rating-wrapper,
  .skills-wrapper {
    width: 100%;
  }
  .video-wrapper {
    .video-player {
      width: 100%;
      height: 30vh;
    }
  }
}
@media screen and (max-width: 428px) {
  .v-card {
    .video-wrapper {
      .video-player {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>
