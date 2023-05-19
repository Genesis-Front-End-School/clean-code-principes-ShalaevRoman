<template>
  <v-app dark>
    <h1>
      {{ title }}
    </h1>
    <p class="red--text">
      {{ message }}
    </p>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'

export default defineComponent({
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      required: true,
      type: Object as PropType<AxiosError>
    }
  },
  computed: {
    title (): string {
      const status = this.error.response?.status || 0
      return this.getErrorTitle(status)
    },
    message (): string {
      return this.error.message || 'An error occurred'
    }
  },
  methods: {
    getErrorTitle (code: number): string {
      switch (code) {
        case 404:
          return '404 Not Found sorry)'
        case 400:
          return 'Problem with authorization'
        case 401:
          return 'Not authorized'
        default:
          return 'An error occurred'
      }
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
