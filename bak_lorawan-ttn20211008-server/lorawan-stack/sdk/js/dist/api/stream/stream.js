"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _arraybufferToString = _interopRequireDefault(require("arraybuffer-to-string"));

var _token = _interopRequireDefault(require("../../util/token"));

var _shared = require("./shared");

require("web-streams-polyfill/dist/polyfill");

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
 *      '/api/v3/events',
 *    )
 *
 *    // Add listeners to the stream.
 *    stream
 *      .on('start', () => console.log('conn opened'))
 *      .on('chunk', chunk => console.log('received chunk', chunk))
 *      .on('error', error => console.log(error))
 *      .on('close', () => console.log('conn closed'))
 *
 *    // Start the stream after attaching listerners.
 *    stream.open()
 *
 *     // Close the stream after 20 s.
 *    setTimeout(() => stream.close(), 20000)
 * })()
 *
 * @returns {object} The stream subscription object with the `on` function for
 * attaching listeners and the `close` function to close the stream.
 */
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, url) {
    var initialListeners, listeners, token, Authorization, abortController, response, err, buffer, reader, onChunk;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            initialListeners = Object.values(_shared.EVENTS).reduce(function (acc, curr) {
              return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, curr, null));
            }, {});
            listeners = initialListeners;
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
            abortController = new AbortController();
            _context.next = 16;
            return fetch(url, {
              body: JSON.stringify(payload),
              method: 'POST',
              signal: abortController.signal,
              headers: {
                Authorization: Authorization,
                Accept: 'text/event-stream'
              }
            });

          case 16:
            response = _context.sent;

            if (!(response.status !== 200)) {
              _context.next = 22;
              break;
            }

            _context.next = 20;
            return response.json();

          case 20:
            err = _context.sent;
            throw 'error' in err ? err.error : err;

          case 22:
            buffer = '';
            reader = response.body.getReader();

            onChunk = function onChunk(_ref2) {
              var done = _ref2.done,
                  value = _ref2.value;

              if (done) {
                (0, _shared.notify)(listeners[_shared.EVENTS.CLOSE]);
                listeners = initialListeners;
                return;
              }

              var parsed = (0, _arraybufferToString["default"])(value);
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

              return reader.read().then(onChunk);
            };

            return _context.abrupt("return", {
              open: function open() {
                reader.read().then(function (data) {
                  (0, _shared.notify)(listeners[_shared.EVENTS.START]);
                  return data;
                }).then(onChunk)["catch"](function (error) {
                  (0, _shared.notify)(listeners[_shared.EVENTS.ERROR], error);
                  listeners = initialListeners;
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
                reader.cancel().then(function () {
                  abortController.abort();
                })["catch"](function (error) {
                  (0, _shared.notify)(listeners[_shared.EVENTS.ERROR], error);
                });
              }
            });

          case 26:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RyZWFtL3N0cmVhbS5qcyJdLCJuYW1lcyI6WyJwYXlsb2FkIiwidXJsIiwiaW5pdGlhbExpc3RlbmVycyIsIk9iamVjdCIsInZhbHVlcyIsIkVWRU5UUyIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJsaXN0ZW5lcnMiLCJ0b2tlbiIsIlRva2VuIiwiZ2V0IiwiQXV0aG9yaXphdGlvbiIsImFjY2Vzc190b2tlbiIsImFib3J0Q29udHJvbGxlciIsIkFib3J0Q29udHJvbGxlciIsImZldGNoIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXRob2QiLCJzaWduYWwiLCJoZWFkZXJzIiwiQWNjZXB0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJqc29uIiwiZXJyIiwiZXJyb3IiLCJidWZmZXIiLCJyZWFkZXIiLCJnZXRSZWFkZXIiLCJvbkNodW5rIiwiZG9uZSIsInZhbHVlIiwiQ0xPU0UiLCJwYXJzZWQiLCJsaW5lcyIsInNwbGl0IiwicG9wIiwibGluZSIsIkNIVU5LIiwicGFyc2UiLCJyZXN1bHQiLCJyZWFkIiwidGhlbiIsIm9wZW4iLCJkYXRhIiwiU1RBUlQiLCJFUlJPUiIsIm9uIiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJFcnJvciIsImNsb3NlIiwiY2FuY2VsIiwiYWJvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQUVBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7MkZBQ2UsaUJBQU9BLE9BQVAsRUFBZ0JDLEdBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQQyxZQUFBQSxnQkFE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LENBQUNKLGVBQU80QyxLQUFSLENBQWhCO0FBRUEseUJBQU9ELElBQVA7QUFDRCxpQkFOSCxFQU9HRixJQVBILENBT1FiLE9BUFIsV0FRUyxVQUFBSixLQUFLLEVBQUk7QUFDZCxzQ0FBT3BCLFNBQVMsQ0FBQ0osZUFBTzZDLEtBQVIsQ0FBaEIsRUFBZ0NyQixLQUFoQztBQUNBcEIsa0JBQUFBLFNBQVMsR0FBR1AsZ0JBQVo7QUFDRCxpQkFYSDtBQVlELGVBZEk7QUFlTGlELGNBQUFBLEVBZkssY0FlRkMsU0FmRSxFQWVTQyxRQWZULEVBZW1CO0FBQ3RCLG9CQUFJNUMsU0FBUyxDQUFDMkMsU0FBRCxDQUFULEtBQXlCRSxTQUE3QixFQUF3QztBQUN0Qyx3QkFBTSxJQUFJQyxLQUFKLFdBQ0RILFNBREMsNkVBQU47QUFHRDs7QUFFRDNDLGdCQUFBQSxTQUFTLENBQUMyQyxTQUFELENBQVQsR0FBdUJDLFFBQXZCO0FBRUEsdUJBQU8sSUFBUDtBQUNELGVBekJJO0FBMEJMRyxjQUFBQSxLQUFLLEVBQUUsaUJBQU07QUFDWHpCLGdCQUFBQSxNQUFNLENBQ0gwQixNQURILEdBRUdYLElBRkgsQ0FFUSxZQUFNO0FBQ1YvQixrQkFBQUEsZUFBZSxDQUFDMkMsS0FBaEI7QUFDRCxpQkFKSCxXQUtTLFVBQUE3QixLQUFLLEVBQUk7QUFDZCxzQ0FBT3BCLFNBQVMsQ0FBQ0osZUFBTzZDLEtBQVIsQ0FBaEIsRUFBZ0NyQixLQUFoQztBQUNELGlCQVBIO0FBUUQ7QUFuQ0ksYUFwRE07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IEFycmF5QnVmZmVyVG9TdHJpbmcgZnJvbSAnYXJyYXlidWZmZXItdG8tc3RyaW5nJ1xuXG5pbXBvcnQgVG9rZW4gZnJvbSAnLi4vLi4vdXRpbC90b2tlbidcblxuaW1wb3J0IHsgbm90aWZ5LCBFVkVOVFMgfSBmcm9tICcuL3NoYXJlZCdcbmltcG9ydCAnd2ViLXN0cmVhbXMtcG9seWZpbGwvZGlzdC9wb2x5ZmlsbCdcblxuLyoqXG4gKiBPcGVucyBhIG5ldyBzdHJlYW0uXG4gKlxuICogQGFzeW5jXG4gKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZCAtICAtIFRoZSBib2R5IG9mIHRoZSBpbml0aWFsIHJlcXVlc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHN0cmVhbSBlbmRwb2ludC5cbiAqXG4gKiBAZXhhbXBsZVxuICogKGFzeW5jICgpID0+IHtcbiAqICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IHN0cmVhbShcbiAqICAgICAgeyBpZGVudGlmaWVyczogW3sgYXBwbGljYXRpb25faWRzOiB7IGFwcGxpY2F0aW9uX2lkOiAnbXktYXBwJyB9fV19LFxuICogICAgICAnL2FwaS92My9ldmVudHMnLFxuICogICAgKVxuICpcbiAqICAgIC8vIEFkZCBsaXN0ZW5lcnMgdG8gdGhlIHN0cmVhbS5cbiAqICAgIHN0cmVhbVxuICogICAgICAub24oJ3N0YXJ0JywgKCkgPT4gY29uc29sZS5sb2coJ2Nvbm4gb3BlbmVkJykpXG4gKiAgICAgIC5vbignY2h1bmsnLCBjaHVuayA9PiBjb25zb2xlLmxvZygncmVjZWl2ZWQgY2h1bmsnLCBjaHVuaykpXG4gKiAgICAgIC5vbignZXJyb3InLCBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpXG4gKiAgICAgIC5vbignY2xvc2UnLCAoKSA9PiBjb25zb2xlLmxvZygnY29ubiBjbG9zZWQnKSlcbiAqXG4gKiAgICAvLyBTdGFydCB0aGUgc3RyZWFtIGFmdGVyIGF0dGFjaGluZyBsaXN0ZXJuZXJzLlxuICogICAgc3RyZWFtLm9wZW4oKVxuICpcbiAqICAgICAvLyBDbG9zZSB0aGUgc3RyZWFtIGFmdGVyIDIwIHMuXG4gKiAgICBzZXRUaW1lb3V0KCgpID0+IHN0cmVhbS5jbG9zZSgpLCAyMDAwMClcbiAqIH0pKClcbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgc3RyZWFtIHN1YnNjcmlwdGlvbiBvYmplY3Qgd2l0aCB0aGUgYG9uYCBmdW5jdGlvbiBmb3JcbiAqIGF0dGFjaGluZyBsaXN0ZW5lcnMgYW5kIHRoZSBgY2xvc2VgIGZ1bmN0aW9uIHRvIGNsb3NlIHRoZSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChwYXlsb2FkLCB1cmwpID0+IHtcbiAgY29uc3QgaW5pdGlhbExpc3RlbmVycyA9IE9iamVjdC52YWx1ZXMoRVZFTlRTKS5yZWR1Y2UoXG4gICAgKGFjYywgY3VycikgPT4gKHsgLi4uYWNjLCBbY3Vycl06IG51bGwgfSksXG4gICAge30sXG4gIClcbiAgbGV0IGxpc3RlbmVycyA9IGluaXRpYWxMaXN0ZW5lcnNcbiAgY29uc3QgdG9rZW4gPSBuZXcgVG9rZW4oKS5nZXQoKVxuXG4gIGxldCBBdXRob3JpemF0aW9uID0gbnVsbFxuICBpZiAodHlwZW9mIHRva2VuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHsoYXdhaXQgdG9rZW4oKSkuYWNjZXNzX3Rva2VufWBcbiAgfSBlbHNlIHtcbiAgICBBdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWBcbiAgfVxuXG4gIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uLFxuICAgICAgQWNjZXB0OiAndGV4dC9ldmVudC1zdHJlYW0nLFxuICAgIH0sXG4gIH0pXG5cbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgY29uc3QgZXJyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG5cbiAgICB0aHJvdyAnZXJyb3InIGluIGVyciA/IGVyci5lcnJvciA6IGVyclxuICB9XG5cbiAgbGV0IGJ1ZmZlciA9ICcnXG4gIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKClcbiAgY29uc3Qgb25DaHVuayA9ICh7IGRvbmUsIHZhbHVlIH0pID0+IHtcbiAgICBpZiAoZG9uZSkge1xuICAgICAgbm90aWZ5KGxpc3RlbmVyc1tFVkVOVFMuQ0xPU0VdKVxuICAgICAgbGlzdGVuZXJzID0gaW5pdGlhbExpc3RlbmVyc1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkID0gQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSlcbiAgICBidWZmZXIgKz0gcGFyc2VkXG4gICAgY29uc3QgbGluZXMgPSBidWZmZXIuc3BsaXQoL1xcblxcbi8pXG4gICAgYnVmZmVyID0gbGluZXMucG9wKClcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgIG5vdGlmeShsaXN0ZW5lcnNbRVZFTlRTLkNIVU5LXSwgSlNPTi5wYXJzZShsaW5lKS5yZXN1bHQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlYWRlci5yZWFkKCkudGhlbihvbkNodW5rKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvcGVuOiAoKSA9PiB7XG4gICAgICByZWFkZXJcbiAgICAgICAgLnJlYWQoKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBub3RpZnkobGlzdGVuZXJzW0VWRU5UUy5TVEFSVF0pXG5cbiAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihvbkNodW5rKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIG5vdGlmeShsaXN0ZW5lcnNbRVZFTlRTLkVSUk9SXSwgZXJyb3IpXG4gICAgICAgICAgbGlzdGVuZXJzID0gaW5pdGlhbExpc3RlbmVyc1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tldmVudE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGAke2V2ZW50TmFtZX0gZXZlbnQgaXMgbm90IHN1cHBvcnRlZC4gU2hvdWxkIGJlIG9uZSBvZjogc3RhcnQsIGVycm9yLCBjaHVuayBvciBjbG9zZWAsXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBjYWxsYmFja1xuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgY2xvc2U6ICgpID0+IHtcbiAgICAgIHJlYWRlclxuICAgICAgICAuY2FuY2VsKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbm90aWZ5KGxpc3RlbmVyc1tFVkVOVFMuRVJST1JdLCBlcnJvcilcbiAgICAgICAgfSlcbiAgICB9LFxuICB9XG59XG4iXX0=