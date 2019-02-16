<template>
  <div class="w-full">
    <div class="container max-w-xl mx-auto leading-normal">
      <h2 class="text-2xl md:text-4xl text-grey-darkest mb-3">
        Vue + Animations POCS
      </h2>
      <p class="text-md md:text-lg text-grey-dark">
        Exploration of common solutions for displaying advanced animations in Vue.js.
      </p>
      <div class="flex flex-row flex-wrap items-center justify-between">
        <nuxt-link class="hero-btn" to="/lottie">Lottie</nuxt-link>
        <nuxt-link class="hero-btn" to="/anime">Anime.js</nuxt-link>
      </div>
    </div>
    <div class="w-full px-6 py-12 bg-grey-dark text-grey-lighter">
      <div class="container max-w-lg mx-auto flex flex-col text-center">
        <p class="mb-6">
          This website also showcases the possibilities of Tailwind CSS.<br>
          The layout is heavily inspired by some starter templates from Tailwind Toolbox.
        </p>
        <a class="hero-link text-blue-light" href="https://tailwindcss.com">
          Tailwind CSS
        </a>
        <a class="hero-link text-blue-light" href="https://www.tailwindtoolbox.com/">
          Tailwind Toolbox
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Index extends Vue {}
</script>
