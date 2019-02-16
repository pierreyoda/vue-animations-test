<template>
  <div :style="style" ref="container"></div>
</template>

<script lang="ts">
import * as Lottie from "lottie-web";
let lottie: typeof Lottie;
if (process.browser) {
  // tslint:disable-next-line: no-var-requires
  lottie = require("lottie-web");
}
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class LottieAnimation extends Vue {
  @Prop({ type: Object, required: true }) private readonly options!: Lottie.LottieOptions;
  @Prop({ type: String, default: "100%" }) private readonly height!: string;
  @Prop({ type: String, default: "100%" }) private readonly width!: string;

  private style = {
    width: this.width,
    height: this.height,
    overflow: "hidden",
    margin: "0 auto",
  };
  private animation: Lottie.LottieInstance | null = null;

  @Watch("options", { immediate: false })
  onOptionsChanged(options: Lottie.LottieOptions) {
    this.load(options);
  }

  mounted() {
    this.load(this.options);
  }

  load(options: Lottie.LottieOptions) {
    if (!process.browser) {
      return;
    }
    if (this.animation) {
      this.animation.destroy();
    }
    this.animation = Lottie.loadAnimation({
      renderer: "svg",
      ...options,
      container: this.$refs.container,
    });
    this.$emit("animation-loaded", this.animation);
  }
}
</script>
