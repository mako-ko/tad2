<template>
    <header class="app-header">
    <RouterLink class="app-logo" to="/dashboard" aria-label="Ir para o dashboard">
      <img loading="lazy" alt="tad, sistema gerenciador de tarefas" class="tad-logo" :src="logoUrl" width="100" height="50" />
    </RouterLink>

    <nav class="app-nav" aria-label="Menu principal">
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/tarefas/nova">Nova tarefa</RouterLink>
      <RouterLink to="/perfil">Perfil</RouterLink>
      <button type="button" class="link-button" @click="logout">Sair</button>
    </nav>
  </header>
</template>

<script>
import logoUrl from '/src/assets/images/tad-logo.svg'

export default {
  name: 'AppHeader',
  data() {
    return {
      logoUrl
    }
  },
  
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
