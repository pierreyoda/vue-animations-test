<template>
  <div :style="style" ref="container"></div>
</template>

<script lang="ts">
import Lottie, { LottieOptions, LottieInstance } from "lottie-web";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class LottieAnimation extends Vue {
  @Prop({ type: Object, required: true }) private readonly options!: LottieOptions;
  @Prop({ type: String, default: "100%" }) private readonly height!: string;
  @Prop({ type: String, default: "100%" }) private readonly width!: string;

  private style = {
    width: this.width,
    height: this.height,
    overflow: "hidden",
    margin: "0 auto",
  };
  private animation: LottieInstance | null = null;

  @Watch("options", { immediate: false })
  onOptionsChanged(options: LottieOptions) {
    this.load(options);
  }

  mounted() {
    this.load(this.options);
  }

  load(options: LottieOptions) {
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
