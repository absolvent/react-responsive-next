// based on bootstrap and  http://www.websitedimensions.com/
// these are the maximum values for the device type so <= phone is a phone,
// > phone && <= tablet is a tablet, and > tablet is a desktop
export const breakPoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xlg: 1800,
};

export const defaultDevicesSizes = {
  bot: breakPoints.lg - 1,
  phone: breakPoints.sm - 1,
  tablet: breakPoints.md - 1,
  car: breakPoints.md - 1,
  desktop: breakPoints.lg - 1,
  tv: breakPoints.xlg,
};

export const mediaQueries = {
  isPhone: `(max-width: ${defaultDevicesSizes.phone}px)`,
  isTablet: `(min-width: ${breakPoints.md}px) and (max-width: ${breakPoints.lg - 1}px)`,
  isDesktop: `(min-width: ${defaultDevicesSizes.desktop}px)`,
};
