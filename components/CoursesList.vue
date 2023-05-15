<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="course in displayedCourses"
          :key="course.id"
          cols="12"
          md="6"
          lg="4"
        >
          <VideoCourseCard
            :course="course"
            :play-video="playVideo"
            :stop-video="stopVideo"
          />
        </v-col>
      </v-row>
      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="paginationLength"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import Hls, { Events } from 'hls.js'
import { defineComponent } from '@nuxtjs/composition-api'

interface Data {
  currentPage: number
  itemsPerPage: number
}

export default defineComponent({
  name: 'CoursesList',
  data (): Data {
    return {
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    allCourses () {
      return this.$accessor.coursesData.allCourses
    },
    displayedCourses () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.allCourses.slice(start, end)
    },
    paginationLength () {
      return Math.ceil(this.allCourses.length / this.itemsPerPage)
    }
  },
  methods: {
    playVideo (refName: HTMLVideoElement, link: string) {
      const video = refName

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
    stopVideo (refName: HTMLVideoElement) {
      const video = refName
      video.pause()
      video.currentTime = 0
    }
  }
})
</script>
