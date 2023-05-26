import createHttpClient from '../httpClient'
import { AuthApi } from '~/shared/services/auth/types'
import { Token } from '~/shared/services/api.types'

const authApi = (): AuthApi => {
  const httpClient = createHttpClient()
  const getToken = async () => {
    const tokenFromLocalStorage: Token = await localStorage.getItem('token')
    if (tokenFromLocalStorage) {
      return tokenFromLocalStorage
    }
    const response = await httpClient.get(process.env.API_AUTH || '')
    const { token } = response.data
    localStorage.setItem('token', token)
    return token
  }

  return {
    getToken
  }
}

export default authApi
