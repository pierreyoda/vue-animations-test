<template>
  <div class="button-container">
    <div class="button" @click="clicked">
      <div class="text">Click Me</div>
    </div>
    <div class="progress-bar"></div>
      <svg @click="clicked" x="0px" y="0px" viewBox="0 0 25 30" style="enable-background:new 0 0 25 30;">
        <path ref="path" class="check" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"
          :style="{ strokeDashOffset }"/>
      </svg>
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

/* submit animation example taken from: https://codepen.io/andrewmillen/details/MoKLob
 * License: TODO: include somewhere

Copyright (c) 2019 by Andrew Millen (https://codepen.io/andrewmillen/pen/MoKLob)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

@Component
export default class SubmitAnimation extends Vue {
  strokeDashOffset = 0;
  private timeline: any;

  mounted() {
    if (!process.browser) { return; }
    this.timeline = anime.timeline({
      direction: "normal",
      autoplay: false,
      loop: false,
    });
    const pathEl = this.$refs.path;
    this.strokeDashOffset = anime.setDashoffset(pathEl);
    this.timeline
      .add({
        targets: ".text",
        duration: 1,
        opacity: "0",
      })
      .add({
        targets: ".button",
        duration: 1300,
        height: 10,
        width: 300,
        backgroundColor: "#2b2d2f",
        border: "0",
        borderRadius: 100,
      })
      .add({
        targets: ".progress-bar",
        duration: 2000,
        width: 300,
        easing: "linear",
      })
      .add({
        targets: ".button",
        width: 0,
        duration: 1,
      })
      .add({
        targets: ".progress-bar",
        width: 80,
        height: 80,
        delay: 500,
        duration: 750,
        borderRadius: 80,
        backgroundColor: "#71dfbe",
      })
      .add({
        targets: pathEl,
        strokeDashoffset: [this.strokeDashOffset, 0],
        duration: 200,
        easing: "easeInOutSine",
      });
  }

  clicked() {
    this.timeline.restart();
  }
}
</script>

<style lang="postcss" scoped>
.button-container {
  @apply relative w-full;
  background-color: #1d1f20;
}

.button {
  @apply absolute text-center my-0 mx-auto cursor-pointer;
  background: #2b2d2f;
  height: 80px;
  width: 200px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  border-radius: 4px;
}

.text {
  @apply absolute font-bold text-xl;
  color: #71dfbe;
  top: 50%;
  transform: translateY(-52%);
  left: 0;
  right: 0;
}

.progress-bar {
  @apply absolute cursor-pointer bg-teal;
  height: 10px;
  width: 0;
  right: 0;
  top: 50%;
  left: 50%;
  border-radius: 200px;
  transform: translateY(-50%) translateX(-50%);
}

svg {
  @apply absolute;
  width: 30px;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  right: 0;
}

.check {
  fill: none;
  stroke: #FFFFFF;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
