"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MediaQueryWrapper", {
  enumerable: true,
  get: function get() {
    return _components.MediaQueryWrapper;
  }
});
Object.defineProperty(exports, "responsiveWrapper", {
  enumerable: true,
  get: function get() {
    return _components.responsiveWrapper;
  }
});
Object.defineProperty(exports, "Show", {
  enumerable: true,
  get: function get() {
    return _components.Show;
  }
});
Object.defineProperty(exports, "Hide", {
  enumerable: true,
  get: function get() {
    return _components.Hide;
  }
});
Object.defineProperty(exports, "PhoneScreen", {
  enumerable: true,
  get: function get() {
    return _components.PhoneScreen;
  }
});
Object.defineProperty(exports, "PhoneAndTabletScreen", {
  enumerable: true,
  get: function get() {
    return _components.PhoneAndTabletScreen;
  }
});
Object.defineProperty(exports, "TabletScreen", {
  enumerable: true,
  get: function get() {
    return _components.TabletScreen;
  }
});
Object.defineProperty(exports, "TabletAndUpScreen", {
  enumerable: true,
  get: function get() {
    return _components.TabletAndUpScreen;
  }
});
Object.defineProperty(exports, "DesktopAndUpScreen", {
  enumerable: true,
  get: function get() {
    return _components.DesktopAndUpScreen;
  }
});
Object.defineProperty(exports, "defaultConfig", {
  enumerable: true,
  get: function get() {
    return _defaultConfig.defaultConfig;
  }
});
Object.defineProperty(exports, "ReactResponsiveConnect", {
  enumerable: true,
  get: function get() {
    return _reactResponsiveConnect.ReactResponsiveConnect;
  }
});
exports.ContextServiceMiddleware = void 0;

var _components = require("./components");

var _defaultConfig = require("./default-config");

var _reactResponsiveConnect = require("./react-responsive-connect");

var ContextServiceMiddleware = process.browser ? function () {} : require('request-context').middleware('request');
exports.ContextServiceMiddleware = ContextServiceMiddleware;
//# sourceMappingURL=index.js.map