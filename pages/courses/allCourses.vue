<template>
  <CoursesList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'CoursesPage',
  async fetch () {
    await this.$accessor.coursesData.getToken()
    await this.$accessor.coursesData.getCourses()
  }
})

</script>
