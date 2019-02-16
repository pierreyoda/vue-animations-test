<template>
  <div class="container mx-auto w-full" v-if="dataLoaded">
    <div class="container mx-auto text-left flex flex-col md:flex-row items-center">
      <div class="w-full lg:w-1/2 flex flex-col justify-center items-start pt-12 pb-24 px-6">
        <p class="uppercase tracking-wide">After Effects exports!</p>
        <h1 class="my-4 text-grey-darkest text-3xl">Airbnb Lottie-Web</h1>
        <p>
          After Effects animations can be exported as a JSON with a plugin supporting
          most features. Lottie then allows us to faithfully display this animation on
          many supports. In this case, Lottie-Web can play this animation in a canvas,
          in SVG or with DOM elements.
        </p>
        <div class="mt-4 w-full flex flex-row justify-center flex-wrap">
          <button v-if="mainAnimationStatus !== 'playing'"
            @click="animationPlay(mainAnimationKey)"
            :disabled="!animationButtonEnabled(mainAnimationKey, 'play')"
            class="animation-btn play">
            Play
          </button>
          <button  v-else
            @click="animationPause(mainAnimationKey)"
            :disabled="!animationButtonEnabled(mainAnimationKey, 'pause')"
            class="animation-btn pause">
            Pause
          </button>
          <button @click="animationStop(mainAnimationKey)"
            :disabled="!animationButtonEnabled(mainAnimationKey, 'stop')"
            class="animation-btn stop ml-12">
            Stop
          </button>
        </div>
      </div>
      <div class="w-full lg:w-1/2 flex flex-col justify-center items-center lg:py-6"
        :class="{ [mainAnimation.backgroundClass]: true }">
        <lottie-animation :options="mainAnimation.options" width="500px" height="500px"
          @animation-loaded="instance => onAnimationLoaded(mainAnimationKey, instance)" />
      </div>
    </div>
    <div class="container mx-auto text-left flex flex-col flex-wrap md:flex-row items-center">
      <div v-for="meta in animationWidgetsMeta" :key="meta.key"
        @click="setMainAnimation(meta.key)"
        class="animation-container cursor-pointer border border-grey-dark" :class="{ [meta.backgroundClass]: true }">
        <p class="uppercase tracking-wide text-center text-white">{{ meta.key }}</p>
        <lottie-animation :options="meta.options" width="300px" height="300px"
          @animation-loaded="instance => onAnimationLoaded(meta.key, instance)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LottieInstance, LottieOptions } from "lottie-web";
import { Component, Vue } from "vue-property-decorator";

import LottieAnimation from "@/components/LottieAnimation.vue";

const requireAnimationData = (filename: string): any => {
  return process.browser
    ? require(`~/assets/lottie/${filename}.json`)
    : {};
};

type AnimationButton = "play" | "pause" | "stop";
type AnimationStatus = "loading" | "playing" | "paused" | "stopped";

interface AnimationMeta {
  key: string;
  options: LottieOptions;
  instance?: LottieInstance;
  status: AnimationStatus;
  backgroundClass: string;
}

interface AnimationCatalog {
  [key: string]: AnimationMeta;
}

const loadAnimation = (filename: any, backgroundClass: string): AnimationMeta =>  ({
  key: filename,
  options: {
    animationData: requireAnimationData(filename),
    loop: true,
    autoplay: true,
  },
  status: "loading",
  backgroundClass,
});

const loadAnimations = (
  array: Array<{ filename: string, backgroundClass: string }>,
): AnimationCatalog => {
  return array.reduce(
    (catalog: AnimationCatalog, info) => ({
      ...catalog,
      [info.filename]: loadAnimation(info.filename, info.backgroundClass),
    }), {});
};

@Component({
  components: {
    LottieAnimation,
  },
  loading: false,
})
export default class Lottie extends Vue {
  dataLoaded = false;
  mainAnimationKey = "objects";
  private animations: AnimationCatalog = {};

  mounted() {
    // wait for $loading to be available
    this.$nextTick(this.loadAnimations);
  }

  loadAnimations() {
    this.$nuxt.$loading.start();
    // TODO: loading increment
    this.animations = loadAnimations([
      { filename: "check", backgroundClass: "bg-indigo" },
      { filename: "dots", backgroundClass: "bg-pink-darker" },
      { filename: "drinks", backgroundClass: "bg-white" },
      { filename: "gears", backgroundClass: "bg-yellow-dark" },
      { filename: "objects", backgroundClass: "bg-orange-light" },
      { filename: "pin_jump", backgroundClass: "bg-white" },
      { filename: "search", backgroundClass: "bg-red-light" },
      { filename: "world", backgroundClass: "bg-blue-light" },
    ]);
    this.$nuxt.$loading.finish();
    this.dataLoaded = true;
  }

  beforeDestroy() {
    console.log("bef dest"); // TEMP
    this.$nuxt.$loading.start();
  }

  get mainAnimation(): AnimationMeta {
    return this.animations[this.mainAnimationKey];
  }
  get mainAnimationStatus(): AnimationStatus {
    const mainAnimation = this.animations[this.mainAnimationKey];
    return mainAnimation ? mainAnimation.status : "loading";
  }
  get animationWidgetsMeta() {
    console.log(this.animations);
    return Object.keys(this.animations)
      .filter(key => key !== this.mainAnimationKey)
      .map(key => this.animations[key]);
  }

  onAnimationLoaded(key: string, instance: LottieInstance) {
    const meta = this.animations[key];
    if (!meta) {
      console.error(`Unknown animation "${key}".`);
      return;
    }
    meta.instance = instance;
    meta.status = meta.options.autoplay ? "playing" : "stopped";
  }

  setMainAnimation(key: string) {
    const meta = this.animations[key];
    if (!meta) {
      console.error(`Unknown animation "${key}".`);
      return;
    }
    this.mainAnimationKey = key;
    meta.status = "loading";
  }

  animationButtonEnabled(key: string, button: AnimationButton): boolean {
    const meta = this.animations[key];
    if (!meta) {
      console.error(`Unknown animation "${key}".`);
      return false;
    }
    if (meta.status === "loading" || !meta.instance) { return false; }
    switch (button) {
      case "play": return meta.status !== "playing";
      case "pause": return meta.status === "playing";
      case "stop": return meta.status !== "stopped";
    }
  }

  animationPlay(key: string) {
    this.animationAction(key, meta => {
      meta.instance!.play();
      meta.status = "playing";
    });
  }

  animationPause(key: string) {
    this.animationAction(key, meta => {
      meta.instance!.pause();
      meta.status = "paused";
    });
  }

  animationStop(key: string) {
    this.animationAction(key, meta => {
      meta.instance!.stop();
      meta.status = "stopped";
    });
  }

  private animationAction(key: string, action: (meta: AnimationMeta) => void) {
    const meta = this.animations[key];
    if (!meta) {
      console.error(`Unknown animation "${key}".`);
      return;
    }
    if (!meta.instance) {
      console.error(`Undefined animation instance for "${key}".`);
      return;
    }
    action(meta);
  }
}
</script>
