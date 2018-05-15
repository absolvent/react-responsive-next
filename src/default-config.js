// based on bootstrap and  http://www.websitedimensions.com/
// these are the maximum values for the device type so <= phone is a phone,
// > phone && <= tablet is a tablet, and > tablet is a desktop
export const TAG = '[react-responsive-next]';
export const defaultConfig = {
  breakPoints: {
    sm: { to: 767 },
    md: { from: 768, to: 1279 },
    lg: { from: 1280 },
  },
  devicesToBreakPoints: {
    phone: 'sm',
    tablet: 'md',
    car: 'md',
    desktop: 'lg',
    tv: 'lg',
    bot: 'lg',
    undefined: 'lg',
  },
};
