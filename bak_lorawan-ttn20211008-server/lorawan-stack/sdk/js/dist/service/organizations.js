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

var _apiKeys = _interopRequireDefault(require("./api-keys"));

var _collaborators = _interopRequireDefault(require("./collaborators"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Organizations = /*#__PURE__*/function () {
  function Organizations(api) {
    (0, _classCallCheck2["default"])(this, Organizations);
    this._api = api;
    this.ApiKeys = new _apiKeys["default"](api.OrganizationAccess, {
      parentRoutes: {
        get: 'organization_ids.organization_id',
        list: 'organization_ids.organization_id',
        create: 'organization_ids.organization_id',
        update: 'organization_ids.organization_id'
      }
    });
    this.Collaborators = new _collaborators["default"](api.OrganizationAccess, {
      parentRoutes: {
        get: 'organization_ids.organization_id',
        list: 'organization_ids.organization_id',
        set: 'organization_ids.organization_id'
      }
    });
  } // Retrieval.


  (0, _createClass2["default"])(Organizations, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params, selector) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.OrganizationRegistry.List(undefined, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('organizations', response));

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
                return this._api.OrganizationRegistry.Get({
                  routeParams: {
                    'organization_ids.organization_id': id
                  }
                }, fieldMask);

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

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
                return this._api.EntityRegistrySearch.SearchOrganizations(undefined, _objectSpread(_objectSpread({}, params), _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                response = _context3.sent;
                return _context3.abrupt("return", _marshaler["default"].payloadListResponse('organizations', response));

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
    }() // Creation.

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, organization) {
        var response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._api.OrganizationRegistry.Create({
                  routeParams: {
                    'collaborator.user_ids.user_id': userId
                  }
                }, {
                  organization: organization
                });

              case 2:
                response = _context4.sent;
                return _context4.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function create(_x7, _x8) {
        return _create.apply(this, arguments);
      }

      return create;
    }() // Update.

  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, patch) {
        var mask,
            response,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                mask = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : _marshaler["default"].fieldMaskFromPatch(patch);
                _context5.next = 3;
                return this._api.OrganizationRegistry.Update({
                  routeParams: {
                    'organization.ids.organization_id': id
                  }
                }, {
                  organization: patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                response = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateById(_x9, _x10) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }, {
    key: "restoreById",
    value: function () {
      var _restoreById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
        var response;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._api.OrganizationRegistry.Restore({
                  routeParams: {
                    organization_id: id
                  }
                });

              case 2:
                response = _context6.sent;
                return _context6.abrupt("return", _marshaler["default"].payloadSingleResponse(response));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function restoreById(_x11) {
        return _restoreById.apply(this, arguments);
      }

      return restoreById;
    }() // Deletion.

  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(organizationId) {
        var response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._api.OrganizationRegistry.Delete({
                  routeParams: {
                    organization_id: organizationId
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

      function deleteById(_x12) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "purgeById",
    value: function () {
      var _purgeById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(organizationId) {
        var response;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._api.OrganizationRegistry.Purge({
                  routeParams: {
                    organization_id: organizationId
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

      function purgeById(_x13) {
        return _purgeById.apply(this, arguments);
      }

      return purgeById;
    }() // Miscellaneous.

  }, {
    key: "getRightsById",
    value: function () {
      var _getRightsById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(organizationId) {
        var result;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._api.OrganizationAccess.ListRights({
                  routeParams: {
                    organization_id: organizationId
                  }
                });

              case 2:
                result = _context9.sent;
                return _context9.abrupt("return", _marshaler["default"].unwrapRights(result));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getRightsById(_x14) {
        return _getRightsById.apply(this, arguments);
      }

      return getRightsById;
    }() // Events stream.

  }, {
    key: "openStream",
    value: function () {
      var _openStream = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(identifiers, tail, after) {
        var payload;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                payload = {
                  identifiers: identifiers.map(function (id) {
                    return {
                      organization_ids: {
                        organization_id: id
                      }
                    };
                  }),
                  tail: tail,
                  after: after
                };
                return _context10.abrupt("return", this._api.Events.Stream(undefined, payload));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function openStream(_x15, _x16, _x17) {
        return _openStream.apply(this, arguments);
      }

      return openStream;
    }()
  }]);
  return Organizations;
}();

var _default = Organizations;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL29yZ2FuaXphdGlvbnMuanMiXSwibmFtZXMiOlsiT3JnYW5pemF0aW9ucyIsImFwaSIsIl9hcGkiLCJBcGlLZXlzIiwiT3JnYW5pemF0aW9uQWNjZXNzIiwicGFyZW50Um91dGVzIiwiZ2V0IiwibGlzdCIsImNyZWF0ZSIsInVwZGF0ZSIsIkNvbGxhYm9yYXRvcnMiLCJzZXQiLCJwYXJhbXMiLCJzZWxlY3RvciIsIk9yZ2FuaXphdGlvblJlZ2lzdHJ5IiwiTGlzdCIsInVuZGVmaW5lZCIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJyZXNwb25zZSIsInBheWxvYWRMaXN0UmVzcG9uc2UiLCJpZCIsImZpZWxkTWFzayIsIkdldCIsInJvdXRlUGFyYW1zIiwicGF5bG9hZFNpbmdsZVJlc3BvbnNlIiwiRW50aXR5UmVnaXN0cnlTZWFyY2giLCJTZWFyY2hPcmdhbml6YXRpb25zIiwidXNlcklkIiwib3JnYW5pemF0aW9uIiwiQ3JlYXRlIiwicGF0Y2giLCJtYXNrIiwiZmllbGRNYXNrRnJvbVBhdGNoIiwiVXBkYXRlIiwiZmllbGRfbWFzayIsIlJlc3RvcmUiLCJvcmdhbml6YXRpb25faWQiLCJvcmdhbml6YXRpb25JZCIsIkRlbGV0ZSIsIlB1cmdlIiwiTGlzdFJpZ2h0cyIsInJlc3VsdCIsInVud3JhcFJpZ2h0cyIsImlkZW50aWZpZXJzIiwidGFpbCIsImFmdGVyIiwicGF5bG9hZCIsIm1hcCIsIm9yZ2FuaXphdGlvbl9pZHMiLCJFdmVudHMiLCJTdHJlYW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7QUFFQTs7QUFDQTs7Ozs7O0lBRU1BLGE7QUFDSix5QkFBWUMsR0FBWixFQUFpQjtBQUFBO0FBQ2YsU0FBS0MsSUFBTCxHQUFZRCxHQUFaO0FBRUEsU0FBS0UsT0FBTCxHQUFlLElBQUlBLG1CQUFKLENBQVlGLEdBQUcsQ0FBQ0csa0JBQWhCLEVBQW9DO0FBQ2pEQyxNQUFBQSxZ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QUpBLElBSmM7QUFLZEMsa0JBQUFBLEtBQUssRUFBTEE7QUFMYyxpQkFEbEI7QUFBQSxtREFTUyxLQUFLNUMsSUFBTCxDQUFVZ0QsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0JuQyxTQUF4QixFQUFtQytCLE9BQW5DLENBVFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBYWEvQyxhIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMjEgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5pbXBvcnQgQXBpS2V5cyBmcm9tICcuL2FwaS1rZXlzJ1xuaW1wb3J0IENvbGxhYm9yYXRvcnMgZnJvbSAnLi9jb2xsYWJvcmF0b3JzJ1xuXG5jbGFzcyBPcmdhbml6YXRpb25zIHtcbiAgY29uc3RydWN0b3IoYXBpKSB7XG4gICAgdGhpcy5fYXBpID0gYXBpXG5cbiAgICB0aGlzLkFwaUtleXMgPSBuZXcgQXBpS2V5cyhhcGkuT3JnYW5pemF0aW9uQWNjZXNzLCB7XG4gICAgICBwYXJlbnRSb3V0ZXM6IHtcbiAgICAgICAgZ2V0OiAnb3JnYW5pemF0aW9uX2lkcy5vcmdhbml6YXRpb25faWQnLFxuICAgICAgICBsaXN0OiAnb3JnYW5pemF0aW9uX2lkcy5vcmdhbml6YXRpb25faWQnLFxuICAgICAgICBjcmVhdGU6ICdvcmdhbml6YXRpb25faWRzLm9yZ2FuaXphdGlvbl9pZCcsXG4gICAgICAgIHVwZGF0ZTogJ29yZ2FuaXphdGlvbl9pZHMub3JnYW5pemF0aW9uX2lkJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgICB0aGlzLkNvbGxhYm9yYXRvcnMgPSBuZXcgQ29sbGFib3JhdG9ycyhhcGkuT3JnYW5pemF0aW9uQWNjZXNzLCB7XG4gICAgICBwYXJlbnRSb3V0ZXM6IHtcbiAgICAgICAgZ2V0OiAnb3JnYW5pemF0aW9uX2lkcy5vcmdhbml6YXRpb25faWQnLFxuICAgICAgICBsaXN0OiAnb3JnYW5pemF0aW9uX2lkcy5vcmdhbml6YXRpb25faWQnLFxuICAgICAgICBzZXQ6ICdvcmdhbml6YXRpb25faWRzLm9yZ2FuaXphdGlvbl9pZCcsXG4gICAgICB9LFxuICAgIH0pXG4gIH1cblxuICAvLyBSZXRyaWV2YWwuXG5cbiAgYXN5bmMgZ2V0QWxsKHBhcmFtcywgc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Pcmdhbml6YXRpb25SZWdpc3RyeS5MaXN0KHVuZGVmaW5lZCwge1xuICAgICAgLi4ucGFyYW1zLFxuICAgICAgLi4uTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpLFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ29yZ2FuaXphdGlvbnMnLCByZXNwb25zZSlcbiAgfVxuXG4gIGFzeW5jIGdldEJ5SWQoaWQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZmllbGRNYXNrID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuT3JnYW5pemF0aW9uUmVnaXN0cnkuR2V0KFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczogeyAnb3JnYW5pemF0aW9uX2lkcy5vcmdhbml6YXRpb25faWQnOiBpZCB9LFxuICAgICAgfSxcbiAgICAgIGZpZWxkTWFzayxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZSlcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaChwYXJhbXMsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuRW50aXR5UmVnaXN0cnlTZWFyY2guU2VhcmNoT3JnYW5pemF0aW9ucyh1bmRlZmluZWQsIHtcbiAgICAgIC4uLnBhcmFtcyxcbiAgICAgIC4uLk1hcnNoYWxlci5zZWxlY3RvclRvRmllbGRNYXNrKHNlbGVjdG9yKSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCdvcmdhbml6YXRpb25zJywgcmVzcG9uc2UpXG4gIH1cblxuICAvLyBDcmVhdGlvbi5cblxuICBhc3luYyBjcmVhdGUodXNlcklkLCBvcmdhbml6YXRpb24pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Pcmdhbml6YXRpb25SZWdpc3RyeS5DcmVhdGUoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7ICdjb2xsYWJvcmF0b3IudXNlcl9pZHMudXNlcl9pZCc6IHVzZXJJZCB9LFxuICAgICAgfSxcbiAgICAgIHsgb3JnYW5pemF0aW9uIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpXG4gIH1cblxuICAvLyBVcGRhdGUuXG5cbiAgYXN5bmMgdXBkYXRlQnlJZChpZCwgcGF0Y2gsIG1hc2sgPSBNYXJzaGFsZXIuZmllbGRNYXNrRnJvbVBhdGNoKHBhdGNoKSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLk9yZ2FuaXphdGlvblJlZ2lzdHJ5LlVwZGF0ZShcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnb3JnYW5pemF0aW9uLmlkcy5vcmdhbml6YXRpb25faWQnOiBpZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG9yZ2FuaXphdGlvbjogcGF0Y2gsXG4gICAgICAgIGZpZWxkX21hc2s6IE1hcnNoYWxlci5maWVsZE1hc2sobWFzayksXG4gICAgICB9LFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgcmVzdG9yZUJ5SWQoaWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Pcmdhbml6YXRpb25SZWdpc3RyeS5SZXN0b3JlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgIG9yZ2FuaXphdGlvbl9pZDogaWQsXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZSlcbiAgfVxuXG4gIC8vIERlbGV0aW9uLlxuXG4gIGFzeW5jIGRlbGV0ZUJ5SWQob3JnYW5pemF0aW9uSWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Pcmdhbml6YXRpb25SZWdpc3RyeS5EZWxldGUoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgb3JnYW5pemF0aW9uX2lkOiBvcmdhbml6YXRpb25JZCB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZSlcbiAgfVxuXG4gIGFzeW5jIHB1cmdlQnlJZChvcmdhbml6YXRpb25JZCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLk9yZ2FuaXphdGlvblJlZ2lzdHJ5LlB1cmdlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IG9yZ2FuaXphdGlvbl9pZDogb3JnYW5pemF0aW9uSWQgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpXG4gIH1cblxuICAvLyBNaXNjZWxsYW5lb3VzLlxuXG4gIGFzeW5jIGdldFJpZ2h0c0J5SWQob3JnYW5pemF0aW9uSWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuT3JnYW5pemF0aW9uQWNjZXNzLkxpc3RSaWdodHMoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgb3JnYW5pemF0aW9uX2lkOiBvcmdhbml6YXRpb25JZCB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnVud3JhcFJpZ2h0cyhyZXN1bHQpXG4gIH1cblxuICAvLyBFdmVudHMgc3RyZWFtLlxuXG4gIGFzeW5jIG9wZW5TdHJlYW0oaWRlbnRpZmllcnMsIHRhaWwsIGFmdGVyKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGlkZW50aWZpZXJzOiBpZGVudGlmaWVycy5tYXAoaWQgPT4gKHtcbiAgICAgICAgb3JnYW5pemF0aW9uX2lkczogeyBvcmdhbml6YXRpb25faWQ6IGlkIH0sXG4gICAgICB9KSksXG4gICAgICB0YWlsLFxuICAgICAgYWZ0ZXIsXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2FwaS5FdmVudHMuU3RyZWFtKHVuZGVmaW5lZCwgcGF5bG9hZClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPcmdhbml6YXRpb25zXG4iXX0=