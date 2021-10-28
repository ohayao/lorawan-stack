"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _marshaler = _interopRequireDefault(require("../util/marshaler"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var remaps = [['nats', 'provider.nats'], ['mqtt', 'provider.mqtt']];

var PubSub = /*#__PURE__*/function () {
  function PubSub(registry) {
    (0, _classCallCheck2["default"])(this, PubSub);
    this._api = registry;
  }

  (0, _createClass2["default"])(PubSub, [{
    key: "_fillZeroValues",
    value: function _fillZeroValues(pubsub, paths) {
      // Add zero values that would otherwise be swallowed by the http bridge.
      if ((paths.includes('provider.mqtt') || paths.includes('provider.mqtt.publish_qos')) && 'mqtt' in pubsub && !('publish_qos' in pubsub.mqtt)) {
        pubsub.mqtt.publish_qos = 'AT_MOST_ONCE';
      }

      if ((paths.includes('provider.mqtt') || paths.includes('provider.mqtt.subscribe_qos')) && 'mqtt' in pubsub && !('subscribe_qos' in pubsub.mqtt)) {
        pubsub.mqtt.subscribe_qos = 'AT_MOST_ONCE';
      }

      if ((paths.includes('provider.mqtt') || paths.includes('provider.mqtt.use_tls')) && 'mqtt' in pubsub && !('use_tls' in pubsub.mqtt)) {
        pubsub.mqtt.use_tls = false;
      }
    }
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(appId, selector) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._api.List({
                  routeParams: {
                    'application_ids.application_id': appId
                  }
                }, _objectSpread({}, _marshaler["default"].selectorToFieldMask(selector)));

              case 2:
                result = _context.sent;
                return _context.abrupt("return", _marshaler["default"].payloadListResponse('pubsubs', result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, pubsub) {
        var mask,
            result,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mask = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : _marshaler["default"].fieldMaskFromPatch(pubsub, this._api.SetAllowedFieldMaskPaths, remaps);
                _context2.next = 3;
                return this._api.Set({
                  routeParams: {
                    'pubsub.ids.application_ids.application_id': appId
                  }
                }, {
                  pubsub: pubsub,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appId, pubsubId, selector) {
        var fieldMask, paths, result, pubsub;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fieldMask = _marshaler["default"].selectorToFieldMask(selector);
                paths = fieldMask.field_mask.paths;
                _context3.next = 4;
                return this._api.Get({
                  routeParams: {
                    'ids.application_ids.application_id': appId,
                    'ids.pub_sub_id': pubsubId
                  }
                }, fieldMask);

              case 4:
                result = _context3.sent;
                pubsub = _marshaler["default"].payloadSingleResponse(result);

                this._fillZeroValues(pubsub, paths);

                return _context3.abrupt("return", pubsub);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getById(_x5, _x6, _x7) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "updateById",
    value: function () {
      var _updateById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(appId, pubsubId, patch) {
        var mask,
            result,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                mask = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : _marshaler["default"].fieldMaskFromPatch(patch, this._api.SetAllowedFieldMaskPaths, remaps);
                _context4.next = 3;
                return this._api.Set({
                  routeParams: {
                    'pubsub.ids.application_ids.application_id': appId,
                    'pubsub.ids.pub_sub_id': pubsubId
                  }
                }, {
                  pubsub: patch,
                  field_mask: _marshaler["default"].fieldMask(mask)
                });

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateById(_x8, _x9, _x10) {
        return _updateById.apply(this, arguments);
      }

      return updateById;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(appId, pubsubId) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._api.Delete({
                  routeParams: {
                    'application_ids.application_id': appId,
                    pub_sub_id: pubsubId
                  }
                });

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteById(_x11, _x12) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "getFormats",
    value: function () {
      var _getFormats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._api.GetFormats();

              case 2:
                result = _context6.sent;
                return _context6.abrupt("return", _marshaler["default"].payloadSingleResponse(result));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getFormats() {
        return _getFormats.apply(this, arguments);
      }

      return getFormats;
    }()
  }]);
  return PubSub;
}();

var _default = PubSub;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3B1YnN1YnMuanMiXSwibmFtZXMiOlsicmVtYXBzIiwiUHViU3ViIiwicmVnaXN0cnkiLCJfYXBpIiwicHVic3ViIiwicGF0aHMiLCJpbmNsdWRlcyIsIm1xdHQiLCJwdWJsaXNoX3FvcyIsInN1YnNjcmliZV9xb3MiLCJ1c2VfdGxzIiwiYXBwSWQiLCJzZWxlY3RvciIsIkxpc3QiLCJyb3V0ZVBhcmFtcyIsIk1hcnNoYWxlciIsInNlbGVjdG9yVG9GaWVsZE1hc2siLCJyZXN1bHQiLCJwYXlsb2FkTGlzdFJlc3BvbnNlIiwibWFzayIsImZpZWxkTWFza0Zyb21QYXRjaCIsIlNldEFsbG93ZWRGaWVsZE1hc2tQYXRocyIsIlNldCIsImZpZWxkX21hc2siLCJmaWVsZE1hc2siLCJwYXlsb2FkU2luZ2xlUmVzcG9uc2UiLCJwdWJzdWJJZCIsIkdldCIsIl9maWxsWmVyb1ZhbHVlcyIsInBhdGNoIiwiRGVsZXRlIiwicHViX3N1Yl9pZCIsIkdldEZvcm1hdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLENBQ2IsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQURhLEVBRWIsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUZhLENBQWY7O0lBS01DLE07QUFDSixrQkFBWUMsUUFBWixFQUFzQjtBQUFBO0FBQ3BCLFNBQUtDLElBQUwsR0FBWUQsUUFBWjtBQUNEOzs7O1dBRUQseUJBQWdCRSxNQUFoQixFQUF3QkMsS0FBeEIsRUFBK0I7QUFDN0I7QUFDQSxVQUNFLENBQUNBLEtBQUssQ0FBQ0MsUUFBTixDQUFlLGVBQWYsS0FBbUNELEtBQUssQ0FBQ0MsUUFBTixDQUFlLDJCQUFmLENBQXBDLEtBQ0EsVUFBVUYsTUFEVixJQUVBLEVBQUUsaUJBQWlCQSxNQUFNLENBQUNHLElBQTFCLENBSEYsRUFJRTtBQUNBSCxRQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FBWUMsV0FBWixHQUEw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VixDQUFnQ1IsTUFBaEMsQ0FIVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7Ozs7ZUFPYWhCLE0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgwqkgMjAxOSBUaGUgVGhpbmdzIE5ldHdvcmsgRm91bmRhdGlvbiwgVGhlIFRoaW5ncyBJbmR1c3RyaWVzIEIuVi5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBNYXJzaGFsZXIgZnJvbSAnLi4vdXRpbC9tYXJzaGFsZXInXG5cbmNvbnN0IHJlbWFwcyA9IFtcbiAgWyduYXRzJywgJ3Byb3ZpZGVyLm5hdHMnXSxcbiAgWydtcXR0JywgJ3Byb3ZpZGVyLm1xdHQnXSxcbl1cblxuY2xhc3MgUHViU3ViIHtcbiAgY29uc3RydWN0b3IocmVnaXN0cnkpIHtcbiAgICB0aGlzLl9hcGkgPSByZWdpc3RyeVxuICB9XG5cbiAgX2ZpbGxaZXJvVmFsdWVzKHB1YnN1YiwgcGF0aHMpIHtcbiAgICAvLyBBZGQgemVybyB2YWx1ZXMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYmUgc3dhbGxvd2VkIGJ5IHRoZSBodHRwIGJyaWRnZS5cbiAgICBpZiAoXG4gICAgICAocGF0aHMuaW5jbHVkZXMoJ3Byb3ZpZGVyLm1xdHQnKSB8fCBwYXRocy5pbmNsdWRlcygncHJvdmlkZXIubXF0dC5wdWJsaXNoX3FvcycpKSAmJlxuICAgICAgJ21xdHQnIGluIHB1YnN1YiAmJlxuICAgICAgISgncHVibGlzaF9xb3MnIGluIHB1YnN1Yi5tcXR0KVxuICAgICkge1xuICAgICAgcHVic3ViLm1xdHQucHVibGlzaF9xb3MgPSAnQVRfTU9TVF9PTkNFJ1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChwYXRocy5pbmNsdWRlcygncHJvdmlkZXIubXF0dCcpIHx8IHBhdGhzLmluY2x1ZGVzKCdwcm92aWRlci5tcXR0LnN1YnNjcmliZV9xb3MnKSkgJiZcbiAgICAgICdtcXR0JyBpbiBwdWJzdWIgJiZcbiAgICAgICEoJ3N1YnNjcmliZV9xb3MnIGluIHB1YnN1Yi5tcXR0KVxuICAgICkge1xuICAgICAgcHVic3ViLm1xdHQuc3Vic2NyaWJlX3FvcyA9ICdBVF9NT1NUX09OQ0UnXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKHBhdGhzLmluY2x1ZGVzKCdwcm92aWRlci5tcXR0JykgfHwgcGF0aHMuaW5jbHVkZXMoJ3Byb3ZpZGVyLm1xdHQudXNlX3RscycpKSAmJlxuICAgICAgJ21xdHQnIGluIHB1YnN1YiAmJlxuICAgICAgISgndXNlX3RscycgaW4gcHVic3ViLm1xdHQpXG4gICAgKSB7XG4gICAgICBwdWJzdWIubXF0dC51c2VfdGxzID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRBbGwoYXBwSWQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLkxpc3QoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7ICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLi4uTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpLFxuICAgICAgfSxcbiAgICApXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRMaXN0UmVzcG9uc2UoJ3B1YnN1YnMnLCByZXN1bHQpXG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgYXBwSWQsXG4gICAgcHVic3ViLFxuICAgIG1hc2sgPSBNYXJzaGFsZXIuZmllbGRNYXNrRnJvbVBhdGNoKHB1YnN1YiwgdGhpcy5fYXBpLlNldEFsbG93ZWRGaWVsZE1hc2tQYXRocywgcmVtYXBzKSxcbiAgKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYXBpLlNldChcbiAgICAgIHtcbiAgICAgICAgcm91dGVQYXJhbXM6IHtcbiAgICAgICAgICAncHVic3ViLmlkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHB1YnN1YixcbiAgICAgICAgZmllbGRfbWFzazogTWFyc2hhbGVyLmZpZWxkTWFzayhtYXNrKSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZ2V0QnlJZChhcHBJZCwgcHVic3ViSWQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZmllbGRNYXNrID0gTWFyc2hhbGVyLnNlbGVjdG9yVG9GaWVsZE1hc2soc2VsZWN0b3IpXG4gICAgY29uc3QgcGF0aHMgPSBmaWVsZE1hc2suZmllbGRfbWFzay5wYXRoc1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXQoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ2lkcy5hcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgICAnaWRzLnB1Yl9zdWJfaWQnOiBwdWJzdWJJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmaWVsZE1hc2ssXG4gICAgKVxuXG4gICAgY29uc3QgcHVic3ViID0gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gICAgdGhpcy5fZmlsbFplcm9WYWx1ZXMocHVic3ViLCBwYXRocylcblxuICAgIHJldHVybiBwdWJzdWJcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUJ5SWQoXG4gICAgYXBwSWQsXG4gICAgcHVic3ViSWQsXG4gICAgcGF0Y2gsXG4gICAgbWFzayA9IE1hcnNoYWxlci5maWVsZE1hc2tGcm9tUGF0Y2gocGF0Y2gsIHRoaXMuX2FwaS5TZXRBbGxvd2VkRmllbGRNYXNrUGF0aHMsIHJlbWFwcyksXG4gICkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5TZXQoXG4gICAgICB7XG4gICAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICAgJ3B1YnN1Yi5pZHMuYXBwbGljYXRpb25faWRzLmFwcGxpY2F0aW9uX2lkJzogYXBwSWQsXG4gICAgICAgICAgJ3B1YnN1Yi5pZHMucHViX3N1Yl9pZCc6IHB1YnN1YklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVic3ViOiBwYXRjaCxcbiAgICAgICAgZmllbGRfbWFzazogTWFyc2hhbGVyLmZpZWxkTWFzayhtYXNrKSxcbiAgICAgIH0sXG4gICAgKVxuXG4gICAgcmV0dXJuIE1hcnNoYWxlci5wYXlsb2FkU2luZ2xlUmVzcG9uc2UocmVzdWx0KVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlQnlJZChhcHBJZCwgcHVic3ViSWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hcGkuRGVsZXRlKHtcbiAgICAgIHJvdXRlUGFyYW1zOiB7XG4gICAgICAgICdhcHBsaWNhdGlvbl9pZHMuYXBwbGljYXRpb25faWQnOiBhcHBJZCxcbiAgICAgICAgcHViX3N1Yl9pZDogcHVic3ViSWQsXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTWFyc2hhbGVyLnBheWxvYWRTaW5nbGVSZXNwb25zZShyZXN1bHQpXG4gIH1cblxuICBhc3luYyBnZXRGb3JtYXRzKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwaS5HZXRGb3JtYXRzKClcblxuICAgIHJldHVybiBNYXJzaGFsZXIucGF5bG9hZFNpbmdsZVJlc3BvbnNlKHJlc3VsdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJTdWJcbiJdfQ==