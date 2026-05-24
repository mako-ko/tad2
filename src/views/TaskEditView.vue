<template>
  <section class="page page--narrow" aria-labelledby="task-edit-title">
    <header class="page-header">
      <div>
        <h1 id="task-edit-title">Editar tarefa</h1>
        <p>Atualize as informações da tarefa selecionada.</p>
      </div>
    </header>

    <p v-if="!task" class="empty-state">Tarefa não encontrada.</p>

    <TaskForm v-else :initial-task="task" submit-label="Salvar alterações" @submit="updateTask" />
  </section>
</template>

<script>
import TaskForm from '../components/tasks/TaskForm.vue'

export default {
  name: 'TaskEditView',

  components: {
    TaskForm
  },

  computed: {
    task() {
      return this.$store.getters['tasks/getTaskById'](this.$route.params.id)
    }
  },

  methods: {
    updateTask(task) {
      this.$store.dispatch('tasks/updateTask', task)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
