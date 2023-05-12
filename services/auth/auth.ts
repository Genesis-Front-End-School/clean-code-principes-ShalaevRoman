import axios from 'axios'
import { AuthApi } from '~/services/auth/types'
import { Token } from '~/services/api.types'
import errorHandler from '~/utils/errorHandler'

const authApi = (): AuthApi => {
  const getToken = async () => {
    try {
      const tokenFromLocalStorage: Token = localStorage.getItem('token')
      if (tokenFromLocalStorage) {
        return tokenFromLocalStorage
      } else {
        const response = await axios.get(process.env.API_AUTH || '')
        const { token } = response.data
        localStorage.setItem('token', token)
        return token
      }
    } catch (err: unknown) {
      errorHandler(err)
    }
  }

  return {
    getToken
  }
}

export default authApi
