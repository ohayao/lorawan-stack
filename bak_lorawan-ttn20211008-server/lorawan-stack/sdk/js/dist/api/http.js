"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = require("lodash");

var _token = _interopRequireDefault(require("../util/token"));

var _events = _interopRequireDefault(require("../util/events"));

var _constants = require("../util/constants");

var _streamNode = _interopRequireDefault(require("./stream/stream-node"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Http Class is a connector for the API that uses the HTTP bridge to connect.
 */
var Http = /*#__PURE__*/function () {
  function Http(authorization, stackConfig) {
    var axiosConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, Http);

    if ((0, _typeof2["default"])(authorization) !== 'object' || authorization === null) {
      throw new Error('No authorization settings provided');
    }

    var authToken;
    var csrfToken;

    if (authorization.mode === _constants.AUTHORIZATION_MODES.KEY) {
      if (typeof authorization.key !== 'string' && typeof authorization.key !== 'function') {
        throw new Error('No valid key provided for key authorization');
      }

      authToken = new _token["default"](authorization.key).get();
    } else if (authorization.mode === _constants.AUTHORIZATION_MODES.SESSION && typeof authorization.csrfToken === 'string') {
      csrfToken = authorization.csrfToken;
    }

    this._stackConfig = stackConfig;
    var stackComponents = stackConfig.availableComponents;
    var instances = stackComponents.reduce(function (acc, curr) {
      var componentUrl = stackConfig.getComponentUrlByName(curr);

      if (componentUrl) {
        acc[curr] = _axios["default"].create(_objectSpread(_objectSpread({}, axiosConfig), {}, {
          baseURL: componentUrl,
          headers: _objectSpread(_objectSpread(_objectSpread({}, typeof authToken === 'string' ? {
            Authorization: "Bearer ".concat(authToken)
          } : {}), Boolean(csrfToken) ? {
            'X-CSRF-Token': csrfToken
          } : {}), axiosConfig.headers || {})
        }));
      }

      return acc;
    }, {});

    for (var instance in instances) {
      this[instance] = instances[instance]; // Re-evaluate headers on each request if token is a thunk. This can be
      // useful if the token needs to be refreshed frequently, as the case for
      // access tokens.

      if (typeof authToken === 'function') {
        this[instance].interceptors.request.use( /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(config) {
            var tkn;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return authToken();

                  case 2:
                    tkn = _context.sent.access_token;
                    config.headers.Authorization = "Bearer ".concat(tkn);
                    return _context.abrupt("return", config);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(), function (err) {
          return Promise.reject(err);
        });
      }
    }
  }

  (0, _createClass2["default"])(Http, [{
    key: "handleRequest",
    value: function () {
      var _handleRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(method, endpoint, component) {
        var _this = this;

        var payload,
            isStream,
            parsedComponent,
            _ret,
            error,
            _args3 = arguments;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                payload = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                isStream = _args3.length > 4 ? _args3[4] : undefined;
                parsedComponent = component || this._parseStackComponent(endpoint);

                if (this._stackConfig.isComponentAvailable(parsedComponent)) {
                  _context3.next = 5;
                  break;
                }

                throw new Error("Cannot run \"".concat(method.toUpperCase(), " ").concat(endpoint, "\" API call on disabled component: \"").concat(parsedComponent, "\""));

              case 5:
                _context3.prev = 5;
                return _context3.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                  var url, config, statusCode, response, retryAfter, limit, retries, key;
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!isStream) {
                            _context2.next = 3;
                            break;
                          }

                          url = _this._stackConfig.getComponentUrlByName(parsedComponent) + endpoint;
                          return _context2.abrupt("return", {
                            v: (0, _streamNode["default"])(payload, url)
                          });

                        case 3:
                          config = {
                            method: method,
                            url: endpoint
                          };

                          if (method === 'get' || method === 'delete') {
                            // For GETs and DELETEs, convert payload to query params (should usually
                            // be field_mask only).
                            config.params = _this._payloadToQueryParams(payload);
                          } else {
                            // Otherwise pass data as request body.
                            config.data = payload;
                          }

                          retries = 0;

                        case 6:
                          if (!(statusCode === undefined || statusCode === 429)) {
                            _context2.next = 30;
                            break;
                          }

                          if (!(statusCode === 429 && retryAfter !== undefined)) {
                            _context2.next = 11;
                            break;
                          }

                          // Dispatch a warning event to note the user about the waiting time
                          // resulting from the rate limitation.
                          _events["default"].dispatchEvent(_events["default"].EVENTS.WARNING, "The rate limitation of ".concat(limit, " requests per minute was exceeded while making a request. It will be automatically retried when the rate limiter resets.")); // Sleep until the cool down elapsed before retrying.
                          // eslint-disable-next-line no-await-in-loop


                          _context2.next = 11;
                          return new Promise(function (resolve) {
                            return setTimeout(resolve, retryAfter * 1000);
                          });

                        case 11:
                          _context2.prev = 11;
                          _context2.next = 14;
                          return _this[parsedComponent](config);

                        case 14:
                          response = _context2.sent;
                          statusCode = response.status;
                          _context2.next = 27;
                          break;

                        case 18:
                          _context2.prev = 18;
                          _context2.t0 = _context2["catch"](11);

                          if (!((0, _lodash.isObject)(_context2.t0) && 'response' in _context2.t0 && (0, _lodash.isObject)(_context2.t0.response) && 'status' in _context2.t0.response && _context2.t0.response.status === 429 && retries <= _constants.RATE_LIMIT_RETRIES)) {
                            _context2.next = 26;
                            break;
                          }

                          statusCode = 429; // Always wait at least one second to avoid retries in quick succession.

                          retryAfter = Math.max(1, parseInt(_context2.t0.response.headers['x-rate-limit-retry']));
                          limit = _context2.t0.response.headers['x-rate-limit-limit'];
                          _context2.next = 27;
                          break;

                        case 26:
                          throw _context2.t0;

                        case 27:
                          retries++;
                          _context2.next = 6;
                          break;

                        case 30:
                          for (key in response.headers) {
                            if (!(key.toLowerCase() in response.headers)) {
                              // Normalize capitalized HTTP/1 headers to lowercase HTTP/2 headers.
                              response.headers[key.toLowerCase()] = response.headers[key];
                            }
                          }

                          if ('x-warning' in response.headers) {
                            // Dispatch a warning event when the server has set a warning header.
                            _events["default"].dispatchEvent(_events["default"].EVENTS.WARNING, response.headers['x-warning']);
                          }

                          return _context2.abrupt("return", {
                            v: response
                          });

                        case 33:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[11, 18]]);
                })(), "t0", 7);

              case 7:
                _ret = _context3.t0;

                if (!((0, _typeof2["default"])(_ret) === "object")) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", _ret.v);

              case 10:
                _context3.next = 20;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t1 = _context3["catch"](5);

                if (!((0, _lodash.isObject)(_context3.t1) && 'response' in _context3.t1 && _context3.t1.response && 'data' in _context3.t1.response)) {
                  _context3.next = 19;
                  break;
                }

                error = (0, _lodash.cloneDeep)(_context3.t1.response.data);
                throw error;

              case 19:
                throw _context3.t1;

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 12]]);
      }));

      function handleRequest(_x2, _x3, _x4) {
        return _handleRequest.apply(this, arguments);
      }

      return handleRequest;
    }()
    /**
     * Converts a payload object to a query parameter object, making sure that the
     * field mask parameter is converted correctly.
     *
     * @param {object} payload - The payload object.
     * @returns {object} The params object, to be passed to axios config.
     */

  }, {
    key: "_payloadToQueryParams",
    value: function _payloadToQueryParams(payload) {
      var res = _objectSpread({}, payload);

      if (payload && Object.keys(payload).length > 0) {
        if ('field_mask' in payload) {
          // Convert field mask prop to a query param friendly format
          res.field_mask = payload.field_mask.paths.join(',');
        }

        return res;
      }
    }
    /**
     * Extracts The Things Stack component abbreviation from the endpoint.
     *
     * @param {string} endpoint - The endpoint got for a request method.
     * @returns {string} The stack component abbreviation.
     */

  }, {
    key: "_parseStackComponent",
    value: function _parseStackComponent(endpoint) {
      try {
        var component = endpoint.split('/')[1];
        return Boolean(_constants.URI_PREFIX_STACK_COMPONENT_MAP[component]) ? _constants.URI_PREFIX_STACK_COMPONENT_MAP[component] : _constants.STACK_COMPONENTS_MAP.is;
      } catch (err) {
        throw new Error('Unable to extract The Things Stack component:', endpoint);
      }
    }
  }]);
  return Http;
}();

var _default = Http;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvaHR0cC5qcyJdLCJuYW1lcyI6WyJIdHRwIiwiYXV0aG9yaXphdGlvbiIsInN0YWNrQ29uZmlnIiwiYXhpb3NDb25maWciLCJFcnJvciIsImF1dGhUb2tlbiIsImNzcmZUb2tlbiIsIm1vZGUiLCJBVVRIT1JJWkFUSU9OX01PREVTIiwiS0VZIiwia2V5IiwiVG9rZW4iLCJnZXQiLCJTRVNTSU9OIiwiX3N0YWNrQ29uZmlnIiwic3RhY2tDb21wb25lbnRzIiwiYXZhaWxhYmxlQ29tcG9uZW50cyIsImluc3RhbmNlcyIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJjb21wb25lbnRVcmwiLCJnZXRDb21wb25lbnRVcmxCeU5hbWUiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIkJvb2xlYW4iLCJpbnN0YW5jZSIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJjb25maWciLCJ0a24iLCJhY2Nlc3NfdG9rZW4iLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwibWV0aG9kIiwiZW5kcG9pbnQiLCJjb21wb25lbnQiLCJwYXlsb2FkIiwiaXNTdHJlYW0iLCJwYXJzZWRDb21wb25lbnQiLCJfcGFyc2VTdGFja0NvbXBvbmVudCIsImlzQ29tcG9uZW50QXZhaWxhYmxlIiwidG9VcHBlckNhc2UiLCJ1cmwiLCJwYXJhbXMiLCJfcGF5bG9hZFRvUXVlcnlQYXJhbXMiLCJkYXRhIiwicmV0cmllcyIsInN0YXR1c0NvZGUiLCJ1bmRlZmluZWQiLCJyZXRyeUFmdGVyIiwiRXZlbnRIYW5kbGVyIiwiZGlzcGF0Y2hFdmVudCIsIkVWRU5UUyIsIldBUk5JTkciLCJsaW1pdCIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwicmVzcG9uc2UiLCJzdGF0dXMiLCJSQVRFX0xJTUlUX1JFVFJJRVMiLCJNYXRoIiwibWF4IiwicGFyc2VJbnQiLCJ0b0xvd2VyQ2FzZSIsImVycm9yIiwicmVzIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImZpZWxkX21hc2siLCJwYXRocyIsImpvaW4iLCJzcGxpdCIsIlVSSV9QUkVGSVhfU1RBQ0tfQ09NUE9ORU5UX01BUCIsIlNUQUNLX0NPTVBPTkVOVFNfTUFQIiwiaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQU9BOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7SUFDTUEsSTtBQUNKLGdCQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUEwRDtBQUFBLFFBQWxCQyxXQUFrQix1RUFBSixFQUFJO0FBQUE7O0FBQ3hELFFBQUkseUJBQU9GLGFBQVAsTUFBeUIsUUFBekIsSUFBcUNBLGFBQWEsS0FBSyxJQUEzRCxFQUFpRTtBQUMvRCxZQUFNLElBQUlHLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0Q7O0FBQ0QsUUFBSUMsU0FBSjtBQUNBLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSUwsYUFBYSxDQUFDTSxJQUFkLEtBQXVCQywrQkFBb0JDLEdBQS9DLEVBQW9EO0FBQ2xELFVBQUksT0FBT1IsYUFBYSxDQUFDUyxHQUFyQixLQUE2QixRQUE3QixJQUF5QyxPQUFPVCxhQUFhLENBQUNTLEdBQXJCLEtBQTZCLFVBQTFFLEVBQXNGO0FBQ3BGLGNBQU0sSUFBSU4sS0FBSixDQUFVLDZDQUFWLENBQU47QUFDRDs7QUFDREMsTUFBQUEsU0FBUyxHQUFHLElBQUlNLGlCQUFKLENBQVVWLGFBQWEsQ0FBQ1MsR0FBeEIsRUFBNkJFLEdBQTdCLEVBQVo7QUFDRCxLQUxELE1BS08sSUFDTFgsYUFBYSxDQUFDTSxJQUFkLEtBQXVCQywrQkFBb0JLLE9BQTNDLElBQ0EsT0FBT1osYUFBYSxDQUFDSyxTQUFyQixLQUFtQyxRQUY5QixFQUdMO0FBQ0FBLE1BQUFBLFNBQVMsR0FBR0wsYUFBYSxDQUFDSyxTQUExQjtBQUNEOztBQUVELFNBQUtRLFlBQUwsR0FBb0JaLFdBQXBCO0FBQ0EsUUFBTWEsZUFBZSxHQUFHYixXQUFXLENBQUNj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b0IsdUJBQVUsYUFBSVAsUUFBSixDQUFhWixJQUF2QixDQXZGcEI7QUFBQSxzQkF5RlltQixLQXpGWjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7O0FBZ0dBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsK0JBQXNCNUIsT0FBdEIsRUFBK0I7QUFDN0IsVUFBTTZCLEdBQUcscUJBQVE3QixPQUFSLENBQVQ7O0FBQ0EsVUFBSUEsT0FBTyxJQUFJOEIsTUFBTSxDQUFDQyxJQUFQLENBQVkvQixPQUFaLEVBQXFCZ0MsTUFBckIsR0FBOEIsQ0FBN0MsRUFBZ0Q7QUFDOUMsWUFBSSxnQkFBZ0JoQyxPQUFwQixFQUE2QjtBQUMzQjtBQUNBNkIsVUFBQUEsR0FBRyxDQUFDSSxVQUFKLEdBQWlCakMsT0FBTyxDQUFDaUMsVUFBUixDQUFtQkMsS0FBbkIsQ0FBeUJDLElBQXpCLENBQThCLEdBQTlCLENBQWpCO0FBQ0Q7O0FBQ0QsZUFBT04sR0FBUDtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSw4QkFBcUIvQixRQUFyQixFQUErQjtBQUM3QixVQUFJO0FBQ0YsWUFBTUMsU0FBUyxHQUFHRCxRQUFRLENBQUNzQyxLQUFULENBQWUsR0FBZixFQUFvQixDQUFwQixDQUFsQjtBQUNBLGVBQU9sRCxPQUFPLENBQUNtRCwwQ0FBK0J0QyxTQUEvQixDQUFELENBQVAsR0FDSHNDLDBDQUErQnRDLFNBQS9CLENBREcsR0FFSHVDLGdDQUFxQkMsRUFGekI7QUFHRCxPQUxELENBS0UsT0FBTzdDLEdBQVAsRUFBWTtBQUNaLGNBQU0sSUFBSWhDLEtBQUosQ0FBVSwrQ0FBVixFQUEyRG9DLFFBQTNELENBQU47QUFDRDtBQUNGOzs7OztlQUdZeEMsSSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCDCqSAyMDE5IFRoZSBUaGluZ3MgTmV0d29yayBGb3VuZGF0aW9uLCBUaGUgVGhpbmdzIEluZHVzdHJpZXMgQi5WLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IHsgY2xvbmVEZWVwLCBpc09iamVjdCB9IGZyb20gJ2xvZGFzaCdcblxuaW1wb3J0IFRva2VuIGZyb20gJy4uL3V0aWwvdG9rZW4nXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4uL3V0aWwvZXZlbnRzJ1xuaW1wb3J0IHtcbiAgVVJJX1BSRUZJWF9TVEFDS19DT01QT05FTlRfTUFQLFxuICBTVEFDS19DT01QT05FTlRTX01BUCxcbiAgQVVUSE9SSVpBVElPTl9NT0RFUyxcbiAgUkFURV9MSU1JVF9SRVRSSUVTLFxufSBmcm9tICcuLi91dGlsL2NvbnN0YW50cydcblxuaW1wb3J0IHN0cmVhbSBmcm9tICcuL3N0cmVhbS9zdHJlYW0tbm9kZSdcblxuLyoqXG4gKiBIdHRwIENsYXNzIGlzIGEgY29ubmVjdG9yIGZvciB0aGUgQVBJIHRoYXQgdXNlcyB0aGUgSFRUUCBicmlkZ2UgdG8gY29ubmVjdC5cbiAqL1xuY2xhc3MgSHR0cCB7XG4gIGNvbnN0cnVjdG9yKGF1dGhvcml6YXRpb24sIHN0YWNrQ29uZmlnLCBheGlvc0NvbmZpZyA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBhdXRob3JpemF0aW9uICE9PSAnb2JqZWN0JyB8fCBhdXRob3JpemF0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGF1dGhvcml6YXRpb24gc2V0dGluZ3MgcHJvdmlkZWQnKVxuICAgIH1cbiAgICBsZXQgYXV0aFRva2VuXG4gICAgbGV0IGNzcmZUb2tlblxuICAgIGlmIChhdXRob3JpemF0aW9uLm1vZGUgPT09IEFVVEhPUklaQVRJT05fTU9ERVMuS0VZKSB7XG4gICAgICBpZiAodHlwZW9mIGF1dGhvcml6YXRpb24ua2V5ICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgYXV0aG9yaXphdGlvbi5rZXkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB2YWxpZCBrZXkgcHJvdmlkZWQgZm9yIGtleSBhdXRob3JpemF0aW9uJylcbiAgICAgIH1cbiAgICAgIGF1dGhUb2tlbiA9IG5ldyBUb2tlbihhdXRob3JpemF0aW9uLmtleSkuZ2V0KClcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgYXV0aG9yaXphdGlvbi5tb2RlID09PSBBVVRIT1JJWkFUSU9OX01PREVTLlNFU1NJT04gJiZcbiAgICAgIHR5cGVvZiBhdXRob3JpemF0aW9uLmNzcmZUb2tlbiA9PT0gJ3N0cmluZydcbiAgICApIHtcbiAgICAgIGNzcmZUb2tlbiA9IGF1dGhvcml6YXRpb24uY3NyZlRva2VuXG4gICAgfVxuXG4gICAgdGhpcy5fc3RhY2tDb25maWcgPSBzdGFja0NvbmZpZ1xuICAgIGNvbnN0IHN0YWNrQ29tcG9uZW50cyA9IHN0YWNrQ29uZmlnLmF2YWlsYWJsZUNvbXBvbmVudHNcbiAgICBjb25zdCBpbnN0YW5jZXMgPSBzdGFja0NvbXBvbmVudHMucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFVybCA9IHN0YWNrQ29uZmlnLmdldENvbXBvbmVudFVybEJ5TmFtZShjdXJyKVxuICAgICAgaWYgKGNvbXBvbmVudFVybCkge1xuICAgICAgICBhY2NbY3Vycl0gPSBheGlvcy5jcmVhdGUoe1xuICAgICAgICAgIC4uLmF4aW9zQ29uZmlnLFxuICAgICAgICAgIGJhc2VVUkw6IGNvbXBvbmVudFVybCxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAuLi4odHlwZW9mIGF1dGhUb2tlbiA9PT0gJ3N0cmluZycgPyB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthdXRoVG9rZW59YCB9IDoge30pLFxuICAgICAgICAgICAgLi4uKEJvb2xlYW4oY3NyZlRva2VuKSA/IHsgJ1gtQ1NSRi1Ub2tlbic6IGNzcmZUb2tlbiB9IDoge30pLFxuICAgICAgICAgICAgLi4uKGF4aW9zQ29uZmlnLmhlYWRlcnMgfHwge30pLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCB7fSlcblxuICAgIGZvciAoY29uc3QgaW5zdGFuY2UgaW4gaW5zdGFuY2VzKSB7XG4gICAgICB0aGlzW2luc3RhbmNlXSA9IGluc3RhbmNlc1tpbnN0YW5jZV1cblxuICAgICAgLy8gUmUtZXZhbHVhdGUgaGVhZGVycyBvbiBlYWNoIHJlcXVlc3QgaWYgdG9rZW4gaXMgYSB0aHVuay4gVGhpcyBjYW4gYmVcbiAgICAgIC8vIHVzZWZ1bCBpZiB0aGUgdG9rZW4gbmVlZHMgdG8gYmUgcmVmcmVzaGVkIGZyZXF1ZW50bHksIGFzIHRoZSBjYXNlIGZvclxuICAgICAgLy8gYWNjZXNzIHRva2Vucy5cbiAgICAgIGlmICh0eXBlb2YgYXV0aFRva2VuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXNbaW5zdGFuY2VdLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShcbiAgICAgICAgICBhc3luYyBjb25maWcgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGtuID0gKGF3YWl0IGF1dGhUb2tlbigpKS5hY2Nlc3NfdG9rZW5cbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dGtufWBcblxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyID0+IFByb21pc2UucmVqZWN0KGVyciksXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVSZXF1ZXN0KG1ldGhvZCwgZW5kcG9pbnQsIGNvbXBvbmVudCwgcGF5bG9hZCA9IHt9LCBpc1N0cmVhbSkge1xuICAgIGNvbnN0IHBhcnNlZENvbXBvbmVudCA9IGNvbXBvbmVudCB8fCB0aGlzLl9wYXJzZVN0YWNrQ29tcG9uZW50KGVuZHBvaW50KVxuICAgIGlmICghdGhpcy5fc3RhY2tDb25maWcuaXNDb21wb25lbnRBdmFpbGFibGUocGFyc2VkQ29tcG9uZW50KSkge1xuICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBoYXMgbm90IGJlZW4gZGVmaW5lZCBpbiBUaGUgVGhpbmdzIFN0YWNrIGNvbmZpZywgbWFrZSBub1xuICAgICAgLy8gcmVxdWVzdCBhbmQgdGhyb3cgYW4gZXJyb3IgaW5zdGVhZC5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBydW4gXCIke21ldGhvZC50b1VwcGVyQ2FzZSgpfSAke2VuZHBvaW50fVwiIEFQSSBjYWxsIG9uIGRpc2FibGVkIGNvbXBvbmVudDogXCIke3BhcnNlZENvbXBvbmVudH1cImAsXG4gICAgICApXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc1N0cmVhbSkge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zdGFja0NvbmZpZy5nZXRDb21wb25lbnRVcmxCeU5hbWUocGFyc2VkQ29tcG9uZW50KSArIGVuZHBvaW50XG4gICAgICAgIHJldHVybiBzdHJlYW0ocGF5bG9hZCwgdXJsKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICAgIH1cblxuICAgICAgaWYgKG1ldGhvZCA9PT0gJ2dldCcgfHwgbWV0aG9kID09PSAnZGVsZXRlJykge1xuICAgICAgICAvLyBGb3IgR0VUcyBhbmQgREVMRVRFcywgY29udmVydCBwYXlsb2FkIHRvIHF1ZXJ5IHBhcmFtcyAoc2hvdWxkIHVzdWFsbHlcbiAgICAgICAgLy8gYmUgZmllbGRfbWFzayBvbmx5KS5cbiAgICAgICAgY29uZmlnLnBhcmFtcyA9IHRoaXMuX3BheWxvYWRUb1F1ZXJ5UGFyYW1zKHBheWxvYWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UgcGFzcyBkYXRhIGFzIHJlcXVlc3QgYm9keS5cbiAgICAgICAgY29uZmlnLmRhdGEgPSBwYXlsb2FkXG4gICAgICB9XG5cbiAgICAgIGxldCBzdGF0dXNDb2RlLCByZXNwb25zZSwgcmV0cnlBZnRlciwgbGltaXRcbiAgICAgIGxldCByZXRyaWVzID0gMFxuXG4gICAgICB3aGlsZSAoc3RhdHVzQ29kZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXR1c0NvZGUgPT09IDQyOSkge1xuICAgICAgICBpZiAoc3RhdHVzQ29kZSA9PT0gNDI5ICYmIHJldHJ5QWZ0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIERpc3BhdGNoIGEgd2FybmluZyBldmVudCB0byBub3RlIHRoZSB1c2VyIGFib3V0IHRoZSB3YWl0aW5nIHRpbWVcbiAgICAgICAgICAvLyByZXN1bHRpbmcgZnJvbSB0aGUgcmF0ZSBsaW1pdGF0aW9uLlxuICAgICAgICAgIEV2ZW50SGFuZGxlci5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgRXZlbnRIYW5kbGVyLkVWRU5UUy5XQVJOSU5HLFxuICAgICAgICAgICAgYFRoZSByYXRlIGxpbWl0YXRpb24gb2YgJHtsaW1pdH0gcmVxdWVzdHMgcGVyIG1pbnV0ZSB3YXMgZXhjZWVkZWQgd2hpbGUgbWFraW5nIGEgcmVxdWVzdC4gSXQgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHJldHJpZWQgd2hlbiB0aGUgcmF0ZSBsaW1pdGVyIHJlc2V0cy5gLFxuICAgICAgICAgIClcblxuICAgICAgICAgIC8vIFNsZWVwIHVudGlsIHRoZSBjb29sIGRvd24gZWxhcHNlZCBiZWZvcmUgcmV0cnlpbmcuXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgcmV0cnlBZnRlciAqIDEwMDApKVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpc1twYXJzZWRDb21wb25lbnRdKGNvbmZpZylcbiAgICAgICAgICBzdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlzT2JqZWN0KGVycikgJiZcbiAgICAgICAgICAgICdyZXNwb25zZScgaW4gZXJyICYmXG4gICAgICAgICAgICBpc09iamVjdChlcnIucmVzcG9uc2UpICYmXG4gICAgICAgICAgICAnc3RhdHVzJyBpbiBlcnIucmVzcG9uc2UgJiZcbiAgICAgICAgICAgIGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQyOSAmJlxuICAgICAgICAgICAgcmV0cmllcyA8PSBSQVRFX0xJTUlUX1JFVFJJRVNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGUgPSA0MjlcbiAgICAgICAgICAgIC8vIEFsd2F5cyB3YWl0IGF0IGxlYXN0IG9uZSBzZWNvbmQgdG8gYXZvaWQgcmV0cmllcyBpbiBxdWljayBzdWNjZXNzaW9uLlxuICAgICAgICAgICAgcmV0cnlBZnRlciA9IE1hdGgubWF4KDEsIHBhcnNlSW50KGVyci5yZXNwb25zZS5oZWFkZXJzWyd4LXJhdGUtbGltaXQtcmV0cnknXSkpXG4gICAgICAgICAgICBsaW1pdCA9IGVyci5yZXNwb25zZS5oZWFkZXJzWyd4LXJhdGUtbGltaXQtbGltaXQnXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXRyaWVzKytcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gcmVzcG9uc2UuaGVhZGVycykge1xuICAgICAgICBpZiAoIShrZXkudG9Mb3dlckNhc2UoKSBpbiByZXNwb25zZS5oZWFkZXJzKSkge1xuICAgICAgICAgIC8vIE5vcm1hbGl6ZSBjYXBpdGFsaXplZCBIVFRQLzEgaGVhZGVycyB0byBsb3dlcmNhc2UgSFRUUC8yIGhlYWRlcnMuXG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVyc1trZXkudG9Mb3dlckNhc2UoKV0gPSByZXNwb25zZS5oZWFkZXJzW2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3gtd2FybmluZycgaW4gcmVzcG9uc2UuaGVhZGVycykge1xuICAgICAgICAvLyBEaXNwYXRjaCBhIHdhcm5pbmcgZXZlbnQgd2hlbiB0aGUgc2VydmVyIGhhcyBzZXQgYSB3YXJuaW5nIGhlYWRlci5cbiAgICAgICAgRXZlbnRIYW5kbGVyLmRpc3BhdGNoRXZlbnQoRXZlbnRIYW5kbGVyLkVWRU5UUy5XQVJOSU5HLCByZXNwb25zZS5oZWFkZXJzWyd4LXdhcm5pbmcnXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoaXNPYmplY3QoZXJyKSAmJiAncmVzcG9uc2UnIGluIGVyciAmJiBlcnIucmVzcG9uc2UgJiYgJ2RhdGEnIGluIGVyci5yZXNwb25zZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IGNsb25lRGVlcChlcnIucmVzcG9uc2UuZGF0YSlcblxuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgcGF5bG9hZCBvYmplY3QgdG8gYSBxdWVyeSBwYXJhbWV0ZXIgb2JqZWN0LCBtYWtpbmcgc3VyZSB0aGF0IHRoZVxuICAgKiBmaWVsZCBtYXNrIHBhcmFtZXRlciBpcyBjb252ZXJ0ZWQgY29ycmVjdGx5LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZCAtIFRoZSBwYXlsb2FkIG9iamVjdC5cbiAgICogQHJldHVybnMge29iamVjdH0gVGhlIHBhcmFtcyBvYmplY3QsIHRvIGJlIHBhc3NlZCB0byBheGlvcyBjb25maWcuXG4gICAqL1xuICBfcGF5bG9hZFRvUXVlcnlQYXJhbXMocGF5bG9hZCkge1xuICAgIGNvbnN0IHJlcyA9IHsgLi4ucGF5bG9hZCB9XG4gICAgaWYgKHBheWxvYWQgJiYgT2JqZWN0LmtleXMocGF5bG9hZCkubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCdmaWVsZF9tYXNrJyBpbiBwYXlsb2FkKSB7XG4gICAgICAgIC8vIENvbnZlcnQgZmllbGQgbWFzayBwcm9wIHRvIGEgcXVlcnkgcGFyYW0gZnJpZW5kbHkgZm9ybWF0XG4gICAgICAgIHJlcy5maWVsZF9tYXNrID0gcGF5bG9hZC5maWVsZF9tYXNrLnBhdGhzLmpvaW4oJywnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0cyBUaGUgVGhpbmdzIFN0YWNrIGNvbXBvbmVudCBhYmJyZXZpYXRpb24gZnJvbSB0aGUgZW5kcG9pbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCAtIFRoZSBlbmRwb2ludCBnb3QgZm9yIGEgcmVxdWVzdCBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzdGFjayBjb21wb25lbnQgYWJicmV2aWF0aW9uLlxuICAgKi9cbiAgX3BhcnNlU3RhY2tDb21wb25lbnQoZW5kcG9pbnQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tcG9uZW50ID0gZW5kcG9pbnQuc3BsaXQoJy8nKVsxXVxuICAgICAgcmV0dXJuIEJvb2xlYW4oVVJJX1BSRUZJWF9TVEFDS19DT01QT05FTlRfTUFQW2NvbXBvbmVudF0pXG4gICAgICAgID8gVVJJX1BSRUZJWF9TVEFDS19DT01QT05FTlRfTUFQW2NvbXBvbmVudF1cbiAgICAgICAgOiBTVEFDS19DT01QT05FTlRTX01BUC5pc1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZXh0cmFjdCBUaGUgVGhpbmdzIFN0YWNrIGNvbXBvbmVudDonLCBlbmRwb2ludClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cFxuIl19