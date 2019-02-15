<template>
  <div>
  </div>
</template>

<script lang="ts">
import lottie from "lottie-web";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LottieAnimation extends Vue {
  @Prop() private msg!: string;
}
</script>
