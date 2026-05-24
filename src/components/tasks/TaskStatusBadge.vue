<template>
  <span class="status-badge" :class="`status-badge--${status}`">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: 'TaskStatusBadge',

  props: {
    status: { type: String, required: true }
  },

  computed: {
    label() {
      const labels = {
        pendente: 'Pendente',
        em_andamento: 'Em andamento',
        concluida: 'Concluída'
      }

      return labels[this.status] || this.status
    }
  }
}
</script>
