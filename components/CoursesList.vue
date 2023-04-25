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
            :course-id="course.id"
            :link="course.meta.courseVideoPreview.link"
            :status="course.status"
            :title="course.title"
            :skills="course.meta.skills"
            :rating="course.rating"
            :lessons-count="course.lessonsCount"
            :preview-image-link="course.previewImageLink"
            :ref-name="course.id"
            :play-video="playVideo"
            :stop-video="stopVideo"
          />
        </v-col>
      </v-row>
      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="paginationLength"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'CoursesList',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    allCourses() {
      return this.$store.state.courses.allCourses
    },
    displayedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allCourses.slice(start, end);
    },
    paginationLength() {
      return Math.ceil(this.allCourses.length / this.itemsPerPage)
    }
  },
  methods: {
    playVideo(refName, link) {
      const video = refName

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
    stopVideo(refName) {
      const video = refName
      video.pause()
      video.currentTime = 0
    }
  }
};
</script>

<style lang="scss">

</style>
