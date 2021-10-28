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

var _combineStreams = _interopRequireDefault(require("../util/combine-streams"));

var _constants = require("../util/constants");

var _devices = _interopRequireDefault(require("./devices"));

var _apiKeys = _interopRequireDefault(require("./api-keys"));

var _link = _interopRequireDefault(require("./link"));

var _collaborators = _interopRequireDefault(require("./collaborators"));

var _webhooks = _interopRequireDefault(require("./webhooks"));

var _pubsubs = _interopRequireDefault(require("./pubsubs"));

var _applicationPackages = _interopRequireDefault(require("./application-packages"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var IS = _constants.STACK_COMPONENTS_MAP.is,
    AS = _constants.STACK_COMPONENTS_MAP.as,
    NS = _constants.STACK_COMPONENTS_MAP.ns,
    JS = _constants.STACK_COMPONENTS_MAP.js,
    DTC = _constants.STACK_COMPONENTS_MAP.dtc;
/**
 * Applications Class provides an abstraction on all applications and manages
 * data handling from different sources. It exposes an API to easily work with
 * application data.
 *
 * @param {object} api - The connector to be used by the service.
 * @param {object} config - The configuration for the service.
 * @param {string} config.defaultUserId - The users identifier to be used in
 * user related requests.
 * @param {boolean} config.proxy - The flag to identify if the results
 * should be proxied with the wrapper objects.
 */

var Applications = /*#__PURE__*/function () {
  function Applications(api, _ref) {
    var defaultUserId = _ref.defaultUserId,
        stackConfig = _ref.stackConfig;
    (0, _classCallCheck2["default"])(this, Applications);
    this._defaultUserId = defaultUserId;
    this._api = api;
    this._stackConfig = stackConfig;
    this.ApiKeys = new _apiKeys["default"](api.ApplicationAccess, {
      parentRoutes: {
        get: 'application_ids.application_id',
        list: 'application_ids.application_id',
        create: 'application_ids.application_id',
        update: 'application_ids.application_id'
      }
    });
    this.Link = new _link["default"](api.As);
    this.Devices = new _devices["default"](api, {
      stackConfig: stackConfig
    });
    this.Collaborators = new _collaborators["default"](api.ApplicationAccess, {
      parentRoutes: {
        get: 'application_ids.application_id',
        list: 'application_ids.application_id',
        set: 'application_ids.application_id'
      }
    });
    this.Webhooks = new _webhooks["default"](api.ApplicationWebhookRegistry);
    this.PubSubs = new _pubsubs["default"](api.ApplicationPubSubRegistry);
    this.Packages = new _applicationPackages["default"](api.ApplicationPackageRegistry);
  } // Retrieval.


  (0, _createClass2["default"])(Applications, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.ApplicationRegistry.List(undefined, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context.sent;
                return _context.abrupt("return", _marshaler["default"].unwrapApplications(response));

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
                return this._api.ApplicationRegistry.Get({
                  routeParams: {
                    'application_ids.application_id': id
                  }
                }, fieldMask);

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].unwrapApplication(response));

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
    key: "getByOrganization",
    value: function () {
      var _getByOrganization = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(organizationId) {
        var response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                response = this._api.ApplicationRegistry.List({
                  routeParams: {
                    'collaborator.organization_ids.organization_id': organizationId
                  }
                });
                return _context3.abrupt("return", _marshaler["default"].unwrapApplications(response));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getByOrganization(_x5) {
        return _getByOrganization.apply(this, arguments);
      }

      return getByOrganization;
    }()
  }, {
    key: "getByCollaborator",
    value: function () {
      var _getByCollaborator = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId) {
        var response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                response = this._api.ApplicationRegistry.List({
                  routeParams: {
                    'collaborator.user_ids.user_id': userId
                  }
                });
                return _context4.abrupt("return", _marshaler["default"].unwrapApplications(response));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getByCollaborator(_x6) {
        return _getByCollaborator.apply(this, arguments);
      }

      return getByCollaborator;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.EntityRegistrySearch.SearchApplications(undefined, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].unwrapApplications(response));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function search(_x7, _x8) {
        return _search.apply(this, arguments);
      }

      return search;
    }() // Update.

  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, patch) {
        var mask,
            response,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                mask = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : _marshaler["default"].fieldMaskFromPatch(patch, this._api.ApplicationRegistry.UpdateAllowedFieldMaskPaths);
                _context6.next = 3;
                return this._api.ApplicationRegistry.Update({
                  routeParams: {
                    'application.ids.application_id': id
                  }
                }, {
                  application: patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                response = _context6.sent;
                return _context6.abrupt("return", _marshaler["default"].unwrapApplication(response));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateById(_x9, _x10) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }, {
    key: "restoreById",
    value: function () {
      var _restoreById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
        var response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._api.ApplicationRegistry.Restore({
                  routeParams: {
                    application_id: id
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

      function restoreById(_x11) {
        return _restoreById.apply(this, arguments);
      }

      return restoreById;
    }() // Creation.

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var ownerId,
            application,
            isUserOwner,
            routeParams,
            response,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                ownerId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : this._defaultUserId;
                application = _args8.length > 1 ? _args8[1] : undefined;
                isUserOwner = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : true;
                routeParams = isUserOwner ? {
                  'collaborator.user_ids.user_id': ownerId
                } : {
                  'collaborator.organization_ids.organization_id': ownerId
                };
                _context8.next = 6;
                return this._api.ApplicationRegistry.Create({
                  routeParams: routeParams
                }, {
                  application: application
                });

              case 6:
                response = _context8.sent;
                return _context8.abrupt("return", _marshaler["default"].unwrapApplication(response));

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }() // Deletion.

  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(applicationId) {
        var response;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._api.ApplicationRegistry.Delete({
                  routeParams: {
                    application_id: applicationId
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

      function deleteById(_x12) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "purgeById",
    value: function () {
      var _purgeById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(id) {
        var response;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._api.ApplicationRegistry.Purge({
                  routeParams: {
                    application_id: id
                  }
                });

              case 2:
                response = _context10.sent;
                return _context10.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function purgeById(_x13) {
        return _purgeById.apply(this, arguments);
      }

      return purgeById;
    }() // DevEUI issuing.

  }, {
    key: "issueDevEUI",
    value: function () {
      var _issueDevEUI = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(id) {
        var response;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this._api.ApplicationRegistry.IssueDevEUI({
                  routeParams: {
                    application_id: id
                  }
                });

              case 2:
                response = _context11.sent;
                return _context11.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function issueDevEUI(_x14) {
        return _issueDevEUI.apply(this, arguments);
      }

      return issueDevEUI;
    }() // Miscellaneous.

  }, {
    key: "getRightsById",
    value: function () {
      var _getRightsById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(applicationId) {
        var result;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._api.ApplicationAccess.ListRights({
                  routeParams: {
                    application_id: applicationId
                  }
                });

              case 2:
                result = _context12.sent;
                return _context12.abrupt("return", _marshaler["default"].unwrapRights(result));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getRightsById(_x15) {
        return _getRightsById.apply(this, arguments);
      }

      return getRightsById;
    }()
  }, {
    key: "getMqttConnectionInfo",
    value: function () {
      var _getMqttConnectionInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(applicationId) {
        var response;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._api.AppAs.GetMQTTConnectionInfo({
                  routeParams: {
                    application_id: applicationId
                  }
                });

              case 2:
                response = _context13.sent;
                return _context13.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getMqttConnectionInfo(_x16) {
        return _getMqttConnectionInfo.apply(this, arguments);
      }

      return getMqttConnectionInfo;
    }() // Events Stream

  }, {
    key: "openStream",
    value: function () {
      var _openStream = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(identifiers, tail, after) {
        var _this = this;

        var payload, distinctComponents, streams;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                payload = {
                  identifiers: identifiers.map(function (id) {
                    return {
                      application_ids: {
                        application_id: id
                      }
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

                return _context14.abrupt("return", (0, _combineStreams["default"])(streams));

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function openStream(_x17, _x18, _x19) {
        return _openStream.apply(this, arguments);
      }

      return openStream;
    }()
  }]);
  return Applications;
}();

var _default = Applications;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2FwcGxpY2F0aW9ucy5qcyJdLCJuYW1lcyI6WyJJUyIsIlNUQUNLX0NPTVBPTkVOVFNfTUFQIiwiaXMiLCJBUyIsImFzIiwiTlMiLCJucyIsIkpTIiwianMiLCJEVEMiLCJkdGMiLCJBcHBsaWNhdGlvbnMiLCJhcGkiLCJkZWZhdWx0VXNlcklkIiwic3RhY2tDb25maWciLCJfZGVmYXVsdFVzZXJJZCIsIl9hcGkiLCJfc3RhY2tDb25maWciLCJBcGlLZXlzIiwiQXBwbGljYXRpb25BY2Nlc3MiLCJwYXJlbnRSb3V0ZXMiLCJnZXQiLCJsaXN0IiwiY3JlYXRlIiwidXBkYXRlIiwiTGluayIsIkFzIiwiRGV2aWNlcyIsIkNvbGxhYm9yYXRvcnMiLCJzZXQiLCJXZWJob29rcyIsIkFwcGxpY2F0aW9uV2ViaG9va1JlZ2lzdHJ5IiwiUHViU3VicyIsIkFwcGxpY2F0aW9uUHViU3ViUmVnaXN0cnkiLCJQYWNrYWdlcyIsIkFwcGxpY2F0aW9uUGFja2FnZVJlZ2lzdHJ5IiwicGFyYW1zIiwic2VsZWN0b3IiLCJBcHBsaWNhdGlvblJlZ2lzdHJ5IiwiTGlzdCIsInVuZGVmaW5lZCIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJyZXNwb25zZSIsInVud3JhcEFwcGxpY2F0aW9ucyIsImlkIiwiZmllbGRNYXNrIiwiR2V0Iiwicm91dGVQYXJhbXMiLCJ1bndyYXBBcHBsaWNhdGlvbiIsIm9yZ2FuaXphdGlvbklkIiwidXNlcklkIiwiRW50aXR5UmVnaXN0cnlTZWFyY2giLCJTZWFyY2hBcHBsaWNhdGlvbnMiLCJwYXRjaCIsIm1hc2siLCJmaWVsZE1hc2tGcm9tUGF0Y2giLCJVcGRhdGVBbGxvd2VkRmllbGRNYXNrUGF0aHMiLCJVcGRhdGUiLCJhcHBsaWNhdGlvbiIsImZpZWxkX21hc2siLCJSZXN0b3JlIiwiYXBwbGljYXRpb25faWQiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJvd25lcklkIiwiaXNVc2VyT3duZXIiLCJDcmVhdGUiLCJhcHBsaWNhdGlvbklkIiwiRGVsZXRlIiwiUHVyZ2UiLCJJc3N1ZURldkVVSSIsIkxpc3RSaWdodHMiLCJyZXN1bHQiLCJ1bndyYXBSaWdodHMiLCJBcHBBcyIsIkdldE1RVFRDb25uZWN0aW9uSW5mbyIsImlkZW50aWZpZXJzIiwidGFpbCIsImFmdGVyIiwicGF5bG9hZCIsIm1hcCIsImFwcGxpY2F0aW9uX2lkcyIsImRpc3RpbmN0Q29tcG9uZW50cyIsImdldENvbXBvbmVudHNXaXRoRGlzdGluY3RCYXNlVXJscyIsInN0cmVhbXMiLCJjb21wb25lbnQiLCJFdmVudHMiLCJTdHJlYW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBWUEsRUFBWixHQUFxREMsK0JBQXJELENBQVFDLEVBQVI7QUFBQSxJQUFvQkMsRUFBcEIsR0FBcURGLCtCQUFyRCxDQUFnQkcsRUFBaEI7QUFBQSxJQUE0QkMsRUFBNUIsR0FBcURKLCtCQUFyRCxDQUF3QkssRUFBeEI7QUFBQSxJQUFvQ0MsRUFBcEMsR0FBcUROLCtCQUFyRCxDQUFnQ08sRUFBaEM7QUFBQSxJQUE2Q0MsR0FBN0MsR0FBcURSLCtCQUFyRCxDQUF3Q1MsR0FBeEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ01DLFk7QUFDSix3QkFBWUMsR0FBWixRQUFpRDtBQUFBLFFBQTlCQyxhQUE4QixRQUE5QkEsYUFBOEI7QUFBQSxRQUFmQyxXQUFlLFFBQWZBLFdBQWU7QUFBQTtBQUMvQyxTQUFLQyxjQUFMLEdBQXNCRixhQUF0QjtBQUNBLFNBQUtHLElBQUwsR0FBWUosR0FBWjtBQUNBLFNBQUtLLFlBQUwsR0FBb0JILFdBQXBCO0FBRUEsU0FBS0ksT0FBTCxHQUFlLElBQUlBLG1CQUFKLENBQVlOLEdBQUcsQ0FBQ08saUJB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RSxZQUFMLENBQWtCa0UsaUNBQWxCLENBQW9ELENBQzdFbkYsRUFENkUsRUFFN0VPLEVBRjZFLEVBRzdFRixFQUg2RSxFQUk3RUYsRUFKNkUsRUFLN0VNLEdBTDZFLENBQXBELENBWjdCO0FBb0JRMkUsZ0JBQUFBLE9BcEJSLEdBb0JrQkYsa0JBQWtCLENBQUNGLEdBQW5CLENBQXVCLFVBQUFLLFNBQVM7QUFBQSx5QkFDOUMsS0FBSSxDQUFDckUsSUFBTCxDQUFVc0UsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0I7QUFBRUYsb0JBQUFBLFNBQVMsRUFBVEE7QUFBRixtQkFBeEIsRUFBdUNOLE9BQXZDLENBRDhDO0FBQUEsaUJBQWhDLENBcEJsQixFQXdCRTs7QUF4QkYsbURBeUJTLGdDQUFlSyxPQUFmLENBekJUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQTZCYXpFLFkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAyMSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5pbXBvcnQgY29tYmluZVN0cmVhbXMgZnJvbSAnLi4vdXRpbC9jb21iaW5lLXN0cmVhbXMnXG5pbXBvcnQgeyBTVEFDS19DT01QT05FTlRTX01BUCB9IGZyb20gJy4uL3V0aWwvY29uc3RhbnRzJ1xuXG5pbXBvcnQgRGV2aWNlcyBmcm9tICcuL2RldmljZXMnXG5pbXBvcnQgQXBpS2V5cyBmcm9tICcuL2FwaS1rZXlzJ1xuaW1wb3J0IExpbmsgZnJvbSAnLi9saW5rJ1xuaW1wb3J0IENvbGxhYm9yYXRvcnMgZnJvbSAnLi9jb2xsYWJvcmF0b3JzJ1xuaW1wb3J0IFdlYmhvb2tzIGZyb20gJy4vd2ViaG9va3MnXG5pbXBvcnQgUHViU3VicyBmcm9tICcuL3B1YnN1YnMnXG5pbXBvcnQgUGFja2FnZXMgZnJvbSAnLi9hcHBsaWNhdGlvbi1wYWNrYWdlcydcblxuY29uc3QgeyBpczogSVMsIGFzOiBBUywgbnM6IE5TLCBqczogSlMsIGR0YzogRFRDIH0gPSBTVEFDS19DT01QT05FTlRTX01BUFxuXG4vKipcbiAqIEFwcGxpY2F0aW9ucyBDbGFzcyBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiBvbiBhbGwgYXBwbGljYXRpb25zIGFuZCBtYW5hZ2VzXG4gKiBkYXRhIGhhbmRsaW5nIGZyb20gZGlmZmVyZW50IHNvdXJjZXMuIEl0IGV4cG9zZXMgYW4gQVBJIHRvIGVhc2lseSB3b3JrIHdpdGhcbiAqIGFwcGxpY2F0aW9uIGRhdGEuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFwaSAtIFRoZSBjb25uZWN0b3IgdG8gYmUgdXNlZCBieSB0aGUgc2VydmljZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSBUaGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNlcnZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnLmRlZmF1bHRVc2VySWQgLSBUaGUgdXNlcnMgaWRlbnRpZmllciB0byBiZSB1c2VkIGluXG4gKiB1c2VyIHJlbGF0ZWQgcmVxdWVzdHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmZpZy5wcm94eSAtIFRoZSBmbGFnIHRvIGlkZW50aWZ5IGlmIHRoZSByZXN1bHRzXG4gKiBzaG91bGQgYmUgcHJveGllZCB3aXRoIHRoZSB3cmFwcGVyIG9iamVjdHMuXG4gKi9cbmNsYXNzIEFwcGxpY2F0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKGFwaSwgeyBkZWZhdWx0VXNlcklkLCBzdGFja0NvbmZpZyB9KSB7XG4gICAgdGhpcy5fZGVmYXVsdFVzZXJJZCA9IGRlZmF1bHRVc2VySWRcbiAgICB0aGlzLl9hcGkgPSBhcGlcbiAgICB0aGlzLl9zdGFja0NvbmZpZyA9IHN0YWNrQ29uZmlnXG5cbiAgICB0aGlzLkFwaUtleXMgPSBuZXcgQXBpS2V5cyhhcGkuQXBwbGljYXRpb25BY2Nlc3MsIHtcbiAgICAgIHBhcmVudFJvdXRlczoge1xuICAgICAgICBnZXQ6ICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnLFxuICAgICAgICBsaXN0OiAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJyxcbiAgICAgICAgY3JlYXRlOiAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJyxcbiAgICAgICAgdXBkYXRlOiAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgICB0aGlzLkxpbmsgPSBuZXcgTGluayhhcGkuQXMpXG4gICAgdGhpcy5EZXZpY2VzID0gbmV3IERldmljZXMoYXBpLCB7IHN0YWNrQ29uZmlnIH0pXG4gICAgdGhpcy5Db2xsYWJvcmF0b3JzID0gbmV3IENvbGxhYm9yYXRvcnMoYXBpLkFwcGxpY2F0aW9uQWNjZXNzLCB7XG4gICAgICBwYXJlbnRSb3V0ZXM6IHtcbiAgICAgICAgZ2V0OiAnYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJyxcbiAgICAgICAgbGlzdDogJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCcsXG4gICAgICAgIHNldDogJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCcsXG4gICAgICB9LFxuICAgIH0pXG4gICAgdGhpcy5XZWJob29rcyA9IG5ldyBXZWJob29rcyhhcGkuQXBwbGljYXRpb25XZWJob29rUmVnaXN0cnkpXG4gICAgdGhpcy5QdWJTdWJzID0gbmV3IFB1YlN1YnMoYXBpLkFwcGxpY2F0aW9uUHViU3ViUmVnaXN0cnkpXG4gICAgdGhpcy5QYWNrYWdlcyA9IG5ldyBQYWNrYWdlcyhhcGkuQXBwbGljYXRpb25QYWNrYWdlUmVnaXN0cnkpXG4gIH1cblxuICAvLyBSZXRyaWV2YWwuXG5cbiAgYXN5bmMgZ2V0QWxsKHBhcmFtcywgc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5Lkxpc3QodW5kZWZpbmVkLCB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICAuLi5NYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvciksXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwQXBwbGljYXRpb25zKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgZ2V0QnlJZChpZCwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBmaWVsZE1hc2sgPSBNYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvcilcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5LkdldChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHsgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGlkIH0sXG4gICAgICB9LFxuICAgICAgZmllbGRNYXNrLFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwQXBwbGljYXRpb24ocmVzcG9uc2UpXG4gIH1cblxuICBhc3luYyBnZXRCeU9yZ2FuaXphdGlvbihvcmdhbml6YXRpb25JZCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5fYXBpLkFwcGxpY2F0aW9uUmVnaXN0cnkuTGlzdCh7XG4gICAgICByb3V0ZVBhcmFtczogeyAnY29sbGFib3JhdG9yLm9yZ2FuaXphdGlvbl9pZHMub3JnYW5pemF0aW9uX2lkJzogb3JnYW5pemF0aW9uSWQgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci51bndyYXBBcHBsaWNhdGlvbnMocmVzcG9uc2UpXG4gIH1cblxuICBhc3luYyBnZXRCeUNvbGxhYm9yYXRvcih1c2VySWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5Lkxpc3Qoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgJ2NvbGxhYm9yYXRvci51c2VyX2lkcy51c2VyX2lkJzogdXNlcklkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwQXBwbGljYXRpb25zKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgc2VhcmNoKHBhcmFtcywgc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5FbnRpdHlSZWdpc3RyeVNlYXJjaC5TZWFyY2hBcHBsaWNhdGlvbnModW5kZWZpbmVkLCB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICAuLi5NYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvciksXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwQXBwbGljYXRpb25zKHJlc3BvbnNlKVxuICB9XG5cbiAgLy8gVXBkYXRlLlxuXG4gIGFzeW5jIHVwZGF0ZUJ5SWQoXG4gICAgaWQsXG4gICAgcGF0Y2gsXG4gICAgbWFzayA9IE1hcnNoYWxlci5maWVsZE1hc2tGcm9tUGF0Y2goXG4gICAgICBwYXRjaCxcbiAgICAgIHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5LlVwZGF0ZUFsbG93ZWRGaWVsZE1hc2tQYXRocyxcbiAgICApLFxuICApIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5LlVwZGF0ZShcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnYXBwbGljYXRpb24uaWRzLmFwcGxpY2F0aW9uX2lkJzogaWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhcHBsaWNhdGlvbjogcGF0Y2gsXG4gICAgICAgIGZpZWxkX21hc2s6IE1hcnNoYWxlci5maWVsZE1hc2sobWFzayksXG4gICAgICB9LFxuICAgIClcbiAgICByZXR1cm4gTWFyc2hhbGVyLnVud3JhcEFwcGxpY2F0aW9uKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgcmVzdG9yZUJ5SWQoaWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5LlJlc3RvcmUoe1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgYXBwbGljYXRpb25faWQ6IGlkLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpXG4gIH1cblxuICAvLyBDcmVhdGlvbi5cblxuICBhc3luYyBjcmVhdGUob3duZXJJZCA9IHRoaXMuX2RlZmF1bHRVc2VySWQsIGFwcGxpY2F0aW9uLCBpc1VzZXJPd25lciA9IHRydWUpIHtcbiAgICBjb25zdCByb3V0ZVBhcmFtcyA9IGlzVXNlck93bmVyXG4gICAgICA/IHsgJ2NvbGxhYm9yYXRvci51c2VyX2lkcy51c2VyX2lkJzogb3duZXJJZCB9XG4gICAgICA6IHsgJ2NvbGxhYm9yYXRvci5vcmdhbml6YXRpb25faWRzLm9yZ2FuaXphdGlvbl9pZCc6IG93bmVySWQgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLkFwcGxpY2F0aW9uUmVnaXN0cnkuQ3JlYXRlKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtcyxcbiAgICAgIH0sXG4gICAgICB7IGFwcGxpY2F0aW9uIH0sXG4gICAgKVxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwQXBwbGljYXRpb24ocmVzcG9uc2UpXG4gIH1cblxuICAvLyBEZWxldGlvbi5cblxuICBhc3luYyBkZWxldGVCeUlkKGFwcGxpY2F0aW9uSWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5LkRlbGV0ZSh7XG4gICAgICByb3V0ZVBhcmFtczogeyBhcHBsaWNhdGlvbl9pZDogYXBwbGljYXRpb25JZCB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZSlcbiAgfVxuXG4gIGFzeW5jIHB1cmdlQnlJZChpZCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLkFwcGxpY2F0aW9uUmVnaXN0cnkuUHVyZ2Uoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgYXBwbGljYXRpb25faWQ6IGlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgLy8gRGV2RVVJIGlzc3VpbmcuXG5cbiAgYXN5bmMgaXNzdWVEZXZFVUkoaWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBsaWNhdGlvblJlZ2lzdHJ5Lklzc3VlRGV2RVVJKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IGFwcGxpY2F0aW9uX2lkOiBpZCB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZSlcbiAgfVxuXG4gIC8vIE1pc2NlbGxhbmVvdXMuXG5cbiAgYXN5bmMgZ2V0UmlnaHRzQnlJZChhcHBsaWNhdGlvbklkKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkFwcGxpY2F0aW9uQWNjZXNzLkxpc3RSaWdodHMoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgYXBwbGljYXRpb25faWQ6IGFwcGxpY2F0aW9uSWQgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci51bndyYXBSaWdodHMocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZ2V0TXF0dENvbm5lY3Rpb25JbmZvKGFwcGxpY2F0aW9uSWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5BcHBBcy5HZXRNUVRUQ29ubmVjdGlvbkluZm8oe1xuICAgICAgcm91dGVQYXJhbXM6IHsgYXBwbGljYXRpb25faWQ6IGFwcGxpY2F0aW9uSWQgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpXG4gIH1cblxuICAvLyBFdmVudHMgU3RyZWFtXG5cbiAgYXN5bmMgb3BlblN0cmVhbShpZGVudGlmaWVycywgdGFpbCwgYWZ0ZXIpIHtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgaWRlbnRpZmllcnM6IGlkZW50aWZpZXJzLm1hcChpZCA9PiAoe1xuICAgICAgICBhcHBsaWNhdGlvbl9pZHM6IHsgYXBwbGljYXRpb25faWQ6IGlkIH0sXG4gICAgICB9KSksXG4gICAgICB0YWlsLFxuICAgICAgYWZ0ZXIsXG4gICAgfVxuXG4gICAgLy8gRXZlbnQgc3RyZWFtcyBjYW4gY29tZSBmcm9tIG11bHRpcGxlIHN0YWNrIGNvbXBvbmVudHMuIEl0IGlzIG5lY2Vzc2FyeSB0b1xuICAgIC8vIGNoZWNrIGZvciBzdGFjayBjb21wb25lbnRzIG9uIGRpZmZlcmVudCBob3N0cyBhbmQgb3BlbiBkaXN0aW5jdCBzdHJlYW1cbiAgICAvLyBjb25uZWN0aW9ucyBmb3IgYW55IGRpc3RpbmN0IGhvc3QgaWYgbmVlZCBiZS5cbiAgICBjb25zdCBkaXN0aW5jdENvbXBvbmVudHMgPSB0aGlzLl9zdGFja0NvbmZpZy5nZXRDb21wb25lbnRzV2l0aERpc3RpbmN0QmFzZVVybHMoW1xuICAgICAgSVMsXG4gICAgICBKUyxcbiAgICAgIE5TLFxuICAgICAgQVMsXG4gICAgICBEVEMsXG4gICAgXSlcblxuICAgIGNvbnN0IHN0cmVhbXMgPSBkaXN0aW5jdENvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PlxuICAgICAgdGhpcy5fYXBpLkV2ZW50cy5TdHJlYW0oeyBjb21wb25lbnQgfSwgcGF5bG9hZCksXG4gICAgKVxuXG4gICAgLy8gQ29tYmluZSBhbGwgc3RyZWFtIHNvdXJjZXMgdG8gb25lIHN1YnNjcmlwdGlvbiBnZW5lcmF0b3IuXG4gICAgcmV0dXJuIGNvbWJpbmVTdHJlYW1zKHN0cmVhbXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb25zXG4iXX0=