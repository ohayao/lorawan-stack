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
var ContactInfo = /*#__PURE__*/function () {
  function ContactInfo(service) {
    (0, _classCallCheck2["default"])(this, ContactInfo);
    this._api = service;
  }

  (0, _createClass2["default"])(ContactInfo, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.Validate();

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

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "requestValidation",
    value: function () {
      var _requestValidation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._api.RequestValidation();

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

      function requestValidation() {
        return _requestValidation.apply(this, arguments);
      }

      return requestValidation;
    }()
  }]);
  return ContactInfo;
}();

var _default = ContactInfo;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2NvbnRhY3QtaW5mby5qcyJdLCJuYW1lcyI6WyJDb250YWN0SW5mbyIsInNlcnZpY2UiLCJfYXBpIiwiVmFsaWRhdGUiLCJyZXN1bHQiLCJNYXJzaGFsZXIiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJSZXF1ZXN0VmFsaWRhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7QUFkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUlNQSxXO0FBQ0osdUJBQVlDLE9BQVosRUFBcUI7QUFBQTtBQUNuQixTQUFLQyxJQUFMLEdBQVlELE9BQVo7QUFDRDs7Ozs7b0dBRUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDdUIsS0FBS0MsSUFBTCxDQUFVQyxRQUFWLEVBRHZCOztBQUFBO0FBQ1FDLGdCQUFBQSxNQURSO0FBQUEsaURBR1NDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FIVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozs2R0FNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1QixLQUFLRixJQUFMLENBQVVLLGlCQUFWLEVBRHZCOztBQUFBO0FBQ1FILGdCQUFBQSxNQURSO0FBQUEsa0RBR1NDLHNCQUFVQyxxQkFBVixDQUFnQ0YsTUFBaEMsQ0FIVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozs7ZUFPYUosVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IE1hcnNoYWxlciBmcm9tICcuLi91dGlsL21hcnNoYWxlcidcblxuY2xhc3MgQ29udGFjdEluZm8ge1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlKSB7XG4gICAgdGhpcy5fYXBpID0gc2VydmljZVxuICB9XG5cbiAgYXN5bmMgdmFsaWRhdGUoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLlZhbGlkYXRlKClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RWYWxpZGF0aW9uKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5SZXF1ZXN0VmFsaWRhdGlvbigpXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdEluZm9cbiJdfQ==