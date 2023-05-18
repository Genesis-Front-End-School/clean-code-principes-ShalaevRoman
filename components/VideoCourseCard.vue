<template>
  <v-card class="mb-5" :to="`/courses/${courseId}`">
    <div class="video-wrapper">
      <video
        :ref="refName"
        :poster="imgPath"
        muted
        controls
        class="cursor-pointer video-player pa-5"
        @mouseenter="playVideo($refs[refName], link)"
        @mouseout="stopVideo($refs[refName])"
      >
      </video>
    </div>
    <v-avatar
      v-if="status === 'launched'"
      class="mt-2 ml-2"
      color="white"
      size="xs"
    >
      <v-icon color="success">mdi-check-bold</v-icon>
    </v-avatar>
    <v-card-title class="pt-4 d-flex flex-column">
      <div class="headline font-weight-bold mb-2">
        {{ title }}
      </div>
      <div class="grey--text font-weight-light mb-3 skills-wrapper">
        <ul>
          <li
            v-for="(skill, i) in skills"
            :key="i + Math.random()"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
      <div class="rating-wrapper">
        <v-rating
          :value="rating"
          background-color="grey lighten-3"
          color="primary"
          :readonly="true"
          :size="24"
        ></v-rating>
        <div class="subtitle-2 font-weight-bold">
          {{ lessonsCount }} lessons
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'VideoCourseCard',
  props: {
    playVideo: {
      required: true,
      type: Function
    },
    stopVideo: {
      required: true,
      type: Function
    },
    refName: {
      required: true,
      type: String
    },
    previewImageLink: {
      required: true,
      type: String
    },
    link: {
      required: true,
      type: String
    },
    status: {
      required: true,
      type: String
    },
    title: {
      require: true,
      type: String,
      default() {
        return 'Title'
      }
    },
    skills: {
      require: true,
      type: Array,
      default() {
        return ['some skills']
      }
    },
    rating: {
      require: true,
      type: Number,
      default() {
        return 0
      }
    },
    lessonsCount: {
      require: true,
      type: Number,
      default() {
        return 0
      }
    },
    courseId: {
      require: true,
      type: String,
      default () {
        return '1'
      }
    }
  },
  data () {
    return {
      nameElement: 'videoPlayer'
    }
  },
  computed: {
    imgPath () {
      return this.previewImageLink + '/cover.webp'
    },
  }
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
