<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="changeDrawerState()" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ getYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Main',
          to: '/'
        },
        {
          title: 'Courses',
          to: '/courses/allCourses'
        }
      ],
      title: 'Genesis_learning_app'
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('courses/getToken')
    } catch (error) {
      window.$nuxt.error(error)
    }
  },
  computed: {
    getYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    changeDrawerState() {
      this.drawer = !this.drawer
    }
  },
}
</script>
