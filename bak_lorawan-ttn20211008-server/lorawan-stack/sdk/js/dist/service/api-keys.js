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

var ApiKeys = /*#__PURE__*/function () {
  function ApiKeys(registry, _ref) {
    var parentRoutes = _ref.parentRoutes;
    (0, _classCallCheck2["default"])(this, ApiKeys);
    this._api = registry;
    this._parentRoutes = parentRoutes;
  }

  (0, _createClass2["default"])(ApiKeys, [{
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(entityId, id) {
        var _routeParams;

        var entityIdRoute, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entityIdRoute = this._parentRoutes.get;
                _context.next = 3;
                return this._api.GetAPIKey({
                  routeParams: (_routeParams = {}, (0, _defineProperty2["default"])(_routeParams, entityIdRoute, entityId), (0, _defineProperty2["default"])(_routeParams, "key_id", id), _routeParams)
                });

              case 3:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getById(_x, _x2) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(entityId, params) {
        var entityIdRoute, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entityIdRoute = this._parentRoutes.list;
                _context2.next = 3;
                return this._api.ListAPIKeys({
                  routeParams: (0, _defineProperty2["default"])({}, entityIdRoute, entityId)
                }, params);

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadListResponse('api_keys', result));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAll(_x3, _x4) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(entityId, key) {
        var entityIdRoute, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                entityIdRoute = this._parentRoutes.create;
                _context3.next = 3;
                return this._api.CreateAPIKey({
                  routeParams: (0, _defineProperty2["default"])({}, entityIdRoute, entityId)
                }, _objectSpread({}, key));

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x5, _x6) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(entityId, id) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.updateById(entityId, id, {
                  rights: []
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteById(_x7, _x8) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(entityId, id, patch) {
        var _routeParams4;

        var entityIdRoute, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                entityIdRoute = this._parentRoutes.update;
                _context5.next = 3;
                return this._api.UpdateAPIKey({
                  routeParams: (_routeParams4 = {}, (0, _defineProperty2["default"])(_routeParams4, entityIdRoute, entityId), (0, _defineProperty2["default"])(_routeParams4, 'api_key.id', id), _routeParams4)
                }, {
                  api_key: _objectSpread({}, patch)
                });

              case 3:
                result = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateById(_x9, _x10, _x11) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }]);
  return ApiKeys;
}();

var _default = ApiKeys;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2FwaS1rZXlzLmpzIl0sIm5hbWVzIjpbIkFwaUtleXMiLCJyZWdpc3RyeSIsInBhcmVudFJvdXRlcyIsIl9hcGkiLCJfcGFyZW50Um91dGVzIiwiZW50aXR5SWQiLCJpZCIsImVudGl0eUlkUm91dGUiLCJnZXQiLCJHZXRBUElLZXkiLCJyb3V0ZVBhcmFtcyIsInJlc3VsdCIsIk1hcnNoYWxlciIsInBheWxvYWRTaW5nbGVSZXNwb25zZSIsInBhcmFtcyIsImxpc3QiLCJMaXN0QVBJS2V5cyIsInBheWxvYWRMaXN0UmVzcG9uc2UiLCJrZXkiLCJjcmVhdGUiLCJDcmVhdGVBUElLZXkiLCJ1cGRhdGVCeUlkIiwicmlnaHRzIiwicGF0Y2giLCJ1cGRhdGUiLCJVcGRhdGVBUElLZXkiLCJhcGlfa2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7OztJQUVNQSxPO0FBQ0osbUJBQVlDLFFBQVosUUFBd0M7QUFBQSxRQUFoQkMsWUFBZ0IsUUFBaEJBLFlBQWdCO0FBQUE7QUFDdEMsU0FBS0MsSUFBTCxHQUFZRixRQUFaO0FBQ0EsU0FBS0csYUFBTCxHQUFxQkYsWUFBckI7QUFDRDs7Ozs7bUdBRUQsaUJBQWNHLFFBQWQsRUFBd0JDLEVBQXhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRQyxnQkFBQUEsYUFEUixHQUN3QixLQUFLSCxhQUFMLENBQW1CSSxHQUQzQztBQUFBO0FBQUEsdUJBRXVCLEtBQUtMLElBQUwsQ0FBVU0sU0FBVixDQUFvQjtBQUN2Q0Msa0JBQUFBLFdBQVcscUVBQUtILGFBQUwsRUFBcUJGLFFBQXJCLDREQUF1Q0MsRUFBdkM7QUFENEIsaUJBQXBCLENBRnZCOztBQUFBO0FBRVFLLGdCQUFBQSxNQUZSO0FBQUEsaURBTVNDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FOVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztrR0FTQSxrQkFBYU4sUUFBYixFQUF1QlMsTUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FQLGdCQUFBQSxhQURSLEdBQ3dCLEtBQUtILGFBQUwsQ0FBbUJXLElBRDNDO0FBQUE7QUFBQSx1QkFFdUIsS0FBS1osSUFBTCxDQUFVYSxXQUFWLENBQ25CO0FBQ0VOLGtCQUFBQSxXQUFXLHVDQUFLSCxhQUFMLEVBQXFCRixRQUFyQjtBQURiLGlCQURtQixFQUluQlMsTUFKbUIsQ0FGdkI7O0FBQUE7QUFFUUgsZ0JBQUFBLE1BRlI7QUFBQSxrREFTU0Msc0JBQVVLLG1CQUFWLENBQThCLFVBQTlCLEVBQTBDTixNQUExQyxDQVRUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O2tHQVlBLGtCQUFhTixRQUFiLEVBQXVCYSxHQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUVgsZ0JBQUFBLGFBRFIsR0FDd0IsS0FBS0gsYUFBTCxDQUFtQmUsTUFEM0M7QUFBQTtBQUFBLHVCQUV1QixLQUFLaEIsSUFBTCxDQUFVaUIsWUFBVixDQUNuQjtBQUNFVixrQkFBQUEsV0FBVyx1Q0FBS0gsYUFBTCxFQUFxQkYsUUFBckI7QUFEYixpQkFEbUIsb0JBS2RhLEdBTGMsRUFGdkI7O0FBQUE7QUFFUVAsZ0JBQUFBLE1BRlI7QUFBQSxrREFXU0Msc0JBQVVDLHFCQUFWLENBQWdDRixNQUFoQyxDQVhUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O3NHQWNBLGtCQUFpQk4sUUFBakIsRUFBMkJDLEVBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrREFDUyxLQUFLZSxVQUFMLENBQWdCaEIsUUFBaEIsRUFBMEJDLEVBQTFCLEVBQThCO0FBQ25DZ0Isa0JBQUFBLE1BQU0sRUFBRTtBQUQyQixpQkFBOUIsQ0FEVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztzR0FNQSxrQkFBaUJqQixRQUFqQixFQUEyQkMsRUFBM0IsRUFBK0JpQixLQUEvQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUWhCLGdCQUFBQSxhQURSLEdBQ3dCLEtBQUtILGFBQUwsQ0FBbUJvQixNQUQzQztBQUFBO0FBQUEsdUJBRXVCLEtBQUtyQixJQUFMLENBQVVzQixZQUFWLENBQ25CO0FBQ0VmLGtCQUFBQSxXQUFXLHVFQUNSSCxhQURRLEVBQ1FGLFFBRFIsbURBRVQsWUFGUyxFQUVLQyxFQUZMO0FBRGIsaUJBRG1CLEVBT25CO0FBQ0VvQixrQkFBQUEsT0FBTyxvQkFBT0gsS0FBUDtBQURULGlCQVBtQixDQUZ2Qjs7QUFBQTtBQUVRWixnQkFBQUEsTUFGUjtBQUFBLGtEQWNTQyxzQkFBVUMscUJBQVYsQ0FBZ0NGLE1BQWhDLENBZFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBa0JhWCxPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBBcGlLZXlzIHtcbiAgY29uc3RydWN0b3IocmVnaXN0cnksIHsgcGFyZW50Um91dGVzIH0pIHtcbiAgICB0aGlzLl9hcGkgPSByZWdpc3RyeVxuICAgIHRoaXMuX3BhcmVudFJvdXRlcyA9IHBhcmVudFJvdXRlc1xuICB9XG5cbiAgYXN5bmMgZ2V0QnlJZChlbnRpdHlJZCwgaWQpIHtcbiAgICBjb25zdCBlbnRpdHlJZFJvdXRlID0gdGhpcy5fcGFyZW50Um91dGVzLmdldFxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRBUElLZXkoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgW2VudGl0eUlkUm91dGVdOiBlbnRpdHlJZCwga2V5X2lkOiBpZCB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXRBbGwoZW50aXR5SWQsIHBhcmFtcykge1xuICAgIGNvbnN0IGVudGl0eUlkUm91dGUgPSB0aGlzLl9wYXJlbnRSb3V0ZXMubGlzdFxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5MaXN0QVBJS2V5cyhcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHsgW2VudGl0eUlkUm91dGVdOiBlbnRpdHlJZCB9LFxuICAgICAgfSxcbiAgICAgIHBhcmFtcyxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ2FwaV9rZXlzJywgcmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGVudGl0eUlkLCBrZXkpIHtcbiAgICBjb25zdCBlbnRpdHlJZFJvdXRlID0gdGhpcy5fcGFyZW50Um91dGVzLmNyZWF0ZVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5DcmVhdGVBUElLZXkoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7IFtlbnRpdHlJZFJvdXRlXTogZW50aXR5SWQgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC4uLmtleSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlQnlJZChlbnRpdHlJZCwgaWQpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVCeUlkKGVudGl0eUlkLCBpZCwge1xuICAgICAgcmlnaHRzOiBbXSxcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlQnlJZChlbnRpdHlJZCwgaWQsIHBhdGNoKSB7XG4gICAgY29uc3QgZW50aXR5SWRSb3V0ZSA9IHRoaXMuX3BhcmVudFJvdXRlcy51cGRhdGVcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuVXBkYXRlQVBJS2V5KFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgIFtlbnRpdHlJZFJvdXRlXTogZW50aXR5SWQsXG4gICAgICAgICAgJ2FwaV9rZXkuaWQnOiBpZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGFwaV9rZXk6IHsgLi4ucGF0Y2ggfSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwaUtleXNcbiJdfQ==