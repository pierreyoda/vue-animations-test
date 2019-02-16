<template>
  <div :style="style" ref="container"></div>
</template>

<script lang="ts">
import Lottie, { LottieOptions, LottieInstance } from "lottie-web";
import { Component, Prop, Vue } from "vue-property-decorator";

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
  private animation!: LottieInstance;

  mounted() {
    this.animation = Lottie.loadAnimation({
      renderer: "svg",
      ...this.options,
      container: this.$refs.container,
    });
    this.$emit("animation-loaded", this.animation);
  }
}
</script>
