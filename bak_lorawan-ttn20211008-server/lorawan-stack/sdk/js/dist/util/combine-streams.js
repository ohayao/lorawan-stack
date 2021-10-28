"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

/**
 * Combines multiple streams into a single subscription provider.
 *
 * @param {Array} streams - An array of (async) stream functions.
 * @returns {object} The stream subscription object with the `on` function for
 * attaching listeners and the `close` function to close the stream.
 */
var combinedStream = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(streams) {
    var subscribers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!(streams instanceof Array) || streams.length === 0)) {
              _context.next = 4;
              break;
            }

            throw new Error('Cannot combine streams with invalid stream array.');

          case 4:
            if (!(streams.length === 1)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", streams[0]);

          case 6:
            _context.next = 8;
            return Promise.all(streams);

          case 8:
            subscribers = _context.sent;
            return _context.abrupt("return", {
              open: function open() {
                var _iterator = _createForOfIteratorHelper(subscribers),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var subscriber = _step.value;
                    subscriber.open();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              },
              on: function on(eventName, callback) {
                var _iterator2 = _createForOfIteratorHelper(subscribers),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var subscriber = _step2.value;
                    subscriber.on(eventName, callback);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              },
              close: function close() {
                var _iterator3 = _createForOfIteratorHelper(subscribers),
                    _step3;

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var subscriber = _step3.value;
                    subscriber.close();
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function combinedStream(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = combinedStream;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2NvbWJpbmUtc3RyZWFtcy5qcyJdLCJuYW1lcyI6WyJjb21iaW5lZFN0cmVhbSIsInN0cmVhbXMiLCJBcnJheSIsImxlbmd0aCIsIkVycm9yIiwiUHJvbWlzZSIsImFsbCIsInN1YnNjcmliZXJzIiwib3BlbiIsInN1YnNjcmliZXIiLCJvbiIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLGNBQWM7QUFBQSwyRkFBRyxpQkFBTUMsT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDakIsRUFBRUEsT0FBTyxZQUFZQyxLQUFyQixLQUErQkQsT0FBTyxDQUFDRSxNQUFSLEtBQW1CLENBRGpDO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQUViLElBQUlDLEtBQUosQ0FBVSxtREFBVixDQUZhOztBQUFBO0FBQUEsa0JBR1ZILE9BQU8sQ0FBQ0UsTUFBUixLQUFtQixDQUhUO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUlaRixPQUFPLENBQUMsQ0FBRCxDQUpLOztBQUFBO0FBQUE7QUFBQSxtQkFPS0ksT0FBTyxDQUFDQyxHQUFSLENBQVlMLE9BQVosQ0FQTDs7QUFBQTtBQU9mTSxZQUFBQSxXQVBlO0FBQUEsNkNBU2Q7QUFDTEMsY0FBQUEsSUFBSSxFQUFFLGdCQUFNO0FBQUEsMkRBQ2VELFdBRGY7QUFBQTs7QUFBQTtBQUNWLHNFQUFzQztBQUFBLHdCQUEzQkUsVUFBMkI7QUFDcENBLG9CQUFBQSxVQUFVLENBQUNELElBQVg7QUFDRDtBQUhTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJWCxlQUxJO0FBTUxFLGNBQUFBLEVBQUUsRUFBRSxZQUFDQyxTQUFELEVBQVlDLFFBQVosRUFBeUI7QUFBQSw0REFDRkwsV0FERTtBQUFBOztBQUFBO0FBQzNCLHlFQUFzQztBQUFBLHdCQUEzQkUsVUFBMkI7QUFDcENBLG9CQUFBQSxVQUFVLENBQUNDLEVBQVgsQ0FBY0MsU0FBZCxFQUF5QkMsUUFBekI7QUFDRDtBQUgwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSTVCLGVBVkk7QUFXTEMsY0FBQUEsS0FBSyxFQUFFLGlCQUFNO0FBQUEsNERBQ2NOLFdBRGQ7QUFBQTs7QUFBQTtBQUNYLHlFQUFzQztBQUFBLHdCQUEzQkUsVUFBMkI7QUFDcENBLG9CQUFBQSxVQUFVLENBQUNJLEtBQVg7QUFDRDtBQUhVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJWjtBQWZJLGFBVGM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBZGIsY0FBYztBQUFBO0FBQUE7QUFBQSxHQUFwQjs7ZUE0QmVBLGMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAyMCBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qKlxuICogQ29tYmluZXMgbXVsdGlwbGUgc3RyZWFtcyBpbnRvIGEgc2luZ2xlIHN1YnNjcmlwdGlvbiBwcm92aWRlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJlYW1zIC0gQW4gYXJyYXkgb2YgKGFzeW5jKSBzdHJlYW0gZnVuY3Rpb25zLlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHN0cmVhbSBzdWJzY3JpcHRpb24gb2JqZWN0IHdpdGggdGhlIGBvbmAgZnVuY3Rpb24gZm9yXG4gKiBhdHRhY2hpbmcgbGlzdGVuZXJzIGFuZCB0aGUgYGNsb3NlYCBmdW5jdGlvbiB0byBjbG9zZSB0aGUgc3RyZWFtLlxuICovXG5jb25zdCBjb21iaW5lZFN0cmVhbSA9IGFzeW5jIHN0cmVhbXMgPT4ge1xuICBpZiAoIShzdHJlYW1zIGluc3RhbmNlb2YgQXJyYXkpIHx8IHN0cmVhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY29tYmluZSBzdHJlYW1zIHdpdGggaW52YWxpZCBzdHJlYW0gYXJyYXkuJylcbiAgfSBlbHNlIGlmIChzdHJlYW1zLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBzdHJlYW1zWzBdXG4gIH1cblxuICBjb25zdCBzdWJzY3JpYmVycyA9IGF3YWl0IFByb21pc2UuYWxsKHN0cmVhbXMpXG5cbiAgcmV0dXJuIHtcbiAgICBvcGVuOiAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHN1YnNjcmliZXIgb2Ygc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5vcGVuKClcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uOiAoZXZlbnROYW1lLCBjYWxsYmFjaykgPT4ge1xuICAgICAgZm9yIChjb25zdCBzdWJzY3JpYmVyIG9mIHN1YnNjcmliZXJzKSB7XG4gICAgICAgIHN1YnNjcmliZXIub24oZXZlbnROYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHN1YnNjcmliZXIgb2Ygc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5jbG9zZSgpXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lZFN0cmVhbVxuIl19