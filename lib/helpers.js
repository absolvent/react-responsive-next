"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStringOrNumber = exports.isString = exports.mediaQueryBuilder = exports.getMediaMaxWidthByType = exports.getMediaMinWidthByType = exports.getMediaDefaultWidthByType = void 0;

var _isNan = _interopRequireDefault(require("@babel/runtime/core-js/number/is-nan"));

var _defaultConfig = require("./default-config");

var getMediaByType = function getMediaByType(mediaType, media) {
  if (media[mediaType]) {
    return media[mediaType];
  }

  return media.desktop;
};

var getMediaDefaultWidthByType = function getMediaDefaultWidthByType(mediaType, media) {
  var mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.minWidth ? mediaItem.minWidth : -1;
};

exports.getMediaDefaultWidthByType = getMediaDefaultWidthByType;

var getMediaMinWidthByType = function getMediaMinWidthByType(mediaType, media) {
  var mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.minWidth ? mediaItem.minWidth : -1;
};

exports.getMediaMinWidthByType = getMediaMinWidthByType;

var getMediaMaxWidthByType = function getMediaMaxWidthByType(mediaType, media) {
  var mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.maxWidth ? mediaItem.maxWidth : -1;
};

exports.getMediaMaxWidthByType = getMediaMaxWidthByType;

var mediaQueryBuilder = function mediaQueryBuilder(from, to) {
  var mediaQueryParts = [];
  var fromNumeric = Number(from);
  var toNumeric = Number(to);
  if (!(0, _isNan.default)(fromNumeric)) mediaQueryParts.push("(min-width: ".concat(from, "px)"));
  if (!(0, _isNan.default)(toNumeric)) mediaQueryParts.push("(max-width: ".concat(to, "px)"));

  if (!(0, _isNan.default)(fromNumeric) && !(0, _isNan.default)(toNumeric) && fromNumeric > toNumeric) {
    throw new Error("".concat(_defaultConfig.TAG, " from (").concat(fromNumeric, ") value is larger than to (").concat(toNumeric, ") value"));
  }

  return mediaQueryParts.join(' and ');
};

exports.mediaQueryBuilder = mediaQueryBuilder;

var isString = function isString(value) {
  return typeof value === 'string' || value instanceof String;
};

exports.isString = isString;

var isStringOrNumber = function isStringOrNumber(value) {
  return typeof value === 'string' || value instanceof String || !(0, _isNan.default)(Number(value));
};

exports.isStringOrNumber = isStringOrNumber;
//# sourceMappingURL=helpers.js.map