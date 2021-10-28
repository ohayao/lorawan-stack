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

// Copyright © 2021 The Things Network Foundation, The Things Industries B.V.
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
var As = /*#__PURE__*/function () {
  function As(service) {
    (0, _classCallCheck2["default"])(this, As);
    this._api = service;
  }

  (0, _createClass2["default"])(As, [{
    key: "encodeDownlink",
    value: function () {
      var _encodeDownlink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId, deviceId, data) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.EncodeDownlink({
                  routeParams: {
                    'end_device_ids.application_ids.application_id': appId,
                    'end_device_ids.device_id': deviceId
                  }
                }, data);

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

      function encodeDownlink(_x, _x2, _x3) {
        return _encodeDownlink.apply(this, arguments);
      }

      return encodeDownlink;
    }()
  }, {
    key: "decodeDownlink",
    value: function () {
      var _decodeDownlink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, deviceId, data) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._api.DecodeDownlink({
                  routeParams: {
                    'end_device_ids.application_ids.application_id': appId,
                    'end_device_ids.device_id': deviceId
                  }
                }, data);

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function decodeDownlink(_x4, _x5, _x6) {
        return _decodeDownlink.apply(this, arguments);
      }

      return decodeDownlink;
    }()
  }, {
    key: "decodeUplink",
    value: function () {
      var _decodeUplink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId, deviceId, data) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._api.DecodeUplink({
                  routeParams: {
                    'end_device_ids.application_ids.application_id': appId,
                    'end_device_ids.device_id': deviceId
                  }
                }, data);

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

      function decodeUplink(_x7, _x8, _x9) {
        return _decodeUplink.apply(this, arguments);
      }

      return decodeUplink;
    }()
  }]);
  return As;
}();

var _default = As;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2FwcGxpY2F0aW9uLXNlcnZlci5qcyJdLCJuYW1lcyI6WyJBcyIsInNlcnZpY2UiLCJfYXBpIiwiYXBwSWQiLCJkZXZpY2VJZCIsImRhdGEiLCJFbmNvZGVEb3dubGluayIsInJvdXRlUGFyYW1zIiwicmVzdWx0IiwiTWFyc2hhbGVyIiwicGF5bG9hZFNpbmdsZVJlc3BvbnNlIiwiRGVjb2RlRG93bmxpbmsiLCJEZWNvZGVVcGxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7O0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFJTUEsRTtBQUNKLGNBQVlDLE9BQVosRUFBcUI7QUFBQTtBQUNuQixTQUFLQyxJQUFMLEdBQVlELE9BQVo7QUFDRDs7Ozs7MEdBRUQsaUJBQXFCRSxLQUFyQixFQUE0QkMsUUFBNUIsRUFBc0NDLElBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLEtBQUtILElBQUwsQ0FBVUksY0FBVixDQUNuQjtBQUNFQyxrQkFBQUEsV0FBVyxFQUFFO0FBQ1gscUVBQWlESixLQUR0QztBQUVYLGdEQUE0QkM7QUFGakI7QUFEZixpQkFEbUIsRUFPbkJDLElBUG1CLENBRHZCOztBQUFBO0FBQ1FHLGdCQUFBQSxNQURSO0FBQUEsaURBV1NDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FYVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OzswR0FjQSxrQkFBcUJMLEtBQXJCLEVBQTRCQyxRQUE1QixFQUFzQ0MsSUFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0gsSUFBTCxDQUFVUyxjQUFWLENBQ25CO0FBQ0VKLGtCQUFBQSxXQUFXLEVBQUU7QUFDWCxxRUFBaURKLEtBRHRDO0FBRVgsZ0RBQTRCQztBQUZqQjtBQURmLGlCQURtQixFQU9uQkMsSUFQbUIsQ0FEdkI7O0FBQUE7QUFDUUcsZ0JBQUFBLE1BRFI7QUFBQSxrREFXU0Msc0JBQVVDLHFCQUFWLENBQWdDRixNQUFoQyxDQVhUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7O3dHQWNBLGtCQUFtQkwsS0FBbkIsRUFBMEJDLFFBQTFCLEVBQW9DQyxJQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1QixLQUFLSCxJQUFMLENBQVVVLFlBQVYsQ0FDbkI7QUFDRUwsa0JBQUFBLFdBQVcsRUFBRTtBQUNYLHFFQUFpREosS0FEdEM7QUFFWCxnREFBNEJDO0FBRmpCO0FBRGYsaUJBRG1CLEVBT25CQyxJQVBtQixDQUR2Qjs7QUFBQTtBQUNRRyxnQkFBQUEsTUFEUjtBQUFBLGtEQVdTQyxzQkFBVUMscUJBQVYsQ0FBZ0NGLE1BQWhDLENBWFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7O2VBZWFSLEUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAyMSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5cbmNsYXNzIEFzIHtcbiAgY29uc3RydWN0b3Ioc2VydmljZSkge1xuICAgIHRoaXMuX2FwaSA9IHNlcnZpY2VcbiAgfVxuXG4gIGFzeW5jIGVuY29kZURvd25saW5rKGFwcElkLCBkZXZpY2VJZCwgZGF0YSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5FbmNvZGVEb3dubGluayhcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnZW5kX2RldmljZV9pZHMuYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmRldmljZV9pZCc6IGRldmljZUlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGRhdGEsXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVjb2RlRG93bmxpbmsoYXBwSWQsIGRldmljZUlkLCBkYXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkRlY29kZURvd25saW5rKFxuICAgICAge1xuICAgICAgICByb3V0ZVBhcmFtczoge1xuICAgICAgICAgICdlbmRfZGV2aWNlX2lkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgICAnZW5kX2RldmljZV9pZHMuZGV2aWNlX2lkJzogZGV2aWNlSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZGF0YSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBkZWNvZGVVcGxpbmsoYXBwSWQsIGRldmljZUlkLCBkYXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkRlY29kZVVwbGluayhcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAnZW5kX2RldmljZV9pZHMuYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgICAgJ2VuZF9kZXZpY2VfaWRzLmRldmljZV9pZCc6IGRldmljZUlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGRhdGEsXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzXG4iXX0=