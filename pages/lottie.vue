<template>
  <div class="container mx-auto w-full" v-if="dataLoaded">
    <div class="container mx-auto text-left flex flex-col md:flex-row items-center">
      <div class="w-full xl:w-1/2 flex flex-col justify-center items-start pt-12 pb-24 px-6">
        <p class="uppercase tracking-wide">After Effects exports!</p>
        <h1 class="my-4 text-grey-darkest text-3xl">Airbnb Lottie-Web</h1>
        <p>
          After Effects animations can be exported as a JSON with a plugin supporting
          most features. Lottie then allows us to faithfully display this animation on
          many supports. In this case, Lottie-Web can play this animation in a canvas,
          in SVG or with DOM elements.
        </p>
        <p class="mt-4">
          Click on an animation to focus it.
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
      <div class="w-full xl:w-1/2 flex flex-col justify-center items-center xl:py-6 border border-pink-darkest"
        :class="{ [mainAnimation.backgroundClass]: true }">
        <lottie-animation :options="mainAnimation.options" width="500px" height="500px"
          @animation-loaded="instance => onAnimationLoaded(mainAnimationKey, instance)" />
      </div>
    </div>
    <div class="container mx-auto text-left flex flex-col flex-wrap md:flex-row items-center justify-center">
      <div v-for="meta in animationWidgetsMeta" :key="meta.key"
        @click="setMainAnimation(meta.key)"
        class="max-w-full flex flex-col justify-center animation-container" :class="{ [meta.backgroundClass]: true }">
        <p class="uppercase tracking-wide text-center text-white">{{ meta.key }}</p>
        <lottie-animation :options="meta.options" max-height="200px"
          @animation-loaded="instance => onAnimationLoaded(meta.key, instance)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LottieInstance, LottieOptions } from "lottie-web";
import { Component, Watch, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

import { browserRequireJson, getPageTransitionKey } from "@/utils";
import LottieAnimation from "@/components/LottieAnimation.vue";

type AnimationButton = "play" | "pause" | "stop";
type AnimationStatus = "loading" | "playing" | "paused" | "stopped";

// TODO: add attribution somewhere
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

const loadAnimation = async (filename: any, backgroundClass: string): Promise<AnimationMeta> =>  ({
  key: filename,
  options: {
    name: filename,
    animationData: await browserRequireJson(`lottie/${filename}.json`),
    loop: true,
    autoplay: false,
  },
  status: "loading",
  backgroundClass,
});

const loadAnimations = async (
  array: Array<{ filename: string, backgroundClass: string }>,
): Promise<AnimationCatalog> => {
  const catalog: AnimationCatalog = {};
  await Promise.all(array.map(async (item) => {
    const animation = await loadAnimation(item.filename, item.backgroundClass);
    catalog[animation.key] = animation;
  }));
  return catalog;
};

@Component({
  components: {
    LottieAnimation,
  },
  loading: false,
  transition: getPageTransitionKey,
})
export default class LottieDemo extends Vue {
  @Getter("app/mobileMode")
  mobileMode!: boolean;

  dataLoaded = false;
  mainAnimationKey = "objects";
  private animations: AnimationCatalog = {};
  private animationsLoaded = 0;
  private animationLoadingPercentage = 0;

  @Watch("mobileMode")
  onMobileModeToggled(mobileMode: boolean) {
    // only play the main animation in mobile mode
    if (mobileMode) {
      for (const animationWidgetMeta of this.animationWidgetsMeta) {
        animationWidgetMeta.instance!.stop();
        animationWidgetMeta.status = "stopped";
      }
    } else {
      for (const animationWidgetMeta of this.animationWidgetsMeta) {
        animationWidgetMeta.instance!.play();
        animationWidgetMeta.status = "playing";
      }
    }
  }

  mounted() {
    // wait for $loading to be available
    this.$nextTick(this.loadAnimations);
  }

  async loadAnimations() {
    this.$nuxt.$loading.start();
    this.animations = await loadAnimations([
      { filename: "done", backgroundClass: "bg-indigo" },
      { filename: "dots", backgroundClass: "bg-pink-darker" },
      { filename: "fireworks", backgroundClass: "bg-blue-darkest" },
      { filename: "gears", backgroundClass: "bg-yellow-dark" },
      { filename: "objects", backgroundClass: "bg-orange-light" },
      { filename: "search", backgroundClass: "bg-red-light" },
      { filename: "world", backgroundClass: "bg-blue-light" },
    ]);
    this.animationLoadingPercentage = 100 / (Object.keys(this.animations).length || 1);
    this.dataLoaded = true;
  }

  beforeDestroy() {
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
    const autoplaying = !this.mobileMode || key === this.mainAnimationKey;
    if (autoplaying) {
      instance.play();
    }
    meta.status = meta.options.autoplay || autoplaying ? "playing" : "stopped";
    // FIXME: cannot invoke an object which is possibly undefined...
    const loading = this.$nuxt.$loading;
    (loading as any).increase(this.animationLoadingPercentage);
    if (++this.animationsLoaded >= Object.keys(this.animations).length) {
      (loading as any).finish();
    }
  }

  setMainAnimation(key: string) {
    const next = this.animations[key];
    if (!next) {
      console.error(`Unknown animation "${key}".`);
      return;
    }
    if (this.mobileMode) {
      const current = this.animations[this.mainAnimationKey];
      current.instance!.stop();
      current.status = "stopped";
    }
    this.mainAnimationKey = key;
    next.status = "loading";
    window.scrollTo(0, this.mobileMode ? 450 : 80);
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
