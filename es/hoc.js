import _Object$getPrototypeOf from "@babel/runtime/core-js/object/get-prototype-of";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _extends from "@babel/runtime/helpers/extends";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import debounce from 'lodash.debounce';
import mq from 'matchmediaquery';
import { MediaQueryWrapper } from './components';
import { defaultDevicesSizes, mediaQueries } from './defaults';

var React = require('react');

export var hoc = function hoc(WrappedComponent) {
  return function (_React$Component) {
    _inherits(ReactResponsiveNextHoc, _React$Component);

    _createClass(ReactResponsiveNextHoc, null, [{
      key: "onResize",
      value: function onResize() {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        console.log('onResize', windowWidth, windowHeight);
      }
    }, {
      key: "onMediaQueryMatch",
      value: function onMediaQueryMatch(a1, a2) {
        console.log('onMediaQueryMatch', a1, a2);
      }
    }, {
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
          var args,
              newProps,
              device,
              checkEnvironment,
              newArgs,
              _args = arguments;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  args = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  newProps = {
                    env: {}
                  };

                  if (args && args.req) {
                    device = eval('require(\'device\')');

                    checkEnvironment = function checkEnvironment() {
                      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                          _ref$headers = _ref.headers,
                          headers = _ref$headers === void 0 ? {} : _ref$headers;

                      var ua = headers['user-agent'] || headers['User-Agent'] || '';
                      var detectedDevice = device(ua);
                      var detectedDeviceWidth = defaultDevicesSizes[detectedDevice.type] || null;
                      return {
                        detectedDeviceType: detectedDevice.type,
                        detectedDeviceModel: detectedDevice.model,
                        detectedDeviceWidth: detectedDeviceWidth
                      };
                    };

                    newProps.env = checkEnvironment(args.req);
                  } else {
                    newProps.env = {
                      detectedDeviceType: null,
                      detectedDeviceName: null,
                      detectedDeviceWidth: null
                    };
                  }

                  newArgs = _extends({}, args, newProps);

                  if (!WrappedComponent.getInitialProps) {
                    _context.next = 12;
                    break;
                  }

                  _context.t0 = _extends;
                  _context.t1 = {};
                  _context.t2 = newProps;
                  _context.next = 10;
                  return WrappedComponent.getInitialProps(newArgs);

                case 10:
                  _context.t3 = _context.sent;
                  newProps = (0, _context.t0)(_context.t1, _context.t2, _context.t3);

                case 12:
                  return _context.abrupt("return", newProps);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function getInitialProps() {
          return _getInitialProps.apply(this, arguments);
        };
      }()
    }]);

    function ReactResponsiveNextHoc(props) {
      var _this;

      _classCallCheck(this, ReactResponsiveNextHoc);

      _this = _possibleConstructorReturn(this, (ReactResponsiveNextHoc.__proto__ || _Object$getPrototypeOf(ReactResponsiveNextHoc)).call(this, props));
      var windowWidth = process.browser ? window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth : 1;
      var isDesktop = mq(mediaQueries.isDesktop, {
        width: windowWidth
      });
      isDesktop.addListener(ReactResponsiveNextHoc.onMediaQueryMatch);
      MediaQueryWrapper.fakeWidth = 1200;
      _this.state = {
        env: {}
      };
      return _this;
    }

    _createClass(ReactResponsiveNextHoc, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        ReactResponsiveNextHoc.onResize();
        this.onResizeHandler = debounce(ReactResponsiveNextHoc.onResize, 200);
        window.addEventListener('resize', this.onResizeHandler, false);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.onResizeHandler) {
          window.removeEventListener('resize', this.onResizeHandler, false);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", null, React.createElement(WrappedComponent, _extends({}, this.state, this.props)), ";");
      }
    }]);

    return ReactResponsiveNextHoc;
  }(React.Component);
};
//# sourceMappingURL=hoc.js.map