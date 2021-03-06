"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactResponsiveConnect = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _matchmediaquery = _interopRequireDefault(require("matchmediaquery"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isomorphicCookie = _interopRequireDefault(require("isomorphic-cookie"));

var _react = _interopRequireDefault(require("react"));

var _components = require("./components");

var _media = require("./media");

var _defaultConfig = require("./default-config");

var ReactResponsiveConnect = function ReactResponsiveConnect(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    (0, _inherits2.default)(ReactResponsiveNextHoc, _React$Component);
    (0, _createClass2.default)(ReactResponsiveNextHoc, null, [{
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
        var previouslyDetectedMediaWidth = _isomorphicCookie.default.load('detectedMediaWidth') || null;

        _isomorphicCookie.default.save('detectedMediaWidth', detectedMedia.defaultWidth, {
          secure: false
        });

        _isomorphicCookie.default.save('detectedMediaType', detectedMedia.type, {
          secure: false
        });

        if (!previouslyDetectedMediaWidth) {
          var initialWidth = _isomorphicCookie.default.load('initialMediaWidth') || null;

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
        var previouslyDetectedMediaWidth = _isomorphicCookie.default.load('detectedMediaWidth') || null;
        ReactResponsiveNextHoc.updateDeviceTypeByViewportSize();

        var detectedMediaWidth = _isomorphicCookie.default.load('detectedMediaWidth');

        if (previouslyDetectedMediaWidth && detectedMediaWidth !== previouslyDetectedMediaWidth) {
          window.location.reload();
        }
      }
    }, {
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
          var args,
              newProps,
              device,
              detectedMediaType,
              detectedMediaWidth,
              checkEnvironment,
              newArgs,
              contextService,
              _args = arguments;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  args = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  newProps = {
                    env: {}
                  };

                  if (args && args.req) {
                    device = eval('require(\'device\')');
                    detectedMediaType = _isomorphicCookie.default.load('detectedMediaType', args.req);
                    detectedMediaWidth = _isomorphicCookie.default.load('detectedMediaWidth', args.req);

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

                  newArgs = (0, _extends2.default)({}, args, newProps);

                  if (!WrappedComponent.getInitialProps) {
                    _context.next = 12;
                    break;
                  }

                  _context.t0 = _extends2.default;
                  _context.t1 = {};
                  _context.t2 = newProps;
                  _context.next = 10;
                  return WrappedComponent.getInitialProps(newArgs);

                case 10:
                  _context.t3 = _context.sent;
                  newProps = (0, _context.t0)(_context.t1, _context.t2, _context.t3);

                case 12:
                  if (process.browser) {
                    _components.MediaQueryWrapper.fakeWidth = newProps.env.detectedMediaWidth;
                  } else {
                    contextService = require('request-context');
                    contextService.set('request:responsive', newProps.env);
                  }

                  return _context.abrupt("return", newProps);

                case 14:
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
    }, {
      key: "getDefaultMediaWidthByType",
      value: function getDefaultMediaWidthByType(mediaType) {
        var media = (0, _media.getMedia)(ReactResponsiveConnect.customConfig || _defaultConfig.defaultConfig);

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

      (0, _classCallCheck2.default)(this, ReactResponsiveNextHoc);
      _this = (0, _possibleConstructorReturn2.default)(this, (ReactResponsiveNextHoc.__proto__ || (0, _getPrototypeOf.default)(ReactResponsiveNextHoc)).call(this, props));
      ReactResponsiveNextHoc.mediaQueriesMatchers = [];
      var config = _this.props.config;
      var media = (0, _media.getMedia)(config);
      (0, _keys.default)(media).forEach(function (type) {
        var _media$type = media[type],
            mediaQuery = _media$type.mediaQuery,
            defaultWidth = _media$type.defaultWidth;
        var matcher = (0, _matchmediaquery.default)(mediaQuery, {
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

    (0, _createClass2.default)(ReactResponsiveNextHoc, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.onResizeHandler = (0, _lodash.default)(ReactResponsiveNextHoc.onResize, 200);
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
        return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, this.state, this.props));
      }
    }]);
    return ReactResponsiveNextHoc;
  }(_react.default.Component), _class.customConfig = null, _class.propTypes = {
    config: _propTypes.default.shape({
      breakPoints: _propTypes.default.any,
      devicesToBreakPoints: _propTypes.default.any
    })
  }, _class.defaultProps = {
    config: ReactResponsiveConnect.customConfig || _defaultConfig.defaultConfig
  }, _temp;
};

exports.ReactResponsiveConnect = ReactResponsiveConnect;
//# sourceMappingURL=react-responsive-connect.js.map