export default {

  ssr: false,

  head: {
    title: 'MySake',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet" , href: "https://use.fontawesome.com/releases/v5.6.1/css/all.css" }
    ],
  },

  css: [
    { src: '~/assets/scss/common.scss' },
  ],

  plugins: [
    '@/plugins/star-rating',
    '@/plugins/vuelidate.js',
    {
      src: '@/plugins/vue-final-modal',
      mode: 'client'
    }
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module',],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    '@nuxtjs/date-fns',
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    component: 'fa',
  },

  axios: {
    baseURL: '/server',
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/user/user', method: 'get', propertyName: false }
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  },

  styleResources: {
    scss: ['@/assets/scss/_variables.scss'],
  },

  serverMiddleware: ['~/server'],

  build: {
    loadingScreen: false,
  },
}
