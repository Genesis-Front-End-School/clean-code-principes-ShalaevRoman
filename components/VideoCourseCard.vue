<template>
  <v-card class="mb-5" :to="`/courses/${course.id}`">
    <div class="video-wrapper">
      <video
        :ref="course.id"
        :poster="imgPath"
        muted
        controls
        class="cursor-pointer video-player pa-5"
        @mouseenter="playVideo($refs[course.id], course.meta.courseVideoPreview.link)"
        @mouseout="stopVideo($refs[course.id])"
      />
    </div>
    <v-avatar
      v-if="course.status === 'launched'"
      class="mt-2 ml-2"
      color="white"
      size="xs"
    >
      <v-icon color="success">
        mdi-check-bold
      </v-icon>
    </v-avatar>
    <v-card-title class="pt-4 d-flex flex-column">
      <div class="headline font-weight-bold mb-2">
        {{ course.title }}
      </div>
      <div class="grey--text font-weight-light mb-3 skills-wrapper">
        <ul>
          <li
            v-for="(skill, i) in course.skills"
            :key="i + Math.random()"
          >
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
import { CourseItem } from '@/services/api.types'
export default defineComponent({
  name: 'VideoCourseCard',
  props: {
    course: {
      type: Object as PropType<CourseItem>,
      required: true
    },
    playVideo: {
      required: true,
      type: Function
    },
    stopVideo: {
      required: true,
      type: Function
    }
  },
  computed: {
    imgPath () {
      return this.course.previewImageLink + '/cover.webp'
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
