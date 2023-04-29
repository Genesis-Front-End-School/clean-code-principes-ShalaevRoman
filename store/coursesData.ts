import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  token: '',
  password: ''
})

export const getters = getterTree(state, {
  token: state => state.token,
  password: state => state.password
})

export const mutations = mutationTree(state, {
  SET_TOKEN: (state, value: string): void => {
    state.token = value
  },
  SET_PASSWORD: (state, value: string): void => {
    state.password = value
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    SET_EMAIL ({ commit }, value: string): void {
      commit('SET_TOKEN', value)
    },
    SET_PASSWORD ({ commit }, value: string): void {
      commit('SET_PASSWORD', value)
    }
  }
)
