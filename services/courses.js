export default (client, token, path) => ({
  async getAll () {
    try {
      const response = await client.get(path, {
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

  async getById (courseId) {
    try {
      return await client.$get(path + courseId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      throw error.response.data
    }
  }
})
