// tslint:disable-next-line: no-var-requires
const pkg = require("./package");

const config = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: [
    "~/assets/app.scss",
    "~/assets/transitions.scss",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vue-clickaway",
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    // https://championswimmer.in/vuex-module-decorators/pages/installation.html#es5-transpilation
    transpile: ["vuex-module-decorator"],
  },

  vue: {
    config: {
      devtools: true,
    },
  },
};

export default config;
