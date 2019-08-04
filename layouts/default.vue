<template>
  <div class="min-h-screen flex flex-col">
    <nav v-clickaway="closeNav"
      class="flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full">
      <div class="relative w-full lg:w-auto flex items-center justify-start sm:justify-center lg:justify-start flex-shrink-0 mr-6">
        <span class="text-lg sm:text-2xl text-green-400 font-bold">Vue.js</span>
        <h1 class="text-lg sm:text-xl md:text-2xl text-white pl-2 font-semibold">Animations Test</h1>
        <div class="block lg:hidden nav-toggle-container">
          <div @click="toggleNav" class="nav-toggle hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </div>
        </div>
      </div>
      <transition name="nav-appear">
        <div v-if="menuVisible" class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0">
          <ul class="lg:flex justify-end flex-1 items-center text-center">
            <li v-for="tabLink in tabLinks" :key="tabLink.to" class="nav-link-item">
              <nuxt-link @click.native="closeNav" class="nav-link" :to="tabLink.to">
                {{ tabLink.label }}
              </nuxt-link>
            </li>
            <li class="flex flex-row items-center justify-center nav-link-item">
              <img src="/logo-github.png" class="nav-link-icon">
              <a class="inline-block no-underline text-gray-400 hover:text-gray-500" href="https://github.com/pierreyoda/vue-animations-test">
                Github
              </a>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
    <div id="content" :class="{ loading: firstResize }" class="flex-grow w-full shadow-lg bg-blue-100">
      <nuxt/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

interface TabLink {
  to: string;
  label: string;
}

@Component
export default class DefaultLayout extends Vue {
  @Getter("app/mobileMode")
  mobileMode!: boolean;
  @Mutation("app/setMobileMode")
  setMobileMode!: (value: boolean) => void;

  @Getter("app/mobileNavMenuOpened")
  mobileNavMenuOpened!: boolean;
  @Mutation("app/setMobileNavMenuOpened")
  setMobileNavMenuOpened!: (value: boolean) => void;

  private readonly tabLinks: TabLink[] = [
    { to: "/", label: "Home" },
    { to: "/lottie", label: "Lottie" },
    { to: "/anime", label: "Anime.js" },
  ];
  private readonly mobileBreakpoint = 992; // in pixels
  private firstResize = true;

  mounted() {
    if (process.browser) {
      window.addEventListener("resize", this.onResize);
      this.$nextTick(() => {
        this.onResize();
        this.firstResize = false;
      });
    }
  }

  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize() {
    const width = window.innerWidth;
    const mobileMode = width < this.mobileBreakpoint;
    if (this.firstResize || mobileMode !== this.mobileMode) {
      const menuOpened = this.firstResize
        ? !mobileMode
        : mobileMode;
      this.setMobileNavMenuOpened(menuOpened);
      this.setMobileMode(mobileMode);
    }
  }

  toggleNav() {
    if (!this.mobileMode) { return; }
    this.setMobileNavMenuOpened(!this.mobileNavMenuOpened);
  }

  closeNav() {
    if (!this.mobileMode) { return; }
    this.setMobileNavMenuOpened(false);
  }

  get menuVisible(): boolean {
    // TODO: improve this (no menu on mobile initial loading mobile)
    if (this.firstResize) {
      return false;
    }
    return this.mobileMode
      ? this.mobileNavMenuOpened
      : true;
  }
}
</script>
