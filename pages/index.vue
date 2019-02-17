<template>
  <div class="w-full bg-grey-lighter">
    <section class="container max-w-xl mx-auto py-24 flex flex-col lg:flex-row items-center justify-center flex-wrap">
      <div class="w-full md:w-2/3 text-center px-12">
        <h2 class="text-2xl md:text-4xl text-left text-grey-darkest mb-12">
          Vue + Animations POCs
        </h2>
        <p class="text-md md:text-lg text-left text-grey-dark mb-6 leading-loose">
          Exploration of common solutions for displaying advanced animations in Vue.js.<br>
          Generated as a static website using Nuxt.js.
        </p>
        <div class="flex flex-row flex-wrap items-center justify-center lg:justify-start">
          <nuxt-link class="hero-btn mr-12" to="/lottie">Lottie</nuxt-link>
          <nuxt-link class="hero-btn" to="/anime">Anime.js</nuxt-link>
        </div>
      </div>
      <div class="w-full md:w-1/3 flex flex-col justify-center mt-12 lg:mt-0 hero-demo-container">
        <transition name="fade" mode="out-in">
          <form-snake-animation v-if="!heroFormSent" @sent-fake="heroFormSent = true" />
          <lottie-animation v-else @click.native="heroFormSent = false" class="cursor-pointer"
            :options="heroAnimationOptions" :speed="0.7" width="100%" height="100%" />
        </transition>
      </div>
    </section>
    <section class="section-templates py-8">
      <h3 class="section-title text-grey-light">Templates</h3>
      <div class="container mx-auto px-4 text-center flex flex-col text-white">
        <p class="mb-6 leading-normal">
          This website also showcases the possibilities of Tailwind CSS.<br>
          The layout is heavily inspired by some starter templates.
        </p>
        <a class="template-link" href="https://www.tailwindtoolbox.com/">
          Tailwind Toolbox
        </a>
        <a class="template-link mt-2" href="https://github.com/colmtuite/tailwind-template">
          Tailwind Marketing Template
        </a>
      </div>
    </section>
    <section class="w-full py-8 bg-grey-lightest">
      <h3 class="section-title text-grey-dark">Stack</h3>
      <div class="flex flex-wrap items-center justify-center -m-6">
        <div v-for="(item, i) in stackItems" :key="i"
          class="w-full lg:w-1/2 py-6 px-24">
          <a class="no-underline" :href="item.link">
            <div class="rounded shadow-lg p-8" :class="{ [item.bgClass]: true }">
              <div class="flex flex-row items-center justify-between">
                <p class="text-2xl text-white pl-4">{{ item.label }}</p>
                  <!-- <p class="text-lg text-white leading-tight">{{ item.description }}</p> -->
                <img :src="`/${item.img}`" class="w-auto h-12">
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { LottieOptions } from "lottie-web";
import { Component, Vue } from "vue-property-decorator";

import { browserRequireJson, getPageTransitionKey } from "@/utils";
import LottieAnimation from "@/components/LottieAnimation.vue";
import FormSnakeAnimation from "@/components/FormSnakeAnimation.vue";

interface StackItem {
  label: string;
  description: string;
  img: string;
  link: string;
  bgClass: string;
}

@Component({
  components: {
    LottieAnimation,
    FormSnakeAnimation,
  },
  loading: false,
  transition: getPageTransitionKey,
})
export default class Index extends Vue {
  heroFormSent = false;
  heroAnimationOptions: LottieOptions = {};
  readonly stackItems: StackItem[] = [
  {
    label: "Typescript",
    description: "Modern Javascript superset offering static type checking.",
    img: "logo-ts.png",
    link: "https://www.typescriptlang.org/",
    bgClass: "bg-blue-dark",
  },
  {
    label: "Vue.js",
    description: "Simple, versatile and performant front-end framework.",
    img: "logo-vue.png",
    link: "https://vuejs.org/",
    bgClass: "bg-green-dark",
  },
  {
    label: "Nuxt.js",
    description: "Server-Side Rendering for Vue.js.",
    img: "logo-nuxt.png",
    link: "https://nuxtjs.org/",
    bgClass: "bg-red-light",
  },
  {
    label: "Tailwind CSS",
    description: "Utility-first CSS framework for fash & cohesive prototyping.",
    img: "logo-tailwind.png",
    link: "https://tailwindcss.com",
    bgClass: "bg-pink-dark",
  },
];

  async mounted() {
    this.$nextTick(this.loadAnimations);
  }

  async loadAnimations() {
    if (process.browser) {
      this.heroAnimationOptions = {
        name: "hero",
        animationData: await browserRequireJson("lottie/done"),
        loop: false,
        autoplay: true,
      };
    }
    this.$nuxt.$loading.finish();
  }

  beforeDestroy() {
    this.$nuxt.$loading.start();
  }
}
</script>

<style lang="postcss" scoped>
.section-templates {
  background-color: #696360;
}

.section-title {
  @apply text-center text-3xl mb-8;
}
</style>
