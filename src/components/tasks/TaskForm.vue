<template>
  <form class="task-form" @submit.prevent="submitForm">
    <AppInput id="title" v-model="form.title" label="Título" required :error="errors.title" />

    <div class="form-field">
      <label for="description">Descrição</label>
      <textarea id="description" v-model="form.description" rows="5" required></textarea>
      <p v-if="errors.description" class="form-error" aria-live="polite">{{ errors.description }}</p>
    </div>

    <div class="form-grid">
      <AppSelect id="status" v-model="form.status" label="Status" :options="statusOptions" />
      <AppSelect id="priority" v-model="form.priority" label="Prioridade" :options="priorityOptions" />
      <AppInput id="due-date" v-model="form.dueDate" type="date" label="Data limite" />
    </div>

    <div class="form-field">
      <label for="attachment">Anexo (opcional)</label>
      <input id="attachment" type="file" @change="handleFile" />
      <small v-if="form.attachmentName">Arquivo selecionado: {{ form.attachmentName }}</small>
    </div>

    <div class="form-actions">
      <AppButton type="submit">{{ submitLabel }}</AppButton>
      <RouterLink class="app-button app-button--secondary" to="/dashboard">Cancelar</RouterLink>
    </div>
  </form>
</template>

<script>
import AppButton from '../common/AppButton.vue'
import AppInput from '../common/AppInput.vue'
import AppSelect from '../common/AppSelect.vue'

export default {
  name: 'TaskForm',

  components: {
    AppButton,
    AppInput,
    AppSelect
  },

  props: {
    initialTask: {
      type: Object,
      default: () => ({})
    },
    submitLabel: {
      type: String,
      default: 'Salvar tarefa'
    }
  },

  emits: ['submit'],

  data() {
    return {
      form: {
        title: this.initialTask.title || '',
        description: this.initialTask.description || '',
        status: this.initialTask.status || 'pendente',
        priority: this.initialTask.priority || 'regular',
        dueDate: this.initialTask.dueDate || '',
        attachmentName: this.initialTask.attachmentName || ''
      },
      errors: {},
      statusOptions: [
        { value: 'pendente', label: 'Pendente' },
        { value: 'em_andamento', label: 'Em andamento' },
        { value: 'concluida', label: 'Concluída' }
      ],
      priorityOptions: [
        { value: 'regular', label: 'Regular' },
        { value: 'sapo', label: 'Sapo' }
      ]
    }
  },

  methods: {
    handleFile(event) {
      const file = event.target.files[0]
      this.form.attachmentName = file ? file.name : ''
    },

    validate() {
      this.errors = {}

      if (!this.form.title.trim()) {
        this.errors.title = 'Informe o título da tarefa.'
      }

      if (!this.form.description.trim()) {
        this.errors.description = 'Informe a descrição da tarefa.'
      }

      return Object.keys(this.errors).length === 0
    },

    submitForm() {
      if (!this.validate()) {
        return
      }

      this.$emit('submit', {
        ...this.initialTask,
        ...this.form
      })
    }
  }
}
</script>
