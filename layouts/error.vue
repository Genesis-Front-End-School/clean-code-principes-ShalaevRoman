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

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: this.getErrorTitle(this.error.statusCode),
      message: this.error.message || 'An error occurred'
    }
  },
  head () {
    const title = this.getErrorTitle(this.error.statusCode)
    return {
      title
    }
  },
  methods: {
    getErrorTitle (code) {
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
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
