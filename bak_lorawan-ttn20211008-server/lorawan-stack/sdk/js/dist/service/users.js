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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Users = /*#__PURE__*/function () {
  function Users(registry) {
    (0, _classCallCheck2["default"])(this, Users);
    this._api = registry;
    this.ApiKeys = new _apiKeys["default"](registry.UserAccess, {
      parentRoutes: {
        get: 'user_ids.user_id',
        list: 'user_ids.user_id',
        create: 'user_ids.user_id',
        update: 'user_ids.user_id'
      }
    });
  }

  (0, _createClass2["default"])(Users, [{
    key: "_addState",
    value: function _addState(fieldMask, user) {
      // Ensure to set STATE_REQUESTED if needed, which gets stripped as null
      // value from the backend response.
      if (fieldMask && fieldMask.field_mask.paths.includes('state') && !('state' in user)) {
        user.state = 'STATE_REQUESTED';
      }

      return user;
    }
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params, selector) {
        var _this = this;

        var fieldMask, response, users;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context.next = 3;
                return this._api.UserRegistry.List(undefined, _objectSpread(_objectSpread({}, params), fieldMask));

              case 3:
                response = _context.sent;
                users = _marshaler["default"].payloadListResponse('users', response);
                users.users.map(function (user) {
                  return _this._addState(fieldMask, user);
                });
                return _context.abrupt("return", users);

              case 7:
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
    key: "search",
    value: function () {
      var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params, selector) {
        var _this2 = this;

        var fieldMask, response, users;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context2.next = 3;
                return this._api.EntityRegistrySearch.SearchUsers(undefined, _objectSpread(_objectSpread({}, params), fieldMask));

              case 3:
                response = _context2.sent;
                users = _marshaler["default"].payloadListResponse('users', response);
                users.users.map(function (user) {
                  return _this2._addState(fieldMask, user);
                });
                return _context2.abrupt("return", users);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function search(_x3, _x4) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, selector) {
        var fieldMask, response, user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                _context3.next = 3;
                return this._api.UserRegistry.Get({
                  routeParams: {
                    'user_ids.user_id': id
                  }
                }, fieldMask);

              case 3:
                response = _context3.sent;
                user = this._addState(fieldMask, _marshaler["default"].payloadSingleResponse(response));
                return _context3.abrupt("return", user);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._api.UserRegistry.Delete({
                  routeParams: {
                    user_id: id
                  }
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

      function deleteById(_x7) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "purgeById",
    value: function () {
      var _purgeById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        var response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.UserRegistry.Purge({
                  routeParams: {
                    user_id: id
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

      function purgeById(_x8) {
        return _purgeById.apply(this, arguments);
      }

      return purgeById;
    }()
  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, patch) {
        var mask,
            response,
            result,
            user,
            _result,
            _args6 = arguments;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                mask = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : _marshaler["default"].fieldMaskFromPatch(patch);
                _context6.next = 3;
                return this._api.UserRegistry.Update({
                  routeParams: {
                    'user.ids.user_id': id
                  }
                }, {
                  user: patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                response = _context6.sent;
                result = _marshaler["default"].unwrapUser(response); // Get new profile picture value if a new picture was uploaded, deleted, or
                // the primary email address was changed (in case of Gravar usage).

                if (!(mask.includes('profile_picture') || mask.includes('primary_email_address'))) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 8;
                return this.getById(id, ['profile_picture']);

              case 8:
                user = _context6.sent;
                _result = _marshaler["default"].unwrapUser(response);
                _result.profile_picture = user.profile_picture;

              case 11:
                return _context6.abrupt("return", result);

              case 12:
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
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(user, invitationToken) {
        var response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._api.UserRegistry.Create(undefined, {
                  user: user,
                  invitation_token: invitationToken
                });

              case 2:
                response = _context7.sent;
                return _context7.abrupt("return", _marshaler["default"].unwrapUser(response));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function create(_x11, _x12) {
        return _create.apply(this, arguments);
      }

      return create;
    }() // Miscellaneous.

  }, {
    key: "getRightsById",
    value: function () {
      var _getRightsById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(userId) {
        var result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._api.UserAccess.ListRights({
                  routeParams: {
                    user_id: userId
                  }
                });

              case 2:
                result = _context8.sent;
                return _context8.abrupt("return", _marshaler["default"].unwrapRights(result));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getRightsById(_x13) {
        return _getRightsById.apply(this, arguments);
      }

      return getRightsById;
    }()
  }, {
    key: "updatePasswordById",
    value: function updatePasswordById(id, payload) {
      return this._api.UserRegistry.UpdatePassword({
        routeParams: {
          'user_ids.user_id': id
        }
      }, {
        "new": payload["new"],
        old: payload.old,
        revoke_all_access: payload.revoke_all_access
      });
    }
  }, {
    key: "createTemporaryPassword",
    value: function createTemporaryPassword(id) {
      return this._api.UserRegistry.CreateTemporaryPassword({
        routeParams: {
          'user_ids.user_id': id
        }
      });
    }
  }]);
  return Users;
}();

var _default = Users;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3VzZXJzLmpzIl0sIm5hbWVzIjpbIlVzZXJzIiwicmVnaXN0cnkiLCJfYXBpIiwiQXBpS2V5cyIsIlVzZXJBY2Nlc3MiLCJwYXJlbnRSb3V0ZXMiLCJnZXQiLCJsaXN0IiwiY3JlYXRlIiwidXBkYXRlIiwiZmllbGRNYXNrIiwidXNlciIsImZpZWxkX21hc2siLCJwYXRocyIsImluY2x1ZGVzIiwic3RhdGUiLCJwYXJhbXMiLCJzZWxlY3RvciIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJVc2VyUmVnaXN0cnkiLCJMaXN0IiwidW5kZWZpbmVkIiwicmVzcG9uc2UiLCJ1c2VycyIsInBheWxvYWRMaXN0UmVzcG9uc2UiLCJtYXAiLCJfYWRkU3RhdGUiLCJFbnRpdHlSZWdpc3RyeVNlYXJjaCIsIlNlYXJjaFVzZXJzIiwiaWQiLCJHZXQiLCJyb3V0ZVBhcmFtcyIsInBheWxvYWRTaW5nbGVSZXNwb25zZSIsIkRlbGV0ZSIsInVzZXJfaWQiLCJQdXJnZSIsInBhdGNoIiwibWFzayIsImZpZWxkTWFza0Zyb21QYXRjaCIsIlVwZGF0ZSIsInJlc3VsdCIsInVud3JhcFVzZXIiLCJnZXRCeUlkIiwicHJvZmlsZV9waWN0dXJlIiwiaW52aXRhdGlvblRva2VuIiwiQ3JlYXRlIiwiaW52aXRhdGlvbl90b2tlbiIsInVzZXJJZCIsIkxpc3RSaWdodHMiLCJ1bndyYXBSaWdodHMiLCJwYXlsb2FkIiwiVXBkYXRlUGFzc3dvcmQiLCJvbGQiLCJyZXZva2VfYWxsX2FjY2VzcyIsIkNyZWF0ZVRlbXBvcmFyeVBhc3N3b3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7O0FBRUE7Ozs7OztJQUVNQSxLO0FBQ0osaUJBQVlDLFFBQVosRUFBc0I7QUFBQTtBQUNwQixTQUFLQyxJQUFMLEdBQVlELFFBQVo7QUFFQSxTQUFLRSxPQUFMLEdBQWUsSUFBSUEsbUJBQUosQ0FBWUYsUUFBUSxDQUFDRyxVQUFy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UUE7Ozs7O3lHQUVBLGtCQUFvQnlCLE1BQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUs5QyxJQUFMLENBQVVFLFVBQVYsQ0FBcUI2QyxVQUFyQixDQUFnQztBQUNuRGpCLGtCQUFBQSxXQUFXLEVBQUU7QUFBRUcsb0JBQUFBLE9BQU8sRUFBRWE7QUFBWDtBQURzQyxpQkFBaEMsQ0FEdkI7O0FBQUE7QUFDUVAsZ0JBQUFBLE1BRFI7QUFBQSxrREFLU3ZCLHNCQUFVZ0MsWUFBVixDQUF1QlQsTUFBdkIsQ0FMVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O1dBUUEsNEJBQW1CWCxFQUFuQixFQUF1QnFCLE9BQXZCLEVBQWdDO0FBQzlCLGFBQU8sS0FBS2pELElBQUwsQ0FBVWtCLFlBQVYsQ0FBdUJnQyxjQUF2QixDQUNMO0FBQ0VwQixRQUFBQSxXQUFXLEVBQUU7QUFDWCw4QkFBb0JGO0FBRFQ7QUFEZixPQURLLEVBTUw7QUFDRSxlQUFLcUIsT0FBTyxPQURkO0FBRUVFLFFBQUFBLEdBQUcsRUFBRUYsT0FBTyxDQUFDRSxHQUZmO0FBR0VDLFFBQUFBLGlCQUFpQixFQUFFSCxPQUFPLENBQUNHO0FBSDdCLE9BTkssQ0FBUDtBQVlEOzs7V0FFRCxpQ0FBd0J4QixFQUF4QixFQUE0QjtBQUMxQixhQUFPLEtBQUs1QixJQUFMLENBQVVrQixZQUFWLENBQXVCbUMsdUJBQXZCLENBQStDO0FBQ3BEdkIsUUFBQUEsV0FBVyxFQUFFO0FBQ1gsOEJBQW9CRjtBQURUO0FBRHVDLE9BQS9DLENBQVA7QUFLRDs7Ozs7ZUFHWTlCLEsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5cbmltcG9ydCBBcGlLZXlzIGZyb20gJy4vYXBpLWtleXMnXG5cbmNsYXNzIFVzZXJzIHtcbiAgY29uc3RydWN0b3IocmVnaXN0cnkpIHtcbiAgICB0aGlzLl9hcGkgPSByZWdpc3RyeVxuXG4gICAgdGhpcy5BcGlLZXlzID0gbmV3IEFwaUtleXMocmVnaXN0cnkuVXNlckFjY2Vzcywge1xuICAgICAgcGFyZW50Um91dGVzOiB7XG4gICAgICAgIGdldDogJ3VzZXJfaWRzLnVzZXJfaWQnLFxuICAgICAgICBsaXN0OiAndXNlcl9pZHMudXNlcl9pZCcsXG4gICAgICAgIGNyZWF0ZTogJ3VzZXJfaWRzLnVzZXJfaWQnLFxuICAgICAgICB1cGRhdGU6ICd1c2VyX2lkcy51c2VyX2lkJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIF9hZGRTdGF0ZShmaWVsZE1hc2ssIHVzZXIpIHtcbiAgICAvLyBFbnN1cmUgdG8gc2V0IFNUQVRFX1JFUVVFU1RFRCBpZiBuZWVkZWQsIHdoaWNoIGdldHMgc3RyaXBwZWQgYXMgbnVsbFxuICAgIC8vIHZhbHVlIGZyb20gdGhlIGJhY2tlbmQgcmVzcG9uc2UuXG4gICAgaWYgKGZpZWxkTWFzayAmJiBmaWVsZE1hc2suZmllbGRfbWFzay5wYXRocy5pbmNsdWRlcygnc3RhdGUnKSAmJiAhKCdzdGF0ZScgaW4gdXNlcikpIHtcbiAgICAgIHVzZXIuc3RhdGUgPSAnU1RBVEVfUkVRVUVTVEVEJ1xuICAgIH1cblxuICAgIHJldHVybiB1c2VyXG4gIH1cblxuICBhc3luYyBnZXRBbGwocGFyYW1zLCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IGZpZWxkTWFzayA9IE1hcnNoYWxlci5zZWxlY3RvclRvRmllbGRNYXNrKHNlbGVjdG9yKVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLlVzZXJSZWdpc3RyeS5MaXN0KHVuZGVmaW5lZCwge1xuICAgICAgLi4ucGFyYW1zLFxuICAgICAgLi4uZmllbGRNYXNrLFxuICAgIH0pXG5cbiAgICBjb25zdCB1c2VycyA9IE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCd1c2VycycsIHJlc3BvbnNlKVxuICAgIHVzZXJzLnVzZXJzLm1hcCh1c2VyID0+IHRoaXMuX2FkZFN0YXRlKGZpZWxkTWFzaywgdXNlcikpXG5cbiAgICByZXR1cm4gdXNlcnNcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaChwYXJhbXMsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZmllbGRNYXNrID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuRW50aXR5UmVnaXN0cnlTZWFyY2guU2VhcmNoVXNlcnModW5kZWZpbmVkLCB7XG4gICAgICAuLi5wYXJhbXMsXG4gICAgICAuLi5maWVsZE1hc2ssXG4gICAgfSlcblxuICAgIGNvbnN0IHVzZXJzID0gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ3VzZXJzJywgcmVzcG9uc2UpXG4gICAgdXNlcnMudXNlcnMubWFwKHVzZXIgPT4gdGhpcy5fYWRkU3RhdGUoZmllbGRNYXNrLCB1c2VyKSlcblxuICAgIHJldHVybiB1c2Vyc1xuICB9XG5cbiAgYXN5bmMgZ2V0QnlJZChpZCwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBmaWVsZE1hc2sgPSBNYXJzaGFsZXIuc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3RvcilcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Vc2VyUmVnaXN0cnkuR2V0KFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczogeyAndXNlcl9pZHMudXNlcl9pZCc6IGlkIH0sXG4gICAgICB9LFxuICAgICAgZmllbGRNYXNrLFxuICAgIClcblxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLl9hZGRTdGF0ZShmaWVsZE1hc2ssIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzcG9uc2UpKVxuXG4gICAgcmV0dXJuIHVzZXJcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUJ5SWQoaWQpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Vc2VyUmVnaXN0cnkuRGVsZXRlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IHVzZXJfaWQ6IGlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgcHVyZ2VCeUlkKGlkKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9hcGkuVXNlclJlZ2lzdHJ5LlB1cmdlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IHVzZXJfaWQ6IGlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3BvbnNlKVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlQnlJZChpZCwgcGF0Y2gsIG1hc2sgPSBNYXJzaGFsZXIuZmllbGRNYXNrRnJvbVBhdGNoKHBhdGNoKSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXBpLlVzZXJSZWdpc3RyeS5VcGRhdGUoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ3VzZXIuaWRzLnVzZXJfaWQnOiBpZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHVzZXI6IHBhdGNoLFxuICAgICAgICBmaWVsZF9tYXNrOiBNYXJzaGFsZXIuZmllbGRNYXNrKG1hc2spLFxuICAgICAgfSxcbiAgICApXG5cbiAgICBjb25zdCByZXN1bHQgPSBNYXJzaGFsZXIudW53cmFwVXNlcihyZXNwb25zZSlcblxuICAgIC8vIEdldCBuZXcgcHJvZmlsZSBwaWN0dXJlIHZhbHVlIGlmIGEgbmV3IHBpY3R1cmUgd2FzIHVwbG9hZGVkLCBkZWxldGVkLCBvclxuICAgIC8vIHRoZSBwcmltYXJ5IGVtYWlsIGFkZHJlc3Mgd2FzIGNoYW5nZWQgKGluIGNhc2Ugb2YgR3JhdmFyIHVzYWdlKS5cbiAgICBpZiAobWFzay5pbmNsdWRlcygncHJvZmlsZV9waWN0dXJlJykgfHwgbWFzay5pbmNsdWRlcygncHJpbWFyeV9lbWFpbF9hZGRyZXNzJykpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmdldEJ5SWQoaWQsIFsncHJvZmlsZV9waWN0dXJlJ10pXG4gICAgICBjb25zdCByZXN1bHQgPSBNYXJzaGFsZXIudW53cmFwVXNlcihyZXNwb25zZSlcbiAgICAgIHJlc3VsdC5wcm9maWxlX3BpY3R1cmUgPSB1c2VyLnByb2ZpbGVfcGljdHVyZVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZSh1c2VyLCBpbnZpdGF0aW9uVG9rZW4pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2FwaS5Vc2VyUmVnaXN0cnkuQ3JlYXRlKHVuZGVmaW5lZCwge1xuICAgICAgdXNlcixcbiAgICAgIGludml0YXRpb25fdG9rZW46IGludml0YXRpb25Ub2tlbixcbiAgICB9KVxuICAgIHJldHVybiBNYXJzaGFsZXIudW53cmFwVXNlcihyZXNwb25zZSlcbiAgfVxuXG4gIC8vIE1pc2NlbGxhbmVvdXMuXG5cbiAgYXN5bmMgZ2V0UmlnaHRzQnlJZCh1c2VySWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuVXNlckFjY2Vzcy5MaXN0UmlnaHRzKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7IHVzZXJfaWQ6IHVzZXJJZCB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnVud3JhcFJpZ2h0cyhyZXN1bHQpXG4gIH1cblxuICB1cGRhdGVQYXNzd29yZEJ5SWQoaWQsIHBheWxvYWQpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBpLlVzZXJSZWdpc3RyeS5VcGRhdGVQYXNzd29yZChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAndXNlcl9pZHMudXNlcl9pZCc6IGlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmV3OiBwYXlsb2FkLm5ldyxcbiAgICAgICAgb2xkOiBwYXlsb2FkLm9sZCxcbiAgICAgICAgcmV2b2tlX2FsbF9hY2Nlc3M6IHBheWxvYWQucmV2b2tlX2FsbF9hY2Nlc3MsXG4gICAgICB9LFxuICAgIClcbiAgfVxuXG4gIGNyZWF0ZVRlbXBvcmFyeVBhc3N3b3JkKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwaS5Vc2VyUmVnaXN0cnkuQ3JlYXRlVGVtcG9yYXJ5UGFzc3dvcmQoe1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgJ3VzZXJfaWRzLnVzZXJfaWQnOiBpZCxcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVc2Vyc1xuIl19