<template>
  <div id="app" class="w-full h-full bg-grey-light font-sans text-center leading-normal tracking-normal">
    <nav class="flex items-center justify-between flex-wrap bg-grey-darkest p-6 fixed w-full z-10 pin-t">
      <div class="flex items-center flex-no-shrink mr-6">
        <span class="text-2xl text-blue-light font-bold">Yabawt</span>
        <h1 class="text-2xl text-white pl-2 font-semibold">Vue.js Animations Test</h1>
      </div>
      <div class="block lg:hidden">
        <div @click="toggleNav" class="nav-toggle hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </div>
      </div>
      <div v-if="menuVisible" class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0">
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <router-link @click.native="onTabClicked" class="nav-link" to="/lottie">
              Lottie
            </router-link>
          </li>
          <li class="mr-3">
            <router-link @click.native="onTabClicked" class="nav-link" to="/anime">
              Anime.js
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container shadow-lg bg-white mt-24 md:mt-18 mx-auto">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Route } from 'vue-router';
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private readonly mobileBreakpoint = 992; // in pixels
  private mobileMode = false;
  private mobileMenuOpened = false;

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.$nextTick(() => this.onResize());
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const width = window.innerWidth;
    const mobileMode = width < this.mobileBreakpoint;
    if (mobileMode !== this.mobileMode) {
      this.mobileMode = mobileMode;
      this.mobileMenuOpened = false;
    }
  }

  toggleNav() {
    if (!this.mobileMode) { return; }
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  onTabClicked() {
    if (!this.mobileMode) { return; }
    this.mobileMenuOpened = false;
  }

  get menuVisible(): boolean {
    return this.mobileMode
      ? this.mobileMenuOpened
      : true;
  }
}
</script>
