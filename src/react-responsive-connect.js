/* global require */

import debounce from 'lodash.debounce';
import matchMediaQuery from 'matchmediaquery';
import PropTypes from 'prop-types';
import Cookies from 'isomorphic-cookie';
import React from 'react';
import { MediaQueryWrapper } from './components';
import { getMedia } from './media';
import { defaultConfig } from './default-config';

export const ReactResponsiveConnect = WrappedComponent =>
  class ReactResponsiveNextHoc extends React.Component {

    static customConfig = null;

    static updateDeviceTypeByViewportSize() {
      let detectedMedia = null;
      ReactResponsiveNextHoc.mediaQueriesMatchers.forEach((mediaItem) => {
        if (mediaItem.matcher.matches) {
          if (!detectedMedia
            || (detectedMedia && detectedMedia.defaultWidth < mediaItem.defaultWidth)) {
            detectedMedia = mediaItem;
          }
        }
      });
      const previouslyDetectedMediaWidth = Cookies.load('detectedMediaWidth') || null;

      Cookies.save('detectedMediaWidth', detectedMedia.defaultWidth, { secure: false });
      Cookies.save('detectedMediaType', detectedMedia.type, { secure: false });

      if (!previouslyDetectedMediaWidth) {
        const initialWidth = Cookies.load('initialMediaWidth') || null;
        if (initialWidth !== detectedMedia.defaultWidth) {
          window.location.reload();
        }
      }
    }

    static propTypes = {
      config: PropTypes.shape({
        breakPoints: PropTypes.any,
        devicesToBreakPoints: PropTypes.any,
      }),
    };

    static defaultProps = {
      config: ReactResponsiveConnect.customConfig || defaultConfig,
    };

    static onResize() {
      ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();
    }

    static onBeforeUnload() {
      ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();
    }

    static reloadPageIfIncorrectWidthDetected() {
      const previouslyDetectedMediaWidth = Cookies.load('detectedMediaWidth') || null;
      ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();
      const detectedMediaWidth = Cookies.load('detectedMediaWidth');
      if (previouslyDetectedMediaWidth && (detectedMediaWidth !== previouslyDetectedMediaWidth)) {
        window.location.reload();
      }
    }

    static async getInitialProps(args = {}) {
      let newProps = {
        env: {},
      };

      if (args && args.req) {
        const device = eval('require(\'device\')'); // it's not bundled to a browser js
        const detectedMediaType = Cookies.load('detectedMediaType', args.req);
        const detectedMediaWidth = Cookies.load('detectedMediaWidth', args.req);
        const checkEnvironment = ({ headers = {} } = {}) => {
          const ua = headers['user-agent'] || headers['User-Agent'] || '';
          const detectedDevice = device(ua);
          return {
            userAgentMediaType: detectedDevice.type,
            detectedMediaType: detectedMediaType || detectedDevice.type,
            detectedMediaWidth: detectedMediaWidth
              || ReactResponsiveNextHoc.getDefaultMediaWidthByType(detectedDevice.type),
            detectedMediaModel: detectedDevice.model || null,
          }
        };
        newProps.env = checkEnvironment(args.req);
        args.res.cookie('initialMediaWidth', newProps.env.detectedMediaWidth, { maxAge: 60000, httpOnly: false });
      } else {
        newProps.env = {
          userAgentMediaType: null,
          detectedMediaType: null,
          detectedMediaWidth: 0,
          detectedMediaModel: null,
        };
      }
      const newArgs = {
        ...args,
        ...newProps,
      };
      if (WrappedComponent.getInitialProps) {
        newProps = {
          ...newProps,
          ...await WrappedComponent.getInitialProps(newArgs),
        };
      }
      if (process.browser) {
        MediaQueryWrapper.fakeWidth = newProps.env.detectedMediaWidth;
      } else {
        const contextService = require('request-context');
        contextService.set('request:responsive', newProps.env);
      }

      return newProps;
    }

    static getDefaultMediaWidthByType(mediaType) {
      const media = getMedia(ReactResponsiveConnect.customConfig || defaultConfig);
      if (media[mediaType]) {
        return media[mediaType].defaultWidth;
      }
      return media.desktop.defaultWidth;
    }

    static getBrowserWidth() {
      if (process.browser) {
        return window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
      }
      return -1;
    }

    constructor(props) {
      super(props);

      ReactResponsiveNextHoc.mediaQueriesMatchers = [];
      const { config } = this.props;
      const media = getMedia(config);

      Object.keys(media).forEach((type) => {
        const { mediaQuery, defaultWidth } = media[type];
        const matcher = matchMediaQuery(mediaQuery, {
          width: ReactResponsiveNextHoc.getBrowserWidth(),
        });
        ReactResponsiveNextHoc.mediaQueriesMatchers.push({
          type,
          matcher,
          defaultWidth,
        })
      });

      this.state = {
        env: {},
      };
    }

    componentDidMount() {
      this.onResizeHandler = debounce(ReactResponsiveNextHoc.onResize, 200);
      window.addEventListener('resize', this.onResizeHandler, false);
      window.addEventListener('beforeunload', ReactResponsiveNextHoc.onBeforeUnload, false);

      ReactResponsiveNextHoc.reloadPageIfIncorrectWidthDetected()
    }

    componentWillUnmount() {
      if (this.onResizeHandler) {
        window.removeEventListener('resize', this.onResizeHandler, false);
      }
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
