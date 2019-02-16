const join = require("path").join
const tailwindJS = join(__dirname, "tailwind.js")

const plugins = [
  require("tailwindcss")(tailwindJS),
  require("autoprefixer"),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(require("@fullhuman/postcss-purgecss")({
    content: [
      "*.html",
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.ts",
    ],
    whitelist: ["html", "body", "nuxt-progress", "nuxt-link-active", "nuxt-link-exact-active"],
    whitelistPatterns: [
      /-enter-active$/,
      /-leave-active$/,
      /-enter$/,
      /-leave-to$/,
    ],
    styleExtensions: [".scss", ".css"],
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_:\/]+/g);
          }
        },
        extensions: ['html', 'vue', 'js', 'ts'],
      },
    ],
  }));
}

module.exports = {
  plugins,
}
