"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _marshaler = _interopRequireDefault(require("../util/marshaler"));

// Copyright © 2020 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var ApplicationPackages = /*#__PURE__*/function () {
  function ApplicationPackages(registry) {
    (0, _classCallCheck2["default"])(this, ApplicationPackages);
    this._api = registry;
  }

  (0, _createClass2["default"])(ApplicationPackages, [{
    key: "getDefaultAssociation",
    value: function () {
      var _getDefaultAssociation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId, fPort, selector) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GetDefaultAssociation({
                  routeParams: {
                    'ids.application_ids.application_id': appId,
                    'ids.f_port': fPort
                  }
                }, _marshaler["default"].selectorToFieldMask(selector));

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

      function getDefaultAssociation(_x, _x2, _x3) {
        return _getDefaultAssociation.apply(this, arguments);
      }

      return getDefaultAssociation;
    }()
  }, {
    key: "setDefaultAssociation",
    value: function () {
      var _setDefaultAssociation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, fPort, patch) {
        var mask,
            result,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mask = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : _marshaler["default"].fieldMaskFromPatch(patch, this._api.SetDefaultAssociationAllowedFieldMaskPaths);
                _context2.next = 3;
                return this._api.SetDefaultAssociation({
                  routeParams: {
                    'default.ids.application_ids.application_id': appId,
                    'default.ids.f_port': fPort
                  }
                }, {
                  "default": patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setDefaultAssociation(_x4, _x5, _x6) {
        return _setDefaultAssociation.apply(this, arguments);
      }

      return setDefaultAssociation;
    }()
  }, {
    key: "deleteDefaultAssociation",
    value: function () {
      var _deleteDefaultAssociation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId, fPort) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.DeleteDefaultAssociation({
                  routeParams: {
                    'application_ids.application_id': appId,
                    f_port: fPort
                  }
                });

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

      function deleteDefaultAssociation(_x7, _x8) {
        return _deleteDefaultAssociation.apply(this, arguments);
      }

      return deleteDefaultAssociation;
    }()
  }]);
  return ApplicationPackages;
}();

var _default = ApplicationPackages;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2FwcGxpY2F0aW9uLXBhY2thZ2VzLmpzIl0sIm5hbWVzIjpbIkFwcGxpY2F0aW9uUGFja2FnZXMiLCJyZWdpc3RyeSIsIl9hcGkiLCJhcHBJZCIsImZQb3J0Iiwic2VsZWN0b3IiLCJHZXREZWZhdWx0QXNzb2NpYXRpb24iLCJyb3V0ZVBhcmFtcyIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJyZXN1bHQiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJwYXRjaCIsIm1hc2siLCJmaWVsZE1hc2tGcm9tUGF0Y2giLCJTZXREZWZhdWx0QXNzb2NpYXRpb25BbGxvd2VkRmllbGRNYXNrUGF0aHMiLCJTZXREZWZhdWx0QXNzb2NpYXRpb24iLCJmaWVsZF9tYXNrIiwiZmllbGRNYXNrIiwiRGVsZXRlRGVmYXVsdEFzc29jaWF0aW9uIiwiZl9wb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBSU1BLG1CO0FBQ0osK0JBQVlDLFFBQVosRUFBc0I7QUFBQTtBQUNwQixTQUFLQyxJQUFMLEdBQVlELFFBQVo7QUFDRDs7Ozs7aUhBRUQsaUJBQTRCRSxLQUE1QixFQUFtQ0MsS0FBbkMsRUFBMENDLFFBQTFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtILElBQUwsQ0FBVUkscUJBQVYsQ0FDbkI7QUFDRUMsa0JBQUFBLFdBQVcsRUFBRTtBQUNYLDBEQUFzQ0osS0FEM0I7QUFFWCxrQ0FBY0M7QUFGSDtBQURmLGlCQURtQixFQU9uQkksc0JBQVVDLG1CQUFWLENBQThCSixRQUE5QixDQVBtQixDQUR2Qjs7QUFBQTtBQUNRSyxnQkFBQUEsTUFEUjtBQUFBLGlEQVdTRixzQkFBVUcscUJBQVYsQ0FBZ0NELE1BQWhDLENBWFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7aUhBY0Esa0JBQ0VQLEtBREYsRUFFRUMsS0FGRixFQUdFUSxLQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJRUMsZ0JBQUFBLElBSkYsOERBSVNMLHNCQUFVTSxrQkFBVixDQUNMRixLQURLLEVBRUwsS0FBS1YsSUFBTCxDQUFVYSwwQ0FGTCxDQUpUO0FBQUE7QUFBQSx1QkFTdUIsS0FBS2IsSUFBTCxDQUFVYyxxQkFBVixDQUNuQjtBQUNFVCxrQkFBQUEsV0FBVyxFQUFFO0FBQ1gsa0VBQThDSixLQURuQztBQUVYLDBDQUFzQkM7QUFGWDtBQURmLGlCQURtQixFQU9uQjtBQUNFLDZCQUFTUSxLQURYO0FBRUVLLGtCQUFBQSxVQUFVLEVBQUVULHNCQUFVVSxTQUFWLENBQW9CTCxJQUFwQjtBQUZkLGlCQVBtQixDQVR2Qjs7QUFBQTtBQVNRSCxnQkFBQUEsTUFUUjtBQUFBLGtEQXNCU0Ysc0JBQVVHLHFCQUFWLENBQWdDRCxNQUFoQyxDQXRCVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztvSEF5QkEsa0JBQStCUCxLQUEvQixFQUFzQ0MsS0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0YsSUFBTCxDQUFVaUIsd0JBQVYsQ0FBbUM7QUFDdERaLGtCQUFBQSxXQUFXLEVBQUU7QUFDWCxzREFBa0NKLEtBRHZCO0FBRVhpQixvQkFBQUEsTUFBTSxFQUFFaEI7QUFGRztBQUR5QyxpQkFBbkMsQ0FEdkI7O0FBQUE7QUFDUU0sZ0JBQUFBLE1BRFI7QUFBQSxrREFRU0Ysc0JBQVVHLHFCQUFWLENBQWdDRCxNQUFoQyxDQVJUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQVlhVixtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDIwIFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IE1hcnNoYWxlciBmcm9tICcuLi91dGlsL21hcnNoYWxlcidcblxuY2xhc3MgQXBwbGljYXRpb25QYWNrYWdlcyB7XG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5fYXBpID0gcmVnaXN0cnlcbiAgfVxuXG4gIGFzeW5jIGdldERlZmF1bHRBc3NvY2lhdGlvbihhcHBJZCwgZlBvcnQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdldERlZmF1bHRBc3NvY2lhdGlvbihcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnaWRzLmFwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkLFxuICAgICAgICAgICdpZHMuZl9wb3J0JzogZlBvcnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpLFxuICAgIClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIHNldERlZmF1bHRBc3NvY2lhdGlvbihcbiAgICBhcHBJZCxcbiAgICBmUG9ydCxcbiAgICBwYXRjaCxcbiAgICBtYXNrID0gTWFyc2hhbGVyLmZpZWxkTWFza0Zyb21QYXRjaChcbiAgICAgIHBhdGNoLFxuICAgICAgdGhpcy5fYXBpLlNldERlZmF1bHRBc3NvY2lhdGlvbkFsbG93ZWRGaWVsZE1hc2tQYXRocyxcbiAgICApLFxuICApIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuU2V0RGVmYXVsdEFzc29jaWF0aW9uKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICdkZWZhdWx0Lmlkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgICAnZGVmYXVsdC5pZHMuZl9wb3J0JzogZlBvcnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZWZhdWx0OiBwYXRjaCxcbiAgICAgICAgZmllbGRfbWFzazogTWFyc2hhbGVyLmZpZWxkTWFzayhtYXNrKSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlRGVmYXVsdEFzc29jaWF0aW9uKGFwcElkLCBmUG9ydCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5EZWxldGVEZWZhdWx0QXNzb2NpYXRpb24oe1xuICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkLFxuICAgICAgICBmX3BvcnQ6IGZQb3J0LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uUGFja2FnZXNcbiJdfQ==