<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="7" lg="8">
        <v-card class="pa-4" :elevation="0">
          <VideoPlayer
            :selected-lesson="selectedLesson"
            :lesson-progress="lessonProgress"
            :is-play="isPlay"
          />
          <v-card-title>{{ selectedCourse.title }}</v-card-title>
          <v-card-subtitle>{{ selectedCourse.description }}</v-card-subtitle>
          <v-card-text>
            <v-list dense>
              <v-subheader>Lessons</v-subheader>
              <v-divider></v-divider>
              <v-list-item-group>
                <LessonItem
                  v-for="lesson in selectedCourse.lessons"
                  :key="lesson.id"
                  :lesson="lesson"
                  :selected-lesson="selectedLesson"
                  @onSelectLesson="onSelectLesson"
                />
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" lg="4">
        <v-card class="pa-4 d-flex flex-column align-center" :elevation="0">
          <v-card-title>Progress</v-card-title>
          <v-card-text class="d-flex flex-column align-center">
            <v-progress-circular
              v-if="selectedLesson"
              :size="80"
              :width="10"
              :value="lessonProgress"
              color="primary"
              fill="#ffffff"
              indeterminate-width="10"
              rounded
              background-color="grey lighten-2"
            >
              {{ lessonProgress }}%
            </v-progress-circular>
            <v-card-subtitle v-if="selectedLesson" class="secondary--text">{{ selectedLesson.title }} </v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedLesson: null,
      lessonProgress: 0,
      isPlay: true
    };
  },
  async fetch ({ params, store }) {
    try {
      await store.dispatch('courses/getCourseById', params.id)
    } catch (error) {
      window.$nuxt.error(error)
    }

  },
  computed: {
    selectedCourse() {
      return this.$store.state.courses.selectedCourse
    },
    availableLesson() {
      return this.selectedCourse.lessons.find(lesson => lesson.status === 'unlocked')
    },
  },
  watch: {
    selectedLesson () {
      this.getProgress()
    }
  },
  mounted() {
    this.selectedLesson = this.availableLesson
    this.getProgress()
  },
  methods: {
    onSelectLesson(lesson) {
      this.selectedLesson = lesson
    },
    getProgress() {
      const lastProgress = localStorage.getItem(this.selectedLesson.id)
      this.lessonProgress = lastProgress ? parseInt(lastProgress) : 0
    }
  }
};
</script>
