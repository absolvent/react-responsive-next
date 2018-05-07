"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mediaQueries = exports.defaultDevicesSizes = exports.breakPoints = void 0;
var breakPoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xlg: 1800
};
exports.breakPoints = breakPoints;
var defaultDevicesSizes = {
  bot: breakPoints.lg - 1,
  phone: breakPoints.sm - 1,
  tablet: breakPoints.md - 1,
  car: breakPoints.md - 1,
  desktop: breakPoints.lg - 1,
  tv: breakPoints.xlg
};
exports.defaultDevicesSizes = defaultDevicesSizes;
var mediaQueries = {
  isMobile: "(min-width: ".concat(breakPoints.sm, "px) and (max-width: ").concat(breakPoints.md - 1, "px)` }"),
  isDesktop: "(min-width: ".concat(defaultDevicesSizes.desktop, "px)")
};
exports.mediaQueries = mediaQueries;
//# sourceMappingURL=defaults.js.map