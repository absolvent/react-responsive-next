import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { breakPoints } from './defaults';
import { getMedia } from './media';

var MediaQueryWrapper = function MediaQueryWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var children = props.children,
      other = _objectWithoutProperties(props, ["children"]);

  var values = {
    deviceWidth: MediaQueryWrapper.fakeWidth,
    width: MediaQueryWrapper.fakeWidth
  };
  return React.createElement(MediaQuery, _extends({}, other, {
    values: values
  }), children);
};

export { MediaQueryWrapper };
MediaQueryWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  dispatch: PropTypes.func.isRequired,
  fakeWidth: PropTypes.number.isRequired
};
MediaQueryWrapper.defaultProps = {
  children: null,
  component: 'div'
};
export var responsiveWrapper = function responsiveWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (p) {
    return MediaQueryWrapper(_extends({}, props, p));
  };
};
var media = getMedia(breakPoints);
export var PhoneScreen = responsiveWrapper({
  query: media.phone.mediaQuery
});
export var TabletScreen = responsiveWrapper({
  query: media.tablet.mediaQuery
});
export var DesktopAndUpScreen = responsiveWrapper({
  query: media.desktop.mediaQuery
});
export var PhoneAndTabletScreen = responsiveWrapper({
  query: "(max-width: ".concat(breakPoints.desktop - 1, "px)")
});
export var TabletAndUpScreen = responsiveWrapper({
  query: "(min-width: ".concat(breakPoints.tablet, "px)")
});
//# sourceMappingURL=components.js.map