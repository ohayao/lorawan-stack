"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _marshaler = _interopRequireDefault(require("../util/marshaler"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PacketBrokerAgent = /*#__PURE__*/function () {
  function PacketBrokerAgent(service) {
    (0, _classCallCheck2["default"])(this, PacketBrokerAgent);
    this._api = service;
  }

  (0, _createClass2["default"])(PacketBrokerAgent, [{
    key: "getInfo",
    value: function () {
      var _getInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GetInfo();

              case 2:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInfo() {
        return _getInfo.apply(this, arguments);
      }

      return getInfo;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(registration) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._api.Register(undefined, registration);

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function register(_x) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "deregister",
    value: function () {
      var _deregister = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.Deregister();

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deregister() {
        return _deregister.apply(this, arguments);
      }

      return deregister;
    }()
  }, {
    key: "getHomeNetworkDefaultRoutingPolicy",
    value: function () {
      var _getHomeNetworkDefaultRoutingPolicy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._api.GetHomeNetworkDefaultRoutingPolicy();

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getHomeNetworkDefaultRoutingPolicy() {
        return _getHomeNetworkDefaultRoutingPolicy.apply(this, arguments);
      }

      return getHomeNetworkDefaultRoutingPolicy;
    }()
  }, {
    key: "setHomeNetworkDefaultRoutingPolicy",
    value: function () {
      var _setHomeNetworkDefaultRoutingPolicy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(policy) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.SetHomeNetworkDefaultRoutingPolicy(undefined, policy);

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setHomeNetworkDefaultRoutingPolicy(_x2) {
        return _setHomeNetworkDefaultRoutingPolicy.apply(this, arguments);
      }

      return setHomeNetworkDefaultRoutingPolicy;
    }()
  }, {
    key: "deleteHomeNetworkDefaultRoutingPolicy",
    value: function () {
      var _deleteHomeNetworkDefaultRoutingPolicy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._api.DeleteHomeNetworkDefaultRoutingPolicy();

              case 2:
                result = _context6.sent;
                return _context6.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteHomeNetworkDefaultRoutingPolicy() {
        return _deleteHomeNetworkDefaultRoutingPolicy.apply(this, arguments);
      }

      return deleteHomeNetworkDefaultRoutingPolicy;
    }()
  }, {
    key: "getHomeNetworkRoutingPolicy",
    value: function () {
      var _getHomeNetworkRoutingPolicy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(netId, tenantId) {
        var result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._api.GetHomeNetworkRoutingPolicy({
                  routeParams: _objectSpread({
                    net_id: netId
                  }, tenantId ? {
                    tenant_id: tenantId
                  } : {})
                });

              case 2:
                result = _context7.sent;
                return _context7.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getHomeNetworkRoutingPolicy(_x3, _x4) {
        return _getHomeNetworkRoutingPolicy.apply(this, arguments);
      }

      return getHomeNetworkRoutingPolicy;
    }()
  }, {
    key: "setHomeNetworkRoutingPolicy",
    value: function () {
      var _setHomeNetworkRoutingPolicy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(netId, tenantId, policy) {
        var result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._api.SetHomeNetworkRoutingPolicy({
                  routeParams: _objectSpread({
                    'home_network_id.net_id': netId
                  }, tenantId ? {
                    'home_network_id.tenant_id': tenantId
                  } : {})
                }, policy);

              case 2:
                result = _context8.sent;
                return _context8.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setHomeNetworkRoutingPolicy(_x5, _x6, _x7) {
        return _setHomeNetworkRoutingPolicy.apply(this, arguments);
      }

      return setHomeNetworkRoutingPolicy;
    }()
  }, {
    key: "deleteHomeNetworkRoutingPolicy",
    value: function () {
      var _deleteHomeNetworkRoutingPolicy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(netId, tenantId) {
        var result;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._api.DeleteHomeNetworkRoutingPolicy({
                  routeParams: _objectSpread({
                    net_id: netId
                  }, tenantId ? {
                    tenant_id: tenantId
                  } : {})
                });

              case 2:
                result = _context9.sent;
                return _context9.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteHomeNetworkRoutingPolicy(_x8, _x9) {
        return _deleteHomeNetworkRoutingPolicy.apply(this, arguments);
      }

      return deleteHomeNetworkRoutingPolicy;
    }()
  }, {
    key: "listHomeNetworkRoutingPolicies",
    value: function () {
      var _listHomeNetworkRoutingPolicies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(params) {
        var result;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._api.ListHomeNetworkRoutingPolicies(undefined, params);

              case 2:
                result = _context10.sent;
                return _context10.abrupt("return", _marshaler["default"].unwrapPacketBrokerPolicies(result));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function listHomeNetworkRoutingPolicies(_x10) {
        return _listHomeNetworkRoutingPolicies.apply(this, arguments);
      }

      return listHomeNetworkRoutingPolicies;
    }()
  }, {
    key: "listNetworks",
    value: function () {
      var _listNetworks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(params) {
        var result;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this._api.ListNetworks(undefined, params);

              case 2:
                result = _context11.sent;
                return _context11.abrupt("return", _marshaler["default"].unwrapPacketBrokerNetworks(result));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function listNetworks(_x11) {
        return _listNetworks.apply(this, arguments);
      }

      return listNetworks;
    }()
  }, {
    key: "listForwarderRoutingPolicies",
    value: function () {
      var _listForwarderRoutingPolicies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(params) {
        var result;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._api.ListForwarderRoutingPolicies(undefined, params);

              case 2:
                result = _context12.sent;
                return _context12.abrupt("return", _marshaler["default"].unwrapPacketBrokerPolicies(result));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function listForwarderRoutingPolicies(_x12) {
        return _listForwarderRoutingPolicies.apply(this, arguments);
      }

      return listForwarderRoutingPolicies;
    }()
  }]);
  return PacketBrokerAgent;
}();

var _default = PacketBrokerAgent;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3BhY2tldC1icm9rZXItYWdlbnQuanMiXSwibmFtZXMiOlsiUGFja2V0QnJva2VyQWdlbnQiLCJzZXJ2aWNlIiwiX2FwaSIsIkdldEluZm8iLCJyZXN1bHQiLCJNYXJzaGFsZXIiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJyZWdpc3RyYXRpb24iLCJSZWdpc3RlciIsInVuZGVmaW5lZCIsIkRlcmVnaXN0ZXIiLCJHZXRIb21lTmV0d29ya0RlZmF1bHRSb3V0aW5nUG9saWN5IiwicG9saWN5IiwiU2V0SG9tZU5ldHdvcmtEZWZhdWx0Um91dGluZ1BvbGljeSIsIkRlbGV0ZUhvbWVOZXR3b3JrRGVmYXVsdFJvdXRpbmdQb2xpY3kiLCJuZXRJZCIsInRlbmFudElkIiwiR2V0SG9tZU5ldHdvcmtSb3V0aW5nUG9saWN5Iiwicm91dGVQYXJhbXMiLCJuZXRfaWQiLCJ0ZW5hbnRfaWQiLCJTZXRIb21lTmV0d29ya1JvdXRpbmdQb2xpY3kiLCJEZWxldGVIb21lTmV0d29ya1JvdXRpbmdQb2xpY3kiLCJwYXJhbXMiLCJMaXN0SG9tZU5ldHdvcmtSb3V0aW5nUG9saWNpZXMiLCJ1bndyYXBQYWNrZXRCcm9rZXJQb2xpY2llcyIsIkxpc3ROZXR3b3JrcyIsInVud3JhcFBhY2tldEJyb2tlck5ldHdvcmtzIiwiTGlzdEZvcndhcmRlclJvdXRpbmdQb2xpY2llcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7SUFFTUEsaUI7QUFDSiw2QkFBWUMsT0FBWixFQUFxQjtBQUFBO0FBQ25CLFNBQUtDLElBQUwsR0FBWUQsT0FBWjtBQUNEOzs7OzttR0FFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1QixLQUFLQyxJQUFMLENBQVVDLE9BQVYsRUFEdkI7O0FBQUE7QUFDUUMsZ0JBQUFBLE1BRFI7QUFBQSxpREFHU0Msc0JBQVVDLHFCQUFWLENBQWdDRixNQUFoQyxDQUhUOztBQUFB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QUF1Q25CLFNBQXZDLEVBQWtEYyxNQUFsRCxDQUR2Qjs7QUFBQTtBQUNRbkIsZ0JBQUFBLE1BRFI7QUFBQSxtREFHU0Msc0JBQVVvQiwwQkFBVixDQUFxQ3JCLE1BQXJDLENBSFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBT2FKLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMjEgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBQYWNrZXRCcm9rZXJBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKHNlcnZpY2UpIHtcbiAgICB0aGlzLl9hcGkgPSBzZXJ2aWNlXG4gIH1cblxuICBhc3luYyBnZXRJbmZvKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRJbmZvKClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyKHJlZ2lzdHJhdGlvbikge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5SZWdpc3Rlcih1bmRlZmluZWQsIHJlZ2lzdHJhdGlvbilcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGRlcmVnaXN0ZXIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkRlcmVnaXN0ZXIoKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZ2V0SG9tZU5ldHdvcmtEZWZhdWx0Um91dGluZ1BvbGljeSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0SG9tZU5ldHdvcmtEZWZhdWx0Um91dGluZ1BvbGljeSgpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBzZXRIb21lTmV0d29ya0RlZmF1bHRSb3V0aW5nUG9saWN5KHBvbGljeSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5TZXRIb21lTmV0d29ya0RlZmF1bHRSb3V0aW5nUG9saWN5KHVuZGVmaW5lZCwgcG9saWN5KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlSG9tZU5ldHdvcmtEZWZhdWx0Um91dGluZ1BvbGljeSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuRGVsZXRlSG9tZU5ldHdvcmtEZWZhdWx0Um91dGluZ1BvbGljeSgpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXRIb21lTmV0d29ya1JvdXRpbmdQb2xpY3kobmV0SWQsIHRlbmFudElkKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdldEhvbWVOZXR3b3JrUm91dGluZ1BvbGljeSh7XG4gICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICBuZXRfaWQ6IG5ldElkLFxuICAgICAgICAuLi4odGVuYW50SWQgPyB7IHRlbmFudF9pZDogdGVuYW50SWQgfSA6IHt9KSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIHNldEhvbWVOZXR3b3JrUm91dGluZ1BvbGljeShuZXRJZCwgdGVuYW50SWQsIHBvbGljeSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5TZXRIb21lTmV0d29ya1JvdXRpbmdQb2xpY3koXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ2hvbWVfbmV0d29ya19pZC5uZXRfaWQnOiBuZXRJZCxcbiAgICAgICAgICAuLi4odGVuYW50SWQgPyB7ICdob21lX25ldHdvcmtfaWQudGVuYW50X2lkJzogdGVuYW50SWQgfSA6IHt9KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBwb2xpY3ksXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlSG9tZU5ldHdvcmtSb3V0aW5nUG9saWN5KG5ldElkLCB0ZW5hbnRJZCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5EZWxldGVIb21lTmV0d29ya1JvdXRpbmdQb2xpY3koe1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgbmV0X2lkOiBuZXRJZCxcbiAgICAgICAgLi4uKHRlbmFudElkID8geyB0ZW5hbnRfaWQ6IHRlbmFudElkIH0gOiB7fSksXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBsaXN0SG9tZU5ldHdvcmtSb3V0aW5nUG9saWNpZXMocGFyYW1zKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkxpc3RIb21lTmV0d29ya1JvdXRpbmdQb2xpY2llcyh1bmRlZmluZWQsIHBhcmFtcylcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwUGFja2V0QnJva2VyUG9saWNpZXMocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgbGlzdE5ldHdvcmtzKHBhcmFtcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5MaXN0TmV0d29ya3ModW5kZWZpbmVkLCBwYXJhbXMpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnVud3JhcFBhY2tldEJyb2tlck5ldHdvcmtzKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGxpc3RGb3J3YXJkZXJSb3V0aW5nUG9saWNpZXMocGFyYW1zKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkxpc3RGb3J3YXJkZXJSb3V0aW5nUG9saWNpZXModW5kZWZpbmVkLCBwYXJhbXMpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnVud3JhcFBhY2tldEJyb2tlclBvbGljaWVzKHJlc3VsdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWNrZXRCcm9rZXJBZ2VudFxuIl19