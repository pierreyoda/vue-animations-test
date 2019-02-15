<template>
  <div class="container mx-auto p-4">
    <h2 class="text-green-darkest">Lottie (After Effects exports)</h2>
    <div class="w-full"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LottieAnimation from "@/components/LottieAnimation.vue";

@Component({
  components: {
    LottieAnimation,
  },
})
export default class Home extends Vue { }
</script>
