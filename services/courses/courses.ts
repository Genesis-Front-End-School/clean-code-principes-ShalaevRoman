import createHttpClient from '../httpClient'
import { CoursesApi } from '~/services/courses/types'
const coursesApi = (): CoursesApi => {
  const httpClient = createHttpClient()
  const getAll = async () => {
    const courses = await httpClient.get(process.env.API_COURSES || '')
    return courses.data.courses
  }

  const getById = async (id: string) => {
    const course = await httpClient.get(process.env.API_COURSES + id)
    return course.data
  }

  return {
    getAll,
    getById
  }
}

export default coursesApi
