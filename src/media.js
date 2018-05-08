// Must be correlated with devices-sizes entries !
export const getMedia = breakPoints => ({
  phone: {
    mediaQuery: `(max-width: ${breakPoints.tablet - 1}px)`,
    defaultWidth: breakPoints.tablet - 1,
  },
  tablet: {
    mediaQuery: `(min-width: ${breakPoints.tablet}px) and (max-width: ${breakPoints.desktop - 1}px)`,
    defaultWidth: breakPoints.tablet,
  },
  desktop: {
    mediaQuery: `(min-width: ${breakPoints.desktop}px)`,
    defaultWidth: breakPoints.desktop,
  },
});
