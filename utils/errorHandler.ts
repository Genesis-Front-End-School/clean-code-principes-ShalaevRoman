import axios, { AxiosError } from 'axios'
type errorType = Error | AxiosError
export default function errorHandler (err: unknown): void {
  const error = err as errorType
  if (axios.isAxiosError(error)) {
    throw error
  } else {
    throw new Error('An error occurred')
  }
}
