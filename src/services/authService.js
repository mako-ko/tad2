import api from './api'

export const authService = {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  register(userData) {
    return api.post('/auth/register', userData)
  },

  updateProfile(userData) {
    return api.put('/users/profile', userData)
  },

  changePassword(passwordData) {
    return api.put('/users/password', passwordData)
  }
}
