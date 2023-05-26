import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const createHttpClient = (): AxiosInstance => {
  const httpClient = axios.create()

  httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return httpClient
}
export default createHttpClient
