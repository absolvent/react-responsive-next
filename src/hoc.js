/* global require */

import debounce from 'lodash.debounce';
import mq from 'matchmediaquery';
import { MediaQueryWrapper } from './components';
import { defaultDevicesSizes, mediaQueries } from './defaults';

const React = require('react');

export const hoc = WrappedComponent => class ReactResponsiveNextHoc extends React.Component {

  static onResize() {
    const windowWidth = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    console.log('onResize', windowWidth, windowHeight);


    // console.log('onResize isDesktop', isDesktop.matches);
  }

  static onMediaQueryMatch(a1, a2) {
    console.log('onMediaQueryMatch', a1, a2);
  }

  static async getInitialProps(args = {}) {
    let newProps = {
      env: {},
    };

    if (args && args.req) {
      const device = eval('require(\'device\')');

      const checkEnvironment = ({ headers = {} } = {}) => {
        const ua = headers['user-agent'] || headers['User-Agent'] || '';
        const detectedDevice = device(ua);
        const detectedDeviceWidth = defaultDevicesSizes[detectedDevice.type] || null;
        return {
          detectedDeviceType: detectedDevice.type,
          detectedDeviceModel: detectedDevice.model,
          detectedDeviceWidth,
        }
      };
      newProps.env = checkEnvironment(args.req);
    } else {
      newProps.env = {
        detectedDeviceType: null,
        detectedDeviceName: null,
        detectedDeviceWidth: null,
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
    return newProps;
  }

  constructor(props) {
    super(props);
    const windowWidth = process.browser ? window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth : 1;
    const isDesktop = mq(mediaQueries.isDesktop, { width: windowWidth });
    isDesktop.addListener(ReactResponsiveNextHoc.onMediaQueryMatch);
    MediaQueryWrapper.fakeWidth = 1200;
    this.state = {
      env: {},
    };
  }

  componentDidMount() {
    ReactResponsiveNextHoc.onResize();
    this.onResizeHandler = debounce(ReactResponsiveNextHoc.onResize, 200);
    window.addEventListener('resize', this.onResizeHandler, false);
  }

  componentWillUnmount() {
    if (this.onResizeHandler) {
      window.removeEventListener('resize', this.onResizeHandler, false);
    }
  }

  render() {
    return (
      <div>
        <WrappedComponent {...this.state} {...this.props} />;
      </div>
    );
  }
};
