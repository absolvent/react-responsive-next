"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabletAndUpScreen = exports.PhoneAndTabletScreen = exports.DesktopAndUpScreen = exports.TabletScreen = exports.PhoneScreen = exports.responsiveWrapper = exports.MediaQueryWrapper = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactResponsive = _interopRequireDefault(require("react-responsive"));

var _defaults = require("./defaults");

var _media = require("./media");

var MediaQueryWrapper = function MediaQueryWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var children = props.children,
      other = (0, _objectWithoutProperties2.default)(props, ["children"]);
  var values = {
    deviceWidth: MediaQueryWrapper.fakeWidth,
    width: MediaQueryWrapper.fakeWidth
  };
  return _react.default.createElement(_reactResponsive.default, (0, _extends2.default)({}, other, {
    values: values
  }), children);
};

exports.MediaQueryWrapper = MediaQueryWrapper;
MediaQueryWrapper.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func, _propTypes.default.string]),
  dispatch: _propTypes.default.func.isRequired,
  fakeWidth: _propTypes.default.number.isRequired
};
MediaQueryWrapper.defaultProps = {
  children: null,
  component: 'div'
};

var responsiveWrapper = function responsiveWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (p) {
    return MediaQueryWrapper((0, _extends2.default)({}, props, p));
  };
};

exports.responsiveWrapper = responsiveWrapper;
var media = (0, _media.getMedia)(_defaults.breakPoints);
var PhoneScreen = responsiveWrapper({
  query: media.phone.mediaQuery
});
exports.PhoneScreen = PhoneScreen;
var TabletScreen = responsiveWrapper({
  query: media.tablet.mediaQuery
});
exports.TabletScreen = TabletScreen;
var DesktopAndUpScreen = responsiveWrapper({
  query: media.desktop.mediaQuery
});
exports.DesktopAndUpScreen = DesktopAndUpScreen;
var PhoneAndTabletScreen = responsiveWrapper({
  query: "(max-width: ".concat(_defaults.breakPoints.desktop - 1, "px)")
});
exports.PhoneAndTabletScreen = PhoneAndTabletScreen;
var TabletAndUpScreen = responsiveWrapper({
  query: "(min-width: ".concat(_defaults.breakPoints.tablet, "px)")
});
exports.TabletAndUpScreen = TabletAndUpScreen;
//# sourceMappingURL=components.js.map