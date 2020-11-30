export const isTouch: boolean = !window.matchMedia("(hover: hover)").matches;
export const isLargeDesktop: boolean = window.matchMedia("(min-width: 1000px)")
  .matches;
