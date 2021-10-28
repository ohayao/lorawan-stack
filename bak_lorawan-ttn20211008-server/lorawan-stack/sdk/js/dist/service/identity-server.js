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
var Is = /*#__PURE__*/function () {
  function Is(service) {
    (0, _classCallCheck2["default"])(this, Is);
    this._api = service;
  }

  (0, _createClass2["default"])(Is, [{
    key: "getConfiguration",
    value: function () {
      var _getConfiguration = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.GetConfiguration();

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

      function getConfiguration() {
        return _getConfiguration.apply(this, arguments);
      }

      return getConfiguration;
    }()
  }]);
  return Is;
}();

var _default = Is;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2lkZW50aXR5LXNlcnZlci5qcyJdLCJuYW1lcyI6WyJJcyIsInNlcnZpY2UiLCJfYXBpIiwiR2V0Q29uZmlndXJhdGlvbiIsInJlc3VsdCIsIk1hcnNoYWxlciIsInBheWxvYWRTaW5nbGVSZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7QUFkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUlNQSxFO0FBQ0osY0FBWUMsT0FBWixFQUFxQjtBQUFBO0FBQ25CLFNBQUtDLElBQUwsR0FBWUQsT0FBWjtBQUNEOzs7Ozs0R0FFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1QixLQUFLQyxJQUFMLENBQVVDLGdCQUFWLEVBRHZCOztBQUFBO0FBQ1FDLGdCQUFBQSxNQURSO0FBQUEsaURBR1NDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FIVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozs7ZUFPYUosRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDIwIFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IE1hcnNoYWxlciBmcm9tICcuLi91dGlsL21hcnNoYWxlcidcblxuY2xhc3MgSXMge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlKSB7XG4gICAgdGhpcy5fYXBpID0gc2VydmljZVxuICB9XG5cbiAgYXN5bmMgZ2V0Q29uZmlndXJhdGlvbigpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuR2V0Q29uZmlndXJhdGlvbigpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSXNcbiJdfQ==