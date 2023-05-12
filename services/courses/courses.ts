import axios from 'axios'
import { CoursesApi } from '~/services/courses/types'
import { Token } from '~/services/api.types'
import errorHandler from '~/utils/errorHandler'
const coursesApi = (token: Token): CoursesApi => {
  const getAll = async () => {
    try {
      const courses = await axios.get(process.env.API_COURSES || '', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return courses.data.courses
    } catch (err: unknown) {
      errorHandler(err)
    }
  }

  const getById = async (id: string) => {
    try {
      const course = await axios.get(process.env.API_COURSES + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return course.data
    } catch (err: unknown) {
      errorHandler(err)
    }
  }

  return {
    getAll,
    getById
  }
}

export default coursesApi
