import { Token, CourseItem } from '~/services/api.types'
export interface State {
  token: Token
  selectedCourse: CourseItem | null,
  allCourses: CourseItem[]
}
