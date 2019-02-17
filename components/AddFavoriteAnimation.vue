<template>
  <div class="favorite">
    <svg @click="onSvgClicked" :class="{ animating }"
      xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <mask id="favorite__halo-mask">
          <rect width="100%" height="100%" fill="white"/>
          <circle class="favorite__halo-inner" cx="50" cy="50" r="0" fill="black"></circle>
        </mask>
      </defs>
      <circle class="favorite__halo-outer" cx="50" cy="50" r="48" fill="#feb53c" mask="url(#favorite__halo-mask)"></circle>
      <path class="favorite__inactive" d="M50.214 10.067c6.4.204 10.753 25.648 10.753 25.648s26.256-1.803 27.13 2.857c.874 4.66-20.04 16.642-20.04 16.642s9.537 24.303 5.523 26.817c-4.015 2.515-23.545-14.023-23.545-14.023S29.333 84.493 25.633 81.785c-3.7-2.71 6.657-26.472 6.657-26.472S11.234 43.94 12.383 39.108c1.15-4.832 26.55-3.393 26.55-3.393s4.88-25.853 11.28-25.648z" fill-rule="evenodd"/>
      <path class="favorite__active" d="M50.214 10.067c6.4.204 10.753 25.648 10.753 25.648s26.256-1.803 27.13 2.857c.874 4.66-20.04 16.642-20.04 16.642s9.537 24.303 5.523 26.817c-4.015 2.515-23.545-14.023-23.545-14.023S29.333 84.493 25.633 81.785c-3.7-2.71 6.657-26.472 6.657-26.472S11.234 43.94 12.383 39.108c1.15-4.832 26.55-3.393 26.55-3.393s4.88-25.853 11.28-25.648z" fill-rule="evenodd"/>
    </svg>
    <div class="favorite__sprinkle"><div class="favorite__sprinkle-circle"></div></div>
    <div class="favorite__sprinkle"><div class="favorite__sprinkle-circle"></diV></div>
    <div class="favorite__sprinkle"><div class="favorite__sprinkle-circle"></diV></div>
    <div class="favorite__sprinkle"><div class="favorite__sprinkle-circle"></diV></div>
    <div class="favorite__sprinkle"><div class="favorite__sprinkle-circle"></diV></div>
  </div>
</template>

<script lang="ts">
// TODO: add typings when they are updated to v3
let anime: any;
if (process.browser) {
  // tslint:disable-next-line: no-var-requires
  anime = require("animejs").default;
}
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddFavoriteAnimation extends Vue {
  private timeline: any = null;
  private animating = false;

  mounted() {
    if (!process.browser) { return; }
    this.$emit("change", false);
    this.timeline = anime.timeline({
      direction: "normal",
      autoplay: false,
      loop: false,
      begin: () => this.animating = true,
      complete: (animation: any) => {
        this.animating = false;
        this.$emit("change", !animation.reversed);
      },
    });
    this.timeline
      .add({
        targets: ".favorite__inactive",
        scale: {
          value: [1, 0],
          duration: 400,
          delay: 0,
          easing: "easeInQuad",
        },
      })
      .add({
        targets: ".favorite__halo-outer",
        scale: {
          value: [0, 1],
          duration: 400,
          delay: 400,
          easing: "easeOutQuad",
        },
      }, 0)
      .add({
        targets: ".favorite__halo-inner",
        r: {
          value: [0, 49],
          duration: 300,
          delay: 500,
          easing: "easeOutQuad",
        },
      }, 0)
      .add({
        targets: ".favorite__active",
        scale: {
          value: [0, 1],
          duration: 500,
          delay: 600,
          easing: "easeOutQuad",
        },
        opacity: {
          value: 1,
          duration: 500,
          delay: 500,
        },
      }, 0)
      .add({
        targets: ".favorite__sprinkle",
        opacity: {
          value: [0, 1],
          duration: 150,
          delay: 500,
        },
      }, 0)
      .add({
        targets: ".favorite__sprinkle-circle",
        height: {
          value: [5, 12],
          duration: 100,
          delay: 600,
          easing: "easeOutQuad",
        },
      }, 0)
      .add({
        targets: ".favorite__sprinkle-circle",
        height: {
          value: [12, 5],
          duration: 100,
          delay: 700,
          easing: "easeOutQuad",
        },
      }, 0)
      .add({
        targets: ".favorite__sprinkle-circle",
        opacity: {
          value: [1, 0],
          duration: 500,
          delay: 800,
          easing: "easeOutQuad",
        },
      }, 0)
      .add({
        targets: ".favorite__sprinkle-circle",
        translateY: {
          value: [0, -28],
          duration: 500,
          delay: 600,
          easing: "easeOutQuad",
        },
      }, 0);
  }

  onSvgClicked() {
    if (this.animating) { return; }
    this.timeline.direction = this.timeline.reversed ? "reverse" : "normal";
    this.timeline.restart();
    this.timeline.finished.then(() => this.timeline.reverse());
  }
}
</script>

<style lang="scss" scoped>
$is-favorite-color: #feb53c;
$not-favorite-color: #dbdedd;
$sprinkles-color: #f98247;

.favorite {
  position: relative;
  transform: scale(1);
  display: inline-block;
  transform-origin: 50% 0%;
  &:not(.animating) {
    .favorite__inactive, .favorite__active {
      cursor: pointer;
    }
  }
}

.favorite__inactive {
  transform-origin: 50% 50%;
  fill: $not-favorite-color;
  &:hover {
    fill: $is-favorite-color;
  }
}

.favorite__active {
  transform-origin: 50% 50%;
  transform: scale(0);
  opacity: 1;
  fill: $is-favorite-color;
}

.favorite__halo-outer {
  transform-origin: 50% 50%;
  transform: scale(0);
}

.favorite__sprinkle {
  position: absolute;
  top: 50px;
  left: 52px;
  transform: rotate(36deg);
}

.favorite__sprinkle:nth-child(2) {
  transform: rotate(108deg);
}

.favorite__sprinkle:nth-child(3) {
  transform: rotate(180deg);
}

.favorite__sprinkle:nth-child(4) {
  transform: rotate(252deg);
}

.favorite__sprinkle:nth-child(5) {
  transform: rotate(324deg);
}

.favorite__sprinkle-circle {
  position: absolute;
  content: '';
  background: $sprinkles-color;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  margin-top: -28px;
}
</style>
