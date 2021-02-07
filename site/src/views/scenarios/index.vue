<template>
  <h1>Scenarios</h1>
  <br />
  <h2>with Vee-validate</h2>
  <VeeValidate />
</template>

<script>
import { defineComponent } from 'vue'
import VeeValidate from './VeeValidate.vue'

export default defineComponent({
  components: {
    VeeValidate,
  },
})
</script>
