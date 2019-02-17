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
  @Prop({ type: Number, default: 1.0 }) private readonly speed!: number;
  @Prop({ type: String, default: "100%" }) private readonly height!: string;
  @Prop({ type: String, default: "100%" }) private readonly width!: string;
  @Prop({ type: String, default: "100%" }) private readonly maxWidth!: string;
  @Prop({ type: String, default: "100%" }) private readonly maxHeight!: string;

  private style = {
    width: this.width,
    height: this.height,
    maxWidth: this.maxWidth,
    maxHeight: this.maxHeight,
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
    if (!lottie || !process.browser || !options.animationData) {
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
    lottie.setSpeed(this.speed, options.name);
    this.$emit("animation-loaded", this.animation);
  }
}
</script>
