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
              <v-divider />
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
            <v-card-subtitle v-if="selectedLesson" class="secondary--text">
              {{ selectedLesson.title }}
            </v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Lesson } from '@/services/api.types'

interface Data {
  selectedLesson: Lesson | null
  lessonProgress: number
  isPlay: boolean
}
export default defineComponent({
  data (): Data {
    return {
      selectedLesson: null,
      lessonProgress: 0,
      isPlay: true
    }
  },
  async fetch ({ params, app }) {
    await app.$accessor.coursesData.getCourseById(params.id)
  },
  computed: {
    selectedCourse () {
      return this.$accessor.coursesData.selectedCourse
    },
    availableLesson () {
      return this.selectedCourse?.lessons.find(lesson => lesson.status === 'unlocked') || null
    }
  },
  watch: {
    selectedLesson () {
      this.getProgress()
    }
  },
  mounted () {
    this.selectedLesson = this.availableLesson
    this.getProgress()
  },
  methods: {
    onSelectLesson (lesson: Lesson) {
      this.selectedLesson = lesson
    },
    getProgress () {
      const lastProgress = this.selectedLesson ? localStorage.getItem(this.selectedLesson.id) : 0
      this.lessonProgress = lastProgress ? parseInt(lastProgress) : 0
    }
  }
})
</script>
