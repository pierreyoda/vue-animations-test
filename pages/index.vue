<template>
  <div class="w-full bg-grey-lighter">
    <div class="container max-w-xl mx-auto py-24 flex flex-col lg:flex-row items-center justify-center flex-wrap">
      <div class="w-full md:w-2/3 text-center pr-12">
        <h2 class="text-2xl md:text-4xl text-grey-darkest mb-12">
          Vue + Animations POCs
        </h2>
        <p class="text-md md:text-lg text-left text-grey-dark mb-6">
          Exploration of common solutions for displaying advanced animations in Vue.js.
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
    </div>
    <div class="w-full px-6 py-8 bg-grey-dark text-grey-lighter">
      <div class="container max-w-lg mx-auto flex flex-col text-center">
        <p class="mb-6 leading-normal">
          This website also showcases the possibilities of Tailwind CSS.<br>
          The layout is heavily inspired by some starter templates from Tailwind Toolbox.
        </p>
        <a class="hero-link mb-1" href="https://tailwindcss.com">
          Tailwind CSS
        </a>
        <a class="hero-link" href="https://www.tailwindtoolbox.com/">
          Tailwind Toolbox
        </a>
      </div>
    </div>
    <div class="w-full py-16 bg-white">
      <div class="container max-w-xl mx-auto px-12 flex flex-wrap">
        <div class="mt-12 w-full md:w-1/2 flex flex-wrap">
          <div v-for="(item, i) in stackItems" :key="i"
            class="w-full sm:w-1/2 flex flex-col justify-center">
            <img :src="`/${item.img}`" class="stack-img" :class="{ hovered: isStackItemHovered(i) }"
              @mouseover="onMouseOverStackItem(i)" @mouseleave="onMouseLeaveStackItem(i)" />
          </div>
        </div>
        <div class="w-full md:w-1/2 p-3 md:px-6 flex flex-col items-start justify-around">
          <h3 class="text-2xl text-grey-darkest">
            Stack
          </h3>
          <div class="h-full flex flex-col justify-center">
            <p v-for="(item, i) in stackItems" :key="i"
              class="stack-label" :class="{ hovered: isStackItemHovered(i) }"
              @mouseover="onMouseOverStackItem(i)" @mouseleave="onMouseLeaveStackItem(i)">
              {{ item.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
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
  img: string;
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
    { label: "Typescript", img: "logo-ts.png" },
    { label: "Vue.js", img: "logo-vue.png" },
    { label: "Nuxt.js (for generating this static website)", img: "logo-nuxt.png" },
    { label: "Tailwind CSS", img: "logo-tailwind.png" },
  ];
  private stackHoveredIndex = -1;

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

  isStackItemHovered(index: number): boolean {
    return index === this.stackHoveredIndex;
  }

  onMouseOverStackItem(index: number) {
    this.stackHoveredIndex = index;
  }

  onMouseLeaveStackItem(_: number) {
    this.stackHoveredIndex = -1;
  }
}
</script>

<style lang="postcss" scoped>
.stack-img {
  @apply w-32 h-auto;
}
.stack-img.hovered {
  @apply opacity-75;
}

.stack-label {
  @apply rounded-lg my-3 border-2 border-grey-darker bg-grey-dark py-3 px-4 text-center text-white ;
}
.stack-label.hovered {
  @apply border-grey-darkest text-grey-light;
}
</style>
