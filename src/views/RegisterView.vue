<template>

    <RouterLink to="/"><img loading="lazy" alt="tad, sistema gerenciador de tarefas" class="tad-side-logo"
            src="/src/assets/images/tad-logo.svg" width="100" height="50" /></RouterLink>

  <section class="auth-page" aria-labelledby="register-title">
    <article class="auth-card">
      <header>
        <h1 class="h1-title" id="register-title">Cadastro</h1>
        <p>Crie uma conta para organizar suas tarefas.</p>
      </header>

      <AppAlert :message="errorMessage" type="error" />

      <form novalidate @submit.prevent="handleRegister">
        <AppInput id="name" v-model="form.name" label="Nome" required :error="errors.name" />
        <AppInput id="email" v-model="form.email" type="email" label="Seu e-mail de preferência" required
          :error="errors.email" />
        <AppInput id="password" v-model="form.password" type="password" label="Senha" required
          :error="errors.password" />
        <AppInput id="password-confirmation" v-model="form.passwordConfirmation" type="password"
          label="Confirme sua senha" required :error="errors.passwordConfirmation" />

        <AppButton type="submit">Cadastrar</AppButton>
      </form>

      <p class="auth-link">
        Já tem conta?
        <RouterLink to="/login">Acesse ela aqui</RouterLink>
      </p>
    </article>
  </section>
</template>

<script>
import AppAlert from '../components/common/AppAlert.vue'
import AppButton from '../components/common/AppButton.vue'
import AppInput from '../components/common/AppInput.vue'
import { hasMinLength, isEmail, isRequired, isValidFullName } from '../utils/validators'

export default {
  name: 'RegisterView',

  components: {
    AppAlert,
    AppButton,
    AppInput
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {},
      errorMessage: ''
    }
  },

  methods: {
    validate() {
      this.errors = {}
      this.errorMessage = ''

      if (!isRequired(this.form.name)) {
        this.errors.name = 'Informe seu nome.'
      } else if (!hasMinLength(this.form.name, 5)) {
        this.errors.name = 'O nome deve ter pelo menos 5 caracteres.'
      } else if (!isValidFullName(this.form.name)) {
        this.errors.name = 'Informe seu nome completo.'
      }

      if (!isRequired(this.form.email)) {
        this.errors.email = 'Informe seu e-mail.'
      } else if (!isEmail(this.form.email)) {
        this.errors.email = 'Informe um e-mail válido.'
      }

      if (!hasMinLength(this.form.password, 8)) {
        this.errors.password = 'A senha deve ter pelo menos 8 caracteres.'
      }

      if (this.form.password !== this.form.passwordConfirmation) {
        this.errors.passwordConfirmation = 'As senhas não conferem.'
      }

      return Object.keys(this.errors).length === 0
    },

    handleRegister() {
      if (!this.validate()) {
        this.errorMessage = 'Verifique os campos do formulário.'
        return
      }

      this.$store.dispatch('auth/register', this.form)
      this.$store.dispatch('auth/updateProfile', {
        name: this.form.name,
        email: this.form.email
      })
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
