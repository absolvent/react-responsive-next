import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import isNaN from 'lodash/isNaN';
import { defaultConfig, TAG } from './default-config'
import { ReactResponsiveConnect } from './react-responsive-connect';
import { getMedia } from './media'
import { getMediaMinWidthByType, getMediaMaxWidthByType, mediaQueryBuilder, isStringOrNumber, isString } from './helpers'

export const MediaQueryWrapper = (props = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { children, isInvertMatch,  ...other } = props;
  const values = { deviceWidth: MediaQueryWrapper.fakeWidth, width: MediaQueryWrapper.fakeWidth };
  return (
    <MediaQuery {...other} {...{ values }} >
      {(matches) => {
        if (matches) {
          return isInvertMatch ? null : children;
        }
        return isInvertMatch ? children : null;
      }}
    </MediaQuery>
  )
};

MediaQueryWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  dispatch: PropTypes.func.isRequired,
  fakeWidth: PropTypes.number.isRequired,
  isInvertMatch: PropTypes.bool,
};

MediaQueryWrapper.defaultProps = {
  isInvertMatch: false,
};

MediaQueryWrapper.defaultProps = {
  children: null,
  component: 'div',
};

export const responsiveWrapper = (props = {}) => (p => MediaQueryWrapper({ ...props, ...p }));

const generateShowHideComponent = isHideComponent => (props) => {
  const media = getMedia(ReactResponsiveConnect.customConfig || defaultConfig);
  const {
    on,
    from,
    to,
    children,
  } = props;
  const fromValue = isNaN(Number(from)) ? getMediaMinWidthByType(from, media) : from;
  const toValue = isNaN(Number(to)) ? getMediaMaxWidthByType(to, media) : to;

  if (on) {
    if (media[on]) {
      return MediaQueryWrapper({
        query: media[on].mediaQuery,
        isInvertMatch: isHideComponent,
        children,
      });
    }
    throw new Error(`${TAG} No ${on} definition in media configuration`);
  }

  if (from !== undefined && to !== undefined) {
    return MediaQueryWrapper({
      query: mediaQueryBuilder(fromValue, toValue),
      isInvertMatch: isHideComponent,
      children,
    });
  } else if (from !== undefined) {
    return MediaQueryWrapper({
      query: mediaQueryBuilder(fromValue, undefined),
      isInvertMatch: isHideComponent,
      children,
    });
  } else if (to !== undefined) {
    return MediaQueryWrapper({
      query: mediaQueryBuilder(undefined, toValue),
      isInvertMatch: isHideComponent,
      children,
    });
  }
  return null;
};

const propTypes = {
  from: (props) => {
    const { on, from } = props;
    if (from !== undefined && !isStringOrNumber(from)) {
      return new Error(`${TAG} Improper value type of the 'from' prop (${from}), only a String or a Number`);
    } else if (from && on) {
      return new Error(`${TAG} Used excluding props from and on`);
    }
    return null
  },
  on: (props) => {
    const { on, from, to } = props;
    if (on && !isString(on)) {
      return new Error(`${TAG} Improper value type of the 'on' prop (${on}), only a String`);
    } else if (on && (from || to)) {
      return new Error(`${TAG} Used excluding props for and from or to!`);
    }
    return null;
  },
  to: ({ on, to }) => {
    if (to !== undefined && !isStringOrNumber(to)) {
      return new Error(`${TAG} Improper value type of the 'to' prop (${to}), only a String or a Number`);
    } else if (to && on) {
      return new Error(`${TAG} Used excluding props from and on`);
    }
    return null;
  },
};

export const Show = generateShowHideComponent(false);
Show.propTypes = propTypes;
Show.displayName = 'Show';

export const Hide = generateShowHideComponent(true);
Hide.propTypes = propTypes;
Hide.displayName = 'Hide';


// Legacy for versions < 0.8.0
// WARNING: Works only with the default config
const defaultMedia = getMedia(defaultConfig);
export const PhoneScreen = responsiveWrapper({ query: defaultMedia.phone.mediaQuery });
PhoneScreen.displayName = 'PhoneScreen';
export const TabletScreen = responsiveWrapper({ query: defaultMedia.tablet.mediaQuery });
TabletScreen.displayName = 'TabletScreen';
export const DesktopAndUpScreen = responsiveWrapper({ query: defaultMedia.desktop.mediaQuery });
DesktopAndUpScreen.displayName = 'DesktopAndUpScreen';
export const PhoneAndTabletScreen = responsiveWrapper({ query: `(max-width: ${defaultMedia.tablet.maxWidth}px)` });
PhoneAndTabletScreen.displayName = 'PhoneAndTabletScreen';
export const TabletAndUpScreen = responsiveWrapper({ query: `(min-width: ${defaultMedia.tablet.minWidth}px)` });
TabletAndUpScreen.displayName = 'TabletAndUpScreen';
