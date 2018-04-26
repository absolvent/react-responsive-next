// see also components/ScreenSize for another way to consume this data
import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import { breakPoints } from './defaults'

export const MediaQueryWrapper = (props = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { children, ...other } = props;
  const values = { deviceWidth: MediaQuery.fakeWidth, width: MediaQuery.fakeWidth };
  return (
    <MediaQuery {...other} {...{ values }} >
      {children}
    </MediaQuery>
  )
}

MediaQuery.fakeWidth = 0;

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


export const TestScreen = MediaQueryWrapper({ query: '(max-width: 1224px)' });
export const XsScreen = responsiveWrapper({ maxWidth: breakPoints.sm - 1 })
export const SmScreen = responsiveWrapper({ query: `(min-width: ${breakPoints.sm}px) and (max-width: ${breakPoints.md - 1}px)` })
export const MdScreen = responsiveWrapper({ query: `(min-width: ${breakPoints.md}px) and (max-width: ${breakPoints.lg - 1}px)` })
export const LgScreen = responsiveWrapper({ query: `(min-width: ${breakPoints.lg}px)` })

export const XsScreenHidden = responsiveWrapper({ minWidth: breakPoints.sm })
export const SmScreenHidden = responsiveWrapper({ query: `(max-width: ${breakPoints.sm - 1}px), (min-width: ${breakPoints.md}px)` })
export const MdScreenHidden = responsiveWrapper({ query: `(max-width: ${breakPoints.md - 1}px), (min-width: ${breakPoints.lg}px)` })
export const LgScreenHidden = responsiveWrapper({ maxWidth: breakPoints.lg - 1 })

export { XsScreen as PhoneScreen }
export { SmScreen as TabletScreen }
export const DesktopScreen = responsiveWrapper({ minWidth: breakPoints.md })
export const MobileScreen = responsiveWrapper({ maxWidth: breakPoints.md - 1 })

export { XsScreenHidden as PhoneScreenHidden }
export { SmScreenHidden as TabletScreenHidden }
export { MobileScreen as DesktopScreenHidden }
export { DesktopScreen as MobileScreenHidden }
