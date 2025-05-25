// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5042'
    }
  },
  imports: {
    dirs: ['utils']
  },
  modules: ['@pinia/nuxt'],
  devtools: { enabled: true }
})