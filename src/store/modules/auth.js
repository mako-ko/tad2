import { readFromStorage, removeFromStorage, saveToStorage } from '../../utils/storage'

const STORAGE_USER = 'tarefas-web-user'
const STORAGE_TOKEN = 'tarefas-web-token'

export default {
  namespaced: true,

  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: state => Boolean(state.user && state.token),
    userName: state => state.user?.name || 'Usuário'
  },

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },

    SET_ERROR(state, error) {
      state.error = error
    },

    SET_SESSION(state, { user, token }) {
      state.user = user
      state.token = token
    },

    CLEAR_SESSION(state) {
      state.user = null
      state.token = null
    },

    UPDATE_USER(state, userData) {
      state.user = {
        ...state.user,
        ...userData
      }
    }
  },

  actions: {
    loadSession({ commit }) {
      const user = readFromStorage(STORAGE_USER)
      const token = localStorage.getItem(STORAGE_TOKEN)

      if (user && token) {
        commit('SET_SESSION', { user, token })
      }
    },

    login({ commit }, credentials) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const user = {
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email
      }

      const token = 'token-didatico-local'

      saveToStorage(STORAGE_USER, user)
      localStorage.setItem(STORAGE_TOKEN, token)
      commit('SET_SESSION', { user, token })
      commit('SET_LOADING', false)
    },

    register({ dispatch }, userData) {
      return dispatch('login', {
        email: userData.email,
        password: userData.password
      })
    },

    updateProfile({ commit, state }, userData) {
      commit('UPDATE_USER', userData)
      saveToStorage(STORAGE_USER, state.user)
    },

    changePassword() {
      return true
    },

    logout({ commit }) {
      removeFromStorage(STORAGE_USER)
      localStorage.removeItem(STORAGE_TOKEN)
      commit('CLEAR_SESSION')
    }
  }
}
