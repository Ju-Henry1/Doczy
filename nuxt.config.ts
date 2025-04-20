export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  // 👉 On ignore l'erreur TS ici, c’est normal
  // @ts-ignore
  tailwindcss: {
    configPath: 'tailwind.config.js',
  },
  
  compatibilityDate: '2025-04-12',
})