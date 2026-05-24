import api from './api'

export const taskService = {
  list() {
    return api.get('/tasks')
  },

  getById(id) {
    return api.get(`/tasks/${id}`)
  },

  create(taskData) {
    return api.post('/tasks', taskData)
  },

  update(id, taskData) {
    return api.put(`/tasks/${id}`, taskData)
  },

  remove(id) {
    return api.delete(`/tasks/${id}`)
  },

  uploadAttachment(taskId, file) {
    const formData = new FormData()
    formData.append('file', file)

    return api.post(`/tasks/${taskId}/attachment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
