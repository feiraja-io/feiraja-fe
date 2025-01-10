// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    '@nuxt/test-utils/module',
    "@nuxt/fonts",
    "@nuxt/icon",
  ],
  css: ["@/assets/main.css"],
  tailwindcss: {
    config: {
      content: ["./node_modules/laravel-vue-pagination/**/*.vue"],
      daisyui: {
        themes: ["light"], 
        base: true,
        styled: true, 
        utils: true,
      }
    },
  },
  // plugins: [
  //   '@/plugins/axios',
  // ],
  devtools: { enabled: true },
})