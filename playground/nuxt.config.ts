export default defineNuxtConfig({
  css: ["~/assets/styles/main.css"],
  modules: ["../src/module"],
  devtools: { enabled: true },
  contentIsland: {
    markdownContentComponentClass: "markdown-content",
    mdc: {
      highlight: {
        theme: "material-theme-darker",
      },
    },
  },
});
