import { readFromStorage, saveToStorage } from '../../utils/storage'

const STORAGE_THEME = 'tarefas-web-theme'

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export default {
  namespaced: true,

  state: () => ({
    theme: 'light'
  }),

  getters: {
    isDarkTheme: state => state.theme === 'dark'
  },

  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
    }
  },

  actions: {
    loadTheme({ commit }) {
      const theme = readFromStorage(STORAGE_THEME, 'light')
      commit('SET_THEME', theme)
      applyTheme(theme)
    },

    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
      saveToStorage(STORAGE_THEME, theme)
      applyTheme(theme)
    }
  }
}
