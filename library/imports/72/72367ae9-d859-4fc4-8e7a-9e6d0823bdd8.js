"use strict";
cc._RF.push(module, '72367rp2FlPxI56nm0II73Y', 'plugins.min');
// SDK/bcx/plugins.min.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t) {
  var e = {};

  function n(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: r
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) {
      n.d(r, o, function (e) {
        return t[e];
      }.bind(null, o));
    }
    return r;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"];
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 6);
}([function (t, e) {
  t.exports = function (t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  };
}, function (t, e) {
  t.exports = function (t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  };
}, function (t, e) {
  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
    }
  }

  t.exports = function (t, e, r) {
    return e && n(t.prototype, e), r && n(t, r), t;
  };
}, function (t, e, n) {
  var r = n(7),
      o = n(8);

  t.exports = function (t, e) {
    return !e || "object" !== r(e) && "function" != typeof e ? o(t) : e;
  };
}, function (t, e) {
  function n(e) {
    return t.exports = n = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, n(e);
  }

  t.exports = n;
}, function (t, e, n) {
  var r = n(9);

  t.exports = function (t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && r(t, e);
  };
}, function (t, e, n) {
  "use strict";

  n.r(e), n.d(e, "default", function () {
    return m;
  });

  var r = n(0),
      o = n.n(r),
      u = n(1),
      c = n.n(u),
      i = n(2),
      f = n.n(i),
      s = n(3),
      a = n.n(s),
      l = n(4),
      p = n.n(l),
      y = n(5),
      d = n.n(y),
      b = Cocosjs.WALLET_METHODS,
      h = Cocosjs.SocketService,
      m = function (t) {
    function e() {
      return c()(this, e), a()(this, p()(e).call(this, Cocosjs.Blockchains.COCOSBCX, Cocosjs.PluginTypes.BLOCKCHAIN_SUPPORT));
    }

    return d()(e, t), f()(e, [{
      key: "setSocketService",
      value: function value(t) {
        h = t;
      }
    }, {
      key: "hookProvider",
      value: function value() {
        throw new Error("cocos hook provider not enabled yet.");
      }
    }, {
      key: "signatureProvider",
      value: function value() {
        return 0 >= arguments.length || arguments[0], function (t) {
          return function (t, e) {
            return new Proxy(t, e);
          }(t, {
            get: function get(t, n) {
              return "function" == typeof t[n] ? function () {
                for (var r = arguments.length, o = Array(r), u = 0; u < r; u++) {
                  o[u] = arguments[u];
                }

                return Cocosjs.cocos.isExtension ? t[n].apply(t, o) : n === b.transferAsset ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.transferAsset].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.callContractFunction ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.callContractFunction].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.creatNHAssetOrder ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.creatNHAssetOrder].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.transferNHAsset ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.transferNHAsset].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.fillNHAssetOrder ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.fillNHAssetOrder].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.cancelNHAssetOrder ? new Promise(function (t, n) {
                  var r;
                  (r = e.methods())[b.cancelNHAssetOrder].apply(r, o).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : n === b.getAccountInfo ? new Promise(function (t, n) {
                  e.methods()[b.getAccountInfo]({}).then(function (e) {
                    return t(e);
                  })["catch"](function (t) {
                    return n(t);
                  });
                }) : t[n].apply(t, o);
              } : t[n];
            }
          });
        };
      }
    }], [{
      key: "methods",
      value: function value() {
        var t;
        return t = {}, o()(t, b.transferAsset, function (t) {
          return h.sendApiRequest({
            type: "requestTransfer",
            payload: t
          });
        }), o()(t, b.callContractFunction, function (t) {
          return h.sendApiRequest({
            type: "callContractFunction",
            payload: t
          });
        }), o()(t, b.fillNHAssetOrder, function (t) {
          return h.sendApiRequest({
            type: "fillNHAssetOrder",
            payload: t
          });
        }), o()(t, b.transferNHAsset, function (t) {
          return h.sendApiRequest({
            type: "transferNHAsset",
            payload: t
          });
        }), o()(t, b.cancelNHAssetOrder, function (t) {
          return h.sendApiRequest({
            type: "cancelNHAssetOrder",
            payload: t
          });
        }), o()(t, b.creatNHAssetOrder, function (t) {
          return h.sendApiRequest({
            type: "creatNHAssetOrder",
            payload: t
          });
        }), o()(t, b.getAccountInfo, function () {
          return h.sendApiRequest({
            type: "getAccountInfo",
            payload: {}
          });
        }), t;
      }
    }]), e;
  }(Cocosjs.Plugin);

  "undefined" != typeof window && (window.CocosBCX = m);
}, function (t, e) {
  function n(t) {
    return (n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
    })(t);
  }

  function r(e) {
    return "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? t.exports = r = function r(t) {
      return n(t);
    } : t.exports = r = function r(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : n(t);
    }, r(e);
  }

  t.exports = r;
}, function (t, e) {
  t.exports = function (t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  };
}, function (t, e) {
  function n(e, r) {
    return t.exports = n = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    }, n(e, r);
  }

  t.exports = n;
}]);

cc._RF.pop();