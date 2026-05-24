<template>
  
    <RouterLink to="/"><img loading="lazy" alt="tad, sistema gerenciador de tarefas" class="tad-side-logo"
            src="/src/assets/images/tad-logo.svg" width="100" height="50" /></RouterLink>

  <section class="auth-page" aria-labelledby="login-title">
    <article class="auth-card">
      <header>
        <h1 class="h1-title" id="login-title">Entrar</h1>
        <p>Acesse sua área de tarefas.</p>
      </header>

      <AppAlert :message="errorMessage" type="error" />

      <form @submit.prevent="handleLogin">
        <AppInput id="email" v-model="email" type="email" label="E-mail" required :error="errors.email" />
        <AppInput id="password" v-model="password" type="password" label="Senha" required :error="errors.password" />

        <AppButton type="submit">Entrar</AppButton>
      </form>

      <p class="auth-link">
        Primeira vez aqui?
        <RouterLink to="/cadastro">Crie uma conta</RouterLink>
      </p>
    </article>
  </section>
</template>

<script>
import AppAlert from '../components/common/AppAlert.vue'
import AppButton from '../components/common/AppButton.vue'
import AppInput from '../components/common/AppInput.vue'
import { isEmail, isRequired } from '../utils/validators'

export default {
  name: 'LoginView',

  components: {
    AppAlert,
    AppButton,
    AppInput
  },

  data() {
    return {
      email: 'aluno@exemplo.com',
      password: '123456',
      errors: {},
      errorMessage: ''
    }
  },

  methods: {
    validate() {
      this.errors = {}
      this.errorMessage = ''

      if (!isRequired(this.email)) {
        this.errors.email = 'Informe seu e-mail.'
      } else if (!isEmail(this.email)) {
        this.errors.email = 'Informe um e-mail válido.'
      }

      if (!isRequired(this.password)) {
        this.errors.password = 'Informe sua senha.'
      }

      return Object.keys(this.errors).length === 0
    },

    handleLogin() {
      if (!this.validate()) {
        this.errorMessage = 'Verifique os campos do formulário.'
        return
      }

      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })

      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
