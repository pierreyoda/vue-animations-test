declare module 'lottie-web' {
  // export as namespace Lottie;
  export = Lottie;
}

declare const Lottie: LottyPlayer;

declare namespace Lottie {
  export interface AnimationItem {
    animType: string;
    animationData: AnimationData;
    animationID: string;
    assets: any[];
    assetsPath: string;
    autoloadSegments: boolean;
    autoplay: boolean;
    currentFrame: number;
    currentRawFrame: number;
    fileName: string;
    firstFrame: number;
    frameModifier: number;
    frameMult: number;
    frameRate: number;
    imagePreloader: any; // ImagePreloader ???
    isLoaded: boolean;
    isPaused: boolean;
    loop: boolean;
    name: string;
    path: string;
    pendingElements: number;
    playCount: number;
    playDirection: number;
    playSpeed: number;
    projectInterface: any;
    renderer: any; // SVGRenderer ???
    segmentPos: number;
    segments: any[];
    subframeEnabled: boolean;
    timeCompleted: number;
    totalFrames: number;
    wrapper: any; // HTMLElement or angular element
    addEventListener: (eventName: string, callback: (e: any) => void) => void;

    play(): unknown;

    stop(): unknown;

    pause(): unknown;

    // one param speed (1 is normal speed)
    setSpeed(speed: number): unknown;

    // one param direction (1 is normal direction)
    setDirection(direction: number): unknown;

    // If false, it will respect the original AE fps. If true, it will update as much as possible. (true by default)
    setSubframe(flag: boolean): unknown;

    // first param is a numeric value. second param is a boolean that defines time or frames for first param
    goToAndPlay(value: number, isFrame: boolean): unknown;

    // first param is a numeric value. second param is a boolean that defines time or frames for first param
    goToAndStop(value: number, isFrame: boolean): unknown;

    // first param is a single array or multiple arrays of two values each(fromFrame,toFrame),
    // second param is a boolean for forcing the new segment right away
    playSegments(segments: number[] | number[][], forceFlag: boolean): unknown;

    // To destroy and release resources.
    destroy(): unknown;
  }

  export interface AnimationData {
    layers: any[];
    markers: Marker[];
  }

  export interface Marker {
    // marked frame
    tm: number;
    // sequence name
    cm: string;
    // ???
    dr: number;
  }

  export interface BMEnterFrameEvent {
    currentTime: number;
    direction: number;
    totalTime: number;
    type: string;
  }

  export interface AnimationConfig {
    // an Object with the exported animation data.
    animationData?: any;

    // the relative path to the animation object. (animationData and path are mutually exclusive)
    path?: string;

    // true / false / number
    loop?: boolean | number;

    // true / false it will start playing as soon as it is ready
    autoplay?: boolean;

    // animation name for future reference
    name?: string;

    // 'svg' / 'canvas' / 'html' to set the renderer
    renderer?: string;

    // the dom element on which to render the animation
    container?: any;
  }
}

declare class LottyPlayer {
  // optional parameter name to target a specific animation
  play(name?: string): unknown;

  // optional parameter name to target a specific animation
  stop(name?: string): unknown;

  // first param speed (1 is normal speed) with 1 optional parameter name to target a specific animation
  setSpeed(speed: number, name?: string): unknown;

  // first param direction (1 is normal direction.) with 1 optional parameter name to target a specific animation
  setDirection(direction: number, name?: string): unknown;

  // default 'high', set 'high','medium','low', or a number > 1 to improve player performance.
  // In some animations as low as 2 won't show any difference.
  setQuality(quality: string | number): unknown;

  // param usually pass as location.href. Its useful when you experience
  // mask issue in safari where your url does not have # symbol.
  setLocationHref(href: string): unknown;

  // returns an animation instance to control individually.
  loadAnimation(params: Lottie.AnimationConfig): Lottie.AnimationItem;

  // you can register an element directly with registerAnimation. It must have the "data-animation-path"
  // attribute pointing at the data.json url
  registerAnimation(element: any, animationData?: any): unknown;

  // looks for elements with class "lottie"
  searchAnimations(animationData?: any, standalone?: boolean, renderer?: string): unknown;

  // To destroy and release resources. The DOM element will be emptied.
  destroy(name?: string): unknown;
}
