import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module
export default class AppModule extends VuexModule {
  isMobileMode = false;
  isMobileNavMenuOpened = false;

  get mobileMode() { return this.isMobileMode; }
  get mobileNavMenuOpened() { return this.isMobileNavMenuOpened; }

  @Mutation
  setMobileMode(isMobileMode: boolean) {
    this.isMobileMode = isMobileMode;
  }
  @Mutation
  setMobileNavMenuOpened(isMobileNavOpened: boolean) {
    this.isMobileNavMenuOpened = isMobileNavOpened;
  }
}
