"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.TAG = void 0;
var TAG = '[react-responsive-next]';
exports.TAG = TAG;
var defaultConfig = {
  breakPoints: {
    sm: {
      to: 767
    },
    md: {
      from: 768,
      to: 1239
    },
    lg: {
      from: 1240
    }
  },
  devicesToBreakPoints: {
    phone: 'sm',
    tablet: 'md',
    car: 'md',
    desktop: 'lg',
    tv: 'lg',
    bot: 'lg',
    undefined: 'lg'
  }
};
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=default-config.js.map