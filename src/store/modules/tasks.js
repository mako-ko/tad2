import { readFromStorage, saveToStorage } from '../../utils/storage'

const STORAGE_TASKS = 'tarefas-web-tasks'

const sampleTasks = [
  {
    id: 1,
    title: 'Estudar HTML semântico',
    description: 'Revisar header, main, section, article, nav e footer.',
    status: 'pendente',
    priority: 'sapo',
    dueDate: '2026-06-10',
    attachmentName: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Praticar CSS Grid',
    description: 'Criar cards responsivos para o dashboard.',
    status: 'em_andamento',
    priority: 'regular',
    dueDate: '2026-06-15',
    attachmentName: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Criar primeiro componente Vue',
    description: 'Transformar um botão comum em componente reutilizável.',
    status: 'concluida',
    priority: 'sapo',
    dueDate: '2026-06-20',
    attachmentName: '',
    createdAt: new Date().toISOString()
  }
]

function persist(tasks) {
  saveToStorage(STORAGE_TASKS, tasks)
}

export default {
  namespaced: true,

  state: () => ({
    items: [],
    filter: 'todas',
    loading: false,
    error: null
  }),

  getters: {
    totalTasks: state => state.items.length,
    pendingTasks: state => state.items.filter(task => task.status === 'pendente'),
    inProgressTasks: state => state.items.filter(task => task.status === 'em_andamento'),
    doneTasks: state => state.items.filter(task => task.status === 'concluida'),
    filteredTasks: state => {
      if (state.filter === 'todas') {
        return state.items
      }

      return state.items.filter(task => task.status === state.filter)
    },
    getTaskById: state => id => state.items.find(task => String(task.id) === String(id))
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.items = tasks
    },

    SET_FILTER(state, filter) {
      state.filter = filter
    },

    ADD_TASK(state, task) {
      state.items.push(task)
    },

    UPDATE_TASK(state, updatedTask) {
      state.items = state.items.map(task => task.id === updatedTask.id ? updatedTask : task)
    },

    REMOVE_TASK(state, taskId) {
      state.items = state.items.filter(task => task.id !== taskId)
    }
  },

  actions: {
    loadTasks({ commit }) {
      const tasks = readFromStorage(STORAGE_TASKS, sampleTasks)
      commit('SET_TASKS', tasks)
      persist(tasks)
    },

    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    },

    createTask({ commit, state }, taskData) {
      const task = {
        ...taskData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }

      commit('ADD_TASK', task)
      persist(state.items)
    },

    updateTask({ commit, state }, taskData) {
      commit('UPDATE_TASK', taskData)
      persist(state.items)
    },

    removeTask({ commit, state }, taskId) {
      commit('REMOVE_TASK', taskId)
      persist(state.items)
    },

    completeTask({ dispatch, getters }, taskId) {
      const task = getters.getTaskById(taskId)

      if (task) {
        dispatch('updateTask', {
          ...task,
          status: 'concluida'
        })
      }
    }
  }
}
