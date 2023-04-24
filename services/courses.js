export default ($axios, token) => ({
  async getCourses() {
    try {
      const response = await $axios.get(process.env.API_COURSES, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { courses } = response.data
      return courses
    } catch (error) {
      throw error.response.data
    }
  },

  async getCourseById(courseId) {
    try {
      return await $axios.$get(process.env.API_COURSES + courseId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      throw error.response.data
    }
  },
})
