<template>
    
        <RouterLink to="/"><img loading="lazy" alt="tad, sistema gerenciador de tarefas" class="tad-side-logo"
            src="/src/assets/images/tad-logo.svg" width="100" height="50" /></RouterLink>

    <section class="auth-page" aria-labelledby="about-title">
        <article class="auth-card">
            <header>
                <h1 class="h1-title" id="about-title">Bem-vindo(a) ao TAD!</h1>
            </header>

            <p>O tad é um sistema gerenciador de tarefas desenvolvido para facilitar a organização e o
                acompanhamento de atividades diárias.</p>

            <p>A aplicação web desenvolvida será feita focando-se no método de produtividade Eat The Frog, onde o
                usuário, a cada dia, deve elencar qual das tarefas dispostas para aquele dia é a mais importante
                para ele completar, e assim, o usuário deve focar em completar essa tarefa primeiro.</p>

            <p>Outro objetivo da aplicação é ter uma opção de tarefas recorrentes e, as tarefas que não forem, serão
                herdadas para a lista de tarefas do dia seguinte.</p>

            <p class="auth-link">
                Já tem conta?
                <RouterLink to="/login">Acesse ela aqui</RouterLink>
            </p>

            <p class="auth-link">
                Primeira vez aqui?
                <RouterLink to="/cadastro">Crie uma conta</RouterLink>
            </p>

        </article>
    </section>
</template>

<script>

export default {
    name: 'AboutView'
}
</script>
