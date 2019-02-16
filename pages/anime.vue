<template>
  <div class="container mx-auto w-full">
    <div class="container mx-auto py-12 text-left flex flex-col md:flex-row items-center">
      <div class="w-full lg:w-1/2 flex flex-col justify-center items-start pt-12 pb-24 px-6">
        <p class="uppercase tracking-wide">Interactive animations!</p>
        <h1 class="my-4 text-grey-darkest text-3xl mb-6">Airbnb Lottie-Web</h1>
        <p class="mb-12">
          Anime.js is a lightweight JavaScript animation library with a simple, yet powerful API.
          It works with CSS properties, SVG, DOM attributes and JavaScript Objects.
        </p>
        <p>
          The amazing form snake animation on the right was created by Mikael Ainalem
          and the whole process is described
          <a class="uppercase no-underline text-blue-dark hover:text-blue-darker"
            href="https://blog.prototypr.io/how-to-create-the-snake-highlight-animation-with-anime-js-bf9c6cb66434">
          here</a>!
        </p>
      </div>
      <form-snake-animation />
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
import FormSnakeAnimation from "@/components/FormSnakeAnimation.vue";

@Component({
  transition: getPageTransitionKey,
  components: {
    FormSnakeAnimation,
  },
})
export default class AnimeJsDemo extends Vue {}
</script>
