export var getMedia = function getMedia(breakPoints) {
  return {
    phone: {
      mediaQuery: "(max-width: ".concat(breakPoints.tablet - 1, "px)"),
      defaultWidth: breakPoints.tablet - 1
    },
    tablet: {
      mediaQuery: "(min-width: ".concat(breakPoints.tablet, "px) and (max-width: ").concat(breakPoints.desktop - 1, "px)"),
      defaultWidth: breakPoints.tablet
    },
    desktop: {
      mediaQuery: "(min-width: ".concat(breakPoints.desktop, "px)"),
      defaultWidth: breakPoints.desktop
    }
  };
};
//# sourceMappingURL=media.js.map