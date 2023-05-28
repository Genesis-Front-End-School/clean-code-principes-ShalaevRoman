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
      <v-spacer />
      <v-switch
        v-model="darkTheme"
        class="mt-5"
        label="Change theme"
      />
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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { DefaultLayoutData } from '~/shared/types/typesForComponentData'
export default defineComponent({
  name: 'DefaultLayout',
  data (): DefaultLayoutData {
    return {
      drawer: false,
      darkTheme: true,
      items: [
        {
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
  computed: {
    getYear (): number {
      return new Date().getFullYear()
    }
  },
  watch: {
    darkTheme (newVal): void {
      this.$vuetify.theme.dark = newVal
    }
  },
  methods: {
    changeDrawerState (): void {
      this.drawer = !this.drawer
    }
  }
})
</script>
