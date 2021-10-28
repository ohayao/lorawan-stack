"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequests = exports.splitGetPaths = exports.splitSetPaths = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _traverse = _interopRequireDefault(require("traverse"));

var _marshaler = _interopRequireDefault(require("../../util/marshaler"));

var _deviceEntityMap = _interopRequireDefault(require("../../../generated/device-entity-map.json"));

var _constants = require("../../util/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var IS = _constants.STACK_COMPONENTS_MAP.is,
    NS = _constants.STACK_COMPONENTS_MAP.ns,
    AS = _constants.STACK_COMPONENTS_MAP.as,
    JS = _constants.STACK_COMPONENTS_MAP.js;
/**
 * Takes the requested paths of the device and returns a request tree. The
 * splitting is achieved by looking up path responsibilities as defined in the
 * generated device entity map json.
 *
 * @param {object} paths - The requested paths (from the field mask) of the
 * device.
 * @param {string} direction - The direction, either 'set' or 'get'.
 * @param {object} base - An optional base value for the returned request tree.
 * @param {object} components - A component whitelist, unincluded components
 * will be excluded from the request tree.
 * @returns {object} A request tree object, consisting of resulting paths for
 * each component eg: `{ is: ['ids'], as: ['session'], js: ['root_keys'] }`.
 */

var splitPaths = function splitPaths() {
  var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [IS, NS, AS, JS];
  var result = base;
  var retrieveIndex = direction === 'get' ? 0 : 1;

  var _iterator = _createForOfIteratorHelper(paths),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var path = _step.value;
      // Look up the current path in the device entity map.
      var subtree = (0, _traverse["default"])(_deviceEntityMap["default"]).get(path) || (0, _traverse["default"])(_deviceEntityMap["default"]).get([path[0]]);

      if (!subtree) {
        throw new Error("Invalid or unknown field mask path used: ".concat(path));
      }

      var definition = '_root' in subtree ? subtree._root[retrieveIndex] : subtree[retrieveIndex];

      var map = function map(requestTree, component, path) {
        if (components.includes(component)) {
          result[component] = !result[component] ? [path] : [].concat((0, _toConsumableArray2["default"])(result[component]), [path]);
        }
      };

      if (definition) {
        if (definition instanceof Array) {
          var _iterator2 = _createForOfIteratorHelper(definition),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var component = _step2.value;
              map(result, component, path);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          map(result, definition, path);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
};
/**
 * A wrapper function to obtain a request tree for writing values to a device.
 *
 * @param {object} paths - The requested paths (from the field mask) of the
 * device.
 * @param {object} base - An optional base value for the returned request tree.
 * @param {object} components - A component whitelist, unincluded components
 * will be excluded from the request tree.
 * @returns {object} A request tree object, consisting of resulting paths for
 * each component eg: `{ is: ['ids'], as: ['session'], js: ['root_keys'] }`.
 */


var splitSetPaths = function splitSetPaths(paths, base, components) {
  return splitPaths(paths, 'set', base, components);
};
/**
 * A wrapper function to obtain a request tree for reading values to a device.
 *
 * @param {object} paths - The requested paths (from the field mask) of the
 * device.
 * @param {object} base - An optional base value for the returned request tree.
 * @param {object} components - A component whitelist, unincluded components
 * will be excluded from the request tree.
 * @returns {object} A request tree object, consisting of resulting paths for
 * each component eg: `{ is: ['ids'], as: ['session'], js: ['root_keys'] }`.
 */


exports.splitSetPaths = splitSetPaths;

var splitGetPaths = function splitGetPaths(paths, base, components) {
  return splitPaths(paths, 'get', base, components);
};
/**
 * `makeRequests` will make the necessary api calls based on the request tree
 * and other options.
 *
 * @param {object} api - The Api object as passed to the service.
 * @param {object} stackConfig - The Things Stack config object.
 * @param {string} operation - The operation, an enum of 'create', 'set', 'get'
 * and 'delete'.
 * @param {string} requestTree - The request tree, as returned by the
 * `splitPaths` function.
 * @param {object} params - The parameters object to be passed to the requests.
 * @param {object} payload - The payload to be passed to the requests.
 * @param {boolean} ignoreNotFound - Flag indicating whether not found errors
 * should be translated to an empty device instead of throwing.
 * @returns {object} An array of device registry responses together with the
 * paths (field_mask) that they were requested with.
 */


exports.splitGetPaths = splitGetPaths;

var makeRequests = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(api, stackConfig, operation, requestTree, params) {
    var payload,
        ignoreNotFound,
        isCreate,
        isSet,
        isDelete,
        rpcFunction,
        requestWrapper,
        splitPayload,
        requests,
        _end_device,
        _end_device$ids,
        device_id,
        result,
        _payload$end_device,
        end_device,
        func,
        responses,
        _iterator4,
        _step4,
        _step4$value,
        i,
        response,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            payload = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : {};
            ignoreNotFound = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : false;
            isCreate = operation === 'create';
            isSet = operation === 'set';
            isDelete = operation === 'delete';
            rpcFunction = isSet || isCreate ? 'Set' : isDelete ? 'Delete' : 'Get'; // Use a wrapper for the api calls to control the result object and allow
            // ignoring not found errors per component, if wished.

            requestWrapper = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(call, params, component, payload) {
                var ignoreRequestNotFound,
                    res,
                    _result,
                    _args = arguments;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        ignoreRequestNotFound = _args.length > 4 && _args[4] !== undefined ? _args[4] : ignoreNotFound;
                        res = {
                          hasAttempted: true,
                          component: component,
                          paths: requestTree[component],
                          hasErrored: false
                        };
                        _context.prev = 2;
                        _context.next = 5;
                        return call(params, !isDelete ? payload : undefined);

                      case 5:
                        _result = _context.sent;
                        return _context.abrupt("return", _objectSpread(_objectSpread({}, res), {}, {
                          device: _marshaler["default"].payloadSingleResponse(_result)
                        }));

                      case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](2);

                        if (!(_context.t0.code === 5 && ignoreRequestNotFound)) {
                          _context.next = 13;
                          break;
                        }

                        return _context.abrupt("return", _objectSpread(_objectSpread({}, res), {}, {
                          device: {}
                        }));

                      case 13:
                        return _context.abrupt("return", _objectSpread(_objectSpread({}, res), {}, {
                          hasErrored: true,
                          error: _context.t0
                        }));

                      case 14:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[2, 9]]);
              }));

              return function requestWrapper(_x6, _x7, _x8, _x9) {
                return _ref2.apply(this, arguments);
              };
            }(); // Split end device payload per stack component.


            splitPayload = function splitPayload() {
              var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var paths = arguments.length > 1 ? arguments[1] : undefined;
              var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

              if (!Boolean(payload.end_device)) {
                return payload;
              }

              var end_device = payload.end_device;
              var result = (0, _traverse["default"])(base);
              var endDevice = (0, _traverse["default"])(end_device);

              var _iterator3 = _createForOfIteratorHelper(paths),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var path = _step3.value;
                  result.set(path, endDevice.get(path));
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              return _marshaler["default"].payload(result.value, 'end_device');
            };

            requests = new Array(3);

            if (isSet && !('end_device.ids.device_id' in params.routeParams)) {
              // Ensure using the PUT method by setting the device id route param. This
              // ensures upserting without issues.
              _end_device = payload.end_device;
              _end_device$ids = _end_device.ids;
              _end_device$ids = _end_device$ids === void 0 ? {} : _end_device$ids;
              device_id = _end_device$ids.device_id;

              if (device_id) {
                params.routeParams['end_device.ids.device_id'] = device_id;
              }
            }

            result = [{
              component: NS,
              hasAttempted: false,
              hasErrored: false
            }, {
              component: AS,
              hasAttempted: false,
              hasErrored: false
            }, {
              component: JS,
              hasAttempted: false,
              hasErrored: false
            }, {
              component: IS,
              hasAttempted: false,
              hasErrored: false
            }];
            _payload$end_device = payload.end_device, end_device = _payload$end_device === void 0 ? {} : _payload$end_device; // Do a possible IS request first.

            if (!(stackConfig.isComponentAvailable(IS) && IS in requestTree)) {
              _context2.next = 21;
              break;
            }

            if (isSet) {
              func = 'Update';
            } else if (isCreate) {
              func = 'Create';
            } else if (isDelete) {
              func = 'Delete';
            } else {
              func = 'Get';
            }

            _context2.next = 16;
            return requestWrapper(api.EndDeviceRegistry[func], params, IS, _objectSpread(_objectSpread({}, splitPayload(payload, requestTree.is, {
              ids: end_device.ids
            })), _marshaler["default"].pathsToFieldMask(requestTree.is)), false);

          case 16:
            result[3] = _context2.sent;

            if (!isCreate) {
              _context2.next = 21;
              break;
            }

            if (!result[3].hasErrored) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", result);

          case 20:
            // Set the device id param based on the id of the newly created device.
            params.routeParams['end_device.ids.device_id'] = result[3].device.ids.device_id;

          case 21:
            // Compose an array of possible api calls to NS, AS, JS.
            if (stackConfig.isComponentAvailable(NS) && NS in requestTree) {
              requests[0] = requestWrapper(api.NsEndDeviceRegistry[rpcFunction], params, NS, _objectSpread(_objectSpread({}, splitPayload(payload, requestTree[NS])), _marshaler["default"].pathsToFieldMask(requestTree[NS])));
            }

            if (stackConfig.isComponentAvailable(AS) && AS in requestTree) {
              requests[1] = requestWrapper(api.AsEndDeviceRegistry[rpcFunction], params, AS, _objectSpread(_objectSpread({}, splitPayload(payload, requestTree[AS])), _marshaler["default"].pathsToFieldMask(requestTree[AS])));
            }

            if (stackConfig.isComponentAvailable(JS) && JS in requestTree) {
              requests[2] = requestWrapper(api.JsEndDeviceRegistry[rpcFunction], params, JS, _objectSpread(_objectSpread({}, splitPayload(payload, requestTree[JS], {
                ids: end_device.ids
              })), _marshaler["default"].pathsToFieldMask(requestTree[JS])));
            } // Run the requests in parallel.


            _context2.next = 26;
            return Promise.all(requests);

          case 26:
            responses = _context2.sent;
            // Attach the results to the result array.
            _iterator4 = _createForOfIteratorHelper(responses.entries());

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2), i = _step4$value[0], response = _step4$value[1];

                if (response) {
                  result[i] = response;
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            return _context2.abrupt("return", result);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function makeRequests(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.makeRequests = makeRequests;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2RldmljZXMvc3BsaXQuanMiXSwibmFtZXMiOlsiSVMiLCJTVEFDS19DT01QT05FTlRTX01BUCIsImlzIiwiTlMiLCJucyIsIkFTIiwiYXMiLCJKUyIsImpzIiwic3BsaXRQYXRocyIsInBhdGhzIiwiZGlyZWN0aW9uIiwiYmFzZSIsImNvbXBvbmVudHMiLCJyZXN1bHQiLCJyZXRyaWV2ZUluZGV4IiwicGF0aCIsInN1YnRyZWUiLCJkZXZpY2VFbnRpdHlNYXAiLCJnZXQiLCJFcnJvciIsImRlZmluaXRpb24iLCJfcm9vdCIsIm1hcCIsInJlcXVlc3RUcmVlIiwiY29tcG9uZW50IiwiaW5jbHVkZXMiLCJBcnJheSIsInNwbGl0U2V0UGF0aHMiLCJzcGxpdEdldFBhdGhzIiwibWFrZVJlcXVlc3RzIiwiYXBpIiwic3RhY2tDb25maWciLCJvcGVyYXRpb24iLCJwYXJhbXMiLCJwYXlsb2FkIiwiaWdub3JlTm90Rm91bmQiLCJpc0NyZWF0ZSIsImlzU2V0IiwiaXNEZWxldGUiLCJycGNGdW5jdGlvbiIsInJlcXVlc3RXcmFwcGVyIiwiY2FsbCIsImlnbm9yZVJlcXVlc3ROb3RGb3VuZCIsInJlcyIsImhhc0F0dGVtcHRlZCIsImhhc0Vycm9yZWQiLCJ1bmRlZmluZWQiLCJkZXZpY2UiLCJNYXJzaGFsZXIiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJjb2RlIiwiZXJyb3IiLCJzcGxpdFBheWxvYWQiLCJCb29sZWFuIiwiZW5kX2RldmljZSIsImVuZERldmljZSIsInNldCIsInZhbHVlIiwicmVxdWVzdHMiLCJyb3V0ZVBhcmFtcyIsImlkcyIsImRldmljZV9pZCIsImlzQ29tcG9uZW50QXZhaWxhYmxlIiwiZnVuYyIsIkVuZERldmljZVJlZ2lzdHJ5IiwicGF0aHNUb0ZpZWxkTWFzayIsIk5zRW5kRGV2aWNlUmVnaXN0cnkiLCJBc0VuZERldmljZVJlZ2lzdHJ5IiwiSnNFbmREZXZpY2VSZWdpc3RyeSIsIlByb21pc2Ui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QixZQUFZO0FBQUE7QUFBQTtBQUFBLEdBQWxCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAndHJhdmVyc2UnXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vLi4vdXRpbC9tYXJzaGFsZXInXG5pbXBvcnQgZGV2aWNlRW50aXR5TWFwIGZyb20gJy4uLy4uLy4uL2dlbmVyYXRlZC9kZXZpY2UtZW50aXR5LW1hcC5qc29uJ1xuaW1wb3J0IHsgU1RBQ0tfQ09NUE9ORU5UU19NQVAgfSBmcm9tICcuLi8uLi91dGlsL2NvbnN0YW50cydcblxuY29uc3QgeyBpczogSVMsIG5zOiBOUywgYXM6IEFTLCBqczogSlMgfSA9IFNUQUNLX0NPTVBPTkVOVFNfTUFQXG5cbi8qKlxuICogVGFrZXMgdGhlIHJlcXVlc3RlZCBwYXRocyBvZiB0aGUgZGV2aWNlIGFuZCByZXR1cm5zIGEgcmVxdWVzdCB0cmVlLiBUaGVcbiAqIHNwbGl0dGluZyBpcyBhY2hpZXZlZCBieSBsb29raW5nIHVwIHBhdGggcmVzcG9uc2liaWxpdGllcyBhcyBkZWZpbmVkIGluIHRoZVxuICogZ2VuZXJhdGVkIGRldmljZSBlbnRpdHkgbWFwIGpzb24uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhdGhzIC0gVGhlIHJlcXVlc3RlZCBwYXRocyAoZnJvbSB0aGUgZmllbGQgbWFzaykgb2YgdGhlXG4gKiBkZXZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIC0gVGhlIGRpcmVjdGlvbiwgZWl0aGVyICdzZXQnIG9yICdnZXQnLlxuICogQHBhcmFtIHtvYmplY3R9IGJhc2UgLSBBbiBvcHRpb25hbCBiYXNlIHZhbHVlIGZvciB0aGUgcmV0dXJuZWQgcmVxdWVzdCB0cmVlLlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudHMgLSBBIGNvbXBvbmVudCB3aGl0ZWxpc3QsIHVuaW5jbHVkZWQgY29tcG9uZW50c1xuICogd2lsbCBiZSBleGNsdWRlZCBmcm9tIHRoZSByZXF1ZXN0IHRyZWUuXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIHJlcXVlc3QgdHJlZSBvYmplY3QsIGNvbnNpc3Rpbmcgb2YgcmVzdWx0aW5nIHBhdGhzIGZvclxuICogZWFjaCBjb21wb25lbnQgZWc6IGB7IGlzOiBbJ2lkcyddLCBhczogWydzZXNzaW9uJ10sIGpzOiBbJ3Jvb3Rfa2V5cyddIH1gLlxuICovXG5jb25zdCBzcGxpdFBhdGhzID0gKHBhdGhzID0gW10sIGRpcmVjdGlvbiwgYmFzZSA9IHt9LCBjb21wb25lbnRzID0gW0lTLCBOUywgQVMsIEpTXSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBiYXNlXG4gIGNvbnN0IHJldHJpZXZlSW5kZXggPSBkaXJlY3Rpb24gPT09ICdnZXQnID8gMCA6IDFcblxuICBmb3IgKGNvbnN0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAvLyBMb29rIHVwIHRoZSBjdXJyZW50IHBhdGggaW4gdGhlIGRldmljZSBlbnRpdHkgbWFwLlxuICAgIGNvbnN0IHN1YnRyZWUgPSB0cmF2ZXJzZShkZXZpY2VFbnRpdHlNYXApLmdldChwYXRoKSB8fCB0cmF2ZXJzZShkZXZpY2VFbnRpdHlNYXApLmdldChbcGF0aFswXV0pXG5cbiAgICBpZiAoIXN1YnRyZWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBvciB1bmtub3duIGZpZWxkIG1hc2sgcGF0aCB1c2VkOiAke3BhdGh9YClcbiAgICB9XG5cbiAgICBjb25zdCBkZWZpbml0aW9uID0gJ19yb290JyBpbiBzdWJ0cmVlID8gc3VidHJlZS5fcm9vdFtyZXRyaWV2ZUluZGV4XSA6IHN1YnRyZWVbcmV0cmlldmVJbmRleF1cblxuICAgIGNvbnN0IG1hcCA9IChyZXF1ZXN0VHJlZSwgY29tcG9uZW50LCBwYXRoKSA9PiB7XG4gICAgICBpZiAoY29tcG9uZW50cy5pbmNsdWRlcyhjb21wb25lbnQpKSB7XG4gICAgICAgIHJlc3VsdFtjb21wb25lbnRdID0gIXJlc3VsdFtjb21wb25lbnRdID8gW3BhdGhdIDogWy4uLnJlc3VsdFtjb21wb25lbnRdLCBwYXRoXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICBpZiAoZGVmaW5pdGlvbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIGRlZmluaXRpb24pIHtcbiAgICAgICAgICBtYXAocmVzdWx0LCBjb21wb25lbnQsIHBhdGgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcChyZXN1bHQsIGRlZmluaXRpb24sIHBhdGgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBBIHdyYXBwZXIgZnVuY3Rpb24gdG8gb2J0YWluIGEgcmVxdWVzdCB0cmVlIGZvciB3cml0aW5nIHZhbHVlcyB0byBhIGRldmljZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGF0aHMgLSBUaGUgcmVxdWVzdGVkIHBhdGhzIChmcm9tIHRoZSBmaWVsZCBtYXNrKSBvZiB0aGVcbiAqIGRldmljZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBiYXNlIC0gQW4gb3B0aW9uYWwgYmFzZSB2YWx1ZSBmb3IgdGhlIHJldHVybmVkIHJlcXVlc3QgdHJlZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnRzIC0gQSBjb21wb25lbnQgd2hpdGVsaXN0LCB1bmluY2x1ZGVkIGNvbXBvbmVudHNcbiAqIHdpbGwgYmUgZXhjbHVkZWQgZnJvbSB0aGUgcmVxdWVzdCB0cmVlLlxuICogQHJldHVybnMge29iamVjdH0gQSByZXF1ZXN0IHRyZWUgb2JqZWN0LCBjb25zaXN0aW5nIG9mIHJlc3VsdGluZyBwYXRocyBmb3JcbiAqIGVhY2ggY29tcG9uZW50IGVnOiBgeyBpczogWydpZHMnXSwgYXM6IFsnc2Vzc2lvbiddLCBqczogWydyb290X2tleXMnXSB9YC5cbiAqL1xuZXhwb3J0IGNvbnN0IHNwbGl0U2V0UGF0aHMgPSAocGF0aHMsIGJhc2UsIGNvbXBvbmVudHMpID0+IHNwbGl0UGF0aHMocGF0aHMsICdzZXQnLCBiYXNlLCBjb21wb25lbnRzKVxuXG4vKipcbiAqIEEgd3JhcHBlciBmdW5jdGlvbiB0byBvYnRhaW4gYSByZXF1ZXN0IHRyZWUgZm9yIHJlYWRpbmcgdmFsdWVzIHRvIGEgZGV2aWNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRocyAtIFRoZSByZXF1ZXN0ZWQgcGF0aHMgKGZyb20gdGhlIGZpZWxkIG1hc2spIG9mIHRoZVxuICogZGV2aWNlLlxuICogQHBhcmFtIHtvYmplY3R9IGJhc2UgLSBBbiBvcHRpb25hbCBiYXNlIHZhbHVlIGZvciB0aGUgcmV0dXJuZWQgcmVxdWVzdCB0cmVlLlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudHMgLSBBIGNvbXBvbmVudCB3aGl0ZWxpc3QsIHVuaW5jbHVkZWQgY29tcG9uZW50c1xuICogd2lsbCBiZSBleGNsdWRlZCBmcm9tIHRoZSByZXF1ZXN0IHRyZWUuXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIHJlcXVlc3QgdHJlZSBvYmplY3QsIGNvbnNpc3Rpbmcgb2YgcmVzdWx0aW5nIHBhdGhzIGZvclxuICogZWFjaCBjb21wb25lbnQgZWc6IGB7IGlzOiBbJ2lkcyddLCBhczogWydzZXNzaW9uJ10sIGpzOiBbJ3Jvb3Rfa2V5cyddIH1gLlxuICovXG5leHBvcnQgY29uc3Qgc3BsaXRHZXRQYXRocyA9IChwYXRocywgYmFzZSwgY29tcG9uZW50cykgPT4gc3BsaXRQYXRocyhwYXRocywgJ2dldCcsIGJhc2UsIGNvbXBvbmVudHMpXG5cbi8qKlxuICogYG1ha2VSZXF1ZXN0c2Agd2lsbCBtYWtlIHRoZSBuZWNlc3NhcnkgYXBpIGNhbGxzIGJhc2VkIG9uIHRoZSByZXF1ZXN0IHRyZWVcbiAqIGFuZCBvdGhlciBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcGkgLSBUaGUgQXBpIG9iamVjdCBhcyBwYXNzZWQgdG8gdGhlIHNlcnZpY2UuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhY2tDb25maWcgLSBUaGUgVGhpbmdzIFN0YWNrIGNvbmZpZyBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3BlcmF0aW9uIC0gVGhlIG9wZXJhdGlvbiwgYW4gZW51bSBvZiAnY3JlYXRlJywgJ3NldCcsICdnZXQnXG4gKiBhbmQgJ2RlbGV0ZScuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdFRyZWUgLSBUaGUgcmVxdWVzdCB0cmVlLCBhcyByZXR1cm5lZCBieSB0aGVcbiAqIGBzcGxpdFBhdGhzYCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIHRoZSByZXF1ZXN0cy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQgdG8gYmUgcGFzc2VkIHRvIHRoZSByZXF1ZXN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlTm90Rm91bmQgLSBGbGFnIGluZGljYXRpbmcgd2hldGhlciBub3QgZm91bmQgZXJyb3JzXG4gKiBzaG91bGQgYmUgdHJhbnNsYXRlZCB0byBhbiBlbXB0eSBkZXZpY2UgaW5zdGVhZCBvZiB0aHJvd2luZy5cbiAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGFycmF5IG9mIGRldmljZSByZWdpc3RyeSByZXNwb25zZXMgdG9nZXRoZXIgd2l0aCB0aGVcbiAqIHBhdGhzIChmaWVsZF9tYXNrKSB0aGF0IHRoZXkgd2VyZSByZXF1ZXN0ZWQgd2l0aC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1ha2VSZXF1ZXN0cyA9IGFzeW5jIChcbiAgYXBpLFxuICBzdGFja0NvbmZpZyxcbiAgb3BlcmF0aW9uLFxuICByZXF1ZXN0VHJlZSxcbiAgcGFyYW1zLFxuICBwYXlsb2FkID0ge30sXG4gIGlnbm9yZU5vdEZvdW5kID0gZmFsc2UsXG4pID0+IHtcbiAgY29uc3QgaXNDcmVhdGUgPSBvcGVyYXRpb24gPT09ICdjcmVhdGUnXG4gIGNvbnN0IGlzU2V0ID0gb3BlcmF0aW9uID09PSAnc2V0J1xuICBjb25zdCBpc0RlbGV0ZSA9IG9wZXJhdGlvbiA9PT0gJ2RlbGV0ZSdcbiAgY29uc3QgcnBjRnVuY3Rpb24gPSBpc1NldCB8fCBpc0NyZWF0ZSA/ICdTZXQnIDogaXNEZWxldGUgPyAnRGVsZXRlJyA6ICdHZXQnXG5cbiAgLy8gVXNlIGEgd3JhcHBlciBmb3IgdGhlIGFwaSBjYWxscyB0byBjb250cm9sIHRoZSByZXN1bHQgb2JqZWN0IGFuZCBhbGxvd1xuICAvLyBpZ25vcmluZyBub3QgZm91bmQgZXJyb3JzIHBlciBjb21wb25lbnQsIGlmIHdpc2hlZC5cbiAgY29uc3QgcmVxdWVzdFdyYXBwZXIgPSBhc3luYyAoXG4gICAgY2FsbCxcbiAgICBwYXJhbXMsXG4gICAgY29tcG9uZW50LFxuICAgIHBheWxvYWQsXG4gICAgaWdub3JlUmVxdWVzdE5vdEZvdW5kID0gaWdub3JlTm90Rm91bmQsXG4gICkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IHsgaGFzQXR0ZW1wdGVkOiB0cnVlLCBjb21wb25lbnQsIHBhdGhzOiByZXF1ZXN0VHJlZVtjb21wb25lbnRdLCBoYXNFcnJvcmVkOiBmYWxzZSB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGwocGFyYW1zLCAhaXNEZWxldGUgPyBwYXlsb2FkIDogdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIHsgLi4ucmVzLCBkZXZpY2U6IE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KSB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSA1ICYmIGlnbm9yZVJlcXVlc3ROb3RGb3VuZCkge1xuICAgICAgICByZXR1cm4geyAuLi5yZXMsIGRldmljZToge30gfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyAuLi5yZXMsIGhhc0Vycm9yZWQ6IHRydWUsIGVycm9yIH1cbiAgICB9XG4gIH1cblxuICAvLyBTcGxpdCBlbmQgZGV2aWNlIHBheWxvYWQgcGVyIHN0YWNrIGNvbXBvbmVudC5cbiAgY29uc3Qgc3BsaXRQYXlsb2FkID0gKHBheWxvYWQgPSB7fSwgcGF0aHMsIGJhc2UgPSB7fSkgPT4ge1xuICAgIGlmICghQm9vbGVhbihwYXlsb2FkLmVuZF9kZXZpY2UpKSB7XG4gICAgICByZXR1cm4gcGF5bG9hZFxuICAgIH1cblxuICAgIGNvbnN0IHsgZW5kX2RldmljZSB9ID0gcGF5bG9hZFxuXG4gICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoYmFzZSlcbiAgICBjb25zdCBlbmREZXZpY2UgPSB0cmF2ZXJzZShlbmRfZGV2aWNlKVxuXG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICByZXN1bHQuc2V0KHBhdGgsIGVuZERldmljZS5nZXQocGF0aCkpXG4gICAgfVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkKHJlc3VsdC52YWx1ZSwgJ2VuZF9kZXZpY2UnKVxuICB9XG5cbiAgY29uc3QgcmVxdWVzdHMgPSBuZXcgQXJyYXkoMylcblxuICBpZiAoaXNTZXQgJiYgISgnZW5kX2RldmljZS5pZHMuZGV2aWNlX2lkJyBpbiBwYXJhbXMucm91dGVQYXJhbXMpKSB7XG4gICAgLy8gRW5zdXJlIHVzaW5nIHRoZSBQVVQgbWV0aG9kIGJ5IHNldHRpbmcgdGhlIGRldmljZSBpZCByb3V0ZSBwYXJhbS4gVGhpc1xuICAgIC8vIGVuc3VyZXMgdXBzZXJ0aW5nIHdpdGhvdXQgaXNzdWVzLlxuICAgIGNvbnN0IHsgZW5kX2RldmljZSB9ID0gcGF5bG9hZFxuICAgIGNvbnN0IHsgaWRzOiB7IGRldmljZV9pZCB9ID0ge30gfSA9IGVuZF9kZXZpY2VcbiAgICBpZiAoZGV2aWNlX2lkKSB7XG4gICAgICBwYXJhbXMucm91dGVQYXJhbXNbJ2VuZF9kZXZpY2UuaWRzLmRldmljZV9pZCddID0gZGV2aWNlX2lkXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gW1xuICAgIHsgY29tcG9uZW50OiBOUywgaGFzQXR0ZW1wdGVkOiBmYWxzZSwgaGFzRXJyb3JlZDogZmFsc2UgfSxcbiAgICB7IGNvbXBvbmVudDogQVMsIGhhc0F0dGVtcHRlZDogZmFsc2UsIGhhc0Vycm9yZWQ6IGZhbHNlIH0sXG4gICAgeyBjb21wb25lbnQ6IEpTLCBoYXNBdHRlbXB0ZWQ6IGZhbHNlLCBoYXNFcnJvcmVkOiBmYWxzZSB9LFxuICAgIHsgY29tcG9uZW50OiBJUywgaGFzQXR0ZW1wdGVkOiBmYWxzZSwgaGFzRXJyb3JlZDogZmFsc2UgfSxcbiAgXVxuXG4gIGNvbnN0IHsgZW5kX2RldmljZSA9IHt9IH0gPSBwYXlsb2FkXG5cbiAgLy8gRG8gYSBwb3NzaWJsZSBJUyByZXF1ZXN0IGZpcnN0LlxuICBpZiAoc3RhY2tDb25maWcuaXNDb21wb25lbnRBdmFpbGFibGUoSVMpICYmIElTIGluIHJlcXVlc3RUcmVlKSB7XG4gICAgbGV0IGZ1bmNcbiAgICBpZiAoaXNTZXQpIHtcbiAgICAgIGZ1bmMgPSAnVXBkYXRlJ1xuICAgIH0gZWxzZSBpZiAoaXNDcmVhdGUpIHtcbiAgICAgIGZ1bmMgPSAnQ3JlYXRlJ1xuICAgIH0gZWxzZSBpZiAoaXNEZWxldGUpIHtcbiAgICAgIGZ1bmMgPSAnRGVsZXRlJ1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jID0gJ0dldCdcbiAgICB9XG5cbiAgICByZXN1bHRbM10gPSBhd2FpdCByZXF1ZXN0V3JhcHBlcihcbiAgICAgIGFwaS5FbmREZXZpY2VSZWdpc3RyeVtmdW5jXSxcbiAgICAgIHBhcmFtcyxcbiAgICAgIElTLFxuICAgICAge1xuICAgICAgICAuLi5zcGxpdFBheWxvYWQocGF5bG9hZCwgcmVxdWVzdFRyZWUuaXMsIHsgaWRzOiBlbmRfZGV2aWNlLmlkcyB9KSxcbiAgICAgICAgLi4uTWFyc2hhbGVyLnBhdGhzVG9GaWVsZE1hc2socmVxdWVzdFRyZWUuaXMpLFxuICAgICAgfSxcbiAgICAgIGZhbHNlLFxuICAgIClcblxuICAgIGlmIChpc0NyZWF0ZSkge1xuICAgICAgLy8gQWJvcnQgYW5kIHJldHVybiB0aGUgcmVzdWx0IG9iamVjdCB3aGVuIHRoZSBJUyBjcmVhdGUgcmVxdWVzdCBoYXNcbiAgICAgIC8vIGZhaWxlZC5cbiAgICAgIGlmIChyZXN1bHRbM10uaGFzRXJyb3JlZCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgICAvLyBTZXQgdGhlIGRldmljZSBpZCBwYXJhbSBiYXNlZCBvbiB0aGUgaWQgb2YgdGhlIG5ld2x5IGNyZWF0ZWQgZGV2aWNlLlxuICAgICAgcGFyYW1zLnJvdXRlUGFyYW1zWydlbmRfZGV2aWNlLmlkcy5kZXZpY2VfaWQnXSA9IHJlc3VsdFszXS5kZXZpY2UuaWRzLmRldmljZV9pZFxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXBvc2UgYW4gYXJyYXkgb2YgcG9zc2libGUgYXBpIGNhbGxzIHRvIE5TLCBBUywgSlMuXG4gIGlmIChzdGFja0NvbmZpZy5pc0NvbXBvbmVudEF2YWlsYWJsZShOUykgJiYgTlMgaW4gcmVxdWVzdFRyZWUpIHtcbiAgICByZXF1ZXN0c1swXSA9IHJlcXVlc3RXcmFwcGVyKGFwaS5Oc0VuZERldmljZVJlZ2lzdHJ5W3JwY0Z1bmN0aW9uXSwgcGFyYW1zLCBOUywge1xuICAgICAgLi4uc3BsaXRQYXlsb2FkKHBheWxvYWQsIHJlcXVlc3RUcmVlW05TXSksXG4gICAgICAuLi5NYXJzaGFsZXIucGF0aHNUb0ZpZWxkTWFzayhyZXF1ZXN0VHJlZVtOU10pLFxuICAgIH0pXG4gIH1cbiAgaWYgKHN0YWNrQ29uZmlnLmlzQ29tcG9uZW50QXZhaWxhYmxlKEFTKSAmJiBBUyBpbiByZXF1ZXN0VHJlZSkge1xuICAgIHJlcXVlc3RzWzFdID0gcmVxdWVzdFdyYXBwZXIoYXBpLkFzRW5kRGV2aWNlUmVnaXN0cnlbcnBjRnVuY3Rpb25dLCBwYXJhbXMsIEFTLCB7XG4gICAgICAuLi5zcGxpdFBheWxvYWQocGF5bG9hZCwgcmVxdWVzdFRyZWVbQVNdKSxcbiAgICAgIC4uLk1hcnNoYWxlci5wYXRoc1RvRmllbGRNYXNrKHJlcXVlc3RUcmVlW0FTXSksXG4gICAgfSlcbiAgfVxuICBpZiAoc3RhY2tDb25maWcuaXNDb21wb25lbnRBdmFpbGFibGUoSlMpICYmIEpTIGluIHJlcXVlc3RUcmVlKSB7XG4gICAgcmVxdWVzdHNbMl0gPSByZXF1ZXN0V3JhcHBlcihhcGkuSnNFbmREZXZpY2VSZWdpc3RyeVtycGNGdW5jdGlvbl0sIHBhcmFtcywgSlMsIHtcbiAgICAgIC4uLnNwbGl0UGF5bG9hZChwYXlsb2FkLCByZXF1ZXN0VHJlZVtKU10sIHsgaWRzOiBlbmRfZGV2aWNlLmlkcyB9KSxcbiAgICAgIC4uLk1hcnNoYWxlci5wYXRoc1RvRmllbGRNYXNrKHJlcXVlc3RUcmVlW0pTXSksXG4gICAgfSlcbiAgfVxuXG4gIC8vIFJ1biB0aGUgcmVxdWVzdHMgaW4gcGFyYWxsZWwuXG4gIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IFByb21pc2UuYWxsKHJlcXVlc3RzKVxuXG4gIC8vIEF0dGFjaCB0aGUgcmVzdWx0cyB0byB0aGUgcmVzdWx0IGFycmF5LlxuICBmb3IgKGNvbnN0IFtpLCByZXNwb25zZV0gb2YgcmVzcG9uc2VzLmVudHJpZXMoKSkge1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgcmVzdWx0W2ldID0gcmVzcG9uc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG4iXX0=