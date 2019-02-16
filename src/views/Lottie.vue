<template>
  <div class="container mx-auto w-full">
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
      <div v-for="metaWithKey in animationWidgetsMetaWithKey" :key="metaWithKey.key"
        @click="setMainAnimation(metaWithKey.key)"
        class="animation-container cursor-pointer border border-grey-dark" :class="{ [metaWithKey.backgroundClass]: true }">
        <p class="uppercase tracking-wide text-center text-white">{{ metaWithKey.key }}</p>
        <lottie-animation :options="metaWithKey.options" width="300px" height="300px"
          @animation-loaded="instance => onAnimationLoaded(metaWithKey.key, instance)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LottieInstance, LottieOptions } from "lottie-web";
import { Component, Vue } from "vue-property-decorator";
import LottieAnimation from "@/components/LottieAnimation.vue";

import checkData from "@/assets/check.json";
import dotsData from "@/assets/dots.json";
import drinksData from "@/assets/drinks.json";
import gearsData from "@/assets/gears.json";
import objectsData from "@/assets/objects.json";
import pinJumpData from "@/assets/pin_jump.json";
import searchData from "@/assets/search.json";
import starData from "@/assets/star.json";
import worldData from "@/assets/world.json";

type AnimationButton = "play" | "pause" | "stop";
type AnimationStatus = "loading" | "playing" | "paused" | "stopped";

interface AnimationMeta {
  options: LottieOptions;
  instance?: LottieInstance;
  status: AnimationStatus;
  backgroundClass: string;
}

const initAnimation = (data: any, backgroundClass: string): AnimationMeta =>  ({
  options: {
    animationData: data,
    loop: true,
    autoplay: true,
  },
  status: "loading",
  backgroundClass,
});

@Component({
  components: {
    LottieAnimation,
  },
})
export default class Lottie extends Vue {
  mainAnimationKey = "objects";
  private readonly animations: {
    [key: string]: AnimationMeta,
  } = {
    check: initAnimation(checkData, "bg-indigo"),
    dots: initAnimation(dotsData, "bg-pink-darker"),
    drinks: initAnimation(drinksData, "bg-white"),
    gears: initAnimation(gearsData, "bg-yellow-dark"),
    objects: initAnimation(objectsData, "bg-orange-light"),
    pinJump: initAnimation(pinJumpData, "bg-white"),
    search: initAnimation(searchData, "bg-red-light"),
    world: initAnimation(worldData, "bg-blue-light"),
  };

  get mainAnimation(): AnimationMeta {
    return this.animations[this.mainAnimationKey];
  }
  get mainAnimationStatus(): AnimationStatus {
    return this.mainAnimation.status;
  }
  get animationWidgetsMetaWithKey() {
    return Object.keys(this.animations)
      .filter(key => key !== this.mainAnimationKey)
      .map(key => ({
        ...this.animations[key],
        key,
      }));
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
      console.error(`Unknown animation "${key}".`);`
      return;`
    }
    this.mainAnimationKey = key;
    meta.status = 'loading';
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
