import { CourseItem } from '~/services/api.types'

export interface CoursesApi {
  getAll: () => Promise<CourseItem[]>
  getById: (id: string) => Promise<CourseItem>
}
