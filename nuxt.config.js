import colors from 'vuetify/es5/util/colors'
export default {
  mode: 'static',
  router: {
    base: '/genesis_learning_app/'
  },
  ssr: false,
  head: {
    titleTemplate: '%s - genesis_learning_app',
    title: 'genesis_learning_app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  loading: { color: '#00E676' },
  css: [
    '@/node_modules/vuetify/dist/vuetify.css'
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    'nuxt-typed-vuex',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  axios: {
    baseURL: process.env.API_URL,
    proxy: true,
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL,
      changeOrigin: true
    }
  },
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#ffa450',
          accent: '#a1e754',
          secondary: '#d7d7d7',
          success: '#6dff74',
          info: '#7365ff',
          warning: '#2e8ac0',
          error: '#ff5e3c'
        }
      }
    }
  },
  build: {}
}
