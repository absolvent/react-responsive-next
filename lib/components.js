"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabletAndUpScreen = exports.PhoneAndTabletScreen = exports.DesktopAndUpScreen = exports.TabletScreen = exports.PhoneScreen = exports.Hide = exports.Show = exports.responsiveWrapper = exports.MediaQueryWrapper = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactResponsive = _interopRequireDefault(require("react-responsive"));

var _isNaN = _interopRequireDefault(require("lodash/isNaN"));

var _defaultConfig = require("./default-config");

var _reactResponsiveConnect = require("./react-responsive-connect");

var _media = require("./media");

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MediaQueryWrapper = function MediaQueryWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var values = {
    deviceWidth: 1,
    width: 1
  };
  var children = props.children,
      isInvertMatch = props.isInvertMatch,
      other = (0, _objectWithoutProperties2["default"])(props, ["children", "isInvertMatch"]);

  if (process.browser) {
    values.deviceWidth = MediaQueryWrapper.fakeWidth;
    values.width = MediaQueryWrapper.fakeWidth;
  } else {
    var contextService = require('request-context');

    var width = contextService.get('request:responsive.detectedMediaWidth');
    values.deviceWidth = width;
    values.width = width;
  }

  return _react["default"].createElement(_reactResponsive["default"], (0, _extends2["default"])({}, other, {
    values: values
  }), function (matches) {
    if (matches) {
      return isInvertMatch ? null : children;
    }

    return isInvertMatch ? children : null;
  });
};

exports.MediaQueryWrapper = MediaQueryWrapper;
MediaQueryWrapper.propTypes = {
  children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  component: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func, _propTypes["default"].string]),
  dispatch: _propTypes["default"].func.isRequired,
  fakeWidth: _propTypes["default"].number.isRequired,
  isInvertMatch: _propTypes["default"].bool
};
MediaQueryWrapper.defaultProps = {
  isInvertMatch: false
};
MediaQueryWrapper.defaultProps = {
  children: null,
  component: 'div'
};

var responsiveWrapper = function responsiveWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (p) {
    return MediaQueryWrapper(_objectSpread(_objectSpread({}, props), p));
  };
};

exports.responsiveWrapper = responsiveWrapper;

var generateShowHideComponent = function generateShowHideComponent(isHideComponent) {
  return function (props) {
    var media = (0, _media.getMedia)(_reactResponsiveConnect.ReactResponsiveConnect.customConfig || _defaultConfig.defaultConfig);
    var on = props.on,
        from = props.from,
        to = props.to,
        children = props.children;
    var fromValue = (0, _isNaN["default"])(Number(from)) ? (0, _helpers.getMediaMinWidthByType)(from, media) : from;
    var toValue = (0, _isNaN["default"])(Number(to)) ? (0, _helpers.getMediaMaxWidthByType)(to, media) : to;

    if (on) {
      if (media[on]) {
        return MediaQueryWrapper({
          query: media[on].mediaQuery,
          isInvertMatch: isHideComponent,
          children: children
        });
      }

      throw new Error("".concat(_defaultConfig.TAG, " No ").concat(on, " definition in media configuration"));
    }

    if (from !== undefined && to !== undefined) {
      return MediaQueryWrapper({
        query: (0, _helpers.mediaQueryBuilder)(fromValue, toValue),
        isInvertMatch: isHideComponent,
        children: children
      });
    } else if (from !== undefined) {
      return MediaQueryWrapper({
        query: (0, _helpers.mediaQueryBuilder)(fromValue, undefined),
        isInvertMatch: isHideComponent,
        children: children
      });
    } else if (to !== undefined) {
      return MediaQueryWrapper({
        query: (0, _helpers.mediaQueryBuilder)(undefined, toValue),
        isInvertMatch: isHideComponent,
        children: children
      });
    }

    return null;
  };
};

var propTypes = {
  from: function from(props) {
    var on = props.on,
        from = props.from;

    if (from !== undefined && !(0, _helpers.isStringOrNumber)(from)) {
      return new Error("".concat(_defaultConfig.TAG, " Improper value type of the 'from' prop (").concat(from, "), only a String or a Number"));
    } else if (from && on) {
      return new Error("".concat(_defaultConfig.TAG, " Used excluding props from and on"));
    }

    return null;
  },
  on: function on(props) {
    var on = props.on,
        from = props.from,
        to = props.to;

    if (on && !(0, _helpers.isString)(on)) {
      return new Error("".concat(_defaultConfig.TAG, " Improper value type of the 'on' prop (").concat(on, "), only a String"));
    } else if (on && (from || to)) {
      return new Error("".concat(_defaultConfig.TAG, " Used excluding props for and from or to!"));
    }

    return null;
  },
  to: function to(_ref) {
    var on = _ref.on,
        _to = _ref.to;

    if (_to !== undefined && !(0, _helpers.isStringOrNumber)(_to)) {
      return new Error("".concat(_defaultConfig.TAG, " Improper value type of the 'to' prop (").concat(_to, "), only a String or a Number"));
    } else if (_to && on) {
      return new Error("".concat(_defaultConfig.TAG, " Used excluding props from and on"));
    }

    return null;
  }
};
var Show = generateShowHideComponent(false);
exports.Show = Show;
Show.propTypes = propTypes;
Show.displayName = 'Show';
var Hide = generateShowHideComponent(true);
exports.Hide = Hide;
Hide.propTypes = propTypes;
Hide.displayName = 'Hide';
var defaultMedia = (0, _media.getMedia)(_defaultConfig.defaultConfig);
var PhoneScreen = responsiveWrapper({
  query: defaultMedia.phone.mediaQuery
});
exports.PhoneScreen = PhoneScreen;
PhoneScreen.displayName = 'PhoneScreen';
var TabletScreen = responsiveWrapper({
  query: defaultMedia.tablet.mediaQuery
});
exports.TabletScreen = TabletScreen;
TabletScreen.displayName = 'TabletScreen';
var DesktopAndUpScreen = responsiveWrapper({
  query: defaultMedia.desktop.mediaQuery
});
exports.DesktopAndUpScreen = DesktopAndUpScreen;
DesktopAndUpScreen.displayName = 'DesktopAndUpScreen';
var PhoneAndTabletScreen = responsiveWrapper({
  query: "(max-width: ".concat(defaultMedia.tablet.maxWidth, "px)")
});
exports.PhoneAndTabletScreen = PhoneAndTabletScreen;
PhoneAndTabletScreen.displayName = 'PhoneAndTabletScreen';
var TabletAndUpScreen = responsiveWrapper({
  query: "(min-width: ".concat(defaultMedia.tablet.minWidth, "px)")
});
exports.TabletAndUpScreen = TabletAndUpScreen;
TabletAndUpScreen.displayName = 'TabletAndUpScreen';
//# sourceMappingURL=components.js.map