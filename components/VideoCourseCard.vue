<template>
  <v-card class="mb-5" :to="getPath">
    <div class="video-wrapper">
      <video
        :ref="course.id"
        :poster="imgPath"
        muted
        controls
        class="cursor-pointer video-player pa-5"
        @mouseenter="playVideo()"
        @mouseout="stopVideo()"
      />
    </div>
    <MyAvatar
      v-if="isLaunched"
    />
    <v-card-title class="pt-4 d-flex flex-column">
      <div class="headline font-weight-bold mb-2">
        {{ course.title }}
      </div>
      <div class="grey--text font-weight-light mb-3 skills-wrapper">
        <SkillsList
          :skills="course.meta.skills"
        />
      </div>
      <div class="rating-wrapper">
        <MyRating
          :rating="course.rating"
        />
        <div class="subtitle-2 font-weight-bold">
          {{ course.lessonsCount }} lessons
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import Hls, { Events } from 'hls.js'
import { SkillsList, MyRating, MyAvatar } from 'my-library'
import { CourseItem } from '~/shared/services/api.types'
export default defineComponent({
  name: 'VideoCourseCard',
  components: { SkillsList, MyRating, MyAvatar },
  props: {
    course: {
      type: Object as PropType<CourseItem>,
      required: true
    }
  },
  computed: {
    imgPath (): string {
      return this.course.previewImageLink + '/cover.webp'
    },
    isLaunched (): boolean {
      return this.course.status === 'launched'
    },
    getPath (): string {
      return `/courses/${this.course.id}`
    }
  },
  methods: {
    playVideo (): void {
      const video = this.$refs[this.course.id] as HTMLVideoElement
      const link = this.course.meta.courseVideoPreview.link

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(link)
        hls.attachMedia(video)
        hls.on(Events.MANIFEST_PARSED, () => {
          video.play()
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = link
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      }
    },
    stopVideo (): void {
      const video = this.$refs[this.course.id] as HTMLVideoElement
      video.pause()
      video.currentTime = 0
    }
  }
})
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
