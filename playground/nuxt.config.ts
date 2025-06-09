export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  contentIsland: {
    markdownContentComponentClass: 'markdown-content',
    mdc: {
      highlight: {
        theme: 'material-theme-darker',
      },
    },
  },
})
