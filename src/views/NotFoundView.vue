<template>
  <section class="page page--narrow text-center" aria-labelledby="not-found-title">
    <h1 id="not-found-title">Página não encontrada</h1>
    <p>A rota acessada não existe nesta aplicação.</p>
    <RouterLink class="app-button app-button--primary" to="/dashboard">Voltar ao dashboard</RouterLink>
  </section>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>
