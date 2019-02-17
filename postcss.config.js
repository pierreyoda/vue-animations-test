const join = require("path").join;
const tailwindJS = join(__dirname, "tailwind.js");

const production = process.env.NODE_ENV === "production";

const plugins = [
  require("tailwindcss")(tailwindJS),
];

if (production) {
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
        extractor: class TailwindExtractor  {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
          }
        },
        extensions: ['html', 'vue', 'js', 'ts'],
      },
    ],
  }));
}

plugins.push(
  require("autoprefixer"),
);

if (production) {
  plugins.push(
    require("cssnano")({
      preset: "default",
    }),
  );
}

module.exports = {
  plugins,
};
