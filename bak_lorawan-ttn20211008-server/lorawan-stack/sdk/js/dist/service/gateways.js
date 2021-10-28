"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _marshaler = _interopRequireDefault(require("../util/marshaler"));

var _combineStreams = _interopRequireDefault(require("../util/combine-streams"));

var _constants = require("../util/constants");

var _apiKeys = _interopRequireDefault(require("./api-keys"));

var _collaborators = _interopRequireDefault(require("./collaborators"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Gateways = /*#__PURE__*/function () {
  function Gateways(api, _ref) {
    var defaultUserId = _ref.defaultUserId,
        stackConfig = _ref.stackConfig;
    (0, _classCallCheck2["default"])(this, Gateways);
    this._api = api;
    this._defaultUserId = defaultUserId;
    this._stackConfig = stackConfig;
    this.ApiKeys = new _apiKeys["default"](api.GatewayAccess, {
      parentRoutes: {
        get: 'gateway_ids.gateway_id',
        list: 'gateway_ids.gateway_id',
        create: 'gateway_ids.gateway_id',
        update: 'gateway_ids.gateway_id'
      }
    });
    this.Collaborators = new _collaborators["default"](api.GatewayAccess, {
      parentRoutes: {
        get: 'gateway_ids.gateway_id',
        list: 'gateway_ids.gateway_id',
        set: 'gateway_ids.gateway_id'
      }
    });
  }

  (0, _createClass2["default"])(Gateways, [{
    key: "_emitDefaults",
    value: function _emitDefaults(paths, gateway) {
      // Handle zero coordinates that are swallowed by the grpc-gateway for
      // gateway antennas.
      if (paths.includes('antennas') && Boolean(gateway.antennas)) {
        var antennas = gateway.antennas;

        var _iterator = _createForOfIteratorHelper(antennas),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var antenna = _step.value;

            if (antenna !== null && (0, _typeof2["default"])(antenna) === 'object' && antenna.location !== null && (0, _typeof2["default"])(antenna.location) === 'object') {
              if (!('altitude' in antenna.location)) {
                antenna.location.altitude = 0;
              }

              if (!('longitude' in antenna.location)) {
                antenna.location.longitude = 0;
              }

              if (!('latitude' in antenna.location)) {
                antenna.location.latitude = 0;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } // Handle missing boolean values.


      if (paths.includes('location_public') && !Boolean(gateway.location_public)) {
        gateway.location_public = false;
      }

      if (paths.includes('status_public') && !Boolean(gateway.status_public)) {
        gateway.status_public = false;
      }

      if (paths.includes('auto_update') && !Boolean(gateway.auto_update)) {
        gateway.auto_update = false;
      }

      if (paths.includes('schedule_downlink_late') && !Boolean(gateway.schedule_downlink_late)) {
        gateway.schedule_downlink_late = false;
      }

      if (paths.includes('require_authenticated_connection') && !Boolean(gateway.require_authenticated_connection)) {
        gateway.require_authenticated_connection = false;
      }

      if (paths.includes('update_location_from_status') && !Boolean(gateway.update_location_from_status)) {
        gateway.update_location_from_status = false;
      }

      if (paths.includes('disable_packet_broker_forwarding') && !Boolean(gateway.disable_packet_broker_forwarding)) {
        gateway.disable_packet_broker_forwarding = false;
      }

      return gateway;
    } // Retrieval.

  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GatewayRegistry.List(undefined, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context.sent;
                return _context.abrupt("return", _marshaler["default"].unwrapGateways(response));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, selector) {
        var fieldMask, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context2.next = 3;
                return this._api.GatewayRegistry.Get({
                  routeParams: {
                    'gateway_ids.gateway_id': id
                  }
                }, fieldMask);

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", this._emitDefaults(fieldMask.field_mask.paths, _marshaler["default"].unwrapGateway(response)));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.EntityRegistrySearch.SearchGateways(undefined, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].unwrapGateways(response));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search(_x5, _x6) {
        return _search.apply(this, arguments);
      }

      return search;
    }() // Update.

  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, patch) {
        var mask,
            response,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mask = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : _marshaler["default"].fieldMaskFromPatch(patch, this._api.GatewayRegistry.UpdateAllowedFieldMaskPaths);
                _context4.next = 3;
                return this._api.GatewayRegistry.Update({
                  routeParams: {
                    'gateway.ids.gateway_id': id
                  }
                }, {
                  gateway: patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                response = _context4.sent;
                return _context4.abrupt("return", this._emitDefaults(mask, _marshaler["default"].unwrapGateway(response)));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateById(_x7, _x8) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }, {
    key: "restoreById",
    value: function () {
      var _restoreById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        var response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.GatewayRegistry.Restore({
                  routeParams: {
                    gateway_id: id
                  }
                });

              case 2:
                response = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function restoreById(_x9) {
        return _restoreById.apply(this, arguments);
      }

      return restoreById;
    }() // Creation.

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var ownerId,
            gateway,
            isUserOwner,
            routeParams,
            response,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ownerId = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : this._defaultUserId;
                gateway = _args6.length > 1 ? _args6[1] : undefined;
                isUserOwner = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : true;
                routeParams = isUserOwner ? {
                  'collaborator.user_ids.user_id': ownerId
                } : {
                  'collaborator.organization_ids.organization_id': ownerId
                };
                _context6.next = 6;
                return this._api.GatewayRegistry.Create({
                  routeParams: routeParams
                }, {
                  gateway: gateway
                });

              case 6:
                response = _context6.sent;
                return _context6.abrupt("return", _marshaler["default"].unwrapGateway(response));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }() // Deletion.

  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
        var response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._api.GatewayRegistry.Delete({
                  routeParams: {
                    gateway_id: id
                  }
                });

              case 2:
                response = _context7.sent;
                return _context7.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteById(_x10) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "purgeById",
    value: function () {
      var _purgeById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
        var response;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._api.GatewayRegistry.Purge({
                  routeParams: {
                    gateway_id: id
                  }
                });

              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function purgeById(_x11) {
        return _purgeById.apply(this, arguments);
      }

      return purgeById;
    }() // Miscellaneous.

  }, {
    key: "getStatisticsById",
    value: function () {
      var _getStatisticsById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
        var response;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._api.Gs.GetGatewayConnectionStats({
                  routeParams: {
                    gateway_id: id
                  }
                });

              case 2:
                response = _context9.sent;
                return _context9.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getStatisticsById(_x12) {
        return _getStatisticsById.apply(this, arguments);
      }

      return getStatisticsById;
    }()
  }, {
    key: "getRightsById",
    value: function () {
      var _getRightsById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(gatewayId) {
        var result;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._api.GatewayAccess.ListRights({
                  routeParams: {
                    gateway_id: gatewayId
                  }
                });

              case 2:
                result = _context10.sent;
                return _context10.abrupt("return", _marshaler["default"].unwrapRights(result));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getRightsById(_x13) {
        return _getRightsById.apply(this, arguments);
      }

      return getRightsById;
    }() // Events Stream

  }, {
    key: "openStream",
    value: function () {
      var _openStream = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(identifiers, tail, after) {
        var _this = this;

        var payload, distinctComponents, streams;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                payload = {
                  identifiers: identifiers.map(function (id) {
                    return {
                      gateway_ids: {
                        gateway_id: id
                      }
                    };
                  }),
                  tail: tail,
                  after: after
                }; // Event streams can come from multiple stack components. It is necessary to
                // check for stack components on different hosts and open distinct stream
                // connections for any distinct host if need be.

                distinctComponents = this._stackConfig.getComponentsWithDistinctBaseUrls([_constants.STACK_COMPONENTS_MAP.is, _constants.STACK_COMPONENTS_MAP.gs]);
                streams = distinctComponents.map(function (component) {
                  return _this._api.Events.Stream({
                    component: component
                  }, payload);
                }); // Combine all stream sources to one subscription generator.

                return _context11.abrupt("return", (0, _combineStreams["default"])(streams));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function openStream(_x14, _x15, _x16) {
        return _openStream.apply(this, arguments);
      }

      return openStream;
    }() // Gateway Configuration Server.

  }, {
    key: "getGlobalConf",
    value: function () {
      var _getGlobalConf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(gatewayId) {
        var endpoint, response;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                // Endpoint hardcoded because it is not part of the gRPC API.
                // Refactor implementation once the following issue is resolved:
                // https://github.com/TheThingsNetwork/lorawan-stack/issues/3280
                endpoint = "/gcs/gateways/".concat(gatewayId, "/semtechudp/global_conf.json");
                _context12.next = 3;
                return this._api._connector.handleRequest('get', endpoint, 'gcs', false);

              case 3:
                response = _context12.sent;
                return _context12.abrupt("return", _marshaler["default"].payloadSingleResponse(response.data));

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getGlobalConf(_x17) {
        return _getGlobalConf.apply(this, arguments);
      }

      return getGlobalConf;
    }()
  }]);
  return Gateways;
}();

var _default = Gateways;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2dhdGV3YXlzLmpzIl0sIm5hbWVzIjpbIkdhdGV3YXlzIiwiYXBpIiwiZGVmYXVsdFVzZXJJZCIsInN0YWNrQ29uZmlnIiwiX2FwaSIsIl9kZWZhdWx0VXNlcklkIiwiX3N0YWNrQ29uZmlnIiwiQXBpS2V5cyIsIkdhdGV3YXlBY2Nlc3MiLCJwYXJlbnRSb3V0ZXMiLCJnZXQiLCJsaXN0IiwiY3JlYXRlIiwidXBkYXRlIiwiQ29sbGFib3JhdG9ycyIsInNldCIsInBhdGhzIiwiZ2F0ZXdheSIsImluY2x1ZGVzIiwiQm9vbGVhbiIsImFudGVubmFzIiwiYW50ZW5uYSIsImxvY2F0aW9uIiwiYWx0aXR1ZGUiLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsImxvY2F0aW9uX3B1YmxpYyIsInN0YXR1c19wdWJsaWMiLCJhdXRvX3VwZGF0ZSIsInNjaGVkdWxlX2Rvd25saW5rX2xhdGUiLCJyZXF1aXJlX2F1dGhlbnRpY2F0ZWRfY29ubmVjdGlvbiIsInVwZGF0ZV9sb2NhdGlvbl9mcm9tX3N0YXR1cyIsImRpc2FibGVfcGFja2V0X2Jyb2tlcl9mb3J3YXJkaW5nIiwicGFyYW1zIiwic2VsZWN0b3IiLCJHYXRld2F5UmVnaXN0cnkiLCJMaXN0IiwidW5kZWZpbmVkIiwiTWFyc2hhbGVyIiwic2VsZWN0b3JUb0ZpZWxkTWFzayIsInJlc3BvbnNlIiwidW53cmFwR2F0ZXdheXMiLCJpZCIsImZpZWxkTWFzayIsIkdldCIsInJvdXRlUGFyYW1zIiwiX2VtaXREZWZhdWx0cyIsImZpZWxkX21hc2siLCJ1bndyYXBHYXRld2F5IiwiRW50aXR5UmVnaXN0cnlTZWFyY2giLCJTZWFyY2hHYXRld2F5cyIsInBhdGNoIiwibWFzayIsImZpZWxkTWFza0Zyb21QYXRjaCIsIlVwZGF0ZUFsbG93ZWRGaWVsZE1hc2tQYXRocyIsIlVwZGF0ZSIsIlJlc3RvcmUiLCJnYXRld2F5X2lkIiwicGF5bG9hZFNpbmdsZVJlc3BvbnNlIiwib3duZXJJZCIsImlzVXNlck93bmVyIiwiQ3JlYXRlIiwiRGVsZXRlIiwiUHVyZ2UiLCJHcyIsIkdldEdhdGV3YXlDb25uZWN0aW9uU3RhdHMiLCJnYXRld2F5SWQiLCJMaXN0UmlnaHRzIiwicmVzdWx0IiwidW53cmFwUmlnaHRzIiwiaWRlbnRpZmllcnMiLCJ0YWlsIiwiYWZ0ZXIiLCJwYXlsb2FkIiwibWFwIiwiZ2F0ZXdheV9pZHMiLCJkaXN0aW5jdENvbXBvbmVudHMiLCJnZXRDb21wb25lbnRzV2l0aERpc3RpbmN0QmFzZVVybHMiLCJTVEFDS19DT01QT05FTlRTX01BUCIsImlzIiwiZ3MiLCJzdHJlYW1zIiwiY29tcG9uZW50IiwiRXZlbnRzIiwiU3RyZWFtIiwiZW5kcG9pbnQiLCJfY29ubmVjdG9yIiwiaGFuZGxlUmVxdWVzdCIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsUTtBQUNKLG9CQUFZQyxHQUFaLFFBQWlEO0FBQUEsUUFBOUJDLGFBQThCLFFBQTlCQSxhQUE4QjtBQUFBLFFBQWZDLFdBQWUsUUFBZkEsV0FBZTtBQUFBO0FBQy9DLFNBQUtDLElBQUwsR0FBWUgsR0FBWjtBQUNBLFNBQUtJLGNBQUwsR0FBc0JILGFBQXRCO0FBQ0EsU0FBS0ksWUFBTCxHQUFvQkgsV0FBcEI7QUFDQSxTQUFLSSxPQUFMLEdBQWUsSUFBSUEsbUJBQUosQ0FBWU4sR0FBRyxDQUFDTyxhQUFoQixFQUErQjtBQUM1Q0MsTUFBQUEsWUFBWSxFQUFFO0FBQ1pDLFFBQUFBLEdBQUcsRUFBRSx3QkFETztBQUVaQyxRQUFBQSxJQUFJLEVBQUUsd0JBRk07QUFHWkMsUUFBQUEsTUFBTSxFQUFFLHdCQUhJO0FBSVpDLFFBQUFBLE1BQU0sRUFBRTtBQUpJO0FBRDhCLEtBQS9CLENBQWY7QUFRQSxTQUFLQyxhQUFMLEdBQXFCLElBQUlBLHlCQUFKLENBQWtCYixHQUFHLENBQUNPLGFBQXRCLEVBQXFDO0FBQ3hEQyxNQUFBQSxZ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Q0FBbUMsS0FBbkMsRUFBMENGLFFBQTFDLEVBQW9ELEtBQXBELEVBQTJELEtBQTNELENBTnpCOztBQUFBO0FBTVE3QyxnQkFBQUEsUUFOUjtBQUFBLG1EQVFTRixzQkFBVW9CLHFCQUFWLENBQWdDbEIsUUFBUSxDQUFDZ0QsSUFBekMsQ0FSVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozs7ZUFZYXhGLFEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAyMSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5pbXBvcnQgY29tYmluZVN0cmVhbXMgZnJvbSAnLi4vdXRpbC9jb21iaW5lLXN0cmVhbXMnXG5pbXBvcnQgeyBTVEFDS19DT01QT05FTlRTX01BUCB9IGZyb20gJy4uL3V0aWwvY29uc3RhbnRzJ1xuXG5pbXBvcnQgQXBpS2V5cyBmcm9tICcuL2FwaS1rZXlzJ1xuaW1wb3J0IENvbGxhYm9yYXRvcnMgZnJvbSAnLi9jb2xsYWJvcmF0b3JzJ1xuXG5jbGFzcyBHYXRld2F5cyB7XG4gIGNvbnN0cnVjdG9yKGFwaSwgeyBkZWZhdWx0VXNlcklkLCBzdGFja0NvbmZpZyB9KSB7XG4gICAgdGhpcy5fYXBpID0gYXBpXG4gICAgdGhpcy5fZGVmYXVsdFVzZXJJZCA9IGRlZmF1bHRVc2VySWRcbiAgICB0aGlzLl9zdGFja0NvbmZpZyA9IHN0YWNrQ29uZmlnXG4gICAgdGhpcy5BcGlLZXlzID0gbmV3IEFwaUtleXMoYXBpLkdhdGV3YXlBY2Nlc3MsIHtcbiAgICAgIHBhcmVudFJvdXRlczoge1xuICAgICAgICBnZXQ6ICdnYXRld2F5X2lkcy5nYXRld2F5X2lkJyxcbiAgICAgICAgbGlzdDogJ2dhdGV3YXlfaWRzLmdhdGV3YXlfaWQnLFxuICAgICAgICBjcmVhdGU6ICdnYXRld2F5X2lkcy5nYXRld2F5X2lkJyxcbiAgICAgICAgdXBkYXRlOiAnZ2F0ZXdheV9pZHMuZ2F0ZXdheV9pZCcsXG4gICAgICB9LFxuICAgIH0pXG4gICAgdGhpcy5Db2xsYWJvcmF0b3JzID0gbmV3IENvbGxhYm9yYXRvcnMoYXBpLkdhdGV3YXlBY2Nlc3MsIHtcbiAgICAgIHBhcmVudFJvdXRlczoge1xuICAgICAgICBnZXQ6ICdnYXRld2F5X2lkcy5nYXRld2F5X2lkJyxcbiAgICAgICAgbGlzdDogJ2dhdGV3YXlfaWRzLmdhdGV3YXlfaWQnLFxuICAgICAgICBzZXQ6ICdnYXRld2F5X2lkcy5nYXRld2F5X2lkJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIF9lbWl0RGVmYXVsdHMocGF0aHMsIGdhdGV3YXkpIHtcbiAgICAvLyBIYW5kbGUgemVybyBjb29yZGluYXRlcyB0aGF0IGFyZSBzd2FsbG93ZWQgYnkgdGhlIGdycGMtZ2F0ZXdheSBmb3JcbiAgICAvLyBnYXRld2F5IGFudGVubmFzLlxuICAgIGlmIChwYXRocy5pbmNsdWRlcygnYW50ZW5uYXMnKSAmJiBCb29sZWFuKGdhdGV3YXkuYW50ZW5uYXMpKSB7XG4gICAgICBjb25zdCB7IGFudGVubmFzIH0gPSBnYXRld2F5XG5cbiAgICAgIGZvciAoY29uc3QgYW50ZW5uYSBvZiBhbnRlbm5hcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYW50ZW5uYSAhPT0gbnVsbCAmJlxuICAgICAgICAgIHR5cGVvZiBhbnRlbm5hID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgIGFudGVubmEubG9jYXRpb24gIT09IG51bGwgJiZcbiAgICAgICAgICB0eXBlb2YgYW50ZW5uYS5sb2NhdGlvbiA9PT0gJ29iamVjdCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCEoJ2FsdGl0dWRlJyBpbiBhbnRlbm5hLmxvY2F0aW9uKSkge1xuICAgICAgICAgICAgYW50ZW5uYS5sb2NhdGlvbi5hbHRpdHVkZSA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEoJ2xvbmdpdHVkZScgaW4gYW50ZW5uYS5sb2NhdGlvbikpIHtcbiAgICAgICAgICAgIGFudGVubmEubG9jYXRpb24ubG9uZ2l0dWRlID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoISgnbGF0aXR1ZGUnIGluIGFudGVubmEubG9jYXRpb24pKSB7XG4gICAgICAgICAgICBhbnRlbm5hLmxvY2F0aW9uLmxhdGl0dWRlID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtaXNzaW5nIGJvb2xlYW4gdmFsdWVzLlxuICAgIGlmIChwYXRocy5pbmNsdWRlcygnbG9jYXRpb25fcHVibGljJykgJiYgIUJvb2xlYW4oZ2F0ZXdheS5sb2NhdGlvbl9wdWJsaWMpKSB7XG4gICAgICBnYXRld2F5LmxvY2F0aW9uX3B1YmxpYyA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChwYXRocy5pbmNsdWRlcygnc3RhdHVzX3B1YmxpYycpICYmICFCb29sZWFuKGdhdGV3YXkuc3RhdHVzX3B1YmxpYykpIHtcbiAgICAgIGdhdGV3YXkuc3RhdHVzX3B1YmxpYyA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChwYXRocy5pbmNsdWRlcygnYXV0b191cGRhdGUnKSAmJiAhQm9vbGVhbihnYXRld2F5LmF1dG9fdXBkYXRlKSkge1xuICAgICAgZ2F0ZXdheS5hdXRvX3VwZGF0ZSA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChwYXRocy5pbmNsdWRlcygnc2NoZWR1bGVfZG93bmxpbmtfbGF0ZScpICYmICFCb29sZWFuKGdhdGV3YXkuc2NoZWR1bGVfZG93bmxpbmtfbGF0ZSkpIHtcbiAgICAgIGdhdGV3YXkuc2NoZWR1bGVfZG93bmxpbmtfbGF0ZSA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChcbiAgICAgIHBhdGhzLmluY2x1ZGVzKCdyZXF1aXJlX2F1dGhlbnRpY2F0ZWRfY29ubmVjdGlvbicpICYmXG4gICAgICAhQm9vbGVhbihnYXRld2F5LnJlcXVpcmVfYXV0aGVudGljYXRlZF9jb25uZWN0aW9uKVxuICAgICkge1xuICAgICAgZ2F0ZXdheS5yZXF1aXJlX2F1dGhlbnRpY2F0ZWRfY29ubmVjdGlvbiA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChcbiAgICAgIHBhdGhzLmluY2x1ZGVzKCd1cGRhdGVfbG9jYXRpb25fZnJvbV9zdGF0dXMnKSAmJlxuICAgICAgIUJvb2xlYW4oZ2F0ZXdheS51cGRhdGVfbG9jYXRpb25fZnJvbV9zdGF0dXMpXG4gICAgKSB7XG4gICAgICBnYXRld2F5LnVwZGF0ZV9sb2NhdGlvbl9mcm9tX3N0YXR1cyA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChcbiAgICAgIHBhdGhzLmluY2x1ZGVzKCdkaXNhYmxlX3BhY2tldF9icm9rZXJfZm9yd2FyZGluZycpICYmXG4gICAgICAhQm9vbGVhbihnYXRld2F5LmRpc2FibGVfcGFja2V0X2Jyb2tlcl9mb3J3YXJkaW5nKVxuICAgICkge1xuICAgICAgZ2F0ZXdheS5kaXNhYmxlX3BhY2tldF9icm9rZXJfZm9yd2FyZGluZyA9IGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIGdhdGV3YXlcbiAgfVxuXG4gIC8vIFJldHJpZXZhbC5cblxuICBhc3luYyBnZXRBbGwocGFyYW1zLCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLkdhdGV3YXlSZWdpc3RyeS5MaXN0KHVuZGVmaW5lZCwge1xuICAgICAgLi4ucGFyYW1zLFxuICAgICAgLi4uTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpLFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnVud3JhcEdhdGV3YXlzKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgZ2V0QnlJZChpZCwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBmaWVsZE1hc2sgPSBNYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvcilcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5HYXRld2F5UmVnaXN0cnkuR2V0KFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczogeyAnZ2F0ZXdheV9pZHMuZ2F0ZXdheV9pZCc6IGlkIH0sXG4gICAgICB9LFxuICAgICAgZmllbGRNYXNrLFxuICAgIClcblxuICAgIHJldHVybiB0aGlzLl9lbWl0RGVmYXVsdHMoZmllbGRNYXNrLmZpZWxkX21hc2sucGF0aHMsIE1hcnNoYWxlci51bndyYXBHYXRld2F5KHJlc3BvbnNlKSlcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaChwYXJhbXMsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuRW50aXR5UmVnaXN0cnlTZWFyY2guU2VhcmNoR2F0ZXdheXModW5kZWZpbmVkLCB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICAuLi5NYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvciksXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwR2F0ZXdheXMocmVzcG9uc2UpXG4gIH1cblxuICAvLyBVcGRhdGUuXG5cbiAgYXN5bmMgdXBkYXRlQnlJZChcbiAgICBpZCxcbiAgICBwYXRjaCxcbiAgICBtYXNrID0gTWFyc2hhbGVyLmZpZWxkTWFza0Zyb21QYXRjaChcbiAgICAgIHBhdGNoLFxuICAgICAgdGhpcy5fYXBpLkdhdGV3YXlSZWdpc3RyeS5VcGRhdGVBbGxvd2VkRmllbGRNYXNrUGF0aHMsXG4gICAgKSxcbiAgKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuR2F0ZXdheVJlZ2lzdHJ5LlVwZGF0ZShcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHsgJ2dhdGV3YXkuaWRzLmdhdGV3YXlfaWQnOiBpZCB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZ2F0ZXdheTogcGF0Y2gsXG4gICAgICAgIGZpZWxkX21hc2s6IE1hcnNoYWxlci5maWVsZE1hc2sobWFzayksXG4gICAgICB9LFxuICAgIClcblxuICAgIHJldHVybiB0aGlzLl9lbWl0RGVmYXVsdHMobWFzaywgTWFyc2hhbGVyLnVud3JhcEdhdGV3YXkocmVzcG9uc2UpKVxuICB9XG5cbiAgYXN5bmMgcmVzdG9yZUJ5SWQoaWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5HYXRld2F5UmVnaXN0cnkuUmVzdG9yZSh7XG4gICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICBnYXRld2F5X2lkOiBpZCxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgLy8gQ3JlYXRpb24uXG5cbiAgYXN5bmMgY3JlYXRlKG93bmVySWQgPSB0aGlzLl9kZWZhdWx0VXNlcklkLCBnYXRld2F5LCBpc1VzZXJPd25lciA9IHRydWUpIHtcbiAgICBjb25zdCByb3V0ZVBhcmFtcyA9IGlzVXNlck93bmVyXG4gICAgICA/IHsgJ2NvbGxhYm9yYXRvci51c2VyX2lkcy51c2VyX2lkJzogb3duZXJJZCB9XG4gICAgICA6IHsgJ2NvbGxhYm9yYXRvci5vcmdhbml6YXRpb25faWRzLm9yZ2FuaXphdGlvbl9pZCc6IG93bmVySWQgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLkdhdGV3YXlSZWdpc3RyeS5DcmVhdGUoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zLFxuICAgICAgfSxcbiAgICAgIHsgZ2F0ZXdheSB9LFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwR2F0ZXdheShyZXNwb25zZSlcbiAgfVxuXG4gIC8vIERlbGV0aW9uLlxuXG4gIGFzeW5jIGRlbGV0ZUJ5SWQoaWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5HYXRld2F5UmVnaXN0cnkuRGVsZXRlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IGdhdGV3YXlfaWQ6IGlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgcHVyZ2VCeUlkKGlkKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuR2F0ZXdheVJlZ2lzdHJ5LlB1cmdlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IGdhdGV3YXlfaWQ6IGlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgLy8gTWlzY2VsbGFuZW91cy5cblxuICBhc3luYyBnZXRTdGF0aXN0aWNzQnlJZChpZCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLkdzLkdldEdhdGV3YXlDb25uZWN0aW9uU3RhdHMoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgZ2F0ZXdheV9pZDogaWQgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpXG4gIH1cblxuICBhc3luYyBnZXRSaWdodHNCeUlkKGdhdGV3YXlJZCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HYXRld2F5QWNjZXNzLkxpc3RSaWdodHMoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgZ2F0ZXdheV9pZDogZ2F0ZXdheUlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwUmlnaHRzKHJlc3VsdClcbiAgfVxuXG4gIC8vIEV2ZW50cyBTdHJlYW1cblxuICBhc3luYyBvcGVuU3RyZWFtKGlkZW50aWZpZXJzLCB0YWlsLCBhZnRlcikge1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBpZGVudGlmaWVyczogaWRlbnRpZmllcnMubWFwKGlkID0+ICh7XG4gICAgICAgIGdhdGV3YXlfaWRzOiB7IGdhdGV3YXlfaWQ6IGlkIH0sXG4gICAgICB9KSksXG4gICAgICB0YWlsLFxuICAgICAgYWZ0ZXIsXG4gICAgfVxuXG4gICAgLy8gRXZlbnQgc3RyZWFtcyBjYW4gY29tZSBmcm9tIG11bHRpcGxlIHN0YWNrIGNvbXBvbmVudHMuIEl0IGlzIG5lY2Vzc2FyeSB0b1xuICAgIC8vIGNoZWNrIGZvciBzdGFjayBjb21wb25lbnRzIG9uIGRpZmZlcmVudCBob3N0cyBhbmQgb3BlbiBkaXN0aW5jdCBzdHJlYW1cbiAgICAvLyBjb25uZWN0aW9ucyBmb3IgYW55IGRpc3RpbmN0IGhvc3QgaWYgbmVlZCBiZS5cbiAgICBjb25zdCBkaXN0aW5jdENvbXBvbmVudHMgPSB0aGlzLl9zdGFja0NvbmZpZy5nZXRDb21wb25lbnRzV2l0aERpc3RpbmN0QmFzZVVybHMoW1xuICAgICAgU1RBQ0tfQ09NUE9ORU5UU19NQVAuaXMsXG4gICAgICBTVEFDS19DT01QT05FTlRTX01BUC5ncyxcbiAgICBdKVxuXG4gICAgY29uc3Qgc3RyZWFtcyA9IGRpc3RpbmN0Q29tcG9uZW50cy5tYXAoY29tcG9uZW50ID0+XG4gICAgICB0aGlzLl9hcGkuRXZlbnRzLlN0cmVhbSh7IGNvbXBvbmVudCB9LCBwYXlsb2FkKSxcbiAgICApXG5cbiAgICAvLyBDb21iaW5lIGFsbCBzdHJlYW0gc291cmNlcyB0byBvbmUgc3Vic2NyaXB0aW9uIGdlbmVyYXRvci5cbiAgICByZXR1cm4gY29tYmluZVN0cmVhbXMoc3RyZWFtcylcbiAgfVxuXG4gIC8vIEdhdGV3YXkgQ29uZmlndXJhdGlvbiBTZXJ2ZXIuXG5cbiAgYXN5bmMgZ2V0R2xvYmFsQ29uZihnYXRld2F5SWQpIHtcbiAgICAvLyBFbmRwb2ludCBoYXJkY29kZWQgYmVjYXVzZSBpdCBpcyBub3QgcGFydCBvZiB0aGUgZ1JQQyBBUEkuXG4gICAgLy8gUmVmYWN0b3IgaW1wbGVtZW50YXRpb24gb25jZSB0aGUgZm9sbG93aW5nIGlzc3VlIGlzIHJlc29sdmVkOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9UaGVUaGluZ3NOZXR3b3JrL2xvcmF3YW4tc3RhY2svaXNzdWVzLzMyODBcbiAgICBjb25zdCBlbmRwb2ludCA9IGAvZ2NzL2dhdGV3YXlzLyR7Z2F0ZXdheUlkfS9zZW10ZWNodWRwL2dsb2JhbF9jb25mLmpzb25gXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5fY29ubmVjdG9yLmhhbmRsZVJlcXVlc3QoJ2dldCcsIGVuZHBvaW50LCAnZ2NzJywgZmFsc2UpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZS5kYXRhKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhdGV3YXlzXG4iXX0=