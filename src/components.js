import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import { breakPoints } from './defaults'
import { getMedia } from './media'

export const MediaQueryWrapper = (props = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { children, ...other } = props;
  const values = { deviceWidth: MediaQueryWrapper.fakeWidth, width: MediaQueryWrapper.fakeWidth };
  return (
    <MediaQuery {...other} {...{ values }} >
      {children}
    </MediaQuery>
  )
};

MediaQueryWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  dispatch: PropTypes.func.isRequired,
  fakeWidth: PropTypes.number.isRequired,
};

MediaQueryWrapper.defaultProps = {
  children: null,
  component: 'div',
};

export const responsiveWrapper = (props = {}) => (p => MediaQueryWrapper({ ...props, ...p }));

const media = getMedia(breakPoints);

export const PhoneScreen = responsiveWrapper({ query: media.phone.mediaQuery });
export const TabletScreen = responsiveWrapper({ query: media.tablet.mediaQuery });
export const DesktopScreen = responsiveWrapper({ query: media.desktop.mediaQuery });
export const PhoneTabletScreen = responsiveWrapper({ query: `(max-width: ${breakPoints.desktop - 1}px)` });
export const TabletDesktopScreen = responsiveWrapper({ query: `(min-width: ${breakPoints.tablet}px)` });
