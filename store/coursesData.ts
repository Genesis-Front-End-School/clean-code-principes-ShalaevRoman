import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import authApi from '~/services/auth/auth'
import coursesApi from '~/services/courses/courses'
import { State } from '~/store/stateType'
import { CourseItem } from '~/services/api.types'

export const state = (): State => ({
  token: null,
  allCourses: [],
  selectedCourse: null
})

export const getters = getterTree(state, {
  token: state => state.token,
  allCourses: state => state.allCourses,
  selectedCourse: state => state.selectedCourse
})

export const mutations = mutationTree(state, {
  SET_TOKEN: (state, value: string): void => {
    state.token = value
  },
  SET_ALL_COURSES: (state, value: CourseItem[]): void => {
    state.allCourses = value
  },
  SET_SELECTED_COURSE: (state, value: CourseItem): void => {
    state.selectedCourse = value
  }
})

export const actions = actionTree(
  { state, getters, mutations }, {
    async getToken ({ commit }): Promise<void> {
      const token = await authApi().getToken()
      commit('SET_TOKEN', token)
    },
    async getCourses ({ commit, state }): Promise<void> {
      const allCourses = await coursesApi(state.token).getAll()
      commit('SET_ALL_COURSES', allCourses)
    },
    async getCourseById ({ commit, state }, courseId): Promise<void> {
      const course = await coursesApi(state.token).getById(courseId)
      commit('SET_SELECTED_COURSE', course)
    }
  }
)
