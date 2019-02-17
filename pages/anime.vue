<template>
  <div class="container mx-auto w-full">
    <div class="container mx-auto py-12 text-left flex flex-col md:flex-row items-center">
      <div class="w-full lg:w-1/2 flex flex-col justify-center items-start pt-12 pb-24 px-6">
        <p class="uppercase tracking-wide">Interactive animations!</p>
        <h2 class="my-4 text-grey-darkest text-3xl mb-6">Anime.js</h2>
        <p class="mb-12">
          Anime.js is a lightweight JavaScript animation library with a simple, yet powerful API.
          It works with CSS properties, SVG, DOM attributes and JavaScript Objects.
        </p>
        <p>
          The amazing following form snake animation was created by Mikael Ainalem
          and the whole process is described
          <a class="uppercase no-underline text-blue-dark hover:text-blue-darker"
            href="https://blog.prototypr.io/how-to-create-the-snake-highlight-animation-with-anime-js-bf9c6cb66434">
          here</a>!
        </p>
      </div>
      <form-snake-animation />
    </div>
    <div class="container mx-auto flex flex-col md:flex-row flex-wrap items-start justify-center">
      <div class="w-full md:w-1/2 demo-container">
        <p class="uppercase mb-24">
          Favorited = {{ favorite ? 'yes' : 'no' }} (Click to toggle)
        </p>
        <add-favorite-animation @change="value => favorite = value" />
      </div>
      <div class="w-full md:w-1/2 demo-container mt-12 md:mt-0">
        <p class="uppercase mb-6">
          Deer or rabbit?
        </p>
        <deer-rabbit-animation class="deer-rabbit" />
      </div>
      <div class="w-full md:w-1/2 demo-container mt-12 md:mt-0 py-20">
        <p class="uppercase mb-32">
          Submit button
        </p>
        <submit-animation />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO: add typings when they are updated to v3
let anime: any;
if (process.browser) {
  // tslint:disable-next-line: no-var-requires
  anime = require("animejs").default;
}
import { Component, Vue } from "vue-property-decorator";

import { getPageTransitionKey } from "@/utils";
import AddFavoriteAnimation from "@/components/AddFavoriteAnimation.vue";
import DeerRabbitAnimation from "@/components/DeerRabbitAnimation.vue";
import FormSnakeAnimation from "@/components/FormSnakeAnimation.vue";
import SubmitAnimation from "@/components/SubmitAnimation.vue";

@Component({
  components: {
    AddFavoriteAnimation,
    DeerRabbitAnimation,
    FormSnakeAnimation,
    SubmitAnimation,
  },
  loading: false, // TODO: why is manual progress bar control needed?
  transition: getPageTransitionKey,
})
export default class AnimeJsDemo extends Vue {
  favorite = false;

  mounted() {
    this.$nextTick(() => this.$nuxt.$loading.finish());
  }

  beforeDestroy() {
    this.$nuxt.$loading.start();
  }
}
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply flex flex-col items-center justify-center;
}
.demo-label {
  @apply uppercase;
}

.deer-rabbit {
  @apply h-auto;
  width: 300px;
}
</style>
