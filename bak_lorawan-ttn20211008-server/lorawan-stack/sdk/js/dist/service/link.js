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

// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
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
var Link = /*#__PURE__*/function () {
  function Link(registry) {
    (0, _classCallCheck2["default"])(this, Link);
    this._api = registry;
  }

  (0, _createClass2["default"])(Link, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId, fieldMask) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GetLink({
                  routeParams: {
                    'application_ids.application_id': appId
                  }
                }, _marshaler["default"].selectorToFieldMask(fieldMask));

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

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, data) {
        var mask,
            result,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mask = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : _marshaler["default"].fieldMaskFromPatch(data);
                _context2.next = 3;
                return this._api.SetLink({
                  routeParams: {
                    'application_ids.application_id': appId
                  }
                }, {
                  link: data,
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

      function set(_x3, _x4) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.DeleteLink({
                  routeParams: {
                    application_id: appId
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

      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "getStats",
    value: function () {
      var _getStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(appId) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._api.GetLinkStats({
                  routeParams: {
                    application_id: appId
                  }
                });

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

      function getStats(_x6) {
        return _getStats.apply(this, arguments);
      }

      return getStats;
    }()
  }]);
  return Link;
}();

var _default = Link;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2xpbmsuanMiXSwibmFtZXMiOlsiTGluayIsInJlZ2lzdHJ5IiwiX2FwaSIsImFwcElkIiwiZmllbGRNYXNrIiwiR2V0TGluayIsInJvdXRlUGFyYW1zIiwiTWFyc2hhbGVyIiwic2VsZWN0b3JUb0ZpZWxkTWFzayIsInJlc3VsdCIsInBheWxvYWRTaW5nbGVSZXNwb25zZSIsImRhdGEiLCJtYXNrIiwiZmllbGRNYXNrRnJvbVBhdGNoIiwiU2V0TGluayIsImxpbmsiLCJmaWVsZF9tYXNrIiwiRGVsZXRlTGluayIsImFwcGxpY2F0aW9uX2lkIiwiR2V0TGlua1N0YXRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBSU1BLEk7QUFDSixnQkFBWUMsUUFBWixFQUFzQjtBQUFBO0FBQ3BCLFNBQUtDLElBQUwsR0FBWUQsUUFBWjtBQUNEOzs7OzsrRkFFRCxpQkFBVUUsS0FBVixFQUFpQkMsU0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0YsSUFBTCxDQUFVRyxPQUFWLENBQ25CO0FBQ0VDLGtCQUFBQSxXQUFXLEVBQUU7QUFBRSxzREFBa0NIO0FBQXBDO0FBRGYsaUJBRG1CLEVBSW5CSSxzQkFBVUMsbUJBQVYsQ0FBOEJKLFNBQTlCLENBSm1CLENBRHZCOztBQUFBO0FBQ1FLLGdCQUFBQSxNQURSO0FBQUEsaURBUVNGLHNCQUFVRyxxQkFBVixDQUFnQ0QsTUFBaEMsQ0FSVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OzsrRkFXQSxrQkFBVU4sS0FBVixFQUFpQlEsSUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QkMsZ0JBQUFBLElBQXZCLDhEQUE4Qkwsc0JBQVVNLGtCQUFWLENBQTZCRixJQUE3QixDQUE5QjtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtULElBQUwsQ0FBVVksT0FBVixDQUNuQjtBQUNFUixrQkFBQUEsV0FBVyxFQUFFO0FBQUUsc0RBQWtDSDtBQUFwQztBQURmLGlCQURtQixFQUluQjtBQUNFWSxrQkFBQUEsSUFBSSxFQUFFSixJQURSO0FBRUVLLGtCQUFBQSxVQUFVLEVBQUVULHNCQUFVSCxTQUFWLENBQW9CUSxJQUFwQjtBQUZkLGlCQUptQixDQUR2Qjs7QUFBQTtBQUNRSCxnQkFBQUEsTUFEUjtBQUFBLGtEQVdTRixzQkFBVUcscUJBQVYsQ0FBZ0NELE1BQWhDLENBWFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7bUdBY0Esa0JBQWFOLEtBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0QsSUFBTCxDQUFVZSxVQUFWLENBQXFCO0FBQ3hDWCxrQkFBQUEsV0FBVyxFQUFFO0FBQUVZLG9CQUFBQSxjQUFjLEVBQUVmO0FBQWxCO0FBRDJCLGlCQUFyQixDQUR2Qjs7QUFBQTtBQUNRTSxnQkFBQUEsTUFEUjtBQUFBLGtEQUtTRixzQkFBVUcscUJBQVYsQ0FBZ0NELE1BQWhDLENBTFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7b0dBUUEsa0JBQWVOLEtBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0QsSUFBTCxDQUFVaUIsWUFBVixDQUF1QjtBQUMxQ2Isa0JBQUFBLFdBQVcsRUFBRTtBQUFFWSxvQkFBQUEsY0FBYyxFQUFFZjtBQUFsQjtBQUQ2QixpQkFBdkIsQ0FEdkI7O0FBQUE7QUFDUU0sZ0JBQUFBLE1BRFI7QUFBQSxrREFLU0Ysc0JBQVVHLHFCQUFWLENBQWdDRCxNQUFoQyxDQUxUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OztlQVNhVCxJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgTWFyc2hhbGVyIGZyb20gJy4uL3V0aWwvbWFyc2hhbGVyJ1xuXG5jbGFzcyBMaW5rIHtcbiAgY29uc3RydWN0b3IocmVnaXN0cnkpIHtcbiAgICB0aGlzLl9hcGkgPSByZWdpc3RyeVxuICB9XG5cbiAgYXN5bmMgZ2V0KGFwcElkLCBmaWVsZE1hc2spIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0TGluayhcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHsgJ2FwcGxpY2F0aW9uX2lkcy5hcHBsaWNhdGlvbl9pZCc6IGFwcElkIH0sXG4gICAgICB9LFxuICAgICAgTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soZmllbGRNYXNrKSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBzZXQoYXBwSWQsIGRhdGEsIG1hc2sgPSBNYXJzaGFsZXIuZmllbGRNYXNrRnJvbVBhdGNoKGRhdGEpKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLlNldExpbmsoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7ICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGluazogZGF0YSxcbiAgICAgICAgZmllbGRfbWFzazogTWFyc2hhbGVyLmZpZWxkTWFzayhtYXNrKSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlKGFwcElkKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkRlbGV0ZUxpbmsoe1xuICAgICAgcm91dGVQYXJhbXM6IHsgYXBwbGljYXRpb25faWQ6IGFwcElkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIGdldFN0YXRzKGFwcElkKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkdldExpbmtTdGF0cyh7XG4gICAgICByb3V0ZVBhcmFtczogeyBhcHBsaWNhdGlvbl9pZDogYXBwSWQgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtcbiJdfQ==