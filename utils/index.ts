import { Route } from "vue-router";

export const browserRequireJson = async (filename: string): Promise<any> => {
  if (!process.browser) {
    return {};
  }
  const jsonModule = await import(`~/assets/${filename}`);
  return jsonModule.default;
};

export type PageRoutingName = "index" | "lottie" | "anime";
export type PageTransitionName = "slide-left" | "slide-right" | "appear";

const pageRoutingNamesOrdered: PageRoutingName[] = ["index", "lottie", "anime"];
const getPageOrderIndex = (name: PageRoutingName): number =>
  pageRoutingNamesOrdered.findIndex(n => n === name);

export const getPageTransitionKey = (
  to: Route,
  from: Route,
): PageTransitionName => {
  if (!from) { return "appear"; }
  const fromIndex = getPageOrderIndex(from.name as PageRoutingName);
  if (fromIndex < 0) {
    console.error(`Unknown page routing name "${from.name}".`);
  }
  const toIndex = getPageOrderIndex(to.name as PageRoutingName);
  if (toIndex < 0) {
    console.error(`Unknown page routing name "${to.name}".`);
  }
  return fromIndex < toIndex ? "slide-right" : "slide-left";
};
