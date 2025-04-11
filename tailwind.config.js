module.exports = {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.{vue,js}',
      './pages/**/*.{vue,js}',
      './app.vue',
      './nuxt.config.{js,ts}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    experimental: {
      disableColorPaletteModern: true, // 🛑 évite les couleurs OKLCH
    },
  }
  