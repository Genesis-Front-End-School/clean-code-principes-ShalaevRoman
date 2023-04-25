export default (client) => {
  const getToken = async () => {
    try {
      const tokenFromLocalStorage = localStorage.getItem('token')
      if (tokenFromLocalStorage) {
        return tokenFromLocalStorage
      } else {
        const response = await client.get(process.env.API_AUTH)
        const { token } = response.data
        localStorage.setItem('token', token)
        return token
      }
    } catch (error) {
      throw error.response.data
    }
  }

  return {
    getToken
  }
}
