export const isTouch: boolean = !window.matchMedia("(hover: hover)").matches;
export function isLargeDesktop(): boolean {
  return window.matchMedia("(min-width: 1000px)").matches;
}
