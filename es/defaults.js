export var breakPoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xlg: 1800
};
export var defaultDevicesSizes = {
  bot: breakPoints.lg - 1,
  phone: breakPoints.sm - 1,
  tablet: breakPoints.md - 1,
  car: breakPoints.md - 1,
  desktop: breakPoints.lg - 1,
  tv: breakPoints.xlg
};
export var mediaQueries = {
  isMobile: "(min-width: ".concat(breakPoints.sm, "px) and (max-width: ").concat(breakPoints.md - 1, "px)` }"),
  isDesktop: "(min-width: ".concat(defaultDevicesSizes.desktop, "px)")
};
//# sourceMappingURL=defaults.js.map