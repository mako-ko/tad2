<template>
  <article class="task-card">
    <header class="task-card__header">
      <div>
        <h3>{{ task.title }}</h3>
        <p class="task-card__priority">Prioridade: {{ priorityLabel }}</p>
      </div>
      <TaskStatusBadge :status="task.status" />
    </header>

    <p>{{ task.description }}</p>

    <footer class="task-card__footer">
      <span>Prazo: {{ formattedDueDate }}</span>
      <div class="task-card__actions">
        <RouterLink class="app-button app-button--secondary" :to="`/tarefas/${task.id}/editar`">Editar</RouterLink>
        <button type="button" class="app-button app-button--success" @click="$emit('complete', task.id)">Concluir</button>
        <button type="button" class="app-button app-button--danger" @click="$emit('remove', task.id)">Excluir</button>
      </div>
    </footer>
  </article>
</template>

<script>
import TaskStatusBadge from './TaskStatusBadge.vue'

export default {
  name: 'TaskCard',

  components: {
    TaskStatusBadge
  },

  props: {
    task: { type: Object, required: true }
  },

  emits: ['complete', 'remove'],

  computed: {
    priorityLabel() {
      const labels = {
        regular: 'Regular',
        sapo: 'Sapo'
      }

      return labels[this.task.priority] || this.task.priority
    },

    formattedDueDate() {
      if (!this.task.dueDate) {
        return 'Sem prazo'
      }

      return new Date(`${this.task.dueDate}T00:00:00`).toLocaleDateString('pt-BR')
    }
  }
}
</script>
