"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
var EventHandler = function EventHandler() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, EventHandler);
  this.EVENTS = Object.freeze({
    WARNING: 'warning' // Add more here as we go.

  });
  this.eventHandlers = {};

  this.dispatchEvent = function (event, payload) {
    if (_this.eventHandlers[event]) {
      var _iterator = _createForOfIteratorHelper(_this.eventHandlers[event]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;
          handler(payload);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  this.subscribe = function (event, handler) {
    if (!Object.values(_this.EVENTS).includes(event)) {
      throw new Error("Cannot subscribe to unsupported event type \"".concat(event, "\""));
    }

    _this.eventHandlers = _objectSpread(_objectSpread({}, _this.eventHandlers), {}, (0, _defineProperty2["default"])({}, event, _this.eventHandlers[event] ? [].concat((0, _toConsumableArray2["default"])(_this.eventHandlers[event]), [handler]) : [handler]));
  };

  this.unsubscribe = function (event) {
    if (!Object.values(_this.EVENTS).includes(event)) {
      throw new Error("Cannot unsubscribe from unsupported event type \"".concat(event, "\""));
    }

    if (_this.eventHandlers[event]) {
      delete _this.eventHandlers[event];
    }
  };
};

var _default = new EventHandler();

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2V2ZW50cy5qcyJdLCJuYW1lcyI6WyJFdmVudEhhbmRsZXIiLCJFVkVOVFMiLCJPYmplY3QiLCJmcmVlemUiLCJXQVJOSU5HIiwiZXZlbnRIYW5kbGVycyIsImRpc3BhdGNoRXZlbnQiLCJldmVudCIsInBheWxvYWQiLCJoYW5kbGVyIiwic3Vic2NyaWJlIiwidmFsdWVzIiwiaW5jbHVkZXMiLCJFcnJvciIsInVuc3Vic2NyaWJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFFTUEsWSxHQUNKLHdCQUFjO0FBQUE7O0FBQUE7QUFDWixPQUFLQyxNQUFMLEdBQWNDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQzFCQyxJQUFBQSxPQUFPLEVBQUUsU0FEaUIsQ0FFMUI7O0FBRjBCLEdBQWQsQ0FBZDtBQUtBLE9BQUtDLGFBQUwsR0FBcUIsRUFBckI7O0FBQ0EsT0FBS0MsYUFBTCxHQUFxQixVQUFDQyxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDdkMsUUFBSSxLQUFJLENBQUNILGFBQUwsQ0FBbUJFLEtBQW5CLENBQUosRUFBK0I7QUFBQSxpREFDUCxLQUFJLENBQUNGLGFBQUwsQ0FBbUJFLEtBQW5CLENBRE87QUFBQTs7QUFBQTtBQUM3Qiw0REFBaUQ7QUFBQSxjQUF0Q0UsT0FBc0M7QUFDL0NBLFVBQUFBLE9BQU8sQ0FBQ0QsT0FBRCxDQUFQO0FBQ0Q7QUFINEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUk5QjtBQUNGLEdBTkQ7O0FBUUEsT0FBS0UsU0FBTCxHQUFpQixVQUFDSCxLQUFELEVBQVFFLE9BQVIsRUFBb0I7QUFDbkMsUUFBSSxDQUFDUCxNQUFNLENBQUNTLE1BQVAsQ0FBYyxLQUFJLENBQUNWLE1BQW5CLEVBQTJCVyxRQUEzQixDQUFvQ0wsS0FBcEMsQ0FBTCxFQUFpRDtBQUMvQyxZQUFNLElBQUlNLEtBQUosd0RBQXlETixLQUF6RCxRQUFOO0FBQ0Q7O0FBQ0QsSUFBQSxLQUFJLENBQUNGLGFBQUwsbUNBQ0ssS0FBSSxDQUFDQSxhQURWLDRDQUVHRSxLQUZILEVBRVcsS0FBSSxDQUFDRixhQUFMLENBQW1CRSxLQUFuQixrREFBZ0MsS0FBSSxDQUFDRixhQUFMLENBQW1CRSxLQUFuQixDQUFoQyxJQUEyREUsT0FBM0QsS0FBc0UsQ0FBQ0EsT0FBRCxDQUZqRjtBQUlELEdBUkQ7O0FBVUEsT0FBS0ssV0FBTCxHQUFtQixVQUFBUCxLQUFLLEVBQUk7QUFDMUIsUUFBSSxDQUFDTCxNQUFNLENBQUNTLE1BQVAsQ0FBYyxLQUFJLENBQUNWLE1BQW5CLEVBQTJCVyxRQUEzQixDQUFvQ0wsS0FBcEMsQ0FBTCxFQUFpRDtBQUMvQyxZQUFNLElBQUlNLEtBQUosNERBQTZETixLQUE3RCxRQUFOO0FBQ0Q7O0FBQ0QsUUFBSSxLQUFJLENBQUNGLGFBQUwsQ0FBbUJFLEtBQW5CLENBQUosRUFBK0I7QUFDN0IsYUFBTyxLQUFJLENBQUNGLGFBQUwsQ0FBbUJFLEtBQW5CLENBQVA7QUFDRDtBQUNGLEdBUEQ7QUFRRCxDOztlQUdZLElBQUlQLFlBQUosRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5FVkVOVFMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgIFdBUk5JTkc6ICd3YXJuaW5nJyxcbiAgICAgIC8vIEFkZCBtb3JlIGhlcmUgYXMgd2UgZ28uXG4gICAgfSlcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVycyA9IHt9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50ID0gKGV2ZW50LCBwYXlsb2FkKSA9PiB7XG4gICAgICBpZiAodGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50XSkge1xuICAgICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50XSkge1xuICAgICAgICAgIGhhbmRsZXIocGF5bG9hZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc3Vic2NyaWJlID0gKGV2ZW50LCBoYW5kbGVyKSA9PiB7XG4gICAgICBpZiAoIU9iamVjdC52YWx1ZXModGhpcy5FVkVOVFMpLmluY2x1ZGVzKGV2ZW50KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBzdWJzY3JpYmUgdG8gdW5zdXBwb3J0ZWQgZXZlbnQgdHlwZSBcIiR7ZXZlbnR9XCJgKVxuICAgICAgfVxuICAgICAgdGhpcy5ldmVudEhhbmRsZXJzID0ge1xuICAgICAgICAuLi50aGlzLmV2ZW50SGFuZGxlcnMsXG4gICAgICAgIFtldmVudF06IHRoaXMuZXZlbnRIYW5kbGVyc1tldmVudF0gPyBbLi4udGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50XSwgaGFuZGxlcl0gOiBbaGFuZGxlcl0sXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51bnN1YnNjcmliZSA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICghT2JqZWN0LnZhbHVlcyh0aGlzLkVWRU5UUykuaW5jbHVkZXMoZXZlbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHVuc3Vic2NyaWJlIGZyb20gdW5zdXBwb3J0ZWQgZXZlbnQgdHlwZSBcIiR7ZXZlbnR9XCJgKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRIYW5kbGVyc1tldmVudF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEV2ZW50SGFuZGxlcigpXG4iXX0=