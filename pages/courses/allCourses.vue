<template>
  <CoursesList />
</template>

<script>
export default {
  name: 'CoursesPage',
  async fetch ({ store }) {
    try {
      if (!store.state.courses.token) {
        await store.dispatch('courses/getToken')
      }
      await store.dispatch('courses/getCourses')
    } catch(error) {
      window.$nuxt.error(error)
    }

  }
}
</script>
