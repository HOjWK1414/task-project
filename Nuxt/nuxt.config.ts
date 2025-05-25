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
  compatibilityDate: '2025-05-25',
  modules: ['@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  devtools: { enabled: true }
})