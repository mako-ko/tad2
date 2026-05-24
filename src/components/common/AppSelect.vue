<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',

  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    options: { type: Array, required: true }
  },

  emits: ['update:modelValue']
}
</script>
