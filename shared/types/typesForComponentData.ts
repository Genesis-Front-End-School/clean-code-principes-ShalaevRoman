import { Lesson } from '~/shared/services/api.types'

type Pages = 'Main' | 'Courses'
interface MenuItems {
  icon?: string
  title: Pages
  to: string
}
export interface DefaultLayoutData {
  drawer: boolean
  items: MenuItems[]
  title: string
}

export interface CoursesListData {
  currentPage: number
  itemsPerPage: number
}

export interface CourseByIdData {
  selectedLesson: Lesson | null
  lessonProgress: number
  isPlay: boolean
}
