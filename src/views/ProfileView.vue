<template>
  <section class="page page--narrow" aria-labelledby="profile-title">
    <header class="page-header">
      <div>
        <h1 id="profile-title">Configurações do perfil</h1>
        <p>Altere seus dados, senha e tema visual.</p>
      </div>
    </header>

    <AppAlert :message="successMessage" type="success" />

    <form class="profile-form" @submit.prevent="saveProfile">
      <fieldset>
        <legend>Dados pessoais</legend>
        <AppInput id="name" v-model="profile.name" label="Nome" required />
        <AppInput id="email" v-model="profile.email" type="email" label="E-mail" required />
      </fieldset>

      <fieldset>
        <legend>Alteração de senha</legend>
        <AppInput id="current-password" v-model="password.current" type="password" label="Senha atual" />
        <AppInput id="new-password" v-model="password.new" type="password" label="Nova senha" />
      </fieldset>

      <fieldset>
        <legend>Tema</legend>
        <AppSelect id="theme" v-model="theme" label="Tema visual" :options="themeOptions" />
      </fieldset>

      <div class="form-actions">
        <AppButton type="submit">Salvar configurações</AppButton>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AppAlert from '../components/common/AppAlert.vue'
import AppButton from '../components/common/AppButton.vue'
import AppInput from '../components/common/AppInput.vue'
import AppSelect from '../components/common/AppSelect.vue'

export default {
  name: 'ProfileView',

  components: {
    AppAlert,
    AppButton,
    AppInput,
    AppSelect
  },

  data() {
    return {
      profile: {
        name: '',
        email: ''
      },
      password: {
        current: '',
        new: ''
      },
      successMessage: '',
      themeOptions: [
        { value: 'light', label: 'Claro' },
        { value: 'dark', label: 'Escuro' }
      ]
    }
  },

  computed: {
    ...mapState('auth', ['user']),
    theme: {
      get() {
        return this.$store.state.preferences.theme
      },
      set(value) {
        this.$store.dispatch('preferences/setTheme', value)
      }
    }
  },

  created() {
    this.profile = {
      name: this.user?.name || '',
      email: this.user?.email || ''
    }
  },

  methods: {
    saveProfile() {
      this.$store.dispatch('auth/updateProfile', this.profile)

      if (this.password.new) {
        this.$store.dispatch('auth/changePassword', this.password)
      }

      this.password = {
        current: '',
        new: ''
      }
      this.successMessage = 'Configurações salvas com sucesso.'
    }
  }
}
</script>
