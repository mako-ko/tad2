<template>
  <button class="app-button" :class="variantClass" :type="type">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' }
  },

  computed: {
    variantClass() {
      return `app-button--${this.variant}`
    }
  }
}
</script>
