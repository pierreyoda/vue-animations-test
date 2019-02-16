<template>
  <div class="flex flex-col form-snake-container">
    <svg class="form-snake-svg" viewBox="0 0 320 300">
      <defs>
        <linearGradient
                        inkscape:collect="always"
                        id="snakeLinearGradient"
                        x1="13"
                        y1="193.49992"
                        x2="307"
                        y2="193.49992"
                        gradientUnits="userSpaceOnUse">
          <stop
                style="stop-color:#ff00ff;"
                offset="0"
                id="stop876" />
          <stop
                style="stop-color:#ff0000;"
                offset="1"
                id="stop878" />
        </linearGradient>
      </defs>
      <path id="snakePath" d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
    </svg>
    <form class="form-snake" autocomplete="off" @submit.prevent="onFakeSubmit">
      <label for="field1">Field 1</label>
      <input @focus="onInputFocused('field1')" type="text" id="field1">
      <label for="field2">Field 2</label>
      <input @focus="onInputFocused('field2')" type="text" id="field2">
      <input @focus="onInputFocused('submit')" type="button" class="submit"
        @click="onFakeSubmit" :value="submitLabel">
    </form>
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

// "snake highlight" form example taken from: https://codepen.io/ainalem/pen/EQXjOR
// Article: https://blog.prototypr.io/how-to-create-the-snake-highlight-animation-with-anime-js-bf9c6cb66434
// TODO: can we use PostCSS+SCSS in Single File Components?

type AnimationState = "field1" | "field2" | "submit";
interface AnimationParams {
  targets: string;
  strokeDashoffset: {
    value: string | number;
    duration: number;
    easing: string;
  };
  strokeDasharray: {
    value: string | number;
    duration: number;
    easing: string;
  };
}
const snakeAnimationParams: {
  [state in AnimationState]: AnimationParams;
} = {
  field1: {
    targets: "#snakePath",
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  },
  field2: {
    targets: "#snakePath",
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  },
  submit: {
    targets: "#snakePath",
    strokeDashoffset: {
      value: -730,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "530 1386",
      duration: 1100,
      easing: "easeOutQuart",
    },
  },
};

@Component
export default class FormSnakeAnimation extends Vue {
  submitLabel = "Click Here!";
  private currentFormSnakeAnimation: any = null;

  onInputFocused(newState: AnimationState) {
    if (!process.browser) { return; }
    if (this.currentFormSnakeAnimation) {
      this.currentFormSnakeAnimation.pause();
    }
    const animationParams = snakeAnimationParams[newState];
    if (!animationParams) {
      console.error(`Unknown snake animation state "${newState}".`);
      return;
    }
    this.submitLabel = "Click Here!";
    this.currentFormSnakeAnimation = anime(animationParams);
  }

  async onFakeSubmit() {
    if (!process.browser) { return; }
    this.submitLabel = "Animating...";
    // let the focus animation play out
    await new Promise(resolve => setTimeout(resolve, 500));
    this.$emit("sent-fake");
    this.submitLabel = "Done!";
  }
}
</script>

<style lang="postcss" scoped>
.form-snake-container {
  @apply mx-auto relative;
  height: 320px;
  width: 320px;
  background-color: #474a59;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
}

.form-snake-svg {
  position: absolute;
  width: 320px;
}
.form-snake-svg path {
  fill: none;
  stroke: url(#snakeLinearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form-snake {
  position: absolute;
  margin: 40px;
}
.form-snake label {
  display: block;
  color: #c2c2c5;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}
.form-snake input {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  outline: none !important;
}
.form-snake .submit {
  @apply cursor-pointer;
  color: #707075;
  margin-top: 42px;
  transition: color 300ms;
}
.form-snake .submit:focus {
  color: #f2f2f2;
}
.form-snake .submit:active {
  color: #d0d0d2;
}
</style>
