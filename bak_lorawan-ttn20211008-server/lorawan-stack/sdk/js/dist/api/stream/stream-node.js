"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _token = _interopRequireDefault(require("../../util/token"));

var _shared = require("./shared");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Opens a new stream.
 *
 * @async
 * @param {object} payload -  - The body of the initial request.
 * @param {string} url - The stream endpoint.
 *
 * @example
 * (async () => {
 *    const stream = await stream(
 *      { identifiers: [{ application_ids: { application_id: 'my-app' }}]},
 *      'http://localhost:1885/api/v3/events',
 *    )
 *
 *    // Add listeners to the stream.
 *    stream
 *      .on('start', () => console.log('conn opened'))
 *      .on('chunk', chunk => console.log('received chunk', chunk))
 *      .on('error', error => console.log(error))
 *      .on('close', () => console.log('conn closed'))
 *
 *    // Start the stream after attaching the listeners.
 *    stream.open()
 *
 *    // Close the stream after 20 s.
 *    setTimeout(() => stream.close(), 20000)
 * })()
 *
 * @returns {object} The stream subscription object with the `on` function for
 * attaching listeners and the `close` function to close the stream.
 */
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, url) {
    var listeners, reader, token, Authorization, buffer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            listeners = Object.values(_shared.EVENTS).reduce(function (acc, curr) {
              return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, curr, null));
            }, {});
            reader = null;
            token = new _token["default"]().get();
            Authorization = null;

            if (!(typeof token === 'function')) {
              _context.next = 12;
              break;
            }

            _context.t0 = "Bearer ";
            _context.next = 8;
            return token();

          case 8:
            _context.t1 = _context.sent.access_token;
            Authorization = _context.t0.concat.call(_context.t0, _context.t1);
            _context.next = 13;
            break;

          case 12:
            Authorization = "Bearer ".concat(token);

          case 13:
            buffer = '';
            (0, _axios["default"])({
              url: url,
              data: JSON.stringify(payload),
              method: 'POST',
              responseType: 'stream',
              headers: {
                Authorization: Authorization,
                Accept: 'text/event-stream'
              }
            }).then(function (response) {
              return response.data;
            }).then(function (stream) {
              reader = stream;
            });
            return _context.abrupt("return", {
              open: function open() {
                (0, _shared.notify)(listeners[_shared.EVENTS.START]);
                reader.on('data', function (data) {
                  var parsed = data.toString('utf8');
                  buffer += parsed;
                  var lines = buffer.split(/\n\n/);
                  buffer = lines.pop();

                  var _iterator = _createForOfIteratorHelper(lines),
                      _step;

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      var line = _step.value;
                      (0, _shared.notify)(listeners[_shared.EVENTS.CHUNK], JSON.parse(line).result);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                });
                reader.on('end', function () {
                  (0, _shared.notify)(listeners[_shared.EVENTS.CLOSE]);
                  listeners = {};
                });
                reader.on('error', function (error) {
                  (0, _shared.notify)(listeners[_shared.EVENTS.ERROR], error);
                  listeners = {};
                });
              },
              on: function on(eventName, callback) {
                if (listeners[eventName] === undefined) {
                  throw new Error("".concat(eventName, " event is not supported. Should be one of: start, error, chunk or close"));
                }

                listeners[eventName] = callback;
                return this;
              },
              close: function close() {
                if (reader) {
                  reader.cancel();
                }
              }
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RyZWFtL3N0cmVhbS1ub2RlLmpzIl0sIm5hbWVzIjpbInBheWxvYWQiLCJ1cmwiLCJsaXN0ZW5lcnMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJFVkVOVFMiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwicmVhZGVyIiwidG9rZW4iLCJUb2tlbiIsImdldCIsIkF1dGhvcml6YXRpb24iLCJhY2Nlc3NfdG9rZW4iLCJidWZmZXIiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1ldGhvZCIsInJlc3BvbnNlVHlwZSIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdHJlYW0iLCJvcGVuIiwiU1RBUlQiLCJvbiIsInBhcnNlZCIsInRvU3RyaW5nIiwibGluZXMiLCJzcGxpdCIsInBvcCIsImxpbmUiLCJDSFVOSyIsInBhcnNlIiwicmVzdWx0IiwiQ0xPU0UiLCJlcnJvciIsIkVSUk9SIiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJFcnJvciIsImNsb3NlIiwiY2FuY2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzJGQUNlLGlCQUFPQSxPQUFQLEVBQWdCQyxHQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVEMsWUFBQUEsU0FEUyxHQUNHQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsY0FBZCxFQUFzQkMsTUFBdEIsQ0FBNkIsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOO0FBQUEscURBQXFCRCxHQUFyQiw0Q0FBMkJDLElBQTNCLEVBQWtDLElBQWxD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QUUsaUJBQU07QUFDWCxvQkFBSXBDLE1BQUosRUFBWTtBQUNWQSxrQkFBQUEsTUFBTSxDQUFDcUMsTUFBUDtBQUNEO0FBQ0Y7QUFyQ0ksYUE3Qk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5pbXBvcnQgVG9rZW4gZnJvbSAnLi4vLi4vdXRpbC90b2tlbidcblxuaW1wb3J0IHsgbm90aWZ5LCBFVkVOVFMgfSBmcm9tICcuL3NoYXJlZCdcblxuLyoqXG4gKiBPcGVucyBhIG5ldyBzdHJlYW0uXG4gKlxuICogQGFzeW5jXG4gKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZCAtICAtIFRoZSBib2R5IG9mIHRoZSBpbml0aWFsIHJlcXVlc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHN0cmVhbSBlbmRwb2ludC5cbiAqXG4gKiBAZXhhbXBsZVxuICogKGFzeW5jICgpID0+IHtcbiAqICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IHN0cmVhbShcbiAqICAgICAgeyBpZGVudGlmaWVyczogW3sgYXBwbGljYXRpb25faWRzOiB7IGFwcGxpY2F0aW9uX2lkOiAnbXktYXBwJyB9fV19LFxuICogICAgICAnaHR0cDovL2xvY2FsaG9zdDoxODg1L2FwaS92My9ldmVudHMnLFxuICogICAgKVxuICpcbiAqICAgIC8vIEFkZCBsaXN0ZW5lcnMgdG8gdGhlIHN0cmVhbS5cbiAqICAgIHN0cmVhbVxuICogICAgICAub24oJ3N0YXJ0JywgKCkgPT4gY29uc29sZS5sb2coJ2Nvbm4gb3BlbmVkJykpXG4gKiAgICAgIC5vbignY2h1bmsnLCBjaHVuayA9PiBjb25zb2xlLmxvZygncmVjZWl2ZWQgY2h1bmsnLCBjaHVuaykpXG4gKiAgICAgIC5vbignZXJyb3InLCBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpXG4gKiAgICAgIC5vbignY2xvc2UnLCAoKSA9PiBjb25zb2xlLmxvZygnY29ubiBjbG9zZWQnKSlcbiAqXG4gKiAgICAvLyBTdGFydCB0aGUgc3RyZWFtIGFmdGVyIGF0dGFjaGluZyB0aGUgbGlzdGVuZXJzLlxuICogICAgc3RyZWFtLm9wZW4oKVxuICpcbiAqICAgIC8vIENsb3NlIHRoZSBzdHJlYW0gYWZ0ZXIgMjAgcy5cbiAqICAgIHNldFRpbWVvdXQoKCkgPT4gc3RyZWFtLmNsb3NlKCksIDIwMDAwKVxuICogfSkoKVxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBzdHJlYW0gc3Vic2NyaXB0aW9uIG9iamVjdCB3aXRoIHRoZSBgb25gIGZ1bmN0aW9uIGZvclxuICogYXR0YWNoaW5nIGxpc3RlbmVycyBhbmQgdGhlIGBjbG9zZWAgZnVuY3Rpb24gdG8gY2xvc2UgdGhlIHN0cmVhbS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHBheWxvYWQsIHVybCkgPT4ge1xuICBsZXQgbGlzdGVuZXJzID0gT2JqZWN0LnZhbHVlcyhFVkVOVFMpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIFtjdXJyXTogbnVsbCB9KSwge30pXG4gIGxldCByZWFkZXIgPSBudWxsXG5cbiAgY29uc3QgdG9rZW4gPSBuZXcgVG9rZW4oKS5nZXQoKVxuXG4gIGxldCBBdXRob3JpemF0aW9uID0gbnVsbFxuICBpZiAodHlwZW9mIHRva2VuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHsoYXdhaXQgdG9rZW4oKSkuYWNjZXNzX3Rva2VufWBcbiAgfSBlbHNlIHtcbiAgICBBdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWBcbiAgfVxuXG4gIGxldCBidWZmZXIgPSAnJ1xuICBheGlvcyh7XG4gICAgdXJsLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHJlc3BvbnNlVHlwZTogJ3N0cmVhbScsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbixcbiAgICAgIEFjY2VwdDogJ3RleHQvZXZlbnQtc3RyZWFtJyxcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpXG4gICAgLnRoZW4oc3RyZWFtID0+IHtcbiAgICAgIHJlYWRlciA9IHN0cmVhbVxuICAgIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBvcGVuOiAoKSA9PiB7XG4gICAgICBub3RpZnkobGlzdGVuZXJzW0VWRU5UUy5TVEFSVF0pXG5cbiAgICAgIHJlYWRlci5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBkYXRhLnRvU3RyaW5nKCd1dGY4JylcbiAgICAgICAgYnVmZmVyICs9IHBhcnNlZFxuICAgICAgICBjb25zdCBsaW5lcyA9IGJ1ZmZlci5zcGxpdCgvXFxuXFxuLylcbiAgICAgICAgYnVmZmVyID0gbGluZXMucG9wKClcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgICAgbm90aWZ5KGxpc3RlbmVyc1tFVkVOVFMuQ0hVTktdLCBKU09OLnBhcnNlKGxpbmUpLnJlc3VsdClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJlYWRlci5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICBub3RpZnkobGlzdGVuZXJzW0VWRU5UUy5DTE9TRV0pXG4gICAgICAgIGxpc3RlbmVycyA9IHt9XG4gICAgICB9KVxuICAgICAgcmVhZGVyLm9uKCdlcnJvcicsIGVycm9yID0+IHtcbiAgICAgICAgbm90aWZ5KGxpc3RlbmVyc1tFVkVOVFMuRVJST1JdLCBlcnJvcilcbiAgICAgICAgbGlzdGVuZXJzID0ge31cbiAgICAgIH0pXG4gICAgfSxcbiAgICBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2V2ZW50TmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7ZXZlbnROYW1lfSBldmVudCBpcyBub3Qgc3VwcG9ydGVkLiBTaG91bGQgYmUgb25lIG9mOiBzdGFydCwgZXJyb3IsIGNodW5rIG9yIGNsb3NlYCxcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnNbZXZlbnROYW1lXSA9IGNhbGxiYWNrXG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgaWYgKHJlYWRlcikge1xuICAgICAgICByZWFkZXIuY2FuY2VsKClcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG4iXX0=