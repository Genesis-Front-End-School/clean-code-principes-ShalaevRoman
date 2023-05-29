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
            class="secondary"
            :course="course"
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
import { defineComponent } from '@nuxtjs/composition-api'
import { CourseItem } from '~/shared/services/api.types'
import { CoursesListData } from '~/shared/types/typesForComponentData'

export default defineComponent({
  name: 'CoursesList',
  data (): CoursesListData {
    return {
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    allCourses (): CourseItem[] {
      return this.$accessor.coursesData.allCourses
    },
    displayedCourses (): CourseItem[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.allCourses.slice(start, end)
    },
    paginationLength (): number {
      return Math.ceil(this.allCourses.length / this.itemsPerPage)
    }
  }
})
</script>
