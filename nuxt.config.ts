// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  target: "server",
  runtimeConfig: {
    public:{
      GcAuthUrl:   process.env.GC_AUTH_URL,
      GcServerUrl: process.env.GC_SERVER_URL,
      GcSocketUrl: process.env.GC_SOCKET_URL,
      GcImageUrl:  process.env.GC_IMAGE_URL,
      GcGameUrl:   process.env.GC_GAME_URL,
      GcWebUrl:    process.env.GC_WEB_URL,
    }
  },
  modules: [
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  },
  components: [{
    path: '~/components/',
    pathPrefix: false,
  }],
  css: [
    "vuetify/lib/styles/main.sass",
    "mdi/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
})
