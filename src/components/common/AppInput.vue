<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="form-error" aria-live="polite">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    error: { type: String, default: '' }
  },

  emits: ['update:modelValue']
}
</script>
