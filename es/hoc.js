import _Object$getPrototypeOf from "@babel/runtime/core-js/object/get-prototype-of";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _extends from "@babel/runtime/helpers/extends";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import { MediaQueryWrapper } from './components';

var React = require('react');

export var hoc = function hoc(WrappedComponent) {
  return function (_React$Component) {
    _inherits(ReactResponsiveNextHoc, _React$Component);

    _createClass(ReactResponsiveNextHoc, null, [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
          var args,
              newProps,
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

                  if (args && args.req) {} else {}

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
                  MediaQueryWrapper.fakeWidth = 800;
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
    }]);

    function ReactResponsiveNextHoc(props) {
      var _this;

      _classCallCheck(this, ReactResponsiveNextHoc);

      _this = _possibleConstructorReturn(this, (ReactResponsiveNextHoc.__proto__ || _Object$getPrototypeOf(ReactResponsiveNextHoc)).call(this, props));
      _this.state = {
        env: {}
      };
      return _this;
    }

    _createClass(ReactResponsiveNextHoc, [{
      key: "render",
      value: function render() {
        return React.createElement(WrappedComponent, _extends({}, this.state, this.props));
      }
    }]);

    return ReactResponsiveNextHoc;
  }(React.Component);
};
//# sourceMappingURL=hoc.js.map