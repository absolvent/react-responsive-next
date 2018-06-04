import _Number$isNaN from "@babel/runtime/core-js/number/is-nan";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { defaultConfig, TAG } from './default-config';
import { ReactResponsiveConnect } from './react-responsive-connect';
import { getMedia } from './media';
import { getMediaMinWidthByType, getMediaMaxWidthByType, mediaQueryBuilder, isStringOrNumber, isString } from './helpers';
export var MediaQueryWrapper = function MediaQueryWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var children = props.children,
      isInvertMatch = props.isInvertMatch,
      other = _objectWithoutProperties(props, ["children", "isInvertMatch"]);

  var values = {
    deviceWidth: MediaQueryWrapper.fakeWidth,
    width: MediaQueryWrapper.fakeWidth
  };
  return React.createElement(MediaQuery, _extends({}, other, {
    values: values
  }), function (matches) {
    if (matches) {
      return isInvertMatch ? null : children;
    }

    return isInvertMatch ? children : null;
  });
};
MediaQueryWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  dispatch: PropTypes.func.isRequired,
  fakeWidth: PropTypes.number.isRequired,
  isInvertMatch: PropTypes.bool
};
MediaQueryWrapper.defaultProps = {
  isInvertMatch: false
};
MediaQueryWrapper.defaultProps = {
  children: null,
  component: 'div'
};
export var responsiveWrapper = function responsiveWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (p) {
    return MediaQueryWrapper(_objectSpread({}, props, p));
  };
};

var generateShowHideComponent = function generateShowHideComponent(isHideComponent) {
  return function (props) {
    var media = getMedia(ReactResponsiveConnect.customConfig || defaultConfig);
    var on = props.on,
        from = props.from,
        to = props.to,
        children = props.children;
    var fromValue = _Number$isNaN(Number(from)) ? getMediaMinWidthByType(from, media) : from;
    var toValue = _Number$isNaN(Number(to)) ? getMediaMaxWidthByType(to, media) : to;

    if (on) {
      if (media[on]) {
        return MediaQueryWrapper({
          query: media[on].mediaQuery,
          isInvertMatch: isHideComponent,
          children: children
        });
      }

      throw new Error("".concat(TAG, " No ").concat(on, " definition in media configuration"));
    }

    if (from !== undefined && to !== undefined) {
      return MediaQueryWrapper({
        query: mediaQueryBuilder(fromValue, toValue),
        isInvertMatch: isHideComponent,
        children: children
      });
    } else if (from !== undefined) {
      return MediaQueryWrapper({
        query: mediaQueryBuilder(fromValue, undefined),
        isInvertMatch: isHideComponent,
        children: children
      });
    } else if (to !== undefined) {
      return MediaQueryWrapper({
        query: mediaQueryBuilder(undefined, toValue),
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

    if (from !== undefined && !isStringOrNumber(from)) {
      return new Error("".concat(TAG, " Improper value type of the 'from' prop (").concat(from, "), only a String or a Number"));
    } else if (from && on) {
      return new Error("".concat(TAG, " Used excluding props from and on"));
    }

    return null;
  },
  on: function on(props) {
    var on = props.on,
        from = props.from,
        to = props.to;

    if (on && !isString(on)) {
      return new Error("".concat(TAG, " Improper value type of the 'on' prop (").concat(on, "), only a String"));
    } else if (on && (from || to)) {
      return new Error("".concat(TAG, " Used excluding props for and from or to!"));
    }

    return null;
  },
  to: function to(_ref) {
    var on = _ref.on,
        _to = _ref.to;

    if (_to !== undefined && !isStringOrNumber(_to)) {
      return new Error("".concat(TAG, " Improper value type of the 'to' prop (").concat(_to, "), only a String or a Number"));
    } else if (_to && on) {
      return new Error("".concat(TAG, " Used excluding props from and on"));
    }

    return null;
  }
};
export var Show = generateShowHideComponent(false);
Show.propTypes = propTypes;
export var Hide = generateShowHideComponent(true);
Hide.propTypes = propTypes;
var defaultMedia = getMedia(defaultConfig);
export var PhoneScreen = responsiveWrapper({
  query: defaultMedia.phone.mediaQuery
});
export var TabletScreen = responsiveWrapper({
  query: defaultMedia.tablet.mediaQuery
});
export var DesktopAndUpScreen = responsiveWrapper({
  query: defaultMedia.desktop.mediaQuery
});
export var PhoneAndTabletScreen = responsiveWrapper({
  query: "(max-width: ".concat(defaultMedia.tablet.maxWidth, "px)")
});
export var TabletAndUpScreen = responsiveWrapper({
  query: "(min-width: ".concat(defaultMedia.tablet.minWidth, "px)")
});
//# sourceMappingURL=components.js.map