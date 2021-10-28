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

var Collaborators = /*#__PURE__*/function () {
  function Collaborators(registry, _ref) {
    var parentRoutes = _ref.parentRoutes;
    (0, _classCallCheck2["default"])(this, Collaborators);
    this._api = registry;
    this._parentRoutes = parentRoutes;
  }

  (0, _createClass2["default"])(Collaborators, [{
    key: "_getById",
    value: function () {
      var _getById2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(entityId, collaboratorId, isUser) {
        var _routeParams;

        var entityIdRoute, collaboratorIdRoute, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entityIdRoute = this._parentRoutes.get;
                collaboratorIdRoute = isUser ? 'collaborator.user_ids.user_id' : 'collaborator.organization_ids.organization_id';
                _context.next = 4;
                return this._api.GetCollaborator({
                  routeParams: (_routeParams = {}, (0, _defineProperty2["default"])(_routeParams, entityIdRoute, entityId), (0, _defineProperty2["default"])(_routeParams, collaboratorIdRoute, collaboratorId), _routeParams)
                });

              case 4:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _getById(_x, _x2, _x3) {
        return _getById2.apply(this, arguments);
      }

      return _getById;
    }()
  }, {
    key: "getByUserId",
    value: function () {
      var _getByUserId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(entityId, userId) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._getById(entityId, userId, true));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getByUserId(_x4, _x5) {
        return _getByUserId.apply(this, arguments);
      }

      return getByUserId;
    }()
  }, {
    key: "getByOrganizationId",
    value: function () {
      var _getByOrganizationId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(entityId, organizationId) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._getById(entityId, organizationId, false));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getByOrganizationId(_x6, _x7) {
        return _getByOrganizationId.apply(this, arguments);
      }

      return getByOrganizationId;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(entityId, params) {
        var entityIdRoute, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                entityIdRoute = this._parentRoutes.list;
                _context4.next = 3;
                return this._api.ListCollaborators({
                  routeParams: (0, _defineProperty2["default"])({}, entityIdRoute, entityId)
                }, params);

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", _marshaler["default"].payloadListResponse('collaborators', result));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAll(_x8, _x9) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(entityId, data) {
        var entityIdRoute, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                entityIdRoute = this._parentRoutes.set;
                _context5.next = 3;
                return this._api.SetCollaborator({
                  routeParams: (0, _defineProperty2["default"])({}, entityIdRoute, entityId)
                }, {
                  collaborator: data
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

      function add(_x10, _x11) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(entityId, data) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.add(entityId, data);

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function update(_x12, _x13) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(entityId, data) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.add(entityId, _objectSpread(_objectSpread({}, data), {}, {
                  rights: []
                }));

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function remove(_x14, _x15) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);
  return Collaborators;
}();

var _default = Collaborators;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2NvbGxhYm9yYXRvcnMuanMiXSwibmFtZXMiOlsiQ29sbGFib3JhdG9ycyIsInJlZ2lzdHJ5IiwicGFyZW50Um91dGVzIiwiX2FwaSIsIl9wYXJlbnRSb3V0ZXMiLCJlbnRpdHlJZCIsImNvbGxhYm9yYXRvcklkIiwiaXNVc2VyIiwiZW50aXR5SWRSb3V0ZSIsImdldCIsImNvbGxhYm9yYXRvcklkUm91dGUiLCJHZXRDb2xsYWJvcmF0b3IiLCJyb3V0ZVBhcmFtcyIsInJlc3VsdCIsIk1hcnNoYWxlciIsInBheWxvYWRTaW5nbGVSZXNwb25zZSIsInVzZXJJZCIsIl9nZXRCeUlkIiwib3JnYW5pemF0aW9uSWQiLCJwYXJhbXMiLCJsaXN0IiwiTGlzdENvbGxhYm9yYXRvcnMiLCJwYXlsb2FkTGlzdFJlc3BvbnNlIiwiZGF0YSIsInNldCIsIlNldENvbGxhYm9yYXRvciIsImNvbGxhYm9yYXRvciIsImFkZCIsInJpZ2h0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7SUFFTUEsYTtBQUNKLHlCQUFZQyxRQUFaLFFBQXdDO0FBQUEsUUFBaEJDLFlBQWdCLFFBQWhCQSxZQUFnQjtBQUFBO0FBQ3RDLFNBQUtDLElBQUwsR0FBWUYsUUFBWjtBQUNBLFNBQUtHLGFBQUwsR0FBcUJGLFlBQXJCO0FBQ0Q7Ozs7O29HQUVELGlCQUFlRyxRQUFmLEVBQXlCQyxjQUF6QixFQUF5Q0MsTUFBekM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FDLGdCQUFBQSxhQURSLEdBQ3dCLEtBQUtKLGFBQUwsQ0FBbUJLLEdBRDNDO0FBRVFDLGdCQUFBQSxtQkFGUixHQUU4QkgsTUFBTSxHQUM5QiwrQkFEOEIsR0FFOUIsK0NBSk47QUFBQTtBQUFBLHVCQU11QixLQUFLSixJQUFMLENBQVVRLGVBQVYsQ0FBMEI7QUFDN0NDLGtCQUFBQSxXQUFXLHFFQUNSSixhQURRLEVBQ1FILFFBRFIsa0RBRVJLLG1CQUZRLEVBRWNKLGNBRmQ7QUFEa0MsaUJBQTFCLENBTnZCOztBQUFBO0FBTVFPLGdCQUFBQSxNQU5SO0FBQUEsaURBYVNDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FiVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozt1R0FnQkEsa0JBQWtCUixRQUFsQixFQUE0QlcsTUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtEQUNTLEtBQUtDLFFBQUwsQ0FBY1osUUFBZCxFQUF3QlcsTUFBeEIsRUFBZ0MsSUFBaEMsQ0FEVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OzsrR0FJQSxrQkFBMEJYLFFBQTFCLEVBQW9DYSxjQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0RBQ1MsS0FBS0QsUUFBTCxDQUFjWixRQUFkLEVBQXdCYSxjQUF4QixFQUF3QyxLQUF4QyxDQURUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O2tHQUlBLGtCQUFhYixRQUFiLEVBQXVCYyxNQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUVgsZ0JBQUFBLGFBRFIsR0FDd0IsS0FBS0osYUFBTCxDQUFtQmdCLElBRDNDO0FBQUE7QUFBQSx1QkFFdUIsS0FBS2pCLElBQUwsQ0FBVWtCLGlCQUFWLENBQ25CO0FBQ0VULGtCQUFBQSxXQUFXLHVDQUFLSixhQUFMLEVBQXFCSCxRQUFyQjtBQURiLGlCQURtQixFQUluQmMsTUFKbUIsQ0FGdkI7O0FBQUE7QUFFUU4sZ0JBQUFBLE1BRlI7QUFBQSxrREFTU0Msc0JBQVVRLG1CQUFWLENBQThCLGVBQTlCLEVBQStDVCxNQUEvQyxDQVRUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OytGQVlBLGtCQUFVUixRQUFWLEVBQW9Ca0IsSUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FmLGdCQUFBQSxhQURSLEdBQ3dCLEtBQUtKLGFBQUwsQ0FBbUJvQixHQUQzQztBQUFBO0FBQUEsdUJBRXVCLEtBQUtyQixJQUFMLENBQVVzQixlQUFWLENBQ25CO0FBQ0ViLGtCQUFBQSxXQUFXLHVDQUFLSixhQUFMLEVBQXFCSCxRQUFyQjtBQURiLGlCQURtQixFQUluQjtBQUNFcUIsa0JBQUFBLFlBQVksRUFBRUg7QUFEaEIsaUJBSm1CLENBRnZCOztBQUFBO0FBRVFWLGdCQUFBQSxNQUZSO0FBQUEsa0RBV1NDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FYVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztrR0FjQSxrQkFBYVIsUUFBYixFQUF1QmtCLElBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNlLEtBQUtJLEdBQUwsQ0FBU3RCLFFBQVQsRUFBbUJrQixJQUFuQixDQURmOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7a0dBSUEsa0JBQWFsQixRQUFiLEVBQXVCa0IsSUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ2UsS0FBS0ksR0FBTCxDQUFTdEIsUUFBVCxrQ0FBd0JrQixJQUF4QjtBQUE4Qkssa0JBQUFBLE1BQU0sRUFBRTtBQUF0QyxtQkFEZjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQUthNUIsYSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IE1hcnNoYWxlciBmcm9tICcuLi91dGlsL21hcnNoYWxlcidcblxuY2xhc3MgQ29sbGFib3JhdG9ycyB7XG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5LCB7IHBhcmVudFJvdXRlcyB9KSB7XG4gICAgdGhpcy5fYXBpID0gcmVnaXN0cnlcbiAgICB0aGlzLl9wYXJlbnRSb3V0ZXMgPSBwYXJlbnRSb3V0ZXNcbiAgfVxuXG4gIGFzeW5jIF9nZXRCeUlkKGVudGl0eUlkLCBjb2xsYWJvcmF0b3JJZCwgaXNVc2VyKSB7XG4gICAgY29uc3QgZW50aXR5SWRSb3V0ZSA9IHRoaXMuX3BhcmVudFJvdXRlcy5nZXRcbiAgICBjb25zdCBjb2xsYWJvcmF0b3JJZFJvdXRlID0gaXNVc2VyXG4gICAgICA/ICdjb2xsYWJvcmF0b3IudXNlcl9pZHMudXNlcl9pZCdcbiAgICAgIDogJ2NvbGxhYm9yYXRvci5vcmdhbml6YXRpb25faWRzLm9yZ2FuaXphdGlvbl9pZCdcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRDb2xsYWJvcmF0b3Ioe1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgW2VudGl0eUlkUm91dGVdOiBlbnRpdHlJZCxcbiAgICAgICAgW2NvbGxhYm9yYXRvcklkUm91dGVdOiBjb2xsYWJvcmF0b3JJZCxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGdldEJ5VXNlcklkKGVudGl0eUlkLCB1c2VySWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0QnlJZChlbnRpdHlJZCwgdXNlcklkLCB0cnVlKVxuICB9XG5cbiAgYXN5bmMgZ2V0QnlPcmdhbml6YXRpb25JZChlbnRpdHlJZCwgb3JnYW5pemF0aW9uSWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0QnlJZChlbnRpdHlJZCwgb3JnYW5pemF0aW9uSWQsIGZhbHNlKVxuICB9XG5cbiAgYXN5bmMgZ2V0QWxsKGVudGl0eUlkLCBwYXJhbXMpIHtcbiAgICBjb25zdCBlbnRpdHlJZFJvdXRlID0gdGhpcy5fcGFyZW50Um91dGVzLmxpc3RcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuTGlzdENvbGxhYm9yYXRvcnMoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7IFtlbnRpdHlJZFJvdXRlXTogZW50aXR5SWQgfSxcbiAgICAgIH0sXG4gICAgICBwYXJhbXMsXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkTGlzdFJlc3BvbnNlKCdjb2xsYWJvcmF0b3JzJywgcmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgYWRkKGVudGl0eUlkLCBkYXRhKSB7XG4gICAgY29uc3QgZW50aXR5SWRSb3V0ZSA9IHRoaXMuX3BhcmVudFJvdXRlcy5zZXRcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuU2V0Q29sbGFib3JhdG9yKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczogeyBbZW50aXR5SWRSb3V0ZV06IGVudGl0eUlkIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb2xsYWJvcmF0b3I6IGRhdGEsXG4gICAgICB9LFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShlbnRpdHlJZCwgZGF0YSkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZChlbnRpdHlJZCwgZGF0YSlcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZShlbnRpdHlJZCwgZGF0YSkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmFkZChlbnRpdHlJZCwgeyAuLi5kYXRhLCByaWdodHM6IFtdIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFib3JhdG9yc1xuIl19