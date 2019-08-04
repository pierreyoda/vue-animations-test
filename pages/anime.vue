<template>
  <div class="container mx-auto w-full">
    <div class="container mx-auto pt-4 pb-12 text-left flex flex-col md:flex-row items-center">
      <div class="w-full lg:w-1/2 flex flex-col justify-center items-start pt-12 pb-24 px-6">
        <p class="demo-headline">Interactive animations!</p>
        <h2 class="my-4 mb-6 demo-title">Anime.js</h2>
        <p class="mb-12 demo-description">
          Anime.js is a lightweight JavaScript animation library with a simple, yet powerful API.
          It works with CSS properties, SVG, DOM attributes and JavaScript Objects.
        </p>
        <p class="demo-description">
          The amazing following form snake animation was created by Mikael Ainalem
          and the whole process is described
          <a class="uppercase no-underline text-blue-600 hover:text-blue-800"
            href="https://blog.prototypr.io/how-to-create-the-snake-highlight-animation-with-anime-js-bf9c6cb66434">
          here</a>!
        </p>
      </div>
      <form-snake-animation />
    </div>
    <div class="container mx-auto flex flex-col md:flex-row flex-wrap items-start justify-center">
      <div class="w-full md:w-1/3 demo-container">
        <p class="demo-label mb-16 pb-2">
          Favorited = {{ favorite ? 'yes' : 'no' }}
        </p>
        <add-favorite-animation @change="value => favorite = value" />
      </div>
      <div class="w-full md:w-1/3 demo-container mt-12 md:mt-0">
        <p class="demo-label mb-6">
          Deer or rabbit?
        </p>
        <deer-rabbit-animation class="deer-rabbit" />
      </div>
      <div class="w-full md:w-1/3 demo-container mt-12 md:mt-0 pb-24 md:pb-0">
        <p class="demo-label mb-32">
          Submit button
        </p>
        <submit-animation />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import anime from "animejs";
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

<style lang="scss" scoped>
.demo-container {
  @apply flex flex-col items-center justify-center;
}
.demo-label {
  @apply text-lg text-gray-800;
}

.deer-rabbit {
  width: 300px;
  @apply h-auto;
}
</style>
