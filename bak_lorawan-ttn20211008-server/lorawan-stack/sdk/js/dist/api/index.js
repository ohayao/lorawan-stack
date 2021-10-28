"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _apiDefinition = _interopRequireDefault(require("../../generated/api-definition.json"));

var _constants = require("../util/constants");

var _http = _interopRequireDefault(require("./http"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Api Class is an abstraction on the API connection which can use either the
 * HTTP or gRPC connector to communicate with The Things Stack for LoraWAN API
 * in order to expose the same class API for both.
 */
var Api = function Api() {
  var _this = this;

  var connectionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';
  var authorization = arguments.length > 1 ? arguments[1] : undefined;
  var stackConfig = arguments.length > 2 ? arguments[2] : undefined;
  var axiosConfig = arguments.length > 3 ? arguments[3] : undefined;
  (0, _classCallCheck2["default"])(this, Api);
  this.connectionType = connectionType;

  if (this.connectionType !== 'http') {
    throw new Error('Only http connection type is supported');
  }

  this._connector = new _http["default"](authorization, stackConfig, axiosConfig);
  var connector = this._connector;

  var _loop = function _loop() {
    var serviceName = _Object$keys[_i];
    var service = _apiDefinition["default"][serviceName];
    _this[serviceName] = {};

    var _loop2 = function _loop2() {
      var rpcName = _Object$keys2[_i2];
      var rpc = service[rpcName];

      _this[serviceName][rpcName] = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$routeParams = _ref.routeParams,
            routeParams = _ref$routeParams === void 0 ? {} : _ref$routeParams,
            component = _ref.component;

        var payload = arguments.length > 1 ? arguments[1] : undefined;
        var componentType = (0, _typeof2["default"])(component);

        if (componentType === 'string' && !_constants.STACK_COMPONENTS.includes(component)) {
          throw new Error("Unknown stack component: ".concat(component));
        }

        if (component && componentType !== 'string') {
          throw new Error("Invalid component argument type: ".concat((0, _typeof2["default"])(componentType)));
        }

        var paramSignature = Object.keys(routeParams).sort().join();
        var endpoint = rpc.http.find(function (prospect) {
          return prospect.parameters.sort().join() === paramSignature;
        });

        if (!endpoint) {
          throw new Error("The parameter signature did not match the one of the rpc.\nRpc: ".concat(serviceName, ".").concat(rpcName, "()\nSignature tried: ").concat(paramSignature));
        }

        var route = endpoint.pattern;
        var isStream = Boolean(endpoint.stream);

        var _iterator = _createForOfIteratorHelper(endpoint.parameters),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var parameter = _step.value;
            route = route.replace("{".concat(parameter, "}"), routeParams[parameter]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return connector.handleRequest(endpoint.method, route, component, payload, isStream);
      };

      _this[serviceName]["".concat(rpcName, "AllowedFieldMaskPaths")] = rpc.allowedFieldMaskPaths;
    };

    for (var _i2 = 0, _Object$keys2 = Object.keys(service); _i2 < _Object$keys2.length; _i2++) {
      _loop2();
    }
  };

  for (var _i = 0, _Object$keys = Object.keys(_apiDefinition["default"]); _i < _Object$keys.length; _i++) {
    _loop();
  }
};

var _default = Api;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaW5kZXguanMiXSwibmFtZXMiOlsiQXBpIiwiY29ubmVjdGlvblR5cGUiLCJhdXRob3JpemF0aW9uIiwic3RhY2tDb25maWciLCJheGlvc0NvbmZpZyIsIkVycm9yIiwiX2Nvbm5lY3RvciIsIkh0dHAiLCJjb25uZWN0b3IiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2UiLCJhcGlEZWZpbml0aW9uIiwicnBjTmFtZSIsInJwYyIsInJvdXRlUGFyYW1zIiwiY29tcG9uZW50IiwicGF5bG9hZCIsImNvbXBvbmVudFR5cGUiLCJTVEFDS19DT01QT05FTlRTIiwiaW5jbHVkZXMiLCJwYXJhbVNpZ25hdHVyZSIsIk9iamVjdCIsImtleXMiLCJzb3J0Iiwiam9pbiIsImVuZHBvaW50IiwiaHR0cCIsImZpbmQiLCJwcm9zcGVjdCIsInBhcmFtZXRlcnMiLCJyb3V0ZSIsInBhdHRlcm4iLCJpc1N0cmVhbSIsIkJvb2xlYW4iLCJzdHJlYW0iLCJwYXJhbWV0ZXIiLCJyZXBsYWNlIiwiaGFuZGxlUmVxdWVzdCIsIm1ldGhvZCIsImFsbG93ZWRGaWVsZE1hc2tQYXRocyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWNBOztBQUNBOztBQUVBOzs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDTUEsRyxHQUNKLGVBQThFO0FBQUE7O0FBQUEsTUFBbEVDLGNBQWtFLHVFQUFqRCxNQUFpRDtBQUFBLE1BQXpDQyxhQUF5QztBQUFBLE1BQTFCQyxXQUEwQjtBQUFBLE1BQWJDLFdBQWE7QUFBQTtBQUM1RSxPQUFLSCxjQUFMLEdBQXNCQSxjQUF0Qjs7QUFFQSxNQUFJLEtBQUtBLGNBQUwsS0FBd0IsTUFBNUIsRUFBb0M7QUFDbEMsVUFBTSxJQUFJSSxLQUFKLENBQVUsd0NBQVYsQ0FBTjtBQUNEOztBQUVELE9BQUtDLFVBQUwsR0FBa0IsSUFBSUMsZ0JBQUosQ0FBU0wsYUFBVCxFQUF3QkMsV0FBeEIsRUFBcUNDLFdBQXJDLENBQWxCO0FBQ0EsTUFBTUksU0FBUyxHQUFHLEtBQUtGLFVBQXZCOztBQVI0RTtBQVV2RSxRQUFNRyxXQUFXLG1CQUFqQjtBQUNILFFBQU1DLE9BQU8sR0FBR0MsMEJBQWNGLFdBQWQsQ0FBaEI7QUFFQSxJQUFBLEtBQUksQ0FBQ0EsV0FBRCxDQUFKLEdBQW9CLEVBQXBCOztBQWIwRTtBQWVyRSxVQUFNRyxPQUFPLHFCQUFiO0FBQ0gsVUFBTUMsR0FBRyxHQUFHSCxPQUFPLENBQUNFLE9BQUQsQ0FBbkI7O0FBRUEsTUFBQSxLQUFJLENBQUNILFdBQUQsQ0FBSixDQUFrQkcsT0FBbEIsSUFBNkIsWUFBbUQ7QUFBQSx1RkFBaEIsRUFBZ0I7QUFBQSxvQ0FBaERFLFdBQWdEO0FBQUEsWUFBaERBLFdBQWdELGlDQUFsQyxFQUFrQztBQUFBLFlBQTlCQyxTQUE4QixRQUE5QkEsU0FBOEI7O0FBQUEsWUFBWkMsT0FBWTtBQUM5RSxZQUFNQyxhQUFhLDRCQUFVRixTQUFWLENBQW5COztBQUNBLFlBQUlFLGFBQWEsS0FBSyxRQUFsQixJQUE4QixDQUFDQyw0QkFBaUJDLFFBQWpCLENBQTBCSixTQUExQixDQUFuQyxFQUF5RTtBQUN2RSxnQkFBTSxJQUFJVixLQUFKLG9DQUFzQ1UsU0FBdEMsRUFBTjtBQUNEOztBQUNELFlBQUlBLFNBQVMsSUFBSUUsYUFBYSxLQUFLLFFBQW5DLEVBQTZDO0FBQzNDLGdCQUFNLElBQUlaLEtBQUoscUVBQXFEWSxhQUFyRCxHQUFOO0FBQ0Q7O0FBRUQsWUFBTUcsY0FBYyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWVIsV0FBWixFQUF5QlMsSUFBekIsR0FBZ0NDLElBQWhDLEVBQXZCO0FBQ0EsWUFBTUMsUUFBUSxHQUFHWixHQUFHLENBQUNhLElBQUosQ0FBU0MsSUFBVCxDQUNmLFVBQUFDLFFBQVE7QUFBQSxpQkFBSUEsUUFBUSxDQUFDQyxVQUFULENBQW9CTixJQUFwQixHQUEyQkMsSUFBM0IsT0FBc0NKLGNBQTFDO0FBQUEsU0FETyxDQUFqQjs7QUFJQSxZQUFJLENBQUNLLFFBQUwsRUFBZTtBQUNiLGdCQUFNLElBQUlwQixLQUFKLDJFQUNYSSxXQURXLGNBQ0lHLE9BREosa0NBRUNRLGNBRkQsRUFBTjtBQUdEOztBQUVELFlBQUlVLEtBQUssR0FBR0wsUUFBUSxDQUFDTSxPQUFyQjtBQUNBLFlBQU1DLFFBQVEsR0FBR0MsT0FBTyxDQUFDUixRQUFRLENBQUNTLE1BQVYsQ0FBeEI7O0FBckI4RSxtREF1QnREVCxRQUFRLENBQUNJLFVBdkI2QztBQUFBOztBQUFBO0FBdUI5RSw4REFBNkM7QUFBQSxnQkFBbENNLFNBQWtDO0FBQzNDTCxZQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ00sT0FBTixZQUFrQkQsU0FBbEIsUUFBZ0NyQixXQUFXLENBQUNxQixTQUFELENBQTNDLENBQVI7QUFDRDtBQXpCNkU7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUEyQjlFLGVBQU8zQixTQUFTLENBQUM2QixhQUFWLENBQXdCWixRQUFRLENBQUNhLE1BQWpDLEVBQXlDUixLQUF6QyxFQUFnRGYsU0FBaEQsRUFBMkRDLE9BQTNELEVBQW9FZ0IsUUFBcEUsQ0FBUDtBQUNELE9BNUJEOztBQThCQSxNQUFBLEtBQUksQ0FBQ3ZCLFdBQUQsQ0FBSixXQUFxQkcsT0FBckIsOEJBQXVEQyxHQUFHLENBQUMwQixxQkFBM0Q7QUFoRHdFOztBQWUxRSxzQ0FBc0JsQixNQUFNLENBQUNDLElBQVAsQ0FBWVosT0FBWixDQUF0QixxQ0FBNEM7QUFBQTtBQWtDM0M7QUFqRHlFOztBQVU1RSxrQ0FBMEJXLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZWCx5QkFBWixDQUExQixrQ0FBc0Q7QUFBQTtBQXdDckQ7QUFDRixDOztlQUdZWCxHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IMKpIDIwMTkgVGhlIFRoaW5ncyBOZXR3b3JrIEZvdW5kYXRpb24sIFRoZSBUaGluZ3MgSW5kdXN0cmllcyBCLlYuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgYXBpRGVmaW5pdGlvbiBmcm9tICcuLi8uLi9nZW5lcmF0ZWQvYXBpLWRlZmluaXRpb24uanNvbidcbmltcG9ydCB7IFNUQUNLX0NPTVBPTkVOVFMgfSBmcm9tICcuLi91dGlsL2NvbnN0YW50cydcblxuaW1wb3J0IEh0dHAgZnJvbSAnLi9odHRwJ1xuXG4vKipcbiAqIEFwaSBDbGFzcyBpcyBhbiBhYnN0cmFjdGlvbiBvbiB0aGUgQVBJIGNvbm5lY3Rpb24gd2hpY2ggY2FuIHVzZSBlaXRoZXIgdGhlXG4gKiBIVFRQIG9yIGdSUEMgY29ubmVjdG9yIHRvIGNvbW11bmljYXRlIHdpdGggVGhlIFRoaW5ncyBTdGFjayBmb3IgTG9yYVdBTiBBUElcbiAqIGluIG9yZGVyIHRvIGV4cG9zZSB0aGUgc2FtZSBjbGFzcyBBUEkgZm9yIGJvdGguXG4gKi9cbmNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25UeXBlID0gJ2h0dHAnLCBhdXRob3JpemF0aW9uLCBzdGFja0NvbmZpZywgYXhpb3NDb25maWcpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gY29ubmVjdGlvblR5cGVcblxuICAgIGlmICh0aGlzLmNvbm5lY3Rpb25UeXBlICE9PSAnaHR0cCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT25seSBodHRwIGNvbm5lY3Rpb24gdHlwZSBpcyBzdXBwb3J0ZWQnKVxuICAgIH1cblxuICAgIHRoaXMuX2Nvbm5lY3RvciA9IG5ldyBIdHRwKGF1dGhvcml6YXRpb24sIHN0YWNrQ29uZmlnLCBheGlvc0NvbmZpZylcbiAgICBjb25zdCBjb25uZWN0b3IgPSB0aGlzLl9jb25uZWN0b3JcblxuICAgIGZvciAoY29uc3Qgc2VydmljZU5hbWUgb2YgT2JqZWN0LmtleXMoYXBpRGVmaW5pdGlvbikpIHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBhcGlEZWZpbml0aW9uW3NlcnZpY2VOYW1lXVxuXG4gICAgICB0aGlzW3NlcnZpY2VOYW1lXSA9IHt9XG5cbiAgICAgIGZvciAoY29uc3QgcnBjTmFtZSBvZiBPYmplY3Qua2V5cyhzZXJ2aWNlKSkge1xuICAgICAgICBjb25zdCBycGMgPSBzZXJ2aWNlW3JwY05hbWVdXG5cbiAgICAgICAgdGhpc1tzZXJ2aWNlTmFtZV1bcnBjTmFtZV0gPSAoeyByb3V0ZVBhcmFtcyA9IHt9LCBjb21wb25lbnQgfSA9IHt9LCBwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29tcG9uZW50VHlwZSA9IHR5cGVvZiBjb21wb25lbnRcbiAgICAgICAgICBpZiAoY29tcG9uZW50VHlwZSA9PT0gJ3N0cmluZycgJiYgIVNUQUNLX0NPTVBPTkVOVFMuaW5jbHVkZXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHN0YWNrIGNvbXBvbmVudDogJHtjb21wb25lbnR9YClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnRUeXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbXBvbmVudCBhcmd1bWVudCB0eXBlOiAke3R5cGVvZiBjb21wb25lbnRUeXBlfWApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcGFyYW1TaWduYXR1cmUgPSBPYmplY3Qua2V5cyhyb3V0ZVBhcmFtcykuc29ydCgpLmpvaW4oKVxuICAgICAgICAgIGNvbnN0IGVuZHBvaW50ID0gcnBjLmh0dHAuZmluZChcbiAgICAgICAgICAgIHByb3NwZWN0ID0+IHByb3NwZWN0LnBhcmFtZXRlcnMuc29ydCgpLmpvaW4oKSA9PT0gcGFyYW1TaWduYXR1cmUsXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKCFlbmRwb2ludCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcGFyYW1ldGVyIHNpZ25hdHVyZSBkaWQgbm90IG1hdGNoIHRoZSBvbmUgb2YgdGhlIHJwYy5cblJwYzogJHtzZXJ2aWNlTmFtZX0uJHtycGNOYW1lfSgpXG5TaWduYXR1cmUgdHJpZWQ6ICR7cGFyYW1TaWduYXR1cmV9YClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcm91dGUgPSBlbmRwb2ludC5wYXR0ZXJuXG4gICAgICAgICAgY29uc3QgaXNTdHJlYW0gPSBCb29sZWFuKGVuZHBvaW50LnN0cmVhbSlcblxuICAgICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIGVuZHBvaW50LnBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIHJvdXRlID0gcm91dGUucmVwbGFjZShgeyR7cGFyYW1ldGVyfX1gLCByb3V0ZVBhcmFtc1twYXJhbWV0ZXJdKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBjb25uZWN0b3IuaGFuZGxlUmVxdWVzdChlbmRwb2ludC5tZXRob2QsIHJvdXRlLCBjb21wb25lbnQsIHBheWxvYWQsIGlzU3RyZWFtKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpc1tzZXJ2aWNlTmFtZV1bYCR7cnBjTmFtZX1BbGxvd2VkRmllbGRNYXNrUGF0aHNgXSA9IHJwYy5hbGxvd2VkRmllbGRNYXNrUGF0aHNcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBpXG4iXX0=