<template>
  <section class="page" aria-labelledby="dashboard-title">
    <header class="page-header">
      <div>
        <h1 id="dashboard-title">Minhas tarefas</h1>
        <p>Organize suas atividades de estudo e trabalho.</p>
      </div>

      <RouterLink class="app-button app-button--primary" to="/tarefas/nova">
        Nova tarefa
      </RouterLink>
    </header>

    <section aria-labelledby="summary-title">
      <h2 id="summary-title">Resumo</h2>

      <div class="summary-grid">
        <article class="summary-card">
          <strong>{{ totalTasks }}</strong>
          <span>Total</span>
        </article>

        <article class="summary-card">
          <strong>{{ pendingTasks.length }}</strong>
          <span>Pendentes</span>
        </article>

        <article class="summary-card">
          <strong>{{ inProgressTasks.length }}</strong>
          <span>Em andamento</span>
        </article>

        <article class="summary-card">
          <strong>{{ doneTasks.length }}</strong>
          <span>Concluídas</span>
        </article>
      </div>
    </section>

    <section aria-labelledby="tasks-title" class="task-list-section">
      <div class="section-header">
        <h2 id="tasks-title">Lista de tarefas</h2>

        <label class="filter-field" for="task-filter">
          <span>Filtrar por status</span>
          <select id="task-filter" :value="filter" @change="setFilter($event.target.value)">
            <option value="todas">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluídas</option>
          </select>
        </label>
      </div>

      <p v-if="filteredTasks.length === 0" class="empty-state">
        Nenhuma tarefa encontrada para o filtro selecionado.
      </p>

      <div v-else class="task-grid">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @complete="completeTask"
          @remove="removeTask"
        />
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import TaskCard from '../components/tasks/TaskCard.vue'

export default {
  name: 'DashboardView',

  components: {
    TaskCard
  },

  computed: {
    ...mapState('tasks', ['filter']),
    ...mapGetters('tasks', [
      'totalTasks',
      'pendingTasks',
      'inProgressTasks',
      'doneTasks',
      'filteredTasks'
    ])
  },

  methods: {
    setFilter(filter) {
      this.$store.dispatch('tasks/setFilter', filter)
    },

    completeTask(taskId) {
      this.$store.dispatch('tasks/completeTask', taskId)
    },

    removeTask(taskId) {
      const canRemove = confirm('Deseja realmente excluir esta tarefa?')

      if (canRemove) {
        this.$store.dispatch('tasks/removeTask', taskId)
      }
    }
  }
}
</script>
