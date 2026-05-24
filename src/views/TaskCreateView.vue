<template>
  <section class="page page--narrow" aria-labelledby="task-create-title">
    <header class="page-header">
      <div>
        <h1 id="task-create-title">Criar tarefa</h1>
        <p>Cadastre uma nova atividade.</p>
      </div>
    </header>

    <TaskForm submit-label="Criar tarefa" @submit="createTask" />
  </section>
</template>

<script>
import TaskForm from '../components/tasks/TaskForm.vue'

export default {
  name: 'TaskCreateView',

  components: {
    TaskForm
  },

  methods: {
    createTask(task) {
      this.$store.dispatch('tasks/createTask', task)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
