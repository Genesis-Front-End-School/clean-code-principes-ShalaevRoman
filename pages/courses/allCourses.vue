<template>
  <CoursesList />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'CoursesPage',
  async fetch ({ app }) {
    await app.$accessor.coursesData.getToken()
    await app.$accessor.coursesData.getCourses()
  }
})

</script>
