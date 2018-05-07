"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hoc = void 0;

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

var _components = require("./components");

var _defaults = require("./defaults");

var React = require('react');

var hoc = function hoc(WrappedComponent) {
  return function (_React$Component) {
    (0, _inherits2.default)(ReactResponsiveNextHoc, _React$Component);
    (0, _createClass2.default)(ReactResponsiveNextHoc, null, [{
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
        var _getInitialProps = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
          var args,
              newProps,
              device,
              checkEnvironment,
              newArgs,
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

                    checkEnvironment = function checkEnvironment() {
                      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                          _ref$headers = _ref.headers,
                          headers = _ref$headers === void 0 ? {} : _ref$headers;

                      var ua = headers['user-agent'] || headers['User-Agent'] || '';
                      var detectedDevice = device(ua);
                      var detectedDeviceWidth = _defaults.defaultDevicesSizes[detectedDevice.type] || null;
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

      (0, _classCallCheck2.default)(this, ReactResponsiveNextHoc);
      _this = (0, _possibleConstructorReturn2.default)(this, (ReactResponsiveNextHoc.__proto__ || (0, _getPrototypeOf.default)(ReactResponsiveNextHoc)).call(this, props));
      var windowWidth = process.browser ? window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth : 1;
      var isDesktop = (0, _matchmediaquery.default)(_defaults.mediaQueries.isDesktop, {
        width: windowWidth
      });
      isDesktop.addListener(ReactResponsiveNextHoc.onMediaQueryMatch);
      _components.MediaQueryWrapper.fakeWidth = 1200;
      _this.state = {
        env: {}
      };
      return _this;
    }

    (0, _createClass2.default)(ReactResponsiveNextHoc, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        ReactResponsiveNextHoc.onResize();
        this.onResizeHandler = (0, _lodash.default)(ReactResponsiveNextHoc.onResize, 200);
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
        return React.createElement("div", null, React.createElement(WrappedComponent, (0, _extends2.default)({}, this.state, this.props)), ";");
      }
    }]);
    return ReactResponsiveNextHoc;
  }(React.Component);
};

exports.hoc = hoc;
//# sourceMappingURL=hoc.js.map