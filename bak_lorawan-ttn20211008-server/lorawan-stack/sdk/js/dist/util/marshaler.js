"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _traverse = _interopRequireDefault(require("traverse"));

var _queryString = _interopRequireDefault(require("query-string"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** Class used to marshal data shapes. */
var Marshaler = /*#__PURE__*/function () {
  function Marshaler() {
    (0, _classCallCheck2["default"])(this, Marshaler);
  }

  (0, _createClass2["default"])(Marshaler, null, [{
    key: "options",
    value: function options(_options) {
      if (Object.keys(_options).length === 0) {
        return null;
      }

      var query = {};

      if ('select' in _options) {
        query.field_mask = {};
        query.field_mask.paths = _options.select;
      }

      return query;
    }
  }, {
    key: "query",
    value: function query(params) {
      return _queryString["default"].stringify(params);
    }
  }, {
    key: "payload",
    value: function payload(_payload, wrap) {
      var res = _payload;

      if (wrap) {
        res = (0, _defineProperty2["default"])({}, wrap, res);
      }

      return res;
    }
  }, {
    key: "payloadListResponse",
    value: function payloadListResponse(entity, _ref) {
      var _ref4;

      var _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data,
          _ref$headers = _ref.headers,
          headers = _ref$headers === void 0 ? {} : _ref$headers;
      var list = data[entity];

      if (!list) {
        var _ref2;

        return _ref2 = {}, (0, _defineProperty2["default"])(_ref2, entity, []), (0, _defineProperty2["default"])(_ref2, "totalCount", 0), _ref2;
      }

      var totalCount = parseInt(headers['x-total-count']);

      if (isNaN(totalCount)) {
        var _ref3;

        return _ref3 = {}, (0, _defineProperty2["default"])(_ref3, entity, list), (0, _defineProperty2["default"])(_ref3, "totalCount", list.length), _ref3;
      }

      return _ref4 = {}, (0, _defineProperty2["default"])(_ref4, entity, list), (0, _defineProperty2["default"])(_ref4, "totalCount", totalCount), _ref4;
    }
  }, {
    key: "payloadSingleResponse",
    value: function payloadSingleResponse(response) {
      if ((0, _typeof2["default"])(response) !== 'object') {
        throw new Error("Invalid response type: ".concat((0, _typeof2["default"])(response)));
      }

      if ('status' in response && response.status > 400) {
        throw new Error("Response status ".concat(response.status));
      }

      var entity = response.data || response;
      return entity;
    }
  }, {
    key: "unwrapRights",
    value: function unwrapRights(result) {
      return this.payloadListResponse('rights', result);
    }
  }, {
    key: "unwrapApplications",
    value: function unwrapApplications(result) {
      return this.payloadListResponse('applications', result);
    }
  }, {
    key: "unwrapApplication",
    value: function unwrapApplication(result) {
      return this.payloadSingleResponse(result);
    }
  }, {
    key: "unwrapDevices",
    value: function unwrapDevices(result) {
      return this.payloadListResponse('end_devices', result);
    }
  }, {
    key: "unwrapDevice",
    value: function unwrapDevice(result) {
      return this.payloadSingleResponse(result);
    }
  }, {
    key: "unwrapGateways",
    value: function unwrapGateways(result) {
      return this.payloadListResponse('gateways', result);
    }
  }, {
    key: "unwrapGateway",
    value: function unwrapGateway(result) {
      return this.payloadSingleResponse(result);
    }
  }, {
    key: "unwrapUser",
    value: function unwrapUser(result) {
      return this.payloadSingleResponse(result);
    }
  }, {
    key: "unwrapPacketBrokerNetworks",
    value: function unwrapPacketBrokerNetworks(result) {
      return this.payloadListResponse('networks', result);
    }
  }, {
    key: "unwrapPacketBrokerPolicies",
    value: function unwrapPacketBrokerPolicies(result) {
      return this.payloadListResponse('policies', result);
    }
  }, {
    key: "fieldMaskFromPatch",
    value: function fieldMaskFromPatch(patch, whitelist, remaps) {
      var paths = [];
      (0, _traverse["default"])(patch).map(function (x) {
        if (this.node instanceof Array) {
          // Add only the top level array path and do not recurse into arrays.
          paths.push(this.path.join('.'));
          this.update(undefined, true);
        } else if (this.isLeaf) {
          paths.push(this.path.join('.'));
        }
      }); // Field masks can sometimes be arbitrarily mapped to the actual message
      // structure (e.g. for oneoffs). Through the remap argument, it can be
      // accounted for that by remapping these paths.

      if (remaps) {
        paths = paths.map(function (path) {
          var _iterator = _createForOfIteratorHelper(remaps),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var remap = _step.value;

              if (path.startsWith(remap[0])) {
                return path.replace(remap[0], remap[1]);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return path;
        });
      } // If we have a whitelist provided, add paths only in the depth that the
      // whitelist allows and strip all other paths.


      if (whitelist) {
        paths = whitelist.reduce(function (acc, e) {
          if (paths.some(function (path) {
            return path.startsWith(e);
          })) {
            acc.push(e);
          }

          return acc;
        }, []);
      }

      return paths;
    }
    /**
     * This function will convert a paths object to a proper field mask.
     *
     * @param {object} paths - The raw field mask as array and/or string.
     * @returns {object} The field mask object ready to be attached to a request.
     */

  }, {
    key: "pathsToFieldMask",
    value: function pathsToFieldMask(paths) {
      if (!paths) {
        return;
      }

      return {
        field_mask: {
          paths: paths.map(function (e) {
            return e.join('.');
          })
        }
      };
    }
    /**
     * This function will convert a selector parameter and convert it to a
     * streamlined array of paths.
     *
     * @param {object} selector - The raw selector passed by the user.
     * @returns {object} The field mask object ready to be attached to a request.
     */

  }, {
    key: "selectorToPaths",
    value: function selectorToPaths(selector) {
      if (typeof selector === 'string') {
        return selector.split(',').map(function (e) {
          return e.split('.');
        });
      }

      if (selector instanceof Array) {
        return selector.map(function (e) {
          return typeof e === 'string' ? e.split('.') : e;
        });
      }

      return selector;
    }
    /**
     * This function will convert a selector parameter and convert it to a
     * proper field mask object, ready to be passed to the API.
     *
     * @param {object} selector - The raw selector passed by the user.
     * @returns {object} The field mask object ready to be attached to a request.
     */

  }, {
    key: "selectorToFieldMask",
    value: function selectorToFieldMask(selector) {
      return this.pathsToFieldMask(this.selectorToPaths(selector));
    }
  }, {
    key: "fieldMask",
    value: function fieldMask(_fieldMask) {
      return {
        paths: _fieldMask
      };
    }
  }, {
    key: "queryFieldMask",
    value: function queryFieldMask() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return {
        'field_mask.paths': fields
      };
    }
  }]);
  return Marshaler;
}();

var _default = Marshaler;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL21hcnNoYWxlci5qcyJdLCJuYW1lcyI6WyJNYXJzaGFsZXIiLCJvcHRpb25zIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInF1ZXJ5IiwiZmllbGRfbWFzayIsInBhdGhzIiwic2VsZWN0IiwicGFyYW1zIiwicXVlcnlTdHJpbmciLCJzdHJpbmdpZnkiLCJwYXlsb2FkIiwid3JhcCIsInJlcyIsImVudGl0eSIsImRhdGEiLCJoZWFkZXJzIiwibGlzdCIsInRvdGFsQ291bnQiLCJwYXJzZUludCIsImlzTmFOIiwicmVzcG9uc2UiLCJFcnJvciIsInN0YXR1cyIsInJlc3VsdCIsInBheWxvYWRMaXN0UmVzcG9uc2UiLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJwYXRjaCIsIndoaXRlbGlzdCIsInJlbWFwcyIsIm1hcCIsIngiLCJub2RlIiwiQXJyYXkiLCJwdXNoIiwicGF0aCIsImpvaW4iLCJ1cGRhdGUiLCJ1bmRlZmluZWQiLCJpc0xlYWYiLCJyZW1hcCIsInN0YXJ0c1dpdGgiLCJyZXBsYWNlIiwicmVkdWNlIiwiYWNjIiwiZSIsInNvbWUiLCJzZWxlY3RvciIsInNwbGl0IiwicGF0aHNUb0ZpZWxkTWFzayIsInNlbGVjdG9yVG9QYXRocyIsImZpZWxkTWFzayIsImZpZWxkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBQ0E7Ozs7Ozs7O0FBRUE7SUFDTUEsUzs7Ozs7OztXQUNKLGlCQUFlQyxRQUFmLEVBQXdCO0FBQ3RCLFVBQUlDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixRQUFaLEVBQXFCRyxNQUFyQixLQUFnQyxDQUFwQyxFQUF1QztBQUNyQyxlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFNQyxLQUFLLEdBQUcsRUFBZDs7QUFFQSxVQUFJLFlBQVlKLFFBQWhCLEVBQXlCO0FBQ3ZCSSxRQUFBQSxLQUFLLENBQUNDLFVBQU4sR0FBbUIsRUFBbkI7QUFDQUQsUUFBQUEsS0FBSyxDQUFDQyxVQUFO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VUFBQWUsQ0FBQztBQUFBLGlCQUFLLE9BQU9BLENBQVAsS0FBYSxRQUFiLEdBQXdCQSxDQUFDLENBQUNHLEtBQUYsQ0FBUSxHQUFSLENBQXhCLEdBQXVDSCxDQUE1QztBQUFBLFNBQWQsQ0FBUDtBQUNEOztBQUNELGFBQU9FLFFBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsNkJBQTJCQSxRQUEzQixFQUFxQztBQUNuQyxhQUFPLEtBQUtFLGdCQUFMLENBQXNCLEtBQUtDLGVBQUwsQ0FBcUJILFFBQXJCLENBQXRCLENBQVA7QUFDRDs7O1dBRUQsbUJBQWlCSSxVQUFqQixFQUE0QjtBQUMxQixhQUFPO0FBQUU3QyxRQUFBQSxLQUFLLEVBQUU2QztBQUFULE9BQVA7QUFDRDs7O1dBRUQsMEJBQW1DO0FBQUEsVUFBYkMsTUFBYSx1RUFBSixFQUFJO0FBQ2pDLGFBQU87QUFBRSw0QkFBb0JBO0FBQXRCLE9BQVA7QUFDRDs7Ozs7ZUFHWXJELFMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgYXJyYXktY2FsbGJhY2stcmV0dXJuICovXG5cbmltcG9ydCB0cmF2ZXJzZSBmcm9tICd0cmF2ZXJzZSdcbmltcG9ydCBxdWVyeVN0cmluZyBmcm9tICdxdWVyeS1zdHJpbmcnXG5cbi8qKiBDbGFzcyB1c2VkIHRvIG1hcnNoYWwgZGF0YSBzaGFwZXMuICovXG5jbGFzcyBNYXJzaGFsZXIge1xuICBzdGF0aWMgb3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeSA9IHt9XG5cbiAgICBpZiAoJ3NlbGVjdCcgaW4gb3B0aW9ucykge1xuICAgICAgcXVlcnkuZmllbGRfbWFzayA9IHt9XG4gICAgICBxdWVyeS5maWVsZF9tYXNrLnBhdGhzID0gb3B0aW9ucy5zZWxlY3RcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnlcbiAgfVxuXG4gIHN0YXRpYyBxdWVyeShwYXJhbXMpIHtcbiAgICByZXR1cm4gcXVlcnlTdHJpbmcuc3RyaW5naWZ5KHBhcmFtcylcbiAgfVxuXG4gIHN0YXRpYyBwYXlsb2FkKHBheWxvYWQsIHdyYXApIHtcbiAgICBsZXQgcmVzID0gcGF5bG9hZFxuXG4gICAgaWYgKHdyYXApIHtcbiAgICAgIHJlcyA9IHsgW3dyYXBdOiByZXMgfVxuICAgIH1cblxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIHN0YXRpYyBwYXlsb2FkTGlzdFJlc3BvbnNlKGVudGl0eSwgeyBkYXRhID0ge30sIGhlYWRlcnMgPSB7fSB9KSB7XG4gICAgY29uc3QgbGlzdCA9IGRhdGFbZW50aXR5XVxuXG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICByZXR1cm4geyBbZW50aXR5XTogW10sIHRvdGFsQ291bnQ6IDAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRvdGFsQ291bnQgPSBwYXJzZUludChoZWFkZXJzWyd4LXRvdGFsLWNvdW50J10pXG5cbiAgICBpZiAoaXNOYU4odG90YWxDb3VudCkpIHtcbiAgICAgIHJldHVybiB7IFtlbnRpdHldOiBsaXN0LCB0b3RhbENvdW50OiBsaXN0Lmxlbmd0aCB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgW2VudGl0eV06IGxpc3QsIHRvdGFsQ291bnQgfVxuICB9XG5cbiAgc3RhdGljIHBheWxvYWRTaW5nbGVSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgdHlwZTogJHt0eXBlb2YgcmVzcG9uc2V9YClcbiAgICB9XG4gICAgaWYgKCdzdGF0dXMnIGluIHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA+IDQwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZXNwb25zZSBzdGF0dXMgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICB9XG5cbiAgICBjb25zdCBlbnRpdHkgPSByZXNwb25zZS5kYXRhIHx8IHJlc3BvbnNlXG5cbiAgICByZXR1cm4gZW50aXR5XG4gIH1cblxuICBzdGF0aWMgdW53cmFwUmlnaHRzKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnBheWxvYWRMaXN0UmVzcG9uc2UoJ3JpZ2h0cycsIHJlc3VsdClcbiAgfVxuXG4gIHN0YXRpYyB1bndyYXBBcHBsaWNhdGlvbnMocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMucGF5bG9hZExpc3RSZXNwb25zZSgnYXBwbGljYXRpb25zJywgcmVzdWx0KVxuICB9XG5cbiAgc3RhdGljIHVud3JhcEFwcGxpY2F0aW9uKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBzdGF0aWMgdW53cmFwRGV2aWNlcyhyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy5wYXlsb2FkTGlzdFJlc3BvbnNlKCdlbmRfZGV2aWNlcycsIHJlc3VsdClcbiAgfVxuXG4gIHN0YXRpYyB1bndyYXBEZXZpY2UocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxuXG4gIHN0YXRpYyB1bndyYXBHYXRld2F5cyhyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy5wYXlsb2FkTGlzdFJlc3BvbnNlKCdnYXRld2F5cycsIHJlc3VsdClcbiAgfVxuXG4gIHN0YXRpYyB1bndyYXBHYXRld2F5KHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBzdGF0aWMgdW53cmFwVXNlcihyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgc3RhdGljIHVud3JhcFBhY2tldEJyb2tlck5ldHdvcmtzKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnBheWxvYWRMaXN0UmVzcG9uc2UoJ25ldHdvcmtzJywgcmVzdWx0KVxuICB9XG5cbiAgc3RhdGljIHVud3JhcFBhY2tldEJyb2tlclBvbGljaWVzKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnBheWxvYWRMaXN0UmVzcG9uc2UoJ3BvbGljaWVzJywgcmVzdWx0KVxuICB9XG5cbiAgc3RhdGljIGZpZWxkTWFza0Zyb21QYXRjaChwYXRjaCwgd2hpdGVsaXN0LCByZW1hcHMpIHtcbiAgICBsZXQgcGF0aHMgPSBbXVxuXG4gICAgdHJhdmVyc2UocGF0Y2gpLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgaWYgKHRoaXMubm9kZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIC8vIEFkZCBvbmx5IHRoZSB0b3AgbGV2ZWwgYXJyYXkgcGF0aCBhbmQgZG8gbm90IHJlY3Vyc2UgaW50byBhcnJheXMuXG4gICAgICAgIHBhdGhzLnB1c2godGhpcy5wYXRoLmpvaW4oJy4nKSlcbiAgICAgICAgdGhpcy51cGRhdGUodW5kZWZpbmVkLCB0cnVlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTGVhZikge1xuICAgICAgICBwYXRocy5wdXNoKHRoaXMucGF0aC5qb2luKCcuJykpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEZpZWxkIG1hc2tzIGNhbiBzb21ldGltZXMgYmUgYXJiaXRyYXJpbHkgbWFwcGVkIHRvIHRoZSBhY3R1YWwgbWVzc2FnZVxuICAgIC8vIHN0cnVjdHVyZSAoZS5nLiBmb3Igb25lb2ZmcykuIFRocm91Z2ggdGhlIHJlbWFwIGFyZ3VtZW50LCBpdCBjYW4gYmVcbiAgICAvLyBhY2NvdW50ZWQgZm9yIHRoYXQgYnkgcmVtYXBwaW5nIHRoZXNlIHBhdGhzLlxuICAgIGlmIChyZW1hcHMpIHtcbiAgICAgIHBhdGhzID0gcGF0aHMubWFwKHBhdGggPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHJlbWFwIG9mIHJlbWFwcykge1xuICAgICAgICAgIGlmIChwYXRoLnN0YXJ0c1dpdGgocmVtYXBbMF0pKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKHJlbWFwWzBdLCByZW1hcFsxXSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGhcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIHdoaXRlbGlzdCBwcm92aWRlZCwgYWRkIHBhdGhzIG9ubHkgaW4gdGhlIGRlcHRoIHRoYXQgdGhlXG4gICAgLy8gd2hpdGVsaXN0IGFsbG93cyBhbmQgc3RyaXAgYWxsIG90aGVyIHBhdGhzLlxuICAgIGlmICh3aGl0ZWxpc3QpIHtcbiAgICAgIHBhdGhzID0gd2hpdGVsaXN0LnJlZHVjZSgoYWNjLCBlKSA9PiB7XG4gICAgICAgIGlmIChwYXRocy5zb21lKHBhdGggPT4gcGF0aC5zdGFydHNXaXRoKGUpKSkge1xuICAgICAgICAgIGFjYy5wdXNoKGUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfSwgW10pXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhzXG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYXRocyBvYmplY3QgdG8gYSBwcm9wZXIgZmllbGQgbWFzay5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhdGhzIC0gVGhlIHJhdyBmaWVsZCBtYXNrIGFzIGFycmF5IGFuZC9vciBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBmaWVsZCBtYXNrIG9iamVjdCByZWFkeSB0byBiZSBhdHRhY2hlZCB0byBhIHJlcXVlc3QuXG4gICAqL1xuICBzdGF0aWMgcGF0aHNUb0ZpZWxkTWFzayhwYXRocykge1xuICAgIGlmICghcGF0aHMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICByZXR1cm4geyBmaWVsZF9tYXNrOiB7IHBhdGhzOiBwYXRocy5tYXAoZSA9PiBlLmpvaW4oJy4nKSkgfSB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBzZWxlY3RvciBwYXJhbWV0ZXIgYW5kIGNvbnZlcnQgaXQgdG8gYVxuICAgKiBzdHJlYW1saW5lZCBhcnJheSBvZiBwYXRocy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNlbGVjdG9yIC0gVGhlIHJhdyBzZWxlY3RvciBwYXNzZWQgYnkgdGhlIHVzZXIuXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBmaWVsZCBtYXNrIG9iamVjdCByZWFkeSB0byBiZSBhdHRhY2hlZCB0byBhIHJlcXVlc3QuXG4gICAqL1xuICBzdGF0aWMgc2VsZWN0b3JUb1BhdGhzKHNlbGVjdG9yKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcChlID0+IGUuc3BsaXQoJy4nKSlcbiAgICB9XG4gICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rvci5tYXAoZSA9PiAodHlwZW9mIGUgPT09ICdzdHJpbmcnID8gZS5zcGxpdCgnLicpIDogZSkpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RvclxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgc2VsZWN0b3IgcGFyYW1ldGVyIGFuZCBjb252ZXJ0IGl0IHRvIGFcbiAgICogcHJvcGVyIGZpZWxkIG1hc2sgb2JqZWN0LCByZWFkeSB0byBiZSBwYXNzZWQgdG8gdGhlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNlbGVjdG9yIC0gVGhlIHJhdyBzZWxlY3RvciBwYXNzZWQgYnkgdGhlIHVzZXIuXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBmaWVsZCBtYXNrIG9iamVjdCByZWFkeSB0byBiZSBhdHRhY2hlZCB0byBhIHJlcXVlc3QuXG4gICAqL1xuICBzdGF0aWMgc2VsZWN0b3JUb0ZpZWxkTWFzayhzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLnBhdGhzVG9GaWVsZE1hc2sodGhpcy5zZWxlY3RvclRvUGF0aHMoc2VsZWN0b3IpKVxuICB9XG5cbiAgc3RhdGljIGZpZWxkTWFzayhmaWVsZE1hc2spIHtcbiAgICByZXR1cm4geyBwYXRoczogZmllbGRNYXNrIH1cbiAgfVxuXG4gIHN0YXRpYyBxdWVyeUZpZWxkTWFzayhmaWVsZHMgPSBbXSkge1xuICAgIHJldHVybiB7ICdmaWVsZF9tYXNrLnBhdGhzJzogZmllbGRzIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXJzaGFsZXJcbiJdfQ==