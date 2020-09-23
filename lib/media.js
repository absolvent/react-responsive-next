"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMedia = void 0;

var _helpers = require("./helpers");

var _defaultConfig = require("./default-config");

var createMediaFromBreakPoint = function createMediaFromBreakPoint(breakPoint) {
  var minWidth = !Number.isNaN(Number(breakPoint.from)) ? breakPoint.from : 1;
  var maxWidth = !Number.isNaN(Number(breakPoint.to)) ? breakPoint.to : Number.MAX_SAFE_INTEGER;
  return {
    mediaQuery: (0, _helpers.mediaQueryBuilder)(breakPoint.from, breakPoint.to),
    minWidth: minWidth,
    maxWidth: maxWidth,
    defaultWidth: minWidth
  };
};

var getMedia = function getMedia(config) {
  var breakPoints = config.breakPoints,
      devicesToBreakPoints = config.devicesToBreakPoints;
  if (breakPoints === undefined) throw new Error("".concat(_defaultConfig.TAG, " No breakPoints entry in react-responsive-next config"));
  if (devicesToBreakPoints === undefined) throw new Error("".concat(_defaultConfig.TAG, " No devicesToBreakPoints entry in react-responsive-next config"));
  var media = {};
  Object.keys(breakPoints).forEach(function (type) {
    media[type] = createMediaFromBreakPoint(breakPoints[type]);
  });
  Object.keys(devicesToBreakPoints).forEach(function (deviceType) {
    if (media[deviceType]) throw new Error("".concat(_defaultConfig.TAG, " ").concat(deviceType, " already defined in config.breakPoints"));
    if (!media[devicesToBreakPoints[deviceType]]) throw new Error("".concat(_defaultConfig.TAG, " Breakpoint ").concat(devicesToBreakPoints[deviceType], " from ").concat(deviceType, " doesn't exists in config.breakPoints"));
    media[deviceType] = media[devicesToBreakPoints[deviceType]];
  });
  return media;
};

exports.getMedia = getMedia;
//# sourceMappingURL=media.js.map