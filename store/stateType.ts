import { Token, CourseItem } from '~/shared/services/api.types'
export interface State {
  token: Token
  selectedCourse: CourseItem | null,
  allCourses: CourseItem[]
}
