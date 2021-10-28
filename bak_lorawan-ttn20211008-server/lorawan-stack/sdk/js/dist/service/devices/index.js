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

var _traverse = _interopRequireDefault(require("traverse"));

var _shared = require("../../api/stream/shared");

var _marshaler = _interopRequireDefault(require("../../util/marshaler"));

var _combineStreams = _interopRequireDefault(require("../../util/combine-streams"));

var _deviceEntityMap = _interopRequireDefault(require("../../../generated/device-entity-map.json"));

var _downlinkQueue = _interopRequireDefault(require("../downlink-queue"));

var _constants = require("../../util/constants");

var _repository = _interopRequireDefault(require("./repository"));

var _split = require("./split");

var _merge = _interopRequireDefault(require("./merge"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var IS = _constants.STACK_COMPONENTS_MAP.is,
    NS = _constants.STACK_COMPONENTS_MAP.ns,
    AS = _constants.STACK_COMPONENTS_MAP.as,
    JS = _constants.STACK_COMPONENTS_MAP.js,
    DTC = _constants.STACK_COMPONENTS_MAP.dtc;
/**
 * Devices Class provides an abstraction on all devices and manages data
 * handling from different sources. It exposes an API to easily work with
 * device data.
 */

var Devices = /*#__PURE__*/function () {
  function Devices(api, _ref) {
    var stackConfig = _ref.stackConfig;
    (0, _classCallCheck2["default"])(this, Devices);

    if (!api) {
      throw new Error('Cannot initialize device service without api object.');
    }

    this._api = api;
    this._stackConfig = stackConfig;
    this.DownlinkQueue = new _downlinkQueue["default"](api.AppAs, {
      stackConfig: stackConfig
    });
    this.Repository = new _repository["default"](api.DeviceRepository);
  }

  (0, _createClass2["default"])(Devices, [{
    key: "_emitDefaults",
    value: function _emitDefaults(paths, device) {
      // Handle zero coordinates that are swallowed by the grpc-gateway for device
      // location.
      var hasLocation = Boolean(device.locations) && Boolean(device.locations.user);
      var requestedLocation = paths.some(function (path) {
        return path.startsWith('location');
      });

      if (hasLocation && requestedLocation) {
        var locations = device.locations;

        if (!('altitude' in locations.user)) {
          locations.user.altitude = 0;
        }

        if (!('longitude' in locations.user)) {
          locations.user.longitude = 0;
        }

        if (!('latitude' in locations.user)) {
          locations.user.latitude = 0;
        }
      }

      if (paths.includes('claim_authentication_code') && !Boolean(device.claim_authentication_code)) {
        device.claim_authentication_code = null;
      }

      if (paths.includes('formatters') && !Boolean(device.formatters)) {
        device.formatters = null;
      }

      if (paths.includes('formatters.up_formatter')) {
        if (!Boolean(device.formatters)) {
          device.formatters = {
            up_formatter: 'FORMATTER_NONE'
          };
        }

        if (!Boolean(device.formatters.up_formatter)) {
          device.formatters.up_formatter = 'FORMATTER_NONE';
        }
      }

      if (paths.includes('formatters.down_formatter')) {
        if (!Boolean(device.formatters)) {
          device.formatters = {
            down_formatter: 'FORMATTER_NONE'
          };
        }

        if (!Boolean(device.formatters.down_formatter)) {
          device.formatters.down_formatter = 'FORMATTER_NONE';
        }
      }

      if (paths.includes('mac_settings')) {
        var _device$mac_settings = device.mac_settings,
            mac_settings = _device$mac_settings === void 0 ? {} : _device$mac_settings;

        if (Boolean(mac_settings.ping_slot_periodicity) && typeof mac_settings.ping_slot_periodicity === 'undefined') {
          mac_settings.ping_slot_periodicity = 'PING_EVERY_1S';
        }

        if (Boolean(mac_settings.rx2_data_rate_index) && typeof mac_settings.rx2_data_rate_index === 'undefined') {
          mac_settings.rx2_data_rate_index = 0;
        }
      }

      return device;
    }
  }, {
    key: "_getDevice",
    value: function () {
      var _getDevice2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(applicationId, deviceId, paths, ignoreNotFound) {
        var mergeResult,
            components,
            requestTree,
            params,
            deviceParts,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mergeResult = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
                components = _args.length > 5 ? _args[5] : undefined;

                if (applicationId) {
                  _context.next = 4;
                  break;
                }

                throw new Error('Missing application_id for device.');

              case 4:
                if (deviceId) {
                  _context.next = 6;
                  break;
                }

                throw new Error('Missing device_id for device.');

              case 6:
                requestTree = (0, _split.splitGetPaths)(paths, undefined, components);
                params = {
                  routeParams: {
                    'end_device_ids.application_ids.application_id': applicationId,
                    'end_device_ids.device_id': deviceId
                  }
                };
                _context.next = 10;
                return (0, _split.makeRequests)(this._api, this._stackConfig, 'get', requestTree, params, undefined, ignoreNotFound);

              case 10:
                deviceParts = _context.sent;
                return _context.abrupt("return", mergeResult ? (0, _merge["default"])(deviceParts) : deviceParts);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _getDevice(_x, _x2, _x3, _x4) {
        return _getDevice2.apply(this, arguments);
      }

      return _getDevice;
    }()
  }, {
    key: "_deleteDevice",
    value: function () {
      var _deleteDevice2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(applicationId, deviceId) {
        var components,
            params,
            requests,
            responses,
            errors,
            response,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                components = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : [IS, NS, AS, JS];

                if (Boolean(applicationId)) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('Missing application ID for device');

              case 3:
                if (Boolean(deviceId)) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Missing end device ID');

              case 5:
                params = {
                  routeParams: {
                    'application_ids.application_id': applicationId,
                    device_id: deviceId
                  }
                };
                requests = [];

                if (this._stackConfig.isComponentAvailable(AS) && components.includes(AS)) {
                  requests.push(this._api.AsEndDeviceRegistry.Delete(params));
                }

                if (this._stackConfig.isComponentAvailable(JS) && components.includes(JS)) {
                  requests.push(this._api.JsEndDeviceRegistry.Delete(params));
                }

                if (this._stackConfig.isComponentAvailable(NS) && components.includes(NS)) {
                  requests.push(this._api.NsEndDeviceRegistry.Delete(params));
                }

                _context2.next = 12;
                return Promise.all( // Simulate behavior of allSettled.
                requests.map(function (promise) {
                  return promise.then(function (value) {
                    return {
                      status: 'fulfilled',
                      value: value
                    };
                  }, function (reason) {
                    return {
                      status: 'rejected',
                      reason: reason
                    };
                  });
                }));

              case 12:
                responses = _context2.sent;
                // Check for errors and filter out 404 errors. We do not regard 404 responses
                // from ns,as and js as failed requests.
                errors = responses.filter(function (_ref2) {
                  var status = _ref2.status,
                      reason = _ref2.reason;
                  return status === 'rejected' && reason.code !== 5;
                }); // Only proceed deleting the device from IS (so it is not accessible
                // anymore) if there are no errors.

                if (!(errors.length > 0)) {
                  _context2.next = 16;
                  break;
                }

                throw errors[0].reason;

              case 16:
                if (!(this._stackConfig.isComponentAvailable(IS) && components.includes(IS))) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 19;
                return this._api.EndDeviceRegistry.Delete(params);

              case 19:
                response = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 21:
                return _context2.abrupt("return", {});

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _deleteDevice(_x5, _x6) {
        return _deleteDevice2.apply(this, arguments);
      }

      return _deleteDevice;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(applicationId, params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.EndDeviceRegistry.List({
                  routeParams: {
                    'application_ids.application_id': applicationId
                  }
                }, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].unwrapDevices(response));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAll(_x7, _x8, _x9) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(applicationId, params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._api.EndDeviceRegistrySearch.SearchEndDevices({
                  routeParams: {
                    'application_ids.application_id': applicationId
                  }
                }, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context4.sent;
                return _context4.abrupt("return", _marshaler["default"].payloadListResponse('end_devices', response));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function search(_x10, _x11, _x12) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
    /**
     * Gets the `deviceId` end device under the `applicationId` application.
     * This method will assemble the end device from all available stack
     * components (i.e. NS, AS, IS, JS) based on the provided `selector`
     * and the end device existence in the respective components.
     * Note, this method throws an error if the requested end device does not
     * exist in the IS.
     *
     * @param {string} applicationId - The Application ID.
     * @param {string} deviceId - The Device ID.
     * @param {Array} selector - The list of end device fields to fetch.
     * @param {Array} components - A whitelist of components to source the
     * data from. Selects all by default.
     * @returns {object} - End device on successful requests, an error otherwise.
     */

  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(applicationId, deviceId) {
        var selector,
            components,
            deviceParts,
            errors,
            mergedDevice,
            _Marshaler$selectorTo,
            field_mask,
            _args5 = arguments;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                selector = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : [['ids']];
                components = _args5.length > 3 ? _args5[3] : undefined;
                _context5.next = 4;
                return this._getDevice(applicationId, deviceId, _marshaler["default"].selectorToPaths(selector), false, false, components);

              case 4:
                deviceParts = _context5.sent;
                errors = deviceParts.filter(function (part) {
                  // Consider all errors from IS and ignore 404 for JS, AS and NS
                  if (part.hasErrored && (part.component === IS || part.error.code !== 5)) {
                    return true;
                  }

                  return false;
                });

                if (!(errors.length > 0)) {
                  _context5.next = 8;
                  break;
                }

                throw errors[0].error;

              case 8:
                mergedDevice = (0, _merge["default"])(deviceParts);
                _Marshaler$selectorTo = _marshaler["default"].selectorToFieldMask(selector), field_mask = _Marshaler$selectorTo.field_mask;
                return _context5.abrupt("return", this._emitDefaults(field_mask.paths, _marshaler["default"].unwrapDevice(mergedDevice)));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getById(_x13, _x14) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
    /**
     * Updates the `deviceId` end device under the `applicationId` application.
     * This method will cause updates of the end device in all available stack
     * components (i.e. NS, AS, IS, JS) based on provided end device payload.
     *
     * @param {string} applicationId - The application ID.
     * @param {string} deviceId -The end device ID.
     * @param {object} patch - The end device payload.
     * @returns {object} - Updated end device on successful update, an error
     * otherwise.
     */

  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(applicationId, deviceId, patch) {
        var deviceMap, paths, requestTree, combinePaths, _patch$ids, ids, assembledValues, _patch$ids2, _ids, _assembledValues$ids, join_eui, dev_eui, routeParams, devicePayload, setParts, errors;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (Boolean(applicationId)) {
                  _context6.next = 2;
                  break;
                }

                throw new Error('Missing application ID for device');

              case 2:
                if (Boolean(deviceId)) {
                  _context6.next = 4;
                  break;
                }

                throw new Error('Missing end device ID');

              case 4:
                deviceMap = (0, _traverse["default"])(_deviceEntityMap["default"]);
                paths = (0, _traverse["default"])(patch).reduce(function (acc) {
                  // Only add the top level path for arrays, otherwise paths are generated
                  // for each item in the array.
                  if (Array.isArray(this.node)) {
                    acc.push(this.path);
                    this.update(this.node, true);
                  }

                  if (this.isLeaf) {
                    var path = this.path;
                    var parentAdded = acc.some(function (e) {
                      return path[0].startsWith(e.join());
                    }); // Only consider adding, if a common parent has not been already added.

                    if (!parentAdded) {
                      // Add only the deepest possible field mask of the patch.
                      var commonPath = path.filter(function (_, index, array) {
                        var arr = array.slice(0, index + 1);
                        return deviceMap.has(arr);
                      });
                      acc.push(commonPath);
                    }
                  }

                  return acc;
                }, []);
                requestTree = (0, _split.splitSetPaths)(paths); // Assemble paths for end device fields that need to be retrieved first to
                // make the update request.

                combinePaths = [];

                if (AS in requestTree && !('application_server_address' in patch)) {
                  combinePaths.push(['application_server_address']);
                }

                if (JS in requestTree && !('join_server_address' in patch)) {
                  combinePaths.push(['join_server_address']);
                  combinePaths.push(['supports_join']);
                  _patch$ids = patch.ids, ids = _patch$ids === void 0 ? {} : _patch$ids;

                  if (!('dev_eui' in ids) || !('join_eui' in ids)) {
                    combinePaths.push(['ids', 'dev_eui']);
                    combinePaths.push(['ids', 'join_eui']);
                  }
                }

                if (NS in requestTree && !('network_server_address' in patch)) {
                  combinePaths.push(['network_server_address']);
                }

                _context6.next = 13;
                return this._getDevice(applicationId, deviceId, combinePaths, true);

              case 13:
                assembledValues = _context6.sent;

                if (assembledValues.network_server_address !== this._stackConfig.nsHost) {
                  delete requestTree.ns;
                }

                if (assembledValues.application_server_address !== this._stackConfig.asHost) {
                  delete requestTree.as;
                }

                if (!assembledValues.supports_join || assembledValues.join_server_address !== this._stackConfig.jsHost) {
                  delete requestTree.js;
                } // Make sure to include `join_eui` and `dev_eui` for js request as those are
                // required.


                if (JS in requestTree) {
                  _patch$ids2 = patch.ids, _ids = _patch$ids2 === void 0 ? {} : _patch$ids2;
                  _assembledValues$ids = assembledValues.ids, join_eui = _assembledValues$ids.join_eui, dev_eui = _assembledValues$ids.dev_eui;
                  patch.ids = _objectSpread(_objectSpread({}, _ids), {}, {
                    join_eui: join_eui,
                    dev_eui: dev_eui
                  });
                }

                routeParams = {
                  routeParams: {
                    'end_device.ids.application_ids.application_id': applicationId,
                    'end_device.ids.device_id': deviceId
                  }
                }; // Perform the requests.

                devicePayload = _marshaler["default"].payload(patch, 'end_device');
                _context6.next = 22;
                return (0, _split.makeRequests)(this._api, this._stackConfig, 'set', requestTree, routeParams, devicePayload);

              case 22:
                setParts = _context6.sent;
                // Filter out errored requests.
                errors = setParts.filter(function (part) {
                  return part.hasErrored;
                }); // Handle possible errored requests.

                if (!(errors.length !== 0)) {
                  _context6.next = 26;
                  break;
                }

                throw errors[0].error;

              case 26:
                return _context6.abrupt("return", this._emitDefaults(_marshaler["default"].fieldMaskFromPatch(patch), _marshaler["default"].unwrapDevice((0, _merge["default"])(setParts))));

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateById(_x15, _x16, _x17) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
    /**
     * Creates an end device under the `applicationId` application.
     * This method will cause creating the end device in all available stack
     * components (i.e. NS, AS, IS, JS) based on provided end device payload
     * (`device`) or on field mask paths (`mask`).
     *
     * @param {string} applicationId - Application ID.
     * @param {object} device - The end device payload.
     * @param {Array} mask -The field mask paths (by default is generated from
     * `device` payload).
     * @returns {object} - Created end device on successful creation, an error
     * otherwise.
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(applicationId, device) {
        var mask,
            _device$supports_join,
            supports_join,
            _device$ids,
            ids,
            deviceId,
            requestTree,
            devicePayload,
            routeParams,
            setParts,
            errors,
            rollbackComponents,
            _args7 = arguments;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                mask = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : _marshaler["default"].fieldMaskFromPatch(device);

                if (Boolean(applicationId)) {
                  _context7.next = 3;
                  break;
                }

                throw new Error('Missing application ID for device');

              case 3:
                _device$supports_join = device.supports_join, supports_join = _device$supports_join === void 0 ? false : _device$supports_join, _device$ids = device.ids, ids = _device$ids === void 0 ? {} : _device$ids;
                deviceId = ids.device_id;

                if (Boolean(deviceId)) {
                  _context7.next = 7;
                  break;
                }

                throw new Error('Missing end device ID');

              case 7:
                requestTree = (0, _split.splitSetPaths)(_marshaler["default"].selectorToPaths(mask));

                if (!supports_join || device.join_server_address !== this._stackConfig.jsHost) {
                  delete requestTree.js;
                }

                if (device.network_server_address !== this._stackConfig.nsHost) {
                  delete requestTree.ns;
                }

                if (device.application_server_address !== this._stackConfig.asHost) {
                  delete requestTree.as;
                }

                devicePayload = _marshaler["default"].payload(device, 'end_device');
                routeParams = {
                  routeParams: {
                    'end_device.ids.application_ids.application_id': applicationId
                  }
                };
                _context7.next = 15;
                return (0, _split.makeRequests)(this._api, this._stackConfig, 'create', requestTree, routeParams, devicePayload);

              case 15:
                setParts = _context7.sent;
                // Filter out errored requests.
                errors = setParts.filter(function (part) {
                  return part.hasErrored;
                }); // Handle possible errored requests.

                if (!(errors.length !== 0)) {
                  _context7.next = 22;
                  break;
                }

                // Roll back successfully created registry entries.
                rollbackComponents = setParts.reduce(function (components, part) {
                  if (part.hasAttempted && !part.hasErrored) {
                    components.push(part.component);
                  }

                  return components;
                }, []);
                _context7.next = 21;
                return this._deleteDevice(applicationId, deviceId, rollbackComponents);

              case 21:
                throw errors[0].error;

              case 22:
                return _context7.abrupt("return", (0, _merge["default"])(setParts));

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function create(_x18, _x19) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Deletes the `deviceId` end device under the `applicationId` application.
     * This method will cause deletion of the end device in all available stack
     * components (i.e. NS, AS, IS, JS).
     *
     * @param {string} applicationId - The application ID.
     * @param {string} deviceId - The end evice ID.
     * @returns {object} - Empty object on successful update, an error otherwise.
     */

  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(applicationId, deviceId) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this._deleteDevice(applicationId, deviceId));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function deleteById(_x20, _x21) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }() // End Device Template Converter.

  }, {
    key: "listTemplateFormats",
    value: function () {
      var _listTemplateFormats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var result, payload;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._api.EndDeviceTemplateConverter.ListFormats();

              case 2:
                result = _context9.sent;
                payload = _marshaler["default"].payloadSingleResponse(result);
                return _context9.abrupt("return", payload.formats);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function listTemplateFormats() {
        return _listTemplateFormats.apply(this, arguments);
      }

      return listTemplateFormats;
    }()
  }, {
    key: "convertTemplate",
    value: function convertTemplate(formatId, data) {
      // This is a stream endpoint.
      return this._api.EndDeviceTemplateConverter.Convert(undefined, {
        format_id: formatId,
        data: data
      });
    }
  }, {
    key: "bulkCreate",
    value: function bulkCreate(applicationId, deviceOrDevices) {
      var devices = !(deviceOrDevices instanceof Array) ? [deviceOrDevices] : deviceOrDevices;
      var listeners = Object.values(_shared.EVENTS).reduce(function (acc, curr) {
        return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, curr, null));
      }, {});
      var finishedCount = 0;
      var stopRequested = false;

      var runTasks = /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
          var _iterator, _step, device, paths, end_device, result;

          return _regenerator["default"].wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _iterator = _createForOfIteratorHelper(devices);
                  _context10.prev = 1;

                  _iterator.s();

                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context10.next = 27;
                    break;
                  }

                  device = _step.value;

                  if (!stopRequested) {
                    _context10.next = 9;
                    break;
                  }

                  (0, _shared.notify)(listeners[_shared.EVENTS.CLOSE]);
                  listeners = null;
                  return _context10.abrupt("break", 27);

                case 9:
                  _context10.prev = 9;
                  paths = device.field_mask.paths, end_device = device.end_device;
                  _context10.next = 13;
                  return this.create(applicationId, end_device, paths);

                case 13:
                  result = _context10.sent;
                  (0, _shared.notify)(listeners[_shared.EVENTS.CHUNK], result);
                  finishedCount++;
                  _context10.next = 22;
                  break;

                case 18:
                  _context10.prev = 18;
                  _context10.t0 = _context10["catch"](9);
                  (0, _shared.notify)(listeners[_shared.EVENTS.ERROR], _context10.t0);
                  finishedCount++;

                case 22:
                  _context10.prev = 22;

                  if (finishedCount === devices.length) {
                    (0, _shared.notify)(listeners[_shared.EVENTS.CLOSE]);
                    listeners = null;
                  }

                  return _context10.finish(22);

                case 25:
                  _context10.next = 3;
                  break;

                case 27:
                  _context10.next = 32;
                  break;

                case 29:
                  _context10.prev = 29;
                  _context10.t1 = _context10["catch"](1);

                  _iterator.e(_context10.t1);

                case 32:
                  _context10.prev = 32;

                  _iterator.f();

                  return _context10.finish(32);

                case 35:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[1, 29, 32, 35], [9, 18, 22, 25]]);
        }));

        return function runTasks() {
          return _ref3.apply(this, arguments);
        };
      }();

      return {
        start: runTasks.bind(this),
        on: function on(eventName, callback) {
          if (listeners[eventName] === undefined) {
            throw new Error("".concat(eventName, " event is not supported. Should be one of: start, error, chunk or close"));
          }

          listeners[eventName] = callback;
          return this;
        },
        abort: function abort() {
          stopRequested = true;
        }
      };
    } // Events Stream

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
                  identifiers: identifiers.map(function (ids) {
                    return {
                      device_ids: ids
                    };
                  }),
                  tail: tail,
                  after: after
                }; // Event streams can come from multiple stack components. It is necessary to
                // check for stack components on different hosts and open distinct stream
                // connections for any distinct host if need be.

                distinctComponents = this._stackConfig.getComponentsWithDistinctBaseUrls([IS, JS, NS, AS, DTC]);
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

      function openStream(_x22, _x23, _x24) {
        return _openStream.apply(this, arguments);
      }

      return openStream;
    }()
  }, {
    key: "simulateUplink",
    value: function () {
      var _simulateUplink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(applicationId, deviceId, uplink) {
        var result;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._api.AppAs.SimulateUplink({
                  routeParams: {
                    'end_device_ids.application_ids.application_id': applicationId,
                    'end_device_ids.device_id': deviceId
                  }
                }, {
                  uplink_message: uplink
                });

              case 2:
                result = _context12.sent;
                return _context12.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function simulateUplink(_x25, _x26, _x27) {
        return _simulateUplink.apply(this, arguments);
      }

      return simulateUplink;
    }()
  }]);
  return Devices;
}();

var _default = Devices;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2RldmljZXMvaW5kZXguanMiXSwibmFtZXMiOlsiSVMiLCJTVEFDS19DT01QT05FTlRTX01BUCIsImlzIiwiTlMiLCJucyIsIkFTIiwiYXMiLCJKUyIsImpzIiwiRFRDIiwiZHRjIiwiRGV2aWNlcyIsImFwaSIsInN0YWNrQ29uZmlnIiwiRXJyb3IiLCJfYXBpIiwiX3N0YWNrQ29uZmlnIiwiRG93bmxpbmtRdWV1ZSIsIkFwcEFzIiwiUmVwb3NpdG9yeSIsIkRldmljZVJlcG9zaXRvcnkiLCJwYXRocyIsImRldmljZSIsImhhc0xvY2F0aW9uIiwiQm9vbGVhbiIsImxvY2F0aW9ucyIsInVzZXIiLCJyZXF1ZXN0ZWRMb2NhdGlvbiIsInNvbWUiLCJwYXRoIiwic3RhcnRzV2l0aCIsImFsdGl0dWRlIiwibG9uZ2l0dWRlIiwibGF0aXR1ZGUiLCJpbmNsdWRlcyIsImNsYWltX2F1dGhlbnRpY2F0aW9uX2NvZGUiLCJmb3JtYXR0ZXJzIiwidXBfZm9ybWF0dGVyIiwiZG93bl9mb3JtYXR0ZXIiLCJtYWNfc2V0dGluZ3MiLCJwaW5nX3Nsb3RfcGVyaW9kaWNpdHkiLCJyeDJfZGF0YV9yYXRlX2luZGV4IiwiYXBwbGljYXRpb25JZCIsImRldmljZUlkIiwiaWdub3JlTm90Rm91bmQiLCJtZXJnZVJlc3VsdCIsImNvbXBvbmVudHMiLCJyZXF1ZXN0VHJlZSIsInVuZGVmaW5lZCIsInBhcmFtcyIsInJvdXRlUGFyYW1zIiwiZGV2aWNlUGFydHMiLCJkZXZpY2VfaWQiLCJyZXF1ZXN0cyIsImlzQ29tcG9uZW50QXZhaWxhYmxlIiwicHVzaCIsIkFzRW5kRGV2aWNlUmVnaXN0cnkiLCJEZWxldGUiLCJKc0VuZERldmljZVJlZ2lzdHJ5IiwiTnNFbmREZXZpY2VSZWdpc3RyeSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJwcm9taXNlIiwidGhlbiIsInZhbHVlIiwic3RhdHVzIiwicmVhc29uIiwicmVzcG9uc2VzIiwiZXJyb3JzIiwiZmlsdGVyIiwiY29kZSIsImxlbmd0aCIsIkVuZERldmljZVJlZ2lzdHJ5IiwicmVzcG9uc2UiLCJNYXJzaGFsZXIiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJzZWxlY3RvciIsIkxpc3QiLCJzZWxlY3RvclRvRmllbGRNYXNrIiwidW53cmFwRGV2aWNlcyIsIkVuZERldmljZVJlZ2lzdHJ5U2VhcmNoIiwiU2VhcmNoRW5kRGV2aWNlcyIsInBheWxvYWRMaXN0UmVzcG9uc2UiLCJfZ2V0RGV2aWNlIiwic2VsZWN0b3JUb1BhdGhzIiwicGFydCIsImhhc0Vycm9yZWQiLCJjb21wb25lbnQiLCJlcnJvciIsIm1lcmdlZERldmljZSIsImZpZWxkX21hc2siLCJfZW1pdERlZmF1bHRzIiwidW53cmFwRGV2aWNlIiwicGF0Y2giLCJkZXZpY2VNYXAiLCJkZXZpY2VFbnRpdHlNYXAiLCJyZWR1Y2UiLCJhY2MiLCJBcnJheSIsImlzQXJyYXkiLCJub2RlIiwidXBkYXRlIiwiaXNMZWFmIiwicGFyZW50QWRkZWQiLCJlIiwiam9pbiIsImNvbW1vblBhdGgiLCJfIiwiaW5kZXgiLCJhcnJheSIsImFyciIsInNsaWNlIiwiaGFzIiwiY29tYmluZVBhdGhzIiwiaWRzIiwiYXNzZW1ibGVkVmFsdWVzIiwibmV0d29ya19zZXJ2ZXJfYWRkcmVzcyIsIm5zSG9zdCIsImFwcGxpY2F0aW9uX3NlcnZlcl9hZGRyZXNzIiwiYXNIb3N0Iiwic3VwcG9ydHNfam9pbiIsImpvaW5fc2VydmVyX2FkZHJlc3MiLCJqc0hvc3QiLCJqb2luX2V1aSIsImRldl9ldWkiLCJkZXZpY2VQYXlsb2FkIiwicGF5bG9hZCIsInNldFBhcnRzIiwiZmllbGRNYXNrRnJvbVBhdGNoIiwibWFzayIsInJvbGxiYWNrQ29tcG9uZW50cyIsImhhc0F0dGVtcHRlZCIsIl9kZWxldGVEZXZpY2UiLCJFbmREZXZpY2VUZW1wbGF0ZUNvbnZlcnRlciIsIkxpc3RGb3JtYXRzIiwicmVzdWx0IiwiZm9ybWF0cyIsImZvcm1hdElkIiwiZGF0YSIsIkNvbnZlcnQiLCJmb3JtYXRfaWQiLCJkZXZpY2VPckRldmljZXMiLCJkZXZpY2VzIiwibGlzdGVuZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwiRVZFTlRTIiwiY3VyciIsImZpbmlzaGVkQ291bnQiLCJzdG9wUmVxdWVzdGVkIiwicnVuVGFza3MiLCJDTE9TRSIsImVuZF9kZXZpY2UiLCJjcmVhdGUiLCJDSFVOSyIsIkVSUk9SIiwic3RhcnQiLCJiaW5kIiwib24iLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImFib3J0IiwiaWRlbnRpZmllcnMiLCJ0YWlsIiwiYWZ0ZXIiLCJkZXZpY2VfaWRzIiwiZGlzdGluY3RDb21wb25lbnRzIiwiZ2V0Q29tcG9uZW50c1dpdGhEaXN0aW5jdEJhc2VVcmxzIiwic3RyZWFtcyIsIkV2ZW50cyIsIlN0cmVhbSIsInVwbGluayIsIlNpbXVsYXRlVXBsaW5rIiwidXBsaW5rX21lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQVlBLEVBQVosR0FBcURDLCtCQUFyRCxDQUFRQyxFQUFSO0FBQUEsSUFBb0JDLEVBQXBCLEdBQXFERiwrQkFBckQsQ0FBZ0JHLEVBQWhCO0FBQUEsSUFBNEJDLEVBQTVCLEdBQXFESiwrQkFBckQsQ0FBd0JLLEVBQXhCO0FBQUEsSUFBb0NDLEVBQXBDLEdBQXFETiwrQkFBckQsQ0FBZ0NPLEVBQWhDO0FBQUEsSUFBNkNDLEdBQTdDLEdBQXFEUiwrQkFBckQsQ0FBd0NTLEdBQXhDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFDTUMsTztBQUNKLG1CQUFZQyxHQUFaLFFBQWtDO0FBQUEsUUFBZkMsV0FBZSxRQUFmQSxXQUFlO0FBQUE7O0FBQ2hDLFFBQUksQ0FBQ0QsR0FBTCxFQUFVO0FBQ1IsWUFBTSxJQUFJRSxLQUFKLENBQVUsc0RBQVYsQ0FBTjtBQUNEOztBQUNELFNBQUtDLElBQUws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Ozs7MEdBNEJBLG1CQUFxQi9ILGFBQXJCLEVBQW9DQyxRQUFwQyxFQUE4Q2lJLE1BQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUs3SixJQUFMLENBQVVHLEtBQVYsQ0FBZ0IySixjQUFoQixDQUNuQjtBQUNFM0gsa0JBQUFBLFdBQVcsRUFBRTtBQUNYLHFFQUFpRFIsYUFEdEM7QUFFWCxnREFBNEJDO0FBRmpCO0FBRGYsaUJBRG1CLEVBT25CO0FBQ0VtSSxrQkFBQUEsY0FBYyxFQUFFRjtBQURsQixpQkFQbUIsQ0FEdkI7O0FBQUE7QUFDUXBDLGdCQUFBQSxNQURSO0FBQUEsbURBYVM3RCxzQkFBVUMscUJBQVYsQ0FBZ0M0RCxNQUFoQyxDQWJUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQWlCYTdILE8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcywgbm8tYXdhaXQtaW4tbG9vcCAqL1xuXG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAndHJhdmVyc2UnXG5cbmltcG9ydCB7IG5vdGlmeSwgRVZFTlRTIH0gZnJvbSAnLi4vLi4vYXBpL3N0cmVhbS9zaGFyZWQnXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uLy4uL3V0aWwvbWFyc2hhbGVyJ1xuaW1wb3J0IGNvbWJpbmVTdHJlYW1zIGZyb20gJy4uLy4uL3V0aWwvY29tYmluZS1zdHJlYW1zJ1xuaW1wb3J0IGRldmljZUVudGl0eU1hcCBmcm9tICcuLi8uLi8uLi9nZW5lcmF0ZWQvZGV2aWNlLWVudGl0eS1tYXAuanNvbidcbmltcG9ydCBEb3dubGlua1F1ZXVlIGZyb20gJy4uL2Rvd25saW5rLXF1ZXVlJ1xuaW1wb3J0IHsgU1RBQ0tfQ09NUE9ORU5UU19NQVAgfSBmcm9tICcuLi8uLi91dGlsL2NvbnN0YW50cydcblxuaW1wb3J0IFJlcG9zaXRvcnkgZnJvbSAnLi9yZXBvc2l0b3J5J1xuaW1wb3J0IHsgc3BsaXRTZXRQYXRocywgc3BsaXRHZXRQYXRocywgbWFrZVJlcXVlc3RzIH0gZnJvbSAnLi9zcGxpdCdcbmltcG9ydCBtZXJnZURldmljZSBmcm9tICcuL21lcmdlJ1xuXG5jb25zdCB7IGlzOiBJUywgbnM6IE5TLCBhczogQVMsIGpzOiBKUywgZHRjOiBEVEMgfSA9IFNUQUNLX0NPTVBPTkVOVFNfTUFQXG5cbi8qKlxuICogRGV2aWNlcyBDbGFzcyBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiBvbiBhbGwgZGV2aWNlcyBhbmQgbWFuYWdlcyBkYXRhXG4gKiBoYW5kbGluZyBmcm9tIGRpZmZlcmVudCBzb3VyY2VzLiBJdCBleHBvc2VzIGFuIEFQSSB0byBlYXNpbHkgd29yayB3aXRoXG4gKiBkZXZpY2UgZGF0YS5cbiAqL1xuY2xhc3MgRGV2aWNlcyB7XG4gIGNvbnN0cnVjdG9yKGFwaSwgeyBzdGFja0NvbmZpZyB9KSB7XG4gICAgaWYgKCFhcGkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGluaXRpYWxpemUgZGV2aWNlIHNlcnZpY2Ugd2l0aG91dCBhcGkgb2JqZWN0LicpXG4gICAgfVxuICAgIHRoaXMuX2FwaSA9IGFwaVxuICAgIHRoaXMuX3N0YWNrQ29uZmlnID0gc3RhY2tDb25maWdcblxuICAgIHRoaXMuRG93bmxpbmtRdWV1ZSA9IG5ldyBEb3dubGlua1F1ZXVlKGFwaS5BcHBBcywgeyBzdGFja0NvbmZpZyB9KVxuICAgIHRoaXMuUmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5KGFwaS5EZXZpY2VSZXBvc2l0b3J5KVxuICB9XG5cbiAgX2VtaXREZWZhdWx0cyhwYXRocywgZGV2aWNlKSB7XG4gICAgLy8gSGFuZGxlIHplcm8gY29vcmRpbmF0ZXMgdGhhdCBhcmUgc3dhbGxvd2VkIGJ5IHRoZSBncnBjLWdhdGV3YXkgZm9yIGRldmljZVxuICAgIC8vIGxvY2F0aW9uLlxuICAgIGNvbnN0IGhhc0xvY2F0aW9uID0gQm9vbGVhbihkZXZpY2UubG9jYXRpb25zKSAmJiBCb29sZWFuKGRldmljZS5sb2NhdGlvbnMudXNlcilcbiAgICBjb25zdCByZXF1ZXN0ZWRMb2NhdGlvbiA9IHBhdGhzLnNvbWUocGF0aCA9PiBwYXRoLnN0YXJ0c1dpdGgoJ2xvY2F0aW9uJykpXG5cbiAgICBpZiAoaGFzTG9jYXRpb24gJiYgcmVxdWVzdGVkTG9jYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgbG9jYXRpb25zIH0gPSBkZXZpY2VcblxuICAgICAgaWYgKCEoJ2FsdGl0dWRlJyBpbiBsb2NhdGlvbnMudXNlcikpIHtcbiAgICAgICAgbG9jYXRpb25zLnVzZXIuYWx0aXR1ZGUgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmICghKCdsb25naXR1ZGUnIGluIGxvY2F0aW9ucy51c2VyKSkge1xuICAgICAgICBsb2NhdGlvbnMudXNlci5sb25naXR1ZGUgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmICghKCdsYXRpdHVkZScgaW4gbG9jYXRpb25zLnVzZXIpKSB7XG4gICAgICAgIGxvY2F0aW9ucy51c2VyLmxhdGl0dWRlID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwYXRocy5pbmNsdWRlcygnY2xhaW1fYXV0aGVudGljYXRpb25fY29kZScpICYmICFCb29sZWFuKGRldmljZS5jbGFpbV9hdXRoZW50aWNhdGlvbl9jb2RlKSkge1xuICAgICAgZGV2aWNlLmNsYWltX2F1dGhlbnRpY2F0aW9uX2NvZGUgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHBhdGhzLmluY2x1ZGVzKCdmb3JtYXR0ZXJzJykgJiYgIUJvb2xlYW4oZGV2aWNlLmZvcm1hdHRlcnMpKSB7XG4gICAgICBkZXZpY2UuZm9ybWF0dGVycyA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAocGF0aHMuaW5jbHVkZXMoJ2Zvcm1hdHRlcnMudXBfZm9ybWF0dGVyJykpIHtcbiAgICAgIGlmICghQm9vbGVhbihkZXZpY2UuZm9ybWF0dGVycykpIHtcbiAgICAgICAgZGV2aWNlLmZvcm1hdHRlcnMgPSB7IHVwX2Zvcm1hdHRlcjogJ0ZPUk1BVFRFUl9OT05FJyB9XG4gICAgICB9XG4gICAgICBpZiAoIUJvb2xlYW4oZGV2aWNlLmZvcm1hdHRlcnMudXBfZm9ybWF0dGVyKSkge1xuICAgICAgICBkZXZpY2UuZm9ybWF0dGVycy51cF9mb3JtYXR0ZXIgPSAnRk9STUFUVEVSX05PTkUnXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhdGhzLmluY2x1ZGVzKCdmb3JtYXR0ZXJzLmRvd25fZm9ybWF0dGVyJykpIHtcbiAgICAgIGlmICghQm9vbGVhbihkZXZpY2UuZm9ybWF0dGVycykpIHtcbiAgICAgICAgZGV2aWNlLmZvcm1hdHRlcnMgPSB7IGRvd25fZm9ybWF0dGVyOiAnRk9STUFUVEVSX05PTkUnIH1cbiAgICAgIH1cbiAgICAgIGlmICghQm9vbGVhbihkZXZpY2UuZm9ybWF0dGVycy5kb3duX2Zvcm1hdHRlcikpIHtcbiAgICAgICAgZGV2aWNlLmZvcm1hdHRlcnMuZG93bl9mb3JtYXR0ZXIgPSAnRk9STUFUVEVSX05PTkUnXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhdGhzLmluY2x1ZGVzKCdtYWNfc2V0dGluZ3MnKSkge1xuICAgICAgY29uc3QgeyBtYWNfc2V0dGluZ3MgPSB7fSB9ID0gZGV2aWNlXG5cbiAgICAgIGlmIChcbiAgICAgICAgQm9vbGVhbihtYWNfc2V0dGluZ3MucGluZ19zbG90X3BlcmlvZGljaXR5KSAmJlxuICAgICAgICB0eXBlb2YgbWFjX3NldHRpbmdzLnBpbmdfc2xvdF9wZXJpb2RpY2l0eSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICBtYWNfc2V0dGluZ3MucGluZ19zbG90X3BlcmlvZGljaXR5ID0gJ1BJTkdfRVZFUllfMVMnXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgQm9vbGVhbihtYWNfc2V0dGluZ3MucngyX2RhdGFfcmF0ZV9pbmRleCkgJiZcbiAgICAgICAgdHlwZW9mIG1hY19zZXR0aW5ncy5yeDJfZGF0YV9yYXRlX2luZGV4ID09PSAndW5kZWZpbmVkJ1xuICAgICAgKSB7XG4gICAgICAgIG1hY19zZXR0aW5ncy5yeDJfZGF0YV9yYXRlX2luZGV4ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXZpY2VcbiAgfVxuXG4gIGFzeW5jIF9nZXREZXZpY2UoYXBwbGljYXRpb25JZCwgZGV2aWNlSWQsIHBhdGhzLCBpZ25vcmVOb3RGb3VuZCwgbWVyZ2VSZXN1bHQgPSB0cnVlLCBjb21wb25lbnRzKSB7XG4gICAgaWYgKCFhcHBsaWNhdGlvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXBwbGljYXRpb25faWQgZm9yIGRldmljZS4nKVxuICAgIH1cblxuICAgIGlmICghZGV2aWNlSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkZXZpY2VfaWQgZm9yIGRldmljZS4nKVxuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RUcmVlID0gc3BsaXRHZXRQYXRocyhwYXRocywgdW5kZWZpbmVkLCBjb21wb25lbnRzKVxuXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmFwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcGxpY2F0aW9uSWQsXG4gICAgICAgICdlbmRfZGV2aWNlX2lkcy5kZXZpY2VfaWQnOiBkZXZpY2VJZCxcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgY29uc3QgZGV2aWNlUGFydHMgPSBhd2FpdCBtYWtlUmVxdWVzdHMoXG4gICAgICB0aGlzLl9hcGksXG4gICAgICB0aGlzLl9zdGFja0NvbmZpZyxcbiAgICAgICdnZXQnLFxuICAgICAgcmVxdWVzdFRyZWUsXG4gICAgICBwYXJhbXMsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICBpZ25vcmVOb3RGb3VuZCxcbiAgICApXG5cbiAgICByZXR1cm4gbWVyZ2VSZXN1bHQgPyBtZXJnZURldmljZShkZXZpY2VQYXJ0cykgOiBkZXZpY2VQYXJ0c1xuICB9XG5cbiAgYXN5bmMgX2RlbGV0ZURldmljZShhcHBsaWNhdGlvbklkLCBkZXZpY2VJZCwgY29tcG9uZW50cyA9IFtJUywgTlMsIEFTLCBKU10pIHtcbiAgICBpZiAoIUJvb2xlYW4oYXBwbGljYXRpb25JZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBhcHBsaWNhdGlvbiBJRCBmb3IgZGV2aWNlJylcbiAgICB9XG5cbiAgICBpZiAoIUJvb2xlYW4oZGV2aWNlSWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZW5kIGRldmljZSBJRCcpXG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcGxpY2F0aW9uSWQsXG4gICAgICAgIGRldmljZV9pZDogZGV2aWNlSWQsXG4gICAgICB9LFxuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RzID0gW11cbiAgICBpZiAodGhpcy5fc3RhY2tDb25maWcuaXNDb21wb25lbnRBdmFpbGFibGUoQVMpICYmIGNvbXBvbmVudHMuaW5jbHVkZXMoQVMpKSB7XG4gICAgICByZXF1ZXN0cy5wdXNoKHRoaXMuX2FwaS5Bc0VuZERldmljZVJlZ2lzdHJ5LkRlbGV0ZShwYXJhbXMpKVxuICAgIH1cbiAgICBpZiAodGhpcy5fc3RhY2tDb25maWcuaXNDb21wb25lbnRBdmFpbGFibGUoSlMpICYmIGNvbXBvbmVudHMuaW5jbHVkZXMoSlMpKSB7XG4gICAgICByZXF1ZXN0cy5wdXNoKHRoaXMuX2FwaS5Kc0VuZERldmljZVJlZ2lzdHJ5LkRlbGV0ZShwYXJhbXMpKVxuICAgIH1cbiAgICBpZiAodGhpcy5fc3RhY2tDb25maWcuaXNDb21wb25lbnRBdmFpbGFibGUoTlMpICYmIGNvbXBvbmVudHMuaW5jbHVkZXMoTlMpKSB7XG4gICAgICByZXF1ZXN0cy5wdXNoKHRoaXMuX2FwaS5Oc0VuZERldmljZVJlZ2lzdHJ5LkRlbGV0ZShwYXJhbXMpKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgLy8gU2ltdWxhdGUgYmVoYXZpb3Igb2YgYWxsU2V0dGxlZC5cbiAgICAgIHJlcXVlc3RzLm1hcChwcm9taXNlID0+XG4gICAgICAgIHByb21pc2UudGhlbihcbiAgICAgICAgICB2YWx1ZSA9PiAoe1xuICAgICAgICAgICAgc3RhdHVzOiAnZnVsZmlsbGVkJyxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHJlYXNvbiA9PiAoeyBzdGF0dXM6ICdyZWplY3RlZCcsIHJlYXNvbiB9KSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKVxuXG4gICAgLy8gQ2hlY2sgZm9yIGVycm9ycyBhbmQgZmlsdGVyIG91dCA0MDQgZXJyb3JzLiBXZSBkbyBub3QgcmVnYXJkIDQwNCByZXNwb25zZXNcbiAgICAvLyBmcm9tIG5zLGFzIGFuZCBqcyBhcyBmYWlsZWQgcmVxdWVzdHMuXG4gICAgY29uc3QgZXJyb3JzID0gcmVzcG9uc2VzLmZpbHRlcihcbiAgICAgICh7IHN0YXR1cywgcmVhc29uIH0pID0+IHN0YXR1cyA9PT0gJ3JlamVjdGVkJyAmJiByZWFzb24uY29kZSAhPT0gNSxcbiAgICApXG5cbiAgICAvLyBPbmx5IHByb2NlZWQgZGVsZXRpbmcgdGhlIGRldmljZSBmcm9tIElTIChzbyBpdCBpcyBub3QgYWNjZXNzaWJsZVxuICAgIC8vIGFueW1vcmUpIGlmIHRoZXJlIGFyZSBubyBlcnJvcnMuXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBlcnJvcnNbMF0ucmVhc29uXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YWNrQ29uZmlnLmlzQ29tcG9uZW50QXZhaWxhYmxlKElTKSAmJiBjb21wb25lbnRzLmluY2x1ZGVzKElTKSkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuRW5kRGV2aWNlUmVnaXN0cnkuRGVsZXRlKHBhcmFtcylcblxuICAgICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHt9XG4gIH1cblxuICBhc3luYyBnZXRBbGwoYXBwbGljYXRpb25JZCwgcGFyYW1zLCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLkVuZERldmljZVJlZ2lzdHJ5Lkxpc3QoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7ICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBsaWNhdGlvbklkIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIC4uLk1hcnNoYWxlci5zZWxlY3RvclRvRmllbGRNYXNrKHNlbGVjdG9yKSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci51bndyYXBEZXZpY2VzKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgc2VhcmNoKGFwcGxpY2F0aW9uSWQsIHBhcmFtcywgc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5FbmREZXZpY2VSZWdpc3RyeVNlYXJjaC5TZWFyY2hFbmREZXZpY2VzKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczogeyAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwbGljYXRpb25JZCB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAuLi5NYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvciksXG4gICAgICB9LFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZExpc3RSZXNwb25zZSgnZW5kX2RldmljZXMnLCByZXNwb25zZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBgZGV2aWNlSWRgIGVuZCBkZXZpY2UgdW5kZXIgdGhlIGBhcHBsaWNhdGlvbklkYCBhcHBsaWNhdGlvbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBhc3NlbWJsZSB0aGUgZW5kIGRldmljZSBmcm9tIGFsbCBhdmFpbGFibGUgc3RhY2tcbiAgICogY29tcG9uZW50cyAoaS5lLiBOUywgQVMsIElTLCBKUykgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGBzZWxlY3RvcmBcbiAgICogYW5kIHRoZSBlbmQgZGV2aWNlIGV4aXN0ZW5jZSBpbiB0aGUgcmVzcGVjdGl2ZSBjb21wb25lbnRzLlxuICAgKiBOb3RlLCB0aGlzIG1ldGhvZCB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJlcXVlc3RlZCBlbmQgZGV2aWNlIGRvZXMgbm90XG4gICAqIGV4aXN0IGluIHRoZSBJUy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwcGxpY2F0aW9uSWQgLSBUaGUgQXBwbGljYXRpb24gSUQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkZXZpY2VJZCAtIFRoZSBEZXZpY2UgSUQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdG9yIC0gVGhlIGxpc3Qgb2YgZW5kIGRldmljZSBmaWVsZHMgdG8gZmV0Y2guXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvbXBvbmVudHMgLSBBIHdoaXRlbGlzdCBvZiBjb21wb25lbnRzIHRvIHNvdXJjZSB0aGVcbiAgICogZGF0YSBmcm9tLiBTZWxlY3RzIGFsbCBieSBkZWZhdWx0LlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEVuZCBkZXZpY2Ugb24gc3VjY2Vzc2Z1bCByZXF1ZXN0cywgYW4gZXJyb3Igb3RoZXJ3aXNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0QnlJZChhcHBsaWNhdGlvbklkLCBkZXZpY2VJZCwgc2VsZWN0b3IgPSBbWydpZHMnXV0sIGNvbXBvbmVudHMpIHtcbiAgICBjb25zdCBkZXZpY2VQYXJ0cyA9IGF3YWl0IHRoaXMuX2dldERldmljZShcbiAgICAgIGFwcGxpY2F0aW9uSWQsXG4gICAgICBkZXZpY2VJZCxcbiAgICAgIE1hcnNoYWxlci5zZWxlY3RvclRvUGF0aHMoc2VsZWN0b3IpLFxuICAgICAgZmFsc2UsXG4gICAgICBmYWxzZSxcbiAgICAgIGNvbXBvbmVudHMsXG4gICAgKVxuXG4gICAgY29uc3QgZXJyb3JzID0gZGV2aWNlUGFydHMuZmlsdGVyKHBhcnQgPT4ge1xuICAgICAgLy8gQ29uc2lkZXIgYWxsIGVycm9ycyBmcm9tIElTIGFuZCBpZ25vcmUgNDA0IGZvciBKUywgQVMgYW5kIE5TXG4gICAgICBpZiAocGFydC5oYXNFcnJvcmVkICYmIChwYXJ0LmNvbXBvbmVudCA9PT0gSVMgfHwgcGFydC5lcnJvci5jb2RlICE9PSA1KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9KVxuXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBlcnJvcnNbMF0uZXJyb3JcbiAgICB9XG5cbiAgICBjb25zdCBtZXJnZWREZXZpY2UgPSBtZXJnZURldmljZShkZXZpY2VQYXJ0cylcblxuICAgIGNvbnN0IHsgZmllbGRfbWFzayB9ID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG5cbiAgICByZXR1cm4gdGhpcy5fZW1pdERlZmF1bHRzKGZpZWxkX21hc2sucGF0aHMsIE1hcnNoYWxlci51bndyYXBEZXZpY2UobWVyZ2VkRGV2aWNlKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBgZGV2aWNlSWRgIGVuZCBkZXZpY2UgdW5kZXIgdGhlIGBhcHBsaWNhdGlvbklkYCBhcHBsaWNhdGlvbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBjYXVzZSB1cGRhdGVzIG9mIHRoZSBlbmQgZGV2aWNlIGluIGFsbCBhdmFpbGFibGUgc3RhY2tcbiAgICogY29tcG9uZW50cyAoaS5lLiBOUywgQVMsIElTLCBKUykgYmFzZWQgb24gcHJvdmlkZWQgZW5kIGRldmljZSBwYXlsb2FkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwbGljYXRpb25JZCAtIFRoZSBhcHBsaWNhdGlvbiBJRC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRldmljZUlkIC1UaGUgZW5kIGRldmljZSBJRC5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhdGNoIC0gVGhlIGVuZCBkZXZpY2UgcGF5bG9hZC5cbiAgICogQHJldHVybnMge29iamVjdH0gLSBVcGRhdGVkIGVuZCBkZXZpY2Ugb24gc3VjY2Vzc2Z1bCB1cGRhdGUsIGFuIGVycm9yXG4gICAqIG90aGVyd2lzZS5cbiAgICovXG4gIGFzeW5jIHVwZGF0ZUJ5SWQoYXBwbGljYXRpb25JZCwgZGV2aWNlSWQsIHBhdGNoKSB7XG4gICAgaWYgKCFCb29sZWFuKGFwcGxpY2F0aW9uSWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXBwbGljYXRpb24gSUQgZm9yIGRldmljZScpXG4gICAgfVxuXG4gICAgaWYgKCFCb29sZWFuKGRldmljZUlkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVuZCBkZXZpY2UgSUQnKVxuICAgIH1cblxuICAgIGNvbnN0IGRldmljZU1hcCA9IHRyYXZlcnNlKGRldmljZUVudGl0eU1hcClcbiAgICBjb25zdCBwYXRocyA9IHRyYXZlcnNlKHBhdGNoKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYykge1xuICAgICAgLy8gT25seSBhZGQgdGhlIHRvcCBsZXZlbCBwYXRoIGZvciBhcnJheXMsIG90aGVyd2lzZSBwYXRocyBhcmUgZ2VuZXJhdGVkXG4gICAgICAvLyBmb3IgZWFjaCBpdGVtIGluIHRoZSBhcnJheS5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMubm9kZSkpIHtcbiAgICAgICAgYWNjLnB1c2godGhpcy5wYXRoKVxuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLm5vZGUsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzTGVhZikge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5wYXRoXG5cbiAgICAgICAgY29uc3QgcGFyZW50QWRkZWQgPSBhY2Muc29tZShlID0+IHBhdGhbMF0uc3RhcnRzV2l0aChlLmpvaW4oKSkpXG5cbiAgICAgICAgLy8gT25seSBjb25zaWRlciBhZGRpbmcsIGlmIGEgY29tbW9uIHBhcmVudCBoYXMgbm90IGJlZW4gYWxyZWFkeSBhZGRlZC5cbiAgICAgICAgaWYgKCFwYXJlbnRBZGRlZCkge1xuICAgICAgICAgIC8vIEFkZCBvbmx5IHRoZSBkZWVwZXN0IHBvc3NpYmxlIGZpZWxkIG1hc2sgb2YgdGhlIHBhdGNoLlxuICAgICAgICAgIGNvbnN0IGNvbW1vblBhdGggPSBwYXRoLmZpbHRlcigoXywgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBhcnJheS5zbGljZSgwLCBpbmRleCArIDEpXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlTWFwLmhhcyhhcnIpXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGFjYy5wdXNoKGNvbW1vblBhdGgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcblxuICAgIGNvbnN0IHJlcXVlc3RUcmVlID0gc3BsaXRTZXRQYXRocyhwYXRocylcblxuICAgIC8vIEFzc2VtYmxlIHBhdGhzIGZvciBlbmQgZGV2aWNlIGZpZWxkcyB0aGF0IG5lZWQgdG8gYmUgcmV0cmlldmVkIGZpcnN0IHRvXG4gICAgLy8gbWFrZSB0aGUgdXBkYXRlIHJlcXVlc3QuXG4gICAgY29uc3QgY29tYmluZVBhdGhzID0gW11cbiAgICBpZiAoQVMgaW4gcmVxdWVzdFRyZWUgJiYgISgnYXBwbGljYXRpb25fc2VydmVyX2FkZHJlc3MnIGluIHBhdGNoKSkge1xuICAgICAgY29tYmluZVBhdGhzLnB1c2goWydhcHBsaWNhdGlvbl9zZXJ2ZXJfYWRkcmVzcyddKVxuICAgIH1cbiAgICBpZiAoSlMgaW4gcmVxdWVzdFRyZWUgJiYgISgnam9pbl9zZXJ2ZXJfYWRkcmVzcycgaW4gcGF0Y2gpKSB7XG4gICAgICBjb21iaW5lUGF0aHMucHVzaChbJ2pvaW5fc2VydmVyX2FkZHJlc3MnXSlcbiAgICAgIGNvbWJpbmVQYXRocy5wdXNoKFsnc3VwcG9ydHNfam9pbiddKVxuXG4gICAgICBjb25zdCB7IGlkcyA9IHt9IH0gPSBwYXRjaFxuICAgICAgaWYgKCEoJ2Rldl9ldWknIGluIGlkcykgfHwgISgnam9pbl9ldWknIGluIGlkcykpIHtcbiAgICAgICAgY29tYmluZVBhdGhzLnB1c2goWydpZHMnLCAnZGV2X2V1aSddKVxuICAgICAgICBjb21iaW5lUGF0aHMucHVzaChbJ2lkcycsICdqb2luX2V1aSddKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoTlMgaW4gcmVxdWVzdFRyZWUgJiYgISgnbmV0d29ya19zZXJ2ZXJfYWRkcmVzcycgaW4gcGF0Y2gpKSB7XG4gICAgICBjb21iaW5lUGF0aHMucHVzaChbJ25ldHdvcmtfc2VydmVyX2FkZHJlc3MnXSlcbiAgICB9XG5cbiAgICBjb25zdCBhc3NlbWJsZWRWYWx1ZXMgPSBhd2FpdCB0aGlzLl9nZXREZXZpY2UoYXBwbGljYXRpb25JZCwgZGV2aWNlSWQsIGNvbWJpbmVQYXRocywgdHJ1ZSlcblxuICAgIGlmIChhc3NlbWJsZWRWYWx1ZXMubmV0d29ya19zZXJ2ZXJfYWRkcmVzcyAhPT0gdGhpcy5fc3RhY2tDb25maWcubnNIb3N0KSB7XG4gICAgICBkZWxldGUgcmVxdWVzdFRyZWUubnNcbiAgICB9XG5cbiAgICBpZiAoYXNzZW1ibGVkVmFsdWVzLmFwcGxpY2F0aW9uX3NlcnZlcl9hZGRyZXNzICE9PSB0aGlzLl9zdGFja0NvbmZpZy5hc0hvc3QpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0VHJlZS5hc1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICFhc3NlbWJsZWRWYWx1ZXMuc3VwcG9ydHNfam9pbiB8fFxuICAgICAgYXNzZW1ibGVkVmFsdWVzLmpvaW5fc2VydmVyX2FkZHJlc3MgIT09IHRoaXMuX3N0YWNrQ29uZmlnLmpzSG9zdFxuICAgICkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RUcmVlLmpzXG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRvIGluY2x1ZGUgYGpvaW5fZXVpYCBhbmQgYGRldl9ldWlgIGZvciBqcyByZXF1ZXN0IGFzIHRob3NlIGFyZVxuICAgIC8vIHJlcXVpcmVkLlxuICAgIGlmIChKUyBpbiByZXF1ZXN0VHJlZSkge1xuICAgICAgY29uc3QgeyBpZHMgPSB7fSB9ID0gcGF0Y2hcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaWRzOiB7IGpvaW5fZXVpLCBkZXZfZXVpIH0sXG4gICAgICB9ID0gYXNzZW1ibGVkVmFsdWVzXG5cbiAgICAgIHBhdGNoLmlkcyA9IHtcbiAgICAgICAgLi4uaWRzLFxuICAgICAgICBqb2luX2V1aSxcbiAgICAgICAgZGV2X2V1aSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZVBhcmFtcyA9IHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICdlbmRfZGV2aWNlLmlkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBsaWNhdGlvbklkLFxuICAgICAgICAnZW5kX2RldmljZS5pZHMuZGV2aWNlX2lkJzogZGV2aWNlSWQsXG4gICAgICB9LFxuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gdGhlIHJlcXVlc3RzLlxuICAgIGNvbnN0IGRldmljZVBheWxvYWQgPSBNYXJzaGFsZXIucGF5bG9hZChwYXRjaCwgJ2VuZF9kZXZpY2UnKVxuICAgIGNvbnN0IHNldFBhcnRzID0gYXdhaXQgbWFrZVJlcXVlc3RzKFxuICAgICAgdGhpcy5fYXBpLFxuICAgICAgdGhpcy5fc3RhY2tDb25maWcsXG4gICAgICAnc2V0JyxcbiAgICAgIHJlcXVlc3RUcmVlLFxuICAgICAgcm91dGVQYXJhbXMsXG4gICAgICBkZXZpY2VQYXlsb2FkLFxuICAgIClcblxuICAgIC8vIEZpbHRlciBvdXQgZXJyb3JlZCByZXF1ZXN0cy5cbiAgICBjb25zdCBlcnJvcnMgPSBzZXRQYXJ0cy5maWx0ZXIocGFydCA9PiBwYXJ0Lmhhc0Vycm9yZWQpXG5cbiAgICAvLyBIYW5kbGUgcG9zc2libGUgZXJyb3JlZCByZXF1ZXN0cy5cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgLy8gVGhyb3cgdGhlIGZpcnN0IGVycm9yLlxuICAgICAgdGhyb3cgZXJyb3JzWzBdLmVycm9yXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2VtaXREZWZhdWx0cyhcbiAgICAgIE1hcnNoYWxlci5maWVsZE1hc2tGcm9tUGF0Y2gocGF0Y2gpLFxuICAgICAgTWFyc2hhbGVyLnVud3JhcERldmljZShtZXJnZURldmljZShzZXRQYXJ0cykpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGVuZCBkZXZpY2UgdW5kZXIgdGhlIGBhcHBsaWNhdGlvbklkYCBhcHBsaWNhdGlvbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBjYXVzZSBjcmVhdGluZyB0aGUgZW5kIGRldmljZSBpbiBhbGwgYXZhaWxhYmxlIHN0YWNrXG4gICAqIGNvbXBvbmVudHMgKGkuZS4gTlMsIEFTLCBJUywgSlMpIGJhc2VkIG9uIHByb3ZpZGVkIGVuZCBkZXZpY2UgcGF5bG9hZFxuICAgKiAoYGRldmljZWApIG9yIG9uIGZpZWxkIG1hc2sgcGF0aHMgKGBtYXNrYCkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcHBsaWNhdGlvbklkIC0gQXBwbGljYXRpb24gSUQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkZXZpY2UgLSBUaGUgZW5kIGRldmljZSBwYXlsb2FkLlxuICAgKiBAcGFyYW0ge0FycmF5fSBtYXNrIC1UaGUgZmllbGQgbWFzayBwYXRocyAoYnkgZGVmYXVsdCBpcyBnZW5lcmF0ZWQgZnJvbVxuICAgKiBgZGV2aWNlYCBwYXlsb2FkKS5cbiAgICogQHJldHVybnMge29iamVjdH0gLSBDcmVhdGVkIGVuZCBkZXZpY2Ugb24gc3VjY2Vzc2Z1bCBjcmVhdGlvbiwgYW4gZXJyb3JcbiAgICogb3RoZXJ3aXNlLlxuICAgKi9cbiAgYXN5bmMgY3JlYXRlKGFwcGxpY2F0aW9uSWQsIGRldmljZSwgbWFzayA9IE1hcnNoYWxlci5maWVsZE1hc2tGcm9tUGF0Y2goZGV2aWNlKSkge1xuICAgIGlmICghQm9vbGVhbihhcHBsaWNhdGlvbklkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGFwcGxpY2F0aW9uIElEIGZvciBkZXZpY2UnKVxuICAgIH1cblxuICAgIGNvbnN0IHsgc3VwcG9ydHNfam9pbiA9IGZhbHNlLCBpZHMgPSB7fSB9ID0gZGV2aWNlXG5cbiAgICBjb25zdCBkZXZpY2VJZCA9IGlkcy5kZXZpY2VfaWRcbiAgICBpZiAoIUJvb2xlYW4oZGV2aWNlSWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZW5kIGRldmljZSBJRCcpXG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdFRyZWUgPSBzcGxpdFNldFBhdGhzKE1hcnNoYWxlci5zZWxlY3RvclRvUGF0aHMobWFzaykpXG5cbiAgICBpZiAoIXN1cHBvcnRzX2pvaW4gfHwgZGV2aWNlLmpvaW5fc2VydmVyX2FkZHJlc3MgIT09IHRoaXMuX3N0YWNrQ29uZmlnLmpzSG9zdCkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RUcmVlLmpzXG4gICAgfVxuXG4gICAgaWYgKGRldmljZS5uZXR3b3JrX3NlcnZlcl9hZGRyZXNzICE9PSB0aGlzLl9zdGFja0NvbmZpZy5uc0hvc3QpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0VHJlZS5uc1xuICAgIH1cblxuICAgIGlmIChkZXZpY2UuYXBwbGljYXRpb25fc2VydmVyX2FkZHJlc3MgIT09IHRoaXMuX3N0YWNrQ29uZmlnLmFzSG9zdCkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RUcmVlLmFzXG4gICAgfVxuXG4gICAgY29uc3QgZGV2aWNlUGF5bG9hZCA9IE1hcnNoYWxlci5wYXlsb2FkKGRldmljZSwgJ2VuZF9kZXZpY2UnKVxuICAgIGNvbnN0IHJvdXRlUGFyYW1zID0ge1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgJ2VuZF9kZXZpY2UuaWRzLmFwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcGxpY2F0aW9uSWQsXG4gICAgICB9LFxuICAgIH1cbiAgICBjb25zdCBzZXRQYXJ0cyA9IGF3YWl0IG1ha2VSZXF1ZXN0cyhcbiAgICAgIHRoaXMuX2FwaSxcbiAgICAgIHRoaXMuX3N0YWNrQ29uZmlnLFxuICAgICAgJ2NyZWF0ZScsXG4gICAgICByZXF1ZXN0VHJlZSxcbiAgICAgIHJvdXRlUGFyYW1zLFxuICAgICAgZGV2aWNlUGF5bG9hZCxcbiAgICApXG5cbiAgICAvLyBGaWx0ZXIgb3V0IGVycm9yZWQgcmVxdWVzdHMuXG4gICAgY29uc3QgZXJyb3JzID0gc2V0UGFydHMuZmlsdGVyKHBhcnQgPT4gcGFydC5oYXNFcnJvcmVkKVxuXG4gICAgLy8gSGFuZGxlIHBvc3NpYmxlIGVycm9yZWQgcmVxdWVzdHMuXG4gICAgaWYgKGVycm9ycy5sZW5ndGggIT09IDApIHtcbiAgICAgIC8vIFJvbGwgYmFjayBzdWNjZXNzZnVsbHkgY3JlYXRlZCByZWdpc3RyeSBlbnRyaWVzLlxuICAgICAgY29uc3Qgcm9sbGJhY2tDb21wb25lbnRzID0gc2V0UGFydHMucmVkdWNlKChjb21wb25lbnRzLCBwYXJ0KSA9PiB7XG4gICAgICAgIGlmIChwYXJ0Lmhhc0F0dGVtcHRlZCAmJiAhcGFydC5oYXNFcnJvcmVkKSB7XG4gICAgICAgICAgY29tcG9uZW50cy5wdXNoKHBhcnQuY29tcG9uZW50KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHNcbiAgICAgIH0sIFtdKVxuXG4gICAgICBhd2FpdCB0aGlzLl9kZWxldGVEZXZpY2UoYXBwbGljYXRpb25JZCwgZGV2aWNlSWQsIHJvbGxiYWNrQ29tcG9uZW50cylcblxuICAgICAgLy8gVGhyb3cgdGhlIGZpcnN0IGVycm9yLlxuICAgICAgdGhyb3cgZXJyb3JzWzBdLmVycm9yXG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlRGV2aWNlKHNldFBhcnRzKVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgdGhlIGBkZXZpY2VJZGAgZW5kIGRldmljZSB1bmRlciB0aGUgYGFwcGxpY2F0aW9uSWRgIGFwcGxpY2F0aW9uLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGNhdXNlIGRlbGV0aW9uIG9mIHRoZSBlbmQgZGV2aWNlIGluIGFsbCBhdmFpbGFibGUgc3RhY2tcbiAgICogY29tcG9uZW50cyAoaS5lLiBOUywgQVMsIElTLCBKUykuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcHBsaWNhdGlvbklkIC0gVGhlIGFwcGxpY2F0aW9uIElELlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGV2aWNlSWQgLSBUaGUgZW5kIGV2aWNlIElELlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEVtcHR5IG9iamVjdCBvbiBzdWNjZXNzZnVsIHVwZGF0ZSwgYW4gZXJyb3Igb3RoZXJ3aXNlLlxuICAgKi9cbiAgYXN5bmMgZGVsZXRlQnlJZChhcHBsaWNhdGlvbklkLCBkZXZpY2VJZCkge1xuICAgIHJldHVybiB0aGlzLl9kZWxldGVEZXZpY2UoYXBwbGljYXRpb25JZCwgZGV2aWNlSWQpXG4gIH1cblxuICAvLyBFbmQgRGV2aWNlIFRlbXBsYXRlIENvbnZlcnRlci5cblxuICBhc3luYyBsaXN0VGVtcGxhdGVGb3JtYXRzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5FbmREZXZpY2VUZW1wbGF0ZUNvbnZlcnRlci5MaXN0Rm9ybWF0cygpXG4gICAgY29uc3QgcGF5bG9hZCA9IE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuXG4gICAgcmV0dXJuIHBheWxvYWQuZm9ybWF0c1xuICB9XG5cbiAgY29udmVydFRlbXBsYXRlKGZvcm1hdElkLCBkYXRhKSB7XG4gICAgLy8gVGhpcyBpcyBhIHN0cmVhbSBlbmRwb2ludC5cbiAgICByZXR1cm4gdGhpcy5fYXBpLkVuZERldmljZVRlbXBsYXRlQ29udmVydGVyLkNvbnZlcnQodW5kZWZpbmVkLCB7XG4gICAgICBmb3JtYXRfaWQ6IGZvcm1hdElkLFxuICAgICAgZGF0YSxcbiAgICB9KVxuICB9XG5cbiAgYnVsa0NyZWF0ZShhcHBsaWNhdGlvbklkLCBkZXZpY2VPckRldmljZXMpIHtcbiAgICBjb25zdCBkZXZpY2VzID0gIShkZXZpY2VPckRldmljZXMgaW5zdGFuY2VvZiBBcnJheSkgPyBbZGV2aWNlT3JEZXZpY2VzXSA6IGRldmljZU9yRGV2aWNlc1xuICAgIGxldCBsaXN0ZW5lcnMgPSBPYmplY3QudmFsdWVzKEVWRU5UUykucmVkdWNlKChhY2MsIGN1cnIpID0+ICh7IC4uLmFjYywgW2N1cnJdOiBudWxsIH0pLCB7fSlcbiAgICBsZXQgZmluaXNoZWRDb3VudCA9IDBcbiAgICBsZXQgc3RvcFJlcXVlc3RlZCA9IGZhbHNlXG5cbiAgICBjb25zdCBydW5UYXNrcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAoY29uc3QgZGV2aWNlIG9mIGRldmljZXMpIHtcbiAgICAgICAgaWYgKHN0b3BSZXF1ZXN0ZWQpIHtcbiAgICAgICAgICBub3RpZnkobGlzdGVuZXJzW0VWRU5UUy5DTE9TRV0pXG4gICAgICAgICAgbGlzdGVuZXJzID0gbnVsbFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGZpZWxkX21hc2s6IHsgcGF0aHMgfSxcbiAgICAgICAgICAgIGVuZF9kZXZpY2UsXG4gICAgICAgICAgfSA9IGRldmljZVxuXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jcmVhdGUoYXBwbGljYXRpb25JZCwgZW5kX2RldmljZSwgcGF0aHMpXG5cbiAgICAgICAgICBub3RpZnkobGlzdGVuZXJzW0VWRU5UUy5DSFVOS10sIHJlc3VsdClcbiAgICAgICAgICBmaW5pc2hlZENvdW50KytcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBub3RpZnkobGlzdGVuZXJzW0VWRU5UUy5FUlJPUl0sIGVycm9yKVxuICAgICAgICAgIGZpbmlzaGVkQ291bnQrK1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChmaW5pc2hlZENvdW50ID09PSBkZXZpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgbm90aWZ5KGxpc3RlbmVyc1tFVkVOVFMuQ0xPU0VdKVxuICAgICAgICAgICAgbGlzdGVuZXJzID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogcnVuVGFza3MuYmluZCh0aGlzKSxcbiAgICAgIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyc1tldmVudE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgJHtldmVudE5hbWV9IGV2ZW50IGlzIG5vdCBzdXBwb3J0ZWQuIFNob3VsZCBiZSBvbmUgb2Y6IHN0YXJ0LCBlcnJvciwgY2h1bmsgb3IgY2xvc2VgLFxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RlbmVyc1tldmVudE5hbWVdID0gY2FsbGJhY2tcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgfSxcbiAgICAgIGFib3J0OiAoKSA9PiB7XG4gICAgICAgIHN0b3BSZXF1ZXN0ZWQgPSB0cnVlXG4gICAgICB9LFxuICAgIH1cbiAgfVxuXG4gIC8vIEV2ZW50cyBTdHJlYW1cblxuICBhc3luYyBvcGVuU3RyZWFtKGlkZW50aWZpZXJzLCB0YWlsLCBhZnRlcikge1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBpZGVudGlmaWVyczogaWRlbnRpZmllcnMubWFwKGlkcyA9PiAoe1xuICAgICAgICBkZXZpY2VfaWRzOiBpZHMsXG4gICAgICB9KSksXG4gICAgICB0YWlsLFxuICAgICAgYWZ0ZXIsXG4gICAgfVxuXG4gICAgLy8gRXZlbnQgc3RyZWFtcyBjYW4gY29tZSBmcm9tIG11bHRpcGxlIHN0YWNrIGNvbXBvbmVudHMuIEl0IGlzIG5lY2Vzc2FyeSB0b1xuICAgIC8vIGNoZWNrIGZvciBzdGFjayBjb21wb25lbnRzIG9uIGRpZmZlcmVudCBob3N0cyBhbmQgb3BlbiBkaXN0aW5jdCBzdHJlYW1cbiAgICAvLyBjb25uZWN0aW9ucyBmb3IgYW55IGRpc3RpbmN0IGhvc3QgaWYgbmVlZCBiZS5cbiAgICBjb25zdCBkaXN0aW5jdENvbXBvbmVudHMgPSB0aGlzLl9zdGFja0NvbmZpZy5nZXRDb21wb25lbnRzV2l0aERpc3RpbmN0QmFzZVVybHMoW1xuICAgICAgSVMsXG4gICAgICBKUyxcbiAgICAgIE5TLFxuICAgICAgQVMsXG4gICAgICBEVEMsXG4gICAgXSlcblxuICAgIGNvbnN0IHN0cmVhbXMgPSBkaXN0aW5jdENvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PlxuICAgICAgdGhpcy5fYXBpLkV2ZW50cy5TdHJlYW0oeyBjb21wb25lbnQgfSwgcGF5bG9hZCksXG4gICAgKVxuXG4gICAgLy8gQ29tYmluZSBhbGwgc3RyZWFtIHNvdXJjZXMgdG8gb25lIHN1YnNjcmlwdGlvbiBnZW5lcmF0b3IuXG4gICAgcmV0dXJuIGNvbWJpbmVTdHJlYW1zKHN0cmVhbXMpXG4gIH1cblxuICBhc3luYyBzaW11bGF0ZVVwbGluayhhcHBsaWNhdGlvbklkLCBkZXZpY2VJZCwgdXBsaW5rKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkFwcEFzLlNpbXVsYXRlVXBsaW5rKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICdlbmRfZGV2aWNlX2lkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBsaWNhdGlvbklkLFxuICAgICAgICAgICdlbmRfZGV2aWNlX2lkcy5kZXZpY2VfaWQnOiBkZXZpY2VJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVwbGlua19tZXNzYWdlOiB1cGxpbmssXG4gICAgICB9LFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXZpY2VzXG4iXX0=