import { TAG } from './default-config';

var getMediaByType = function getMediaByType(mediaType, media) {
  if (media[mediaType]) {
    return media[mediaType];
  }

  return media.desktop;
};

export var getMediaDefaultWidthByType = function getMediaDefaultWidthByType(mediaType, media) {
  var mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.minWidth ? mediaItem.minWidth : -1;
};
export var getMediaMinWidthByType = function getMediaMinWidthByType(mediaType, media) {
  var mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.minWidth ? mediaItem.minWidth : -1;
};
export var getMediaMaxWidthByType = function getMediaMaxWidthByType(mediaType, media) {
  var mediaItem = getMediaByType(mediaType, media);
  return mediaItem && mediaItem.maxWidth ? mediaItem.maxWidth : -1;
};
export var mediaQueryBuilder = function mediaQueryBuilder(from, to) {
  var mediaQueryParts = [];
  var fromNumeric = Number(from);
  var toNumeric = Number(to);
  if (!Number.isNaN(fromNumeric)) mediaQueryParts.push("(min-width: ".concat(from, "px)"));
  if (!Number.isNaN(toNumeric)) mediaQueryParts.push("(max-width: ".concat(to, "px)"));

  if (!Number.isNaN(fromNumeric) && !Number.isNaN(toNumeric) && fromNumeric > toNumeric) {
    throw new Error("".concat(TAG, " from (").concat(fromNumeric, ") value is larger than to (").concat(toNumeric, ") value"));
  }

  return mediaQueryParts.join(' and ');
};
export var isString = function isString(value) {
  return typeof value === 'string' || value instanceof String;
};
export var isStringOrNumber = function isStringOrNumber(value) {
  return typeof value === 'string' || value instanceof String || !Number.isNaN(Number(value));
};
//# sourceMappingURL=helpers.js.map