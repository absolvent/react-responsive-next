import _extends from "@babel/runtime/helpers/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import debounce from 'lodash.debounce';
import matchMediaQuery from 'matchmediaquery';
import PropTypes from 'prop-types';
import Cookies from 'isomorphic-cookie';
import React from 'react';
import { MediaQueryWrapper } from './components';
import { getMedia } from './media';
import { defaultConfig } from './default-config';
export var ReactResponsiveConnect = function ReactResponsiveConnect(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(ReactResponsiveNextHoc, _React$Component);

    var _super = _createSuper(ReactResponsiveNextHoc);

    _createClass(ReactResponsiveNextHoc, null, [{
      key: "updateDeviceTypeByViewportSize",
      value: function updateDeviceTypeByViewportSize() {
        var detectedMedia = null;
        ReactResponsiveNextHoc.mediaQueriesMatchers.forEach(function (mediaItem) {
          if (mediaItem.matcher.matches) {
            if (!detectedMedia || detectedMedia && detectedMedia.defaultWidth < mediaItem.defaultWidth) {
              detectedMedia = mediaItem;
            }
          }
        });
        var previouslyDetectedMediaWidth = Cookies.load('detectedMediaWidth') || null;
        Cookies.save('detectedMediaWidth', detectedMedia.defaultWidth, {
          secure: false
        });
        Cookies.save('detectedMediaType', detectedMedia.type, {
          secure: false
        });

        if (!previouslyDetectedMediaWidth) {
          var initialWidth = Cookies.load('initialMediaWidth') || null;

          if (initialWidth !== detectedMedia.defaultWidth) {
            window.location.reload();
          }
        }
      }
    }, {
      key: "onResize",
      value: function onResize() {
        ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();
      }
    }, {
      key: "onBeforeUnload",
      value: function onBeforeUnload() {
        ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();
      }
    }, {
      key: "reloadPageIfIncorrectWidthDetected",
      value: function reloadPageIfIncorrectWidthDetected() {
        var previouslyDetectedMediaWidth = Cookies.load('detectedMediaWidth') || null;
        ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();
        var detectedMediaWidth = Cookies.load('detectedMediaWidth');

        if (previouslyDetectedMediaWidth && detectedMediaWidth !== previouslyDetectedMediaWidth) {
          window.location.reload();
        }
      }
    }, {
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
          var args,
              newProps,
              device,
              detectedMediaType,
              detectedMediaWidth,
              checkEnvironment,
              newArgs,
              contextService,
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
                    detectedMediaType = Cookies.load('detectedMediaType', args.req);
                    detectedMediaWidth = Cookies.load('detectedMediaWidth', args.req);

                    checkEnvironment = function checkEnvironment() {
                      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                          _ref$headers = _ref.headers,
                          headers = _ref$headers === void 0 ? {} : _ref$headers;

                      var ua = headers['user-agent'] || headers['User-Agent'] || '';
                      var detectedDevice = device(ua);
                      return {
                        userAgentMediaType: detectedDevice.type,
                        detectedMediaType: detectedMediaType || detectedDevice.type,
                        detectedMediaWidth: detectedMediaWidth || ReactResponsiveNextHoc.getDefaultMediaWidthByType(detectedDevice.type),
                        detectedMediaModel: detectedDevice.model || null
                      };
                    };

                    newProps.env = checkEnvironment(args.req);
                    args.res.cookie('initialMediaWidth', newProps.env.detectedMediaWidth, {
                      maxAge: 60000,
                      httpOnly: false
                    });
                  } else {
                    newProps.env = {
                      userAgentMediaType: null,
                      detectedMediaType: null,
                      detectedMediaWidth: 0,
                      detectedMediaModel: null
                    };
                  }

                  newArgs = _objectSpread(_objectSpread({}, args), newProps);

                  if (!WrappedComponent.getInitialProps) {
                    _context.next = 11;
                    break;
                  }

                  _context.t0 = _objectSpread;
                  _context.t1 = _objectSpread({}, newProps);
                  _context.next = 9;
                  return WrappedComponent.getInitialProps(newArgs);

                case 9:
                  _context.t2 = _context.sent;
                  newProps = (0, _context.t0)(_context.t1, _context.t2);

                case 11:
                  if (process.browser) {
                    MediaQueryWrapper.fakeWidth = newProps.env.detectedMediaWidth;
                  } else {
                    contextService = require('request-context');
                    contextService.set('request:responsive', newProps.env);
                  }

                  return _context.abrupt("return", newProps);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function getInitialProps() {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }, {
      key: "getDefaultMediaWidthByType",
      value: function getDefaultMediaWidthByType(mediaType) {
        var media = getMedia(ReactResponsiveConnect.customConfig || defaultConfig);

        if (media[mediaType]) {
          return media[mediaType].defaultWidth;
        }

        return media.desktop.defaultWidth;
      }
    }, {
      key: "getBrowserWidth",
      value: function getBrowserWidth() {
        if (process.browser) {
          return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }

        return -1;
      }
    }]);

    function ReactResponsiveNextHoc(props) {
      var _this;

      _classCallCheck(this, ReactResponsiveNextHoc);

      _this = _super.call(this, props);
      ReactResponsiveNextHoc.mediaQueriesMatchers = [];
      var config = _this.props.config;
      var media = getMedia(config);
      Object.keys(media).forEach(function (type) {
        var _media$type = media[type],
            mediaQuery = _media$type.mediaQuery,
            defaultWidth = _media$type.defaultWidth;
        var matcher = matchMediaQuery(mediaQuery, {
          width: ReactResponsiveNextHoc.getBrowserWidth()
        });
        ReactResponsiveNextHoc.mediaQueriesMatchers.push({
          type: type,
          matcher: matcher,
          defaultWidth: defaultWidth
        });
      });
      _this.state = {
        env: {}
      };
      return _this;
    }

    _createClass(ReactResponsiveNextHoc, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.onResizeHandler = debounce(ReactResponsiveNextHoc.onResize, 200);
        window.addEventListener('resize', this.onResizeHandler, false);
        window.addEventListener('beforeunload', ReactResponsiveNextHoc.onBeforeUnload, false);
        ReactResponsiveNextHoc.reloadPageIfIncorrectWidthDetected();
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
        return React.createElement(WrappedComponent, _extends({}, this.state, this.props));
      }
    }]);

    return ReactResponsiveNextHoc;
  }(React.Component), _class.customConfig = null, _class.propTypes = {
    config: PropTypes.shape({
      breakPoints: PropTypes.any,
      devicesToBreakPoints: PropTypes.any
    })
  }, _class.defaultProps = {
    config: ReactResponsiveConnect.customConfig || defaultConfig
  }, _temp;
};
//# sourceMappingURL=react-responsive-connect.js.map