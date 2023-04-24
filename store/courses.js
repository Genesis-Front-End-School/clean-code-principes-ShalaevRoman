import coursesApi from '@/services/courses'
import authApi from '@/services/auth'
export const state = () => ({
  isShowPreloader: false,
  allCourses: '',
  selectedCourse: null,
  token: ''
})

export const mutations = {
  SET_SELECTED_COURSE(state, payload) {
    state.selectedCourse = payload
  },
  SET_COURSES (state, payload) {
    state.allCourses = payload
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  CLEAR_TOKEN (state) {
    state.token = null
  }
}

export const actions = {
  async getCourses({ commit, state }) {
    const api = coursesApi(this.$axios, state.token)
    const courses = await api.getCourses()
    commit('SET_COURSES', courses)
  },
  async getCourseById({ commit, state }, courseId) {
    const api = coursesApi(this.$axios, state.token)
    const course = await api.getCourseById(courseId)
    commit('SET_SELECTED_COURSE', course)
  },
  async getToken({ commit }) {
    const token = await authApi(this.$axios).getToken()
    commit('SET_TOKEN', token)
  }
}

export const getters = {
  title: state => state.title,
  allCourses: state => state.allCourses,
  isShowPreloader: state => state.isShowPreloader,
  selectedCourse: state => state.selectedCourse
}
